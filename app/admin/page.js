import Link from 'next/link';
import AdminIcon from '@/components/admin/AdminIcons';
import LeadCard from '@/components/admin/LeadCard';
import LoginForm from '@/components/admin/LoginForm';
import PageHead from '@/components/admin/PageHead';
import { accountsReady, adminReady, currentAdmin, teamList, teamPasswordReady } from '@/lib/adminAuth';
import { leadCounts, listLeads } from '@/lib/adminLeads';
import { adminListPosts } from '@/lib/postsStore';
import { dbConfigured } from '@/lib/supabase';

// /admin/: the login, or the dashboard's overview: four numbers (new leads, leads this week, published articles, accounts waiting), the newest
// leads as cards, and the quick actions (the first card is the dashed "new article" card from the AdFlux design).
const settle = (p) => p.then((v) => ({ ok: true, v })).catch((e) => ({ ok: false, e }));

export default async function AdminPage() {
  const who = await currentAdmin();
  if (!who) return <LoginForm ready={adminReady()} accounts={accountsReady()} teamPassword={teamPasswordReady()} />;

  const connected = dbConfigured();
  const [counts, recent, posts, team] = connected
    ? await Promise.all([settle(leadCounts()), settle(listLeads({ limit: 6 }).then((r) => r.leads)), settle(adminListPosts()), settle(teamList())])
    : [{}, {}, {}, {}];
  const problem = !connected
    ? 'Supabase is not connected to the site yet (SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel), so there are no leads or articles to show.'
    : counts.ok === false
      ? /42P01|PGRST205|does not exist/.test(counts.e.message)
        ? 'The leads table does not exist yet. In Supabase, open the SQL Editor and run scripts/supabase-leads.sql, then reload this page.'
        : `Supabase said: ${counts.e.message}`
      : '';
  const c = counts.ok ? counts.v : null;
  const published = posts.ok ? posts.v.filter((p) => p.status === 'published').length : null;
  const drafts = posts.ok ? posts.v.filter((p) => p.status !== 'published').length : null;
  const pending = team.ok && team.v ? team.v.filter((u) => u.role === 'pending').length : null;
  const first = (who.name || '').split(' ')[0];

  const stats = [
    { label: 'New leads', value: c?.counts.new, note: 'Waiting for a first call', href: '/admin/leads/?status=new', icon: 'leads' },
    { label: 'Leads this week', value: c?.lastWeek, note: c ? `${c.total} in all` : '', href: '/admin/leads/', icon: 'target' },
    { label: 'Published articles', value: published, note: drafts ? `${drafts} draft${drafts === 1 ? '' : 's'}` : 'No drafts', href: '/admin/articles/', icon: 'articles' },
    { label: 'Waiting for approval', value: pending, note: 'New team accounts', href: '/admin/team/', icon: 'team' },
  ];

  return (
    <div className="adm-page">
      <PageHead
        crumbs={[{ label: 'Dashboard' }]}
        title={first ? `Welcome back, ${first}` : 'Dashboard'}
        text="Follow up on leads, publish articles and keep the website up to date."
        actions={
          <Link className="adm-btn adm-btn-line" href="/admin/leads/">
            <AdminIcon name="filter" /> All leads
          </Link>
        }
      />
      {problem && <div className="adm-msg bad">{problem}</div>}

      <section className="adm-stats" aria-label="At a glance">
        {stats.map((s) => (
          <Link className="adm-stat" href={s.href} key={s.label}>
            <span className="adm-stat-icon">
              <AdminIcon name={s.icon} />
            </span>
            <span className="adm-stat-label">{s.label}</span>
            <b>{s.value ?? '–'}</b>
            {s.note && <small>{s.note}</small>}
          </Link>
        ))}
      </section>

      <div className="adm-section-head">
        <h2>Newest leads</h2>
        <Link href="/admin/leads/">See all</Link>
      </div>
      <div className="adm-cards">
        <Link className="adm-tile adm-tile-new" href="/admin/new/">
          <span>
            <AdminIcon name="plus" /> Write a new article
          </span>
        </Link>
        {recent.ok && recent.v.map((lead) => <LeadCard lead={lead} key={lead.id} />)}
        {recent.ok && recent.v.length === 0 && (
          <div className="adm-tile adm-empty">
            <p>No leads yet. Every request from the website, the Instant Quote, the chat and phone calls shows up here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
