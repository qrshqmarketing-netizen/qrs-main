// POST { email, password } (a personal account) or { password } (the shared team password): logs in to the dashboard (lib/adminAuth.js).
// Five tries per ten minutes per visitor, and a pause after a wrong one.
import { cookies } from 'next/headers';
import { accountsReady, ADMIN_COOKIE, adminReady, clientIp, cookieOptions, loginWithSupabase, makeAuthSession, makeSession, MIN_PASSWORD, passwordMatches, sameOrigin, teamPasswordReady } from '@/lib/adminAuth';
import { rateLimited } from '@/lib/leads';

const fail = (status, error) => Response.json({ ok: false, error }, { status });
const pause = () => new Promise((resolve) => setTimeout(resolve, 800)); // slows down guessing

export async function POST(request) {
  if (!(await sameOrigin())) return fail(403, 'Not allowed.');
  if (!adminReady()) {
    return fail(503, `The dashboard isn't set up yet: connect Supabase (SUPABASE_URL and SUPABASE_SECRET_KEY) or add ADMIN_PASSWORD (at least ${MIN_PASSWORD} characters) in Vercel, and redeploy.`);
  }
  if (rateLimited(`admin:${await clientIp()}`)) return fail(429, 'Too many tries. Wait a few minutes and try again.');
  let body;
  try {
    body = await request.json();
  } catch {
    return fail(400, 'Bad request.');
  }
  const email = String(body?.email ?? '').trim().toLowerCase().slice(0, 200);
  const pass = String(body?.password ?? '').slice(0, 200);

  if (email) {
    if (!accountsReady()) return fail(503, 'Personal accounts are not set up yet. Use the team password.');
    const result = await loginWithSupabase(email, pass);
    if (!result.ok) {
      await pause();
      return fail(result.status === 502 ? 502 : result.status === 403 ? 403 : 401, result.error);
    }
    (await cookies()).set(ADMIN_COOKIE, makeAuthSession(result.user.id), cookieOptions());
    return Response.json({ ok: true });
  }

  if (!teamPasswordReady()) return fail(400, 'Log in with your email and password.');
  if (!passwordMatches(pass)) {
    await pause();
    return fail(401, 'That password is not right.');
  }
  (await cookies()).set(ADMIN_COOKIE, makeSession(), cookieOptions());
  return Response.json({ ok: true });
}
