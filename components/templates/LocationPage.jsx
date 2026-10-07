import Faq from '@/components/sections/Faq';
import LatestArticles from '@/components/sections/LatestArticles';
import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import RelatedLinks from '@/components/sections/RelatedLinks';
import ReviewStrip from '@/components/sections/ReviewStrip';
import LocalIntro from '@/components/sections/LocalIntro';
import ProjectCarousel from '@/components/sections/ProjectCarousel';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, LOCATIONS_LINK } from '@/data/catalog';
import { cityPath, findRegion, regionPath } from '@/data/locations';
import { projectsNear } from '@/data/projects';
import { projectsRelatedTo } from '@/data/projectPages';
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
      <ReviewStrip office={slug} places={[city, ...page.neighborhoods]} />
      {/* Only real projects in or near this city (by the project's ZIP code pin); with none nearby, no gallery */}
      <ProjectCarousel
        city={city}
        heading={nearby.local ? `Roofing Projects in ${city}` : `Recent Roofing Projects Near ${city}`}
        sub={nearby.local ? 'Roofs we have finished here. Pick a project to see how we handled it.' : 'Roofs we have finished close by. Pick a project to see how we handled it.'}
        projects={nearby.projects}
      />
      <RelatedLinks heading={`Recent projects in ${city}`} links={projectsRelatedTo(cityPath(slug))} />
      <LatestArticles posts={await articlesFor(cityPath(slug))} heading="Related Roofing Articles" />
      <Faq heading={`${city} Roofing FAQs`} sub={`Straight answers for ${city} ${page.offer === 'commercial' ? 'clients' : 'homeowners'}.`} faqs={page.faqs} cta={false} />
      <RoofCheck offer={page.offer || 'home'} />
      <FinalCta heading={page.final.heading} text={page.final.text} />
    </main>
  );
}
