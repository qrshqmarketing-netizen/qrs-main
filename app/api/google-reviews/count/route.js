import { updateReviewCount } from '@/lib/googleReviewCount';

// Updates the Google review count now (lib/googleReviewCount.js): the total of the three listings, committed to data/site.js when it changed.
// Only with the setup check's x-leads-diagnostic header (the LEADS_SHEET_SECRET). Send {"dryRun": true} to only see the numbers.
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const secret = (process.env.LEADS_SHEET_SECRET || '').trim();
  if (!secret || request.headers.get('x-leads-diagnostic') !== secret) return Response.json({ ok: false, error: 'not allowed' }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  try {
    return Response.json({ ok: true, ...(await updateReviewCount({ dryRun: Boolean(body?.dryRun) })) });
  } catch (e) {
    return Response.json({ ok: false, error: e.message }, { status: 502 });
  }
}
