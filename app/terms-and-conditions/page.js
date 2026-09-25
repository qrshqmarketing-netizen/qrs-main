import LegalPage from '@/components/templates/LegalPage';
import { TERMS_LINK } from '@/data/catalog';
import { TERMS as page } from '@/data/pages/legal';
import { pageMetadata } from '@/lib/pages';

// Terms & conditions (content in data/pages/legal.js)
export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: TERMS_LINK.href });

export default function TermsPage() {
  return <LegalPage page={page} path={TERMS_LINK.href} />;
}
