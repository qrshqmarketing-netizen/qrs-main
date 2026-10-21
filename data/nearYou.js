// The city pages as "Roofers near you" cards and the area and service link columns (owner, October 21 2026, after publicstorage.com), shared by the
// home page and the sub pages (service, hub, city and county pages). components/home/NearYou.jsx and AreaLinks.jsx draw them.
import { miles } from '@/lib/geo';
import { ALL_PLACES, LOCATIONS, REGIONS, cityPath, regionPath } from './locations';
import { LOCATION_PAGES, cityPhoto } from './locationPages';
import { OFFICES, PHONE } from './site';

export const OFFICE_CITIES = OFFICES.map((o) => o.citySlug);

// Every city page as a card: name, county, its photo (or the shared stand-in) and the short line from its page
export const NEAR_PLACES = LOCATIONS.filter((l) => LOCATION_PAGES[l.slug]).map((l) => {
  const page = LOCATION_PAGES[l.slug], photo = cityPhoto(page, LOCATIONS.indexOf(l));
  return { slug: l.slug, city: l.city, county: l.county, lat: l.lat, lng: l.lng, path: cityPath(l.slug), image: photo.src, imagePosition: photo.position, blurb: page.blurb, office: OFFICE_CITIES.includes(l.slug) };
});

// The `count` city pages closest to a [lat, lng] point, leaving out `skip` (a slug)
export const nearestCities = (point, count = 4, skip = '') =>
  NEAR_PLACES.filter((p) => p.slug !== skip)
    .map((p) => ({ slug: p.slug, d: miles(point, [p.lat, p.lng]) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, count)
    .map((p) => p.slug);

// The cards a county page starts with: its own city pages (offices first), else the ones closest to the middle of its places
export function regionStart(region, count = 4) {
  const own = NEAR_PLACES.filter((p) => LOCATIONS.find((l) => l.slug === p.slug)?.region === region).sort((a, b) => b.office - a.office);
  if (own.length) return own.slice(0, count).map((p) => p.slug);
  const places = ALL_PLACES.filter((p) => p.region === region);
  const mid = [places.reduce((s, p) => s + p.lat, 0) / places.length, places.reduce((s, p) => s + p.lng, 0) / places.length];
  return nearestCities(mid, count);
}

export const NEAR_ALL = { label: 'All service areas', href: '/service-areas/' };
export const nearLine = (where = 'Southern California') => `${OFFICES.length} offices and 12 crews across ${where}. Enter your ZIP code to see the closest.`;

// The link columns above the footer: a plain paragraph, every city page by county with the county pages, and the main services
const byName = (a, b) => a.label.localeCompare(b.label);
const citiesIn = (region) => LOCATIONS.filter((l) => l.region === region).map((l) => ({ label: l.city, href: cityPath(l.slug) })).sort(byName);
const county = (slug) => REGIONS.find((r) => r.slug === slug);
const officeTowns = OFFICES.map((o) => o.address.city).join(', ').replace(/, ([^,]*)$/, ' and $1');

export const AREA_LINKS = {
  text: `**Quality Roofing Specialists** is a family-owned roofing contractor for homeowners and clients across Los Angeles, Orange, Riverside and San Bernardino Counties, with offices in ${officeTowns}. Every home roof starts with a free roof evaluation, and every job with a written scope and price. Call ${PHONE}, or see [every area we serve](/service-areas/).`,
  columns: [
    { title: 'Roofing in Los Angeles County', links: [...citiesIn('la-county'), { label: 'All of Los Angeles County', href: regionPath('la-county') }] },
    {
      title: 'Orange County & Inland Empire',
      links: [...citiesIn('orange-county'), { label: 'All of Orange County', href: regionPath('orange-county') }, ...['riverside-county', 'san-bernardino-county'].map((r) => ({ label: county(r).name, href: regionPath(r) }))],
    },
    {
      title: 'Roofing services',
      links: [
        { label: 'Roof Repair', href: '/roof-repair/' },
        { label: 'Emergency Roof Repair', href: '/roof-repair/emergency/' },
        { label: 'Roof Replacement', href: '/roof-replacement/' },
        { label: 'Roof Inspection', href: '/roof-inspection/' },
        { label: 'Tile Roofing', href: '/residential-roofing/tile-roofing/' },
        { label: 'Shingle Roofing', href: '/residential-roofing/shingle-roofing/' },
        { label: 'Flat Roofing', href: '/residential-roofing/flat-roofing/' },
        { label: 'Metal Roofing', href: '/residential-roofing/metal-roofing/' },
        { label: 'Commercial Roofing', href: '/commercial-roofing/' },
        { label: 'HOA & Multi-Family', href: '/residential-roofing/hoa-multi-family/' },
        { label: 'Roof Maintenance Plans', href: '/roof-maintenance-plans/' },
        { label: 'Roof Financing', href: '/roof-financing/' },
      ],
    },
  ],
};

// The checklist photo band (CheckBand.jsx): homes and HOA pages get the home list, commercial pages the commercial one (no "free" survey there,
// as the commercial hero facts say). Only facts the site already states.
const HOME_CHECKS = ['Free roof evaluation', 'Written scope and price before any work', '10-year workmanship warranty, call for details', 'Licensed, bonded & insured', 'Permits pulled', 'Clean site and a nail sweep every day'];
const COMMERCIAL_CHECKS = ['Roofer-led roof survey', 'Written scope and price before any work', 'Permits pulled', 'Licensed, bonded & insured', 'Clean site and a nail sweep every day', 'One phone number for every office'];
export const checksFor = (path = '/') =>
  path.startsWith('/commercial-roofing/')
    ? { heading: 'What you can __count__ on, on every job', items: COMMERCIAL_CHECKS, image: { src: '/images/recent-work-commercial-flat-roof-drone-view.webp', position: 'center 40%' } }
    : { heading: 'What you can __count__ on, on every job', items: HOME_CHECKS, image: { src: '/images/home-hero-shingle-neighborhood-drone-view.webp', position: 'center 55%' } };

// The four tiles (QuickTiles.jsx): the home page under the hero, and city and county pages in place of the services tabs
export const QUICK_TILES = [
  { art: 'repair', title: 'Roof Repair', line: 'Leaks, flashing and storm damage', href: '/roof-repair/' },
  { art: 'replace', title: 'Roof Replacement', line: 'Tile, shingle and flat roofs', href: '/roof-replacement/' },
  { art: 'inspect', title: 'Roof Inspection', line: 'A free drone roof evaluation', href: '/roof-inspection/' },
  { art: 'commercial', title: 'Commercial Roofing', line: 'Offices, retail, warehouses and more', href: '/commercial-roofing/' },
];
