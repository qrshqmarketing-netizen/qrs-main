// CallRail (call tracking), server-side only. The API key lives only in Vercel (any of the names in KEY_NAMES); nothing else needs setting up:
// the account, the company, its number-swap script (swap.js) and the webhook's signing key are all found through the API (v3,
// https://apidocs.callrail.com) and cached in memory. With more than one company, CALLRAIL_COMPANY_ID picks one; otherwise the company named
// like the business, else the first active one.
// - Number swapping: the site loads the company's swap.js (app/layout.js, only with the visitor's Analytics consent), which shows each visitor
//   a tracking number tied to how they arrived. The page HTML, structured data and AI files keep the main number (PHONE in data/site.js).
// - Calls as leads: CallRail posts every finished call to /api/callrail/ (app/api/callrail/route.js); scripts/callrail-setup.mjs registers that
//   address on each production deploy (postbuild), keeping any webhook addresses already there. Calls are never emailed (CallRail already
//   emails the team): missed calls and voicemails go to the database and the Google Sheet, answered calls to the database only.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { BUSINESS, SITE_URL } from '@/data/site';

const API = 'https://api.callrail.com/v3';
const KEY_NAMES = ['CALLRAIL_API_KEY', 'CALLRAIL_API_TOKEN', 'CALLRAIL_KEY', 'CALLRAIL_TOKEN', 'CALLRAIL_API'];
export const CALLRAIL_WEBHOOK_PATH = '/api/callrail/';
export const callrailWebhookUrl = () => `${SITE_URL}${CALLRAIL_WEBHOOK_PATH}`;

const keyName = () => KEY_NAMES.find((n) => (process.env[n] || '').trim());
const apiKey = () => (process.env[keyName()] || '').trim().replace(/^["']|["']$/g, '');
export const callrailConfigured = () => Boolean(keyName());

// `cacheFor` (seconds): a cached read through Next's data cache, for the layout (a no-store fetch there would make every page dynamic)
export async function callrail(path, { method = 'GET', body, cacheFor } = {}) {
  const key = apiKey();
  if (!key) throw new Error('No CallRail API key (set CALLRAIL_API_KEY in Vercel)');
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Token token="${key}"`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    // a request with an Authorization header is only cached when it says so (Next docs: fetch, options.cache)
    ...(cacheFor ? { cache: 'force-cache', next: { revalidate: cacheFor } } : { cache: 'no-store' }),
    signal: AbortSignal.timeout(8000),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`CallRail ${res.status} on ${path.split('?')[0]}: ${text.slice(0, 200)}`);
  return text ? JSON.parse(text) : null;
}

// The account and company (cached for 6 hours per server instance)
let cache = { at: 0, value: null };
export async function callrailAccount({ cacheFor } = {}) {
  if (cache.value && Date.now() - cache.at < 6 * 3600 * 1000) return cache.value;
  const { accounts = [] } = await callrail('/a.json', { cacheFor });
  const account = accounts[0];
  if (!account) throw new Error('The CallRail key sees no account');
  const { companies = [] } = await callrail(`/a/${account.id}/companies.json?per_page=250`, { cacheFor });
  const active = companies.filter((c) => c.status === 'active');
  const wanted = (process.env.CALLRAIL_COMPANY_ID || '').trim();
  const company =
    active.find((c) => String(c.id) === wanted) ||
    (active.length === 1 ? active[0] : null) ||
    active.find((c) => /quality\s*roofing|\bqrs\b/i.test(c.name)) ||
    active[0] ||
    null;
  cache = { at: Date.now(), value: { account, company, companies: active } };
  return cache.value;
}

// The company's swap.js address for the page (null when there is no key, no company or DNI is off). Never throws.
export async function callrailSwapScript() {
  if (!callrailConfigured()) return null;
  try {
    const { company } = await callrailAccount({ cacheFor: 86400 }); // refreshed daily
    if (!company?.script_url || company.dni_active === false) return null;
    return company.script_url.startsWith('//') ? `https:${company.script_url}` : company.script_url;
  } catch (e) {
    console.warn('[callrail] swap script:', e.message);
    return null;
  }
}

// The company's Webhooks integration, with its signing key
export async function callrailWebhookIntegration(accountId, companyId) {
  const { integrations = [] } = await callrail(`/a/${accountId}/integrations.json?company_id=${companyId}&fields=signing_key`);
  return integrations.find((i) => i.type === 'Webhooks' && i.state !== 'disabled') || null;
}

// Make sure CallRail posts finished calls to the site, adding our address next to any already there. Returns what it did.
export async function ensureCallrailWebhook() {
  const { account, company } = await callrailAccount();
  if (!company) return 'no active company';
  const url = callrailWebhookUrl();
  let existing;
  try {
    existing = await callrailWebhookIntegration(account.id, company.id);
  } catch (e) {
    if (/ 403 /.test(e.message)) return `this API key can't manage integrations: add ${url} under Post-Call in CallRail (Integrations → Webhooks) once; calls are confirmed through the API, so no signing key is needed`;
    throw e;
  }
  if (!existing) {
    await callrail(`/a/${account.id}/integrations.json`, { method: 'POST', body: { type: 'Webhooks', company_id: company.id, config: { post_call_webhook: [url] } } });
    return `created the webhook for ${company.name}`;
  }
  const config = existing.config || {};
  const list = Array.isArray(config.post_call_webhook) ? config.post_call_webhook : [];
  if (list.includes(url)) return `already set up for ${company.name}`;
  await callrail(`/a/${account.id}/integrations/${existing.id}.json`, { method: 'PUT', body: { config: { ...config, post_call_webhook: [...list, url] } } });
  return `added the site to ${company.name}'s existing webhook (${list.length} other address${list.length === 1 ? '' : 'es'} kept)`;
}

// The signing key for incoming webhooks: CALLRAIL_WEBHOOK_SIGNING_KEY if set, else read from the integration (cached)
let signing = { at: 0, key: '' };
async function signingKey() {
  const fixed = (process.env.CALLRAIL_WEBHOOK_SIGNING_KEY || '').trim();
  if (fixed) return fixed;
  if (signing.key && Date.now() - signing.at < 3600 * 1000) return signing.key;
  const { account, company } = await callrailAccount();
  let integration = null;
  try {
    integration = company ? await callrailWebhookIntegration(account.id, company.id) : null;
  } catch (e) {
    if (!/ 403 /.test(e.message)) throw e; // this key can't see integrations: the route confirms calls through the API instead
  }
  signing = { at: Date.now(), key: integration?.signing_key || '' };
  return signing.key;
}

// CallRail signs the raw body: Base64(HMAC-SHA1(company signing key, body)) in the `Signature` header
export const signCallrail = (key, rawBody) => createHmac('sha1', key).update(rawBody).digest('base64');
export async function verifyCallrailSignature(rawBody, signature) {
  if (!signature) return false;
  const check = (key) => {
    if (!key) return false;
    const a = Buffer.from(signCallrail(key, rawBody));
    const b = Buffer.from(String(signature).trim());
    return a.length === b.length && timingSafeEqual(a, b);
  };
  if (check(await signingKey())) return true;
  signing = { at: 0, key: '' }; // the key may have changed: read it again once
  return check(await signingKey());
}

// The extra call fields the lead uses (field selection on the calls endpoints)
const CALL_FIELDS = 'call_type,campaign,company_id,first_call,formatted_customer_phone_number,formatted_tracking_phone_number,formatted_tracking_source,keywords,landing_page_url,last_requested_url,medium,source_name,total_calls,utm_campaign,utm_medium,utm_source';

// Confirm a call CallRail posted by finding it in the account through the API, and return CallRail's own record (null if there is no such
// call). Used when the webhook's signing key can't be read (an API key without access to integrations): a forged request can't create a
// lead, because only real calls are saved, from CallRail's data. The webhook's id may be the API id (CAL...) or the older numeric id, which
// appears in the call's recording links; failing both, the same caller within three minutes matches.
async function getWithFields(path) {
  try {
    return await callrail(`${path}${path.includes('?') ? '&' : '?'}fields=${CALL_FIELDS}`);
  } catch (e) {
    if (/ 400 /.test(e.message)) return callrail(path); // a field this plan doesn't offer: ask again without the extras
    throw e;
  }
}

export async function confirmCallWithApi(posted) {
  const { account } = await callrailAccount();
  const get = getWithFields;
  for (const id of [posted.resource_id, posted.id].filter(Boolean).map(String)) {
    if (!/^CAL[0-9a-f]+$/i.test(id)) continue;
    try {
      const call = await get(`/a/${account.id}/calls/${id}.json`);
      if (call?.id) return call;
    } catch (e) {
      if (!/ 404 /.test(e.message)) throw e;
    }
  }
  const { calls = [] } = (await get(`/a/${account.id}/calls.json?per_page=100&sort=start_time&order=desc`)) || {};
  const numeric = String(posted.id || '');
  const digits = (n) => String(n || '').replace(/\D/g, '').slice(-10);
  const at = Date.parse(posted.start_time || posted.created_at || '');
  return (
    calls.find((c) => String(c.id) === numeric) ||
    (numeric && calls.find((c) => [c.recording, c.recording_player].some((u) => u && u.includes(`/calls/${numeric}/`)))) ||
    calls.find((c) => digits(c.customer_phone_number) && digits(c.customer_phone_number) === digits(posted.customer_phone_number) && Math.abs(Date.parse(c.start_time) - at) <= 180000) ||
    null
  );
}

// A finished call as a lead for lib/leads.js
const secondsText = (s) => {
  const n = Number(s) || 0;
  return n >= 60 ? `${Math.floor(n / 60)} min ${n % 60} s` : `${n} s`;
};
export function callToLead(call) {
  const missed = call.answered === false || call.answered === 'false' || Boolean(call.voicemail) || /missed|abandon|voicemail/i.test(call.call_type || '');
  const name = call.customer_name && !/^(wireless caller|unknown|[+\d\s()-]+)$/i.test(call.customer_name) ? call.customer_name : '';
  const where = [call.customer_city, call.customer_state].filter(Boolean).join(', ');
  const lines = [
    `${missed ? (call.voicemail ? 'Voicemail' : 'Missed call') : 'Answered call'}${call.duration ? `, ${secondsText(call.duration)}` : ''}${call.first_call === false ? ` (called ${call.total_calls || 'before'} times)` : ', first call'}`,
    `Source: ${call.source_name || call.formatted_tracking_source || call.source || 'unknown'}${call.keywords ? ` (searched "${call.keywords}")` : ''}`,
    call.formatted_tracking_phone_number || call.tracking_phone_number ? `Tracking number: ${call.formatted_tracking_phone_number || call.tracking_phone_number}` : '',
    where ? `Caller location: ${where}` : '',
    call.recording_player || call.recording ? `Recording: ${call.recording_player || call.recording}` : '',
    call.transcription ? `Transcript: ${String(call.transcription).slice(0, 1500)}` : '',
    `CallRail call ${call.id}`,
  ].filter(Boolean);
  return {
    missed,
    lead: {
      source: missed ? 'Phone call (missed)' : 'Phone call',
      capturedAt: call.start_time || call.created_at || new Date().toISOString(),
      name: name || '',
      phone: call.formatted_customer_phone_number || call.customer_phone_number || '',
      message: lines.join('\n'),
      page: call.last_requested_url || '',
      landingPage: call.landing_page_url || '',
      utmSource: call.utm_source || '',
      utmMedium: call.utm_medium || call.medium || '',
      utmCampaign: call.utm_campaign || call.campaign || '',
      foundUs: call.source_name || '',
    },
  };
}

// The daily sync (app/api/callrail/sync/route.js, a Vercel Cron Job in vercel.json; the Hobby plan runs it once a day): the last 7 days of
// inbound calls (CallRail's default range) not already in the leads table are saved; missed calls and voicemails from the last
// `emailWithinHours` also get a row in the Google Sheet as a callback list (older ones are only saved). Calls are never emailed: CallRail
// already emails the team about them (owner, October 16 2026). Calls still in progress wait for the next run. Same lead shape and the same "CallRail call <id>" marker as the webhook, so the two
// never save a call twice. `deliver` is lib/leads.js's deliverLead and `seenIds` returns the ids already saved (passed in to keep this file
// free of the database code).
export async function syncRecentCalls({ deliver, seenIds, emailWithinHours = 36 }) {
  const { account, company } = await callrailAccount();
  if (!company) return { error: 'no active company' };
  const calls = [];
  for (let page = 1; page <= 10; page++) {
    const res = await getWithFields(`/a/${account.id}/calls.json?company_id=${company.id}&direction=inbound&per_page=250&page=${page}`);
    calls.push(...(res?.calls || []));
    if (!res || page >= (res.total_pages || 1)) break;
  }
  const seen = await seenIds();
  const fresh = calls
    .filter((c) => c.id && !seen.has(String(c.id)) && c.call_type !== 'in_progress' && (!c.direction || c.direction === 'inbound'))
    .sort((a, b) => Date.parse(a.start_time) - Date.parse(b.start_time));
  const result = { checked: calls.length, alreadySaved: calls.length - fresh.length, saved: 0, addedToSheet: 0, failed: 0 };
  for (const call of fresh) {
    const { missed, lead } = callToLead(call);
    const recent = Date.now() - Date.parse(call.start_time || 0) < emailWithinHours * 3600 * 1000;
    // Never emailed (CallRail already emails the team about calls, owner's choice): a recent missed call goes to the sheet as well
    const r = await deliver(lead, { only: missed && recent ? ['database', 'sheet'] : ['database'] });
    if (r.database === 'sent' || r.delivered) result.saved++;
    else result.failed++;
    if (r.sheet === 'sent') result.addedToSheet++;
  }
  return result;
}

// For the setup check (app/api/lead/route.js): what is configured, never a key
export async function callrailStatus() {
  const name = keyName();
  if (!name) return { key: 'missing (add CALLRAIL_API_KEY in Vercel)' };
  try {
    const { account, company, companies } = await callrailAccount();
    let hook = null, hookError = '';
    try {
      hook = company ? await callrailWebhookIntegration(account.id, company.id) : null;
    } catch (e) {
      hookError = / 403 /.test(e.message) ? 'the API key cannot see integrations; check that the site address is under Post-Call in CallRail (Integrations → Webhooks)' : e.message;
    }
    return {
      key: `ok (${name})`,
      account: account.name,
      companies: companies.map((c) => c.name),
      company: company ? { name: company.name, numberSwapping: company.dni_active !== false && Boolean(company.script_url), formCapture: company.form_capture } : null,
      webhook: hookError || (hook ? ((hook.config?.post_call_webhook || []).includes(callrailWebhookUrl()) ? 'set up' : 'exists, without the site address yet (added on the next deploy)') : 'not set up yet (added on the next deploy)'),
      webhookAddress: callrailWebhookUrl(),
      business: BUSINESS.name,
    };
  } catch (e) {
    return { key: `found (${name}), but CallRail answered: ${e.message}` };
  }
}
