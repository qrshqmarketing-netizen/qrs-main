import { clientIp } from '@/lib/searchGuard';
import { cleanEmail, requestSubscription, subscribeLimited } from '@/lib/newsletter';

// "Email me the latest articles" (lib/newsletter.js): the footer box and the checkbox on the request forms post here. It saves the address as
// pending and emails a confirmation link; nothing is sent to anyone until they click it. The answer is the same whatever happened, so the form
// can't be used to find out who is subscribed. Spam traps: a hidden "website" field, a per-visitor and a per-address limit.
export const dynamic = 'force-dynamic';

const OK = () => Response.json({ ok: true });

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'bad request' }, { status: 400 });
  }
  if (String(body?.website || '').trim()) return OK(); // a bot filled in the hidden field
  const email = cleanEmail(body?.email);
  if (!email) return Response.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  if (subscribeLimited(`ip:${clientIp(request.headers)}`, 8) || subscribeLimited(`email:${email}`, 3)) {
    return Response.json({ ok: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
  }
  const source = ['footer', 'estimate-form', 'quick-form', 'start-form', 'instant-quote'].includes(body?.source) ? body.source : 'footer';
  try {
    const result = await requestSubscription({ email, name: body?.name, source });
    if (!result.ok) {
      console.error('[subscribe]', result.reason);
      if (result.reason === 'not-configured') return Response.json({ ok: false, error: 'Sign-ups are not available right now. Please try again later.' }, { status: 503 });
    }
  } catch (err) {
    console.error('[subscribe]', err.message);
    return Response.json({ ok: false, error: 'Could not save that right now. Please try again in a moment.' }, { status: 502 });
  }
  return OK();
}
