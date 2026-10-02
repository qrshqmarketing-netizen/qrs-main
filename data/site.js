// Business details used across the site: header, footer, SEO tags, assistant and map.
// Change something here and every place that shows it updates.

export const SITE_URL = 'https://qualityroofingspecialists.com';

export const BUSINESS = {
  name: 'Quality Roofing Specialists',
  shortName: 'QRS',
  tagline: 'DETAIL-FIRST ROOFING',
  description:
    'Detail-first roof repair and replacement for homeowners across Southern California, licensed, bonded and insured and backed by a 10-year workmanship warranty. CSLB Lic # 1061942.',
  email: 'info@qualityroofingspecialists.com',
  license: '1061942', // California CSLB contractor license number
  licenseSince: '2020-01-03', // CSLB license issue date
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
  hours: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' }],
};

// The owner's mission, vision and core values: shown on the About and Careers pages, and given to the chat
// assistant and the AI files (llms.txt, llms-full.txt, OKF).
export const COMPANY = {
  belief: 'At Quality Roofing Specialists, we believe a roof is more than just a structure — it’s protection, trust and peace of mind.',
  mission: 'With passion and precision, we craft top-quality roofs that enhance homes, build trust and deliver lasting protection.',
  vision: 'As a growing company, we’ve set a bold vision: to protect 6,000 homes with quality roofing over the next 10 years.',
  values: [
    { title: 'Integrity', text: 'We do what’s right, always.' },
    { title: 'Respect', text: 'We treat clients and teammates with kindness and professionalism.' },
    { title: 'Discipline', text: 'We stay focused, committed and consistent in our work.' },
    { title: 'Accountability', text: 'We take ownership of our responsibilities and results.' },
    { title: 'Transparency', text: 'We communicate openly and honestly.' },
    { title: 'Alignment', text: 'We work together toward our shared vision and goals.' },
    { title: 'Results Orientation', text: 'We strive for excellence and measurable success.' },
  ],
};

// Offices, shown on the Service Areas page and on the city page each one sits in (citySlug, from data/locations.js).
// The first is the main office (BUSINESS.address). All answer the same phone number. `image`: an optional photo for its card.
export const OFFICES = [
  { name: 'Los Angeles Office', citySlug: 'los-angeles', address: BUSINESS.address, geo: BUSINESS.geo, mapUrl: BUSINESS.mapUrl },
  {
    name: 'Valley Office',
    citySlug: 'woodland-hills',
    address: { street: '22900 Ventura Blvd, Suite 124', city: 'Woodland Hills', region: 'CA', postalCode: '91364', country: 'US' },
    geo: { latitude: 34.165009, longitude: -118.626272 },
    image: '/images/woodland-hills-office.webp',
    imageAlt: 'Aerial view of the Woodland Court office building on Ventura Boulevard in Woodland Hills',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=22900+Ventura+Blvd+Suite+124+Woodland+Hills+CA+91364',
  },
  {
    name: 'Vernon Office',
    citySlug: 'vernon',
    address: { street: '2850 E 46th St, Unit B', city: 'Vernon', region: 'CA', postalCode: '90058', country: 'US' },
    geo: { latitude: 34.001813, longitude: -118.218411 },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=2850+E+46th+St+Unit+B+Vernon+CA+90058',
  },
];

export const PHONE = '(310) 340-1643';
export const TEL = 'tel:+13103401643';
export const PHONE_INTL = '+1-310-340-1643'; // format search engines expect

// Search engine ownership codes, copied from Google Search Console and Bing Webmaster Tools.
// Google: the first code is the one on the current WordPress site, so its Search Console property stays verified
// after the switch; the second is the owner's Search Console verification from October 2026. Each renders its own
// <meta name="google-site-verification"> tag.
// Where website leads (forms, Instant Quote, chat, AI agents) are emailed (lib/leads.js). LEADS_TO_EMAIL overrides it.
export const LEADS_EMAIL = 'scheduling@qualityroofingspecialists.com';

export const SITE_VERIFICATION = {
  google: ['SyZ2s7uoL4sqZ3pKCmqTSSx5jYHPnjFSlzjMfY2xktM', '5fisOww8_FxY7GGY_Z3-598E0O0neTwP2UyIUSuYDbU'],
  bing: '7EF115AF17F4DB7072BDE8A129257E53',
};

// Microsoft Clarity project ID (heatmaps/session recordings). Only loads on the live site (see
// LOAD_TRACKING in lib/seo.js), so previews and local dev don't add noise to the real analytics.
export const CLARITY_ID = 'ynxdd3rck6';

// Google Tag Manager container ID. Loads Google Analytics via the tags configured inside the container itself
// (checked October 2026: GA4 G-0HTXYPMNC5, plus old Universal Analytics UA-208890652-1 tags that no longer collect).
// The forms push a generate_lead event to it (lib/tracking.js).
// Only loads on the live site (see LOAD_TRACKING in lib/seo.js), same as Clarity above.
export const GTM_ID = 'GTM-P7Z3CMG';

// Home page title and description (search results + link previews)
export const HOME_TITLE = 'Roof Repair & Replacement in Southern California | Quality Roofing Specialists';
export const HOME_DESCRIPTION =
  'Roof repair & replacement in Southern California. Tile, flat & shingle roofing, free roof evaluation, 10-year workmanship warranty. Call (310) 340-1643.';

// Short trust points in the bar under the hero
export const PROOF_POINTS = [
  { title: '3 Offices', text: 'LA, the Valley & Vernon' },
  { title: 'Google Reviews', text: 'Homes & businesses' },
  { title: '10-Year', text: 'Workmanship warranty' },
  { title: 'Roofer-Led', text: 'Inspections and estimates' },
];

// Process video. Set `embed` to a YouTube embed URL like 'https://www.youtube.com/embed/VIDEO_ID'.
// Optional `poster`: a photo in public/images shown before the video plays, like '/images/video-poster.webp'.
export const PROCESS_VIDEO = { embed: '', poster: '' };

// Privacy policy page, linked from the cookie notice. Leave '' until the page exists.
export const PRIVACY_POLICY_URL = '/privacy-policy/';

// Footer social links. Leave one '' to hide that icon until you have a real profile URL for it.
export const SOCIAL = {
  facebook: 'https://www.facebook.com/QualityRoofingSpecialists/',
  instagram: '',
  linkedin: '',
  youtube: '',
};
