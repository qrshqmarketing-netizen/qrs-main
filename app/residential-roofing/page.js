import CardGrid from '@/components/sections/CardGrid';
import DifferenceBand from '@/components/sections/DifferenceBand';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Overview from '@/components/sections/Overview';
import PageHero from '@/components/sections/PageHero';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceFinder from '@/components/sections/ServiceFinder';
import { LOCATION_CTA } from '@/components/templates/shared';
import { HOME, RESIDENTIAL, RESIDENTIAL_TYPES, typeCard } from '@/data/catalog';
import { RESIDENTIAL_PAGE as page } from '@/data/pages/residential';
import { pageMetadata } from '@/lib/pages';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: RESIDENTIAL.href });

// Residential hub: every roof type, then every service by roof type (content in data/pages/residential.js)
export default function ResidentialRoofingPage() {
  return (
    <main id="top">
      <PageHero
        crumbs={[HOME, RESIDENTIAL]}
        eyebrow="Los Angeles & Orange County"
        title={page.hero.heading}
        intro={page.hero.intro}
        image="/images/home-hero-drone-view.webp"
        imageAlt="Aerial view of a Southern California neighborhood of shingle-roofed homes"
        imagePosition="center 45%"
      />
      <Overview heading={page.overview.heading} paragraphs={page.overview.paragraphs} />
      <CardGrid id="roof-types" heading={page.cards.heading} intro={page.cards.intro} cards={RESIDENTIAL_TYPES.map(typeCard)} tone="wash" />
      <ServiceFinder heading={page.finder.heading} intro={page.finder.intro} rows={page.finder.rows} />
      <DifferenceBand />
      <Faq heading="Frequently Asked Questions" sub="Straight answers about residential roofing." faqs={page.faqs} cta={false} />
      <RoofCheck tone="white" />
      <FinalCta {...LOCATION_CTA} />
    </main>
  );
}
