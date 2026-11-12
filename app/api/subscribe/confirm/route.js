import { confirmSubscription, emailFromConfirmToken } from '@/lib/newsletter';

// The confirm button on /subscribe/confirm/ posts here (lib/newsletter.js). The token is signed, so only the email we sent can confirm an address.
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('t') || '';
  const email = emailFromConfirmToken(token);
  if (!email) return Response.json({ ok: false, error: 'That confirmation link is not valid.' }, { status: 400 });
  try {
    await confirmSubscription(email);
  } catch (err) {
    console.error('[subscribe confirm]', err.message);
    return Response.json({ ok: false, error: 'Could not save that right now. Please try the link again in a moment.' }, { status: 502 });
  }
  return Response.redirect(new URL(`/subscribe/confirm/?t=${encodeURIComponent(token)}&done=1`, url), 303);
}
