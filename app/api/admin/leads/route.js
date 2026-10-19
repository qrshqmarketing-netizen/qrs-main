// POST from the dashboard's leads views (lib/adminLeads.js). Admins only, from the site's own pages.
//   { action: 'create', lead: {...} }          adds a lead by hand          → { ok, id }
//   { action: 'update', id, lead: {...} }      edits any of its fields      → { ok, lead }
//   { action: 'delete', id }                   deletes it for good          → { ok }
//   { id, status?, notes? }                    the follow-up panel and Kanban moves (the same as 'update')
import { isAdmin, sameOrigin } from '@/lib/adminAuth';
import { createLead, deleteLead, updateLeadFields } from '@/lib/adminLeads';

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
    if (body?.action === 'create') {
      const { lead, errors } = await createLead(body.lead || {});
      if (errors) return fail(400, errors.join(' '));
      return Response.json({ ok: true, id: lead?.id });
    }
    if (body?.action === 'delete') {
      if (!(await deleteLead(body.id))) return fail(404, 'That lead was not found.');
      return Response.json({ ok: true });
    }
    const fields = body?.action === 'update' ? body.lead || {} : Object.fromEntries(['status', 'notes'].filter((k) => k in (body || {})).map((k) => [k, body[k]]));
    const { lead, errors } = await updateLeadFields(body?.id, fields);
    if (errors) return fail(400, errors.join(' '));
    if (!lead) return fail(404, 'That lead was not found.');
    return Response.json({ ok: true, lead, status: lead.status, notes: lead.notes || '' });
  } catch (err) {
    console.error('[admin leads]', err.message);
    return fail(502, 'Supabase did not accept the change. Try again in a moment.');
  }
}
