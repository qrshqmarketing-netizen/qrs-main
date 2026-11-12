import { readToken, recordEvent } from '@/lib/emailTracking';

// The open pixel in the campaign and newsletter emails (lib/emailTracking.js): records the open and answers with a 1x1 transparent GIF.
export const dynamic = 'force-dynamic';

const GIF = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
const headers = { 'Content-Type': 'image/gif', 'Content-Length': String(GIF.length), 'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0' };

export async function GET(request, { params }) {
  const t = readToken((await params).token);
  if (t) await recordEvent({ kind: 'open', sendKind: t.sendKind, sendId: t.id, userAgent: request.headers.get('user-agent') }).catch((e) => console.error('[email open]', e.message));
  return new Response(GIF, { headers });
}
