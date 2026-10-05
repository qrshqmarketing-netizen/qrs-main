// The confirmation email a visitor gets after sending the request form (/start/) or the Instant Quote with an email address
// (called from app/api/lead/route.js once the lead is delivered). Sent through Resend like the team's lead email (lib/leads.js):
// from the address in LEADS_FROM_EMAIL, with replies going to the team's lead inbox. The wording is in data/autoReply.js.
// LEADS_AUTOREPLY=off turns it off. Server-side only.
import { AUTO_REPLY as A } from '@/data/autoReply';
import { BUSINESS, LEADS_EMAIL, PHONE, TEL } from '@/data/site';
import { formatDate, formatDay } from '@/lib/dates';
import { hoursText } from '@/lib/hours';

const env = (name) => (process.env[name] || '').trim();
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const SOURCES = ['estimate-form', 'instant-quote']; // chat and AI-agent leads don't get this email

// Only a first name that looks like one goes into the greeting: the visitor typed it, so nothing else from the form is echoed back
function firstName(name) {
  const word = String(name || '').trim().split(/\s+/)[0] || '';
  return /^[\p{L}][\p{L}'’.-]{0,29}$/u.test(word) ? word : '';
}

// One confirmation per address per day (a double tap on Submit, or two requests from the same person). Memory only, like rateLimited().
const DAY_MS = 24 * 60 * 60 * 1000;
const sentTo = new Map();
function alreadyConfirmed(email) {
  const now = Date.now();
  for (const [address, at] of sentTo) if (now - at > DAY_MS) sentTo.delete(address);
  const key = email.toLowerCase();
  if (sentTo.has(key)) return true;
  sentTo.set(key, now);
  return false;
}

const fill = (s) => s.replace('{phone}', PHONE).replace('{hours}', hoursText(BUSINESS.hours));
// The same text for the HTML version: escaped, with the phone number as a tap-to-call link
const phoneLink = `<a href="${TEL}" style="color:#062d57;font-weight:bold;text-decoration:underline">${esc(PHONE)}</a>`;
const linked = (s) => esc(s.replace('{hours}', hoursText(BUSINESS.hours))).split('{phone}').join(phoneLink);

// { subject, text, html } for this lead. The version follows what the form said: HOA and commercial properties get the roof survey
// steps, "water is coming in now" adds a call-us box on top, and the Instant Quote adds a note that its range isn't a final price.
export function autoReplyContent(lead) {
  const commercial = lead.service === 'Commercial or HOA roofing';
  const urgent = /^URGENT:/m.test(lead.message || '');
  const quote = lead.source === 'instant-quote';
  const who = firstName(lead.name);
  const hello = who ? `Hi ${who},` : 'Hi,';
  const when = [lead.preferredDate && formatDay(lead.preferredDate), lead.preferredTime].filter(Boolean).join(' · ');
  const steps = commercial ? A.steps.commercial : A.steps.home;
  const prepare = commercial ? A.prepare.commercial : A.prepare.home;
  const sooner = fill(A.sooner.text);
  const license = `California contractor license #${BUSINESS.license}, licensed since ${formatDate(BUSINESS.licenseSince)}`;
  const place = `${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}`;

  const text = [
    hello,
    '',
    A.thanks,
    ...(when ? ['', A.preferred.replace('{when}', when)] : []),
    ...(quote ? ['', A.quoteNote] : []),
    ...(urgent ? ['', A.urgent.heading.toUpperCase(), fill(A.urgent.text)] : []),
    '',
    A.nextHeading.toUpperCase(),
    ...steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`),
    '',
    A.prepareHeading.toUpperCase(),
    A.prepareIntro,
    ...prepare.map((p) => `- ${p}`),
    '',
    A.sooner.heading.toUpperCase(),
    sooner,
    '',
    `${BUSINESS.name}`,
    `${license}`,
    `${place}`,
    '',
    A.notYou,
  ].join('\n');

  const body = 'font:15px/1.6 Arial,Helvetica,sans-serif;color:#10243a';
  const h = 'margin:26px 0 10px;font:bold 12px Arial,Helvetica,sans-serif;letter-spacing:1.4px;text-transform:uppercase;color:#826a35';
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(A.subject)}</title></head>
<body style="margin:0;padding:0;background:#f5f8fb">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8fb"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e4eaf0;border-radius:6px">
<tr><td style="background:#062d57;padding:20px 28px;border-radius:6px 6px 0 0">
<div style="font:bold 18px Arial,Helvetica,sans-serif;letter-spacing:.5px;color:#ffffff">${esc(BUSINESS.name.toUpperCase())}</div>
<div style="margin-top:4px;font:12px Arial,Helvetica,sans-serif;letter-spacing:1.6px;color:#d4b572">${esc(BUSINESS.tagline)}</div>
</td></tr>
<tr><td style="padding:28px;${body}">
<p style="margin:0 0 14px">${esc(hello)}</p>
<p style="margin:0 0 14px">${esc(A.thanks)}</p>${when ? `\n<p style="margin:0 0 14px">${esc(A.preferred.replace('{when}', when))}</p>` : ''}${quote ? `\n<p style="margin:0 0 14px">${esc(A.quoteNote)}</p>` : ''}${
    urgent
      ? `\n<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0 0"><tr><td style="padding:14px 16px;background:#fff6e0;border-left:4px solid #d4b572;${body}"><strong>${esc(A.urgent.heading)}</strong><br>${linked(A.urgent.text)}</td></tr></table>`
      : ''
  }
<h2 style="${h}">${esc(A.nextHeading)}</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps
    .map(
      (s, i) => `
<tr><td width="40" valign="top" style="padding:0 0 14px"><div style="width:28px;height:28px;border-radius:14px;background:#d4b572;color:#062d57;text-align:center;font:bold 14px/28px Arial,Helvetica,sans-serif">${i + 1}</div></td>
<td valign="top" style="padding:0 0 14px;${body}"><strong>${esc(s.title)}</strong><br>${esc(s.text)}</td></tr>`
    )
    .join('')}
</table>
<h2 style="${h}">${esc(A.prepareHeading)}</h2>
<p style="margin:0 0 8px">${esc(A.prepareIntro)}</p>
<ul style="margin:0;padding:0 0 0 20px">${prepare.map((p) => `<li style="margin:0 0 6px">${esc(p)}</li>`).join('')}</ul>
<h2 style="${h}">${esc(A.sooner.heading)}</h2>
<p style="margin:0">${linked(A.sooner.text)}</p>
</td></tr>
<tr><td style="padding:18px 28px 22px;border-top:1px solid #e4eaf0;font:12px/1.6 Arial,Helvetica,sans-serif;color:#5a6b82">
<strong style="color:#062d57">${esc(BUSINESS.name)}</strong><br>${esc(license)}<br>${esc(place)}<br>
<a href="https://qualityroofingspecialists.com/" style="color:#5a6b82">qualityroofingspecialists.com</a>
<p style="margin:14px 0 0">${esc(A.notYou)}</p>
</td></tr>
</table>
</td></tr></table>
</body></html>`;
  return { subject: A.subject, text, html };
}

// Sends it. Returns 'sent', 'off' (no Resend key or sender address set, or LEADS_AUTOREPLY=off), or 'skipped' (no email address, a
// lead that doesn't get one, or an address already confirmed today). Throws when Resend refuses. `test` is for the setup check in
// app/api/lead/route.js: it ignores LEADS_AUTOREPLY and the once-a-day limit, and marks the subject TEST.
export async function sendAutoReply(lead, { test = false } = {}) {
  const key = env('RESEND_API_KEY');
  const sender = env('LEADS_FROM_EMAIL'); // the same verified sending address as the lead email
  if (!key || !sender || (!test && env('LEADS_AUTOREPLY') === 'off')) return 'off';
  if (!lead.email || !SOURCES.includes(lead.source)) return 'skipped';
  if (!test && alreadyConfirmed(lead.email)) return 'skipped';
  const address = (sender.match(/<([^>]+)>/) || [, sender])[1].trim();
  const replyTo = (env('LEADS_TO_EMAIL') || LEADS_EMAIL).split(',')[0].trim();
  const { subject, text, html } = autoReplyContent(lead);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `${BUSINESS.name} <${address}>`,
      to: [lead.email],
      reply_to: replyTo,
      subject: test ? `TEST: ${subject}` : subject,
      text,
      html,
      headers: { 'Auto-Submitted': 'auto-generated' }, // so other auto-responders (out-of-office replies) don't answer it
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return 'sent';
}
