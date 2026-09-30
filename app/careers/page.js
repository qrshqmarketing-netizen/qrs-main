import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import ProofBar from '@/components/sections/ProofBar';
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
const HERO_IMAGE = '/images/careers-hero-crew-shingle-roof.webp';

const schema = pageJsonLd({ path: CAREERS_LINK.href, title: page.metaTitle, description: page.metaDescription, crumbs: CRUMBS, faqs: page.faqs, image: HERO_IMAGE });

const EMAIL_LINK = `mailto:${page.email}?subject=${encodeURIComponent('Careers at QRS')}`;

// Careers page (content in data/pages/careers.js)
export default function CareersPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        crumbs={CRUMBS}
        eyebrow="Careers"
        title={page.hero.heading}
        intro={page.hero.intro}
        image={HERO_IMAGE}
        mobileImage="/images/careers-hero-crew-shingle-roof-mobile.webp"
        imageAlt="Two QRS roofers installing shingles together on a roof"
        imagePosition="center 30%"
        actions={[
          { label: 'Email Us Your Info', href: EMAIL_LINK, style: 'gold' },
          { label: `Call ${PHONE}`, href: TEL, style: 'line' },
        ]}
      />
      <ValueGrid heading={page.values.heading} items={page.values.items} tone="wash" pattern />
      <ProofBar />
      <ValueGrid id="roles" heading={page.roles.heading} intro={page.roles.intro} items={page.roles.items} />
      <Faq heading="Careers FAQs" sub="Straight answers about working at QRS." faqs={page.faqs} cta={false} />
      <ProcessSteps
        heading={page.apply.heading}
        subheading={page.apply.subheading}
        steps={page.apply.steps}
        image="/images/careers-process-roofer-crew.webp"
        imageAlt="Smiling QRS roofer in gear with a crewmate working on the roof behind him"
        showOnMobile
        tone="white"
      />
      <FinalCta trust={false} heading="Ready to Join the Crew?" text={`Email us your info or call ${PHONE} during business hours.`} cta={{ label: 'Email Us Your Info', href: EMAIL_LINK }} />
    </main>
  );
}
