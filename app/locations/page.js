import CityCards from '@/components/sections/CityCards';
import DifferenceBand from '@/components/sections/DifferenceBand';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import PageHero from '@/components/sections/PageHero';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import { HOME, LOCATIONS_LINK } from '@/data/catalog';
import { LOCATION_PAGES } from '@/data/locationPages';
import { LOCATIONS_PAGE as page } from '@/data/pages/locations';
import { pageMetadata } from '@/lib/pages';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: LOCATIONS_LINK.href });

// Each city card shows the one-line intro from that city's page
const BLURBS = Object.fromEntries(Object.entries(LOCATION_PAGES).map(([slug, p]) => [slug, p.hero.sub]));

// Locations page: the service-area map and every city page (content in data/pages/locations.js)
export default function LocationsPage() {
  return (
    <main id="top">
      <PageHero
        crumbs={[HOME, LOCATIONS_LINK]}
        eyebrow="Los Angeles & Orange County"
        title={page.hero.heading}
        intro={page.hero.intro}
        image="/images/cta-section-background-new.webp"
        imageAlt="QRS roofing truck parked on a residential street"
        imagePosition="40% center"
      />
      <ServiceArea heading="Find Your Nearest QRS Service Area" sub="Enter your ZIP code or pick a city on the map to see its phone number, estimate link and city page." />
      <CityCards blurbs={BLURBS} />
      <DifferenceBand />
      <Faq heading="Service Area FAQs" sub="Straight answers about where we work." faqs={page.faqs} cta={false} />
      <RoofCheck tone="white" />
      <FinalCta />
    </main>
  );
}
