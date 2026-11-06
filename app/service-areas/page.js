import TrustLogos from '@/components/sections/TrustLogos';
import LocExplorer from '@/components/loc/LocExplorer';
import { cityCards, countyCards, placeCards } from '@/components/loc/LocHub';
import { QhAreaMap, QhHero, QhReviews, QhStart } from '@/components/home/QrsSections';
import FinalCta from '@/components/sections/FinalCta';
import Offices from '@/components/sections/Offices';
import ServiceArea from '@/components/sections/ServiceArea';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, LOCATIONS_LINK } from '@/data/catalog';
import { ALL_PLACES, cityPath, LOCATIONS, REGIONS, regionPath } from '@/data/locations';
import { SERVICE_AREA_OUTLINE } from '@/data/serviceAreaOutline';
import { OFFICES } from '@/data/site';
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

// Service Areas page (content in data/pages/locations.js). In the new home page's theme (owner, November 6 2026; components/home/QrsSections.jsx,
// QrsHome.css): dark blue hero with its own visual, the service area drawn from its Census outline with the offices and city pages as pins and
// the counties as links, the manufacturer logos, then the review logos, the explorer (search, a county filter, the county cards, every city page
// and the places with no page of their own; Loc.css, hence the "loc" class too), the offices, the ZIP map, a review, the FAQ beside the request
// form and the closing call to action.
const SOCAL_OFFICES = OFFICES.filter((o) => o.geo.latitude < 35);

export default function LocationsPage() {
  return (
    <main id="top" className="qh loc">
      <JsonLd data={schema} />
      <QhHero
        crumbs={CRUMBS}
        title={page.hero.heading}
        outcome={heroOutcome('/service-areas/')}
        text={page.hero.intro}
        badges
        visual={
          <QhAreaMap
            outline={SERVICE_AREA_OUTLINE}
            offices={SOCAL_OFFICES}
            cities={LOCATIONS.filter((l) => l.lat < 35)}
            note={`${LOCATIONS.length} city guides and ${ALL_PLACES.length} places we serve`}
            links={REGIONS.map((r) => ({ label: r.name, href: regionPath(r.slug) }))}
          />
        }
      />
      {/* Google, BBB and Yelp logos linking to our profiles (owner, November 2 2026) */}
      <TrustLogos />
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
      <QhReviews path={LOCATIONS_LINK.href} heading="What people in our service area say" />
      <QhStart faqs={page.faqs} heading="Service Area FAQs" />
      <FinalCta
        heading="Local Roofers Across Southern California"
        text="Wherever you are in our service area, a local roofer looks at your roof and gives you a clear next step with a written scope and price."
      />
    </main>
  );
}
