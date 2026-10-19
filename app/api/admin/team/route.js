// POST { action: 'approve' | 'suspend' | 'remove', id }: the Team page's buttons (lib/adminAuth.js). Admins only, from the site's own pages.
// Nobody can suspend or remove their own account, so the last admin can't lock everyone out by accident.
import { approveAccount, currentAdmin, removeAccount, sameOrigin, suspendAccount } from '@/lib/adminAuth';

const fail = (status, error) => Response.json({ ok: false, error }, { status });
const ACTIONS = { approve: approveAccount, suspend: suspendAccount, remove: removeAccount };

export async function POST(request) {
  if (!(await sameOrigin())) return fail(403, 'Not allowed.');
  const who = await currentAdmin();
  if (!who) return fail(401, 'Your session ended. Log in again.');
  let body;
  try {
    body = await request.json();
  } catch {
    return fail(400, 'Bad request.');
  }
  const run = ACTIONS[body?.action];
  const id = String(body?.id ?? '');
  if (!run || !/^[0-9a-f-]{36}$/i.test(id)) return fail(400, 'Bad request.');
  if (id === who.id && body.action !== 'approve') return fail(400, 'You can’t take away your own access.');
  if (!(await run(id))) return fail(502, 'Supabase did not accept the change. Try again in a moment.');
  return Response.json({ ok: true });
}
