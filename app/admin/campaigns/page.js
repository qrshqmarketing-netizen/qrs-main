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
