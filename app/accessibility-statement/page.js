import LegalPage from '@/components/templates/LegalPage';
import { ACCESSIBILITY_LINK } from '@/data/catalog';
import { ACCESSIBILITY as page } from '@/data/pages/legal';
import { pageMetadata } from '@/lib/pages';

// Accessibility statement (content in data/pages/legal.js)
export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: ACCESSIBILITY_LINK.href });

export default function AccessibilityStatementPage() {
  return <LegalPage page={page} path={ACCESSIBILITY_LINK.href} />;
}
