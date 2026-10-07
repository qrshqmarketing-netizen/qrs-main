// @ts-nocheck
// Entrypoint of the Roof Assistant function. All the logic is in ../_shared/chat.js (so it can be tested without Deno).
import { handleChat } from '../_shared/chat.js';
import { makeDb } from '../_shared/db.js';

Deno.serve((request) => {
  const env = Deno.env.toObject();
  return handleChat(request, { env, fetch, db: makeDb(env, fetch), waitUntil: (p) => EdgeRuntime.waitUntil(p) });
});
