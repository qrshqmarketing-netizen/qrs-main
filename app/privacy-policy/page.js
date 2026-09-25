import LegalPage from '@/components/templates/LegalPage';
import { PRIVACY_LINK } from '@/data/catalog';
import { PRIVACY_POLICY as page } from '@/data/pages/legal';
import { pageMetadata } from '@/lib/pages';

// Privacy policy (content in data/pages/legal.js)
export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: PRIVACY_LINK.href });

export default function PrivacyPolicyPage() {
  return <LegalPage page={page} path={PRIVACY_LINK.href} />;
}
