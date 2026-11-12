// Opens and clicks in the emails the site sends (owner, November 12 2026): the drip campaigns (lib/drips.js) and the article newsletter
// (lib/newsletter.js). Server-side only. Tables: scripts/supabase-email-tracking.sql (run once).
//  - Every email that has a send row carries an open pixel (/api/e/o/<token>/) and every link in it (not the unsubscribe link, mailto or tel) goes
//    through /api/e/c/<token>/?u=<link>&s=<signature>, which records the click and redirects to the link. The token names the send (campaign_sends.id
//    or newsletter_sends.id) and is signed, and the link is signed together with the send, so only links we put in an email can be followed:
//    nobody can use the redirect to send people to a site of their choice, and nobody can make up opens or clicks.
//  - Nothing about the reader is stored except the time, the link and the user agent (to tell mail scanners from people). No IP address.
//  - Honest limits: an open is a picture load, so it is missed when the mail app blocks images, and Apple Mail's privacy setting and some other
//    apps load the picture for everyone (so opens run high there). Clicks are the reliable number. Security scanners that open links and pictures
//    are flagged (is_bot) and left out of the counts when their user agent says so.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { SITE_URL } from '@/data/site';
import { dbRequest } from '@/lib/supabase';

const env = (name) => (process.env[name] || '').trim();
const key = () => env('UNSUBSCRIBE_SECRET') || env('SUPABASE_SECRET_KEY') || env('SUPABASE_SERVICE_ROLE_KEY') || env('LEADS_SHEET_SECRET');
const sign = (text) => createHmac('sha256', key()).update(`track:${text}`).digest('base64url').slice(0, 22);
const same = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const KINDS = { c: 'campaign', n: 'newsletter' };

// token: kind letter + the send's uuid (36 characters) + the 22-character signature, with no dot (a dot makes Next.js treat the address as a file
// and strip the trailing slash): "c" = a campaign send, "n" = a newsletter send
export const sendToken = (sendKind, id) => `${sendKind === 'newsletter' ? 'n' : 'c'}${id}${sign(`${sendKind}:${id}`)}`;
export function readToken(token) {
  const t = String(token || '');
  const sendKind = KINDS[t[0]];
  const id = t.slice(1, 37);
  const sig = t.slice(37);
  if (!sendKind || !UUID.test(id) || sig.length !== 22 || !key() || !same(sig, sign(`${sendKind}:${id}`))) return null;
  return { sendKind, id };
}

// The open pixel's address, and a link wrapped for click tracking
export const pixelUrl = (sendKind, id) => `${SITE_URL}/api/e/o/${sendToken(sendKind, id)}/`;
export function trackedHref(sendKind, id, url) {
  if (!/^https?:\/\//i.test(url) || /\/unsubscribe\//.test(url)) return url;
  return `${SITE_URL}/api/e/c/${sendToken(sendKind, id)}/?u=${encodeURIComponent(url)}&s=${sign(`click:${sendKind}:${id}:${url}`)}`;
}
export function readClick(token, url, sig) {
  const t = readToken(token);
  if (!t || !/^https?:\/\//i.test(url || '') || !sig || !same(sig, sign(`click:${t.sendKind}:${t.id}:${url}`))) return null;
  return { ...t, url };
}

const SCANNER = /bot\b|crawl|spider|preview|scanner|proofpoint|barracuda|mimecast|safelinks|defender|symantec|trend ?micro|python|curl|wget|headless|go-http|java\//i;
export const looksLikeScanner = (ua) => SCANNER.test(String(ua || ''));

export async function recordEvent({ kind, sendKind, sendId, url = null, userAgent = '' }) {
  await dbRequest('email_events', {
    method: 'POST',
    prefer: 'return=minimal',
    body: { kind, send_kind: sendKind, send_id: sendId, url: url ? String(url).slice(0, 500) : null, user_agent: String(userAgent || '').slice(0, 200) || null, is_bot: looksLikeScanner(userAgent) },
  });
}

// The numbers: load the (non-scanner) events of one kind of send once, then summarize them for any set of sends
export async function loadEvents(sendKind) {
  return (await dbRequest(`email_events?send_kind=eq.${sendKind}&is_bot=is.false&select=kind,send_id,url&limit=100000`)) || [];
}
// Unique opens and clicks (one per email: a click also counts as an open), and the most clicked links of the sends in `ids`
export function summarizeEvents(rows, ids) {
  const want = new Set(ids);
  const mine = rows.filter((r) => want.has(r.send_id));
  const opened = new Set(mine.filter((r) => r.kind === 'open' || r.kind === 'click').map((r) => r.send_id));
  const clicked = new Set(mine.filter((r) => r.kind === 'click').map((r) => r.send_id));
  const byUrl = new Map();
  for (const r of mine) if (r.kind === 'click' && r.url) byUrl.set(r.url, (byUrl.get(r.url) || new Set()).add(r.send_id));
  const links = [...byUrl].map(([url, set]) => ({ url, clicks: set.size })).sort((a, b) => b.clicks - a.clicks).slice(0, 5);
  return { opened: opened.size, clicked: clicked.size, links };
}
