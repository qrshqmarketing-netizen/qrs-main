// Permanent redirects from the old WordPress site's addresses to their new pages (used by next.config.mjs).
// Old addresses that match a new page exactly (/contact-us/, /service-areas/la-county/glendale/, …)
// need no redirect and aren't listed. Plain data with no imports, so next.config.mjs can load it directly.
// Cities without their own page go to the nearest city page when they border it, otherwise to their region page.

const LA = '/service-areas/la-county/';
const OC = '/service-areas/orange-county/';
const city = (region, slug) => `${region}${slug}/`;

const R = '/residential-roofing/';

// Retired WordPress blog posts (at the site root and under /blog/) go to the page that now covers the same topic.
export const BLOG_REDIRECTS = {
  'flat-roof-repair-contractors': `${R}flat-roofing/repair/`,
  'commercial-roof-repair-services': '/commercial-roofing/repair/',
  'signs-of-storm-damage': '/roof-repair/emergency/',
  'signs-of-a-leaky-roof': '/roof-repair/',
  'roof-coating-applications': `${R}flat-roofing/`,
  'storm-damage-roof-repair-boost-home': '/roof-repair/emergency/',
  'guide-to-roof-repair-vs-replacement': '/roof-repair/',
  'how-to-repair-a-tiled-roof': `${R}tile-roofing/repair/`,
  '5-temporary-roof-repair-options': '/roof-repair/emergency/',
  '5-winter-roof-repair-tips': '/roof-repair/',
  'asphalt-shingle-roof-repair': `${R}shingle-roofing/repair/`,
  '6-diy-roof-repair-tips': '/roof-repair/',
  '5-tips-roof-maintenance': '/roof-maintenance-plans/',
  'how-to-keep-your-roof-cool': `${R}flat-roofing/replacement/`,
  '5-signs-damaged-asphalt-shingle-roof': `${R}shingle-roofing/repair/`,
  'tile-roofs-frequently-asked-questions': `${R}tile-roofing/`,
  'how-to-prolong-the-life-of-your-roof': '/roof-maintenance-plans/',
  '5-musts-reliable-roofing-specialist': '/about-us/',
  'wooden-roofing-pros-cons': R,
  'how-to-remove-mold-from-roof': '/roof-maintenance-plans/',
  'solar-panel-tiles-are-they-worth-it': R,
  'how-often-should-you-clean-your-gutters': R, // Rain Gutters is hidden for now
  '5-types-of-roofing': R,
  'asphalt-shingles-faqs': `${R}shingle-roofing/`,
};

export const REDIRECTS = [
  ['/financing/', '/roof-financing/'],
  // Pages renamed, merged or moved on the new site (October 2026): one inspection page and one maintenance page
  // (with one-time tune-ups) for every roof type, singular /repair/ slugs, residential pages under
  // /residential-roofing/, and every project under /projects/. Specific addresses come before the catch-alls.
  ['/roof-tune-ups/', '/roof-maintenance-plans/'],
  ['/roof-tune-up/', '/roof-maintenance-plans/'],
  ...['shingle', 'tile', 'flat'].flatMap((type) => [
    [`/${type}-roofing/tune-up/`, '/roof-maintenance-plans/'],
    [`/${type}-roofing/roof-care/`, '/roof-maintenance-plans/'],
    [`/${type}-roofing/inspection/`, '/roof-inspection/'],
    [`/${type}-roofing/repairs/`, `/residential-roofing/${type}-roofing/repair/`],
    [`/${type}-roofing/`, `/residential-roofing/${type}-roofing/`],
    [`/${type}-roofing/:service/`, `/residential-roofing/${type}-roofing/:service/`],
  ]),
  ['/rain-gutters/', R], // Rain Gutters is hidden for now; point these back at /residential-roofing/rain-gutters/ when it returns
  ['/hoa-multi-family/', '/residential-roofing/hoa-multi-family/'],
  ['/emergency-roof-repair/', '/roof-repair/emergency/'],
  ['/project/tile-flat-roofing-in-mid-wilshire-90019/', '/projects/tile-flat-roofing-in-mid-wilshire-90019/'],
  ['/commercial-roofing/roof-replacement/', '/commercial-roofing/replacement/'],
  ['/residential-roofing/roof-inspection/', '/roof-inspection/'],
  // Service pages
  ['/residential-roofing-services/', '/residential-roofing/'],
  ['/residential-roofing-services/roof-repair/', '/roof-repair/'],
  ['/residential-roofing-services/roof-replacement/', '/roof-replacement/'],
  ['/residential-roofing-services/roof-inspection/', '/roof-inspection/'],
  ['/residential-roofing-services/new-roof-installation/', '/roof-replacement/'],
  ['/residential-roofing-services/roof-storm-damage/', '/roof-repair/emergency/'],
  ['/residential-roofing-services/gutter-replacement/', R],
  ['/residential-roofing-services/attic-ventilation/', '/residential-roofing/shingle-roofing/replacement/'],
  ['/commercial-roofing-services/', '/commercial-roofing/'],
  ['/commercial-roofing-services/commercial-roof-repair/', '/commercial-roofing/repair/'],
  ['/commercial-roofing-services/commercial-roof-installation/', '/commercial-roofing/replacement/'],
  ['/commercial-roofing-services/commercial-roof-replacement/', '/commercial-roofing/replacement/'],
  ['/commercial-roofing-services/commercial-roof-inspection/', '/commercial-roofing/maintenance/'],
  ['/commercial-roofing-contractor-los-angeles/', '/commercial-roofing/'],
  ['/los-angeles-commercial-roof-replacement/', '/commercial-roofing/replacement/'],
  ['/roof-insurance-claims/', '/roof-repair/emergency/'],
  ['/instant-quote-roof-replacement/', '/roof-replacement/'],
  ['/coupons-special-offers/', '/roof-inspection/'],
  ['/free-estimate/', '/contact-us/'],
  ['/thank-you-free-estimate/', '/contact-us/'],
  ['/thank-you-contact-us/', '/contact-us/'],
  ['/locations.kml', '/service-areas/'],

  // Blog posts
  ...Object.entries(BLOG_REDIRECTS).flatMap(([slug, to]) => [[`/${slug}/`, to], [`/blog/${slug}/`, to]]),
  // WordPress archive pages: blog categories ("Roofing", "Roofing Repairs"), author pages and blog page 2, 3, …
  ['/roofing/', R],
  ['/roofing/page/:n/', R],
  ['/roofing-repairs/', '/roof-repair/'],
  ['/roofing-repairs/page/:n/', '/roof-repair/'],
  ['/author/:name/', '/about-us/'],
  ['/author/:name/page/:n/', '/about-us/'],
  ['/blog/page/:n/', '/blog/'],
  ['/blog/roofing-blog-updates/', '/blog/'], // the "coming soon" placeholder post, replaced by real articles

  // City pages at the site root
  ['/huntington-beach/', city(OC, 'huntington-beach')],
  ['/woodland-hills-roofing-specialists/', city(LA, 'woodland-hills')],
  ['/vernon-roofing-specialists/', city(LA, 'vernon')],

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
