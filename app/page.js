import Faq from '@/components/sections/Faq';
import LatestArticles from '@/components/sections/LatestArticles';
import FinalCta from '@/components/sections/FinalCta';
import PartnerLogos from '@/components/sections/PartnerLogos';
import PromoSection from '@/components/sections/PromoSection';
import ReviewMarquee from '@/components/sections/ReviewMarquee';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import { QhHero } from '@/components/home/QrsSections';
import { HERO_BACKGROUND } from '@/components/home/QrsHome';
import '@/components/home/QrsHome.css';
import ProofBar from '@/components/sections/ProofBar';
import TrustLogos from '@/components/sections/TrustLogos';
import { SEASON_PROMO as promo } from '@/data/promo';
import StudioIntro from '@/components/studio/StudioIntro';
import StudioHowWeWork from '@/components/studio/StudioHowWeWork';
import StudioProjects from '@/components/studio/StudioProjects';
import StudioServices from '@/components/studio/StudioServices';
import StudioLinks from '@/components/studio/StudioLinks';
import JsonLd from '@/components/ui/JsonLd';
import { SERVICE_CATEGORIES } from '@/data/serviceCategories';
import { HOME_PRODUCTS } from '@/data/homeProducts';
import { BUSINESS, GOOGLE_REVIEWS, HERO_ANNOTATIONS, HOME_DESCRIPTION, HOME_TITLE } from '@/data/site';
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

// The hero's words as they were on the new home page (November 6 2026)
const HERO_TEXT =
  'Roofs built right, from the deck up. As a family-owned roofing contractor, we have a roofer look at your roof first, you get photos and a written price before any work, and installs carry our 10-year workmanship warranty (call for details).';

// The pages the two link sections list (StudioLinks; names and lines come from each page's own card)
const COMMERCIAL_LINKS = [
  '/commercial-roofing/repair/',
  '/commercial-roofing/replacement/',
  '/commercial-roofing/maintenance/',
  '/commercial-roofing/tpo-roofing/',
  '/commercial-roofing/industrial/',
  '/commercial-roofing/warehouses/',
  '/commercial-roofing/property-managers/',
  '/commercial-roofing/office-buildings/',
  '/commercial-roofing/retail/',
];
const REPAIR_REPLACEMENT_LINKS = [
  '/residential-roofing/shingle-roofing/repair/',
  '/residential-roofing/tile-roofing/repair/',
  '/residential-roofing/flat-roofing/repair/',
  '/roof-repair/emergency/',
  '/residential-roofing/shingle-roofing/replacement/',
  '/residential-roofing/tile-roofing/replacement/',
  '/residential-roofing/flat-roofing/replacement/',
  '/residential-roofing/flat-roofing/torch-down/',
  '/residential-roofing/cool-roofing/',
];

export default async function HomePage() {
  const faqs = await getHomeFaqs(); // from the dashboard (lib/contentStore.js), else data/faqs.js
  return (
    <>
      <JsonLd data={pageJsonLd({ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION, faqs })} />
      <main id="top" className="studio">
        {/* The new-theme hero with the background video (owner, November 10 2026: the studio home's content and meta came back, the hero stayed).
            Its styles are scoped to main.qh or a .qh-scope wrapper (QrsHome.css), so only this hero takes the new theme. */}
        <div className="qh-scope">
          <QhHero
            where={`Family-owned · Licensed since ${new Date(BUSINESS.licenseSince).getUTCFullYear()}`}
            title="Trusted Los Angeles Residential & Commercial Roofing Contractor"
            text={HERO_TEXT}
            checks={HOME_HERO.points}
            visual={false}
            background={HERO_BACKGROUND}
          />
        </div>
        <ProofBar strip />
        {/* Google, BBB and Yelp logos linking to our profiles (owner, November 2 2026) */}
        <TrustLogos />
        <StudioIntro />
        <StudioServices categories={SERVICE_CATEGORIES} items={HOME_PRODUCTS} heading="Roof repair, replacement and inspection for every __home__ and building" />
        {/* Commercial and industrial pages, then the repair and replacement pages, as plain links (owner, November 10 2026, from the home page
            search review: the home page named commercial roofing twice, industrial never, and linked to none of these pages) */}
        <StudioLinks
          id="commercial"
          tinted
          label="Commercial & industrial"
          heading="Commercial roofing and industrial roofing that keeps your __building__ open"
          text="As commercial roofing contractors in Los Angeles and Orange County, our commercial roofers start with a roof survey led by a roofer, photos and a written scope and price your owners can approve. Then we plan the work around your tenants and operations, from [commercial roof repair](/commercial-roofing/repair/) to [industrial roofing](/commercial-roofing/industrial/)."
          more={{ href: '/commercial-roofing/', label: 'All commercial roofing' }}
          links={COMMERCIAL_LINKS}
        />
        <StudioLinks
          id="repair-replacement"
          label="Repair & replacement"
          heading="Roof repair and roof replacement for shingle, tile and __flat__ roofs"
          text="Need roof repair in Los Angeles or Orange County? Our licensed roofers look at the roof first and tell you whether it needs a repair or a replacement. See [roof repair](/roof-repair/) and [roof replacement](/roof-replacement/), or go straight to your roof type."
          links={REPAIR_REPLACEMENT_LINKS}
        />
        {/* The home page's story (owner, October 15 2026, after maben.com.au): the belief statement (StudioIntro), the services, then "How we work"
            (four principles, pinned while it scrolls; it replaces "Why QRS", the process steps and the credentials strip), the reviews and the projects.
            The shingle colors moved to the shingle roofing page; "Giving back" (on the About page) and the careers band were taken off. */}
        <StudioHowWeWork />
        <ReviewMarquee heading="Roofing reviews from the people we work for" text={`${GOOGLE_REVIEWS.count} reviews from the people we roof for, on Google.`} />
        <StudioProjects heading="Roofing projects we have finished in __Los Angeles__ & Orange County" projects={LATEST_PROJECTS.slice(0, 3)} more={LATEST_PROJECTS.slice(3)} />
        {!promo.active && <PromoSection />}
        <ServiceArea allAreasLink />
        <PartnerLogos {...ROOF_FINANCING.partners} />
        <LatestArticles posts={await latestArticles(3)} />
        <Faq cta={false} faqs={faqs} heading="Roofing contractor __questions__, answered" />
        <RoofCheck />
        <FinalCta />
      </main>
    </>
  );
}
