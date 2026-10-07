// POST { password } (or { email, password } with Supabase Auth): logs in to the dashboard (lib/adminAuth.js). Five tries per ten minutes per visitor, and a pause after a wrong one.
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, adminReady, authMode, clientIp, cookieOptions, loginWithSupabase, makeAuthSession, makeSession, MIN_PASSWORD, passwordMatches, sameOrigin } from '@/lib/adminAuth';
import { rateLimited } from '@/lib/leads';

const fail = (status, error) => Response.json({ ok: false, error }, { status });

export async function POST(request) {
  if (!(await sameOrigin())) return fail(403, 'Not allowed.');
  if (!adminReady()) {
    return fail(503, `The dashboard isn't set up yet: add ADMIN_PASSWORD (at least ${MIN_PASSWORD} characters) in Vercel, with the Supabase settings, and redeploy.`);
  }
  if (rateLimited(`admin:${await clientIp()}`)) return fail(429, 'Too many tries. Wait a few minutes and try again.');
  let body;
  try {
    body = await request.json();
  } catch {
    return fail(400, 'Bad request.');
  }
  if (authMode()) {
    const email = String(body?.email ?? '').trim().toLowerCase().slice(0, 200);
    const result = await loginWithSupabase(email, String(body?.password ?? '').slice(0, 200));
    if (!result.ok) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return fail(result.status === 502 ? 502 : result.status === 403 ? 403 : 401, result.error);
    }
    (await cookies()).set(ADMIN_COOKIE, makeAuthSession(result.user.id), cookieOptions());
    return Response.json({ ok: true });
  }
  if (!passwordMatches(String(body?.password ?? ''))) {
    await new Promise((resolve) => setTimeout(resolve, 800)); // slows down guessing
    return fail(401, 'That password is not right.');
  }
  (await cookies()).set(ADMIN_COOKIE, makeSession(), cookieOptions());
  return Response.json({ ok: true });
}
