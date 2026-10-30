import { LocColumns, LocCta, LocFaq, LocHero, LocReviews, LocRoofTypes, LocStory } from '@/components/loc/LocSections';
import LatestArticles from '@/components/sections/LatestArticles';
import FinalCta from '@/components/sections/FinalCta';
import OfficeMap from '@/components/sections/OfficeMap';
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


// Hero photos rotate across city pages until each city has its own
const PHOTOS = [
  { src: '/images/home-hero-drone-view.webp', position: 'center 40%' },
  { src: '/images/roof-drone-palms.webp', position: 'center 45%' },
];

// A city page (e.g. /service-areas/la-county/pasadena/), in the location-page design (components/loc/, after remote.com/global-hr/small-business;
// owner, October 29 2026), with local copy from data/locationPages.js and the projects in the area (data/projects.js)
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
    <main id="top" className="loc">
      <JsonLd data={schema} />
      <LocHero
        crumbs={crumbs}
        path={cityPath(slug)}
        title={page.h1 || page.metaTitle}
        outcome={heroOutcome(cityPath(slug))}
        sub={page.hero.sub}
        place={city}
        commercial={page.offer === 'commercial'}
      />
      <LocColumns place={city} />
      <LocStory
        place={city}
        heading={page.intro.heading}
        paragraphs={page.intro.paragraphs}
        considerations={page.considerations}
        neighborhoods={page.neighborhoods}
        photo={photo.src}
        photoAlt={page.imageAlt || `A roof in ${city} from above`}
      />
      <div className="lc-keep">
        {/* An office's Google Maps listing, when it has one (OFFICES[].mapEmbed in data/site.js; owner, October 27 2026) */}
        {office?.mapEmbed && <OfficeMap office={office} city={city} />}
      </div>
      <LocRoofTypes place={city} />
      <LocReviews path={cityPath(slug)} place={city} places={[city, ...page.neighborhoods]} />
      <div className="lc-keep">
        {/* Only real projects in or near this city (by the project's ZIP code pin), as a list with the hover photo; with none nearby, no section */}
        <StudioProjects
          id="projects"
          label={nearby.local ? `Projects in ${city}` : `Projects near ${city}`}
          heading={nearby.local ? `Roofing Projects in ${city}` : `Recent Roofing Projects Near ${city}`}
          projects={nearby.projects}
          allLink={false}
          layout="list"
        />
        <LatestArticles posts={await articlesFor(cityPath(slug))} heading="Related Roofing Articles" />
      </div>
      <LocCta place={city} commercial={page.offer === 'commercial'} />
      <LocFaq heading={`${city} Roofing FAQs`} sub={`Straight answers for ${city} ${page.offer === 'commercial' ? 'clients' : 'homeowners'}.`} faqs={page.faqs} />
      {/* The request form, in the same column as the sections above */}
      <div className="lc-keep">
        <RoofCheck tone="white" offer={page.offer || 'home'} />
      </div>
      <FinalCta heading={page.final.heading} text={page.final.text} />
    </main>
  );
}
