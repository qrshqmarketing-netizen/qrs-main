import Faq from '@/components/sections/Faq';
import LatestArticles from '@/components/sections/LatestArticles';
import FeatureBand from '@/components/sections/FeatureBand';
import FinalCta from '@/components/sections/FinalCta';
import PartnerLogos from '@/components/sections/PartnerLogos';
import ProofBar from '@/components/sections/ProofBar';
import PromoSection from '@/components/sections/PromoSection';
import ReviewStrip from '@/components/sections/ReviewStrip';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import StudioHero from '@/components/studio/StudioHero';
import StudioIntro from '@/components/studio/StudioIntro';
import StudioProcess from '@/components/studio/StudioProcess';
import StudioProjects from '@/components/studio/StudioProjects';
import StudioServices from '@/components/studio/StudioServices';
import StudioVisualizer from '@/components/studio/StudioVisualizer';
import { SHOW_ON_HOME as SHOW_VISUALIZER } from '@/data/roofVisualizer';
import JsonLd from '@/components/ui/JsonLd';
import { SERVICE_CATEGORIES } from '@/data/serviceCategories';
import { CAREERS_PAGE, CAREERS_TEASER } from '@/data/pages/careers';
import { HOME_DESCRIPTION, HOME_H1, HOME_TITLE } from '@/data/site';
import { LATEST_PROJECTS } from '@/data/projectPages';
import { ROOF_FINANCING } from '@/data/services/programs';
import { homeArticles } from '@/lib/articles';
import { getHomeFaqs } from '@/lib/contentStore';
import { openGraphBase, twitterBase } from '@/lib/seo';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: { ...openGraphBase, url: '/', title: HOME_TITLE, description: HOME_DESCRIPTION },
  twitter: { ...twitterBase, title: HOME_TITLE, description: HOME_DESCRIPTION },
};

// The home page's "Roofing Services" section: just the two top-level categories from the nav.
// The hero photo slider: the newest projects' cover photos, newest first (LATEST_PROJECTS in data/projectPages.js)
const HERO_SLIDES = LATEST_PROJECTS.map((project) => ({ src: project.image, alt: project.imageAlt, title: project.label, place: project.place.replace(/,?\s*CA\b/, '') }));

const HOME_PRODUCTS = [
  { title: '*TotalShield* Shingle Systems', text: 'Complete shingle replacements and new installations, built from the deck up.', href: '/residential-roofing/shingle-roofing/replacement/', scene: 'scene-shingle', image: '/images/shingle-roof-completed-drone-view.webp' },
  { title: '*FlatGuard* Flat Roofing', text: 'Flat roof systems planned around drainage, seams and lasting protection.', href: '/residential-roofing/flat-roofing/replacement/', scene: 'scene-flat', image: '/images/flat-roof-torch-down-drone-view-services.webp' },
  { title: '*LeakRescue* Roof Repairs', text: 'Leaks traced to the source and repaired with clear photos and a written scope.', href: '/roof-repair/', scene: 'scene-repair', image: '/images/shingle-roof-repair-ridge-finish.webp' },
  { title: '*RoofScan 360* Inspections', text: 'A roofer-led inspection with photos, plain-English findings and a clear next step.', href: '/roof-inspection/', scene: 'scene-inspect', image: '/images/contractors-hero-roofer-tablet.webp' },
  { title: '*SecondLife* Tile Reset', text: 'Keep sound roof tiles while replacing the worn underlayment below.', href: '/residential-roofing/tile-roofing/lift-and-relay/', scene: 'scene-tile', image: '/images/tile-lift-off-and-reset-drone-view.webp' },
  { title: '*RoofCare Plan*', text: 'Scheduled roof care with seasonal visits and a photo report each time.', href: '/roof-maintenance-plans/', scene: 'scene-inspect', image: '/images/shingle-roof-inspection-overhead.webp' },
  { title: '*ReserveReady* HOA Roofing', text: 'Roof inspections, clear scopes and planning support for community boards.', href: '/residential-roofing/hoa-multi-family/', scene: 'scene-hoa', image: '/images/shingle-roof-care-multi-family.webp' },
];

// Home page: sections in order, top to bottom, with what a customer wants first near the top: the hero and proof strip, what we do
// (residential and commercial), what other customers say, the roofing systems, the current El Niño offer, the service area check,
// why QRS, financing partners, articles, careers (for job seekers, so low), the FAQ, then the request card and closing call to action.
// Reorder or remove a line to change the page.
// Home page, studio style (components/studio/*, scoped by the `studio` class): a full-height photo hero, a quiet intro, the services as photo cards and a
// hover list, large featured projects, three steps, then the sections shared with other pages (reviews, the El Niño offer, the service area map,
// partners, articles, careers, FAQ, request card and closing call to action). The page's H1 is the hero's small
// keyword line. Reorder or remove a line to change the page.
export default async function HomePage() {
  const faqs = await getHomeFaqs(); // from the dashboard (lib/contentStore.js), else data/faqs.js
  return (
    <>
      <JsonLd data={pageJsonLd({ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION, faqs })} />
      <main id="top" className="studio">
        <StudioHero slides={HERO_SLIDES} />
        <ProofBar strip />
        <StudioIntro />
        <StudioServices categories={SERVICE_CATEGORIES} items={HOME_PRODUCTS} />
        <StudioProjects projects={LATEST_PROJECTS.slice(0, 3)} />
        <StudioProcess />
        {SHOW_VISUALIZER && <StudioVisualizer />}
        <ReviewStrip />
        <PromoSection />
        <ServiceArea allAreasLink />
        <PartnerLogos {...ROOF_FINANCING.partners} />
        <LatestArticles posts={await homeArticles(3)} />
        <FeatureBand
          id="careers"
          tone="light"
          {...CAREERS_TEASER}
          points={CAREERS_PAGE.roles.items.map((role) => ({ title: role.title, text: role.text, href: '/careers/#roles' }))}
        />
        <Faq cta={false} faqs={faqs} />
        <RoofCheck />
        <FinalCta />
      </main>
    </>
  );
}
