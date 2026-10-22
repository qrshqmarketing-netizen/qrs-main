import AlsoServing from '@/components/sections/AlsoServing';
import CheckBand from '@/components/home/CheckBand';
import ReviewTrio from '@/components/home/ReviewTrio';
import '@/components/home/HomeClean.css';
import '@/components/home/CleanPages.css';
import { checksFor } from '@/data/nearYou';
import CityCards from '@/components/sections/CityCards';
import Faq from '@/components/sections/Faq';
import Hero from '@/components/sections/Hero';
import Offices from '@/components/sections/Offices';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, LOCATIONS_LINK } from '@/data/catalog';
import { LOCATION_PAGES } from '@/data/locationPages';
import { ALL_PLACES, cityPath, LOCATIONS } from '@/data/locations';
import { LOCATIONS_PAGE as page } from '@/data/pages/locations';
import { heroOutcome } from '@/data/heroOutcomes';
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
const BLURBS = Object.fromEntries(Object.entries(LOCATION_PAGES).map(([slug, p]) => [slug, p.blurb]));

// Service Areas page: offices, the map, every region and city page (content in data/pages/locations.js)
export default function LocationsPage() {
  return (
    <main id="top" className="clean-page">
      <JsonLd data={schema} />
      <Hero
        crumbs={CRUMBS}
        eyebrow="Los Angeles, Orange County & the Inland Empire"
        title={page.hero.heading}
        outcome={heroOutcome('/service-areas/')}
        stats
        intro={page.hero.intro}
        image={HERO_IMAGE}
        imageAlt="Row of homes with pitched roofs along a residential street"
        imagePosition="40% center"
      />
      <Offices sub="Our roofing service areas cover homes and businesses across Los Angeles County, Orange County and the Inland Empire, served from our offices. One phone number reaches every office." />
      <ServiceArea heading="Find Your Nearest QRS Service Area" sub="Enter your ZIP code to confirm we cover your address, or pick your city from the list." />
      <CityCards blurbs={BLURBS} linkRegions />
      {/* In the clean format with the publicstorage.com patterns like the other sub pages (owner, October 22 2026): three reviews, the checklist
          band, four FAQs and the request form (no second closing call to action; the city cards above already link every city page, so no
          area link columns here) */}
      <ReviewTrio path="/service-areas/" />
      <AlsoServing />
      <CheckBand {...checksFor('/service-areas/')} />
      <Faq heading="Service Area FAQs" sub="Straight answers about where we work." faqs={page.faqs} cta={false} limit={4} />
      <RoofCheck tone="white" />
    </main>
  );
}
