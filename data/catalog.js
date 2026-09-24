// How the site's pages fit together: labels, addresses, parent pages, placeholder art and the short
// descriptions used on cards. Page copy lives in data/services/, data/pages/ and data/locationPages.js
// (combined in data/content.js).

export const HOME = { label: 'Home', href: '/' };
export const RESIDENTIAL = { label: 'Residential Roofing', href: '/residential-roofing/' };
export const COMMERCIAL_LINK = { label: 'Commercial Roofing', href: '/commercial-roofing/' };
export const LOCATIONS_LINK = { label: 'Service Areas', href: '/locations/' };
export const ABOUT_LINK = { label: 'About QRS', href: '/about-us/' };
export const CAREERS_LINK = { label: 'Careers', href: '/careers/' };
export const CONTRACTORS_LINK = { label: 'Contractors', href: '/contractors/' };

// Sections with a hub page and service pages under it.
// `scenes` are placeholder art for cards (rotated); `image` is a real photo for the hub hero, when there is one.
export const GROUPS = {
  shingle: {
    key: 'shingle',
    label: 'Shingle Roofing',
    href: '/shingle-roofing/',
    parent: RESIDENTIAL,
    scenes: ['scene-shingle', 'scene-replace', 'scene-inspect'],
    image: '/images/roof-drone-palms.webp',
    imageAlt: 'Aerial view of a dark shingle hip roof on a Southern California home with palm trees',
    blurb: 'Premium shingle roofs installed to the manufacturer’s requirements, with proper ventilation and clean lines.',
  },
  tile: {
    key: 'tile',
    label: 'Tile Roofing',
    href: '/tile-roofing/',
    parent: RESIDENTIAL,
    scenes: ['scene-tile', 'scene-repair', 'scene-hoa'],
    blurb: 'Clay and concrete tile roofs repaired, re-laid over new underlayment or replaced, keeping the look you love.',
  },
  flat: {
    key: 'flat',
    label: 'Flat Roofing',
    href: '/flat-roofing/',
    parent: RESIDENTIAL,
    scenes: ['scene-flat', 'scene-commercial', 'scene-inspect'],
    blurb: 'Modified bitumen and low-slope systems planned around drainage and the way water moves across your roof.',
  },
  metal: {
    key: 'metal',
    label: 'Metal Roofing',
    href: '/metal-roofing/',
    parent: RESIDENTIAL,
    scenes: ['scene-metal', 'scene-gutter'],
    blurb: 'Standing seam metal roofs with clean lines and concealed fasteners, plus gutters that move water away.',
  },
  commercial: {
    key: 'commercial',
    label: 'Commercial Roofing',
    href: '/commercial-roofing/',
    parent: null,
    scenes: ['scene-commercial', 'scene-flat', 'scene-inspect', 'scene-tile'],
    blurb: 'Roofing for offices, retail, churches, warehouses and other commercial buildings across LA and Orange County.',
  },
};

// Stand-alone residential service pages
export const SINGLES = {
  gutters: {
    key: 'gutters',
    label: 'Rain Gutters',
    href: '/rain-gutters/',
    parent: RESIDENTIAL,
    scenes: ['scene-gutter'],
    blurb: 'Gutters and downspouts planned with your roof, so rainwater leaves the house the way it should.',
  },
  hoa: {
    key: 'hoa',
    label: 'HOA & Multi-Family',
    href: '/hoa-multi-family/',
    parent: RESIDENTIAL,
    scenes: ['scene-hoa'],
    blurb: 'Roofing for HOAs and multi-family properties, with photo-documented reports boards and managers can review.',
  },
};

// Residential roof types in menu order (for cards and the "Roofing Types" carousel)
export const RESIDENTIAL_TYPES = [GROUPS.shingle, GROUPS.tile, GROUPS.flat, GROUPS.metal, SINGLES.gutters, SINGLES.hoa];

export const typeCard = (t) => ({ title: t.label, text: t.blurb, href: t.href, scene: t.scenes[0], image: t.cardImage });

// "Roofing Types" carousel on residential pages: every other residential section
export const roofTypeCards = (excludeHref) => RESIDENTIAL_TYPES.filter((t) => t.href !== excludeHref).map(typeCard);
