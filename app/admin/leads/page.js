import Link from 'next/link';
import { redirect } from 'next/navigation';
import AdminIcon from '@/components/admin/AdminIcons';
import LeadCard from '@/components/admin/LeadCard';
import PageHead from '@/components/admin/PageHead';
import { isAdmin } from '@/lib/adminAuth';
import { LEAD_STATUSES, leadCounts, listLeads } from '@/lib/adminLeads';
import { dbConfigured } from '@/lib/supabase';

// /admin/leads/: the CRM view. Status tabs with counts (All, New, Contacted, Scheduled, Won, Lost), a search box (name, email, phone, ZIP, address,
// service, message; the top bar's search lands here too), then the leads as cards, newest first (up to 120).
export default async function LeadsPage({ searchParams }) {
  if (!(await isAdmin())) redirect('/admin/');
  const { status = '', q = '' } = await searchParams;
  let leads = [];
  let counts = null;
  let problem = '';
  if (!dbConfigured()) problem = 'Supabase is not connected to the site yet (SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel).';
  else {
    try {
      [leads, counts] = await Promise.all([listLeads({ status, q }), leadCounts()]);
    } catch (err) {
      problem = /42P01|PGRST205|does not exist/.test(err.message)
        ? 'The leads table does not exist yet. In Supabase, open the SQL Editor and run scripts/supabase-leads.sql, then reload this page.'
        : `Supabase said: ${err.message}`;
    }
  }
  const href = (s, query = q) => `/admin/leads/${s || query ? `?${new URLSearchParams({ ...(s && { status: s }), ...(query && { q: query }) })}` : ''}`;
  const tabs = [{ id: '', label: 'All', count: counts?.total }, ...LEAD_STATUSES.map((s) => ({ ...s, count: counts?.counts[s.id] }))];

  return (
    <div className="adm-page">
      <PageHead
        crumbs={[{ label: 'Dashboard', href: '/admin/' }, { label: 'Leads' }]}
        title="Leads"
        text="Every request from the website, the Instant Quote, the chat and phone calls. Mark where each one stands."
      />
      <div className="adm-toolbar">
        <nav className="adm-segments" aria-label="Lead status">
          {tabs.map((t) => (
            <Link key={t.id || 'all'} href={href(t.id)} className={status === t.id ? 'on' : ''} aria-current={status === t.id ? 'page' : undefined}>
              {t.label}
              {t.count !== undefined && <span>{t.count}</span>}
            </Link>
          ))}
        </nav>
        <form className="adm-search adm-search-inline" action="/admin/leads/" role="search">
          {status && <input type="hidden" name="status" value={status} />}
          <AdminIcon name="search" />
          <input type="search" name="q" defaultValue={q} placeholder="Search leads" aria-label="Search leads" />
        </form>
      </div>
      {problem && <div className="adm-msg bad">{problem}</div>}
      {q && !problem && (
        <p className="adm-note">
          {leads.length} result{leads.length === 1 ? '' : 's'} for “{q}”. <Link href={href(status, '')}>Clear the search</Link>
        </p>
      )}
      <div className="adm-cards">
        {leads.map((lead) => (
          <LeadCard lead={lead} key={lead.id} />
        ))}
        {!problem && leads.length === 0 && (
          <div className="adm-tile adm-empty">
            <p>No leads here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
