import CityCards from '@/components/sections/CityCards';
import DifferenceBand from '@/components/sections/DifferenceBand';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import ProofBar from '@/components/sections/ProofBar';
import ReviewStrip from '@/components/sections/ReviewStrip';
import Offices from '@/components/sections/Offices';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, LOCATIONS_LINK } from '@/data/catalog';
import { LOCATION_PAGES } from '@/data/locationPages';
import { cityPath, LOCATIONS } from '@/data/locations';
import { LOCATIONS_PAGE as page } from '@/data/pages/locations';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: LOCATIONS_LINK.href });

const CRUMBS = [HOME, LOCATIONS_LINK];
const HERO_IMAGE = '/images/bottom-cta-background.webp';

const schema = pageJsonLd({
  path: LOCATIONS_LINK.href,
  title: page.metaTitle,
  description: page.metaDescription,
  type: 'CollectionPage',
  crumbs: CRUMBS,
  faqs: page.faqs,
  parts: LOCATIONS.map((l) => ({ label: `${l.city} Roofing`, href: cityPath(l.slug) })),
  image: HERO_IMAGE,
});

// Each city card shows the one-line intro from that city's page
const BLURBS = Object.fromEntries(Object.entries(LOCATION_PAGES).map(([slug, p]) => [slug, p.hero.sub]));

// Service Areas page: offices, the map, every region and city page (content in data/pages/locations.js)
export default function LocationsPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        crumbs={CRUMBS}
        eyebrow="Los Angeles & Orange County"
        title={page.hero.heading}
        intro={page.hero.intro}
        image={HERO_IMAGE}
        imageAlt="Row of homes with pitched roofs along a residential street"
        imagePosition="40% center"
      />
      <ReviewStrip />
      <Offices sub="Our Los Angeles and Valley offices serve homes and businesses across Los Angeles and Orange County. One number reaches both." />
      <ProofBar />
      <ServiceArea heading="Find Your Nearest QRS Service Area" sub="Enter your ZIP code or pick a city on the map to see its phone number, estimate link and city page." />
      <CityCards blurbs={BLURBS} linkRegions />
      <DifferenceBand />
      <Faq heading="Service Area FAQs" sub="Straight answers about where we work." faqs={page.faqs} cta={false} />
      <RoofCheck tone="white" />
      <FinalCta
        heading="Local Roofers Across LA & Orange County"
        text="Wherever you are in our service area, a local roofer looks at your roof and gives you a clear next step with a written scope and price."
      />
    </main>
  );
}
