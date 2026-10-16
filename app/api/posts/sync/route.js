import { revalidateTag } from 'next/cache';
import { applyFileRevisions, POSTS_TAG } from '@/lib/postsStore';
import { dbConfigured } from '@/lib/supabase';

// Copies the articles whose `revision` was raised in data/blog/posts.js into the live table (lib/postsStore.js applyFileRevisions) and
// refreshes the cached articles at once, so the change is live in seconds. Only with the setup check's x-leads-diagnostic header (the
// LEADS_SHEET_SECRET); anything else is turned away. Running it again does nothing until a revision is raised again.
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const secret = (process.env.LEADS_SHEET_SECRET || '').trim();
  if (!secret || request.headers.get('x-leads-diagnostic') !== secret) return Response.json({ ok: false, error: 'not allowed' }, { status: 401 });
  if (!dbConfigured()) return Response.json({ ok: false, error: 'Supabase not configured' }, { status: 503 });
  try {
    const result = await applyFileRevisions();
    if (result.updated.length) revalidateTag(POSTS_TAG, { expire: 0 });
    return Response.json({ ok: true, ...result });
  } catch (e) {
    return Response.json({ ok: false, error: e.message }, { status: 502 });
  }
}
