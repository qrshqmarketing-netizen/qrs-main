import Breadcrumbs from '@/components/sections/Breadcrumbs';
import { HeadlineText } from '@/components/sections/Hero';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { PhoneIcon } from '@/components/ui/icons';
import { heroUnderline } from '@/data/heroOutcomes';
import { cityPhoto, LOCATION_PAGES } from '@/data/locationPages';
import { cityPath, LOCATIONS, OTHER_PLACES, REGIONS, regionPath } from '@/data/locations';
import { projectsNear } from '@/data/projects';
import { REGION_PAGES } from '@/data/regionPages';
import { OFFICES, PHONE, TEL } from '@/data/site';
import './Loc.css';

// The location hubs (/service-areas/ and the four county pages), after the owner's reference remote.com/us-state-explorer (October 29 2026):
// a short inset gradient band with the heading, a search box and a filter, then a heading block over photo cards, one per city page (facts with
// round icon chips, neighborhood pills with a dot, the photo zooming on hover), plus compact cards for the places inside the service area that have
// no page. The cards are built here on the server from the site's own data (no new claims); LocExplorer filters them in the browser, and every
// card stays in the HTML. Styles: the "Hubs" blocks of Loc.css.

const milesBetween = ([lat1, lng1], [lat2, lng2]) => {
  const rad = (d) => (d * Math.PI) / 180;
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lng2 - lng1) / 2) ** 2;
  return 3958.8 * 2 * Math.asin(Math.sqrt(a));
};

// The nearest QRS office to a place (by straight-line distance; the cards name it without the mileage)
function nearestOffice(place) {
  const [best] = OFFICES.filter((o) => o.geo)
    .map((o) => ({ name: o.name.replace(/ Office$/, ''), miles: milesBetween([place.lat, place.lng], [o.geo.latitude, o.geo.longitude]) }))
    .sort((a, b) => a.miles - b.miles);
  return best && { name: best.name };
}

const regionName = (slug) => REGIONS.find((r) => r.slug === slug)?.name || '';

// One card per city page
export function cityCards(region) {
  return LOCATIONS.filter((l) => !region || l.region === region).map((l) => {
    const page = LOCATION_PAGES[l.slug] || {};
    const photo = cityPhoto(page, LOCATIONS.indexOf(l));
    const office = OFFICES.find((o) => o.citySlug === l.slug);
    const projects = projectsNear(l.slug).projects.length;
    return {
      key: l.slug,
      name: l.city,
      href: cityPath(l.slug),
      region: l.region,
      county: regionName(l.region),
      image: photo.src,
      position: photo.position,
      blurb: page.blurb || '',
      office: office ? office.name : '',
      nearest: office ? null : nearestOffice(l),
      projects,
      hoods: (page.neighborhoods || []).slice(0, 3),
      terms: [l.city, regionName(l.region), ...(page.neighborhoods || [])].join(' ').toLowerCase(),
      tags: [l.region, office && 'office', projects > 0 && 'projects', 'page'].filter(Boolean),
    };
  });
}

// One compact card per place with no page of its own; on /service-areas/ it links to its county page
export function placeCards(region, { link = false } = {}) {
  return OTHER_PLACES.filter((p) => !region || p.region === region).map((p) => ({
    key: p.slug,
    name: p.city,
    href: link ? regionPath(p.region) : '',
    region: p.region,
    county: regionName(p.region),
    nearest: nearestOffice(p),
    terms: [p.city, regionName(p.region)].join(' ').toLowerCase(),
    tags: [p.region, 'place'],
  }));
}

// One card per county (on /service-areas/)
export function countyCards() {
  const fallback = ['/images/home-hero-drone-view.webp', '/images/roof-drone-palms.webp'];
  return REGIONS.map((r, i) => {
    const page = REGION_PAGES[r.slug] || {};
    const cities = LOCATIONS.filter((l) => l.region === r.slug).length;
    const places = OTHER_PLACES.filter((p) => p.region === r.slug).length;
    return {
      key: r.slug,
      name: r.name,
      href: regionPath(r.slug),
      region: r.slug,
      image: page.image || fallback[i % fallback.length],
      position: 'center 45%',
      blurb: page.metaDescription || '',
      counts: { cities, places: cities + places },
      offices: OFFICES.filter((o) => LOCATIONS.find((l) => l.slug === o.citySlug)?.region === r.slug).length,
      terms: r.name.toLowerCase(),
      tags: [r.slug],
    };
  });
}

// ---------- The short inset gradient band ----------
export function LocHubHero({ crumbs, path, title, outcome, intro, commercial }) {
  return (
    <section className="lc-hub-hero-wrap" aria-label="Service areas">
      <div className="lc-hub-hero">
        <Breadcrumbs items={crumbs} />
        <h1>
          <HeadlineText title={title} phrase={heroUnderline(path)} />
        </h1>
        {outcome && <p className="lc-outcome">{outcome.replace(/__/g, '')}</p>}
        {intro && (
          <p className="lc-sub">
            <Rich text={intro} />
          </p>
        )}
        <div className="lc-actions lc-actions-center">
          <SiteLink className="btn btn-dark" href="#roof-check">
            {commercial ? 'Request a roof survey' : 'Book a free roof evaluation'} <span className="arrow">→</span>
          </SiteLink>
          <a className="btn btn-line" href={TEL}>
            <PhoneIcon /> {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
