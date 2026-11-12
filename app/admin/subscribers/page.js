import Link from 'next/link';
import { redirect } from 'next/navigation';
import AdminIcon from '@/components/admin/AdminIcons';
import PageHead from '@/components/admin/PageHead';
import SubscriberActions from '@/components/admin/SubscriberActions';
import { isAdmin } from '@/lib/adminAuth';
import { resendReady } from '@/lib/drips';
import { issueStats, listSubscribers, subscriberCounts, SUBSCRIBER_STATUSES } from '@/lib/newsletter';
import { getBlogPosts } from '@/lib/postsStore';
import { dbConfigured } from '@/lib/supabase';

// /admin/subscribers/: the article newsletter (owner, November 12 2026; lib/newsletter.js, tables in scripts/supabase-newsletter.sql). Who signed up
// (the footer box and the forms' checkbox), who has confirmed, who left, and how each emailed article did (sent, opened, clicked).
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 50;
const one = (v) => (Array.isArray(v) ? v[0] : v) || '';
const LABEL = { confirmed: 'Subscribed', pending: 'Waiting to confirm', unsubscribed: 'Unsubscribed' };
const SOURCES = { footer: 'Footer', 'estimate-form': 'Estimate form', 'quick-form': 'Landing page form', 'start-form': 'Step-by-step form', 'instant-quote': 'Instant Quote' };
const day = (iso) => (iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/Los_Angeles' }) : '–');
const pct = (n, of) => (n == null ? '–' : `${n}${of ? ` (${Math.round((n / of) * 100)}%)` : ''}`);

export default async function SubscribersPage({ searchParams }) {
  if (!(await isAdmin())) redirect('/admin/');
  const sp = (await searchParams) || {};
  const status = SUBSCRIBER_STATUSES.includes(one(sp.status)) ? one(sp.status) : '';
  const q = one(sp.q).slice(0, 80);
  const page = Math.max(1, Math.floor(Number(one(sp.page))) || 1);
  let counts = null;
  let list = { rows: [], total: 0 };
  let issues = [];
  let problem = '';
  if (!dbConfigured()) problem = 'The newsletter needs the site’s Supabase settings (SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel).';
  else {
    try {
      [counts, list] = await Promise.all([subscriberCounts(), listSubscribers({ status, q, page, size: PAGE_SIZE })]);
      const titles = new Map((await getBlogPosts().catch(() => [])).map((p) => [p.slug, p.title]));
      issues = await issueStats(titles);
    } catch (err) {
      problem = /PGRST205|does not exist|Could not find the table/i.test(err.message)
        ? 'The newsletter tables are not set up yet. Run scripts/supabase-newsletter.sql once: Supabase dashboard → SQL Editor → New query → paste the file → Run.'
        : `Supabase said: ${err.message}`;
    }
  }
  const href = (changes) => {
    const next = { status, q, ...changes };
    const qs = new URLSearchParams(Object.entries(next).filter(([, v]) => v)).toString();
    return `/admin/subscribers/${qs ? `?${qs}` : ''}`;
  };
  const pages = Math.max(1, Math.ceil(list.total / PAGE_SIZE));
  return (
    <div className="adm-page adm-page-wide">
      <PageHead
        crumbs={[{ label: 'Dashboard', href: '/admin/' }, { label: 'Subscribers' }]}
        title="Subscribers"
        text="People who asked for our latest articles, in the footer or with the checkbox on a form. Each new article is emailed to the subscribed ones when it goes live."
        actions={
          !problem && counts?.confirmed > 0 ? (
            <a className="adm-btn" href="/api/admin/subscribers/export/">
              <AdminIcon name="list" /> Export subscribed (CSV)
            </a>
          ) : null
        }
      />
      {!resendReady() && <div className="adm-msg warn">Resend is not set up for sending: the site needs RESEND_API_KEY and LEADS_FROM_EMAIL in Vercel. Nobody can confirm a subscription until it is.</div>}
      {problem ? (
        <div className="adm-msg bad">{problem}</div>
      ) : (
        <>
          <section className="adm-stats" aria-label="At a glance">
            {[
              ['Subscribed', counts.confirmed, 'Get every new article', 'check'],
              ['Waiting to confirm', counts.pending, 'Asked, haven’t clicked the link yet', 'clock'],
              ['Unsubscribed', counts.unsubscribed, 'Never emailed again', 'logout'],
            ].map(([label, value, note, icon]) => (
              <div className="adm-stat" key={label}>
                <span className="adm-stat-icon">
                  <AdminIcon name={icon} />
                </span>
                <span className="adm-stat-label">{label}</span>
                <b>{value}</b>
                <small>{note}</small>
              </div>
            ))}
          </section>

          <div className="adm-section-head">
            <h2>Articles emailed</h2>
          </div>
          {issues.length === 0 ? (
            <div className="adm-card adm-empty">
              <p>No article has been emailed yet. The next one goes out when it goes live, at 8 or 9 AM Pacific, to the people who have confirmed.</p>
            </div>
          ) : (
            <div className="adm-table-wrap">
              <table className="adm-leads">
                <thead>
                  <tr>
                    <th scope="col">Article</th>
                    <th scope="col">Emailed</th>
                    <th scope="col">Sent to</th>
                    <th scope="col">Opened</th>
                    <th scope="col">Clicked</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((i) => (
                    <tr key={i.slug}>
                      <td data-label="Article">
                        <Link className="adm-link" href={`/blog/${i.slug}/`}>
                          {i.title}
                        </Link>
                      </td>
                      <td data-label="Emailed">{day(i.doneAt)}</td>
                      <td data-label="Sent to">
                        {i.sent}
                        {i.failed ? ` (${i.failed} failed)` : ''}
                      </td>
                      <td data-label="Opened">{pct(i.opened, i.sent)}</td>
                      <td data-label="Clicked">{pct(i.clicked, i.sent)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="adm-hint">Opened and Clicked count each email once and leave out mail scanners. Opens are a picture load (low where a mail app blocks pictures, high with Apple Mail’s privacy setting): clicks are the number to trust. They need <code>scripts/supabase-email-tracking.sql</code>; until it is run they show a dash.</p>

          <div className="adm-section-head">
            <h2>Everyone on the list</h2>
          </div>
          <div className="adm-toolbar">
            <nav className="adm-segments" aria-label="Status">
              {[{ id: '', label: 'All', count: counts.total }, ...SUBSCRIBER_STATUSES.map((s) => ({ id: s, label: LABEL[s], count: counts[s] }))].map((t) => (
                <Link key={t.id || 'all'} href={href({ status: t.id, page: '' })} className={status === t.id ? 'on' : ''} aria-current={status === t.id ? 'true' : undefined}>
                  {t.label}
                  <span>{t.count}</span>
                </Link>
              ))}
            </nav>
            <form className="adm-search adm-filter-search" action="/admin/subscribers/" method="get" role="search">
              <AdminIcon name="search" />
              {status && <input type="hidden" name="status" value={status} />}
              <input name="q" type="search" defaultValue={q} placeholder="Search name or email" aria-label="Search subscribers" />
            </form>
          </div>
          {list.rows.length === 0 ? (
            <div className="adm-card adm-empty">
              <p>{counts.total ? 'No one matches that.' : 'No one has signed up yet. The footer box and the forms’ checkbox send people here, after they confirm.'}</p>
            </div>
          ) : (
            <div className="adm-table-wrap">
              <table className="adm-leads">
                <thead>
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Where from</th>
                    <th scope="col">Asked</th>
                    <th scope="col">Confirmed</th>
                    <th scope="col">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {list.rows.map((r) => (
                    <tr key={r.email}>
                      <td data-label="Email">{r.email}</td>
                      <td data-label="Name">{r.name || '–'}</td>
                      <td data-label="Status">
                        <span className={'adm-chip ' + (r.status === 'confirmed' ? 'on' : '')}>{LABEL[r.status] || r.status}</span>
                      </td>
                      <td data-label="Where from">{SOURCES[r.source] || r.source || '–'}</td>
                      <td data-label="Asked">{day(r.created_at)}</td>
                      <td data-label="Confirmed">{day(r.confirmed_at)}</td>
                      <td data-label="Actions">
                        <SubscriberActions email={r.email} status={r.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {pages > 1 && (
            <nav className="adm-pager" aria-label="Pages">
              {page > 1 && <Link className="adm-btn" href={href({ page: String(page - 1) })}>Previous</Link>}
              <span>
                Page {page} of {pages}
              </span>
              {page < pages && <Link className="adm-btn" href={href({ page: String(page + 1) })}>Next</Link>}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
