import { redirect } from 'next/navigation';
import PageHead from '@/components/admin/PageHead';
import UsersManager from '@/components/admin/UsersManager';
import { accountsReady, currentAdmin, MIN_ACCOUNT_PASSWORD, teamList } from '@/lib/adminAuth';

// /admin/users/: every dashboard account (Supabase Auth). Admins add, edit (name, email, access, password) and delete accounts here, and approve
// or decline the requests from /admin/register/ (components/admin/UsersManager.jsx, app/api/admin/users). ?new opens the "New user" form.
export default async function UsersPage({ searchParams }) {
  const who = await currentAdmin();
  if (!who) redirect('/admin/');
  const users = accountsReady() ? await teamList() : [];
  const problem = !accountsReady()
    ? 'User accounts need the site’s Supabase settings (SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel).'
    : users === null
      ? 'Could not reach Supabase to read the accounts. Reload the page in a moment.'
      : '';
  const openNew = 'new' in ((await searchParams) || {});
  return (
    <div className="adm-page">
      <PageHead crumbs={[{ label: 'Dashboard', href: '/admin/' }, { label: 'Users' }]} title="Users" text="Add, edit and remove the people who can use this dashboard, and approve new requests." />
      {problem ? <div className="adm-msg bad">{problem}</div> : <UsersManager users={users} me={who.id} minPassword={MIN_ACCOUNT_PASSWORD} openNew={openNew} />}
    </div>
  );
}
