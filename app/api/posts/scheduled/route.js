import { revalidateTag } from 'next/cache';
import { POSTS_TAG } from '@/lib/postsStore';

// Publishes scheduled articles on time (owner, October 30 2026). An article dated in the future goes live at 8:00 AM Pacific on its date
// (isLive in lib/postsStore.js); this route, run by the daily Vercel Cron Job in vercel.json at that hour, refreshes the cached article list so
// the blog, the sitemap, the AI files and the article's own page show it right away instead of with the next hourly refresh. It changes no
// data. Who may run it: Vercel's cron (with CRON_SECRET set in Vercel, its `Authorization: Bearer` header is required), or a request with the
// setup check's x-leads-diagnostic header (the LEADS_SHEET_SECRET). Anything else is turned away. Running it again is harmless.
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const cronSecret = (process.env.CRON_SECRET || '').trim();
  const sheetSecret = (process.env.LEADS_SHEET_SECRET || '').trim();
  const fromCron = cronSecret ? request.headers.get('authorization') === `Bearer ${cronSecret}` : /vercel-cron/i.test(request.headers.get('user-agent') || '');
  const manual = Boolean(sheetSecret) && request.headers.get('x-leads-diagnostic') === sheetSecret;
  if (!fromCron && !manual) return Response.json({ ok: false, error: 'not allowed' }, { status: 401 });
  revalidateTag(POSTS_TAG, { expire: 0 });
  return Response.json({ ok: true, refreshed: POSTS_TAG });
}
