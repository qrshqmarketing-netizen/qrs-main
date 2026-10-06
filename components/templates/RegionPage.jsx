import CityCards from '@/components/sections/CityCards';
import Faq from '@/components/sections/Faq';
import LatestArticles from '@/components/sections/LatestArticles';
import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import ProofBar from '@/components/sections/ProofBar';
import LocalIntro from '@/components/sections/LocalIntro';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, LOCATIONS_LINK } from '@/data/catalog';
import { LOCATION_PAGES } from '@/data/locationPages';
import { citiesIn, cityPath, findCity, REGIONS, regionPath } from '@/data/locations';
import { SERVICES } from '@/data/services';
import { OFFICES } from '@/data/site';
import { pageJsonLd } from '@/lib/structuredData';
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
  const blurbs = Object.fromEntries(cities.map((l) => [l.slug, LOCATION_PAGES[l.slug]?.blurb]));
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
      area: { '@type': 'AdministrativeArea', name: `${region.name}, ${region.state}` },
      catalog: SERVICES.map((s) => ({ name: s.schemaName, href: s.href })),
    },
    faqs: page.faqs,
    image: photo.src,
  });
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero crumbs={crumbs} eyebrow="Service Areas" title={page.hero.heading} intro={page.hero.intro} image={photo.src} imageAlt={photo.alt} imagePosition={photo.position} />
      <LocalIntro city={region.name} heading={page.intro.heading} paragraphs={page.intro.paragraphs} offices={offices} considerations={page.considerations} />
      <ProofBar />
      <CityCards regions={[region.slug]} blurbs={blurbs} heading={`Cities We Serve in ${region.name}`} />
      <LatestArticles posts={await articlesFor(path)} heading="Related Roofing Articles" />
      <Faq heading={`${region.name} Roofing FAQs`} sub={`Straight answers for property owners across ${region.name}.`} faqs={page.faqs} cta={false} />
      <RoofCheck tone="white" />
      <FinalCta
        heading={`Roofing Across ${region.name}`}
        text={`Wherever you are in ${region.name}, a local roofer, not a salesperson, looks at your roof and gives you a clear next step with a written scope and price.`}
      />
    </main>
  );
}
