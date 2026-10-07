// Small helpers shared by the Edge Functions: reading text safely, CORS for the website, the visitor's address (hashed) and JSON answers.
// Plain JavaScript (no Deno or Node calls) so the same code runs in the functions and in the local tests (scripts/test-functions.mjs).

export const clip = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const DEFAULT_ORIGINS = ['https://qualityroofingspecialists.com', 'https://www.qualityroofingspecialists.com', 'http://localhost:3000'];

// The websites allowed to call the functions from a browser: ALLOWED_ORIGINS (comma-separated; a * matches any characters, like
// https://qrs-*.vercel.app for preview deployments) or the live site and localhost.
export function allowedOrigins(env) {
  const list = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  return list.length ? list : DEFAULT_ORIGINS;
}

const matches = (pattern, origin) =>
  pattern.includes('*') ? new RegExp(`^${pattern.split('*').map((p) => p.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*')}$`).test(origin) : pattern === origin;

export function corsHeaders(request, env) {
  const origin = request.headers.get('origin') || '';
  const allowed = allowedOrigins(env);
  const ok = allowed.some((p) => matches(p, origin));
  return {
    'Access-Control-Allow-Origin': ok ? origin : allowed[0].replace('*', 'invalid'),
    Vary: 'Origin',
    'Access-Control-Allow-Headers': 'content-type, x-leads-diagnostic, apikey, authorization, x-client-info',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
  };
}

export const json = (body, status, cors) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export const clientIp = (request) =>
  request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

// A short fingerprint of the visitor's address for the rate limits and the chat log: the address itself is never stored
export async function hashIp(ip, salt = '') {
  const bytes = new TextEncoder().encode(`${salt}|${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].slice(0, 8).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// "2026-10-14" -> "Tuesday, October 14, 2026"
export const formatDay = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
