import { notFound, redirect } from 'next/navigation';
import LeadForm from '@/components/admin/LeadForm';
import PageHead from '@/components/admin/PageHead';
import { isAdmin } from '@/lib/adminAuth';
import { getLead } from '@/lib/adminLeads';

// /admin/leads/<id>/edit/: change any of a lead's details
export default async function EditLeadPage({ params }) {
  if (!(await isAdmin())) redirect('/admin/');
  const lead = await getLead((await params).id).catch(() => null);
  if (!lead) notFound();
  const name = lead.name || lead.phone || lead.email || 'Lead';
  return (
    <div className="adm-page">
      <PageHead crumbs={[{ label: 'Dashboard', href: '/admin/' }, { label: 'Leads', href: '/admin/leads/' }, { label: name, href: `/admin/leads/${lead.id}/` }, { label: 'Edit' }]} title={`Edit ${name}`} />
      <LeadForm lead={lead} />
    </div>
  );
}
