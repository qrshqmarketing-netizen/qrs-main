import { emailFromToken, unsubscribe } from '@/lib/drips';

// Unsubscribe from the campaign emails (lib/drips.js). Two ways in:
// - one-click from the mail app (RFC 8058: List-Unsubscribe-Post), a POST to /api/unsubscribe/?t=<token>
// - the button on /unsubscribe/?t=<token>, which posts here and then shows the confirmation
// The token is signed (only this server can make one), so nobody can unsubscribe someone else's address.
export async function POST(request) {
  const url = new URL(request.url);
  const email = emailFromToken(url.searchParams.get('t'));
  if (!email) return Response.json({ ok: false, error: 'That unsubscribe link is not valid.' }, { status: 400 });
  try {
    await unsubscribe(email);
  } catch (err) {
    console.error('[unsubscribe]', err.message);
    return Response.json({ ok: false, error: 'Could not save that right now. Try again in a moment, or reply to the email and we’ll take you off the list.' }, { status: 502 });
  }
  // From the page's form: back to the page with the confirmation
  if ((request.headers.get('content-type') || '').includes('form') && url.searchParams.get('from') === 'page') {
    return Response.redirect(new URL(`/unsubscribe/?t=${encodeURIComponent(url.searchParams.get('t'))}&done=1`, url), 303);
  }
  return Response.json({ ok: true });
}
