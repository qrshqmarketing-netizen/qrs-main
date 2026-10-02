// Where every lead goes: the estimate form and Instant Quote (app/api/lead/route.js), the chat assistant
// (app/api/chat/route.js) and AI agents (request_estimate in lib/mcpTools.js). Server-side only.
//
// Each configured channel gets the lead (settings in .env.local locally, Vercel → Settings → Environment Variables
// on the live site):
// - Email, through Resend: RESEND_API_KEY, LEADS_TO_EMAIL (comma-separated; defaults to LEADS_EMAIL in data/site.js) and
//   LEADS_FROM_EMAIL (an address on a domain verified in Resend).
// - A Google Sheet row, through the Apps Script web app in scripts/google-sheet-leads.gs: LEADS_SHEET_WEBHOOK_URL
//   and LEADS_SHEET_SECRET.
// - Optionally a CRM webhook as JSON: CRM_LEAD_ENDPOINT (and CRM_LEAD_TOKEN, if the CRM needs a bearer token).
import { LEADS_EMAIL } from '@/data/site';

const env = (name) => (process.env[name] || '').trim();

export const SOURCE_LABELS = {
  'estimate-form': 'Estimate form',
  'instant-quote': 'Instant Quote',
  'roof-assistant-chat': 'Roof Assistant chat',
  mcp: 'AI agent (MCP)',
};

// Simple per-visitor limit for the public form endpoint (memory only, so it resets with each server instance)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hitsByKey = new Map();
export function rateLimited(key) {
  const now = Date.now();
  const hits = (hitsByKey.get(key) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  hitsByKey.set(key, hits);
  return hits.length > MAX_PER_WINDOW;
}

// The fields every channel shows, in this order (email table and spreadsheet columns)
const FIELDS = [
  ['name', 'Name'],
  ['phone', 'Phone'],
  ['email', 'Email'],
  ['zip', 'ZIP'],
  ['foundUs', 'How they found us'],
  ['service', 'Service'],
  ['roofType', 'Roof type'],
  ['address', 'Address'],
  ['message', 'Message'],
  ['quote', 'Quote details'],
  ['page', 'Page'],
];

const transcriptText = (transcript = []) =>
  transcript.map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`).join('\n\n');

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function emailContent(lead) {
  const source = SOURCE_LABELS[lead.source] || lead.source;
  const rows = FIELDS.filter(([key]) => lead[key]);
  const transcript = transcriptText(lead.transcript);
  const subject = `New lead from the website (${source}): ${lead.name || lead.phone || lead.email}${lead.zip ? `, ${lead.zip}` : ''}`;
  const text = [
    `New lead from the website (${source})`,
    '',
    ...rows.map(([key, label]) => `${label}: ${lead[key]}`),
    ...(transcript ? ['', 'Chat transcript:', transcript] : []),
  ].join('\n');
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#10243a">
<h2 style="margin:0 0 12px;color:#062d57">New lead from the website</h2>
<p style="margin:0 0 16px;color:#5a6b82">Source: ${escapeHtml(source)}</p>
<table style="border-collapse:collapse">${rows
    .map(
      ([key, label]) =>
        `<tr><th style="padding:6px 14px 6px 0;text-align:left;vertical-align:top;color:#5a6b82;font-weight:600">${label}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(lead[key])}</td></tr>`
    )
    .join('')}</table>${
    transcript
      ? `<h3 style="margin:20px 0 8px;color:#062d57">Chat transcript</h3><pre style="font-family:inherit;white-space:pre-wrap;margin:0">${escapeHtml(transcript)}</pre>`
      : ''
  }
</div>`;
  return { subject, text, html };
}

async function sendEmail(lead) {
  const key = env('RESEND_API_KEY');
  if (!key) return 'off';
  const to = (env('LEADS_TO_EMAIL') || LEADS_EMAIL).split(',').map((s) => s.trim()).filter(Boolean);
  const from = env('LEADS_FROM_EMAIL') || 'QRS Website <onboarding@resend.dev>';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, ...(lead.email ? { reply_to: lead.email } : {}), ...emailContent(lead) }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return 'sent';
}

async function addSheetRow(lead) {
  const url = env('LEADS_SHEET_WEBHOOK_URL');
  if (!url) return 'off';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: env('LEADS_SHEET_SECRET'),
      source: SOURCE_LABELS[lead.source] || lead.source,
      ...Object.fromEntries(FIELDS.map(([key]) => [key, lead[key] || ''])),
      transcript: transcriptText(lead.transcript).slice(0, 45000), // a sheet cell holds up to 50,000 characters
    }),
  });
  const body = await res.text();
  // The Apps Script answers {"ok":true} once the row is written (and {"ok":false,...} when the secret is wrong)
  if (!res.ok || !/"ok"\s*:\s*true/.test(body)) throw new Error(`Sheet webhook ${res.status}: ${body.slice(0, 300)}`);
  return 'sent';
}

async function sendToCRM(lead) {
  const url = env('CRM_LEAD_ENDPOINT');
  if (!url) return 'off';
  const token = env('CRM_LEAD_TOKEN');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`CRM ${res.status}`);
  return 'sent';
}

// Sends the lead to every configured channel at once. Returns { email, sheet, crm } (each 'sent', 'off' or
// 'failed') and `delivered`: true when at least one channel took it.
export async function deliverLead(lead) {
  const full = { capturedAt: new Date().toISOString(), ...lead };
  const channels = { email: sendEmail, sheet: addSheetRow, crm: sendToCRM };
  const results = await Promise.allSettled(Object.values(channels).map((send) => send(full)));
  const status = {};
  Object.keys(channels).forEach((name, i) => {
    const r = results[i];
    status[name] = r.status === 'fulfilled' ? r.value : 'failed';
    if (r.status === 'rejected') console.error(`[leads] ${name} failed:`, r.reason?.message || r.reason);
  });
  const configured = Object.values(status).some((s) => s !== 'off');
  const delivered = Object.values(status).includes('sent');
  // Never lose a lead silently: when nothing is set up (local dev) or every channel failed, keep it in the logs
  if (!delivered) console.log(`[leads] ${configured ? 'NOT DELIVERED' : 'no channels configured'}:`, JSON.stringify(full));
  return { ...status, configured, delivered };
}
