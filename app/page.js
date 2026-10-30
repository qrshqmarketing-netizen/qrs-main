import FinalCta from '@/components/sections/FinalCta';
import PartnerLogos from '@/components/sections/PartnerLogos';
import ProofBar from '@/components/sections/ProofBar';
import RoofCheck from '@/components/sections/RoofCheck';
import { HomeAreas, HomeCommercial, HomeCores, HomeFaq, HomeGuides, HomeHero, HomeOffers, HomeProjects, HomeRepair, HomeReplacement, HomeResidential, HomeReviews, HomeStatement } from '@/components/home/HomeSections';
import HomeMotion from '@/components/home/HomeMotion';
import JsonLd from '@/components/ui/JsonLd';
import { HOME_DESCRIPTION, HOME_H1, HOME_TITLE } from '@/data/site';
import { ROOF_FINANCING } from '@/data/services/programs';
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

// Home page, the gradient story (owner, October 29 2026; adapted from the owner's reference homepage: one continuous vertical gradient in the
// QRS colors, short confident headings, and sections that follow the main navigation). Order: the hero (the H1 is its small keyword line),
// the proof strip, four principles, a statement, Residential (roof types as tabs), Commercial, Roof Repair, Replacement (with the financing
// logos), Service Areas (one card per county), Projects, reviews, the free evaluation and the two offers after it, guides, FAQ, the request
// form and the closing call to action. The sections are in components/home/HomeSections.jsx, styles in HomeGradient.css. The earlier studio
// sections (StudioIntro, StudioServices, StudioHowWeWork, StudioProjects) are still in the code, unused here.
// The home hero's background video (owner, October 26 2026: the one before the truck reel): an edit of the owner's drone footage (five QRS jobs:
// a tear-off, roofers laying shingles, two finished roofs and an orbit over a new roof), 21 seconds, looping without a jump, upscaled to 1280x720.
// WebM first, H.264 MP4 for Safari and older browsers; its first frame (HERO_POSTER) is the first paint and the fallback (PromoCard `video` and
// `photo`, HeroVideo.jsx). The truck reel (home-hero-brand.*) and the final clip (home-hero-background-final.*) stay in public/videos.
const HERO_VIDEO = [
  { src: '/videos/home-hero-drone.webm', type: 'video/webm' },
  { src: '/videos/home-hero-drone-h264.mp4', type: 'video/mp4' },
];
const HERO_POSTER = '/images/home-hero-drone-poster.webp';
// The words over the truck video (owner, October 14 2026: no El Niño wording or effects in the home hero). The keyword line above the headline is
// the page's H1 (HOME_H1); the button jumps to the estimate form at the bottom of the page.
const HOME_HERO = {
  heading: 'Roofs built right, from the __deck__ up.',
  text: 'A family-owned roofing contractor: roofer-led inspections, a written scope and price before any work, and careful roofers on every tile, shingle and flat roof across Los Angeles and Orange County.', // carries the keyword ("roofing contractor") in the first 100 words
  cta: 'Book a Free Roof Evaluation',
};

export default async function HomePage() {
  const faqs = await getHomeFaqs(); // from the dashboard (lib/contentStore.js), else data/faqs.js
  return (
    <>
      <JsonLd data={pageJsonLd({ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION, faqs })} />
      <main id="top" className="hg">
        <HomeMotion />
        <HomeHero h1={HOME_H1} heading={HOME_HERO.heading} text={HOME_HERO.text} cta={HOME_HERO.cta} video={HERO_VIDEO} poster={HERO_POSTER} />
        <ProofBar strip />
        <HomeCores />
        <HomeStatement />
        <HomeResidential />
        <HomeCommercial />
        <HomeRepair />
        <HomeReplacement>
          <PartnerLogos {...ROOF_FINANCING.partners} />
        </HomeReplacement>
        <HomeAreas />
        <HomeProjects />
        <HomeReviews />
        <HomeOffers />
        <HomeGuides />
        <HomeFaq faqs={faqs} />
        <div className="hg-form-wrap">
          <RoofCheck />
        </div>
        <FinalCta />
      </main>
    </>
  );
}
