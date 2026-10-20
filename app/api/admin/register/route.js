// POST { name, email, password }: asks for a dashboard account (lib/adminAuth.js). The account is made 'pending' and can't log in until an admin
// approves it on the Users page (/admin/users/). The answer is the same whether or not the email already has an account, so this can't be used to
// find out who works here. Five tries per ten minutes per visitor.
import { accountsReady, clientIp, MIN_ACCOUNT_PASSWORD, registerAccount, sameOrigin } from '@/lib/adminAuth';
import { rateLimited } from '@/lib/leads';

const fail = (status, error) => Response.json({ ok: false, error }, { status });
const DONE = 'Thanks. Your request was sent: an admin needs to approve your account before you can log in.';

export async function POST(request) {
  if (!(await sameOrigin())) return fail(403, 'Not allowed.');
  if (!accountsReady()) return fail(503, 'Accounts are not set up yet: the site needs its Supabase settings in Vercel.');
  if (rateLimited(`admin-register:${await clientIp()}`)) return fail(429, 'Too many tries. Wait a few minutes and try again.');
  let body;
  try {
    body = await request.json();
  } catch {
    return fail(400, 'Bad request.');
  }
  const name = String(body?.name ?? '').replace(/\s+/g, ' ').trim().slice(0, 80);
  const email = String(body?.email ?? '').trim().toLowerCase().slice(0, 200);
  const password = String(body?.password ?? '');
  if (name.length < 2) return fail(400, 'Type your name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail(400, 'Type a valid email address.');
  if (password.length < MIN_ACCOUNT_PASSWORD || password.length > 200) return fail(400, `Use a password of at least ${MIN_ACCOUNT_PASSWORD} characters.`);
  if (password.toLowerCase().includes(email.split('@')[0])) return fail(400, 'Choose a password that does not contain your email name.');

  const result = await registerAccount({ name, email, password });
  if (result.ok || result.exists) return Response.json({ ok: true, message: DONE });
  return fail(502, result.error);
}
