import { callrailConfigured, callToLead, verifyCallrailSignature } from '@/lib/callrail';
import { deliverLead } from '@/lib/leads';
import { dbConfigured, dbRequest } from '@/lib/supabase';

// CallRail's post-call webhook (registered by scripts/callrail-setup.mjs on each production deploy; helpers in lib/callrail.js).
// Every finished inbound call becomes a row of the Supabase `leads` table, next to the form and chat leads; a missed call or a voicemail also
// goes to the lead email and the Google Sheet, so someone calls back. A request is accepted only with a valid CallRail `Signature` (HMAC-SHA1
// of the raw body with the company's signing key, read through the API). CallRail retries a call it couldn't deliver, so the same call is
// never saved twice (its CallRail id is in the message).
export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (!callrailConfigured()) return Response.json({ ok: false, error: 'not configured' }, { status: 503 });
  const raw = await request.text();
  let valid = false;
  try {
    valid = await verifyCallrailSignature(raw, request.headers.get('signature'));
  } catch (e) {
    console.error('[callrail] signature check failed:', e.message);
    return Response.json({ ok: false, error: 'could not check the signature' }, { status: 503 }); // CallRail will retry
  }
  if (!valid) return Response.json({ ok: false, error: 'bad signature' }, { status: 401 });

  let call;
  try {
    call = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, error: 'not JSON' }, { status: 400 });
  }
  if (!call?.id || (call.direction && call.direction !== 'inbound')) return Response.json({ ok: true, skipped: 'not an inbound call' });

  if (dbConfigured()) {
    try {
      const seen = await dbRequest(`leads?select=id&message=ilike.${encodeURIComponent(`*CallRail call ${call.id}*`)}&limit=1`);
      if (seen?.length) return Response.json({ ok: true, skipped: 'already saved' });
    } catch (e) {
      console.warn('[callrail] duplicate check skipped:', e.message);
    }
  }

  const { missed, lead } = callToLead(call);
  const result = await deliverLead(lead, missed ? {} : { only: ['database'] });
  if (!result.delivered) console.error('[callrail] call not saved:', call.id, JSON.stringify(result.errors));
  // A 5xx makes CallRail try again later; only ask for that when nothing took the call
  return Response.json({ ok: result.delivered, missed }, { status: result.delivered || !result.configured ? 200 : 502 });
}
