// Spam and abuse protection for the site search (owner, November 9 2026): app/api/search (the header's suggestions) and app/search (results).
// - a per-visitor limit in memory per server instance, like the lead form's rateLimited(): 60 suggestion lookups and 20 result pages a minute
//   per address; past that the API answers 429 and the page shows a short message instead of searching;
// - spam-looking queries (links or web addresses, HTML or script fragments, long runs of symbols or repeated characters) are never searched and
//   never echoed back on the page;
// - queries are cut to 120 characters and 8 words (lib/siteSearch.js);
// - /search/ is noindex and disallowed in robots.txt (app/robots.js), so spam searches can never become indexed pages.
const LIMITS = { api: { max: 60, ms: 60 * 1000 }, page: { max: 20, ms: 60 * 1000 } };
const MAX_KEYS = 5000;
const seen = new Map();

export const clientIp = (headers) => headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown';

export function searchLimited(kind, ip) {
  const { max, ms } = LIMITS[kind] || LIMITS.page;
  const now = Date.now();
  const key = `${kind}:${ip}`;
  const hits = (seen.get(key) || []).filter((t) => now - t < ms);
  hits.push(now);
  seen.set(key, hits);
  // keep the table small: drop the oldest visitors when it grows past MAX_KEYS
  if (seen.size > MAX_KEYS) for (const k of [...seen.keys()].slice(0, seen.size - MAX_KEYS)) seen.delete(k);
  return hits.length > max;
}

// A query that looks like spam rather than a person looking for a roofing page
export function spammyQuery(q) {
  const s = String(q || '');
  if (!s.trim()) return false;
  if (/https?:|www\.|\.(com|net|org|ru|xyz|top|io|co)\b|@[a-z0-9-]+\./i.test(s)) return true; // links, addresses, emails
  if (/<[^>]*>|javascript:|\{\{|\$\{|<script/i.test(s)) return true; // markup or script
  if (/(.)\1{5,}/.test(s)) return true; // aaaaaa
  const letters = (s.match(/[a-z0-9\s'&-]/gi) || []).length;
  return letters / s.length < 0.7; // mostly symbols
}
