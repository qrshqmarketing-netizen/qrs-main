// Business details used across the site: header, footer, SEO tags, assistant and map.
// Change something here and every place that shows it updates.

export const SITE_URL = 'https://qualityroofingspecialists.com';

export const BUSINESS = {
  name: 'Quality Roofing Specialists',
  shortName: 'QRS',
  tagline: 'DETAIL-FIRST ROOFING',
  description:
    'Detail-first roof repair and replacement for homeowners across Southern California, backed by a lifetime workmanship warranty. CSLB Lic # 1061942.',
  email: 'info@qualityroofingspecialists.com',
  license: '1061942', // California CSLB contractor license number
  priceRange: '$$',
  address: {
    street: '1444 N Poinsettia Pl, Unit 308',
    city: 'Los Angeles',
    region: 'CA',
    postalCode: '90046',
    country: 'US',
  },
  geo: { latitude: 34.0971, longitude: -118.3483 },
  mapUrl: 'https://goo.gl/maps/8iyLP5euPPcdEa9L7',
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '19:00' },
    { days: ['Sunday'], opens: '10:00', closes: '17:00' },
  ],
};

// Offices, shown on the Service Areas page and on the city page each one sits in (citySlug, from data/locations.js).
// The first is the main office (BUSINESS.address). Both answer the same phone number.
export const OFFICES = [
  { name: 'Los Angeles Office', citySlug: 'los-angeles', address: BUSINESS.address, geo: BUSINESS.geo, mapUrl: BUSINESS.mapUrl },
  {
    name: 'Valley Office',
    citySlug: 'woodland-hills',
    address: { street: '22900 Ventura Blvd, Suite 124', city: 'Woodland Hills', region: 'CA', postalCode: '91364', country: 'US' },
    geo: { latitude: 34.165009, longitude: -118.626272 },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=22900+Ventura+Blvd+Suite+124+Woodland+Hills+CA+91364',
  },
];

export const PHONE = '(310) 340-1643';
export const TEL = 'tel:+13103401643';
export const PHONE_INTL = '+1-310-340-1643'; // format search engines expect

// Search engine ownership codes, copied from Google Search Console and Bing Webmaster Tools.
// The Google code is the one on the current WordPress site, so Search Console stays verified after the switch.
export const SITE_VERIFICATION = {
  google: 'SyZ2s7uoL4sqZ3pKCmqTSSx5jYHPnjFSlzjMfY2xktM',
  bing: '',
};

// Home page title and description (search results + link previews)
export const HOME_TITLE = 'Roof Repair & Replacement in Southern California | Quality Roofing Specialists';
export const HOME_DESCRIPTION =
  'Roof repair & replacement in Southern California. Tile, flat & shingle roofing, $199 Roof Check, lifetime workmanship warranty. Call (310) 340-1643.';

// Short trust points in the bar under the hero
export const PROOF_POINTS = [
  { title: '30+ years', text: 'Roofing experience' },
  { title: 'Detail-first', text: 'Clear scope. Clean execution.' },
  { title: 'SoCal', text: 'Local service area' },
  { title: 'Lifetime', text: 'Workmanship warranty' },
];

// Process video. Set `embed` to a YouTube embed URL like 'https://www.youtube.com/embed/VIDEO_ID'.
// Optional `poster`: a photo in public/images shown before the video plays, like '/images/video-poster.webp'.
export const PROCESS_VIDEO = { embed: '', poster: '' };

// Footer social links. Replace '#' with your real profile URLs.
export const SOCIAL = {
  facebook: '#',
  instagram: '#',
  linkedin: '#',
  youtube: '#',
};
