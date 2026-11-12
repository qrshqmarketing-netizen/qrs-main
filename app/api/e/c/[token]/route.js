import { readClick, recordEvent } from '@/lib/emailTracking';
import { SITE_URL } from '@/data/site';

// A tracked link in the campaign and newsletter emails (lib/emailTracking.js): records the click, then redirects to the link. Only links we put
// in an email work (the link is signed with the send), so this can't be used to send people anywhere else. A bad link goes to the home page.
export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const url = new URL(request.url);
  const click = readClick((await params).token, url.searchParams.get('u'), url.searchParams.get('s'));
  if (!click) return Response.redirect(SITE_URL + '/', 302);
  await recordEvent({ kind: 'click', sendKind: click.sendKind, sendId: click.id, url: click.url, userAgent: request.headers.get('user-agent') }).catch((e) => console.error('[email click]', e.message));
  return Response.redirect(click.url, 302);
}
