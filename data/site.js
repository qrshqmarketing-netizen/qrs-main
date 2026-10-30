// Business details used across the site: header, footer, SEO tags, assistant and map.
// Change something here and every place that shows it updates.

export const SITE_URL = 'https://qualityroofingspecialists.com';

export const BUSINESS = {
  name: 'Quality Roofing Specialists',
  legalName: 'Quality Roofing Specialists, Inc.', // the company's full name: copyright, legal pages, structured data, emails
  shortName: 'QRS',
  tagline: 'DETAIL-FIRST ROOFING',
  description:
    'Detail-first roof repair and replacement for homeowners across Southern California, licensed, bonded and insured and backed by a 10-year workmanship warranty (call for details). CSLB Lic # 1061942.',
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
// The first is the main office (BUSINESS.address), whose Google listing uses the main number (PHONE). An office with its own `phone` (its listing's) shows it with its address. `gbpUrl`: the office's Google Business Profile (schema sameAs). `image`: an optional photo for its card.
export const OFFICES = [
  // The office on N Poinsettia Pl, whose Google listing is named West Hollywood (owner, October 22 2026): its page is the West Hollywood page
  {
    name: 'West Hollywood Office', citySlug: 'west-hollywood', gbpUrl: 'https://maps.google.com/?cid=7072551311221462379', address: BUSINESS.address, geo: BUSINESS.geo, mapUrl: BUSINESS.mapUrl,
    // The Google Maps embed of this office's listing (owner, October 27 2026), shown on the West Hollywood page under the office details
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d332650.37763537234!2d-118.58677239794676!3d34.08299454132669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6c9c2483d3cee6b9%3A0x6226bff21114156b!2sQuality%20Roofing%20Specialists!5e1!3m2!1sen!2sus!4v1793117748817!5m2!1sen!2sus',
  },
  {
    name: 'Valley Office',
    citySlug: 'woodland-hills', gbpUrl: 'https://maps.google.com/?cid=2545734132360308765',
    // Its own number, as on its Google listing (owner, October 19 and 27 2026): shown with its address everywhere (office cards, footer, About,
    // its city page and its structured data) so it matches the listing; the site's main number stays PHONE
    phone: '(818) 918-3184', tel: 'tel:+18189183184', phoneIntl: '+1-818-918-3184',
    // The Google Maps embed of this office's listing (owner, October 27 2026), shown on its city page under the office details (OfficeMap.jsx)
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5192.6398992640725!2d-118.62884552427865!3d34.164730273114685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ba9d5c10bd0145%3A0x235443b49bec681d!2sQuality%20Roofing%20Specialists!5e1!3m2!1sen!2sus!4v1793117704324!5m2!1sen!2sus',
    address: { street: '22900 Ventura Blvd, Suite 124', city: 'Woodland Hills', region: 'CA', postalCode: '91364', country: 'US' },
    geo: { latitude: 34.165009, longitude: -118.626272 },
    image: '/images/woodland-hills-office.webp',
    imageAlt: 'Aerial view of the Woodland Court office building on Ventura Boulevard in Woodland Hills',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=22900+Ventura+Blvd+Suite+124+Woodland+Hills+CA+91364',
  },
  {
    name: 'Vernon Office',
    citySlug: 'vernon', gbpUrl: 'https://maps.google.com/?cid=7878802423193063666',
    // Its own number, as on its Google listing (owner, October 27 2026), shown with its address like the Valley office's
    phone: '(213) 263-5976', tel: 'tel:+12132635976', phoneIntl: '+1-213-263-5976',
    // The Google Maps embed of this office's listing (owner, October 27 2026), shown on the Vernon page under the office details
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d332650.37763537234!2d-118.58677239794676!3d34.08299454132669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21a452832eb4e363%3A0x6d57210f69e8d0f2!2sQuality%20Roofing%20Specialists!5e1!3m2!1sen!2sus!4v1793117831003!5m2!1sen!2sus',
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

// Google Analytics 4 measurement ID, loaded straight with gtag.js (app/layout.js); it replaced Google Tag Manager
// (GTM-P7Z3CMG, whose GA4 property was G-0HTXYPMNC5) in October 2026. The forms send a generate_lead event to it
// (lib/tracking.js). Only loads on the live site (see LOAD_TRACKING in lib/seo.js), same as Clarity above.
export const GA_ID = 'G-CJSKXDJCBF';

// Google Ads tag (owner, October 26 2026): configured on the same gtag.js as GA_ID (app/layout.js), under the same Analytics consent and only on
// the live site. Google's consent mode keeps ad_storage denied, so Ads measures without ad cookies (cookieless pings and modelled conversions).
export const GOOGLE_ADS_ID = 'AW-778824076';

// Home page title and description (search results + link previews). Worded after the searches that bring people to the home page in
// Search Console ("roofing contractor in Los Angeles") and after how Royal Roofing, the competitor that ranks #1 for "roofing company orange county",
// words theirs: both counties in the title, description and H1. The H1 (HOME_H1) uses the same phrase; the brand name is in the description.
export const GOOGLE_REVIEWS = { count: 269, asOf: '2026-10-15' };
// Home title and description in the voice of the gradient home page (owner, October 29 2026, after the owner's reference homepage: "Brand |
// place + service" and a short "who we are, what one team does, start with the free offer" description). The keyword "roofing contractor" and
// both counties stay in both (October 27 2026: titles without places were rolled back after calls dropped).
// "Roofer" searches (owner, October 30 2026, from Search Console, last 28 days: "roofer los angeles" 179 impressions at 12, "roofers los angeles"
// 164 at 17, "roofers in los angeles" 145 at 18, "roofer in los angeles" 140 at 11, plus licensed / best / quality roofers): the title leads with
// "Roofers in Los Angeles" and keeps "Roofing Contractor" (the home keyword) and both counties. 59 characters, no brand suffix.
export const HOME_TITLE = 'Roofers in Los Angeles & Orange County | Roofing Contractor';
export const HOME_H1 = 'Roofing Contractor in Los Angeles & Orange County';
// "Licensed roofers" for those searches; the review count answers the "best roofers" ones without claiming "best". 149 characters.
export const HOME_DESCRIPTION = `Licensed roofers in Los Angeles & Orange County: QRS is a family-owned roofing contractor with ${GOOGLE_REVIEWS.count} Google reviews. Start with a free roof evaluation.`;

// The number of Google reviews across our listings (owner, October 15 2026: 269). Update it by hand from Google now and then; it shows on the
// proof strip under every hero and in the home page's review section. No star rating is shown (not given by the owner).

// Short trust points in the bar under the hero
export const PROOF_POINTS = [
  { title: 'Permits Handled', text: 'We pull the building permits' },
  { title: `${GOOGLE_REVIEWS.count} Google Reviews`, text: 'Homes & businesses' },
  { title: '10-Year', text: 'Workmanship warranty, call for details' },
  { title: 'Roofer-Led', text: 'Inspections and estimates' },
];

// Hero annotations: the few decisive facts shown as small check marks right under a hero's buttons, next to the action they support (Hero.jsx). Only owner-
// confirmed facts. Commercial pages get their own set: a commercial roof survey has no price on the site, so it is never called free.
export const HERO_ANNOTATIONS = {
  home: ['Free roof evaluation', 'Written price before any work', '10-year workmanship warranty (call for details)', `CSLB #${BUSINESS.license}`],
  commercial: ['Roofer-led roof survey', 'Written scope and price before any work', 'Permits pulled', `CSLB #${BUSINESS.license}`],
};

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

// Google's "preferred sources" page for this site (owner, October 28 2026): a reader who picks QRS there sees our articles more often in
// Google's Top stories. Linked from the articles, the blog index and the Roofing FAQ and glossary pages (components/ui/PreferredSource.jsx).
export const PREFERRED_SOURCE_URL = 'https://www.google.com/preferences/source?q=qualityroofingspecialists.com';
