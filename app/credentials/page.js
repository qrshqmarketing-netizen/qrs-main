import Credentials from '@/components/sections/Credentials';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import { CREDENTIALS_LINK, HOME } from '@/data/catalog';
import { CREDENTIALS_PAGE as page, CREDENTIALS_PUBLIC } from '@/data/pages/credentials';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

// Credentials page: the license, the manufacturer certification logos and how we work (copy in data/pages/credentials.js). While CREDENTIALS_PUBLIC is false
// it is noindex and nothing links to it.
export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: CREDENTIALS_LINK.href, noindex: !CREDENTIALS_PUBLIC });

const CRUMBS = [HOME, CREDENTIALS_LINK];

const schema = pageJsonLd({
  path: CREDENTIALS_LINK.href,
  title: page.metaTitle,
  description: page.metaDescription,
  type: 'AboutPage',
  crumbs: CRUMBS,
  faqs: page.faqs,
  image: page.hero.image,
});

export default function CredentialsPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        crumbs={CRUMBS}
        eyebrow="Credentials"
        title={page.hero.heading}
        outcome={heroOutcome(CREDENTIALS_LINK.href)}
        intro={page.hero.intro}
        image={page.hero.image}
        imageAlt={page.hero.imageAlt}
        stats
      />
      <Credentials page={page} />
      <Faq heading="Credentials FAQs" sub="Straight answers about our license, insurance and certifications." faqs={page.faqs} cta={false} />
      <RoofCheck tone="white" />
      <FinalCta heading="Work With a Licensed Roofer" text="Start with a free roof evaluation. A roofer looks at your roof and gives you a written scope and price before any work begins." />
    </main>
  );
}
