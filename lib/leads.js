// Where every lead goes: the estimate form and Instant Quote (app/api/lead/route.js), the chat assistant
// (app/api/chat/route.js) and AI agents (request_estimate in lib/mcpTools.js). Server-side only.
//
// Each configured channel gets the lead (settings in .env.local locally, Vercel → Settings → Environment Variables
// on the live site):
// - Email, through Resend: RESEND_API_KEY, LEADS_TO_EMAIL (comma-separated; defaults to LEADS_EMAIL in data/site.js) and
//   LEADS_FROM_EMAIL (an address on a domain verified in Resend).
// - A Google Sheet row, through the Apps Script web app in scripts/google-sheet-leads.gs: LEADS_SHEET_WEBHOOK_URL
//   and LEADS_SHEET_SECRET.
// - A row in the Supabase database: SUPABASE_URL and SUPABASE_SECRET_KEY (an sb_secret_... key; the older SUPABASE_SERVICE_ROLE_KEY works too),
//   into the `leads` table made by scripts/supabase-leads.sql
//   (one table for every source, with a `lead_contacts` view that merges the same person across them).
// - Optionally a CRM webhook as JSON: CRM_LEAD_ENDPOINT (and CRM_LEAD_TOKEN, if the CRM needs a bearer token).
import { LEADS_EMAIL } from '@/data/site';
import { formatDay } from '@/lib/dates';

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
  // The preferred visit from the /start/ form (optional); the spreadsheet gets the date as YYYY-MM-DD so it sorts
  ['preferredDate', 'Preferred date'],
  ['preferredTime', 'Preferred time'],
  ['address', 'Address'],
  ['message', 'Message'],
  ['quote', 'Quote details'],
  ['page', 'Page'],
  // Where the visit came from, from the utm tags on the link (lib/attribution.js); only present for tagged visits
  ['utmSource', 'UTM source'],
  ['utmMedium', 'UTM medium'],
  ['utmCampaign', 'UTM campaign'],
  ['landingPage', 'Landing page'], // the page that tagged link landed on
];

// How a field reads in the email (the spreadsheet keeps the raw value)
const shown = (lead, key) => (key === 'preferredDate' ? formatDay(lead[key]) : lead[key]);

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

async function sendEmail(lead) {
  const key = env('RESEND_API_KEY');
  if (!key) return 'off';
  const to = (env('LEADS_TO_EMAIL') || LEADS_EMAIL).split(',').map((s) => s.trim()).filter(Boolean);
  const from = env('LEADS_FROM_EMAIL') || 'QRS Website <onboarding@resend.dev>';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    // Reply goes to the visitor when they gave an email, otherwise back to the team (the sending address has no inbox)
    body: JSON.stringify({ from, to, reply_to: lead.email || to[0], ...emailContent(lead) }),
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
    redirect: 'manual',
    body: JSON.stringify({
      secret: env('LEADS_SHEET_SECRET'),
      source: SOURCE_LABELS[lead.source] || lead.source,
      ...Object.fromEntries(FIELDS.map(([key]) => [key, lead[key] || ''])),
      transcript: transcriptText(lead.transcript).slice(0, 45000), // a sheet cell holds up to 50,000 characters
    }),
  });
  // Once the script has run, Google redirects to a script.googleusercontent.com page holding its answer:
  // {"ok":true} after the row is written, {"ok":false,...} for a wrong secret. A redirect anywhere else (a Google
  // sign-in page: the deployment isn't open to "Anyone") or a page without one (a script error) means no row.
  const location = res.headers.get('location') || '';
  if (res.status < 300 || res.status >= 400 || !/^https:\/\/script\.googleusercontent\.com\//.test(location)) {
    throw new Error(`Sheet webhook ${res.status} ${location.slice(0, 80)}: ${(await res.text()).slice(0, 300)}`);
  }
  // That answer page is sometimes slow or briefly fails even though the row is already in the sheet, so only a
  // clear {"ok":false} counts as a failure here; anything unreadable is logged and treated as written
  let answer = '';
  try {
    answer = await (await fetch(location, { signal: AbortSignal.timeout(8000) })).text();
  } catch {}
  if (/"ok"\s*:\s*false/.test(answer)) throw new Error(`Sheet webhook refused the row: ${answer.slice(0, 300)}`);
  if (!/"ok"\s*:\s*true/.test(answer)) console.warn('[leads] sheet: the script ran, but its answer page was unreadable; the row should be in the sheet');
  return 'sent';
}

// Supabase's web API (PostgREST) takes the row as JSON, so no extra package is needed. The secret key stays on the server;
// the table has row level security on with no policies, so nothing else can read or write it. The new sb_secret_... keys are not JWTs and
// go only in the `apikey` header; the older service_role key is a JWT and is also sent as the Bearer token.
const dbSettings = () => ({
  url: (env('SUPABASE_URL') || env('NEXT_PUBLIC_SUPABASE_URL')).replace(/\/+$/, ''),
  key: env('SUPABASE_SECRET_KEY') || env('SUPABASE_SERVICE_ROLE_KEY'),
});

// The lead as a row of the `leads` table (scripts/supabase-leads.sql). Empty values are stored as null.
function leadRow(lead) {
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

async function saveToDatabase(lead) {
  const { url, key } = dbSettings();
  if (!url || !key) return 'off';
  const res = await fetch(`${url}/rest/v1/leads`, {
    method: 'POST',
    headers: { apikey: key, ...(key.startsWith('eyJ') && { Authorization: `Bearer ${key}` }), 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(leadRow(lead)),
    signal: AbortSignal.timeout(8000), // a slow database must not hold up the visitor or the other channels
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 300)}`);
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

// Sends the lead to every configured channel at once. Returns { email, sheet, database, crm } (each 'sent', 'off' or
// 'failed'), `delivered`: true when at least one channel took it, and `errors`: why each failed channel failed.
export async function deliverLead(lead) {
  const full = { capturedAt: new Date().toISOString(), ...lead };
  const channels = { email: sendEmail, sheet: addSheetRow, database: saveToDatabase, crm: sendToCRM };
  const results = await Promise.allSettled(Object.values(channels).map((send) => send(full)));
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
  // Never lose a lead silently: when nothing is set up (local dev) or every channel failed, keep it in the logs
  if (!delivered) console.log(`[leads] ${configured ? 'NOT DELIVERED' : 'no channels configured'}:`, JSON.stringify(full));
  return { ...status, configured, delivered, errors };
}
