import Breadcrumbs from '@/components/sections/Breadcrumbs';
import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import Guarantee from '@/components/sections/Guarantee';
import Hero from '@/components/sections/Hero';
import LocalIntro from '@/components/sections/LocalIntro';
import NearbyAreas from '@/components/sections/NearbyAreas';
import Process from '@/components/sections/Process';
import ProjectGallery from '@/components/sections/ProjectGallery';
import ProofBar from '@/components/sections/ProofBar';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import WhyQrs from '@/components/sections/WhyQrs';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, LOCATIONS_LINK } from '@/data/catalog';
import { cityPath, findRegion, regionPath } from '@/data/locations';
import { projectsFor } from '@/data/projects';
import { SERVICES } from '@/data/services';
import { OFFICES, SITE_URL } from '@/data/site';
import { pageJsonLd } from '@/lib/structuredData';

// Hero photos rotate across city pages until each city has its own
const PHOTOS = [
  { src: '/images/home-hero-drone-view.webp', position: 'center 40%' },
  { src: '/images/roof-drone-palms.webp', position: 'center 45%' },
];

// A city page (e.g. /service-areas/la-county/pasadena/): the home page's sections with local copy from data/locationPages.js
// and a gallery of projects in the area (data/projects.js)
export default function LocationPage({ location, page, index = 0 }) {
  const { city, slug, county } = location;
  const region = findRegion(location.region);
  const photo = page.image ? { src: page.image, position: page.imagePosition } : PHOTOS[index % PHOTOS.length];
  const crumbs = [HOME, LOCATIONS_LINK, { label: region.name, href: regionPath(region.slug) }, { label: city, href: cityPath(slug) }];
  const office = OFFICES.find((o) => o.citySlug === slug);
  const schema = pageJsonLd({
    path: cityPath(slug),
    title: page.metaTitle,
    description: page.metaDescription,
    crumbs,
    faqs: page.faqs,
    service: {
      name: `Roofing in ${city}, CA`,
      type: 'roofing',
      area: { '@type': 'City', name: `${city}, CA`, containedInPlace: { '@type': 'AdministrativeArea', name: `${county}, CA` } },
      catalog: SERVICES.map((s) => ({ name: s.schemaName, href: s.href })),
      // A city with a branch office is served from that office (see the offices in lib/structuredData.js)
      provider: office && office !== OFFICES[0] ? `${SITE_URL}${cityPath(slug)}#office` : undefined,
    },
    image: photo.src,
  });
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        eyebrow={`${city} Roofing · Roof Repair & Replacement`}
        title={page.hero.heading}
        sub={page.hero.sub}
        image={photo.src}
        imagePosition={photo.position}
        label={`QRS roofing in ${city}`}
      />
      <ProofBar />
      <div className="crumb-bar">
        <div className="container">
          <Breadcrumbs items={crumbs} />
        </div>
      </div>
      <LocalIntro city={city} heading={page.intro.heading} paragraphs={page.intro.paragraphs} offices={office ? [office] : []} neighborhoods={page.neighborhoods} considerations={page.considerations} />
      <ProjectGallery
        city={city}
        heading={`Roofing Projects in ${city}`}
        sub="Tile, shingle, flat and metal roofing, done the detail-first way. Pick a project to see how we handle that kind of work."
        projects={projectsFor(slug)}
      />
      <Services title={`Roofing Services in ${city}`} about={false} />
      <Faq heading={`${city} Roofing FAQs`} sub={`Straight answers for ${city} homeowners.`} faqs={page.faqs} />
      <Process />
      <WhyQrs />
      <Testimonials />
      <RoofCheck />
      <ServiceArea heading={`Roofing Near ${city}`} sub={`${city} is one of the Los Angeles and Orange County cities we serve. Check your ZIP code or explore the map.`} focus={slug} />
      <Guarantee />
      <NearbyAreas city={city} nearby={page.nearby} />
      <FinalCta heading={page.final.heading} text={page.final.text} />
    </main>
  );
}
