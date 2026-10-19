// The pure parts of the dashboard login, registration and team list with Supabase Auth (used by lib/adminAuth.js; no Next.js imports, so scripts/test-functions.mjs tests them on their own).
// Supabase Auth checks the team member's email and password once, at login. After that the browser holds the site's own signed cookie
// (12 hours, `expires.userId.signature`), and each request is re-checked against Supabase (the user must still exist, not be banned and still
// have the admin role), so removing someone in Supabase locks them out within a minute.
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export const sessionKey = (secretKey) => createHash('sha256').update(`qrs-admin-auth|${secretKey}`).digest();
const sig = (key, text) => createHmac('sha256', key).update(text).digest('hex');

export function makeAuthToken(key, uid, seconds = 12 * 60 * 60, now = Date.now()) {
  const body = `${now + seconds * 1000}.${uid}`;
  return `${body}.${sig(key, body)}`;
}

// The user id inside a valid, unexpired token, or ''
export function readAuthToken(key, token, now = Date.now()) {
  if (typeof token !== 'string') return '';
  const [expires, uid, signature, extra] = token.split('.');
  if (!expires || !uid || !signature || extra !== undefined || Number(expires) < now) return '';
  const expected = sig(key, `${expires}.${uid}`);
  return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected)) ? uid : '';
}

export const isAdminUser = (user) => Boolean(user?.id) && user.app_metadata?.role === 'admin' && !(user.banned_until && Date.parse(user.banned_until) > Date.now());
// 'admin', 'pending' (registered at /admin/register/, waiting for an admin to approve it) or '' (any other account)
export const userRole = (user) => (['admin', 'pending'].includes(user?.app_metadata?.role) ? user.app_metadata.role : '');
// What the dashboard shows about a person (never the password or tokens)
export const publicUser = (user) => ({
  id: user.id,
  email: user.email || '',
  name: String(user.user_metadata?.name || '').slice(0, 80),
  role: userRole(user),
  createdAt: user.created_at || '',
  lastSignIn: user.last_sign_in_at || '',
});

const keyHeaders = (key, extra = {}) => ({ apikey: key, ...(key.startsWith('eyJ') && { Authorization: `Bearer ${key}` }), ...extra });

// Email + password against Supabase Auth. { ok: true, user } or { ok: false, status, error } (the error is safe to show)
export async function supabaseLogin({ url, publishableKey, email, password, fetchFn = fetch }) {
  let res;
  try {
    res = await fetchFn(`${url}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: keyHeaders(publishableKey, { 'Content-Type': 'application/json' }),
      body: JSON.stringify({ email, password }),
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    return { ok: false, status: 502, error: 'Could not reach the login service. Try again in a moment.' };
  }
  if (res.status === 400 || res.status === 401 || res.status === 422) return { ok: false, status: 401, error: 'That email or password is not right.' };
  if (!res.ok) return { ok: false, status: 502, error: 'The login service had a problem. Try again in a moment.' };
  const user = (await res.json().catch(() => ({}))).user;
  // A registered account still waiting for approval is told so; any other account that isn't a team member has no access
  if (userRole(user) === 'pending') return { ok: false, status: 403, error: 'Your account is waiting for an admin to approve it. You can log in once it is approved.' };
  if (!isAdminUser(user)) return { ok: false, status: 403, error: 'This account does not have dashboard access.' };
  return { ok: true, user };
}

// The current record of a user, through the admin API with the secret key (null when it doesn't exist or can't be read)
export async function fetchUser({ url, secretKey, uid, fetchFn = fetch }) {
  try {
    const res = await fetchFn(`${url}/auth/v1/admin/users/${encodeURIComponent(uid)}`, { headers: keyHeaders(secretKey), signal: AbortSignal.timeout(8000) });
    return res.ok ? await res.json() : res.status === 404 ? { id: '' } : null;
  } catch {
    return null;
  }
}

// Registering (app/api/admin/register): the server makes the account through the admin API with the secret key, already confirmed (no email
// round trip) and marked 'pending' in app_metadata, which only the secret key can change, so a new account can't let itself in. Supabase's own
// public sign-up can stay switched off. { ok: true } | { ok: false, exists: true } | { ok: false, error }
export async function createPendingUser({ url, secretKey, email, password, name, fetchFn = fetch }) {
  let res;
  try {
    res = await fetchFn(`${url}/auth/v1/admin/users`, {
      method: 'POST',
      headers: keyHeaders(secretKey, { 'Content-Type': 'application/json' }),
      body: JSON.stringify({ email, password, email_confirm: true, app_metadata: { role: 'pending' }, user_metadata: { name } }),
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    return { ok: false, error: 'Could not reach the login service. Try again in a moment.' };
  }
  if (res.ok) return { ok: true };
  const text = await res.text().catch(() => '');
  if (res.status === 422 && /already|exists|registered/i.test(text)) return { ok: false, exists: true };
  if (res.status === 422 && /password/i.test(text)) return { ok: false, error: 'Choose a stronger password.' };
  return { ok: false, error: 'The login service had a problem. Try again in a moment.' };
}

// Everyone with an account (the Team page), newest first; null when Supabase can't be reached
export async function listUsers({ url, secretKey, fetchFn = fetch }) {
  try {
    const res = await fetchFn(`${url}/auth/v1/admin/users?page=1&per_page=200`, { headers: keyHeaders(secretKey), signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.users || []).map(publicUser).sort((a, b) => Date.parse(b.createdAt || 0) - Date.parse(a.createdAt || 0));
  } catch {
    return null;
  }
}

// Approve (role 'admin') or take access away (role 'pending') without deleting the account
export async function setUserRole({ url, secretKey, uid, role, fetchFn = fetch }) {
  try {
    const res = await fetchFn(`${url}/auth/v1/admin/users/${encodeURIComponent(uid)}`, {
      method: 'PUT',
      headers: keyHeaders(secretKey, { 'Content-Type': 'application/json' }),
      body: JSON.stringify({ app_metadata: { role } }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Decline a request or remove a person: the account is deleted
export async function deleteUser({ url, secretKey, uid, fetchFn = fetch }) {
  try {
    const res = await fetchFn(`${url}/auth/v1/admin/users/${encodeURIComponent(uid)}`, { method: 'DELETE', headers: keyHeaders(secretKey), signal: AbortSignal.timeout(8000) });
    return res.ok || res.status === 404;
  } catch {
    return false;
  }
}
