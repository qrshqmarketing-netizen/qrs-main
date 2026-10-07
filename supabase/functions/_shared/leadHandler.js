// The lead function's logic (the Edge Function version of the website's app/api/lead/route.js): checks the fields, hands the lead to every channel
// (leads.js) and sends the confirmation email afterwards. Pure function of (request, context) so the local tests can run it with stand-ins.
import { OPTIONS, SITE } from './generated.js';
import { leadAttribution } from './attribution.js';
import { sendAutoReply } from './autoReply.js';
import { deliverLead, leadChannelSettings } from './leads.js';
import { clientIp, clip, corsHeaders, hashIp, json } from './util.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const list = (v, max = 6) => (Array.isArray(v) ? v.filter((s) => typeof s === 'string').slice(0, max).map((s) => s.slice(0, 40)) : []);
const num = (v, max) => (Number.isFinite(Number(v)) && Number(v) >= 0 ? Math.min(Math.round(Number(v)), max) : 0);
const usd = (n) => `$${n.toLocaleString('en-US')}`;

export function visitDate(value, now = new Date()) {
  const day = clip(value, 10);
  const at = Date.parse(`${day}T12:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || Number.isNaN(at) || new Date(at).toISOString().slice(0, 10) !== day) return '';
  const ahead = (at - Date.parse(`${now.toISOString().slice(0, 10)}T12:00:00Z`)) / 86400000;
  return ahead >= -1 && ahead <= 400 ? day : '';
}

export function quoteSummary(q) {
  const estimates = (Array.isArray(q.estimates) ? q.estimates.slice(0, 3) : [])
    .map((e) => `${clip(e?.material, 20)} ${usd(num(e?.low, 10000000))}–${usd(num(e?.high, 10000000))}${e?.monthly ? ` (about ${usd(num(e.monthly, 1000000))}/mo over ${num(q.termYears, 40)} years)` : ''}`)
    .join('; ');
  const m = q.measured && typeof q.measured === 'object' ? q.measured : null;
  return [
    estimates && `Estimate: ${estimates}`,
    num(q.sqft, 200000) && `Roof area: ${num(q.sqft, 200000).toLocaleString('en-US')} sq ft`,
    m && `Measured from satellite: ${num(m.sqft, 200000).toLocaleString('en-US')} sq ft, ${clip(m.pitch, 10)} pitch, ${num(m.sections, 500)} sections`,
    list(q.pitches).length && `Pitch: ${list(q.pitches).join(', ')}`,
    clip(q.stories, 20) && `Stories: ${clip(q.stories, 20)}`,
    list(q.roofTypes).length && `Current roof: ${list(q.roofTypes).join(', ')}`,
  ]
    .filter(Boolean)
    .join(' · ');
}

// ctx: { env, fetch, db, waitUntil(promise) }
export async function handleLead(request, ctx) {
  const { env, db } = ctx;
  const cors = corsHeaders(request, env);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (request.method !== 'POST') return json({ ok: false, error: 'method not allowed' }, 405, cors);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'bad request' }, 400, cors);
  }

  // Bots fill in the hidden "website" field. Answer as if it worked.
  if (clip(body?.website, 200)) return json({ ok: true }, 200, cors);

  const ip = await hashIp(clientIp(request), env.IP_SALT || '');
  if (await db.rateLimited(`lead:${ip}`, 5, 600)) return json({ ok: false, error: 'too many requests' }, 429, cors);

  const secret = (env.LEADS_SHEET_SECRET || '').trim();
  const diagnostic = Boolean(secret) && request.headers.get('x-leads-diagnostic') === secret;
  if (diagnostic && body?.configCheck === true) return json({ ok: true, settings: leadChannelSettings(env, db) }, 200, cors);

  const source = body?.source === 'instant-quote' ? 'instant-quote' : 'estimate-form';
  const name = clip(body?.name, 120);
  const phone = clip(body?.phone, 40);
  const email = clip(body?.email, 200);
  const digits = phone.replace(/\D/g, '').length;
  if (!name || digits < 10 || digits > 15) return json({ ok: false, error: 'name and phone are required' }, 400, cors);
  if (email && !EMAIL_RE.test(email)) return json({ ok: false, error: 'invalid email' }, 400, cors);

  const page = clip(body?.page, 300);
  const lead = {
    source,
    name,
    phone,
    email,
    zip: clip(body?.zip, 10),
    foundUs: OPTIONS.FOUND_US_OPTIONS.includes(body?.foundUs) ? body.foundUs : '',
    service: OPTIONS.SERVICE_OPTIONS.includes(body?.service) ? body.service : source === 'instant-quote' ? 'Roof replacement' : '',
    roofType: OPTIONS.ROOF_TYPES.includes(body?.roofType) ? body.roofType : '',
    preferredDate: visitDate(body?.preferredDate),
    preferredTime: OPTIONS.VISIT_TIMES.includes(body?.preferredTime) ? body.preferredTime : '',
    address: clip(body?.address, 300),
    message: clip(body?.message, 3000),
    quote: source === 'instant-quote' ? quoteSummary(body) : '',
    page: page.startsWith('/') ? page : '',
    ...leadAttribution(body?.utm),
  };

  if (diagnostic && body?.autoReplyTest === true) {
    try {
      return json({ ok: true, autoReply: await sendAutoReply(lead, ctx, { test: true }) }, 200, cors);
    } catch (err) {
      return json({ ok: false, autoReply: 'failed', error: String(err?.message || err).slice(0, 300) }, 502, cors);
    }
  }

  const result = await deliverLead(lead, ctx);
  const confirm = () => sendAutoReply(lead, ctx);
  if (diagnostic) {
    const autoReply = result.delivered ? await confirm().catch((err) => `failed: ${String(err?.message || err).slice(0, 200)}`) : 'skipped';
    return json({ ok: result.delivered, channels: { email: result.email, sheet: result.sheet, database: result.database, crm: result.crm, autoReply }, errors: result.errors }, 200, cors);
  }
  // The confirmation goes out after the response, so the visitor doesn't wait on it
  if (result.delivered) ctx.waitUntil(confirm().catch((err) => console.error('[autoreply] failed:', err?.message || err)));
  if (result.delivered) return json({ ok: true }, 200, cors);
  return json({ ok: false, error: 'not delivered' }, result.configured ? 502 : 503, cors);
}
