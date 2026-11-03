import { revalidateTag } from 'next/cache';
import { POSTS_TAG } from '@/lib/postsStore';
import { updateReviewCount } from '@/lib/googleReviewCount';

// Publishes scheduled articles on time (owner, October 30 2026). An article dated in the future goes live at 8:00 AM Pacific on its date
// (isLive in lib/postsStore.js; or the hour in PUBLISH_HOURS); this route, run by the daily Vercel Cron Jobs in vercel.json at those hours, refreshes the cached article list so
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
  revalidateTag(POSTS_TAG, 'max'); // stale-while-revalidate: visitors keep getting the last good page while it refreshes (expire: 0 made failed refreshes a 500)
  // Mondays, on the 8 AM run (not the 9 AM one): the weekly Google review count (owner, November 2 2026; lib/googleReviewCount.js). A failure
  // is reported here and changes nothing.
  let reviewCount;
  const monday = new Date().toLocaleDateString('en-US', { weekday: 'long', timeZone: 'America/Los_Angeles' }) === 'Monday';
  if (monday && !new URL(request.url).searchParams.get('at')) {
    reviewCount = await updateReviewCount().catch((e) => ({ updated: false, error: e.message }));
  }
  return Response.json({ ok: true, refreshed: POSTS_TAG, ...(reviewCount && { reviewCount }) });
}
