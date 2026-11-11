import { QhAreaMap, QhHero } from '@/components/home/QrsSections';
import QuickLeadForm from '@/components/widgets/QuickLeadForm';
import { ALL_PLACES, LOCATIONS, regionPath } from '@/data/locations';
import { SANTA_CLARA_OUTLINE, SERVICE_AREA_OUTLINE } from '@/data/serviceAreaOutline';
import { HERO_ANNOTATIONS, OFFICES, PHONE, TEL } from '@/data/site';

// The location pages' hero in the new home page's theme (owner, November 6 2026): the city or county heading (with its city terms), the page's
// own line, check points and buttons (a city with an office calls that office's number). On the right it used to be a map of the service area
// zoomed to the place; since November 11 2026 (owner) it is a quick contact form for that place: name, phone, optional email and ZIP, posted
// like the other request forms (email, sheet, Supabase) with the page and place in the message. A commercial page asks for a roof survey (never
// called free) and adds the company or property field. The county hub pages keep the map (owner, November 11 2026): the county's shape
// highlighted with its places, offices and city guides, linking to its city pages (Santa Clara County is drawn from its own outline).
const COUNTY_SHAPE = {
  'la-county': 'Los Angeles County',
  'orange-county': 'Orange County',
  'riverside-county': 'Western Riverside County',
  'san-bernardino-county': 'Southwest San Bernardino County',
  'santa-clara-county': 'Santa Clara County',
};
const NORTH = (lat) => lat > 35;
const mapFor = (lat) => ({
  outline: NORTH(lat) ? SANTA_CLARA_OUTLINE : SERVICE_AREA_OUTLINE,
  offices: OFFICES.filter((o) => NORTH(o.geo.latitude) === NORTH(lat)),
  cities: LOCATIONS.filter((l) => NORTH(l.lat) === NORTH(lat)),
});
function placeForm({ place, countyName, commercial }) {
  return (
    <QuickLeadForm
      title={commercial ? `Request a roof survey in ${place}` : `Book a free roof evaluation in ${place}`}
      text={commercial ? 'Tell us about the building. A roofer, not a salesperson, calls to plan your roof survey.' : 'Tell us where to reach you. A roofer, not a salesperson, calls to set up your roof evaluation.'}
      button={commercial ? 'Request My Roof Survey' : 'Book My Free Evaluation'}
      fine={commercial ? 'A written scope and price comes before any work.' : 'Free and no obligation. A written price comes before any work.'}
      askCompany={commercial}
      service={commercial ? 'Commercial or HOA roofing' : 'Roof inspection / roof check'}
      note={`Location page: ${place}${countyName && countyName !== place ? ` (${countyName})` : ''}.`}
      leadSource="location_form"
    />
  );
}

export function LocCityHero({ crumbs, title, outcome, text, location, region, office, photo, commercial }) {
  const tel = office?.tel || TEL;
  const phone = office?.phone || PHONE;
  const visual = placeForm({ place: location.city, countyName: region.name, commercial });
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

export function LocRegionHero({ crumbs, title, outcome, text, region, cities, offices }) {
  const places = ALL_PLACES.filter((p) => p.region === region.slug);
  const north = NORTH(places[0]?.lat ?? 0);
  // Southern California counties are framed by their places; Santa Clara County (one city page so far) by its own outline
  const pts = north ? SANTA_CLARA_OUTLINE.features[0].geometry.coordinates[0].map(([lng, lat]) => ({ lat, lng })) : places;
  const lats = pts.map((p) => p.lat);
  const lngs = pts.map((p) => p.lng);
  const visual = (
    <QhAreaMap
      {...mapFor(places[0]?.lat ?? 0)}
      cityLabels
      focus={COUNTY_SHAPE[region.slug]}
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
