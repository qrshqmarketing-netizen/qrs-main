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
export const ACCESSIBILITY_LINK = { label: 'Accessibility Statement', href: '/accessibility-statement/' };

// Sections with a hub page and service pages under it.
// `scenes` are placeholder art for cards (rotated); `image` is a real photo for the hub hero, when there is one.
export const GROUPS = {
  shingle: {
    key: 'shingle',
    label: 'Shingle Roofing',
    href: '/residential-roofing/shingle-roofing/',
    parent: RESIDENTIAL,
    scenes: ['scene-shingle', 'scene-replace', 'scene-inspect'],
    image: '/images/shingle-roof-completed-drone-view.webp',
    imageAlt: 'Aerial view of a finished shingle roof on a Southern California home',
    cardImage: '/images/shingle-roof-grey-roofing-services-card.webp',
    blurb: 'Premium shingle roofs installed to the manufacturer’s requirements, with proper ventilation and clean lines.',
  },
  tile: {
    key: 'tile',
    label: 'Tile Roofing',
    href: '/residential-roofing/tile-roofing/',
    parent: RESIDENTIAL,
    scenes: ['scene-tile', 'scene-repair', 'scene-hoa'],
    cardImage: '/images/tile-roof-replacement.webp',
    blurb: 'Clay, concrete and slate tile roofs repaired, re-laid over new underlayment or replaced, keeping the look you love.',
  },
  flat: {
    key: 'flat',
    label: 'Flat Roofing',
    href: '/residential-roofing/flat-roofing/',
    parent: RESIDENTIAL,
    scenes: ['scene-flat', 'scene-commercial', 'scene-inspect'],
    cardImage: '/images/flat-roof-torch-down-drone-view-services.webp',
    blurb: 'Modified bitumen and low-slope systems planned around drainage and the way water moves across your roof.',
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
    href: '/residential-roofing/rain-gutters/',
    parent: RESIDENTIAL,
    scenes: ['scene-gutter'],
    blurb: 'Gutters and downspouts planned with your roof, so rainwater leaves the house the way it should.',
  },
  hoa: {
    key: 'hoa',
    label: 'HOA & Multi-Family',
    href: '/residential-roofing/hoa-multi-family/',
    parent: RESIDENTIAL,
    scenes: ['scene-hoa'],
    blurb: 'Roofing for HOAs and multi-family properties, with photo-documented reports boards and managers can review.',
  },
};

// Stand-alone service pages for homes and commercial buildings alike (copy: data/services/programs.js)
export const PROGRAMS = {
  emergency: { key: 'emergency', label: 'Emergency & Storm Damage', href: '/emergency-roof-repair/', parent: null, scenes: ['scene-repair'] },
  inspection: { key: 'inspection', label: 'Roof Inspection', href: '/roof-inspection/', parent: null, scenes: ['scene-inspect'] },
  plans: { key: 'plans', label: 'Roof Maintenance Plans', href: '/roof-maintenance-plans/', parent: null, scenes: ['scene-inspect'] },
  financing: { key: 'financing', label: 'Roof Financing', href: '/roof-financing/', parent: null, scenes: ['scene-replace'] },
};

// Service-first hub pages (copy: data/services/serviceHubs.js). cards: the pages each hub links to, in order.
export const SERVICE_HUBS = {
  repair: {
    key: 'repair',
    label: 'Roof Repair',
    href: '/roof-repair/',
    scenes: ['scene-repair'],
    cards: ['/residential-roofing/shingle-roofing/repair/', '/residential-roofing/tile-roofing/repair/', '/residential-roofing/flat-roofing/repair/', '/residential-roofing/tile-roofing/lift-and-relay/', '/emergency-roof-repair/', '/commercial-roofing/repair/'],
  },
  replacement: {
    key: 'replacement',
    label: 'Roof Replacement',
    href: '/roof-replacement/',
    scenes: ['scene-replace'],
    cards: ['/residential-roofing/shingle-roofing/replacement/', '/residential-roofing/tile-roofing/replacement/', '/residential-roofing/flat-roofing/replacement/', '/residential-roofing/tile-roofing/lift-and-relay/', '/commercial-roofing/replacement/'],
  },
};

// Residential roof types in menu order (for cards and the "Roofing Types" carousel)
export const RESIDENTIAL_TYPES = [GROUPS.shingle, GROUPS.flat, GROUPS.tile];

export const typeCard = (t) => ({ title: t.label, text: t.blurb, href: t.href, scene: t.scenes[0], image: t.cardImage });

// "Roofing Types" carousel on residential pages: every other residential section
export const roofTypeCards = (excludeHref) => RESIDENTIAL_TYPES.filter((t) => t.href !== excludeHref).map(typeCard);
