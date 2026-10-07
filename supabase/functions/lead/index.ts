// @ts-nocheck
// Entrypoint of the request-form function. All the logic is in ../_shared/leadHandler.js (so it can be tested without Deno).
import { makeDb } from '../_shared/db.js';
import { handleLead } from '../_shared/leadHandler.js';

Deno.serve((request) => {
  const env = Deno.env.toObject();
  return handleLead(request, { env, fetch, db: makeDb(env, fetch), waitUntil: (p) => EdgeRuntime.waitUntil(p) });
});
