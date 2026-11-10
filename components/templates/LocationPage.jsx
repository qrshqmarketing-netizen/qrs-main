import { LocColumns, LocCta, LocFaq, LocReviews, LocRoofTypes, LocStory } from '@/components/loc/LocSections';
import { LocCityHero } from '@/components/loc/LocQhHero';
import '@/components/home/QrsHome.css';
import FacebookFeed from '@/components/loc/FacebookFeed';
import TrustLogos from '@/components/sections/TrustLogos';
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


// Office Facebook Pages (owner, November 2 2026): the city page whose office has a Page shows its 3 newest posts (FacebookFeed). The ID and
// token come from Vercel's environment variables, read here on the server only.
const FACEBOOK_FEEDS = {
  'woodland-hills': { id: 'FACEBOOK_PAGE_ID', token: 'FACEBOOK_PAGE_TOKEN' },
  vernon: { id: 'FACEBOOK_VERNON_PAGE_ID', token: 'FACEBOOK_VERNON_PAGE_TOKEN' },
};

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
  // An office page shows that office's own number (as on its Google listing) in the hero, the call-to-action card and the FAQ line
  const officePhone = office?.phone ? { phone: office.phone, tel: office.tel } : {};
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
      {/* The new-theme hero with the zoomed service area map (owner, November 10 2026) on the earlier layout and content */}
      <div className="qh-scope">
        <LocCityHero
          crumbs={crumbs}
          title={page.h1 || page.metaTitle}
          outcome={heroOutcome(cityPath(slug))}
          text={page.hero.sub}
          location={location}
          region={region}
          office={office}
          photo={{ src: photo.src, position: photo.position, alt: page.imageAlt || `A roof in ${city} from above` }}
          commercial={page.offer === 'commercial'}
        />
      </div>
      {/* Google, BBB and Yelp logos linking to our profiles (owner, November 2 2026) */}
      <TrustLogos />
      <LocColumns place={city} />
      <LocStory
        place={city}
        heading={page.intro.heading}
        paragraphs={page.intro.paragraphs}
        considerations={page.considerations}
        neighborhoods={page.neighborhoods}
        photo={page.storyImage || photo.src}
        photoAlt={page.storyImage ? page.storyImageAlt : page.imageAlt || `A roof in ${city} from above`}
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
      {FACEBOOK_FEEDS[slug] && <FacebookFeed pageId={process.env[FACEBOOK_FEEDS[slug].id]} token={process.env[FACEBOOK_FEEDS[slug].token]} place={city} />}
      <LocCta place={city} commercial={page.offer === 'commercial'} {...officePhone} />
      <LocFaq heading={`${city} Roofing FAQs`} sub={`Straight answers for ${city} ${page.offer === 'commercial' ? 'clients' : 'homeowners'}.`} faqs={page.faqs} {...officePhone} />
      {/* The request form, in the same column as the sections above */}
      <div className="lc-keep">
        <RoofCheck tone="white" offer={page.offer || 'home'} />
      </div>
      <FinalCta heading={page.final.heading} text={page.final.text} />
    </main>
  );
}
