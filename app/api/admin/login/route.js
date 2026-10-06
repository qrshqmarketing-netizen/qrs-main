// POST { password }: logs in to the dashboard (lib/adminAuth.js). Five tries per ten minutes per visitor, and a pause after a wrong one.
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, adminReady, clientIp, cookieOptions, makeSession, MIN_PASSWORD, passwordMatches, sameOrigin } from '@/lib/adminAuth';
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
  if (!passwordMatches(String(body?.password ?? ''))) {
    await new Promise((resolve) => setTimeout(resolve, 800)); // slows down guessing
    return fail(401, 'That password is not right.');
  }
  (await cookies()).set(ADMIN_COOKIE, makeSession(), cookieOptions());
  return Response.json({ ok: true });
}
