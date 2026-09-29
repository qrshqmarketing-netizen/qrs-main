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
//   }
// A tile with a photo opens it in the full-screen gallery (ProjectLightbox); tiles without one just show the
// roof-type artwork below and aren't clickable.

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
  { title: 'Standing Seam Metal', label: 'Metal roofing', scene: 'scene-metal' },
  {
    title: 'HOA & Multi-Family Roofing',
    label: 'Communities',
    image: '/images/home-hero-drone-view.webp',
    alt: 'Aerial view of a neighborhood of shingle-roofed homes',
    position: 'center 40%',
  },
  { title: 'Rain Gutters', label: 'Gutters & drainage', scene: 'scene-gutter' },
];

// Every project (Projects page): real projects first, then the placeholders to round out the gallery
// (ProjectGallery's `all` mode splits any length into full-sized bento grids, so this can grow freely)
export const allProjects = () => [...PROJECTS, ...(SHOW_PLACEHOLDER_GALLERY ? PLACEHOLDER_PROJECTS : [])];

// A city's gallery: its own projects when it has any, otherwise the placeholders (or nothing)
export function projectsFor(slug) {
  const own = PROJECTS.filter((p) => p.city === slug);
  if (own.length > 0) return own;
  return SHOW_PLACEHOLDER_GALLERY ? PLACEHOLDER_PROJECTS : [];
}
