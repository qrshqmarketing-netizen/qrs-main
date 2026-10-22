import Faq from '@/components/sections/Faq';
import AreaSketch from '@/components/home/AreaSketch';
import NearYou from '@/components/home/NearYou';
import QuickTiles from '@/components/home/QuickTiles';
import ReviewTrio from '@/components/home/ReviewTrio';
import HomeArticles from '@/components/home/HomeArticles';
import '@/components/home/HomeClean.css';
import '@/components/home/CleanPages.css';
import { servicesLine } from '@/data/homeServices';
import { NEAR_ALL, NEAR_PLACES, QUICK_TILES, nearLine, nearestCities } from '@/data/nearYou';
import Hero from '@/components/sections/Hero';
import LocalIntro from '@/components/sections/LocalIntro';
import StudioProjects from '@/components/studio/StudioProjects';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, LOCATIONS_LINK } from '@/data/catalog';
import { cityPath, findRegion, OTHER_PLACES, regionPath } from '@/data/locations';
import { projectsNear } from '@/data/projects';
import { SERVICES } from '@/data/services';
import { OFFICES, SITE_URL } from '@/data/site';
import { pageJsonLd } from '@/lib/structuredData';
import { heroOutcome } from '@/data/heroOutcomes';
import { articlesFor } from '@/lib/articles';
import { cityPhoto } from '@/data/locationPages';


// A city page (e.g. /service-areas/la-county/pasadena/): the home page's sections with local copy from data/locationPages.js
// and a gallery of projects in the area (data/projects.js)
export default async function LocationPage({ location, page, index = 0 }) {
  const { city, slug, county } = location;
  const region = findRegion(location.region);
  const photo = cityPhoto(page, index); // its own photo, else a shared one (data/locationPages.js)
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
      // The city, plus any place without a page of its own that this page covers (`servedBy` in data/locations.js: West Hollywood on the Los Angeles page)
      area: [{ name: city, county }, ...OTHER_PLACES.filter((p) => p.servedBy === slug).map((p) => ({ name: p.city, county: p.county }))].map((a) => ({
        '@type': 'City',
        name: `${a.name}, CA`,
        containedInPlace: { '@type': 'AdministrativeArea', name: `${a.county}, CA` },
      })),
      catalog: SERVICES.map((s) => ({ name: s.schemaName, href: s.href })),
      // A city with a branch office is served from that office (see the offices in lib/structuredData.js)
      provider: office && office !== OFFICES[0] ? `${SITE_URL}${cityPath(slug)}#office` : undefined,
    },
    faqs: page.faqs,
    image: photo.src,
  });
  const nearby = projectsNear(slug);
  return (
    <main id="top" className="clean-page">
      <JsonLd data={schema} />
      <Hero
        crumbs={crumbs}
        eyebrow={`${city} Roofing · Roof Repair & Replacement`}
        title={page.h1 || page.metaTitle}
        outcome={heroOutcome(cityPath(slug))}
        stats
        intro={page.hero.sub}
        image={photo.src}
        imagePosition={photo.position}
        label={`QRS roofing in ${city}`}
      />
      <LocalIntro city={city} heading={page.intro.heading} paragraphs={page.intro.paragraphs} offices={office ? [office] : []} neighborhoods={page.neighborhoods} considerations={page.considerations} />
      {/* After publicstorage.com (owner, October 21 2026: less on each page): the four tiles in place of the services tabs, three reviews side by
          side, the nearest other city pages as cards with the ZIP search, and the area and service links above the footer */}
      <QuickTiles heading={`Roofing services in __${city}__`} text={servicesLine(city)} tiles={QUICK_TILES} />
      {/* Only real projects in or near this city (by the project's ZIP code pin), as a list with the hover photo (owner, October 15 2026); with none nearby, no section */}
      <ReviewTrio path={cityPath(slug)} places={[city, ...page.neighborhoods]} />
      <StudioProjects
        id="projects"
        label={nearby.local ? `Projects in ${city}` : `Projects near ${city}`}
        heading={nearby.local ? `Roofing Projects in ${city}` : `Recent Roofing Projects Near ${city}`}
        projects={nearby.projects}
        allLink={false}
        layout="list"
      />
      <NearYou heading={`Roofers __near__ ${city}`} text={nearLine()} places={NEAR_PLACES} start={nearestCities([location.lat, location.lng], 4, slug)} sketch={<AreaSketch />} all={NEAR_ALL} />
      <HomeArticles posts={await articlesFor(cityPath(slug))} heading="Related articles" />
      <Faq heading={`${city} Roofing FAQs`} sub={`Straight answers for ${city} ${page.offer === 'commercial' ? 'clients' : 'homeowners'}.`} faqs={page.faqs} cta={false} limit={4} />
      <RoofCheck offer={page.offer || 'home'} />
    </main>
  );
}
