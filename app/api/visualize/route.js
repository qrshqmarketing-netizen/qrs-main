// The Roof Visualizer on the website's own server (the same logic as the Supabase Edge Function supabase/functions/visualize, which the site uses instead
// when NEXT_PUBLIC_VISUALIZE_ENDPOINT is set; this route is the default and the backup). See data/roofVisualizer.js.
import { after } from 'next/server';
import { VISUALIZER_CATALOG } from '@/data/roofVisualizer';
import { deliverLead } from '@/lib/leads';
import { handleVisualizer } from '@/supabase/functions/_shared/visualizer.js';

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

export async function POST(request) {
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
