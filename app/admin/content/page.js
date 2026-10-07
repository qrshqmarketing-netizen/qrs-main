import { redirect } from 'next/navigation';
import ContentEditor from '@/components/admin/ContentEditor';
import { isAdmin } from '@/lib/adminAuth';
import { faqsToText } from '@/lib/articleFormat';
import { adminGetHomeFaqs } from '@/lib/contentStore';
import { dbConfigured } from '@/lib/supabase';

// /admin/content/: the site text edited here (the home page's FAQ)
export default async function ContentPage() {
  if (!(await isAdmin())) redirect('/admin');
  let initial = '';
  let saved = false;
  let problem = '';
  if (!dbConfigured()) problem = 'Supabase is not connected to the site yet (SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel).';
  else {
    try {
      const got = await adminGetHomeFaqs();
      initial = faqsToText(got.faqs);
      saved = got.saved;
    } catch (err) {
      problem = /42P01|PGRST205|does not exist/.test(err.message)
        ? 'The site_content table does not exist yet. In Supabase, open the SQL Editor and run scripts/supabase-content.sql, then reload this page.'
        : `Supabase said: ${err.message}`;
    }
  }
  return <ContentEditor initial={initial} saved={saved} problem={problem} />;
}
