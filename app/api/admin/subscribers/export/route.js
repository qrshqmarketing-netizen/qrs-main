import { isAdmin } from '@/lib/adminAuth';
import { confirmedSubscribers } from '@/lib/newsletter';

// The confirmed newsletter subscribers as a CSV download (/admin/subscribers/ → Export). Admins only.
export const dynamic = 'force-dynamic';

const cell = (v) => {
  let s = String(v ?? '');
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`; // a spreadsheet would run it as a formula
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export async function GET() {
  if (!(await isAdmin())) return new Response('Not allowed.', { status: 401 });
  let rows;
  try {
    rows = await confirmedSubscribers();
  } catch (err) {
    console.error('[admin subscribers export]', err.message);
    return new Response('Could not read the subscribers.', { status: 502 });
  }
  const csv = ['email,name,source,confirmed', ...rows.map((r) => [r.email, r.name, r.source, (r.confirmed_at || '').slice(0, 10)].map(cell).join(','))].join('\n');
  return new Response(csv + '\n', { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="newsletter-subscribers.csv"', 'Cache-Control': 'no-store' } });
}
