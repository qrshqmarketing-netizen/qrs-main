import LocExplorer from '@/components/loc/LocExplorer';
import { cityCards, LocHubHero, placeCards } from '@/components/loc/LocHub';
import { LocCta, LocFaq, LocReviews, LocStory } from '@/components/loc/LocSections';
import LatestArticles from '@/components/sections/LatestArticles';
import FinalCta from '@/components/sections/FinalCta';
import OfficeMap from '@/components/sections/OfficeMap';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, LOCATIONS_LINK } from '@/data/catalog';
import { ALL_PLACES, citiesIn, cityPath, findCity, REGIONS, regionPath } from '@/data/locations';
import { SERVICES } from '@/data/services';
import { OFFICES } from '@/data/site';
import { pageJsonLd } from '@/lib/structuredData';
import { heroOutcome } from '@/data/heroOutcomes';
import { articlesFor } from '@/lib/articles';

// Hero photos rotate across region pages until each region has its own
const PHOTOS = [
  { src: '/images/home-hero-drone-view.webp', alt: 'Aerial view of a Southern California neighborhood of shingle-roofed homes', position: 'center 45%' },
  { src: '/images/roof-drone-palms.webp', alt: 'Aerial view of a shingle roof on a home with palm trees', position: 'center 40%' },
];

// A county page (e.g. /service-areas/la-county/), a location hub after remote.com/us-state-explorer (owner, October 29 2026): the short
// gradient band, the explorer of the county's city pages and other places, then the county's own intro, offices, reviews and FAQs.
// Copy comes from data/regionPages.js.
export default async function RegionPage({ region, page }) {
  const path = regionPath(region.slug);
  const cities = citiesIn(region.slug);
  const offices = OFFICES.filter((o) => findCity(o.citySlug)?.region === region.slug);
  const photo = page.image ? { src: page.image, alt: page.imageAlt || '' } : PHOTOS[REGIONS.indexOf(region) % PHOTOS.length];
  const crumbs = [HOME, LOCATIONS_LINK, { label: region.name, href: path }];
  const schema = pageJsonLd({
    path,
    title: page.metaTitle,
    description: page.metaDescription,
    type: 'CollectionPage',
    crumbs,
    parts: cities.map((l) => ({ label: `${l.city} Roofing`, href: cityPath(l.slug) })),
    service: {
      name: `Roofing in ${region.name}, ${region.state}`,
      type: 'roofing',
      area: [
        { '@type': 'AdministrativeArea', name: `${region.name}, ${region.state}`, containedInPlace: { '@type': 'State', name: 'California' } },
        ...ALL_PLACES.filter((p) => p.region === region.slug).map((p) => ({ '@type': 'City', name: `${p.city}, ${region.state}` })),
      ],
      catalog: SERVICES.map((s) => ({ name: s.schemaName, href: s.href })),
    },
    faqs: page.faqs,
    image: photo.src,
  });
  const cityList = cityCards(region.slug);
  const placeList = placeCards(region.slug);
  return (
    <main id="top" className="loc">
      <JsonLd data={schema} />
      <LocHubHero crumbs={crumbs} path={path} title={page.hero.heading} outcome={heroOutcome(path)} intro={page.hero.intro} />
      <LocExplorer
        label="County guide"
        heading={cityList.length ? `Roofers across ${region.name}, city by city` : `Every place we serve in ${region.name}`}
        text={
          cityList.length
            ? `Find your city for its local roofing guide: the neighborhoods we work in, the nearest QRS office and our projects nearby.`
            : `Every place below is inside the area we serve and has a pin on our service area map. If you are in or near one, we cover you.`
        }
        placeholder={`Search ${region.name}…`}
        cities={cityList}
        places={placeList}
        placesHeading={cityList.length ? `More of ${region.name} we serve` : undefined}
        placesText={cityList.length ? 'These places have no page of their own yet, but they are inside our service area.' : undefined}
        filters={[
          { value: 'all', label: 'All places' },
          { value: 'page', label: 'City guides' },
          { value: 'office', label: 'QRS office cities' },
          { value: 'projects', label: 'Recent projects nearby' },
          { value: 'place', label: 'More places we serve' },
        ]}
      />
      <LocStory
        place={region.name}
        heading={page.intro.heading}
        paragraphs={page.intro.paragraphs}
        considerations={page.considerations}
        photo={photo.src}
        photoAlt={photo.alt}
      />
      <div className="lc-keep">
        {offices.filter((o) => o.mapEmbed).map((o) => (
          <OfficeMap key={o.citySlug} office={o} city={findCity(o.citySlug)?.city} />
        ))}
      </div>
      <LocReviews path={path} place={region.name} />
      <div className="lc-keep">
        <LatestArticles posts={await articlesFor(path)} heading="Related Roofing Articles" />
      </div>
      <LocCta place={region.name} />
      <LocFaq heading={`${region.name} Roofing FAQs`} sub={`Straight answers for property owners across ${region.name}.`} faqs={page.faqs} />
      {/* The request form, in the same column as the sections above */}
      <div className="lc-keep">
        <RoofCheck tone="white" />
      </div>
      <FinalCta
        heading={`Roofing Across ${region.name}`}
        text={`Wherever you are in ${region.name}, a local roofer, not a salesperson, looks at your roof and gives you a clear next step with a written scope and price.`}
      />
    </main>
  );
}
