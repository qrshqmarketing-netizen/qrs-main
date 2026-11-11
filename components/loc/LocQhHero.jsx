import { QhAreaMap, QhHero } from '@/components/home/QrsSections';
import { findCity, LOCATIONS, regionPath, ALL_PLACES } from '@/data/locations';
import { nearestCities } from '@/data/nearYou';
import { SANTA_CLARA_OUTLINE, SERVICE_AREA_OUTLINE } from '@/data/serviceAreaOutline';
import { HERO_ANNOTATIONS, OFFICES, PHONE, TEL } from '@/data/site';

// The location pages' hero in the new home page's theme (owner, November 6 2026): the city or county heading (with its city terms), the page's
// own line, check points, buttons (a city with an office calls that office's number) and a map of the service area zoomed to the place: the
// county shape highlighted on a county page, or the city's gold pin with the nearby city pins and our offices on a city page, linking to the
// county and the nearest city pages. Santa Clara County and San Jose get the same map drawn from the county's own outline (owner, November 11 2026;
// they used to show the page photo with the office's details).
const COUNTY_SHAPE = {
  'la-county': 'Los Angeles County',
  'orange-county': 'Orange County',
  'riverside-county': 'Western Riverside County',
  'san-bernardino-county': 'Southwest San Bernardino County',
  'santa-clara-county': 'Santa Clara County',
};
// Which map a place is drawn on: Southern California, or Santa Clara County (about 300 miles north) with its own outline, offices and city pins
const NORTH = (lat) => lat > 35;
const mapFor = (lat) => ({
  outline: NORTH(lat) ? SANTA_CLARA_OUTLINE : SERVICE_AREA_OUTLINE,
  offices: OFFICES.filter((o) => NORTH(o.geo.latitude) === NORTH(lat)),
  cities: LOCATIONS.filter((l) => NORTH(l.lat) === NORTH(lat)),
});

export function LocCityHero({ crumbs, title, outcome, text, location, region, office, photo, commercial }) {
  const tel = office?.tel || TEL;
  const phone = office?.phone || PHONE;
  // the nearest city pages on the same map (San Jose has none near it yet, so only its county is linked)
  const near = nearestCities([location.lat, location.lng], 3, location.slug).map(findCity).filter((c) => c && NORTH(c.lat) === NORTH(location.lat));
  const pad = { lat: 0.16, lng: 0.26 };
  const visual = (
    <QhAreaMap
      {...mapFor(location.lat)}
      cityLabels
      focus={COUNTY_SHAPE[region.slug]}
      highlight={{ name: location.city, slug: location.slug, lat: location.lat, lng: location.lng }}
      bounds={{ w: location.lng - pad.lng, e: location.lng + pad.lng, s: location.lat - pad.lat, n: location.lat + pad.lat }}
      note={office ? `Home of our ${office.name}` : `Roofers serving ${location.city} and ${region.name}`}
      links={[{ label: region.name, href: regionPath(region.slug) }, ...near.map((c) => ({ label: `${c.city} roofing`, href: `${regionPath(c.region)}${c.slug}/` }))]}
    />
  );
  return (
    <QhHero
      crumbs={crumbs}
      title={title}
      outcome={outcome}
      text={text}
      checks={HERO_ANNOTATIONS[commercial ? 'commercial' : 'home']}
      actions={[
        { label: commercial ? 'Request a Roof Survey' : 'Book a Free Roof Evaluation', href: '#roof-check', style: 'gold' },
        { label: `Call ${phone}`, href: tel, style: 'line' },
      ]}
      badges
      visual={visual}
    />
  );
}

export function LocRegionHero({ crumbs, title, outcome, text, region, cities, offices, photo }) {
  const places = ALL_PLACES.filter((p) => p.region === region.slug);
  const shape = COUNTY_SHAPE[region.slug];
  const north = NORTH(places[0]?.lat ?? 0);
  // Southern California counties are framed by their places; Santa Clara County (one city page so far) by its own outline
  const pts = north ? SANTA_CLARA_OUTLINE.features[0].geometry.coordinates[0].map(([lng, lat]) => ({ lat, lng })) : places;
  const lats = pts.map((p) => p.lat);
  const lngs = pts.map((p) => p.lng);
  const visual = (
    <QhAreaMap
      {...mapFor(places[0]?.lat ?? 0)}
      cityLabels
      focus={shape}
      bounds={{ w: Math.min(...lngs) - 0.12, e: Math.max(...lngs) + 0.12, s: Math.min(...lats) - 0.08, n: Math.max(...lats) + 0.08 }}
      note={places.length > 1 ? `${places.length} places we serve in ${region.name}` : `Roofers across ${region.name}, from our ${offices[0]?.name || 'local office'}`}
      links={cities.slice(0, 6).map((c) => ({ label: c.city, href: `${regionPath(region.slug)}${c.slug}/` }))}
    />
  );
  return (
    <QhHero
      crumbs={crumbs}
      title={title}
      outcome={outcome}
      text={text}
      checks={HERO_ANNOTATIONS.home}
      actions={[
        { label: 'Book a Free Roof Evaluation', href: '#roof-check', style: 'gold' },
        { label: `Call ${(offices[0] && offices[0].phone) || PHONE}`, href: (offices[0] && offices[0].tel) || TEL, style: 'line' },
      ]}
      badges
      visual={visual}
    />
  );
}
