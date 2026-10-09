// The confirmation email a visitor gets after the request form or the Instant Quote (the Edge Function version of the website's lib/autoReply.js;
// the wording comes from data/autoReply.js through generated.js). Sent through Resend from LEADS_FROM_EMAIL; replies go to the team's lead inbox.
import { AUTO_REPLY as A, SITE } from './generated.js';
import { leadRecipients } from './leads.js';
import { escapeHtml, formatDay } from './util.js';

const SOURCES = ['estimate-form', 'instant-quote']; // chat and AI-agent leads don't get this email

function firstName(name) {
  const word = String(name || '').trim().split(/\s+/)[0] || '';
  return /^[\p{L}][\p{L}'’.-]{0,29}$/u.test(word) ? word : '';
}

const fill = (s) => s.replace('{phone}', SITE.phone).replace('{hours}', SITE.hoursText);
// The same text for the HTML version: escaped, with the phone number as a tap-to-call link
const phoneLink = `<a href="${SITE.tel}" style="color:#062d57;font-weight:bold;text-decoration:underline">${escapeHtml(SITE.phone)}</a>`;
const linked = (s) => escapeHtml(s.replace('{hours}', SITE.hoursText)).split('{phone}').join(phoneLink);

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
  const license = `California contractor license #${SITE.license}, licensed since ${SITE.licenseSince}`;

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
    `${SITE.legalName}`,
    `${license}`,
    '',
    A.notYou,
  ].join('\n');

  const body = 'font:15px/1.6 Arial,Helvetica,sans-serif;color:#10243a';
  const h = 'margin:26px 0 10px;font:bold 12px Arial,Helvetica,sans-serif;letter-spacing:1.4px;text-transform:uppercase;color:#826a35';
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(A.subject)}</title></head>
<body style="margin:0;padding:0;background:#f5f8fb">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8fb"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e4eaf0;border-radius:6px">
<tr><td style="background:#062d57;padding:18px 28px;border-radius:6px 6px 0 0">
<img src="${SITE.siteUrl}/images/logo/qrs-logo-email.png" width="220" height="64" alt="${escapeHtml(SITE.name)}" style="display:block;border:0;outline:none;width:220px;height:auto;font:bold 18px Arial,Helvetica,sans-serif;color:#ffffff">
</td></tr>
<tr><td style="padding:28px;${body}">
<p style="margin:0 0 14px">${escapeHtml(hello)}</p>
<p style="margin:0 0 14px">${escapeHtml(A.thanks)}</p>${when ? `\n<p style="margin:0 0 14px">${escapeHtml(A.preferred.replace('{when}', when))}</p>` : ''}${quote ? `\n<p style="margin:0 0 14px">${escapeHtml(A.quoteNote)}</p>` : ''}${
    urgent
      ? `\n<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0 0"><tr><td style="padding:14px 16px;background:#fff6e0;border-left:4px solid #d4b572;${body}"><strong>${escapeHtml(A.urgent.heading)}</strong><br>${linked(A.urgent.text)}</td></tr></table>`
      : ''
  }
<h2 style="${h}">${escapeHtml(A.nextHeading)}</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps
    .map(
      (s, i) => `
<tr><td width="40" valign="top" style="padding:0 0 14px"><div style="width:28px;height:28px;border-radius:14px;background:#d4b572;color:#062d57;text-align:center;font:bold 14px/28px Arial,Helvetica,sans-serif">${i + 1}</div></td>
<td valign="top" style="padding:0 0 14px;${body}"><strong>${escapeHtml(s.title)}</strong><br>${escapeHtml(s.text)}</td></tr>`
    )
    .join('')}
</table>
<h2 style="${h}">${escapeHtml(A.prepareHeading)}</h2>
<p style="margin:0 0 8px">${escapeHtml(A.prepareIntro)}</p>
<ul style="margin:0;padding:0 0 0 20px">${prepare.map((p) => `<li style="margin:0 0 6px">${escapeHtml(p)}</li>`).join('')}</ul>
<h2 style="${h}">${escapeHtml(A.sooner.heading)}</h2>
<p style="margin:0">${linked(A.sooner.text)}</p>
</td></tr>
<tr><td style="padding:18px 28px 22px;border-top:1px solid #e4eaf0;font:12px/1.6 Arial,Helvetica,sans-serif;color:#5a6b82">
<strong style="color:#062d57">${escapeHtml(SITE.legalName)}</strong><br>${escapeHtml(license)}<br>
<a href="https://qualityroofingspecialists.com/" style="color:#5a6b82">qualityroofingspecialists.com</a>
<p style="margin:14px 0 0">${escapeHtml(A.notYou)}</p>
</td></tr>
</table>
</td></tr></table>
</body></html>`;
  return { subject: A.subject, text, html };
}

// Sends it. Returns 'sent', 'off' (no Resend key or sender address, or LEADS_AUTOREPLY=off) or 'skipped' (no email address, a lead that doesn't
// get one, or an address already confirmed today: the once-a-day limit lives in the database). Throws when Resend refuses.
// `test` ignores LEADS_AUTOREPLY and the once-a-day limit and marks the subject TEST (the setup check).
export async function sendAutoReply(lead, { env, fetch: f, db }, { test = false } = {}) {
  const key = (env.RESEND_API_KEY || '').trim();
  const sender = (env.LEADS_FROM_EMAIL || '').trim();
  if (!key || !sender || (!test && (env.LEADS_AUTOREPLY || '').trim() === 'off')) return 'off';
  if (!lead.email || !SOURCES.includes(lead.source)) return 'skipped';
  if (!test && db.configured && (await db.rateLimited(`confirm:${lead.email.toLowerCase()}`, 1, 86400))) return 'skipped';
  const address = (sender.match(/<([^>]+)>/) || [, sender])[1].trim();
  const { subject, text, html } = autoReplyContent(lead);
  const res = await f('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `${SITE.name} <${address}>`,
      to: [lead.email],
      reply_to: leadRecipients(env)[0],
      subject: test ? `TEST: ${subject}` : subject,
      text,
      html,
      headers: { 'Auto-Submitted': 'auto-generated' },
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return 'sent';
}
