import Link from 'next/link';
import { redirect } from 'next/navigation';
import AdminIcon from '@/components/admin/AdminIcons';
import CampaignRun from '@/components/admin/CampaignRun';
import PageHead from '@/components/admin/PageHead';
import { isAdmin } from '@/lib/adminAuth';
import { listCampaigns, resendReady } from '@/lib/drips';
import { statusLabel } from '@/lib/leadStatuses';
import { dbConfigured } from '@/lib/supabase';

// /admin/campaigns/: the drip campaigns (owner, November 9 2026; lib/drips.js, tables in scripts/supabase-campaigns.sql). Each one with who it
// is for, whether it is sending, how many emails it has and its numbers; "Run now" runs what the daily 8 AM run does.
export const dynamic = 'force-dynamic';

// "12 (40%)" of the emails sent; a dash when tracking isn't set up yet (scripts/supabase-email-tracking.sql)
const pct = (n, of) => (n == null ? '–' : `${n}${of ? ` (${Math.round((n / of) * 100)}%)` : ''}`);

export default async function CampaignsPage() {
  if (!(await isAdmin())) redirect('/admin/');
  let campaigns = [];
  let problem = '';
  if (!dbConfigured()) problem = 'Campaigns need the site’s Supabase settings (SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel).';
  else {
    try {
      campaigns = await listCampaigns();
    } catch (err) {
      problem = /PGRST205|does not exist|Could not find the table/i.test(err.message)
        ? 'The campaign tables are not set up yet. Run scripts/supabase-campaigns.sql once: Supabase dashboard → SQL Editor → New query → paste the file → Run.'
        : `Supabase said: ${err.message}`;
    }
  }
  return (
    <div className="adm-page adm-page-wide">
      <PageHead
        crumbs={[{ label: 'Dashboard', href: '/admin/' }, { label: 'Campaigns' }]}
        title="Campaigns"
        text="Email series sent through Resend to the leads in a status, one email at a time. They send on the daily 8 AM run."
        actions={
          <>
            {!problem && <CampaignRun />}
            <Link className="adm-btn adm-btn-primary" href="/admin/campaigns/new/">
              <AdminIcon name="plus" /> New campaign
            </Link>
          </>
        }
      />
      <p className="adm-hint">Opened and Clicked count each email once (a click also counts as an open) and leave out mail scanners. Opens are a picture load, so they run low where a mail app blocks pictures and high where it loads them for everyone (Apple Mail’s privacy setting): clicks are the number to trust. Tracking needs <code>scripts/supabase-email-tracking.sql</code> run once; until then these columns show a dash.</p>
      {!resendReady() && <div className="adm-msg warn">Resend is not set up for sending: the site needs RESEND_API_KEY and LEADS_FROM_EMAIL in Vercel (the same ones the lead emails use). Campaigns can be written, but nothing is sent.</div>}
      {problem ? (
        <div className="adm-msg bad">{problem}</div>
      ) : !campaigns.length ? (
        <div className="adm-card adm-empty">
          <p>No campaigns yet. Start with the El Niño series for your Remarketing leads, then change it as you like.</p>
          <Link className="adm-btn adm-btn-primary" href="/admin/campaigns/new/">
            <AdminIcon name="plus" /> New campaign
          </Link>
        </div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Sends to</th>
                <th>Status</th>
                <th>Emails</th>
                <th>Enrolled</th>
                <th>Sent</th>
                <th>Opened</th>
                <th>Clicked</th>
                <th>Finished</th>
                <th>Stopped</th>
                <th>Unsubscribed</th>
                <th>Failed</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id}>
                  <td>
                    <Link className="adm-link" href={`/admin/campaigns/${c.id}/`}>
                      {c.name}
                    </Link>
                  </td>
                  <td>{statusLabel(c.audience_status)} leads</td>
                  <td>
                    <span className={'adm-chip ' + (c.active ? 'on' : '')}>{c.active ? 'Sending' : 'Paused'}</span>
                  </td>
                  <td>{c.steps?.length || 0}</td>
                  <td>{c.stats.enrolled}</td>
                  <td>{c.stats.sent}</td>
                  <td>{pct(c.tracking?.opened, c.stats.sent)}</td>
                  <td>
                    {pct(c.tracking?.clicked, c.stats.sent)}
                    {c.tracking?.links?.length > 0 && (
                      <details className="adm-hint">
                        <summary>Top links</summary>
                        <ul>
                          {c.tracking.links.map((l) => (
                            <li key={l.url}>
                              {l.clicks} × {l.url.replace(/^https?:\/\/[^/]+/, '').replace(/[?#].*$/, '') || '/'}
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </td>
                  <td>{c.stats.completed}</td>
                  <td>{c.stats.stopped}</td>
                  <td>{c.stats.unsubscribed}</td>
                  <td>{c.stats.failed + c.stats.errors ? `${c.stats.failed} (${c.stats.errors} errors)` : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
