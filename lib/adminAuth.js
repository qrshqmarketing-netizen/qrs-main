// Who may use the dashboard at /admin/. One shared password (ADMIN_PASSWORD in Vercel, at least 12 characters), checked on the server, which
// then gives the browser a signed cookie that lasts 12 hours. The cookie is signed with a key made from the password and the Supabase secret
// key, so changing the password signs everyone out, and it can't be made without knowing both. Server-side only.
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { cookies, headers } from 'next/headers';
import { dbSettings } from '@/lib/supabase';

export const ADMIN_COOKIE = 'qrs_admin';
export const SESSION_SECONDS = 12 * 60 * 60;
export const MIN_PASSWORD = 12;

const env = (name) => (process.env[name] || '').trim();
const sha = (s) => createHash('sha256').update(String(s)).digest();
const signKey = () => sha(`qrs-admin|${env('ADMIN_PASSWORD')}|${dbSettings().key}`);
const sign = (text) => createHmac('sha256', signKey()).update(text).digest('hex');

// Can anyone log in at all? (the password is set and long enough, and there is a key to sign with)
export const adminReady = () => env('ADMIN_PASSWORD').length >= MIN_PASSWORD && Boolean(dbSettings().key);

export const passwordMatches = (input) => adminReady() && timingSafeEqual(sha(input), sha(env('ADMIN_PASSWORD')));

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
  return validSession((await cookies()).get(ADMIN_COOKIE)?.value);
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
