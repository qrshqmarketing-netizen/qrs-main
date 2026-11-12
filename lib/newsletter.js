// The article newsletter (owner, November 12 2026). "Email me the latest articles": a subscribe box in the footer and a checkbox on the request
// forms. Every new article is emailed to the confirmed subscribers by the daily cron (app/api/posts/scheduled → notifyNewArticles). Server-side only.
//
// - Double opt-in. A request (footer or form checkbox) saves the address as `pending` and sends one email with a signed confirmation link; only
//   a click on the confirm button (/subscribe/confirm/, a POST, so a mail scanner opening the link confirms nothing) makes it `confirmed`.
//   Nobody can be signed up by typing someone else's address, and the link in the first email is the only thing a stranger would ever get.
// - Every email has the company's name and address, a one-click unsubscribe link and List-Unsubscribe headers (the same link and suppression
//   list as the drip campaigns, lib/drips.js): one unsubscribe stops everything.
// - Which articles: live ones dated in the last 3 days that haven't been sent (newsletter_issues), so the first run never mails the back
//   catalogue and a later subscriber doesn't get old articles. Sends are recorded per address (newsletter_sends), so a run that stops halfway
//   carries on at the next one and nobody gets an article twice. At most MAX_PER_RUN emails a run.
// Tables: scripts/supabase-newsletter.sql (run once in the Supabase SQL Editor). Resend: RESEND_API_KEY + LEADS_FROM_EMAIL, as for the other emails.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { blogPath } from '@/data/catalog';
import { BUSINESS, PHONE, SITE_URL } from '@/data/site';
import { esc, resendReady, sendEmail, tokenKey, unsubscribeUrl } from '@/lib/drips';
import { getBlogPosts } from '@/lib/postsStore';
import { dbConfigured, dbRequest } from '@/lib/supabase';

const MAX_PER_RUN = 150;
const RECENT_DAYS = 3;
const CONFIRM_GAP = 10 * 60 * 1000; // one confirmation email per address every ten minutes
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const cleanEmail = (value) => {
  const e = String(value || '').trim().toLowerCase();
  return e.length <= 200 && EMAIL.test(e) ? e : '';
};

// ---------- confirmation links
const sign = (email) => createHmac('sha256', tokenKey()).update(`subscribe:${email}`).digest('base64url').slice(0, 22);
export const confirmToken = (email) => `${Buffer.from(email).toString('base64url')}.${sign(email)}`;
export function emailFromConfirmToken(token) {
  const [b64, sig] = String(token || '').split('.');
  if (!b64 || !sig || !tokenKey()) return null;
  let email;
  try {
    email = Buffer.from(b64, 'base64url').toString('utf8').toLowerCase();
  } catch {
    return null;
  }
  const want = Buffer.from(sign(email));
  const got = Buffer.from(sig);
  return want.length === got.length && timingSafeEqual(want, got) && EMAIL.test(email) ? email : null;
}
const confirmUrl = (email) => `${SITE_URL}/subscribe/confirm/?t=${confirmToken(email)}`;

// ---------- a per-address limit on requests (memory, per server instance, like the lead form's)
const hits = new Map();
export function subscribeLimited(key, max = 6, ms = 60 * 60 * 1000) {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < ms);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) for (const k of [...hits.keys()].slice(0, hits.size - 5000)) hits.delete(k);
  return list.length > max;
}

const footerHtml = (unsub, why) =>
  `<div style="max-width:560px;margin:0 auto;padding:16px 22px 28px;font-size:12px;line-height:1.5;color:#5d6570">${esc(BUSINESS.legalName)} · ${esc(addressLine())} · ${esc(PHONE)}<br>${why} <a href="${esc(unsub)}" style="color:#5d6570">Unsubscribe</a></div>`;
const addressLine = () => `${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}`;
const shell = (inner, unsub, why) =>
  `<!doctype html><html><body style="margin:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#0b1b2e"><div style="max-width:560px;margin:0 auto;padding:28px 22px;background:#ffffff;font-size:16px">${inner}</div>${footerHtml(unsub, why)}</body></html>`;
const button = (href, label) =>
  `<p style="margin:22px 0"><a href="${esc(href)}" style="display:inline-block;background:#c9921a;color:#0b1b2e;text-decoration:none;font-weight:700;padding:13px 24px;border-radius:999px">${esc(label)}</a></p>`;

// ---------- asking to subscribe
// Saves the address as pending and sends the confirmation email. Always answers the same way to the visitor, so the form can't be used to find out
// who is on the list; `reason` is for the logs.
export async function requestSubscription({ email, name = '', source = 'footer' }) {
  const e = cleanEmail(email);
  if (!e) return { ok: false, reason: 'invalid' };
  if (!dbConfigured() || !resendReady()) return { ok: false, reason: 'not-configured' };
  const rows = await dbRequest(`newsletter_subscribers?email=eq.${encodeURIComponent(e)}&select=status,confirm_sent_at`);
  const row = rows?.[0];
  if (row?.status === 'confirmed') return { ok: true, reason: 'already-subscribed' };
  if (row?.confirm_sent_at && Date.now() - new Date(row.confirm_sent_at).getTime() < CONFIRM_GAP) return { ok: true, reason: 'recently-sent' };
  const now = new Date().toISOString();
  await dbRequest('newsletter_subscribers?on_conflict=email', {
    method: 'POST',
    prefer: 'resolution=merge-duplicates',
    body: { email: e, name: String(name || '').trim().slice(0, 120) || null, source: String(source).slice(0, 40), status: 'pending', confirm_sent_at: now },
  });
  const link = confirmUrl(e);
  const unsub = unsubscribeUrl(e);
  const html = shell(
    `<p style="margin:0 0 16px;line-height:1.6">Thanks for asking for our latest roofing articles. One more step: confirm that this is your address.</p>${button(link, 'Yes, send me the articles')}<p style="margin:0;line-height:1.6;color:#5d6570;font-size:14px">If you didn’t ask for this, ignore this email and you won’t get anything else from us.</p>`,
    unsub,
    'You’re getting this because this address was entered on our website.',
  );
  const text = `Thanks for asking for our latest roofing articles. One more step: confirm that this is your address.\n\nConfirm: ${link}\n\nIf you didn’t ask for this, ignore this email and you won’t get anything else from us.\n\n--\n${BUSINESS.legalName} · ${addressLine()} · ${PHONE}\nUnsubscribe: ${unsub}`;
  const sent = await sendEmail({ to: e, subject: `Confirm your subscription to ${BUSINESS.name} articles`, html, text, unsub });
  return sent.ok ? { ok: true, reason: 'sent' } : { ok: false, reason: `send-failed: ${sent.error}` };
}

// The confirm button: the address becomes a subscriber, and an earlier unsubscribe is lifted (they've now asked again)
export async function confirmSubscription(email) {
  const e = cleanEmail(email);
  if (!e) return false;
  const now = new Date().toISOString();
  await dbRequest('newsletter_subscribers?on_conflict=email', {
    method: 'POST',
    prefer: 'resolution=merge-duplicates',
    body: { email: e, status: 'confirmed', confirmed_at: now, unsubscribed_at: null },
  });
  await dbRequest(`email_suppressions?email=eq.${encodeURIComponent(e)}`, { method: 'DELETE' }).catch(() => {});
  return true;
}

// ---------- emailing a new article
const pacificDay = (when) => new Date(when).toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });
const absolute = (src) => (!src ? '' : src.startsWith('/') ? `${SITE_URL}${src}` : src);

export function renderArticleEmail({ post, email }) {
  const href = new URL(`${SITE_URL}${blogPath(post.slug)}`);
  href.searchParams.set('utm_source', 'email');
  href.searchParams.set('utm_medium', 'newsletter');
  href.searchParams.set('utm_campaign', 'new-article');
  const link = href.toString();
  const unsub = unsubscribeUrl(email);
  const image = absolute(post.image || post.cardImage);
  const img = image ? `<a href="${esc(link)}"><img src="${esc(image)}" alt="${esc(post.imageAlt || '')}" width="516" style="display:block;width:100%;max-width:516px;height:auto;border:0;border-radius:8px;margin:0 0 18px"></a>` : '';
  const html = shell(
    `<p style="margin:0 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#7a5a10;font-weight:700">New on the ${esc(BUSINESS.name)} blog</p>${img}<h1 style="margin:0 0 12px;font-size:22px;line-height:1.25">${esc(post.title)}</h1><p style="margin:0 0 16px;line-height:1.6">${esc(post.excerpt || '')}</p>${button(link, 'Read the article')}`,
    unsub,
    'You’re getting this because you asked for our latest articles.',
  );
  const text = `New on the ${BUSINESS.name} blog\n\n${post.title}\n\n${post.excerpt || ''}\n\nRead the article: ${link}\n\n--\n${BUSINESS.legalName} · ${addressLine()} · ${PHONE}\nYou’re getting this because you asked for our latest articles. Unsubscribe: ${unsub}`;
  return { subject: post.title, html, text, unsub };
}

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

// Emails every live article from the last few days that hasn't gone out yet to the confirmed subscribers. Safe to run any number of times.
export async function notifyNewArticles({ max = MAX_PER_RUN } = {}) {
  if (!dbConfigured()) return { ok: false, skipped: 'Supabase is not configured' };
  if (!resendReady()) return { ok: false, skipped: 'Resend is not set up (RESEND_API_KEY and LEADS_FROM_EMAIL)' };
  const since = pacificDay(Date.now() - RECENT_DAYS * 864e5);
  const recent = (await getBlogPosts()).filter((p) => p.datePublished && p.datePublished >= since && !p.noindex);
  if (!recent.length) return { ok: true, articles: 0, sent: 0 };
  const done = new Set(((await dbRequest('newsletter_issues?select=slug')) || []).map((r) => r.slug));
  const todo = recent.filter((p) => !done.has(p.slug)).sort((a, b) => a.datePublished.localeCompare(b.datePublished));
  if (!todo.length) return { ok: true, articles: 0, sent: 0 };
  const subscribers = ((await dbRequest('newsletter_subscribers?status=eq.confirmed&select=email&limit=5000')) || []).map((r) => r.email);
  const blocked = new Set(((await dbRequest('email_suppressions?select=email&limit=20000')) || []).map((r) => r.email));
  const audience = subscribers.filter((e) => !blocked.has(e));
  let budget = max;
  const report = [];
  for (const post of todo) {
    const sentTo = new Set(((await dbRequest(`newsletter_sends?slug=eq.${encodeURIComponent(post.slug)}&select=email&limit=20000`)) || []).map((r) => r.email));
    const queue = audience.filter((e) => !sentTo.has(e));
    let sent = 0;
    let failed = 0;
    for (const email of queue) {
      if (budget <= 0) break;
      budget -= 1;
      const result = await sendEmail({ to: email, ...renderArticleEmail({ post, email }) });
      await dbRequest('newsletter_sends?on_conflict=slug,email', {
        method: 'POST',
        prefer: 'resolution=merge-duplicates',
        body: { slug: post.slug, email, resend_id: result.ok ? result.id : null, error: result.ok ? null : String(result.error).slice(0, 300) },
      }).catch(() => {});
      if (result.ok) sent += 1;
      else failed += 1;
      await pause(550); // Resend's limit is about two requests a second
    }
    // Finished when nobody is left to email (a failed address is recorded and not retried)
    const finished = queue.length === sent + failed;
    if (finished) await dbRequest('newsletter_issues?on_conflict=slug', { method: 'POST', prefer: 'resolution=merge-duplicates', body: { slug: post.slug, recipients: sentTo.size + sent } }).catch(() => {});
    report.push({ slug: post.slug, sent, failed, finished });
    if (budget <= 0) break;
  }
  return { ok: true, articles: report.length, sent: report.reduce((n, r) => n + r.sent, 0), report };
}
