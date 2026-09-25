// Stub CRM connection for leads the Roof Assistant chat captures (app/api/chat/route.js).
// Set CRM_LEAD_ENDPOINT (and CRM_LEAD_TOKEN, if your CRM needs a bearer token) in .env.local to go live.
// Until then, captured leads are only logged to the server console / deploy logs.
const CRM_LEAD_ENDPOINT = process.env.CRM_LEAD_ENDPOINT || '';
const CRM_LEAD_TOKEN = process.env.CRM_LEAD_TOKEN || '';

export async function sendLeadToCRM(lead) {
  if (!CRM_LEAD_ENDPOINT) {
    console.log('[crm] lead captured (set CRM_LEAD_ENDPOINT in .env.local to send it to your CRM):', JSON.stringify(lead));
    return;
  }
  try {
    const res = await fetch(CRM_LEAD_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(CRM_LEAD_TOKEN ? { Authorization: `Bearer ${CRM_LEAD_TOKEN}` } : {}),
      },
      body: JSON.stringify(lead),
    });
    if (!res.ok) console.error('[crm] CRM_LEAD_ENDPOINT rejected the lead:', res.status);
  } catch (err) {
    console.error('[crm] failed to reach CRM_LEAD_ENDPOINT:', err);
  }
}
