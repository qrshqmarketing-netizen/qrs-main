// Drip campaigns (owner, November 9 2026): email series sent through Resend to the leads in a chosen status (Remarketing by default), managed at
// /admin/campaigns/ (tables in scripts/supabase-campaigns.sql). Server-side only.
//
// How a run works (runDrips: the daily 8 AM cron in app/api/posts/scheduled, or "Run now" in the dashboard):
//  1. every active campaign enrolls the leads now in its status that have an email, aren't spam, aren't on the suppression list and aren't
//     enrolled yet; the first email is due after the first step's delay (0 = this run)
//  2. every due enrollment gets its next email, unless the lead's status changed (stopped), the address unsubscribed, or the steps ran out
//     (completed); a step's delay counts from the email before it
//  3. at most MAX_PER_RUN emails a run, a short pause between them (Resend's rate limit)
// Every email carries the business's name and address, a one-click unsubscribe link and List-Unsubscribe headers (CAN-SPAM, Gmail and Yahoo
// sender rules), and links get utm tags (utm_source=email, utm_medium=drip, utm_campaign=<the campaign's name as a slug>), so leads that come
// back show in the dashboard with the campaign. Replies go to the lead inbox.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { BUSINESS, LEADS_EMAIL, PHONE, SITE_URL } from '@/data/site';
import { STATUS_IDS } from '@/lib/leadStatuses';
import { dbRequest } from '@/lib/supabase';

const env = (name) => (process.env[name] || '').trim();
const MAX_PER_RUN = 150;
const MAX_STEPS = 10;
const DAY = 864e5;
const SLACK = 2 * 3600e3; // a step due "in 3 days" is sent on the daily run 3 days later, even if that run starts a little earlier in the day

export const resendReady = () => Boolean(env('RESEND_API_KEY') && env('LEADS_FROM_EMAIL'));
export const AUDIENCES = STATUS_IDS.filter((s) => s !== 'spam');

export const slug = (text) =>
  String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'campaign';

// ---------- the El Niño series, offered when a new campaign is made (copy from data/promo.js and the El Niño article; nothing new claimed)
export const EL_NINO_TEMPLATE = {
  name: 'El Niño 2026',
  audience_status: 'remarketing',
  steps: [
    {
      delay_days: 0,
      subject: 'Is your roof ready for a super El Niño?',
      body: 'Hi {first_name},\n\nForecasters expect a very strong El Niño this winter. You asked us about your roof before, so we wanted to reach out before the storms do.\n\nA free roof evaluation finds the weak spots first: a roofer looks at your roof with drone footage, shows you photos of what we find and gives you one clear next step. There’s no obligation.\n\n[Book your roof readiness inspection](/el-nino-roof-check/)\n\nOr call us at {phone}.\n\nThe QRS team',
    },
    {
      delay_days: 7,
      subject: 'Where roofs usually leak in heavy rain',
      body: 'Hi {first_name},\n\nLeaks that only show up in heavy, wind-driven rain usually start at the same few places: flashings at walls and chimneys, valleys where two slopes meet, and pipe boots around plumbing vents. On a flat roof, it’s often a clogged drain or an open seam.\n\nOur guide walks through what to check before the storms: [How to prepare your roof for El Niño](/blog/prepare-your-roof-for-el-nino/).\n\nOr let a roofer look for you. [Book a free roof evaluation](/el-nino-roof-check/) and you’ll get photos and a written price before any work.\n\nThe QRS team',
    },
    {
      delay_days: 7,
      subject: 'Before the first big storm',
      body: 'Hi {first_name},\n\nA small repair before the rain is almost always simpler than a leak in the middle of it. If you’d like your roof checked before the first big storm, we still have room for a free roof evaluation.\n\n[Book my free evaluation](/el-nino-roof-check/)\n\nAnd if water is ever coming in, call {phone}. We take emergency calls after hours and on weekends, and tarp the roof when it’s needed.\n\nThe QRS team',
    },
  ],
};

// ---------- reading and saving campaigns
const UUID = /^[0-9a-f-]{36}$/i;

export async function listCampaigns() {
  const campaigns = (await dbRequest('campaigns?select=*&order=created_at.desc')) || [];
  if (!campaigns.length) return [];
  const [enrolls, sends] = await Promise.all([
    dbRequest('campaign_enrollments?select=campaign_id,state&limit=20000'),
    dbRequest('campaign_sends?select=campaign_id,error&limit=50000'),
  ]);
  return campaigns.map((c) => {
    const mine = (enrolls || []).filter((e) => e.campaign_id === c.id);
    const count = (state) => mine.filter((e) => e.state === state).length;
    const sent = (sends || []).filter((s) => s.campaign_id === c.id);
    return {
      ...c,
      stats: { enrolled: mine.length, active: count('active'), completed: count('completed'), stopped: count('stopped'), unsubscribed: count('unsubscribed'), failed: count('failed'), sent: sent.filter((s) => !s.error).length, errors: sent.filter((s) => s.error).length },
    };
  });
}

export async function getCampaign(id) {
  if (!UUID.test(String(id))) return null;
  return (await dbRequest(`campaigns?id=eq.${id}&select=*&limit=1`))?.[0] || null;
}

export function cleanCampaign(input) {
  const errors = [];
  const name = String(input.name || '').trim().slice(0, 120);
  if (!name) errors.push('Give the campaign a name.');
  const audience = AUDIENCES.includes(input.audience_status) ? input.audience_status : null;
  if (!audience) errors.push('Choose which leads it is for.');
  const steps = (Array.isArray(input.steps) ? input.steps : []).slice(0, MAX_STEPS).map((s) => ({
    delay_days: Math.max(0, Math.min(365, Math.round(Number(s.delay_days) || 0))),
    subject: String(s.subject || '').trim().slice(0, 150),
    body: String(s.body || '').trim().slice(0, 8000),
    // An optional picture (owner, November 9 2026): an https address (an upload to the site's picture storage) or a /images/ path on this site
    image: /^(https:\/\/\S+|\/images\/\S+)$/.test(String(s.image || '').trim()) ? String(s.image).trim().slice(0, 500) : '',
    image_alt: String(s.image_alt || '').trim().slice(0, 150),
    image_at: s.image_at === 'after' ? 'after' : 'top',
  }));
  const active = Boolean(input.active);
  if (active && (!steps.length || steps.some((s) => !s.subject || !s.body))) errors.push('Every email needs a subject and a message before the campaign can send.');
  return { fields: { name, audience_status: audience, active, steps, updated_at: new Date().toISOString() }, errors };
}

export async function saveCampaign(id, input) {
  const { fields, errors } = cleanCampaign(input);
  if (errors.length) return { errors };
  if (id) {
    if (!UUID.test(String(id))) return { errors: ['Bad campaign id.'] };
    const rows = await dbRequest(`campaigns?id=eq.${id}`, { method: 'PATCH', body: fields, prefer: 'return=representation' });
    return { campaign: rows?.[0] || null };
  }
  const rows = await dbRequest('campaigns', { method: 'POST', body: fields, prefer: 'return=representation' });
  return { campaign: rows?.[0] || null };
}

export async function deleteCampaign(id) {
  if (!UUID.test(String(id))) return false;
  const rows = await dbRequest(`campaigns?id=eq.${id}`, { method: 'DELETE', prefer: 'return=representation' });
  return Boolean(rows?.length);
}

// ---------- unsubscribe links
const tokenKey = () => env('UNSUBSCRIBE_SECRET') || env('SUPABASE_SECRET_KEY') || env('SUPABASE_SERVICE_ROLE_KEY') || env('LEADS_SHEET_SECRET');
const sign = (email) => createHmac('sha256', tokenKey()).update(`unsubscribe:${email}`).digest('base64url').slice(0, 22);
export const unsubscribeToken = (email) => `${Buffer.from(String(email).toLowerCase()).toString('base64url')}.${sign(String(email).toLowerCase())}`;
export function emailFromToken(token) {
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
  return want.length === got.length && timingSafeEqual(want, got) && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? email : null;
}
export const unsubscribeUrl = (email) => `${SITE_URL}/unsubscribe/?t=${unsubscribeToken(email)}`;

export async function unsubscribe(email, reason = 'unsubscribed') {
  const e = String(email || '').toLowerCase();
  await dbRequest('email_suppressions?on_conflict=email', { method: 'POST', body: { email: e, reason }, prefer: 'resolution=merge-duplicates' });
  await dbRequest(`campaign_enrollments?email=eq.${encodeURIComponent(e)}&state=eq.active`, { method: 'PATCH', body: { state: 'unsubscribed' } });
}

// ---------- the email itself
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const firstName = (name) => {
  const first = String(name || '').trim().split(/\s+/)[0] || '';
  return /^[\p{L}][\p{L}'-]{1,24}$/u.test(first) ? first[0].toUpperCase() + first.slice(1) : 'there';
};
function tagged(href, campaign) {
  const abs = href.startsWith('/') ? `${SITE_URL}${href}` : href;
  if (!abs.startsWith(SITE_URL) || abs.includes('/unsubscribe/')) return abs;
  const u = new URL(abs);
  if (!u.searchParams.has('utm_source')) {
    u.searchParams.set('utm_source', 'email');
    u.searchParams.set('utm_medium', 'drip');
    u.searchParams.set('utm_campaign', slug(campaign));
  }
  return u.toString();
}
const fill = (text, lead) => String(text).replace(/\{first_name\}/g, firstName(lead.name)).replace(/\{name\}/g, String(lead.name || '').trim() || 'there').replace(/\{phone\}/g, PHONE);

export function renderEmail({ campaign, step, lead }) {
  const subject = fill(step.subject, lead);
  const unsubLink = `[unsubscribe](${unsubscribeUrl(lead.email)})`;
  const paras = fill(step.body, lead).replace(/\{unsubscribe\}/g, unsubLink).split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const addr = BUSINESS.address;
  const address = `${addr.street}, ${addr.city}, ${addr.region} ${addr.postalCode}`;
  const unsub = unsubscribeUrl(lead.email);
  // [text](/path/) links and **bold**, each piece escaped once
  const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  const toHtml = (p) => {
    let out = '';
    let last = 0;
    for (const m of p.matchAll(TOKEN)) {
      out += esc(p.slice(last, m.index));
      out += m[3] ? `<strong>${esc(m[3])}</strong>` : `<a href="${esc(tagged(m[2], campaign.name))}" style="color:#0b5cad">${esc(m[1])}</a>`;
      last = m.index + m[0].length;
    }
    return out + esc(p.slice(last));
  };
  const toText = (p) => p.replace(TOKEN, (m, t, href, bold) => (bold ? bold : `${t}: ${tagged(href, campaign.name)}`));
  const htmlParas = paras.map((p) => `<p style="margin:0 0 16px;line-height:1.6">${toHtml(p).replace(/\n/g, '<br>')}</p>`);
  // The picture, at the top or after the first paragraph; it links where the email's first link goes
  if (step.image) {
    const src = step.image.startsWith('/') ? `${SITE_URL}${step.image}` : step.image;
    const firstLink = [...fill(step.body, lead).matchAll(TOKEN)].find((m) => m[2])?.[2];
    const img = `<img src="${esc(src)}" alt="${esc(step.image_alt || '')}" width="516" style="display:block;width:100%;max-width:516px;height:auto;border:0;border-radius:8px;margin:0 0 18px">`;
    const block = firstLink ? `<a href="${esc(tagged(firstLink, campaign.name))}">${img}</a>` : img;
    htmlParas.splice(step.image_at === 'after' && htmlParas.length ? 1 : 0, 0, block);
  }
  const html = `<!doctype html><html><body style="margin:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#0b1b2e"><div style="max-width:560px;margin:0 auto;padding:28px 22px;background:#ffffff;font-size:16px">${htmlParas.join('')}</div><div style="max-width:560px;margin:0 auto;padding:16px 22px 28px;font-size:12px;line-height:1.5;color:#5d6570">${esc(BUSINESS.legalName)} · ${esc(address)} · ${esc(PHONE)}<br>You’re getting this because you asked us about your roof. <a href="${esc(unsub)}" style="color:#5d6570">Unsubscribe</a></div></body></html>`;
  const text = `${paras.map(toText).join('\n\n')}\n\n--\n${BUSINESS.legalName} · ${address} · ${PHONE}\nYou’re getting this because you asked us about your roof. Unsubscribe: ${unsub}`;
  return { subject, html, text, unsub };
}

async function sendEmail({ to, subject, html, text, unsub }) {
  const replyTo = (env('LEADS_TO_EMAIL') || LEADS_EMAIL || '').split(',')[0].trim();
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // the company's name (owner, November 9 2026: not "QRS Website"), from the verified address in LEADS_FROM_EMAIL
      from: `${BUSINESS.name} <${(env('LEADS_FROM_EMAIL').match(/<([^>]+)>/) || [, env('LEADS_FROM_EMAIL')])[1].trim()}>`,
      to: [to],
      subject,
      html,
      text,
      ...(replyTo && { reply_to: replyTo }),
      headers: { 'List-Unsubscribe': `<${unsub}>, <mailto:${BUSINESS.email}?subject=unsubscribe>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
    }),
    signal: AbortSignal.timeout(15000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { ok: false, status: res.status, error: data?.message || `Resend ${res.status}` };
  return { ok: true, id: data?.id };
}

// The finished email for the dashboard's Preview (a sample lead; the unsubscribe link is a real one for that sample address)
export function previewEmail({ campaign, stepIndex = 0 }) {
  const step = cleanCampaign({ ...campaign, audience_status: AUDIENCES[0], active: false }).fields.steps[stepIndex];
  if (!step) return null;
  return renderEmail({ campaign, step, lead: { name: 'Alex Sample', email: 'alex.sample@example.com' } });
}

// One email of a campaign to any address, to see it before it goes out ("TEST · " in front of the subject)
export async function sendTest({ campaign, stepIndex = 0, to }) {
  if (!resendReady()) return { ok: false, error: 'Resend is not set up: RESEND_API_KEY and LEADS_FROM_EMAIL in Vercel.' };
  const step = cleanCampaign({ ...campaign, audience_status: AUDIENCES[0], active: false }).fields.steps[stepIndex];
  if (!step?.subject || !step?.body) return { ok: false, error: 'That email needs a subject and a message.' };
  const email = renderEmail({ campaign, step, lead: { name: 'Alex Sample', email: to } });
  return sendEmail({ to, ...email, subject: `TEST · ${email.subject}` });
}

// ---------- the run
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
const inList = (ids) => `(${ids.map((i) => `"${i}"`).join(',')})`;

export async function runDrips({ max = MAX_PER_RUN } = {}) {
  if (!resendReady()) return { ok: false, skipped: 'Resend is not set up (RESEND_API_KEY and LEADS_FROM_EMAIL)' };
  const campaigns = ((await dbRequest('campaigns?active=is.true&select=*')) || []).filter((c) => AUDIENCES.includes(c.audience_status) && c.steps?.length);
  const suppressed = new Set(((await dbRequest('email_suppressions?select=email&limit=50000')) || []).map((s) => s.email));
  const report = { ok: true, campaigns: campaigns.length, enrolled: 0, sent: 0, stopped: 0, completed: 0, failed: 0, unsubscribed: 0, errors: [] };
  const now = Date.now();
  for (const c of campaigns) {
    // 1. enroll the leads now in the campaign's status
    const leads = (await dbRequest(`leads?status=eq.${c.audience_status}&email=not.is.null&select=id,email&limit=2000`)) || [];
    const already = new Set(((await dbRequest(`campaign_enrollments?campaign_id=eq.${c.id}&select=lead_id&limit=20000`)) || []).map((e) => e.lead_id));
    const fresh = leads
      .filter((l) => !already.has(l.id) && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(l.email) && !suppressed.has(l.email.toLowerCase()))
      .map((l) => ({ campaign_id: c.id, lead_id: l.id, email: l.email.toLowerCase(), step: 0, next_send_at: new Date(now + (c.steps[0].delay_days || 0) * DAY - SLACK).toISOString() }));
    for (let i = 0; i < fresh.length; i += 500) {
      await dbRequest('campaign_enrollments?on_conflict=campaign_id,lead_id', { method: 'POST', body: fresh.slice(i, i + 500), prefer: 'resolution=ignore-duplicates' });
    }
    report.enrolled += fresh.length;

    // 2. send what is due
    if (report.sent >= max) continue;
    const due = (await dbRequest(`campaign_enrollments?campaign_id=eq.${c.id}&state=eq.active&next_send_at=lte.${new Date(now).toISOString()}&select=*&order=next_send_at.asc&limit=${max - report.sent}`)) || [];
    if (!due.length) continue;
    const people = new Map(((await dbRequest(`leads?id=in.${inList(due.map((d) => d.lead_id))}&select=id,name,email,status`)) || []).map((l) => [l.id, l]));
    for (const e of due) {
      const lead = people.get(e.lead_id);
      const patch = (body) => dbRequest(`campaign_enrollments?id=eq.${e.id}`, { method: 'PATCH', body });
      if (!lead || lead.status !== c.audience_status) {
        await patch({ state: 'stopped' });
        report.stopped++;
        continue;
      }
      if (suppressed.has(e.email)) {
        await patch({ state: 'unsubscribed' });
        report.unsubscribed++;
        continue;
      }
      const step = c.steps[e.step];
      if (!step) {
        await patch({ state: 'completed' });
        report.completed++;
        continue;
      }
      const email = renderEmail({ campaign: c, step, lead: { ...lead, email: e.email } });
      const result = await sendEmail({ to: e.email, ...email });
      await dbRequest('campaign_sends', { method: 'POST', body: { campaign_id: c.id, lead_id: lead.id, step: e.step, email: e.email, resend_id: result.id || null, error: result.ok ? null : String(result.error).slice(0, 300) } });
      if (result.ok) {
        const next = c.steps[e.step + 1];
        await patch(next ? { step: e.step + 1, last_sent_at: new Date().toISOString(), next_send_at: new Date(Date.now() + (next.delay_days || 0) * DAY - SLACK).toISOString(), last_error: null } : { step: e.step + 1, last_sent_at: new Date().toISOString(), state: 'completed', last_error: null });
        report.sent++;
        if (!next) report.completed++;
      } else {
        // a refused address stops; a temporary problem (rate limit, Resend down) is tried again on the next run
        const permanent = result.status >= 400 && result.status < 500 && result.status !== 429;
        await patch({ last_error: String(result.error).slice(0, 300), ...(permanent && { state: 'failed' }) });
        if (permanent) report.failed++;
        report.errors.push(String(result.error).slice(0, 120));
        if (result.status === 429) break;
      }
      if (report.sent >= max) break;
      await pause(550); // Resend's default limit is 2 requests a second
    }
  }
  report.errors = [...new Set(report.errors)].slice(0, 5);
  return report;
}
