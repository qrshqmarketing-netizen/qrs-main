// Permanent redirects from the old WordPress site's addresses to their new pages (used by next.config.mjs).
// Old addresses that match a new page exactly (/contact-us/, /financing/, /service-areas/la-county/glendale/, …)
// need no redirect and aren't listed. Plain data with no imports, so next.config.mjs can load it directly.
// Cities without their own page go to the nearest city page when they border it, otherwise to their region page.

const LA = '/service-areas/la-county/';
const OC = '/service-areas/orange-county/';
const city = (region, slug) => `${region}${slug}/`;

// Blog posts moved from the site root to /blog/<same slug>/
export const BLOG_SLUGS = [
  'flat-roof-repair-contractors',
  'commercial-roof-repair-services',
  'signs-of-storm-damage',
  'signs-of-a-leaky-roof',
  'roof-coating-applications',
  'storm-damage-roof-repair-boost-home',
  'guide-to-roof-repair-vs-replacement',
  'how-to-repair-a-tiled-roof',
  '5-temporary-roof-repair-options',
  '5-winter-roof-repair-tips',
  'asphalt-shingle-roof-repair',
  '6-diy-roof-repair-tips',
  '5-tips-roof-maintenance',
  'how-to-keep-your-roof-cool',
  '5-signs-damaged-asphalt-shingle-roof',
  'tile-roofs-frequently-asked-questions',
  'how-to-prolong-the-life-of-your-roof',
  '5-musts-reliable-roofing-specialist',
  'wooden-roofing-pros-cons',
  'how-to-remove-mold-from-roof',
  'solar-panel-tiles-are-they-worth-it',
  'how-often-should-you-clean-your-gutters',
  '5-types-of-roofing',
  'asphalt-shingles-faqs',
];

export const REDIRECTS = [
  // Service pages
  ['/residential-roofing-services/', '/residential-roofing/'],
  ['/residential-roofing-services/roof-repair/', '/roof-repair/'],
  ['/residential-roofing-services/roof-replacement/', '/roof-replacement/'],
  ['/residential-roofing-services/roof-inspection/', '/roof-inspection/'],
  ['/residential-roofing-services/new-roof-installation/', '/roof-replacement/'],
  ['/residential-roofing-services/roof-storm-damage/', '/emergency-roof-repair/'],
  ['/residential-roofing-services/gutter-replacement/', '/rain-gutters/'],
  ['/residential-roofing-services/attic-ventilation/', '/shingle-roofing/replacement/'],
  ['/commercial-roofing-services/', '/commercial-roofing/'],
  ['/commercial-roofing-services/commercial-roof-repair/', '/commercial-roofing/repair/'],
  ['/commercial-roofing-services/commercial-roof-installation/', '/commercial-roofing/replacement/'],
  ['/commercial-roofing-services/commercial-roof-inspection/', '/commercial-roofing/maintenance/'],
  ['/commercial-roofing-contractor-los-angeles/', '/commercial-roofing/'],
  ['/los-angeles-commercial-roof-replacement/', '/commercial-roofing/replacement/'],
  ['/roof-insurance-claims/', '/emergency-roof-repair/'],
  ['/instant-quote-roof-replacement/', '/roof-replacement/'],
  ['/coupons-special-offers/', '/roof-inspection/'],
  ['/free-estimate/', '/contact-us/'],
  ['/thank-you-free-estimate/', '/contact-us/'],
  ['/thank-you-contact-us/', '/contact-us/'],
  ['/locations.kml', '/service-areas/'],

  // Blog posts
  ...BLOG_SLUGS.map((slug) => [`/${slug}/`, `/blog/${slug}/`]),

  // City pages at the site root
  ['/huntington-beach/', city(OC, 'huntington-beach')],
  ['/woodland-hills-roofing-specialists/', city(LA, 'woodland-hills')],
  ['/vernon-roofing-specialists/', LA],

  // LA County: old city pages → our city page (same city or a bordering one) or the region page
  ...[
    ['los-angeles-roofing-contractor', 'los-angeles'],
    ['long-beach-roofing-contractor', 'long-beach'],
    ['pasadena-roof-repairs', 'pasadena'],
    ['roofing-services-in-burbank', 'burbank'],
    ['west-hollywood', 'los-angeles'],
    ['beverly-hills', 'los-angeles'],
    ['culver-city', 'los-angeles'],
    ['inglewood', 'los-angeles'],
    ['el-segundo', 'los-angeles'],
    ['malibu-roof-repair-services', 'santa-monica'],
    ['south-pasadena', 'pasadena'],
    ['sierra-madre', 'pasadena'],
    ['arcadia', 'pasadena'],
    ['roof-inspection-services-in-san-marino', 'pasadena'],
    ['roofing-services-in-la-canada-flintridge', 'glendale'],
    ['calabasas', 'woodland-hills'],
    ['agoura-hills', 'woodland-hills'],
    ['westlake-village', 'woodland-hills'],
    ['signal-hill', 'long-beach'],
    ['lakewood-new-roof-installation', 'long-beach'],
    ['lomita-gutter-replacement-services', 'torrance'],
    ['redondo-beach-gutter-replacement-services', 'torrance'],
    ['manhattan-beach-roof-inspections', 'torrance'],
    ['palos-verdes-estates-roofing', 'torrance'],
    ['rancho-palos-verdes-residential-roofing-services', 'torrance'],
    ['roof-repairs-in-rolling-hills', 'torrance'],
    ['roof-installations-in-rolling-hills-estates', 'torrance'],
    ['gardena', 'torrance'],
  ].map(([old, slug]) => [`${LA}${old}/`, city(LA, slug)]),
  ...[
    'alhambra', 'artesia', 'azusa', 'baldwin-park', 'bell-gardens', 'bell', 'bellflower', 'bradbury', 'cerritos', 'commerce',
    'commercial-roofing-services-in-montebello', 'commercial-roofing-services-in-san-fernando', 'compton', 'covina', 'cudahy',
    'downey', 'duarte', 'el-monte', 'la-mirada-roof-repair-services', 'la-puente-roof-replacement-services',
    'la-verne-wind-damage-restoration', 'lancaster-commercial-roofing-services', 'lynwood-commercial-roof-installation',
    'monterey-park', 'norwalk-roofing', 'paramount-commercial-roofing-services', 'pico-rivera-new-roof-installation',
    'pomona-roof-inspection-services', 'residential-roof-repairs-in-san-gabriel', 'residential-roofing-services-in-monrovia',
    'roof-installation-in-irwindale', 'roof-replacement-services-in-rosemead', 'roofing-services-in-maywood',
    'roofing-services-in-san-dimas', 'santa-clarita', 'santa-fe-springs', 'south-el-monte', 'south-gate', 'temple-city',
    'walnut', 'whittier',
  ].map((old) => [`${LA}${old}/`, LA]),
  [`${LA}la-habra-roofing/`, OC],

  // Orange County
  ...[
    ['costa-mesa', 'newport-beach'],
    ['fountain-valley', 'huntington-beach'],
    ['westminster', 'huntington-beach'],
    ['midway-city', 'huntington-beach'],
    ['fullerton', 'anaheim'],
    ['placentia', 'anaheim'],
    ['orange-roofing', 'santa-ana'],
    ['lake-forest', 'irvine'],
  ].map(([old, slug]) => [`${OC}${old}/`, city(OC, slug)]),
  [`${OC}lawndale/`, city(LA, 'torrance')],
  [`${OC}los-alamitos/`, city(LA, 'long-beach')],
  ...['brea', 'capistrano-beach', 'cypress', 'foothill-ranch', 'la-habra', 'la-palma', 'ladera-ranch'].map((old) => [`${OC}${old}/`, OC]),
];
