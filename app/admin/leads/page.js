import Link from 'next/link';
import { redirect } from 'next/navigation';
import AdminIcon from '@/components/admin/AdminIcons';
import LeadsWorkspace from '@/components/admin/LeadsWorkspace';
import PageHead from '@/components/admin/PageHead';
import { isAdmin } from '@/lib/adminAuth';
import { leadCounts, listLeads } from '@/lib/adminLeads';
import { dbConfigured } from '@/lib/supabase';

// /admin/leads/: the CRM. Three views of the leads (Cards, List, Kanban: LeadsWorkspace), filters in the address (status, q, source, service,
// from, to, sort), and "New lead" to add one by hand. The top bar's search lands here too. Cards and List come in pages (?page=, PAGE_SIZE per
// view); Kanban shows up to 300 leads on one board. Newest first by default.
const VIEWS = ['cards', 'list', 'kanban'];
const PAGE_SIZE = { cards: 24, list: 50, kanban: 300 };
const one = (v) => (Array.isArray(v) ? v[0] : v) || '';

export default async function LeadsPage({ searchParams }) {
  if (!(await isAdmin())) redirect('/admin/');
  const sp = await searchParams;
  const view = VIEWS.includes(one(sp.view)) ? one(sp.view) : 'cards';
  const filters = {
    status: view === 'kanban' ? '' : one(sp.status),
    q: one(sp.q),
    source: one(sp.source),
    service: one(sp.service),
    from: one(sp.from),
    to: one(sp.to),
    sort: one(sp.sort) === 'asc' ? 'asc' : 'desc',
  };
  const size = PAGE_SIZE[view];
  const page = view === 'kanban' ? 1 : Math.max(1, Math.floor(Number(one(sp.page))) || 1);
  let leads = [];
  let total = 0;
  let counts = null;
  let problem = '';
  if (!dbConfigured()) problem = 'Supabase is not connected to the site yet (SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel).';
  else {
    try {
      let list;
      [list, counts] = await Promise.all([listLeads({ ...filters, limit: size, page }), leadCounts()]);
      ({ leads, total } = list);
    } catch (err) {
      problem = /42P01|PGRST205|does not exist/.test(err.message)
        ? 'The leads table does not exist yet. In Supabase, open the SQL Editor and run scripts/supabase-leads.sql, then reload this page.'
        : `Supabase said: ${err.message}`;
    }
  }

  return (
    <div className="adm-page adm-page-wide">
      <PageHead
        crumbs={[{ label: 'Dashboard', href: '/admin/' }, { label: 'Leads' }]}
        title="Leads"
        text="Every request from the website, the Instant Quote and the chat. Move each one along as you follow up."
        actions={
          <Link className="adm-btn adm-btn-primary" href="/admin/leads/new/">
            <AdminIcon name="plus" /> New lead
          </Link>
        }
      />
      {problem ? (
        <div className="adm-msg bad">{problem}</div>
      ) : (
        <LeadsWorkspace leads={leads} total={total} page={page} pageSize={size} view={view} filters={filters} facets={{ sources: counts?.sources || [], services: counts?.services || [] }} counts={counts} />
      )}
    </div>
  );
}
