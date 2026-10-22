import AlsoServing from '@/components/sections/AlsoServing';
import AreaSketch from '@/components/home/AreaSketch';
import NearYou from '@/components/home/NearYou';
import QuickTiles from '@/components/home/QuickTiles';
import ReviewTrio from '@/components/home/ReviewTrio';
import Faq from '@/components/sections/Faq';
import HomeArticles from '@/components/home/HomeArticles';
import '@/components/home/HomeClean.css';
import '@/components/home/CleanPages.css';
import { servicesLine } from '@/data/homeServices';
import { NEAR_ALL, NEAR_PLACES, QUICK_TILES, nearLine, regionStart } from '@/data/nearYou';
import Hero from '@/components/sections/Hero';
import LocalIntro from '@/components/sections/LocalIntro';
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

// A region page (e.g. /service-areas/la-county/): regional intro, the offices and cities in the region, a map of them,
// services and FAQs. Copy comes from data/regionPages.js.
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
  return (
    <main id="top" className="clean-page">
      <JsonLd data={schema} />
      <Hero crumbs={crumbs} eyebrow="Service Areas" title={page.hero.heading} outcome={heroOutcome(path)} intro={page.hero.intro} image={photo.src} imageAlt={photo.alt} imagePosition={photo.position} stats />
      <LocalIntro city={region.name} heading={page.intro.heading} paragraphs={page.intro.paragraphs} offices={offices} considerations={page.considerations} />
      {/* After publicstorage.com (owner, October 21 2026: less on each page): the four tiles in place of the services tabs, three reviews side by
          side, the county's city pages as "Roofers near you" cards with the ZIP search in place of the long city card grid (every city page is
          also in the link columns above the footer) */}
      <QuickTiles heading={`Roofing services in __${region.name}__`} text={servicesLine(region.name)} tiles={QUICK_TILES} />
      <ReviewTrio path={path} />
      <NearYou heading={`Roofers __near__ you in ${region.name}`} text={nearLine(region.name)} places={NEAR_PLACES} start={regionStart(region.slug)} sketch={<AreaSketch />} all={NEAR_ALL} />
      <AlsoServing region={region.slug} heading={cities.length ? `More of ${region.name} We __Serve__` : `Cities We __Serve__ in ${region.name}`} sub={cities.length ? undefined : `Every city below is inside the area we serve and has a pin on our service area map. If you are in or near one, we cover you.`} />
      <HomeArticles posts={await articlesFor(path)} heading="Related articles" />
      <Faq heading={`${region.name} Roofing FAQs`} sub={`Straight answers for property owners across ${region.name}.`} faqs={page.faqs} cta={false} limit={4} />
      <RoofCheck tone="white" />
    </main>
  );
}
