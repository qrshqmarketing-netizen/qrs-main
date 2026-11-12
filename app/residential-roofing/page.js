import Faq from '@/components/sections/Faq';
import LatestArticles from '@/components/sections/LatestArticles';
import FinalCta from '@/components/sections/FinalCta';
import ProofBar from '@/components/sections/ProofBar';
import TrustLogos from '@/components/sections/TrustLogos';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceFinder from '@/components/sections/ServiceFinder';
import StudioProjects from '@/components/studio/StudioProjects';
import { QhHero, QhHomeStreet } from '@/components/home/QrsSections';
import '@/components/home/QrsHome.css';
import { HERO_ANNOTATIONS } from '@/data/site';
import { languagesFor } from '@/lib/lang';
import { SvcCardGrid, SvcIntro, SvcOffer, SvcReviews, SvcTrust } from '@/components/svc/SvcSections';
import { projectsShownOn } from '@/data/projectPages';
import { closingCta } from '@/components/templates/shared';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, RESIDENTIAL, RESIDENTIAL_TYPES, typeCard } from '@/data/catalog';
import { RESIDENTIAL_PAGE as page } from '@/data/pages/residential';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import { articlesFor } from '@/lib/articles';

const base = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: RESIDENTIAL.href });
export const metadata = { ...base, alternates: { ...base.alternates, languages: languagesFor(RESIDENTIAL.href) } }; // the Spanish page is /es/residential-roofing/

const CRUMBS = [HOME, RESIDENTIAL];
const HERO_IMAGE = '/images/home-hero-drone-view.webp';

const TYPES = RESIDENTIAL_TYPES.map((t) => ({ title: t.label, text: t.blurb, href: t.href, image: t.cardImage || t.image, caption: t.label }));

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

// Residential hub: every roof type, then every service by roof type (content in data/pages/residential.js). Layout (owner, October 29 2026):
// the service pages' design after remote.com (components/svc/): gradient hero with the WebGL roof frame, the proof strip, the overview, the
// roof types as photo cards, the service finder, credibility with numbers, the written-price offer, projects, review cards, articles, FAQ,
// the request form and the closing call to action.
export default async function ResidentialRoofingPage() {
  return (
    <main id="top" className="svc">
      <JsonLd data={schema} />
      {/* The new-theme hero (owner, November 10 2026) on the earlier layout and content */}
      <div className="qh-scope">
        <QhHero crumbs={CRUMBS} title={page.hero.heading} outcome={heroOutcome(RESIDENTIAL.href)} text={page.hero.intro} checks={page.hero.highlights || HERO_ANNOTATIONS.home} visual={<QhHomeStreet items={TYPES} />} badges />
      </div>
      <ProofBar strip />
      {/* Google, BBB and Yelp logos linking to our profiles (owner, November 2 2026) */}
      <TrustLogos />
      <SvcIntro heading={page.overview.heading} paragraphs={page.overview.paragraphs} />
      <SvcCardGrid id="roof-types" heading={page.cards.heading} cards={RESIDENTIAL_TYPES.map(typeCard)} />
      <ServiceFinder heading={page.finder.heading} intro={page.finder.intro} rows={page.finder.rows} />
      <SvcTrust path={RESIDENTIAL.href} />
      <SvcOffer offer="home" />
      {/* The work itself (owner, October 15 2026, after maben.com.au) */}
      <StudioProjects projects={projectsShownOn(RESIDENTIAL.href).projects} heading="Recent roofing projects" />
      <SvcReviews path={RESIDENTIAL.href} />
      <LatestArticles posts={await articlesFor(RESIDENTIAL.href)} heading="Related Roofing Articles" />
      <div className="sv-faq-wrap">
        <Faq heading="Frequently Asked __Questions__" sub="Straight answers about residential roofing." faqs={page.faqs} cta={false} />
      </div>
      <RoofCheck tone="white" />
      <FinalCta {...closingCta(page.keyword)} />
    </main>
  );
}
