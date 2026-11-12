import { isAdmin, sameOrigin } from '@/lib/adminAuth';
import { subscriberAction } from '@/lib/newsletter';

// POST from /admin/subscribers/ (lib/newsletter.js). Admins only, from the site's own pages.
//   { action: 'unsubscribe' | 'delete' | 'resend', email }
const fail = (status, error) => Response.json({ ok: false, error }, { status });

export async function POST(request) {
  if (!(await sameOrigin())) return fail(403, 'Not allowed.');
  if (!(await isAdmin())) return fail(401, 'Your session ended. Log in again.');
  let body;
  try {
    body = await request.json();
  } catch {
    return fail(400, 'Bad request.');
  }
  try {
    const result = await subscriberAction(body?.action, body?.email);
    return result.ok ? Response.json({ ok: true }) : fail(400, result.error);
  } catch (err) {
    console.error('[admin subscribers]', err.message);
    return fail(502, 'Supabase did not accept the change. Try again in a moment.');
  }
}
