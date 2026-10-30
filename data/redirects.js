// Permanent redirects from the old WordPress site's addresses to their new pages (used by next.config.mjs).
// Old addresses that match a new page exactly (/contact-us/, /service-areas/la-county/pasadena/, …)
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
  'signs-of-storm-damage': '/blog/roof-storm-damage-signs/', // rewritten as a new blog post
  'signs-of-a-leaky-roof': '/blog/roof-leak-source/', // covered by the new roof leak post
  'roof-coating-applications': `${R}flat-roofing/`,
  'storm-damage-roof-repair-boost-home': '/blog/roof-storm-damage-signs/', // covered by the new storm damage post
  'guide-to-roof-repair-vs-replacement': '/blog/roof-restoration-vs-replacement/', // covered by the new restoration vs replacement post
  'how-to-repair-a-tiled-roof': `${R}tile-roofing/repair/`,
  '5-temporary-roof-repair-options': '/blog/temporary-roof-repair-options/', // rewritten as a new blog post
  '5-winter-roof-repair-tips': '/blog/roof-maintenance-checklist/', // covered by the new maintenance checklist
  'asphalt-shingle-roof-repair': `${R}shingle-roofing/repair/`,
  '6-diy-roof-repair-tips': '/roof-repair/',
  '5-tips-roof-maintenance': '/blog/roof-maintenance-checklist/', // covered by the new maintenance checklist
  'how-to-keep-your-roof-cool': `${R}flat-roofing/replacement/`,
  '5-signs-damaged-asphalt-shingle-roof': `${R}shingle-roofing/repair/`,
  'tile-roofs-frequently-asked-questions': `${R}tile-roofing/`,
  'how-to-prolong-the-life-of-your-roof': '/blog/roof-maintenance-checklist/', // covered by the new maintenance checklist
  '5-musts-reliable-roofing-specialist': '/about-us/',
  'wooden-roofing-pros-cons': '/blog/wooden-roof-pros-and-cons/', // rewritten as a new blog post
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
  ['/residential-roofing-services/attic-ventilation/', '/residential-roofing/attic-ventilation/'],
  ['/commercial-roofing-services/', '/commercial-roofing/'],
  ['/commercial-roofing-services/commercial-roof-repair/', '/commercial-roofing/repair/'],
  ['/commercial-roofing-services/commercial-roof-installation/', '/commercial-roofing/replacement/'],
  ['/commercial-roofing-services/commercial-roof-replacement/', '/commercial-roofing/replacement/'],
  ['/commercial-roofing-services/commercial-roof-inspection/', '/commercial-roofing/maintenance/'],
  ['/commercial-roofing-contractor-los-angeles/', '/commercial-roofing/'],
  ['/los-angeles-commercial-roof-replacement/', '/commercial-roofing/replacement/'],
  ['/roof-insurance-claims/', '/blog/roof-insurance-claims-california/'], // rewritten as a new blog post
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

  // Metal roofing moved under Residential Roofing with the other roof types
  ['/metal-roofing/', '/residential-roofing/metal-roofing/'],
  ['/metal-roofing/:slug/', '/residential-roofing/metal-roofing/:slug/'],

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
    ['beverly-hills', 'los-angeles'],
    ['culver-city', 'los-angeles'],
    ['inglewood', 'los-angeles'],
    ['el-segundo', 'los-angeles'],
    ['pico-rivera-new-roof-installation', 'pico-rivera'],
    ['malibu-roof-repair-services', 'santa-monica'],
    ['south-pasadena', 'pasadena'],
    ['sierra-madre', 'pasadena'],
    ['arcadia', 'pasadena'],
    ['roof-inspection-services-in-san-marino', 'pasadena'],
    ['calabasas', 'woodland-hills'],
    ['agoura-hills', 'woodland-hills'],
    ['westlake-village', 'woodland-hills'],
    ['signal-hill', 'long-beach'],
    ['lakewood-new-roof-installation', 'long-beach'],
  ].map(([old, slug]) => [`${LA}${old}/`, city(LA, slug)]),
  ...[
    'alhambra', 'artesia', 'azusa', 'baldwin-park', 'bell-gardens', 'bell', 'bellflower', 'bradbury', 'cerritos', 'commerce',
    'commercial-roofing-services-in-montebello', 'commercial-roofing-services-in-san-fernando', 'compton', 'covina', 'cudahy',
    'downey', 'duarte', 'el-monte', 'la-mirada-roof-repair-services', 'la-puente-roof-replacement-services',
    'la-verne-wind-damage-restoration', 'lancaster-commercial-roofing-services', 'lynwood-commercial-roof-installation',
    'monterey-park', 'norwalk-roofing', 'paramount-commercial-roofing-services',
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
  ].map(([old, slug]) => [`${OC}${old}/`, city(OC, slug)]),
  [`${OC}lawndale/`, LA],
  [`${OC}los-alamitos/`, city(LA, 'long-beach')],
  ...['brea', 'capistrano-beach', 'cypress', 'foothill-ranch', 'la-habra', 'la-palma', 'ladera-ranch'].map((old) => [`${OC}${old}/`, OC]),

  // City pages folded into their county page (owner, October 30 2026: city searches are rare and these pages had nothing of their own behind
  // them; the places stay on the map and their county page). The older addresses that used to point at them go straight to the county too.
  ...['glendale', 'torrance'].map((slug) => [city(LA, slug), LA]),
  ...['anaheim', 'santa-ana', 'irvine'].map((slug) => [city(OC, slug), OC]),
  ...['roofing-services-in-la-canada-flintridge', 'lomita-gutter-replacement-services', 'redondo-beach-gutter-replacement-services', 'manhattan-beach-roof-inspections', 'palos-verdes-estates-roofing', 'rancho-palos-verdes-residential-roofing-services', 'roof-repairs-in-rolling-hills', 'roof-installations-in-rolling-hills-estates', 'gardena'].map((old) => [`${LA}${old}/`, LA]),
  ...['fullerton', 'placentia', 'orange-roofing', 'lake-forest'].map((old) => [`${OC}${old}/`, OC]),
];
