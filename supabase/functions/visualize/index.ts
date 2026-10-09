// @ts-nocheck
// Entrypoint of the Roof Visualizer function. All the logic is in ../_shared/visualizer.js (so it can be tested without Deno).
import { VISUALIZER } from '../_shared/generated.js';
import { makeDb } from '../_shared/db.js';
import { deliverLead } from '../_shared/leads.js';
import { handleVisualizer } from '../_shared/visualizer.js';

Deno.serve((request) => {
  const env = Deno.env.toObject();
  const db = makeDb(env, fetch);
  const ctx = { env, fetch, db, waitUntil: (p) => EdgeRuntime.waitUntil(p) };
  return handleVisualizer(request, {
    ...ctx,
    catalog: VISUALIZER,
    rateLimited: (key, max, seconds) => db.rateLimited(key, max, seconds),
    deliverLead: (lead) => deliverLead(lead, ctx),
  });
});
