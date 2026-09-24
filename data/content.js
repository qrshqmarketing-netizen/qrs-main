// Joins the site structure (catalog.js) with the page copy (services/*.js, locationPages.js)

import { ABOUT_LINK, CAREERS_LINK, CONTRACTORS_LINK, GROUPS, HOME, LOCATIONS_LINK, RESIDENTIAL, SINGLES } from './catalog';
import { cityPath, LOCATIONS } from './locations';
import { COMMERCIAL_CONTENT } from './services/commercial';
import { FLAT_CONTENT } from './services/flat';
import { METAL_CONTENT } from './services/metal';
import { SHINGLE_CONTENT } from './services/shingle';
import { HOA_MULTI_FAMILY, RAIN_GUTTERS } from './services/specialty';
import { TILE_CONTENT } from './services/tile';

// Sections: { ...structure, hub, services }
export const SHINGLE = { ...GROUPS.shingle, ...SHINGLE_CONTENT };
export const TILE = { ...GROUPS.tile, ...TILE_CONTENT };
export const FLAT = { ...GROUPS.flat, ...FLAT_CONTENT };
export const METAL = { ...GROUPS.metal, ...METAL_CONTENT };
export const COMMERCIAL = { ...GROUPS.commercial, ...COMMERCIAL_CONTENT };
export const SECTIONS = [SHINGLE, TILE, FLAT, METAL, COMMERCIAL];

// Stand-alone pages: { ...structure, page }
export const GUTTERS = { ...SINGLES.gutters, page: RAIN_GUTTERS };
export const HOA = { ...SINGLES.hoa, page: HOA_MULTI_FAMILY };

export const serviceHref = (section, service) => `${section.href}${service.slug}/`;
export const findService = (section, slug) => section.services.find((s) => s.slug === slug);

// Breadcrumb trails
export const sectionCrumbs = (section) => [HOME, ...(section.parent ? [section.parent] : []), { label: section.label, href: section.href }];
export const serviceCrumbs = (section, service) => [...sectionCrumbs(section), { label: service.navLabel, href: serviceHref(section, service) }];
export const singleCrumbs = (single) => [HOME, single.parent, { label: single.label, href: single.href }];

// Cards for a section's service pages (placeholder art rotates until real photos are added)
export const serviceCards = (section) =>
  section.services.map((s, i) => ({ title: s.title, text: s.card, href: serviceHref(section, s), scene: section.scenes[i % section.scenes.length], image: s.image }));

// Page names, used for "Related services" links
const LABELS = new Map([
  [RESIDENTIAL.href, RESIDENTIAL.label],
  [LOCATIONS_LINK.href, LOCATIONS_LINK.label],
  [ABOUT_LINK.href, ABOUT_LINK.label],
  [CAREERS_LINK.href, CAREERS_LINK.label],
  [CONTRACTORS_LINK.href, 'Contractor Partnerships'],
  ...SECTIONS.flatMap((s) => [[s.href, s.label], ...s.services.map((svc) => [serviceHref(s, svc), svc.title])]),
  [GUTTERS.href, GUTTERS.page.title],
  [HOA.href, HOA.page.title],
  ...LOCATIONS.map((l) => [cityPath(l.slug), `${l.city} Roofing`]),
]);
export const relatedLinks = (hrefs = []) => hrefs.filter((href) => LABELS.has(href)).map((href) => ({ href, label: LABELS.get(href) }));

// Every page address (for the sitemap)
export const ALL_PATHS = [
  '/',
  RESIDENTIAL.href,
  ...SECTIONS.flatMap((s) => [s.href, ...s.services.map((svc) => serviceHref(s, svc))]),
  GUTTERS.href,
  HOA.href,
  CONTRACTORS_LINK.href,
  LOCATIONS_LINK.href,
  ...LOCATIONS.map((l) => cityPath(l.slug)),
  ABOUT_LINK.href,
  CAREERS_LINK.href,
];
