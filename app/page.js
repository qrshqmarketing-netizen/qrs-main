import Faq from '@/components/sections/Faq';
import LatestArticles from '@/components/sections/LatestArticles';
import FinalCta from '@/components/sections/FinalCta';
import PartnerLogos from '@/components/sections/PartnerLogos';
import ProofBar from '@/components/sections/ProofBar';
import PromoSection from '@/components/sections/PromoSection';
import ReviewMarquee from '@/components/sections/ReviewMarquee';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import StudioHero from '@/components/studio/StudioHero';
import PromoCard from '@/components/widgets/PromoCard';
import { SEASON_PROMO as promo } from '@/data/promo';
import StudioIntro from '@/components/studio/StudioIntro';
import StudioFilm from '@/components/studio/StudioFilm';
import Splash from '@/components/widgets/Splash';
import { BRAND_FILM } from '@/data/brandFilm';
import StudioHowWeWork from '@/components/studio/StudioHowWeWork';
import StudioProjects from '@/components/studio/StudioProjects';
import StudioServices from '@/components/studio/StudioServices';
import JsonLd from '@/components/ui/JsonLd';
import { SERVICE_CATEGORIES } from '@/data/serviceCategories';
import { GOOGLE_REVIEWS, HERO_ANNOTATIONS, HOME_DESCRIPTION, HOME_H1, HOME_TITLE } from '@/data/site';
import { LATEST_PROJECTS } from '@/data/projectPages';
import { ROOF_FINANCING } from '@/data/services/programs';
import { latestArticles } from '@/lib/articles';
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
const HERO_SLIDES = LATEST_PROJECTS.map((project) => ({ src: project.image, alt: project.imageAlt, title: project.label, place: project.place.replace(/,?\s*CA\b/, ''), href: project.path }));
// The home hero's facts under the button: the offer's first and last points, plus the warranty (no license number here: owner's choice)

const HOME_PRODUCTS = [
  { title: '*TotalShield* Shingle Systems', text: 'Complete shingle replacements and new installations, built from the deck up.', href: '/residential-roofing/shingle-roofing/replacement/', scene: 'scene-shingle', image: '/images/shingle-roof-completed-drone-view.webp' },
  { title: '*FlatGuard* Flat Roofing', text: 'Flat roof systems planned around drainage, seams and lasting protection.', href: '/residential-roofing/flat-roofing/replacement/', scene: 'scene-flat', image: '/images/flat-roof-torch-down-drone-view-services.webp' },
  { title: '*LeakRescue* Roof Repairs', text: 'Leaks traced to the source and repaired with clear photos and a written scope.', href: '/roof-repair/', scene: 'scene-repair', image: '/images/shingle-roof-repair-ridge-finish.webp' },
  { title: '*RoofScan 360* Inspections', text: 'A roofer-led inspection with photos, plain-English findings and a clear next step.', href: '/roof-inspection/', scene: 'scene-inspect', image: '/images/roofscan-360-roofer-chimney-flashing.webp' },
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
// The home hero's background video (October 14 2026): an edit of the owner's drone footage (five QRS jobs: a tear-off, roofers laying shingles,
// two finished roofs and an orbit over a new roof), 21 seconds, looping without a jump, cleaned up and upscaled from the 640px source to 1280x720.
// WebM first, H.264 MP4 for Safari and older browsers; its first frame (HERO_POSTER) is the first paint and the fallback (PromoCard `video` and
// `photo`, HeroVideo.jsx). The earlier storm video is still in public/videos/home-hero-el-nino.* if it is wanted back.
const HERO_VIDEO = [
  { src: '/videos/home-hero-drone.webm', type: 'video/webm' },
  { src: '/videos/home-hero-drone-h264.mp4', type: 'video/mp4' },
];
const HERO_POSTER = '/images/home-hero-drone-poster.webp';
// The words over the drone video (owner, October 14 2026: no El Niño wording or effects in the home hero). The keyword line above the headline is
// the page's H1 (HOME_H1); the button jumps to the estimate form at the bottom of the page.
const HOME_HERO = {
  heading: 'Roofs built right, from the __deck__ up.',
  text: 'Roofer-led inspections, a written scope and price before any work, and careful roofers on every tile, shingle and flat roof across Los Angeles and Orange County.',
  cta: 'Book a Free Roof Evaluation',
  points: HERO_ANNOTATIONS.home.slice(0, 3),
};

export default async function HomePage() {
  const faqs = await getHomeFaqs(); // from the dashboard (lib/contentStore.js), else data/faqs.js
  return (
    <>
      <JsonLd data={pageJsonLd({ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION, faqs, video: BRAND_FILM })} />
      {/* The opening splash on a first visit (shown only when the <head> script allows it: lib/splash.js) */}
      <Splash />
      <main id="top" className="studio">
        {/* While SEASON_PROMO.active the hero is this full-screen card (the keyword line above the headline is the H1) over the drone video, with the
            home page's own words (HOME_HERO above) and none of the El Niño effects (rain, lightning, red dot, promo tracking); otherwise the newest
            projects' photo slider is the hero again. The button jumps to the estimate form at the bottom of this page (RoofCheck, #estimate). */}
        {promo.active ? (
          <PromoCard
            as="section"
            variant="landing"
            track={false}
            className="promo-home promo-calm"
            eyebrow={HOME_H1}
            eyebrowTag="h1"
            heading={HOME_HERO.heading}
            text={HOME_HERO.text}
            cta={{ label: HOME_HERO.cta, href: '#estimate' }}
            points={HOME_HERO.points}
            rain={false}
            video={HERO_VIDEO}
            photo={HERO_POSTER}
          />
        ) : (
          <StudioHero slides={HERO_SLIDES} />
        )}
        <ProofBar strip />
        <StudioIntro />
        {/* The brand film, "QRS in a minute" (owner, October 16 2026; recreated from zaro.ai's launch film, scripts/brand-film/) */}
        <StudioFilm />
        <StudioServices categories={SERVICE_CATEGORIES} items={HOME_PRODUCTS} />
        {/* The home page's story (owner, October 15 2026, after maben.com.au): the belief statement (StudioIntro), the services, then "How we work"
            (four principles, pinned while it scrolls; it replaces "Why QRS", the process steps and the credentials strip), the reviews and the projects.
            The shingle colors moved to the shingle roofing page; "Giving back" (on the About page) and the careers band were taken off. */}
        <StudioHowWeWork />
        <ReviewMarquee heading="What people say after the job" text={`${GOOGLE_REVIEWS.count} reviews from the people we roof for, on Google.`} />
        <StudioProjects projects={LATEST_PROJECTS.slice(0, 3)} more={LATEST_PROJECTS.slice(3)} />
        {!promo.active && <PromoSection />}
        <ServiceArea allAreasLink />
        <PartnerLogos {...ROOF_FINANCING.partners} />
        <LatestArticles posts={await latestArticles(3)} />
        <Faq cta={false} faqs={faqs} />
        <RoofCheck />
        <FinalCta />
      </main>
    </>
  );
}
