export const maxDuration = 300; // "Run now" can send up to 150 emails at about two a second
// POST from the dashboard's campaigns pages (lib/drips.js). Admins only, from the site's own pages.
//   { action: 'save', id?, campaign }      add or update a campaign      → { ok, id }
//   { action: 'delete', id }                delete it (its enrollments and send log go with it)
//   { action: 'test', campaign, step, to }  send one of its emails to an address, marked TEST
//   { action: 'run' }                       run the drips now (the daily 8 AM run does the same)
import { isAdmin, sameOrigin } from '@/lib/adminAuth';
import { deleteCampaign, runDrips, saveCampaign, sendTest } from '@/lib/drips';

const fail = (status, error) => Response.json({ ok: false, error }, { status });
const missingTables = (err) => /PGRST205|relation .* does not exist|Could not find the table/i.test(err.message || '');

export async function POST(request) {
  if (!(await sameOrigin())) return fail(403, 'Not allowed.');
  if (!(await isAdmin())) return fail(401, 'Your session ended. Log in again.');
  let body;
  try {
    body = await request.json();
  } catch {
    return fail(400, 'Bad request.');
  }
  try {
    if (body?.action === 'save') {
      const { campaign, errors } = await saveCampaign(body.id || null, body.campaign || {});
      if (errors) return fail(400, errors.join(' '));
      return Response.json({ ok: true, id: campaign?.id });
    }
    if (body?.action === 'delete') {
      if (!(await deleteCampaign(body.id))) return fail(404, 'That campaign was not found.');
      return Response.json({ ok: true });
    }
    if (body?.action === 'test') {
      const to = String(body.to || '').trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(to)) return fail(400, 'Enter an email address to send the test to.');
      const result = await sendTest({ campaign: body.campaign || {}, stepIndex: Number(body.step) || 0, to });
      return result.ok ? Response.json({ ok: true }) : fail(400, result.error);
    }
    if (body?.action === 'run') return Response.json(await runDrips());
    return fail(400, 'Unknown action.');
  } catch (err) {
    console.error('[admin campaigns]', err.message);
    if (missingTables(err)) return fail(503, 'The campaign tables are not set up yet: run scripts/supabase-campaigns.sql once in the Supabase SQL Editor.');
    return fail(502, 'Supabase did not accept the change. Try again in a moment.');
  }
}
