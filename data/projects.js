// Project photos for the gallery on each city page (/service-areas/<region>/<city>/). Only real projects show, and only ones in or near that city
// (projectsNear below: a project is matched by its city tag, or by its project page's ZIP code pin); a city with none nearby has no gallery.
//
// Projects with their own page need nothing here: add them to PROJECT_PAGES (data/pages/projects.js) with a `geo` pin and they appear on the
// pages of the cities within 12 miles. Photo-only projects go in PROJECTS, tagged with the city's slug from data/locations.js (up to 6 show). Each project:
//   {
//     city: 'pasadena',
//     title: 'Tile Lift & Relay',                           // the work we did
//     area: 'Bungalow Heaven',                              // optional neighborhood, shown above the title
//     image: '/images/projects/pasadena-lift-and-relay/photo-1.webp', // photo in public/images/projects/<project-folder>/
//     alt: 'Clay tile roof on a Craftsman home after a tile lift and relay',
//   }
// A tile with a photo opens it in the full-screen gallery (ProjectLightbox); tiles without one just show the
// roof-type artwork below and aren't clickable.

import { findCity } from './locations';
import { PROJECT_PAGES } from './pages/projects';

export const PROJECTS = [
  {
    city: 'vernon',
    title: 'Shingle Roof Replacement',
    image: '/images/vernon-2.webp',
    alt: 'Aerial view of a shingle roof tear-off in progress, with new materials staged on the roof',
  },
  {
    city: 'vernon',
    title: 'Shingle Roof Replacement',
    image: '/images/vernon-1.webp',
    alt: 'Aerial view of a finished shingle roof',
  },
  {
    city: 'vernon',
    title: 'Tile Roof Replacement',
    image: '/images/vernon-4.webp',
    alt: 'Close-up of a roofer installing new concrete tile over fresh underlayment',
  },
  {
    city: 'vernon',
    title: 'Tile Roof Replacement',
    image: '/images/vernon-5.webp',
    alt: 'Aerial view of a boom truck delivering roof tile during a reroof',
  },
  {
    title: 'Shingle Roof Installation',
    label: 'Shingle roofing',
    image: '/images/shingle-roof-installation-underlayment.webp',
    alt: 'Roofers installing felt underlayment during a shingle roof installation, with materials staged on the roof',
  },
  {
    title: 'Shingle Roof Replacement',
    label: 'Shingle roofing',
    image: '/images/shingle-roof-repair-ridge-finish.webp',
    alt: 'Aerial view of a nearly finished light grey shingle roof, with a roofer working near the ridge',
  },
  {
    title: 'Shingle Roof Care',
    label: 'Shingle roofing',
    image: '/images/shingle-roof-care-multi-family.webp',
    alt: 'Aerial view of a shingle roof on a Tudor-style multi-family building, alongside an adjoining flat roof',
  },
  {
    title: 'Shingle Roof Inspection',
    label: 'Shingle roofing',
    image: '/images/shingle-roof-inspection-overhead.webp',
    alt: 'Aerial overhead view of a finished dark grey shingle roof',
  },
];

export const SHOW_PLACEHOLDER_GALLERY = true;

// Stand-ins: `scene` is roof-type artwork (app/globals.css) for tiles without a photo; `position` crops a photo.
export const PLACEHOLDER_PROJECTS = [
  {
    title: 'Shingle Roof Replacement',
    label: 'Shingle roofing',
    image: '/images/roof-drone-palms.webp',
    alt: 'Aerial view of a dark shingle hip roof on a home with palm trees',
    position: 'center 45%',
  },
  { title: 'Tile Lift & Relay', label: 'Tile roofing', scene: 'scene-tile' },
  { title: 'Flat Roof Replacement', label: 'Flat roofing', scene: 'scene-flat' },
  {
    title: 'HOA & Multi-Family Roofing',
    label: 'Communities',
    image: '/images/home-hero-drone-view.webp',
    alt: 'Aerial view of a neighborhood of shingle-roofed homes',
    position: 'center 40%',
  },
];

// Every project (Projects page): real projects first, then the placeholders to round out the gallery
// (ProjectGallery's `all` mode splits any length into full-sized bento grids, so this can grow freely)
export const allProjects = () => [...PROJECTS, ...(SHOW_PLACEHOLDER_GALLERY ? PLACEHOLDER_PROJECTS : [])];

// The gallery on a city page: only real projects in or near that city, never stand-ins. A project counts when it is tagged with the city
// (`city` above), or when its own page's pin (`geo`: the ZIP code's center, the same pin as on the Projects map) is within NEAR_MI miles of the
// city's center, nearest first, up to 6. Returns { projects, local }: `local` is true when at least one project is in the city itself (tagged, or
// its place names the city), so the page can say "in" instead of "near". No projects nearby: an empty list, and the gallery isn't shown.
export const NEAR_MI = 12;
const milesBetween = ([lat1, lng1], [lat2, lng2]) => {
  const rad = (d) => (d * Math.PI) / 180;
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lng2 - lng1) / 2) ** 2;
  return 3958.8 * 2 * Math.asin(Math.sqrt(a));
};

export function projectsNear(slug) {
  const center = findCity(slug);
  if (!center) return { projects: [], local: false };
  const tagged = PROJECTS.filter((p) => p.city === slug && p.image);
  const nearby = PROJECT_PAGES.map((page) => ({ page, miles: page.geo ? milesBetween([center.lat, center.lng], page.geo) : Infinity }))
    .filter(({ page, miles }) => miles <= NEAR_MI || page.place?.includes(center.city))
    .sort((a, b) => a.miles - b.miles)
    .map(({ page }) => ({ title: page.title, caption: (page.place || page.title).replace(/,?\s*CA\b/, ''), image: page.image, alt: page.imageAlt, href: page.path, place: page.place }));
  const projects = [...tagged, ...nearby].slice(0, 6);
  return { projects, local: tagged.length > 0 || nearby.some((p) => p.place?.includes(center.city)) };
}
