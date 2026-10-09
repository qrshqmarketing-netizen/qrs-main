// Delivers a lead to every channel at once (the Edge Function version of the website's lib/leads.js): the team's email and the confirmation
// email (Resend), a Google Sheet row (Apps Script web app), a row of the `leads` table and, optionally, a CRM webhook.
// Settings are Supabase secrets (`supabase secrets set NAME=value`): RESEND_API_KEY, LEADS_FROM_EMAIL, LEADS_TO_EMAIL, LEADS_SHEET_WEBHOOK_URL,
// LEADS_SHEET_SECRET, CRM_LEAD_ENDPOINT, CRM_LEAD_TOKEN, LEADS_AUTOREPLY.
import { SITE } from './generated.js';
import { escapeHtml, formatDay } from './util.js';

export const SOURCE_LABELS = {
  'estimate-form': 'Estimate form',
  'instant-quote': 'Instant Quote',
  'roof-assistant-chat': 'Roof Assistant chat',
  'roof-visualizer': 'Roof Visualizer',
  mcp: 'AI agent (MCP)',
};

export const FIELDS = [
  ['name', 'Name'],
  ['phone', 'Phone'],
  ['email', 'Email'],
  ['zip', 'ZIP'],
  ['foundUs', 'How they found us'],
  ['service', 'Service'],
  ['roofType', 'Roof type'],
  ['preferredDate', 'Preferred date'],
  ['preferredTime', 'Preferred time'],
  ['address', 'Address'],
  ['message', 'Message'],
  ['quote', 'Quote details'],
  ['page', 'Page'],
  ['utmSource', 'UTM source'],
  ['utmMedium', 'UTM medium'],
  ['utmCampaign', 'UTM campaign'],
  ['landingPage', 'Landing page'],
];

const shown = (lead, key) => (key === 'preferredDate' ? formatDay(lead[key]) : lead[key]);
const transcriptText = (transcript = []) => transcript.map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`).join('\n\n');
const setting = (env, name) => (env[name] || '').trim();
export const leadRecipients = (env) => (setting(env, 'LEADS_TO_EMAIL') || SITE.leadsEmail).split(',').map((s) => s.trim()).filter(Boolean);

export function emailContent(lead) {
  const source = SOURCE_LABELS[lead.source] || lead.source;
  const rows = FIELDS.filter(([key]) => lead[key]);
  const transcript = transcriptText(lead.transcript);
  const subject = `New lead from the website (${source}): ${lead.name || lead.phone || lead.email}${lead.zip ? `, ${lead.zip}` : ''}`;
  const text = [
    `New lead from the website (${source})`,
    '',
    ...rows.map(([key, label]) => `${label}: ${shown(lead, key)}`),
    ...(transcript ? ['', 'Chat transcript:', transcript] : []),
  ].join('\n');
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#10243a">
<h2 style="margin:0 0 12px;color:#062d57">New lead from the website</h2>
<p style="margin:0 0 16px;color:#5a6b82">Source: ${escapeHtml(source)}</p>
<table style="border-collapse:collapse">${rows
    .map(
      ([key, label]) =>
        `<tr><th style="padding:6px 14px 6px 0;text-align:left;vertical-align:top;color:#5a6b82;font-weight:600">${label}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(shown(lead, key))}</td></tr>`
    )
    .join('')}</table>${
    transcript
      ? `<h3 style="margin:20px 0 8px;color:#062d57">Chat transcript</h3><pre style="font-family:inherit;white-space:pre-wrap;margin:0">${escapeHtml(transcript)}</pre>`
      : ''
  }
</div>`;
  return { subject, text, html };
}

async function sendEmail(lead, { env, fetch: f }) {
  const key = setting(env, 'RESEND_API_KEY');
  if (!key) return 'off';
  const to = leadRecipients(env);
  const from = setting(env, 'LEADS_FROM_EMAIL') || 'QRS Website <onboarding@resend.dev>';
  const res = await f('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to, reply_to: lead.email || to[0], ...emailContent(lead) }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return 'sent';
}

async function addSheetRow(lead, { env, fetch: f }) {
  const url = setting(env, 'LEADS_SHEET_WEBHOOK_URL');
  if (!url) return 'off';
  const res = await f(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'manual',
    body: JSON.stringify({
      secret: setting(env, 'LEADS_SHEET_SECRET'),
      source: SOURCE_LABELS[lead.source] || lead.source,
      ...Object.fromEntries(FIELDS.map(([key]) => [key, lead[key] || ''])),
      transcript: transcriptText(lead.transcript).slice(0, 45000),
    }),
  });
  const location = res.headers.get('location') || '';
  if (res.status < 300 || res.status >= 400 || !/^https:\/\/script\.googleusercontent\.com\//.test(location)) {
    throw new Error(`Sheet webhook ${res.status} ${location.slice(0, 80)}: ${(await res.text()).slice(0, 300)}`);
  }
  let answer = '';
  try {
    answer = await (await f(location, { signal: AbortSignal.timeout(8000) })).text();
  } catch {}
  if (/"ok"\s*:\s*false/.test(answer)) throw new Error(`Sheet webhook refused the row: ${answer.slice(0, 300)}`);
  return 'sent';
}

// The lead as a row of the `leads` table (scripts/supabase-leads.sql); empty values are stored as null
export function leadRow(lead) {
  const orNull = (v) => (v === undefined || v === null || v === '' ? null : v);
  const phoneDigits = String(lead.phone || '').replace(/\D/g, '').slice(-10);
  return {
    captured_at: orNull(lead.capturedAt),
    source: orNull(SOURCE_LABELS[lead.source] || lead.source),
    name: orNull(lead.name),
    phone: orNull(lead.phone),
    phone_digits: orNull(phoneDigits),
    email: orNull(lead.email && lead.email.toLowerCase()),
    zip: orNull(lead.zip),
    found_us: orNull(lead.foundUs),
    service: orNull(lead.service),
    roof_type: orNull(lead.roofType),
    preferred_date: orNull(lead.preferredDate),
    preferred_time: orNull(lead.preferredTime),
    address: orNull(lead.address),
    message: orNull(lead.message),
    quote: orNull(lead.quote),
    page: orNull(lead.page),
    utm_source: orNull(lead.utmSource),
    utm_medium: orNull(lead.utmMedium),
    utm_campaign: orNull(lead.utmCampaign),
    landing_page: orNull(lead.landingPage),
    transcript: orNull(transcriptText(lead.transcript)),
  };
}

async function saveToDatabase(lead, { db }) {
  if (!db.configured) return 'off';
  await db.request('leads', { method: 'POST', body: leadRow(lead), prefer: 'return=minimal' });
  return 'sent';
}

async function sendToCRM(lead, { env, fetch: f }) {
  const url = setting(env, 'CRM_LEAD_ENDPOINT');
  if (!url) return 'off';
  const token = setting(env, 'CRM_LEAD_TOKEN');
  const res = await f(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(lead) });
  if (!res.ok) throw new Error(`CRM ${res.status}`);
  return 'sent';
}

// Which settings this project has (true/false only, never a value), for the setup check
export function leadChannelSettings(env, db) {
  return {
    email: Boolean(setting(env, 'RESEND_API_KEY') && setting(env, 'LEADS_FROM_EMAIL')),
    sheet: Boolean(setting(env, 'LEADS_SHEET_WEBHOOK_URL') && setting(env, 'LEADS_SHEET_SECRET')),
    database: db.configured,
    databaseKey: db.keyKind,
    crm: Boolean(setting(env, 'CRM_LEAD_ENDPOINT')),
    confirmationEmail: setting(env, 'LEADS_AUTOREPLY') !== 'off',
    chatModel: Boolean(setting(env, 'GEMINI_API_KEY') || setting(env, 'OPENROUTER_API_KEY')),
  };
}

// Sends the lead to every configured channel at once: { email, sheet, database, crm } (each 'sent', 'off' or 'failed'), `delivered` (at least
// one took it), `configured`, and `errors` (why each failed channel failed)
export async function deliverLead(lead, ctx) {
  const full = { capturedAt: new Date().toISOString(), ...lead };
  const channels = { email: sendEmail, sheet: addSheetRow, database: saveToDatabase, crm: sendToCRM };
  const results = await Promise.allSettled(Object.values(channels).map((send) => send(full, ctx)));
  const status = {};
  const errors = {};
  Object.keys(channels).forEach((name, i) => {
    const r = results[i];
    status[name] = r.status === 'fulfilled' ? r.value : 'failed';
    if (r.status === 'rejected') {
      errors[name] = String(r.reason?.message || r.reason);
      console.error(`[leads] ${name} failed:`, errors[name]);
    }
  });
  const configured = Object.values(status).some((s) => s !== 'off');
  const delivered = Object.values(status).includes('sent');
  if (!delivered) console.log(`[leads] ${configured ? 'NOT DELIVERED' : 'no channels configured'}:`, JSON.stringify(full));
  return { ...status, configured, delivered, errors };
}
