import Faq from '@/components/sections/Faq';
import LatestArticles from '@/components/sections/LatestArticles';
import CardCarousel from '@/components/sections/CardCarousel';
import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import ReviewStrip from '@/components/sections/ReviewStrip';
import LocalIntro from '@/components/sections/LocalIntro';
import StudioProjects from '@/components/studio/StudioProjects';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceCategories from '@/components/sections/ServiceCategories';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, LOCATIONS_LINK, RESIDENTIAL_TYPES, typeCard } from '@/data/catalog';
import { cityPath, findRegion, regionPath } from '@/data/locations';
import { projectsNear } from '@/data/projects';
import { SERVICES } from '@/data/services';
import { OFFICES, SITE_URL } from '@/data/site';
import { pageJsonLd } from '@/lib/structuredData';
import { heroOutcome } from '@/data/heroOutcomes';
import { articlesFor } from '@/lib/articles';

// Hero photos rotate across city pages until each city has its own
const PHOTOS = [
  { src: '/images/home-hero-drone-view.webp', position: 'center 40%' },
  { src: '/images/roof-drone-palms.webp', position: 'center 45%' },
];

// A city page (e.g. /service-areas/la-county/pasadena/): the home page's sections with local copy from data/locationPages.js
// and a gallery of projects in the area (data/projects.js)
export default async function LocationPage({ location, page, index = 0 }) {
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
    service: {
      name: `Roofing in ${city}, CA`,
      type: 'roofing',
      area: { '@type': 'City', name: `${city}, CA`, containedInPlace: { '@type': 'AdministrativeArea', name: `${county}, CA` } },
      catalog: SERVICES.map((s) => ({ name: s.schemaName, href: s.href })),
      // A city with a branch office is served from that office (see the offices in lib/structuredData.js)
      provider: office && office !== OFFICES[0] ? `${SITE_URL}${cityPath(slug)}#office` : undefined,
    },
    faqs: page.faqs,
    image: photo.src,
  });
  const nearby = projectsNear(slug);
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        crumbs={crumbs}
        eyebrow={`${city} Roofing · Roof Repair & Replacement`}
        title={page.hero.heading}
        outcome={heroOutcome(cityPath(slug))}
        stats
        intro={page.hero.sub}
        image={photo.src}
        imagePosition={photo.position}
        label={`QRS roofing in ${city}`}
      />
      <LocalIntro city={city} heading={page.intro.heading} paragraphs={page.intro.paragraphs} offices={office ? [office] : []} neighborhoods={page.neighborhoods} considerations={page.considerations} />
      <ServiceCategories place={city} />
      <CardCarousel title={`Roof types we work on in __${city}__`} items={RESIDENTIAL_TYPES.map(typeCard)} idPrefix="roofTypes" tone="wash" />
      <ReviewStrip office={slug} places={[city, ...page.neighborhoods]} />
      {/* Only real projects in or near this city (by the project's ZIP code pin), stacked as cards; with none nearby, no section */}
      <StudioProjects
        id="projects"
        label={nearby.local ? `Projects in ${city}` : `Projects near ${city}`}
        heading={nearby.local ? `Roofing Projects in ${city}` : `Recent Roofing Projects Near ${city}`}
        projects={nearby.projects}
        allLink={false}
      />
      <LatestArticles posts={await articlesFor(cityPath(slug))} heading="Related Roofing Articles" />
      <Faq heading={`${city} Roofing FAQs`} sub={`Straight answers for ${city} ${page.offer === 'commercial' ? 'clients' : 'homeowners'}.`} faqs={page.faqs} cta={false} />
      <RoofCheck offer={page.offer || 'home'} />
      <FinalCta heading={page.final.heading} text={page.final.text} />
    </main>
  );
}
