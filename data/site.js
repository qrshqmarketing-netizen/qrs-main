// Business details used across the site: header, footer, SEO tags, assistant and map.
// Change something here and every place that shows it updates.

export const SITE_URL = 'https://qualityroofingspecialists.com';

export const BUSINESS = {
  name: 'Quality Roofing Specialists',
  shortName: 'QRS',
  tagline: 'DETAIL-FIRST ROOFING',
  description:
    'Detail-first roof repair and replacement for homeowners across Los Angeles and Orange County, backed by a lifetime workmanship warranty. CSLB Lic # 1061942.',
  email: 'info@qualityroofingspecialists.com',
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

export const PHONE = '(310) 340-1643';
export const TEL = 'tel:+13103401643';
export const PHONE_INTL = '+1-310-340-1643'; // format search engines expect

// Home page title and description (search results + link previews)
export const HOME_TITLE = 'Roof Repair & Replacement in Los Angeles | Quality Roofing Specialists';
export const HOME_DESCRIPTION =
  'Roof repair & replacement in Los Angeles & Orange County. Tile, flat & shingle roofing, $199 Roof Check, lifetime workmanship warranty. Call (310) 340-1643.';

// Short trust points in the bar under the hero
export const PROOF_POINTS = [
  { title: '30+ years', text: 'Roofing experience' },
  { title: 'Detail-first', text: 'Clear scope. Clean execution.' },
  { title: 'LA + OC', text: 'Local service area' },
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
