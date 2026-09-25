// Project photos for the bento gallery on each city page (/service-areas/<region>/<city>/).
//
// TEMPORARY: until projects come from the CRM, every city shows PLACEHOLDER_PROJECTS: the same stand-in photos and
// roof-type artwork, captioned by service (not by city). Swap in real local projects before launch, or set
// SHOW_PLACEHOLDER_GALLERY to false to hide the gallery on cities that don't have projects yet.
//
// Real projects go in PROJECTS, tagged with the city's slug from data/locations.js. A city with projects shows only
// its own (up to 6; the grid is designed for 6, 4, 3, 2 or 1 tiles). Each project:
//   {
//     city: 'pasadena',
//     title: 'Tile Lift & Relay',                           // the work we did
//     area: 'Bungalow Heaven',                              // optional neighborhood, shown above the title
//     image: '/images/projects/pasadena-lift-and-relay.webp', // photo in public/images/projects/
//     alt: 'Clay tile roof on a Craftsman home after a tile lift and relay',
//     href: '/tile-roofing/lift-and-relay/',               // optional: the service page the tile links to
//   }

export const PROJECTS = [];

export const SHOW_PLACEHOLDER_GALLERY = true;

// Stand-ins: `scene` is roof-type artwork (app/globals.css) for tiles without a photo; `position` crops a photo.
export const PLACEHOLDER_PROJECTS = [
  {
    title: 'Shingle Roof Replacement',
    label: 'Shingle roofing',
    image: '/images/roof-drone-palms.webp',
    alt: 'Aerial view of a dark shingle hip roof on a home with palm trees',
    position: 'center 45%',
    href: '/shingle-roofing/replacement/',
  },
  { title: 'Tile Lift & Relay', label: 'Tile roofing', scene: 'scene-tile', href: '/tile-roofing/lift-and-relay/' },
  { title: 'Flat Roof Replacement', label: 'Flat roofing', scene: 'scene-flat', href: '/flat-roofing/replacement/' },
  { title: 'Standing Seam Metal', label: 'Metal roofing', scene: 'scene-metal', href: '/metal-roofing/standing-seam/' },
  {
    title: 'HOA & Multi-Family Roofing',
    label: 'Communities',
    image: '/images/home-hero-drone-view.webp',
    alt: 'Aerial view of a neighborhood of shingle-roofed homes',
    position: 'center 40%',
    href: '/hoa-multi-family/',
  },
  { title: 'Rain Gutters', label: 'Gutters & drainage', scene: 'scene-gutter', href: '/rain-gutters/' },
];

// Every project (Projects page): the real ones when there are any, otherwise the placeholders (or nothing)
export const allProjects = () => (PROJECTS.length > 0 ? PROJECTS : SHOW_PLACEHOLDER_GALLERY ? PLACEHOLDER_PROJECTS : []);

// A city's gallery: its own projects when it has any, otherwise the placeholders (or nothing)
export function projectsFor(slug) {
  const own = PROJECTS.filter((p) => p.city === slug);
  if (own.length > 0) return own;
  return SHOW_PLACEHOLDER_GALLERY ? PLACEHOLDER_PROJECTS : [];
}
