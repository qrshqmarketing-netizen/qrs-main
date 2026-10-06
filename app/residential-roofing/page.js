import CardCarousel from '@/components/sections/CardCarousel';
import DifferenceBand from '@/components/sections/DifferenceBand';
import Faq from '@/components/sections/Faq';
import LatestArticles from '@/components/sections/LatestArticles';
import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import ReviewStrip from '@/components/sections/ReviewStrip';
import Overview from '@/components/sections/Overview';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceFinder from '@/components/sections/ServiceFinder';
import { closingCta } from '@/components/templates/shared';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, RESIDENTIAL, RESIDENTIAL_TYPES, typeCard } from '@/data/catalog';
import { RESIDENTIAL_PAGE as page } from '@/data/pages/residential';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import { articlesFor } from '@/lib/articles';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: RESIDENTIAL.href });

const CRUMBS = [HOME, RESIDENTIAL];
const HERO_IMAGE = '/images/home-hero-drone-view.webp';

const schema = pageJsonLd({
  path: RESIDENTIAL.href,
  title: page.metaTitle,
  description: page.metaDescription,
  type: 'CollectionPage',
  crumbs: CRUMBS,
  faqs: page.faqs,
  service: { name: RESIDENTIAL.label, type: page.keyword, catalog: RESIDENTIAL_TYPES.map((t) => ({ name: t.label, href: t.href })) },
  image: HERO_IMAGE,
});

// Residential hub: every roof type, then every service by roof type (content in data/pages/residential.js)
export default async function ResidentialRoofingPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        crumbs={CRUMBS}
        eyebrow="Homes, HOAs & Multi-Family"
        title={page.hero.heading}
        outcome={heroOutcome(RESIDENTIAL.href)}
        intro={page.hero.intro}
        image={HERO_IMAGE}
        imageAlt="Aerial view of a Southern California neighborhood of shingle-roofed homes"
        imagePosition="center 45%"
        stats
      />
      <Overview heading={page.overview.heading} paragraphs={page.overview.paragraphs} />
      <ReviewStrip />
      <CardCarousel title={page.cards.heading} items={RESIDENTIAL_TYPES.map(typeCard)} idPrefix="roofTypes" tone="wash" />
      <ServiceFinder heading={page.finder.heading} intro={page.finder.intro} rows={page.finder.rows} />
      <DifferenceBand />
      <LatestArticles posts={await articlesFor(RESIDENTIAL.href)} heading="Related Roofing Articles" />
      <Faq heading="Frequently Asked __Questions__" sub="Straight answers about residential roofing." faqs={page.faqs} cta={false} />
      <RoofCheck tone="white" />
      <FinalCta {...closingCta(page.keyword)} />
    </main>
  );
}
