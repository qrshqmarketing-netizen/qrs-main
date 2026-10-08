// The Roof Assistant's brain (the Edge Function version of the website's app/api/chat/route.js): finds the site pages that match the question
// in the database (assistant_search, scripts/supabase-assistant.sql), asks Gemini (OpenRouter as the backup), saves a lead when the visitor shares
// a phone or email, and logs the exchange in `assistant_chats`. Settings are Supabase secrets: GEMINI_API_KEY, GEMINI_MODEL, OPENROUTER_API_KEY,
// OPENROUTER_MODEL, plus the lead ones (leads.js).
import { SITE, SYSTEM_PROMPT as BUILT_IN_PROMPT } from './generated.js';
import { leadAttribution } from './attribution.js';
import { deliverLead } from './leads.js';
import { clientIp, corsHeaders, hashIp, json } from './util.js';

const DEFAULT_GEMINI_MODEL = 'gemini-3.8-flash';
const MAX_MESSAGES = 16;
const MAX_CHARS = 500; // a visitor's message (CHAT_MAX_CHARS in data/assistant.js); the assistant's own earlier replies may be longer
const MAX_REPLY_CHARS = 1500;
const MAX_BODY = 20000; // bytes: nothing a real chat sends comes close

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_RE = /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
const ZIP_RE = /\b9\d{4}\b/g;
const NAME_RES = [
  /\b(?:my name is|my name's|name:)\s*([a-z][a-z'-]+(?: [a-z][a-z'-]+)?)/i,
  /\b(?:[Tt]his is|I'm|I am)\s+([A-Z][a-z'-]+(?: [A-Z][a-z'-]+)?)/,
];
const last = (text, re) => (text.match(re) || []).pop() || '';
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const userText = (messages) => messages.filter((m) => m.role === 'user').map((m) => m.content).join('\n');

export function findContact(text) {
  return {
    phone: last(text, PHONE_RE),
    email: last(text, EMAIL_RE),
    zip: last(text, ZIP_RE),
    name: NAME_RES.map((re) => (text.match(re) || [])[1]).find(Boolean) || '',
  };
}

async function callGemini({ env, fetch: f }, key, system, messages, model) {
  const base = env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';
  const contents = [];
  for (const m of messages) {
    const role = m.role === 'assistant' ? 'model' : 'user';
    if (contents.length && contents[contents.length - 1].role === role) contents[contents.length - 1].parts[0].text += `\n${m.content}`;
    else contents.push({ role, parts: [{ text: m.content }] });
  }
  while (contents.length && contents[0].role !== 'user') contents.shift();
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await f(`${base}/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        signal: AbortSignal.timeout(25000),
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents,
          generationConfig: { temperature: 0.4, maxOutputTokens: 1200, ...(attempt === 0 && { thinkingConfig: { thinkingLevel: 'LOW' } }) },
        }),
      });
      if (!res.ok) {
        const detail = (await res.text().catch(() => '')).slice(0, 400);
        console.error('[chat] Gemini error', model, res.status, detail);
        if (res.status === 400 && attempt === 0) continue;
        return { error: 'upstream error', status: 502, detail: `${model}: ${res.status} ${detail}` };
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

async function callOpenRouter({ env, fetch: f }, apiKey, system, messages) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await f('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}`, 'HTTP-Referer': SITE.siteUrl, 'X-Title': SITE.name },
        signal: AbortSignal.timeout(25000),
        body: JSON.stringify({ model: env.OPENROUTER_MODEL || 'qwen/qwen3.8-27b:free', messages: [{ role: 'system', content: system }, ...messages], temperature: 0.4, max_tokens: 400 }),
      });
      if (!res.ok) {
        console.error('[chat] OpenRouter error', res.status);
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

// The pages that match the visitor's message, as the plain-text blocks the model reads (the search is a database function)
async function relevantBlocks(db, query) {
  if (!db.configured) return [];
  try {
    const rows = await db.rpc('assistant_search', { q: query, n: 2 });
    return (rows || []).map((r) => r.block);
  } catch (err) {
    console.error('[chat] page search failed:', err.message);
    return [];
  }
}

// The system prompt: the one saved in the database (assistant_config, editable without a deploy) or the one built into the function
async function systemPrompt(db) {
  if (!db.configured) return BUILT_IN_PROMPT;
  try {
    const rows = await db.request('assistant_config?key=eq.system_prompt&select=value');
    return rows?.[0]?.value || BUILT_IN_PROMPT;
  } catch {
    return BUILT_IN_PROMPT;
  }
}

async function askModel(ctx, messages) {
  const { env, db } = ctx;
  const query = [...messages].reverse().find((m) => m.role === 'user')?.content || '';
  const [blocks, base] = await Promise.all([relevantBlocks(db, query), systemPrompt(db)]);
  const context = blocks.length
    ? "Relevant content from this website for the visitor's latest message — real page content, not a paraphrase. Use its specific details in your answer and don't contradict it or the facts above; if it doesn't cover the question, fall back to the facts and rules above.\n\n" + blocks.join('\n\n')
    : '';
  const system = [base, context].filter(Boolean).join('\n\n');
  const geminiKey = (env.GEMINI_API_KEY || '').trim();
  const routerKey = (env.OPENROUTER_API_KEY || '').trim();
  const model = (env.GEMINI_MODEL || '').trim() || DEFAULT_GEMINI_MODEL;
  let raw;
  let failed = null;
  const pages = (blocks.map((b) => (b.match(/\((\/[^)]*)\)/) || [])[1]).filter(Boolean));
  if (geminiKey) {
    let out = await callGemini(ctx, geminiKey, system, messages, model);
    if (!out.reply && model !== DEFAULT_GEMINI_MODEL) {
      const first = out;
      out = await callGemini(ctx, geminiKey, system, messages, DEFAULT_GEMINI_MODEL);
      if (!out.reply) out = { ...out, detail: `${first.detail || first.error} | then ${out.detail || out.error}` };
    }
    if (out.reply) raw = out.reply;
    else failed = out;
  }
  if (!raw && routerKey) {
    const out = await callOpenRouter(ctx, routerKey, system, messages);
    if (out.reply) raw = out.reply;
    else failed = out;
  }
  if (!raw) return { ...(failed || { error: 'empty reply', status: 502 }), pages, model };

  const at = raw.indexOf('[[LEAD]]');
  if (at === -1) return { reply: raw, marker: null, pages, model };
  let marker = null;
  const found = raw.slice(at + '[[LEAD]]'.length).match(/\{[\s\S]*?\}/);
  try {
    marker = found ? JSON.parse(found[0]) : null;
  } catch {}
  return { reply: raw.slice(0, at).trim(), marker, pages, model };
}

// ctx: { env, fetch, db, waitUntil(promise) }
export async function handleChat(request, ctx) {
  const { env, db } = ctx;
  const cors = corsHeaders(request, env);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (request.method !== 'POST') return json({ error: 'method not allowed' }, 405, cors);
  const started = Date.now();

  if (Number(request.headers.get('content-length')) > MAX_BODY) return json({ error: 'too long' }, 413, cors);
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad request' }, 400, cors);
  }
  const messages = (Array.isArray(body?.messages) ? body.messages : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, m.role === 'user' ? MAX_CHARS : MAX_REPLY_CHARS) }));
  if (!messages.length) return json({ error: 'no messages' }, 400, cors);

  const ip = await hashIp(clientIp(request), env.IP_SALT || '');
  // 30 messages per visitor per 10 minutes: far above a real chat, low enough to stop a script from running up the model bill
  if (await db.rateLimited(`chat:${ip}`, 30, 600)) return json({ error: 'too many requests' }, 429, cors);

  const hasModel = Boolean((env.GEMINI_API_KEY || '').trim() || (env.OPENROUTER_API_KEY || '').trim());
  const answer = hasModel ? await askModel(ctx, messages) : { error: 'not configured', status: 503, pages: [] };

  const before = findContact(userText(messages.slice(0, -1)));
  const now = findContact(userText(messages));
  const digits = (p) => p.replace(/\D/g, '').slice(-10);
  const newContact = (now.phone && digits(now.phone) !== digits(before.phone)) || (now.email && now.email.toLowerCase() !== before.email.toLowerCase());
  const marker = answer.marker || {};
  const markerPhone = last(str(marker.phone, 40), PHONE_RE);
  const markerEmail = last(str(marker.email, 200), EMAIL_RE);
  let leadSaved = false;
  if (newContact || ((markerPhone || markerEmail) && !body.leadSaved)) {
    if (!(await db.rateLimited(`chat-lead:${ip}`, 5, 600))) {
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
      ctx.waitUntil(deliverLead(lead, ctx).catch((err) => console.error('[chat] lead delivery failed', err)));
      leadSaved = true;
    }
  }

  // The log of the exchange (the dashboard's "what are visitors asking" view); written after the answer goes out
  if (db.configured && env.CHAT_LOG !== 'off') {
    const utm = leadAttribution(body?.utm);
    ctx.waitUntil(
      db
        .request('assistant_chats', {
          method: 'POST',
          prefer: 'return=minimal',
          body: {
            session_id: str(body?.sessionId, 60) || null,
            ip_hash: ip,
            question: [...messages].reverse().find((m) => m.role === 'user')?.content.slice(0, 1000) || null,
            reply: answer.reply ? answer.reply.slice(0, 3000) : null,
            model: answer.model || null,
            ms: Date.now() - started,
            pages: answer.pages?.length ? answer.pages : null,
            error: answer.error || null,
            lead_saved: leadSaved,
            utm_campaign: utm.utmCampaign || null,
          },
        })
        .catch((err) => console.error('[chat] log failed', err.message))
    );
  }

  const secret = (env.LEADS_SHEET_SECRET || '').trim();
  const diagnostic = Boolean(secret) && request.headers.get('x-leads-diagnostic') === secret;
  if (answer.error) return json({ error: answer.error, leadSaved, ...(diagnostic && { detail: answer.detail }) }, answer.status, cors);
  return json({ reply: answer.reply, leadSaved }, 200, cors);
}
