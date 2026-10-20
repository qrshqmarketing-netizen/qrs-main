// POST from the Users page (/admin/users/, components/admin/UsersManager.jsx). Admins only, from the site's own pages (lib/adminAuth.js).
//   { action: 'create', user: { name, email, password, role } }        add an account (already confirmed)
//   { action: 'update', id, user: { name?, email?, password?, role? } } change any of those (a blank password keeps the old one)
//   { action: 'approve' | 'suspend', id }                              give or take away dashboard access
//   { action: 'delete', id }                                           delete the account
// Roles: 'admin' (can use the dashboard) or 'pending' (no access; registrations wait here). Nobody can delete themselves or take away their own
// access, and the last admin can't be removed or demoted while the shared team password is switched off (someone must always be able to log in).
import { addAccount, approveAccount, currentAdmin, editAccount, MIN_ACCOUNT_PASSWORD, removeAccount, sameOrigin, suspendAccount, teamList, teamPasswordReady } from '@/lib/adminAuth';

const fail = (status, error) => Response.json({ ok: false, error }, { status });
const ROLES = ['admin', 'pending'];
const UUID = /^[0-9a-f-]{36}$/i;

function clean(input, { creating }) {
  const out = {};
  const errors = [];
  if (creating || 'name' in input) {
    out.name = String(input.name ?? '').replace(/\s+/g, ' ').trim().slice(0, 80);
    if (out.name.length < 2) errors.push('Type a name.');
  }
  if (creating || 'email' in input) {
    out.email = String(input.email ?? '').trim().toLowerCase().slice(0, 200);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(out.email)) errors.push('Type a valid email address.');
  }
  const pass = String(input.password ?? '');
  if (creating || pass) {
    if (pass.length < MIN_ACCOUNT_PASSWORD || pass.length > 200) errors.push(`Use a password of at least ${MIN_ACCOUNT_PASSWORD} characters.`);
    else out.password = pass;
  }
  if (creating || 'role' in input) {
    out.role = ROLES.includes(input.role) ? input.role : null;
    if (!out.role) errors.push('Choose the access.');
  }
  return { fields: out, errors };
}

export async function POST(request) {
  if (!(await sameOrigin())) return fail(403, 'Not allowed.');
  const who = await currentAdmin();
  if (!who) return fail(401, 'Your session ended. Log in again.');
  let body;
  try {
    body = await request.json();
  } catch {
    return fail(400, 'Bad request.');
  }
  const action = body?.action;

  if (action === 'create') {
    const { fields, errors } = clean(body.user || {}, { creating: true });
    if (errors.length) return fail(400, errors.join(' '));
    const res = await addAccount(fields);
    if (res.exists) return fail(409, 'An account with that email already exists.');
    if (!res.ok) return fail(502, res.error);
    return Response.json({ ok: true });
  }

  const id = String(body?.id ?? '');
  if (!UUID.test(id)) return fail(400, 'Bad request.');
  const users = await teamList();
  if (!users) return fail(502, 'Could not reach the login service. Try again in a moment.');
  const target = users.find((u) => u.id === id);
  if (!target) return fail(404, 'That account no longer exists.');

  // Would this leave nobody able to log in? (another admin, or the shared team password, must remain)
  const losesAdmin = (action === 'delete' || action === 'suspend' || (action === 'update' && body.user?.role === 'pending')) && target.role === 'admin';
  if (losesAdmin && id === who.id) return fail(400, action === 'delete' ? 'You can’t delete your own account.' : 'You can’t take away your own access.');
  if (action === 'delete' && id === who.id) return fail(400, 'You can’t delete your own account.');
  if (losesAdmin && !teamPasswordReady() && users.filter((u) => u.role === 'admin').length <= 1) return fail(400, 'This is the last admin. Add another admin first.');

  if (action === 'approve' || action === 'suspend') {
    if (!(await (action === 'approve' ? approveAccount(id) : suspendAccount(id)))) return fail(502, 'The login service did not accept the change. Try again in a moment.');
    return Response.json({ ok: true });
  }
  if (action === 'delete') {
    if (!(await removeAccount(id))) return fail(502, 'The login service did not accept the change. Try again in a moment.');
    return Response.json({ ok: true });
  }
  if (action === 'update') {
    const { fields, errors } = clean(body.user || {}, { creating: false });
    if (errors.length) return fail(400, errors.join(' '));
    if (!Object.keys(fields).length) return fail(400, 'Nothing to save.');
    const res = await editAccount(id, fields);
    if (res.exists) return fail(409, 'Another account already uses that email.');
    if (!res.ok) return fail(502, res.error);
    return Response.json({ ok: true });
  }
  return fail(400, 'Bad request.');
}
