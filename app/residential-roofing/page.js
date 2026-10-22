import CardCarousel from '@/components/sections/CardCarousel';
import AreaLinks from '@/components/home/AreaLinks';
import CheckBand from '@/components/home/CheckBand';
import HomeArticles from '@/components/home/HomeArticles';
import HomeWork from '@/components/home/HomeWork';
import ReviewTrio from '@/components/home/ReviewTrio';
import '@/components/home/HomeClean.css';
import '@/components/home/CleanPages.css';
import Faq from '@/components/sections/Faq';
import Hero from '@/components/sections/Hero';
import Overview from '@/components/sections/Overview';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceFinder from '@/components/sections/ServiceFinder';
import { projectsShownOn } from '@/data/projectPages';
import { AREA_LINKS, checksFor } from '@/data/nearYou';
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

// Residential hub: every roof type, then every service by roof type (content in data/pages/residential.js). In the clean format with the
// publicstorage.com patterns like the other sub pages (owner, October 22 2026): projects matched to the page, three reviews, the checklist
// band, the related articles row, four FAQs, the request form and the area links (no second closing call to action).
export default async function ResidentialRoofingPage() {
  const work = projectsShownOn(RESIDENTIAL.href);
  return (
    <main id="top" className="clean-page">
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
      <CardCarousel title={page.cards.heading} items={RESIDENTIAL_TYPES.map(typeCard)} idPrefix="roofTypes" tone="wash" />
      <ServiceFinder heading={page.finder.heading} intro={page.finder.intro} rows={page.finder.rows} />
      {/* The work itself, after the service finder (owner, October 15 2026, after maben.com.au) */}
      {work.projects.length > 0 && <HomeWork heading={work.heading} projects={work.projects.slice(0, 3)} all={{ label: 'View all projects', href: '/projects/' }} />}
      <ReviewTrio path={RESIDENTIAL.href} />
      <CheckBand {...checksFor(RESIDENTIAL.href)} />
      <HomeArticles posts={await articlesFor(RESIDENTIAL.href)} heading="Related articles" />
      <Faq heading="Frequently Asked __Questions__" sub="Straight answers about residential roofing." faqs={page.faqs} cta={false} limit={4} />
      <RoofCheck tone="white" />
      <AreaLinks {...AREA_LINKS} />
    </main>
  );
}
