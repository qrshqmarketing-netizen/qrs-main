// The dashboard's leads (CRM): reads, adds, edits and deletes rows of the Supabase `leads` table (scripts/supabase-leads.sql; every form,
// Instant Quote and chat lead is saved there by lib/leads.js). Server-side only, through the secret key. No new columns: the table already has
// `status` (lib/leadStatuses.js) and `notes` for the team.
import { LEAD_STATUSES, MANUAL_SOURCE, STATUS_IDS, statusLabel } from '@/lib/leadStatuses';
import { dbRequest } from '@/lib/supabase';

export { LEAD_STATUSES, statusLabel };

const LIST_FIELDS = 'id,created_at,source,name,phone,email,zip,address,service,roof_type,preferred_date,preferred_time,message,status,notes,utm_source,utm_campaign';
const UUID = /^[0-9a-f-]{36}$/i;

// Phone calls saved from CallRail earlier (source "Phone call" or "Phone call (missed)") are left out of the dashboard (owner, October 19 2026:
// calls are not leads, CallRail keeps its own call log). The rows stay in the table; a lead with no source still shows.
const NOT_CALLS = `or(source.is.null,source.not.like.${encodeURIComponent('Phone call*')})`;

// Search words and filter values, kept to letters, numbers and a few safe characters so they can't change the query
const clean = (q, max = 60) => String(q || '').replace(/[^\p{L}\p{N}@.\s'&/()-]/gu, ' ').replace(/[(),]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
const isDay = (d) => /^\d{4}-\d{2}-\d{2}$/.test(String(d || ''));
// PostgREST value in a logic tree: double-quoted, so spaces, dots, slashes and ampersands are safe
const quoted = (v) => encodeURIComponent(`"${String(v).replace(/["\\]/g, '')}"`);

// The leads for the dashboard's views. Filters: status, a search (name, email, ZIP, address, service, message, phone digits), source, service,
// a received-date range (from/to, Pacific dates, inclusive) and the order (newest or oldest first).
// `page` (from 1) and `limit` page through them; the answer is { leads, total } with the number of leads matching the filters.
export async function listLeads({ status = '', q = '', source = '', service = '', from = '', to = '', sort = 'desc', limit = 300, page = 1 } = {}) {
  const offset = Math.max(0, (Math.floor(Number(page)) || 1) - 1) * limit;
  const parts = [`select=${LIST_FIELDS}`, `order=created_at.${sort === 'asc' ? 'asc' : 'desc'},id`, `limit=${limit}`, `offset=${offset}`];
  if (STATUS_IDS.includes(status)) parts.push(`status=eq.${status}`);
  const conditions = [NOT_CALLS];
  const words = clean(q);
  if (words) {
    const like = encodeURIComponent(`*${words}*`);
    const digits = words.replace(/\D/g, '');
    const fields = ['name', 'email', 'zip', 'address', 'service', 'message'].map((f) => `${f}.ilike.${like}`);
    if (digits.length >= 3) fields.push(`phone_digits.like.*${digits}*`);
    conditions.push(`or(${fields.join(',')})`);
  }
  if (clean(source, 80)) conditions.push(`source.eq.${quoted(clean(source, 80))}`);
  if (clean(service, 80)) conditions.push(`service.eq.${quoted(clean(service, 80))}`);
  // A Pacific calendar day starts at 07:00 or 08:00 UTC; 08:00 keeps the whole day either way (a lead at 00:00-01:00 PDT may land a day early)
  if (isDay(from)) conditions.push(`created_at.gte.${from}T08:00:00Z`);
  if (isDay(to)) conditions.push(`created_at.lt.${new Date(Date.parse(`${to}T08:00:00Z`) + 864e5).toISOString()}`);
  parts.push(`and=(${conditions.join(',')})`);
  const { data, total } = await dbRequest(`leads?${parts.join('&')}`, { count: true });
  return { leads: data || [], total };
}

// How many leads are in each status, how many came in the last 7 days, and the sources and services in use (the filter menus)
export async function leadCounts() {
  const rows = (await dbRequest(`leads?select=status,created_at,source,service&and=(${NOT_CALLS})&order=created_at.desc&limit=5000`)) || [];
  const week = Date.now() - 7 * 864e5;
  const counts = Object.fromEntries(STATUS_IDS.map((id) => [id, 0]));
  let lastWeek = 0;
  const sources = new Set();
  const services = new Set();
  for (const r of rows) {
    counts[STATUS_IDS.includes(r.status) ? r.status : 'new']++;
    if (Date.parse(r.created_at) > week) lastWeek++;
    if (r.source) sources.add(r.source);
    if (r.service) services.add(r.service);
  }
  return { total: rows.length, lastWeek, counts, sources: [...sources].sort(), services: [...services].sort() };
}

export async function getLead(id) {
  if (!UUID.test(String(id))) return null;
  const rows = await dbRequest(`leads?id=eq.${id}&select=*&limit=1`);
  return rows?.[0] || null;
}

// The fields the dashboard may set, cleaned: trimmed, cut to a sensible length, empty as null; a bad email, date or status is refused
const TEXT = { name: 120, phone: 40, email: 200, zip: 10, address: 300, service: 120, roof_type: 60, preferred_time: 60, found_us: 120, source: 80, message: 5000, notes: 5000 };
export function cleanLeadFields(input, { partial = false } = {}) {
  const out = {};
  const errors = [];
  for (const [key, max] of Object.entries(TEXT)) {
    if (!(key in input)) continue;
    const v = String(input[key] ?? '').trim().slice(0, max);
    out[key] = v || null;
  }
  if ('email' in out && out.email) {
    out.email = out.email.toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(out.email)) errors.push('The email address doesn’t look right.');
  }
  if ('phone' in out) out.phone_digits = out.phone ? out.phone.replace(/\D/g, '').slice(-10) || null : null;
  if ('preferred_date' in input) {
    const d = String(input.preferred_date || '').trim();
    if (d && !isDay(d)) errors.push('The preferred date isn’t a date.');
    out.preferred_date = d || null;
  }
  if ('status' in input) {
    if (!STATUS_IDS.includes(input.status)) errors.push('Unknown status.');
    else out.status = input.status;
  }
  if (!partial && !out.name && !out.phone && !out.email) errors.push('Add at least a name, a phone number or an email.');
  return { fields: out, errors };
}

export async function createLead(input) {
  const { fields, errors } = cleanLeadFields(input);
  if (errors.length) return { errors };
  const row = { status: 'new', ...fields, source: fields.source || MANUAL_SOURCE, captured_at: new Date().toISOString() };
  const rows = await dbRequest('leads', { method: 'POST', body: row, prefer: 'return=representation' });
  return { lead: rows?.[0] || null };
}

export async function updateLeadFields(id, input) {
  if (!UUID.test(String(id))) return { errors: ['Bad lead id.'] };
  const { fields, errors } = cleanLeadFields(input, { partial: true });
  if (errors.length) return { errors };
  if (!Object.keys(fields).length) return { errors: ['Nothing to save.'] };
  const rows = await dbRequest(`leads?id=eq.${id}`, { method: 'PATCH', body: fields, prefer: 'return=representation' });
  return { lead: rows?.[0] || null };
}

export async function deleteLead(id) {
  if (!UUID.test(String(id))) return false;
  const rows = await dbRequest(`leads?id=eq.${id}`, { method: 'DELETE', prefer: 'return=representation' });
  return Boolean(rows?.length);
}
