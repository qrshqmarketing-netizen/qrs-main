import { callrailConfigured, callToLead, confirmCallWithApi, verifyCallrailSignature } from '@/lib/callrail';
import { deliverLead } from '@/lib/leads';
import { dbConfigured, dbRequest } from '@/lib/supabase';

// CallRail's post-call webhook (registered by scripts/callrail-setup.mjs on each production deploy; helpers in lib/callrail.js).
// Every finished inbound call becomes a row of the Supabase `leads` table, next to the form and chat leads; a missed call or a voicemail also
// gets a row in the Google Sheet, so someone calls back. Calls are never emailed: CallRail already emails the team about them. A request is trusted with a valid CallRail `Signature` (HMAC-SHA1 of the
// raw body with the company's signing key); without one (an API key that can't read the signing key), the call is looked up in the account
// through the API and CallRail's own record is saved, so a forged request saves nothing. CallRail retries a call it couldn't deliver, so the
// same call is never saved twice (its CallRail id is in the message).
export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (!callrailConfigured()) return Response.json({ ok: false, error: 'not configured' }, { status: 503 });
  const raw = await request.text();
  let valid = false;
  try {
    valid = await verifyCallrailSignature(raw, request.headers.get('signature'));
  } catch (e) {
    console.warn('[callrail] signature check unavailable, confirming the call through the API:', e.message);
  }
  let call;
  try {
    call = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, error: 'not JSON' }, { status: 400 });
  }
  if (!call?.id) return Response.json({ ok: false, error: 'no call id' }, { status: 400 });
  if (!valid) {
    // No valid signature (or no signing key readable with this API key): only a call CallRail confirms is saved, from CallRail's own record
    try {
      call = await confirmCallWithApi(call);
    } catch (e) {
      console.error('[callrail] could not confirm the call:', e.message);
      return Response.json({ ok: false, error: 'could not confirm the call' }, { status: 503 }); // CallRail will retry
    }
    if (!call) return Response.json({ ok: false, error: 'unknown call' }, { status: 401 });
  } else {
    // Signed: still prefer CallRail's own record, so the saved id is the same one the daily sync uses (no duplicates)
    call = (await confirmCallWithApi(call).catch(() => null)) || call;
  }
  if (call.direction && call.direction !== 'inbound') return Response.json({ ok: true, skipped: 'not an inbound call' });

  if (dbConfigured()) {
    try {
      const seen = await dbRequest(`leads?select=id&message=ilike.${encodeURIComponent(`*CallRail call ${call.id}*`)}&limit=1`);
      if (seen?.length) return Response.json({ ok: true, skipped: 'already saved' });
    } catch (e) {
      console.warn('[callrail] duplicate check skipped:', e.message);
    }
  }

  const { missed, lead } = callToLead(call);
  // Never emailed (CallRail already emails the team about calls, owner's choice): a missed call or voicemail also goes to the sheet
  const result = await deliverLead(lead, { only: missed ? ['database', 'sheet'] : ['database'] });
  if (!result.delivered) console.error('[callrail] call not saved:', call.id, JSON.stringify(result.errors));
  // A 5xx makes CallRail try again later; only ask for that when nothing took the call
  return Response.json({ ok: result.delivered, missed }, { status: result.delivered || !result.configured ? 200 : 502 });
}
