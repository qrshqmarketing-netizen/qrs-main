// The Roof Visualizer on the website's own server (the same logic as the Supabase Edge Function supabase/functions/visualize, which the site uses instead
// when NEXT_PUBLIC_VISUALIZE_ENDPOINT is set; this route is the default and the backup). See data/roofVisualizer.js.
// It also answers the "use my address" step ({ action: 'aerial' }, lib/aerialRoof.js), which only runs here (it decodes GeoTIFF pictures).
import { after } from 'next/server';
import { VISUALIZER_CATALOG } from '@/data/roofVisualizer';
import { aerialRoof } from '@/lib/aerialRoof';
import { deliverLead } from '@/lib/leads';
import { handleVisualizer, readPass, secretOf } from '@/supabase/functions/_shared/visualizer.js';

export const maxDuration = 60;

// Memory-only limits (they reset with each server instance); the Edge Function keeps its limits in the database
const hits = new Map();
async function rateLimited(key, max, seconds) {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < seconds * 1000);
  list.push(now);
  hits.set(key, list);
  return list.length > max;
}

const reply = (body, status) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
const MESSAGES = {
  addr: 'We couldn’t find that address. Please check it, include the city, or upload a photo instead.',
  roof: 'We couldn’t find detailed aerial imagery for that address. Please upload a photo of your roof instead.',
  config: 'The address lookup is not available right now. Please upload a photo instead.',
  api: 'The address lookup had a problem. Please try again, or upload a photo instead.',
};

async function aerial(request, body) {
  const secret = secretOf(process.env);
  if (!secret) return reply({ ok: false, error: 'not configured' }, 503);
  const pass = await readPass(secret, body?.token);
  if (!pass) return reply({ ok: false, error: 'pass', message: 'Please enter your name and email again.' }, 401);
  const address = typeof body?.address === 'string' ? body.address.trim().slice(0, 200) : '';
  if (address.length < 6) return reply({ ok: false, error: 'addr', message: MESSAGES.addr }, 400);
  if (await rateLimited(`viz-aerial:${pass.email}`, 6, 86400)) {
    return reply({ ok: false, error: 'limit', message: 'You’ve reached today’s limit of address lookups. Upload a photo, or call us and we’ll show you more options.' }, 429);
  }
  try {
    const out = await aerialRoof({ env: process.env, fetch, address });
    // The first lookup of the day tells the team which address they tried (one note a day per person)
    if (!(await rateLimited(`viz-aerial-note:${pass.email}`, 1, 86400))) {
      after(() => deliverLead({ source: 'roof-visualizer', name: pass.name, email: pass.email, address: out.label, message: 'Looked up their roof by address in the Roof Visualizer.', page: '/roof-visualizer/' }).catch(() => {}));
    }
    return reply({ ok: true, ...out }, 200);
  } catch (code) {
    if (typeof code !== 'string') console.error('[visualize] aerial failed', code);
    return reply({ ok: false, error: typeof code === 'string' ? code : 'api', message: MESSAGES[code] || MESSAGES.api }, code === 'addr' ? 400 : code === 'roof' ? 404 : 502);
  }
}

export async function POST(request) {
  const body = await request.clone().json().catch(() => null);
  if (body?.action === 'aerial') return aerial(request, body);
  return handleVisualizer(request, {
    env: process.env,
    fetch,
    catalog: VISUALIZER_CATALOG,
    rateLimited,
    deliverLead,
    waitUntil: (promise) => after(() => promise),
  });
}

export async function OPTIONS(request) {
  return handleVisualizer(request, { env: process.env, fetch, catalog: [], rateLimited, deliverLead, waitUntil: () => {} });
}
