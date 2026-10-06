// POST: logs out of the dashboard.
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, sameOrigin } from '@/lib/adminAuth';

export async function POST() {
  if (!(await sameOrigin())) return Response.json({ ok: false, error: 'Not allowed.' }, { status: 403 });
  (await cookies()).delete(ADMIN_COOKIE);
  return Response.json({ ok: true });
}
