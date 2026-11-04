import Faq from '@/components/sections/Faq';
import LatestArticles from '@/components/sections/LatestArticles';
import FinalCta from '@/components/sections/FinalCta';
import PartnerLogos from '@/components/sections/PartnerLogos';
import PromoSection from '@/components/sections/PromoSection';
import ReviewMarquee from '@/components/sections/ReviewMarquee';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import StudioHero from '@/components/studio/StudioHero';
import PromoCard from '@/components/widgets/PromoCard';
import ProofBar from '@/components/sections/ProofBar';
import TrustLogos from '@/components/sections/TrustLogos';
import { SEASON_PROMO as promo } from '@/data/promo';
import StudioIntro from '@/components/studio/StudioIntro';
import StudioHowWeWork from '@/components/studio/StudioHowWeWork';
import StudioProjects from '@/components/studio/StudioProjects';
import StudioServices from '@/components/studio/StudioServices';
import JsonLd from '@/components/ui/JsonLd';
import { SERVICE_CATEGORIES } from '@/data/serviceCategories';
import { HOME_PRODUCTS, HOME_HERO_VIDEO as HERO_VIDEO, HOME_HERO_POSTER as HERO_POSTER } from '@/data/homeProducts';
import { GOOGLE_REVIEWS, HERO_ANNOTATIONS, HOME_DESCRIPTION, HOME_H1, HOME_TITLE } from '@/data/site';
import { HOME_LANGUAGES } from '@/lib/lang';
import { LATEST_PROJECTS } from '@/data/projectPages';
import { ROOF_FINANCING } from '@/data/services/programs';
import { latestArticles } from '@/lib/articles';
import { getHomeFaqs } from '@/lib/contentStore';
import { openGraphBase, twitterBase } from '@/lib/seo';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/', languages: HOME_LANGUAGES }, // the Spanish home page is /es/ (app/es/page.js)
  openGraph: { ...openGraphBase, url: '/', title: HOME_TITLE, description: HOME_DESCRIPTION },
  twitter: { ...twitterBase, title: HOME_TITLE, description: HOME_DESCRIPTION },
};

// The home page's "Roofing Services" section: just the two top-level categories from the nav.
// The hero photo slider: the newest projects' cover photos, newest first (LATEST_PROJECTS in data/projectPages.js)
const HERO_SLIDES = LATEST_PROJECTS.map((project) => ({ src: project.image, alt: project.imageAlt, title: project.label, place: project.place.replace(/,?\s*CA\b/, ''), href: project.path }));
// The home hero's facts under the button: the offer's first and last points, plus the warranty (no license number here: owner's choice)


// Home page: sections in order, top to bottom, with what a customer wants first near the top: the hero and proof strip, what we do
// (residential and commercial), what other customers say, the roofing systems, the current El Niño offer, the service area check,
// why QRS, financing partners, articles, careers (for job seekers, so low), the FAQ, then the request card and closing call to action.
// Reorder or remove a line to change the page.
// Home page, studio style (components/studio/*, scoped by the `studio` class): a full-height photo hero, a quiet intro, the services as photo cards and a
// hover list, large featured projects, three steps, then the sections shared with other pages (reviews, the El Niño offer, the service area map,
// partners, articles, careers, FAQ, request card and closing call to action). The page's H1 is the hero's small
// keyword line. Reorder or remove a line to change the page.
// The home hero's background video (owner, October 26 2026: the one before the truck reel): an edit of the owner's drone footage (five QRS jobs:
// a tear-off, roofers laying shingles, two finished roofs and an orbit over a new roof), 21 seconds, looping without a jump, upscaled to 1280x720.
// WebM first, H.264 MP4 for Safari and older browsers; its first frame (HERO_POSTER) is the first paint and the fallback (PromoCard `video` and
// `photo`, HeroVideo.jsx). The truck reel (home-hero-brand.*) and the final clip (home-hero-background-final.*) stay in public/videos.
// The words over the truck video (owner, October 14 2026: no El Niño wording or effects in the home hero). The keyword line above the headline is
// the page's H1 (HOME_H1); the button jumps to the estimate form at the bottom of the page.
const HOME_HERO = {
  heading: 'Roofs built right, from the __deck__ up.',
  text: 'A family-owned roofing contractor: roofer-led inspections, a written scope and price before any work, and careful roofers on every tile, shingle and flat roof across Los Angeles and Orange County.', // carries the keyword ("roofing contractor") in the first 100 words
  cta: 'Book a Free Roof Evaluation',
  points: HERO_ANNOTATIONS.home.slice(0, 3),
};

export default async function HomePage() {
  const faqs = await getHomeFaqs(); // from the dashboard (lib/contentStore.js), else data/faqs.js
  return (
    <>
      <JsonLd data={pageJsonLd({ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION, faqs })} />
      <main id="top" className="studio">
        {/* While SEASON_PROMO.active the hero is this full-screen card (the keyword line above the headline is the H1) over the truck video, with the
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
        {/* Google, BBB and Yelp logos linking to our profiles (owner, November 2 2026) */}
        <TrustLogos />
        <StudioIntro />
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
