// Who may use the dashboard at /admin/. Two ways in, picked by the settings on the server; either way the browser gets a signed cookie that
// lasts 12 hours. Server-side only.
// - Supabase Auth (only when ADMIN_AUTH=supabase and SUPABASE_PUBLISHABLE_KEY are both set, with the Supabase URL and secret key): each team member logs in with their own email and
//   password (accounts made in Supabase → Authentication → Users, marked as admins with scripts/supabase-admin-users.sql). The pure parts are in
//   lib/adminSession.js. Every request is re-checked against Supabase (cached for a minute), so removing a person there locks them out.
// - The shared password (ADMIN_PASSWORD, at least 12 characters), as before. The cookie is signed with a key made from the password and the Supabase
//   secret key, so changing the password signs everyone out, and it can't be made without knowing both.
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { cookies, headers } from 'next/headers';
import { cleanPassword } from '@/lib/adminPassword';
import { fetchUser, isAdminUser, makeAuthToken, readAuthToken, sessionKey, supabaseLogin } from '@/lib/adminSession';
import { dbSettings } from '@/lib/supabase';

export const ADMIN_COOKIE = 'qrs_admin';
export const SESSION_SECONDS = 12 * 60 * 60;
export const MIN_PASSWORD = 12;

const password = () => cleanPassword(process.env.ADMIN_PASSWORD);
const sha = (s) => createHash('sha256').update(String(s)).digest();
const signKey = () => sha(`qrs-admin|${password()}|${dbSettings().key}`);
const sign = (text) => createHmac('sha256', signKey()).update(text).digest('hex');

// Supabase Auth mode: a publishable key (sb_publishable_..., safe to be public, only used to ask Supabase to check a login) next to the project URL and secret key
const publishableKey = () => (process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '').trim();
// Supabase logins are opt-in: they need ADMIN_AUTH=supabase as well as the publishable key. Without it the dashboard uses the one shared password (ADMIN_PASSWORD).
export const authMode = () => (process.env.ADMIN_AUTH || '').trim() === 'supabase' && Boolean(publishableKey() && dbSettings().url && dbSettings().key);
export const loginWithSupabase = (email, pass) => supabaseLogin({ url: dbSettings().url, publishableKey: publishableKey(), email, password: pass });
export const makeAuthSession = (uid) => makeAuthToken(sessionKey(dbSettings().key), uid);

// Who was last confirmed as an admin, for a minute (one call to Supabase per person per minute, not one per click)
const checked = new Map();
async function authSessionValid(token) {
  const uid = readAuthToken(sessionKey(dbSettings().key), token);
  if (!uid) return false;
  const hit = checked.get(uid);
  if (hit && Date.now() - hit.at < 60000) return hit.ok;
  const user = await fetchUser({ url: dbSettings().url, secretKey: dbSettings().key, uid });
  if (user === null) return hit?.ok ?? false; // Supabase couldn't be reached: keep the last answer, or stay out
  const ok = isAdminUser(user);
  checked.set(uid, { ok, at: Date.now() });
  return ok;
}

// Can anyone log in at all? (the password is set and long enough, and there is a key to sign with)
export const adminReady = () => authMode() || (password().length >= MIN_PASSWORD && Boolean(dbSettings().key));

export const passwordMatches = (input) => adminReady() && timingSafeEqual(sha(cleanPassword(input)), sha(password()));

export const makeSession = () => {
  const expires = Date.now() + SESSION_SECONDS * 1000;
  return `${expires}.${sign(String(expires))}`;
};

export function validSession(token) {
  if (!adminReady() || typeof token !== 'string') return false;
  const [expires, signature] = token.split('.');
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = sign(expires);
  return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function isAdmin() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  return authMode() ? authSessionValid(token) : validSession(token);
}

export const cookieOptions = (maxAge = SESSION_SECONDS) => ({
  httpOnly: true, // no script on the page can read it
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict', // never sent along with a request that starts on another site
  path: '/',
  maxAge,
});

// Changes only count when they come from this site's own pages (the Origin header names the site the request started on)
export async function sameOrigin() {
  const h = await headers();
  const origin = h.get('origin');
  const host = h.get('x-forwarded-host') || h.get('host');
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export const clientIp = async () => {
  const h = await headers();
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
};
