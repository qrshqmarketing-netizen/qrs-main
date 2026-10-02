import Hero from '@/components/sections/Hero';
import ProcessSteps from '@/components/sections/ProcessSteps';
import JsonLd from '@/components/ui/JsonLd';
import LeadConversion from '@/components/ui/LeadConversion';
import Rich from '@/components/ui/Rich';
import { HOME, PROJECTS_LINK } from '@/data/catalog';
import { THANK_YOU_PAGE as page } from '@/data/pages/thankYou';
import { PHONE, TEL } from '@/data/site';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

// Thank-you page for the estimate form (copy: data/pages/thankYou.js). Not in the sitemap or search results.
// For conversion tracking, count the generate_lead event (fired here by LeadConversion) or views of /thank-you/.
export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path, noindex: true });

const CRUMBS = [HOME, { label: 'Thank You', href: page.path }];

export default function ThankYouPage() {
  return (
    <main id="top">
      <JsonLd data={pageJsonLd({ path: page.path, title: page.metaTitle, description: page.metaDescription, crumbs: CRUMBS })} />
      <LeadConversion />
      <Hero
        eyebrow={page.hero.eyebrow}
        title={page.hero.heading}
        intro={page.hero.intro}
        actions={[
          { label: `Call ${PHONE}`, href: TEL, style: 'gold' },
          { label: 'See Our Projects', href: PROJECTS_LINK.href, style: 'line' },
        ]}
      />
      <ProcessSteps heading={page.next.heading} subheading={<Rich text={page.next.subheading} />} steps={page.next.steps} scene="scene-inspect" tone="white" />
    </main>
  );
}
