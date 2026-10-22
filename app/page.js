import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import PartnerLogos from '@/components/sections/PartnerLogos';
import ProofBar from '@/components/sections/ProofBar';
import PromoSection from '@/components/sections/PromoSection';
import ReviewMarquee from '@/components/sections/ReviewMarquee';
import RoofCheck from '@/components/sections/RoofCheck';
import StudioHero from '@/components/studio/StudioHero';
import PromoCard from '@/components/widgets/PromoCard';
import { SEASON_PROMO as promo } from '@/data/promo';
import StudioHowWeWork from '@/components/studio/StudioHowWeWork';
import HomeArticles from '@/components/home/HomeArticles';
import HomeServices from '@/components/home/HomeServices';
import HomeWork from '@/components/home/HomeWork';
import WordBand from '@/components/home/WordBand';
import AreaLinks from '@/components/home/AreaLinks';
import AreaSketch from '@/components/home/AreaSketch';
import CheckBand from '@/components/home/CheckBand';
import NearYou from '@/components/home/NearYou';
import QuickTiles from '@/components/home/QuickTiles';
import ZipSearch from '@/components/home/ZipSearch';
import '@/components/home/HomeClean.css';
import JsonLd from '@/components/ui/JsonLd';
import { BAND_WORDS, HOME_SERVICE_TABS } from '@/data/homeServices';
import { BUSINESS, GOOGLE_REVIEWS, HERO_ANNOTATIONS, HOME_DESCRIPTION, HOME_H1, HOME_TITLE } from '@/data/site';
import { AREA_LINKS, NEAR_ALL, NEAR_PLACES, OFFICE_CITIES, QUICK_TILES, checksFor, nearLine } from '@/data/nearYou';
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

// The hero photo slider: the newest projects' cover photos, newest first (LATEST_PROJECTS in data/projectPages.js)
const HERO_SLIDES = LATEST_PROJECTS.map((project) => ({ src: project.image, alt: project.imageAlt, title: project.label, place: project.place.replace(/,?\s*CA\b/, ''), href: project.path }));
// The home hero's facts under the button: the offer's first and last points, plus the warranty (no license number here: owner's choice)

// Home page (owner, October 21 2026, after digitalocean.com: few sections, each a centered heading and one line, clean cards, lots of air;
// components/home/*, styles HomeClean.css, scoped by `home-clean`): the hero and proof strip, who we are with three finished projects, the services
// as tabs, how we work, reviews, the service area map, financing partners, articles as a row, the FAQ, the request form and the closing call to
// action. The page's H1 is the hero's keyword line. Reorder or remove a line to change the page. The earlier sections (StudioIntro,
// StudioServices, StudioProjects, LatestArticles) are still in the code.
const HOME_WORK = {
  heading: 'At QRS, a roofer should look at your roof before anyone tries to __sell__ you one.',
  text: 'That’s how every job starts: a free roof evaluation, photos of what we find and a written scope and price before any work begins. Every [roof replacement](/roof-replacement/), [roof repair](/roof-repair/), [tile lift & relay](/residential-roofing/tile-roofing/lift-and-relay/) and [flat](/residential-roofing/flat-roofing/) or [shingle roof](/residential-roofing/shingle-roofing/) across [Southern California](/service-areas/) gets the same care.',
  all: { label: 'View all projects', href: '/projects/' },
};
const HOME_SERVICES = {
  heading: 'Roofing for every __home__ and building',
  text: 'Repairs, replacements and care for tile, shingle, flat and metal roofs, on homes, HOA communities and commercial buildings.',
};
// The home hero's background video (owner, October 21 2026): the drone reel from the old site (QRS jobs: an apartment building, a home, a finished
// shingle roof, a crew re-roofing, a flat roof tear-off), 17 seconds at 1600x900, no sound, from the owner's `from-old-site.mp4`. WebM first,
// H.264 MP4 for Safari and older browsers; its first frame (HERO_POSTER) is the first paint and the fallback (PromoCard `video` and `photo`,
// HeroVideo.jsx). The earlier drone edit (home-hero-drone.*) and the storm video (home-hero-el-nino.*) are still in public/videos.
const HERO_VIDEO = [
  { src: '/videos/home-hero-old-site.webm', type: 'video/webm' },
  { src: '/videos/home-hero-old-site-h264.mp4', type: 'video/mp4' },
];
const HERO_POSTER = '/images/home-hero-old-site-poster.webp';
// The words over the drone video (owner, October 14 2026: no El Niño wording or effects in the home hero). The keyword line above the headline is
// the page's H1 (HOME_H1); the button jumps to the estimate form at the bottom of the page.
const HOME_HERO = {
  heading: 'Roofs built right, from the __deck__ up.',
  text: 'A family-owned roofing contractor: roofer-led inspections, a written scope and price before any work, and careful roofers on every tile, shingle and flat roof across Los Angeles and Orange County.', // carries the keyword ("roofing contractor") in the first 100 words
  cta: 'Book a Free Roof Evaluation',
  points: HERO_ANNOTATIONS.home.slice(0, 3),
  // The small line in the top-left corner (layout after exemplarfromsweden.com, owner, October 19 2026: a year at the top left)
  note: `Licensed since ${BUSINESS.licenseSince.slice(0, 4)}`,
};

// Easier finding, after publicstorage.com (owner, October 21 2026): a ZIP search in the hero, four big tiles under it, "Roofers near you" cards
// over a drawn map (in place of the service area map on this page), a photo band with a checklist, and the areas and services as link
// columns above the footer. Components in components/home/ (QuickTiles, ZipSearch, NearYou, AreaSketch, CheckBand, AreaLinks), styles in
// HomeNav.css and ZipSearch.css. Every fact is one the site already states.
const QUICK = { heading: 'What do you need help with?', tiles: QUICK_TILES };
const NEAR_YOU = { heading: 'Roofers __near__ you', text: nearLine(), start: [...OFFICE_CITIES, 'irvine'], all: NEAR_ALL }; // before a search: the office cities, then Orange County

export default async function HomePage() {
  const faqs = await getHomeFaqs(); // from the dashboard (lib/contentStore.js), else data/faqs.js
  return (
    <>
      <JsonLd data={pageJsonLd({ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION, faqs })} />
      <main id="top" className="studio home-clean">
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
            note={HOME_HERO.note}
            search={<ZipSearch tone="dark" label="Enter your ZIP code" />}
            rain={false}
            video={HERO_VIDEO}
            photo={HERO_POSTER}
          />
        ) : (
          <StudioHero slides={HERO_SLIDES} />
        )}
        <ProofBar strip />
        <QuickTiles {...QUICK} />
        <HomeWork {...HOME_WORK} projects={LATEST_PROJECTS.slice(0, 3)} decor />
        {/* Decorations after getaethr.ai (October 21 2026): "+" bands with the services as a slow word strip, and a plain band before the reviews */}
        <WordBand words={BAND_WORDS} seed={3} />
        <HomeServices tabs={HOME_SERVICE_TABS} {...HOME_SERVICES} />
        <NearYou {...NEAR_YOU} places={NEAR_PLACES} sketch={<AreaSketch />} />
        <StudioHowWeWork />
        <CheckBand {...checksFor('/')} />
        <ReviewMarquee heading="What people say after the job" text={`${GOOGLE_REVIEWS.count} reviews from the people we roof for, on Google.`} />
        {!promo.active && <PromoSection />}
        <PartnerLogos {...ROOF_FINANCING.partners} />
        <HomeArticles posts={await latestArticles(6)} />
        <Faq cta={false} faqs={faqs} />
        <RoofCheck band={false} />
        <FinalCta />
        <AreaLinks {...AREA_LINKS} />
      </main>
    </>
  );
}
