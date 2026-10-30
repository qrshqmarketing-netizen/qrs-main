import LocExplorer from '@/components/loc/LocExplorer';
import { cityCards, countyCards, LocHubHero, placeCards } from '@/components/loc/LocHub';
import { LocFaq, LocReviews } from '@/components/loc/LocSections';
import FinalCta from '@/components/sections/FinalCta';
import Offices from '@/components/sections/Offices';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, LOCATIONS_LINK } from '@/data/catalog';
import { cityPath, LOCATIONS, REGIONS } from '@/data/locations';
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

// Service Areas page, the main location hub after remote.com/us-state-explorer (owner, October 29 2026): the short gradient band, the explorer
// (search, a county filter, the four county cards, every city page and the places with no page of their own), then the offices, the ZIP map,
// reviews and FAQs (content in data/pages/locations.js)
export default function LocationsPage() {
  return (
    <main id="top" className="loc">
      <JsonLd data={schema} />
      <LocHubHero crumbs={CRUMBS} path={LOCATIONS_LINK.href} title={page.hero.heading} outcome={heroOutcome('/service-areas/')} intro={page.hero.intro} />
      <LocExplorer
        label="Service area overview"
        heading="Local roofing guides, county by county"
        text="Roofing in Los Angeles County, Orange County and the Inland Empire: each county and city guide covers the neighborhoods we work in, the roofs we see there, the nearest QRS office and our projects nearby."
        counties={countyCards()}
        cities={cityCards()}
        places={placeCards(null, { link: true })}
        placesHeading="More places we serve"
        placesText="These places have no page of their own yet. They are inside our service area, and each links to its county guide."
        filters={[{ value: 'all', label: 'All counties' }, ...REGIONS.map((r) => ({ value: r.slug, label: r.name }))]}
      />
      <div className="lc-keep">
        <Offices sub="Our offices serve homes and businesses across Los Angeles County, Orange County and the Inland Empire. Each office has its own number, or call our main line." />
        <ServiceArea heading="Check Your ZIP Code" sub="Enter your ZIP code to confirm we cover your address, or pick your city from the list." />
      </div>
      <LocReviews path={LOCATIONS_LINK.href} place="your area" />
      <LocFaq heading="Service Area FAQs" sub="Straight answers about where we work." faqs={page.faqs} />
      <div className="lc-keep">
        <RoofCheck tone="white" />
      </div>
      <FinalCta
        heading="Local Roofers Across Southern California"
        text="Wherever you are in our service area, a local roofer looks at your roof and gives you a clear next step with a written scope and price."
      />
    </main>
  );
}
