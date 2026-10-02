// Joins the site structure (catalog.js) with the page copy (services/*.js, pages/*.js, locationPages.js, regionPages.js)

import {
  ABOUT_LINK,
  ACCESSIBILITY_LINK,
  BLOG_LINK,
  blogPath,
  CAREERS_LINK,
  CONTACT_LINK,
  CONTRACTORS_LINK,
  GROUPS,
  HOME,
  LOCATIONS_LINK,
  PRIVACY_LINK,
  PROGRAMS,
  PROJECTS_LINK,
  RESIDENTIAL,
  REVIEWS_LINK,
  SERVICE_HUBS,
  SINGLES,
  TERMS_LINK,
} from './catalog';
import { PUBLISHED_POSTS } from './blog/posts';
import { HOLLYWOOD_HILLS_PROJECT } from './pages/hollywood-hills-project';
import { MID_WILSHIRE_PROJECT } from './pages/mid-wilshire-project';
import { PANORAMA_CITY_PROJECT } from './pages/panorama-city-project';
import { SAN_PEDRO_FULL_ROOF_PROJECT } from './pages/san-pedro-full-roof-project';
import { SAN_PEDRO_PROJECT } from './pages/san-pedro-project';
import { cityPath, LOCATIONS, REGIONS, regionPath } from './locations';
import { COMMERCIAL_CONTENT } from './services/commercial';
import { COMMERCIAL_SERVICES } from './services/commercialServices';
import { FLAT_CONTENT } from './services/flat';
import { EMERGENCY_ROOF_REPAIR, ROOF_FINANCING, ROOF_INSPECTION, ROOF_MAINTENANCE_PLANS } from './services/programs';
import { ROOF_REPAIR_HUB, ROOF_REPLACEMENT_HUB } from './services/serviceHubs';
import { SHINGLE_CONTENT } from './services/shingle';
import { HOA_MULTI_FAMILY, RAIN_GUTTERS } from './services/specialty';
import { TILE_CONTENT } from './services/tile';

// Sections: { ...structure, hub, services }. Commercial also has serviceTypes (repair, replacement, maintenance)
// next to its building-type pages; both live at /commercial-roofing/<slug>/.
export const SHINGLE = { ...GROUPS.shingle, ...SHINGLE_CONTENT };
export const TILE = { ...GROUPS.tile, ...TILE_CONTENT };
export const FLAT = { ...GROUPS.flat, ...FLAT_CONTENT };
export const COMMERCIAL = { ...GROUPS.commercial, ...COMMERCIAL_CONTENT, serviceTypes: COMMERCIAL_SERVICES };
export const SECTIONS = [SHINGLE, TILE, FLAT, COMMERCIAL];

// Stand-alone pages: { ...structure, page }
export const GUTTERS = { ...SINGLES.gutters, page: RAIN_GUTTERS };
export const HOA = { ...SINGLES.hoa, page: HOA_MULTI_FAMILY };
export const EMERGENCY = { ...PROGRAMS.emergency, page: EMERGENCY_ROOF_REPAIR };
export const INSPECTION = { ...PROGRAMS.inspection, page: ROOF_INSPECTION };
export const MAINTENANCE_PLANS = { ...PROGRAMS.plans, page: ROOF_MAINTENANCE_PLANS };
export const FINANCING = { ...PROGRAMS.financing, page: ROOF_FINANCING };
// GUTTERS is left out while Rain Gutters is hidden (app/residential-roofing/rain-gutters/page.js redirects)
export const SINGLE_PAGES = [HOA, EMERGENCY, INSPECTION, MAINTENANCE_PLANS, FINANCING];

// Service-first hubs: { ...structure, hub }
export const REPAIR_HUB = { ...SERVICE_HUBS.repair, hub: ROOF_REPAIR_HUB };
export const REPLACEMENT_HUB = { ...SERVICE_HUBS.replacement, hub: ROOF_REPLACEMENT_HUB };
export const SERVICE_HUB_PAGES = [REPAIR_HUB, REPLACEMENT_HUB];
// The service-first hub (/roof-repair/ or /roof-replacement/) that lists a page as one of its cards, if any
export const hubFor = (href) => SERVICE_HUB_PAGES.find((h) => h.cards.includes(href));

// A section's pages: building types / services first, then (commercial) the service types
export const sectionPages = (section) => [...section.services, ...(section.serviceTypes || [])];
export const serviceHref = (section, service) => `${section.href}${service.slug}/`;
export const findService = (section, slug) => sectionPages(section).find((s) => s.slug === slug);

// Breadcrumb trails
export const sectionCrumbs = (section) => [HOME, ...(section.parent ? [section.parent] : []), { label: section.label, href: section.href }];
// A service page's own crumb uses its name (the H1 without the program brand, e.g. "Shingle Roof Repair"), not its
// short menu label ("Roof Repairs"), so it doesn't read like the /roof-repair/ hub in search results
const crumbLabel = (service) => service.title.split(' · ')[0];
export const serviceCrumbs = (section, service) => [...sectionCrumbs(section), { label: crumbLabel(service), href: serviceHref(section, service) }];
export const singleCrumbs = (single) => [HOME, ...(single.parent ? [single.parent] : []), { label: single.label, href: single.href }];

// Cards for a list of a section's pages (placeholder art rotates until real photos are added)
const cardsFor = (section, list) =>
  list.map((s, i) => ({ title: s.title, text: s.card, href: serviceHref(section, s), scene: section.scenes[i % section.scenes.length], image: s.image }));
export const serviceCards = (section) => cardsFor(section, section.services);
export const serviceTypeCards = (section) => cardsFor(section, section.serviceTypes || []);

// A card for any service page by its address (used by the service-first hubs)
const CARDS = new Map([
  ...SECTIONS.flatMap((s) => [...serviceCards(s), ...serviceTypeCards(s)].map((c) => [c.href, c])),
  ...SINGLE_PAGES.map((p) => [p.href, { title: p.page.title, text: p.page.card, href: p.href, scene: p.scenes[0], image: p.page.image }]),
]);
export const cardFor = (href) => CARDS.get(href);

// Page names, used for "Related services" links
const LABELS = new Map([
  [RESIDENTIAL.href, RESIDENTIAL.label],
  [LOCATIONS_LINK.href, LOCATIONS_LINK.label],
  [ABOUT_LINK.href, ABOUT_LINK.label],
  [CAREERS_LINK.href, CAREERS_LINK.label],
  [CONTRACTORS_LINK.href, 'Contractor Partnerships'],
  [CONTACT_LINK.href, CONTACT_LINK.label],
  ...SECTIONS.flatMap((s) => [[s.href, s.label], ...sectionPages(s).map((svc) => [serviceHref(s, svc), svc.title])]),
  ...SINGLE_PAGES.map((p) => [p.href, p.page.title]),
  ...SERVICE_HUB_PAGES.map((h) => [h.href, h.hub.hero.heading]),
  ...REGIONS.map((r) => [regionPath(r.slug), `${r.name} Roofing`]),
  ...LOCATIONS.map((l) => [cityPath(l.slug), `${l.city} Roofing`]),
]);
export const relatedLinks = (hrefs = []) => hrefs.filter((href) => LABELS.has(href)).map((href) => ({ href, label: LABELS.get(href) }));

// Every page address (for the sitemap)
export const ALL_PATHS = [
  '/',
  RESIDENTIAL.href,
  ...SERVICE_HUB_PAGES.map((h) => h.href),
  ...SECTIONS.flatMap((s) => [s.href, ...sectionPages(s).map((svc) => serviceHref(s, svc))]),
  ...SINGLE_PAGES.map((p) => p.href),
  CONTRACTORS_LINK.href,
  LOCATIONS_LINK.href,
  ...REGIONS.flatMap((r) => [regionPath(r.slug), ...LOCATIONS.filter((l) => l.region === r.slug).map((l) => cityPath(l.slug))]),
  PROJECTS_LINK.href,
  MID_WILSHIRE_PROJECT.path,
  SAN_PEDRO_PROJECT.path,
  SAN_PEDRO_FULL_ROOF_PROJECT.path,
  HOLLYWOOD_HILLS_PROJECT.path,
  PANORAMA_CITY_PROJECT.path,
  REVIEWS_LINK.href,
  // The blog index is listed once it has a published post (until then it's a "coming soon" page, kept out of search)
  ...(PUBLISHED_POSTS.length > 0 ? [BLOG_LINK.href] : []),
  ...PUBLISHED_POSTS.map((p) => blogPath(p.slug)),
  ABOUT_LINK.href,
  CAREERS_LINK.href,
  CONTACT_LINK.href,
  PRIVACY_LINK.href,
  TERMS_LINK.href,
  ACCESSIBILITY_LINK.href,
];
