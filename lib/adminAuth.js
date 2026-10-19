// Who may use the dashboard at /admin/. Two ways in; either way the browser gets a signed cookie that lasts 12 hours. Server-side only.
// - Personal accounts (Supabase Auth; on whenever the site has the Supabase URL and secret key): each team member logs in with their own email
//   and password. Anyone can register at /admin/register/ (app/api/admin/register), but the new account is 'pending' until an admin approves it
//   on the Team page (/admin/team/; owner, October 19 2026). Only accounts with the role 'admin' in app_metadata get in (the secret key is
//   the only thing that can set it; scripts/supabase-admin-users.sql marks the first ones by hand). The pure parts are in lib/adminSession.js.
//   Every request is re-checked against Supabase (cached for a minute), so removing a person locks them out.
// - The shared team password (ADMIN_PASSWORD, at least 8 characters; logins are limited to 5 tries per 10 minutes): the owner's way in, which
//   can also approve the first accounts. ADMIN_AUTH=supabase switches it off, leaving personal accounts only. The cookie is signed with a key made
//   from the password and the Supabase secret key, so changing the password signs everyone out, and it can't be made without knowing both.
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { cookies, headers } from 'next/headers';
import { cleanPassword } from '@/lib/adminPassword';
import { createPendingUser, deleteUser, fetchUser, isAdminUser, listUsers, makeAuthToken, publicUser, readAuthToken, sessionKey, setUserRole, supabaseLogin } from '@/lib/adminSession';
import { dbConfigured, dbSettings } from '@/lib/supabase';

export const ADMIN_COOKIE = 'qrs_admin';
export const SESSION_SECONDS = 12 * 60 * 60;
export const MIN_PASSWORD = 8; // the shared team password
export const MIN_ACCOUNT_PASSWORD = 10; // a personal account's password

const password = () => cleanPassword(process.env.ADMIN_PASSWORD);
const sha = (s) => createHash('sha256').update(String(s)).digest();
const signKey = () => sha(`qrs-admin|${password()}|${dbSettings().key}`);
const sign = (text) => createHmac('sha256', signKey()).update(text).digest('hex');

// The key Supabase checks a login with: the publishable key (sb_publishable_...) when it is set, else the secret key (both stay on the server here)
const publishableKey = () => (process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '').trim();
const loginKey = () => publishableKey() || dbSettings().key;
const supa = () => ({ url: dbSettings().url, secretKey: dbSettings().key });

// Personal accounts work whenever Supabase is connected with a secret key
export const accountsReady = () => dbConfigured();
// The shared team password works when it is set (8+ characters), there is a key to sign with, and ADMIN_AUTH isn't 'supabase'
export const teamPasswordReady = () => (process.env.ADMIN_AUTH || '').trim() !== 'supabase' && password().length >= MIN_PASSWORD && Boolean(dbSettings().key);
// Can anyone log in at all?
export const adminReady = () => accountsReady() || teamPasswordReady();
// Kept for the older callers: true when email + password is the only way in
export const authMode = () => accountsReady() && !teamPasswordReady();

export const loginWithSupabase = (email, pass) => supabaseLogin({ url: dbSettings().url, publishableKey: loginKey(), email, password: pass });
export const makeAuthSession = (uid) => makeAuthToken(sessionKey(dbSettings().key), uid);
export const registerAccount = ({ email, password: pass, name }) => createPendingUser({ ...supa(), email, password: pass, name });

// Who was last confirmed as an admin, for a minute (one call to Supabase per person per minute, not one per click)
const checked = new Map();
async function accountFromToken(token) {
  if (!accountsReady()) return null;
  const uid = readAuthToken(sessionKey(dbSettings().key), token);
  if (!uid) return null;
  const hit = checked.get(uid);
  if (hit && Date.now() - hit.at < 60000) return hit.who;
  const user = await fetchUser({ ...supa(), uid });
  if (user === null) return hit?.who ?? null; // Supabase couldn't be reached: keep the last answer, or stay out
  const who = isAdminUser(user) ? { kind: 'account', ...publicUser(user) } : null;
  checked.set(uid, { who, at: Date.now() });
  return who;
}
const forget = (uid) => checked.delete(uid);

export const passwordMatches = (input) => teamPasswordReady() && timingSafeEqual(sha(cleanPassword(input)), sha(password()));

export const makeSession = () => {
  const expires = Date.now() + SESSION_SECONDS * 1000;
  return `${expires}.${sign(String(expires))}`;
};

export function validSession(token) {
  if (!teamPasswordReady() || typeof token !== 'string') return false;
  const [expires, signature, extra] = token.split('.');
  if (!expires || !signature || extra !== undefined || Number(expires) < Date.now()) return false;
  const expected = sign(expires);
  return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

// The signed-in person, or null: { kind: 'owner', name } (the shared team password) or { kind: 'account', id, email, name, role }
export async function currentAdmin() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  if (validSession(token)) return { kind: 'owner', id: '', email: '', name: 'Team owner', role: 'admin' };
  return accountFromToken(token);
}
export const isAdmin = async () => Boolean(await currentAdmin());

// The Team page: everyone with an account, newest first (null when Supabase can't be reached)
export const teamList = () => (accountsReady() ? listUsers(supa()) : Promise.resolve([]));
export async function approveAccount(uid) {
  forget(uid);
  return setUserRole({ ...supa(), uid, role: 'admin' });
}
export async function suspendAccount(uid) {
  forget(uid);
  return setUserRole({ ...supa(), uid, role: 'pending' });
}
export async function removeAccount(uid) {
  forget(uid);
  return deleteUser({ ...supa(), uid });
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
