import AdminShell from '@/components/admin/AdminShell';
import '@/components/admin/admin.css';
import { currentAdmin, teamList } from '@/lib/adminAuth';

// The team dashboard (login and accounts in lib/adminAuth.js, leads in lib/adminLeads.js, articles in lib/postsStore.js). Never indexed; the public
// site's header, footer and widgets are left out here (components/layout/SiteChrome.jsx). Signed in, every page sits in the AdFlux-style frame
// (AdminShell: sidebar, top bar, the Team link's count of accounts waiting for approval); signed out, the pages show the login or register card.
export const metadata = { title: 'Team dashboard', robots: { index: false, follow: false } };

export default async function AdminLayout({ children }) {
  const who = await currentAdmin();
  if (!who) return <div className="adm adm-out">{children}</div>;
  const team = await teamList().catch(() => null);
  const pending = team ? team.filter((u) => u.role === 'pending').length : 0;
  return (
    <AdminShell who={who} pending={pending}>
      {children}
    </AdminShell>
  );
}
