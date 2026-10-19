// POST { id, status?, notes? }: saves a lead's follow-up status and notes from the dashboard (lib/adminLeads.js). Admins only, from the site's own pages.
import { isAdmin, sameOrigin } from '@/lib/adminAuth';
import { updateLead } from '@/lib/adminLeads';

const fail = (status, error) => Response.json({ ok: false, error }, { status });

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
    const lead = await updateLead(body?.id, { status: body?.status, notes: body?.notes });
    if (!lead) return fail(404, 'That lead was not found.');
    return Response.json({ ok: true, status: lead.status, notes: lead.notes || '' });
  } catch (err) {
    return fail(/Unknown status|Bad lead/.test(err.message) ? 400 : 502, /Unknown status|Bad lead/.test(err.message) ? 'Bad request.' : 'Supabase did not accept the change. Try again in a moment.');
  }
}
