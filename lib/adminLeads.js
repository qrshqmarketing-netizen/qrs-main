// The dashboard's leads (CRM) view: reads and updates the Supabase `leads` table (scripts/supabase-leads.sql; every form, Instant Quote,
// chat and phone-call lead is saved there by lib/leads.js). Server-side only, through the secret key. No new columns: the table already has
// `status` (new, contacted, scheduled, won, lost) and `notes` for the team.
import { dbRequest } from '@/lib/supabase';

export const LEAD_STATUSES = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'won', label: 'Won' },
  { id: 'lost', label: 'Lost' },
];
const STATUS_IDS = LEAD_STATUSES.map((s) => s.id);
export const statusLabel = (id) => LEAD_STATUSES.find((s) => s.id === id)?.label || 'New';

const LIST_FIELDS = 'id,created_at,source,name,phone,email,zip,service,roof_type,preferred_date,preferred_time,message,status,utm_source,utm_campaign';

// Search words, kept to letters, numbers and a few safe characters so they can't change the query
const clean = (q) => String(q || '').replace(/[^\p{L}\p{N}@.\s'-]/gu, ' ').replace(/\s+/g, ' ').trim().slice(0, 60);

export async function listLeads({ status = '', q = '', limit = 120 } = {}) {
  const parts = [`select=${LIST_FIELDS}`, 'order=created_at.desc', `limit=${limit}`];
  if (STATUS_IDS.includes(status)) parts.push(`status=eq.${status}`);
  const words = clean(q);
  if (words) {
    const like = encodeURIComponent(`*${words}*`);
    const digits = words.replace(/\D/g, '');
    const fields = ['name', 'email', 'zip', 'address', 'service', 'message'].map((f) => `${f}.ilike.${like}`);
    if (digits.length >= 3) fields.push(`phone_digits.like.*${digits}*`);
    parts.push(`or=(${fields.join(',')})`);
  }
  return (await dbRequest(`leads?${parts.join('&')}`)) || [];
}

// How many leads are in each status, and how many came in the last 7 days (the dashboard's numbers)
export async function leadCounts() {
  const rows = (await dbRequest('leads?select=status,created_at&order=created_at.desc&limit=5000')) || [];
  const week = Date.now() - 7 * 864e5;
  const counts = Object.fromEntries(STATUS_IDS.map((id) => [id, 0]));
  let lastWeek = 0;
  for (const r of rows) {
    counts[STATUS_IDS.includes(r.status) ? r.status : 'new']++;
    if (Date.parse(r.created_at) > week) lastWeek++;
  }
  return { total: rows.length, lastWeek, counts };
}

export async function getLead(id) {
  if (!/^[0-9a-f-]{36}$/i.test(String(id))) return null;
  const rows = await dbRequest(`leads?id=eq.${id}&select=*&limit=1`);
  return rows?.[0] || null;
}

export async function updateLead(id, { status, notes }) {
  if (!/^[0-9a-f-]{36}$/i.test(String(id))) throw new Error('Bad lead id');
  const patch = {};
  if (status !== undefined) {
    if (!STATUS_IDS.includes(status)) throw new Error('Unknown status');
    patch.status = status;
  }
  if (notes !== undefined) patch.notes = String(notes).slice(0, 5000);
  const rows = await dbRequest(`leads?id=eq.${id}`, { method: 'PATCH', body: patch, prefer: 'return=representation' });
  return rows?.[0] || null;
}
