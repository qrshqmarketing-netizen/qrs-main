import '@/components/admin/admin.css';

// The team dashboard (login in lib/adminAuth.js, articles in lib/postsStore.js). Never indexed; the public site's header, footer and
// widgets are left out here (components/layout/SiteChrome.jsx).
export const metadata = { title: 'Team dashboard', robots: { index: false, follow: false } };

export default function AdminLayout({ children }) {
  return <div className="adm">{children}</div>;
}
