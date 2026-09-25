// Backend for the Roof Assistant chat widget (components/widgets/RoofAssistant.jsx).
// Calls an OpenRouter model (OPENROUTER_API_KEY, OPENROUTER_MODEL in .env.local) and, when the visitor has
// shared enough to follow up with them, sends a lead to lib/crm.js. Without OPENROUTER_API_KEY set, this
// route returns an error and the widget falls back to its built-in canned answers — no code change needed.
import { SYSTEM_PROMPT } from '@/data/assistant';
import { BUSINESS, SITE_URL } from '@/data/site';
import { sendLeadToCRM } from '@/lib/crm';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = process.env.OPENROUTER_MODEL || 'qwen/qwen3.8-27b:free';

// Keep requests small: cap how much conversation we forward and how long each message can be.
const MAX_MESSAGES = 16;
const MAX_CHARS = 2000;

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/;

function findContact(text) {
  return { email: (text.match(EMAIL_RE) || [])[0] || '', phone: (text.match(PHONE_RE) || [])[0] || '' };
}

function userText(messages) {
  return messages.filter((m) => m.role === 'user').map((m) => m.content).join('\n');
}

export async function POST(request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return Response.json({ error: 'not configured' }, { status: 503 });

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

  let rawReply;
  try {
    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': SITE_URL,
        'X-Title': BUSINESS.name,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.4,
        max_tokens: 400,
      }),
    });
    if (!res.ok) {
      console.error('[chat] OpenRouter error', res.status, await res.text().catch(() => ''));
      return Response.json({ error: 'upstream error' }, { status: 502 });
    }
    const data = await res.json();
    rawReply = data.choices?.[0]?.message?.content;
  } catch (err) {
    console.error('[chat] request to OpenRouter failed', err);
    return Response.json({ error: 'request failed' }, { status: 502 });
  }
  if (!rawReply) return Response.json({ error: 'empty reply' }, { status: 502 });

  // Pull out the model's hidden [[LEAD]]{...} marker (see SYSTEM_PROMPT), if it added one, and never show it.
  // Cut everything from the marker onward regardless of what follows it, so a chatty model can never leak
  // raw JSON into the visitor-facing reply even if it doesn't stop right after the marker as asked.
  let reply = rawReply;
  let lead = null;
  const markerIndex = rawReply.indexOf('[[LEAD]]');
  if (markerIndex !== -1) {
    reply = rawReply.slice(0, markerIndex).trim();
    const jsonMatch = rawReply.slice(markerIndex + '[[LEAD]]'.length).match(/\{[\s\S]*?\}/);
    if (jsonMatch) {
      try {
        lead = JSON.parse(jsonMatch[0]);
      } catch {
        lead = null;
      }
    }
  }

  // Belt-and-suspenders: also watch the visitor's own messages for a phone/email the model's marker might
  // have missed, and only fire once — when this turn introduces contact info that wasn't there before.
  const before = findContact(userText(messages.slice(0, -1)));
  const after = findContact(userText(messages));
  const gotNewContact = (after.email && after.email !== before.email) || (after.phone && after.phone !== before.phone);

  if (lead || gotNewContact) {
    const phone = lead?.phone || after.phone || '';
    const email = lead?.email || after.email || '';
    if (phone || email) {
      sendLeadToCRM({
        source: 'roof-assistant-chat',
        capturedAt: new Date().toISOString(),
        name: lead?.name || '',
        phone,
        email,
        zip: lead?.zip || '',
        interest: lead?.interest || '',
        transcript: [...messages, { role: 'assistant', content: reply }],
      }).catch(() => {});
    }
  }

  return Response.json({ reply });
}
