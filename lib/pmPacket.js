// Emails the property manager roof packet (data/pmPacket.js) to the person who asked for it on /commercial-roofing/property-managers/
// (app/api/pm-packet/route.js). Sent through Resend like the confirmation email (lib/autoReply.js): from the LEADS_FROM_EMAIL address as
// "Quality Roofing Specialists", replies to the lead inbox. The PDF is attached from the live site's copy (Resend fetches it by URL) and linked
// in the text too, so the email still helps if an email program strips the attachment. Server-side only.
import { BUSINESS, LEADS_EMAIL, PHONE, SITE_URL, TEL } from '@/data/site';
import { PM_PACKET_EMAIL as E, PM_PACKET_FILE, PM_PACKET_FILENAME } from '@/data/pmPacket';
import { emailHeader } from '@/lib/drips';

const env = (name) => (process.env[name] || '').trim();
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const PM_PACKET_URL = `${SITE_URL}${PM_PACKET_FILE}`;

// Only a first name that looks like one goes into the greeting (as in lib/autoReply.js)
function firstName(name) {
  const word = String(name || '').trim().split(/\s+/)[0] || '';
  return /^[\p{L}][\p{L}'’.-]{0,29}$/u.test(word) ? word : '';
}

export function pmPacketEmail(lead) {
  const who = firstName(lead.name);
  const hello = who ? `Hi ${who},` : 'Hi,';
  const next = E.next.replace('{phone}', PHONE);
  const text = [hello, '', E.intro, PM_PACKET_URL, '', ...E.inside.map((s) => `- ${s}`), '', next, '', BUSINESS.legalName, `CSLB #${BUSINESS.license}`, '', E.notYou].join('\n');
  const body = 'font:15px/1.6 Arial,Helvetica,sans-serif;color:#10243a';
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(E.subject)}</title></head>
<body style="margin:0;padding:24px 12px;background:#f5f8fb">${emailHeader()}
<div style="max-width:560px;margin:0 auto;padding:28px 22px;background:#ffffff;${body}">
<p style="margin:0 0 14px">${esc(hello)}</p>
<p style="margin:0 0 18px">${esc(E.intro)}</p>
<p style="margin:0 0 22px"><a href="${esc(PM_PACKET_URL)}" style="display:inline-block;padding:12px 20px;background:#062d57;color:#ffffff;font:bold 15px Arial,Helvetica,sans-serif;text-decoration:none;border-radius:4px">Download the packet (PDF)</a></p>
<ul style="margin:0 0 18px;padding:0 0 0 20px">${E.inside.map((s) => `<li style="margin:0 0 8px">${esc(s)}</li>`).join('')}</ul>
<p style="margin:0">${esc(next).replace(esc(PHONE), `<a href="${TEL}" style="color:#062d57;font-weight:bold">${esc(PHONE)}</a>`)}</p>
</div>
<div style="max-width:560px;margin:0 auto;padding:16px 22px 28px;font:12px/1.6 Arial,Helvetica,sans-serif;color:#5a6b82"><strong style="color:#062d57">${esc(BUSINESS.legalName)}</strong> · CSLB #${esc(BUSINESS.license)}<br>${esc(E.notYou)}</div>
</body></html>`;
  return { subject: E.subject, text, html };
}

// 'sent', or 'off' when Resend isn't set up (local dev). Throws when Resend refuses.
export async function sendPmPacket(lead) {
  const key = env('RESEND_API_KEY');
  const sender = env('LEADS_FROM_EMAIL');
  if (!key || !sender || !lead.email) return 'off';
  const address = (sender.match(/<([^>]+)>/) || [, sender])[1].trim();
  const replyTo = (env('LEADS_TO_EMAIL') || LEADS_EMAIL).split(',')[0].trim();
  const send = (attach) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: `${BUSINESS.name} <${address}>`,
        to: [lead.email],
        reply_to: replyTo,
        ...pmPacketEmail(lead),
        ...(attach ? { attachments: [{ filename: PM_PACKET_FILENAME, path: PM_PACKET_URL }] } : {}),
        headers: { 'Auto-Submitted': 'auto-generated' },
      }),
    });
  let res = await send(true);
  // If the attachment can't be fetched (a preview deployment before the file is live), send it with the download link only
  if (!res.ok && res.status < 500) res = await send(false);
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return 'sent';
}
