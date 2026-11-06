import FinalCta from '@/components/sections/FinalCta';
import ProofBar from '@/components/sections/ProofBar';
import TrustLogos from '@/components/sections/TrustLogos';
import { QhAccount, QhFinder, QhHero, QhOffer, QhPosts, QhProjects, QhReviews, QhRoofFan, QhServices, QhStart, QhStory } from '@/components/home/QrsSections';
import { heroOutcome } from '@/data/heroOutcomes';
import { closingCta } from '@/components/templates/shared';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, RESIDENTIAL, RESIDENTIAL_TYPES } from '@/data/catalog';
import { RESIDENTIAL_PAGE as page } from '@/data/pages/residential';
import { projectsShownOn } from '@/data/projectPages';
import { articlesFor } from '@/lib/articles';
import { noPlace } from '@/lib/headings';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

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

// The page's roof types as the hover list (each links to its hub; the photo swaps beside the list)
const TYPES = RESIDENTIAL_TYPES.map((t) => ({ title: t.label, text: t.blurb, href: t.href, image: t.cardImage || t.image, caption: t.label }));

const SERVICE_LINKS = [
  { label: 'Roof repair', href: '/roof-repair/' },
  { label: 'Roof replacement', href: '/roof-replacement/' },
  { label: 'Roof inspection', href: '/roof-inspection/' },
  { label: 'Maintenance plans', href: '/roof-maintenance-plans/' },
];

// Residential hub (owner, November 6 2026): the page's own content (data/pages/residential.js: hero, overview, roof types, service finder,
// FAQs) in the new home page's theme (components/home/QrsSections.jsx + QrsHome.css, scoped main.qh): dark blue hero with the breadcrumb
// trail and the shingle, tile and flat roofs as fanned photo cards (not the home page's roof layers), the proof strip and review logos, the overview beside a photo collage, the roof types as the hover list, the service finder as
// cards, credentials and numbers, the free roof evaluation offer, projects, reviews matched to the page, related articles, the FAQ beside the request form and the closing call to action.
export default async function ResidentialRoofingPage() {
  return (
    <main id="top" className="qh">
      <JsonLd data={schema} />
      <QhHero crumbs={CRUMBS} title={noPlace(page.hero.heading)} outcome={heroOutcome(RESIDENTIAL.href)} text={page.hero.intro} checks={page.hero.highlights} visual={<QhRoofFan items={TYPES} />} badges />
      <ProofBar strip />
      <TrustLogos />
      <QhStory
        id="overview"
        heading={page.overview.heading}
        paragraphs={page.overview.paragraphs}
        images={[
          { src: '/images/home-services-residential-shingle-drone-view.webp', alt: 'Drone view of a home with a new light gray shingle roof' },
          { src: '/images/tile-roof-replacement.webp', alt: 'A tile roof on a home' },
          { src: '/images/flat-roof-replacement-completed-white-membrane.webp', alt: 'A finished white flat roof' },
        ]}
      />
      <QhServices id="roof-types" heading={page.cards.heading} lede={page.cards.intro} cats={SERVICE_LINKS} items={TYPES} />
      <QhFinder heading={page.finder.heading} intro={page.finder.intro} rows={page.finder.rows} />
      <QhAccount />
      <QhOffer />
      <QhProjects projects={projectsShownOn(RESIDENTIAL.href).projects} heading="Recent roofing projects" />
      <QhReviews path={RESIDENTIAL.href} heading="What homeowners say after the job" />
      <QhPosts posts={await articlesFor(RESIDENTIAL.href)} heading="Related roofing articles" />
      <QhStart faqs={page.faqs} heading="Residential roofing questions" />
      <FinalCta {...closingCta(page.keyword)} />
    </main>
  );
}
