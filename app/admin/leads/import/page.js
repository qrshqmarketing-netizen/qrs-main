import { redirect } from 'next/navigation';
import LeadImport from '@/components/admin/LeadImport';
import PageHead from '@/components/admin/PageHead';
import { isAdmin } from '@/lib/adminAuth';
import { dbConfigured } from '@/lib/supabase';

// /admin/leads/import/: add leads from a CSV file (components/admin/LeadImport.jsx; owner, November 9 2026)
export default async function ImportLeadsPage() {
  if (!(await isAdmin())) redirect('/admin/');
  return (
    <div className="adm-page">
      <PageHead
        crumbs={[{ label: 'Dashboard', href: '/admin/' }, { label: 'Leads', href: '/admin/leads/' }, { label: 'Import CSV' }]}
        title="Import leads from a CSV file"
        text="Upload a spreadsheet of leads, match its columns to the lead fields, and add them to your pipeline."
      />
      {dbConfigured() ? <LeadImport /> : <div className="adm-msg bad">Importing needs the site’s Supabase settings (SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel).</div>}
    </div>
  );
}
