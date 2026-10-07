// Where the browser sends the request form, the Instant Quote and the chat. By default the site's own routes (app/api/lead, app/api/chat);
// with NEXT_PUBLIC_LEAD_ENDPOINT / NEXT_PUBLIC_CHAT_ENDPOINT set (Vercel → Environment Variables) they go to the Supabase Edge Functions
// (supabase/functions/lead and chat: https://<project>.supabase.co/functions/v1/lead). If a function can't be reached or isn't set up yet
// (network error, 404, 5xx), the request is repeated once on the site's own route, so a visitor is never stranded while the functions are new.
// An answer that says the request itself was refused (400, 429) is final and is not repeated.
export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || '/api/lead/';
export const SITE_LEAD_ENDPOINT = '/api/lead/';

const final = (res) => res.ok || res.status === 400 || res.status === 429;

export async function postLead(payload, options = {}) {
  const send = (url) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), ...options });
  if (LEAD_ENDPOINT === SITE_LEAD_ENDPOINT) return send(SITE_LEAD_ENDPOINT);
  try {
    const res = await send(LEAD_ENDPOINT);
    if (final(res)) return res;
  } catch {}
  return send(SITE_LEAD_ENDPOINT);
}
