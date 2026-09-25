import CityCards from '@/components/sections/CityCards';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import LocalIntro from '@/components/sections/LocalIntro';
import PageHero from '@/components/sections/PageHero';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import Services from '@/components/sections/Services';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, LOCATIONS_LINK } from '@/data/catalog';
import { LOCATION_PAGES } from '@/data/locationPages';
import { citiesIn, cityPath, findCity, REGIONS, regionPath } from '@/data/locations';
import { SERVICES } from '@/data/services';
import { OFFICES } from '@/data/site';
import { pageJsonLd } from '@/lib/structuredData';

// Hero photos rotate across region pages until each region has its own
const PHOTOS = [
  { src: '/images/home-hero-drone-view.webp', alt: 'Aerial view of a Southern California neighborhood of shingle-roofed homes', position: 'center 45%' },
  { src: '/images/roof-drone-palms.webp', alt: 'Aerial view of a shingle roof on a home with palm trees', position: 'center 40%' },
];

// A region page (e.g. /service-areas/la-county/): regional intro, the offices and cities in the region, a map of them,
// services and FAQs. Copy comes from data/regionPages.js.
export default function RegionPage({ region, page }) {
  const path = regionPath(region.slug);
  const cities = citiesIn(region.slug);
  const offices = OFFICES.filter((o) => findCity(o.citySlug)?.region === region.slug);
  const photo = page.image ? { src: page.image, alt: page.imageAlt || '' } : PHOTOS[REGIONS.indexOf(region) % PHOTOS.length];
  const crumbs = [HOME, LOCATIONS_LINK, { label: region.name, href: path }];
  const blurbs = Object.fromEntries(cities.map((l) => [l.slug, LOCATION_PAGES[l.slug]?.hero.sub]));
  const schema = pageJsonLd({
    path,
    title: page.metaTitle,
    description: page.metaDescription,
    type: 'CollectionPage',
    crumbs,
    faqs: page.faqs,
    parts: cities.map((l) => ({ label: `${l.city} Roofing`, href: cityPath(l.slug) })),
    service: {
      name: `Roofing in ${region.name}, ${region.state}`,
      type: 'roofing',
      area: { '@type': 'AdministrativeArea', name: `${region.name}, ${region.state}` },
      catalog: SERVICES.map((s) => ({ name: s.schemaName, href: s.href })),
    },
    image: photo.src,
  });
  return (
    <main id="top">
      <JsonLd data={schema} />
      <PageHero crumbs={crumbs} eyebrow="Service Areas" title={page.hero.heading} intro={page.hero.intro} image={photo.src} imageAlt={photo.alt} imagePosition={photo.position} />
      <LocalIntro city={region.name} heading={page.intro.heading} paragraphs={page.intro.paragraphs} offices={offices} considerations={page.considerations} />
      <CityCards regions={[region.slug]} blurbs={blurbs} heading={`Cities We Serve in ${region.name}`} />
      <ServiceArea heading={`Find QRS Near You in ${region.short}`} sub="Enter your ZIP code or pick a city on the map to see its phone number, estimate link and city page." region={region.slug} />
      <Services title={`Roofing Services in ${region.name}`} about={false} />
      <Faq heading={`${region.name} Roofing FAQs`} sub={`Straight answers for property owners across ${region.name}.`} faqs={page.faqs} />
      <RoofCheck tone="white" />
      <FinalCta />
    </main>
  );
}
