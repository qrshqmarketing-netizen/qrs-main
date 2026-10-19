import { redirect } from 'next/navigation';
import PageHead from '@/components/admin/PageHead';
import TeamList from '@/components/admin/TeamList';
import { accountsReady, currentAdmin, teamList } from '@/lib/adminAuth';

// /admin/team/: everyone with a dashboard account. Requests from /admin/register/ wait at the top for an admin to approve or decline them;
// approved people can be suspended (back to waiting) or removed.
export default async function TeamPage() {
  const who = await currentAdmin();
  if (!who) redirect('/admin/');
  const users = accountsReady() ? await teamList() : [];
  const problem = !accountsReady()
    ? 'Personal accounts need the site’s Supabase settings (SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel).'
    : users === null
      ? 'Could not reach Supabase to read the accounts. Reload the page in a moment.'
      : '';
  return (
    <div className="adm-page">
      <PageHead
        crumbs={[{ label: 'Dashboard', href: '/admin/' }, { label: 'Team' }]}
        title="Team"
        text="Approve new accounts and choose who can use the dashboard. People ask for an account at /admin/register/."
      />
      {problem ? <div className="adm-msg bad">{problem}</div> : <TeamList users={users} me={who.id} />}
    </div>
  );
}
