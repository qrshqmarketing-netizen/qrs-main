// Receives the request steps on /start/ (components/sections/StartStepper.jsx) and the Instant Quote drawer
// (components/widgets/InstantQuote.jsx), checks the fields and hands the lead to lib/leads.js (email + Google Sheet).
import { FOUND_US_OPTIONS, ROOF_TYPES, SERVICE_OPTIONS } from '@/data/estimateOptions';
import { leadAttribution } from '@/lib/attribution';
import { deliverLead, rateLimited } from '@/lib/leads';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clip = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const list = (v, max = 6) => (Array.isArray(v) ? v.filter((s) => typeof s === 'string').slice(0, max).map((s) => s.slice(0, 40)) : []);
const num = (v, max) => (Number.isFinite(Number(v)) && Number(v) >= 0 ? Math.min(Math.round(Number(v)), max) : 0);
const usd = (n) => `$${n.toLocaleString('en-US')}`;

// The Instant Quote's estimate as one readable line for the email and the spreadsheet
function quoteSummary(q) {
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

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'bad request' }, { status: 400 });
  }

  // Bots fill in every field, including the hidden "website" one people never see. Answer as if it worked.
  if (clip(body?.website, 200)) return Response.json({ ok: true });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  if (rateLimited(`lead:${ip}`)) return Response.json({ ok: false, error: 'too many requests' }, { status: 429 });

  const source = body?.source === 'instant-quote' ? 'instant-quote' : 'estimate-form';
  const name = clip(body?.name, 120);
  const phone = clip(body?.phone, 40);
  const email = clip(body?.email, 200);
  // Any format people type a phone number in, as long as it has a full number's worth of digits
  const digits = phone.replace(/\D/g, '').length;
  if (!name || digits < 10 || digits > 15) return Response.json({ ok: false, error: 'name and phone are required' }, { status: 400 });
  if (email && !EMAIL_RE.test(email)) return Response.json({ ok: false, error: 'invalid email' }, { status: 400 });

  const page = clip(body?.page, 300);
  const lead = {
    source,
    name,
    phone,
    email,
    zip: clip(body?.zip, 10),
    foundUs: FOUND_US_OPTIONS.includes(body?.foundUs) ? body.foundUs : '',
    service: SERVICE_OPTIONS.includes(body?.service) ? body.service : source === 'instant-quote' ? 'Roof replacement' : '',
    roofType: ROOF_TYPES.includes(body?.roofType) ? body.roofType : '',
    address: clip(body?.address, 300),
    message: clip(body?.message, 3000),
    quote: source === 'instant-quote' ? quoteSummary(body) : '',
    page: page.startsWith('/') ? page : '',
    ...leadAttribution(body?.utm),
  };

  const result = await deliverLead(lead);
  // Setup check: a request carrying the LEADS_SHEET_SECRET in an x-leads-diagnostic header gets each channel's
  // result and error back, so email and spreadsheet problems can be traced without opening the server logs
  const secret = (process.env.LEADS_SHEET_SECRET || '').trim();
  if (secret && request.headers.get('x-leads-diagnostic') === secret) {
    return Response.json({ ok: result.delivered, channels: { email: result.email, sheet: result.sheet, crm: result.crm }, errors: result.errors });
  }
  // Local dev with nothing set up: accept the lead (it's in the server log). On the live site, say so when it
  // couldn't be delivered, so the form can ask the visitor to call instead.
  if (result.delivered || (!result.configured && process.env.NODE_ENV !== 'production')) return Response.json({ ok: true });
  return Response.json({ ok: false, error: 'not delivered' }, { status: result.configured ? 502 : 503 });
}
