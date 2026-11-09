import { redirect } from 'next/navigation';
import CampaignEditor from '@/components/admin/CampaignEditor';
import PageHead from '@/components/admin/PageHead';
import { currentAdmin } from '@/lib/adminAuth';
import { EL_NINO_TEMPLATE } from '@/lib/drips';

// /admin/campaigns/new/: a new campaign, started from the El Niño series (lib/drips.js EL_NINO_TEMPLATE), paused until "Start sending"
export default async function NewCampaignPage() {
  const who = await currentAdmin();
  if (!who) redirect('/admin/');
  return (
    <div className="adm-page">
      <PageHead crumbs={[{ label: 'Dashboard', href: '/admin/' }, { label: 'Campaigns', href: '/admin/campaigns/' }, { label: 'New' }]} title="New campaign" text="Starts from the El Niño series. Change the emails, save it, send yourself a test, then start sending." />
      <CampaignEditor campaign={{ ...EL_NINO_TEMPLATE, active: false }} me={who.email || ''} />
    </div>
  );
}
