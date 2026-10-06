// Backend for the Roof Assistant chat widget (components/widgets/RoofAssistant.jsx).
// Calls Google Gemini (GEMINI_API_KEY, optional GEMINI_MODEL) when it is set, else an OpenRouter model (OPENROUTER_API_KEY, OPENROUTER_MODEL);
// if Gemini fails and OpenRouter is also set up, the OpenRouter model answers instead. Saves a lead through lib/leads.js
// (email + leads spreadsheet) when the visitor shares a phone number or email. The lead doesn't depend on the model:
// it's saved even when the model is slow, fails or isn't set up (the route then answers with an error and the widget
// falls back to its built-in answers, which thank the visitor for their details).
import { after } from 'next/server';
import { SYSTEM_PROMPT } from '@/data/assistant';
import { BUSINESS, SITE_URL } from '@/data/site';
import { findRelevantPages } from '@/lib/chatRetrieval';
import { leadAttribution } from '@/lib/attribution';
import { deliverLead, rateLimited } from '@/lib/leads';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = process.env.OPENROUTER_MODEL || 'qwen/qwen3.8-27b:free';
// Gemini (generateContent, v1beta). gemini-3.8-flash is Google's current stable Flash model: fast enough for a chat widget, far better than the
// free OpenRouter model. Set GEMINI_MODEL in Vercel to try another one (e.g. gemini-3.1-pro-preview, slower and costlier).
const GEMINI_BASE = process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

// Keep requests small: cap how much conversation we forward and how long each message can be.
const MAX_MESSAGES = 16;
const MAX_CHARS = 2000;

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_RE = /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
const ZIP_RE = /\b9\d{4}\b/g; // Southern California ZIPs
// "my name is jo smith" / "name: jo" in any case; "I'm Jo" / "this is Jo Smith" only when the name is capitalized
const NAME_RES = [
  /\b(?:my name is|my name's|name:)\s*([a-z][a-z'-]+(?: [a-z][a-z'-]+)?)/i,
  /\b(?:[Tt]his is|I'm|I am)\s+([A-Z][a-z'-]+(?: [A-Z][a-z'-]+)?)/,
];

const last = (text, re) => (text.match(re) || []).pop() || '';

// The contact details in what the visitor typed (the latest of each)
function findContact(text) {
  return {
    phone: last(text, PHONE_RE),
    email: last(text, EMAIL_RE),
    zip: last(text, ZIP_RE),
    name: NAME_RES.map((re) => (text.match(re) || [])[1]).find(Boolean) || '',
  };
}

const userText = (messages) => messages.filter((m) => m.role === 'user').map((m) => m.content).join('\n');

// Gemini: returns { reply } or { error, status }. The text parts of the first candidate (thought parts left out). Two tries: a model
// sometimes returns nothing, and a model that doesn't take a thinking level answers the retry without one.
async function callGemini(key, system, messages) {
  // Gemini wants the turns to alternate and to start with the visitor: merge neighbours with the same role
  const contents = [];
  for (const m of messages) {
    const role = m.role === 'assistant' ? 'model' : 'user';
    if (contents.length && contents[contents.length - 1].role === role) contents[contents.length - 1].parts[0].text += `\n${m.content}`;
    else contents.push({ role, parts: [{ text: m.content }] });
  }
  while (contents.length && contents[0].role !== 'user') contents.shift();
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(`${GEMINI_BASE}/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        signal: AbortSignal.timeout(25000),
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1200, // thinking tokens count against this, so it is well above the 400-token answers
            ...(attempt === 0 && { thinkingConfig: { thinkingLevel: 'LOW' } }),
          },
        }),
      });
      if (!res.ok) {
        console.error('[chat] Gemini error', res.status, (await res.text().catch(() => '')).slice(0, 400));
        if (res.status === 400 && attempt === 0) continue; // maybe the thinking setting: try once without it
        return { error: 'upstream error', status: 502 };
      }
      const data = await res.json();
      const text = (data.candidates?.[0]?.content?.parts || []).filter((p) => !p.thought && typeof p.text === 'string').map((p) => p.text).join('').trim();
      if (text) return { reply: text };
      console.error('[chat] Gemini sent no text', data.candidates?.[0]?.finishReason, data.promptFeedback?.blockReason);
    } catch (err) {
      console.error('[chat] request to Gemini failed', err);
      return { error: 'request failed', status: 502 };
    }
  }
  return { error: 'empty reply', status: 502 };
}

// OpenRouter: returns { reply } or { error, status }. Free models sometimes answer with nothing at all; one retry usually gets a reply
async function callOpenRouter(apiKey, system, messages) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'HTTP-Referer': SITE_URL,
          'X-Title': BUSINESS.name,
        },
        body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: system }, ...messages], temperature: 0.4, max_tokens: 400 }),
      });
      if (!res.ok) {
        console.error('[chat] OpenRouter error', res.status, await res.text().catch(() => ''));
        return { error: 'upstream error', status: 502 };
      }
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (reply) return { reply };
    } catch (err) {
      console.error('[chat] request to OpenRouter failed', err);
      return { error: 'request failed', status: 502 };
    }
  }
  return { error: 'empty reply', status: 502 };
}

// One call to the model; returns { reply, marker } or { error, status }
async function askModel(apiKey, messages) {
  // Ground the reply in the site's actual page content: search PAGE_INDEX for pages relevant to the
  // visitor's latest message and hand the model plain-text blocks (including their specifics, not just a
  // summary) from the best matches.
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
  const relevant = await findRelevantPages(lastUserMessage);
  const context = relevant.length
    ? {
        role: 'system',
        content:
          "Relevant content from this website for the visitor's latest message — real page content, not a paraphrase. Use its specific details in your answer and don't contradict it or the facts above; if it doesn't cover the question, fall back to the facts and rules above.\n\n" +
          relevant.join('\n\n'),
      }
    : null;

  const system = [SYSTEM_PROMPT, context?.content].filter(Boolean).join('\n\n');
  let rawReply;
  let failed = null;
  if (process.env.GEMINI_API_KEY) {
    const out = await callGemini(process.env.GEMINI_API_KEY, system, messages);
    if (out.reply) rawReply = out.reply;
    else failed = out;
  }
  // OpenRouter: the only model when there is no Gemini key, and the backup when Gemini fails
  if (!rawReply && apiKey) {
    const out = await callOpenRouter(apiKey, system, messages);
    if (out.reply) rawReply = out.reply;
    else failed = out;
  }
  if (!rawReply && failed?.error) return failed;
  if (!rawReply) return { error: 'empty reply', status: 502 };

  // Pull out the model's hidden [[LEAD]]{...} marker (see SYSTEM_PROMPT), if it added one, and never show it.
  // Cut everything from the marker onward regardless of what follows it, so a chatty model can never leak
  // raw JSON into the visitor-facing reply even if it doesn't stop right after the marker as asked.
  const markerIndex = rawReply.indexOf('[[LEAD]]');
  if (markerIndex === -1) return { reply: rawReply, marker: null };
  let marker = null;
  const json = rawReply.slice(markerIndex + '[[LEAD]]'.length).match(/\{[\s\S]*?\}/);
  try {
    marker = json ? JSON.parse(json[0]) : null;
  } catch {}
  return { reply: rawReply.slice(0, markerIndex).trim(), marker };
}

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'bad request' }, { status: 400 });
  }

  const incoming = Array.isArray(body?.messages) ? body.messages : [];
  const messages = incoming
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  if (!messages.length) return Response.json({ error: 'no messages' }, { status: 400 });

  const apiKey = process.env.OPENROUTER_API_KEY;
  const answer = apiKey || process.env.GEMINI_API_KEY ? await askModel(apiKey, messages) : { error: 'not configured', status: 503 };

  // A lead when this message brings a phone or email the visitor hadn't typed before in this chat, or when the
  // model's marker has one and no lead was saved yet (the widget sends leadSaved once one was, so a chat makes one row)
  const before = findContact(userText(messages.slice(0, -1)));
  const now = findContact(userText(messages));
  const digits = (phone) => phone.replace(/\D/g, '').slice(-10); // (310) 340-1643 and 310.340.1643 are one number
  const newContact = (now.phone && digits(now.phone) !== digits(before.phone)) || (now.email && now.email.toLowerCase() !== before.email.toLowerCase());
  const marker = answer.marker || {};
  const markerPhone = last(str(marker.phone, 40), PHONE_RE);
  const markerEmail = last(str(marker.email, 200), EMAIL_RE);
  let leadSaved = false;
  if (newContact || ((markerPhone || markerEmail) && !body.leadSaved)) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    if (!rateLimited(`chat-lead:${ip}`)) {
      const lead = {
        source: 'roof-assistant-chat',
        name: str(marker.name, 120) || now.name,
        phone: now.phone || markerPhone,
        email: now.email || markerEmail,
        zip: str(marker.zip, 10) || now.zip,
        service: str(marker.interest, 120),
        ...leadAttribution(body?.utm),
        transcript: answer.reply ? [...messages, { role: 'assistant', content: answer.reply }] : messages,
      };
      // Delivered after the response goes out, so the visitor doesn't wait on the email and spreadsheet
      after(() => deliverLead(lead).catch((err) => console.error('[chat] lead delivery failed', err)));
      leadSaved = true;
    }
  }

  if (answer.error) return Response.json({ error: answer.error, leadSaved }, { status: answer.status });
  return Response.json({ reply: answer.reply, leadSaved });
}
