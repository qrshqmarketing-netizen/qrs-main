import { notFound, redirect } from 'next/navigation';
import AdminIcon from '@/components/admin/AdminIcons';
import LeadEditor from '@/components/admin/LeadEditor';
import PageHead from '@/components/admin/PageHead';
import { isAdmin } from '@/lib/adminAuth';
import { getLead, LEAD_STATUSES } from '@/lib/adminLeads';

// /admin/leads/<id>/: one lead. Call and email buttons, the status and notes the team keeps (LeadEditor), then everything the lead sent: the job
// details, their message, the Instant Quote estimate, the chat transcript and where they came from (page, campaign tags).
const DETAILS = [
  ['source', 'Came in through'],
  ['service', 'What they need'],
  ['roof_type', 'Roof type'],
  ['address', 'Address'],
  ['zip', 'ZIP code'],
  ['preferred_date', 'Preferred date'],
  ['preferred_time', 'Preferred time'],
  ['found_us', 'How they found us'],
  ['page', 'Sent from page'],
  ['landing_page', 'First page'],
  ['utm_source', 'Campaign source'],
  ['utm_medium', 'Campaign medium'],
  ['utm_campaign', 'Campaign'],
];

export default async function LeadPage({ params }) {
  if (!(await isAdmin())) redirect('/admin/');
  const lead = await getLead((await params).id).catch(() => null);
  if (!lead) notFound();
  const received = new Date(lead.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Los_Angeles' });
  const name = lead.name || lead.phone || lead.email || 'Lead';

  return (
    <div className="adm-page">
      <PageHead
        crumbs={[{ label: 'Dashboard', href: '/admin/' }, { label: 'Leads', href: '/admin/leads/' }, { label: name }]}
        title={name}
        text={`Received ${received} (Pacific time)`}
        actions={
          <>
            {lead.phone && (
              <a className="adm-btn adm-btn-primary" href={`tel:${lead.phone.replace(/[^\d+]/g, '')}`}>
                <AdminIcon name="phone" /> Call {lead.phone}
              </a>
            )}
            {lead.email && (
              <a className="adm-btn adm-btn-line" href={`mailto:${lead.email}`}>
                <AdminIcon name="mail" /> Email
              </a>
            )}
          </>
        }
      />
      <div className="adm-split">
        <div className="adm-stack">
          <section className="adm-card">
            <h2>Details</h2>
            <dl className="adm-dl">
              {DETAILS.filter(([k]) => lead[k]).map(([k, label]) => (
                <div key={k}>
                  <dt>{label}</dt>
                  <dd>{String(lead[k])}</dd>
                </div>
              ))}
            </dl>
          </section>
          {lead.message && (
            <section className="adm-card">
              <h2>Message</h2>
              <p className="adm-pre">{lead.message}</p>
            </section>
          )}
          {lead.quote && (
            <section className="adm-card">
              <h2>Instant Quote</h2>
              <p className="adm-pre">{lead.quote}</p>
            </section>
          )}
          {lead.transcript && (
            <section className="adm-card">
              <h2>Chat</h2>
              <p className="adm-pre">{lead.transcript}</p>
            </section>
          )}
        </div>
        <LeadEditor id={lead.id} status={lead.status || 'new'} notes={lead.notes || ''} statuses={LEAD_STATUSES} />
      </div>
    </div>
  );
}
