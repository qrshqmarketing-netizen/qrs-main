import { notFound, redirect } from 'next/navigation';
import CampaignEditor from '@/components/admin/CampaignEditor';
import PageHead from '@/components/admin/PageHead';
import { currentAdmin } from '@/lib/adminAuth';
import { getCampaign } from '@/lib/drips';

// /admin/campaigns/<id>/: edit a campaign (components/admin/CampaignEditor.jsx)
export const dynamic = 'force-dynamic';

export default async function CampaignPage({ params }) {
  const who = await currentAdmin();
  if (!who) redirect('/admin/');
  const { id } = await params;
  const campaign = await getCampaign(id).catch(() => null);
  if (!campaign) notFound();
  return (
    <div className="adm-page">
      <PageHead crumbs={[{ label: 'Dashboard', href: '/admin/' }, { label: 'Campaigns', href: '/admin/campaigns/' }, { label: campaign.name }]} title={campaign.name} />
      <CampaignEditor campaign={campaign} me={who.email || ''} />
    </div>
  );
}
