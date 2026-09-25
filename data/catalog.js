// How the site's pages fit together: labels, addresses, parent pages, placeholder art and the short
// descriptions used on cards. Page copy lives in data/services/, data/pages/ and data/locationPages.js
// (combined in data/content.js).

export const HOME = { label: 'Home', href: '/' };
export const RESIDENTIAL = { label: 'Residential Roofing', href: '/residential-roofing/' };
export const COMMERCIAL_LINK = { label: 'Commercial Roofing', href: '/commercial-roofing/' };
export const LOCATIONS_LINK = { label: 'Service Areas', href: '/service-areas/' };
export const ABOUT_LINK = { label: 'About QRS', href: '/about-us/' };
export const CAREERS_LINK = { label: 'Careers', href: '/careers/' };
export const CONTRACTORS_LINK = { label: 'Contractors', href: '/contractors/' };
export const CONTACT_LINK = { label: 'Contact Us', href: '/contact-us/' };
export const REVIEWS_LINK = { label: 'Reviews', href: '/reviews/' };
export const PROJECTS_LINK = { label: 'Projects', href: '/projects/' };
export const BLOG_LINK = { label: 'Roofing Blog', href: '/blog/' };
export const blogPath = (slug) => `/blog/${slug}/`;
export const PRIVACY_LINK = { label: 'Privacy Policy', href: '/privacy-policy/' };
export const TERMS_LINK = { label: 'Terms & Conditions', href: '/terms-and-conditions/' };

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

// Stand-alone service pages for homes and commercial buildings alike (copy: data/services/programs.js)
export const PROGRAMS = {
  emergency: { key: 'emergency', label: 'Emergency & Storm Damage', href: '/emergency-roof-repair/', parent: null, scenes: ['scene-repair'] },
  plans: { key: 'plans', label: 'Maintenance Plans', href: '/roof-maintenance-plans/', parent: null, scenes: ['scene-inspect'] },
  financing: { key: 'financing', label: 'Financing', href: '/financing/', parent: null, scenes: ['scene-replace'] },
};

// Service-first hub pages (copy: data/services/serviceHubs.js). cards: the pages each hub links to, in order.
export const SERVICE_HUBS = {
  repair: {
    key: 'repair',
    label: 'Roof Repair',
    href: '/roof-repair/',
    scenes: ['scene-repair'],
    cards: ['/shingle-roofing/repairs/', '/tile-roofing/repairs/', '/flat-roofing/repairs/', '/tile-roofing/lift-and-relay/', '/emergency-roof-repair/', '/commercial-roofing/repair/'],
  },
  replacement: {
    key: 'replacement',
    label: 'Roof Replacement',
    href: '/roof-replacement/',
    scenes: ['scene-replace'],
    cards: ['/shingle-roofing/replacement/', '/tile-roofing/replacement/', '/flat-roofing/replacement/', '/tile-roofing/lift-and-relay/', '/metal-roofing/standing-seam/', '/commercial-roofing/replacement/'],
  },
  inspection: {
    key: 'inspection',
    label: 'Roof Inspection',
    href: '/roof-inspection/',
    scenes: ['scene-inspect'],
    cards: ['/shingle-roofing/inspection/', '/tile-roofing/inspection/', '/flat-roofing/inspection/', '/roof-maintenance-plans/', '/commercial-roofing/maintenance/', '/emergency-roof-repair/'],
  },
};

// Residential roof types in menu order (for cards and the "Roofing Types" carousel)
export const RESIDENTIAL_TYPES = [GROUPS.shingle, GROUPS.tile, GROUPS.flat, GROUPS.metal, SINGLES.gutters, SINGLES.hoa];

export const typeCard = (t) => ({ title: t.label, text: t.blurb, href: t.href, scene: t.scenes[0], image: t.cardImage });

// "Roofing Types" carousel on residential pages: every other residential section
export const roofTypeCards = (excludeHref) => RESIDENTIAL_TYPES.filter((t) => t.href !== excludeHref).map(typeCard);
