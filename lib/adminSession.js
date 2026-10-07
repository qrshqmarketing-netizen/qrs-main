// The pure parts of the dashboard login with Supabase Auth (used by lib/adminAuth.js; no Next.js imports, so scripts/test-functions.mjs tests them on their own).
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
  // A valid account that isn't marked as a team member gets the same answer as a wrong password
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
