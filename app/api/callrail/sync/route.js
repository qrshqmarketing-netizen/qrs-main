import { callrailConfigured, syncRecentCalls } from '@/lib/callrail';
import { deliverLead } from '@/lib/leads';
import { dbConfigured, dbRequest } from '@/lib/supabase';

// Daily import of CallRail calls into the leads table (lib/callrail.js syncRecentCalls), run by the Vercel Cron Job in vercel.json (the Hobby
// plan allows one run a day; on Pro, make the schedule hourly). It works without CallRail's webhook, which this account's API key can't set up.
// Who may run it: Vercel's cron (with CRON_SECRET set in Vercel, its `Authorization: Bearer` header is required), or a request with the lead
// setup check's x-leads-diagnostic header (the LEADS_SHEET_SECRET), which gets the details back. Anything else is turned away. Running it twice
// is harmless: calls already saved are skipped.
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

let lastRun = 0;

export async function GET(request) {
  const cronSecret = (process.env.CRON_SECRET || '').trim();
  const sheetSecret = (process.env.LEADS_SHEET_SECRET || '').trim();
  const fromCron = cronSecret ? request.headers.get('authorization') === `Bearer ${cronSecret}` : /vercel-cron/i.test(request.headers.get('user-agent') || '');
  const manual = Boolean(sheetSecret) && request.headers.get('x-leads-diagnostic') === sheetSecret;
  if (!fromCron && !manual) return Response.json({ ok: false, error: 'not allowed' }, { status: 401 });
  if (!callrailConfigured() || !dbConfigured()) return Response.json({ ok: false, error: 'CallRail or Supabase not configured' }, { status: 503 });
  if (!manual && Date.now() - lastRun < 5 * 60 * 1000) return Response.json({ ok: true, skipped: 'ran a moment ago' });
  lastRun = Date.now();

  // The CallRail ids already saved (the last 10 days of phone-call leads; the sync looks back 7)
  const seenIds = async () => {
    const since = new Date(Date.now() - 10 * 86400 * 1000).toISOString();
    const rows = await dbRequest(`leads?select=message&source=ilike.${encodeURIComponent('Phone call*')}&created_at=gte.${encodeURIComponent(since)}&limit=5000`);
    return new Set((rows || []).map((r) => (String(r.message || '').match(/CallRail call (\S+)/) || [])[1]).filter(Boolean));
  };
  try {
    const result = await syncRecentCalls({ deliver: deliverLead, seenIds });
    console.log('[callrail] sync:', JSON.stringify(result));
    return Response.json({ ok: !result.error, ...result });
  } catch (e) {
    console.error('[callrail] sync failed:', e.message);
    return Response.json({ ok: false, error: e.message }, { status: 502 });
  }
}
