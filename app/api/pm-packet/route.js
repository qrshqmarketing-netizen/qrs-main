// The property manager roof packet form (components/sections/PmPacket.jsx on /commercial-roofing/property-managers/). Saves the request as a
// lead through lib/leads.js (team email, Google Sheet, the Supabase `leads` table the dashboard reads, CRM webhook), with the source
// "pm-packet" ("Property manager packet") and the company and building count in the message, then emails the PDF (lib/pmPacket.js).
// Name, company and a work email are required; the phone is optional. It runs on the site only (not the Supabase lead function).
import { after } from 'next/server';
import { PM_BUILDING_COUNTS } from '@/data/pmPacket';
import { leadAttribution } from '@/lib/attribution';
import { deliverLead, rateLimited } from '@/lib/leads';
import { sendPmPacket } from '@/lib/pmPacket';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clip = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// One packet email per address a day, so the form can't be used to flood someone else's inbox (memory only, like rateLimited())
const DAY_MS = 24 * 60 * 60 * 1000;
const sentTo = new Map();
function alreadySent(email) {
  const now = Date.now();
  for (const [address, at] of sentTo) if (now - at > DAY_MS) sentTo.delete(address);
  const key = email.toLowerCase();
  if (sentTo.has(key)) return true;
  sentTo.set(key, now);
  return false;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'bad request' }, { status: 400 });
  }
  // The hidden "website" field only bots fill in: answer as if it worked
  if (clip(body?.website, 200)) return Response.json({ ok: true });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  if (rateLimited(`pm-packet:${ip}`)) return Response.json({ ok: false, error: 'too many requests' }, { status: 429 });

  const name = clip(body?.name, 120);
  const company = clip(body?.company, 120);
  const email = clip(body?.email, 200);
  const phone = clip(body?.phone, 40);
  const buildings = PM_BUILDING_COUNTS.includes(body?.buildings) ? body.buildings : '';
  const digits = phone.replace(/\D/g, '').length;
  if (name.length < 2 || !company || !EMAIL_RE.test(email) || !buildings) return Response.json({ ok: false, error: 'name, company, email and building count are required' }, { status: 400 });
  if (phone && (digits < 10 || digits > 15)) return Response.json({ ok: false, error: 'invalid phone' }, { status: 400 });

  const page = clip(body?.page, 300);
  const lead = {
    source: 'pm-packet',
    name,
    phone,
    email,
    service: 'Commercial or HOA roofing',
    message: [`Property manager roof packet requested (PDF emailed).`, `Company: ${company}`, `Buildings managed: ${buildings}`].join('\n'),
    page: page.startsWith('/') ? page : '',
    ...leadAttribution(body?.utm),
  };

  const result = await deliverLead(lead);
  const repeat = alreadySent(email);
  // The packet goes out after the response, so the visitor doesn't wait on it; a failure only shows in the server log
  if (!repeat) after(() => sendPmPacket(lead).catch((err) => console.error('[pm-packet] email failed:', err?.message || err)));
  // Local dev with nothing set up: accept it (the lead is in the server log). On the live site a lead no channel took is reported,
  // so the form asks the visitor to call, as the other forms do (the packet email still goes out)
  if (result.delivered || (!result.configured && process.env.NODE_ENV !== 'production')) return Response.json({ ok: true });
  return Response.json({ ok: false, error: 'not delivered' }, { status: result.configured ? 502 : 503 });
}
