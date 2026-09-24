import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import PageHero from '@/components/sections/PageHero';
import ProcessSteps from '@/components/sections/ProcessSteps';
import ValueGrid from '@/components/sections/ValueGrid';
import JsonLd from '@/components/ui/JsonLd';
import { CAREERS_LINK, HOME } from '@/data/catalog';
import { CAREERS_PAGE as page } from '@/data/pages/careers';
import { PHONE, TEL } from '@/data/site';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: CAREERS_LINK.href });

const CRUMBS = [HOME, CAREERS_LINK];
const HERO_IMAGE = '/images/qrs-truck-4k.webp';

const schema = pageJsonLd({ path: CAREERS_LINK.href, title: page.metaTitle, description: page.metaDescription, crumbs: CRUMBS, faqs: page.faqs, image: HERO_IMAGE });

const EMAIL_LINK = `mailto:${page.email}?subject=${encodeURIComponent('Careers at QRS')}`;

// Careers page (content in data/pages/careers.js)
export default function CareersPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="Careers"
        title={page.hero.heading}
        intro={page.hero.intro}
        image={HERO_IMAGE}
        imageAlt="Quality Roofing Specialists truck parked on a residential street"
        imagePosition="40% center"
        actions={[
          { label: 'Email Us Your Info', href: EMAIL_LINK, style: 'gold' },
          { label: `Call ${PHONE}`, href: TEL, style: 'line' },
        ]}
      />
      <ValueGrid heading={page.values.heading} items={page.values.items} tone="wash" />
      <ValueGrid id="roles" heading={page.roles.heading} intro={page.roles.intro} items={page.roles.items} />
      <Faq heading="Careers FAQs" sub="Straight answers about working at QRS." faqs={page.faqs} cta={false} />
      <ProcessSteps heading={page.apply.heading} subheading={page.apply.subheading} steps={page.apply.steps} image="/images/roof-drone-palms.webp" imageAlt="Aerial view of a finished shingle roof" tone="white" />
      <FinalCta heading="Ready to Join the Crew?" text={`Email us your info or call ${PHONE} during business hours.`} cta={{ label: 'Email Us Your Info', href: EMAIL_LINK }} />
    </main>
  );
}
