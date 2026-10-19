import { redirect } from 'next/navigation';
import LeadForm from '@/components/admin/LeadForm';
import PageHead from '@/components/admin/PageHead';
import { isAdmin } from '@/lib/adminAuth';

// /admin/leads/new/: add a lead by hand (a walk-in, a referral, a call taken away from the website)
export default async function NewLeadPage() {
  if (!(await isAdmin())) redirect('/admin/');
  return (
    <div className="adm-page">
      <PageHead crumbs={[{ label: 'Dashboard', href: '/admin/' }, { label: 'Leads', href: '/admin/leads/' }, { label: 'New lead' }]} title="New lead" text="Add someone who reached you another way, such as a referral or a visit to the office." />
      <LeadForm />
    </div>
  );
}
