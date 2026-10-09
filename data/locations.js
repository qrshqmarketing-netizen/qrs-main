// Service regions and their cities. Each region has a page at /service-areas/<region>/ (copy in data/regionPages.js)
// and each city a page at /service-areas/<region>/<city>/ (copy in data/locationPages.js).
// To expand to a new market, add a region here, then its cities (with that region's slug) and their page copy.

export const REGIONS = [
  { slug: 'la-county', name: 'Los Angeles County', short: 'LA County', state: 'CA' },
  { slug: 'orange-county', name: 'Orange County', short: 'Orange County', state: 'CA' },
  { slug: 'riverside-county', name: 'Riverside County', short: 'Riverside County', state: 'CA' },
  { slug: 'san-bernardino-county', name: 'San Bernardino County', short: 'San Bernardino County', state: 'CA' },
];


export const LOCATIONS = [
  { city: 'Los Angeles', slug: 'los-angeles', county: 'Los Angeles County', region: 'la-county', lat: 34.0522, lng: -118.2437 },
  { city: 'Santa Monica', slug: 'santa-monica', county: 'Los Angeles County', region: 'la-county', lat: 34.0195, lng: -118.4912 },
  { city: 'Pasadena', slug: 'pasadena', county: 'Los Angeles County', region: 'la-county', lat: 34.1478, lng: -118.1445 },
  { city: 'Glendale', slug: 'glendale', county: 'Los Angeles County', region: 'la-county', lat: 34.1425, lng: -118.2551 },
  { city: 'Burbank', slug: 'burbank', county: 'Los Angeles County', region: 'la-county', lat: 34.1808, lng: -118.309 },
  { city: 'Woodland Hills', slug: 'woodland-hills', county: 'Los Angeles County', region: 'la-county', lat: 34.1684, lng: -118.6058 },
  { city: 'Torrance', slug: 'torrance', county: 'Los Angeles County', region: 'la-county', lat: 33.8358, lng: -118.3406 },
  { city: 'Long Beach', slug: 'long-beach', county: 'Los Angeles County', region: 'la-county', lat: 33.7701, lng: -118.1937 },
  { city: 'Anaheim', slug: 'anaheim', county: 'Orange County', region: 'orange-county', lat: 33.8366, lng: -117.9143 },
  { city: 'Santa Ana', slug: 'santa-ana', county: 'Orange County', region: 'orange-county', lat: 33.7455, lng: -117.8677 },
  { city: 'Huntington Beach', slug: 'huntington-beach', county: 'Orange County', region: 'orange-county', lat: 33.6595, lng: -117.9988 },
  { city: 'Irvine', slug: 'irvine', county: 'Orange County', region: 'orange-county', lat: 33.6846, lng: -117.8265 },
  { city: 'Newport Beach', slug: 'newport-beach', county: 'Orange County', region: 'orange-county', lat: 33.6189, lng: -117.9298 },
  { city: 'Vernon', slug: 'vernon', county: 'Los Angeles County', region: 'la-county', lat: 34.0018, lng: -118.2184 },
];

// Places inside the outlined service area (data/serviceAreaOutline.js) that have no page of their own. They have a pin and a label on the service area map
// (components/sections/ServiceArea.jsx), are listed on their county's page (components/sections/AlsoServing.jsx), count for the ZIP check, structured data and the AI
// files, and link to their county page. A place gets its own page only when there is something real behind it (a project, reviews, a photo): move its row into
// LOCATIONS and add its copy to data/locationPages.js (drafts for these places are in data/locationCopy/). Every place was checked to sit inside the outline.
export const OTHER_PLACES = [
  { city: 'Beverly Hills', slug: 'beverly-hills', county: 'Los Angeles County', region: 'la-county', lat: 34.0736, lng: -118.4004 },
  { city: 'West Hollywood', slug: 'west-hollywood', county: 'Los Angeles County', region: 'la-county', lat: 34.09, lng: -118.3617 },
  { city: 'Culver City', slug: 'culver-city', county: 'Los Angeles County', region: 'la-county', lat: 34.0211, lng: -118.3965 },
  { city: 'Sherman Oaks', slug: 'sherman-oaks', county: 'Los Angeles County', region: 'la-county', lat: 34.1511, lng: -118.4492 },
  { city: 'Encino', slug: 'encino', county: 'Los Angeles County', region: 'la-county', lat: 34.1592, lng: -118.5019 },
  { city: 'Van Nuys', slug: 'van-nuys', county: 'Los Angeles County', region: 'la-county', lat: 34.1899, lng: -118.4514 },
  { city: 'Calabasas', slug: 'calabasas', county: 'Los Angeles County', region: 'la-county', lat: 34.1367, lng: -118.6615 },
  { city: 'Inglewood', slug: 'inglewood', county: 'Los Angeles County', region: 'la-county', lat: 33.9617, lng: -118.3531 },
  { city: 'Alhambra', slug: 'alhambra', county: 'Los Angeles County', region: 'la-county', lat: 34.0953, lng: -118.127 },
  { city: 'Arcadia', slug: 'arcadia', county: 'Los Angeles County', region: 'la-county', lat: 34.1397, lng: -118.0353 },
  { city: 'Pomona', slug: 'pomona', county: 'Los Angeles County', region: 'la-county', lat: 34.0551, lng: -117.75 },
  { city: 'West Covina', slug: 'west-covina', county: 'Los Angeles County', region: 'la-county', lat: 34.0686, lng: -117.9389 },
  { city: 'Whittier', slug: 'whittier', county: 'Los Angeles County', region: 'la-county', lat: 33.9792, lng: -118.0328 },
  { city: 'Downey', slug: 'downey', county: 'Los Angeles County', region: 'la-county', lat: 33.9401, lng: -118.1332 },
  { city: 'Redondo Beach', slug: 'redondo-beach', county: 'Los Angeles County', region: 'la-county', lat: 33.8492, lng: -118.3884 },
  { city: 'Manhattan Beach', slug: 'manhattan-beach', county: 'Los Angeles County', region: 'la-county', lat: 33.8847, lng: -118.4109 },
  { city: 'Fullerton', slug: 'fullerton', county: 'Orange County', region: 'orange-county', lat: 33.8704, lng: -117.9243 },
  { city: 'Brea', slug: 'brea', county: 'Orange County', region: 'orange-county', lat: 33.9167, lng: -117.9006 },
  { city: 'Yorba Linda', slug: 'yorba-linda', county: 'Orange County', region: 'orange-county', lat: 33.8886, lng: -117.8131 },
  { city: 'Orange', slug: 'orange', county: 'Orange County', region: 'orange-county', lat: 33.7879, lng: -117.8531 },
  { city: 'Tustin', slug: 'tustin', county: 'Orange County', region: 'orange-county', lat: 33.7458, lng: -117.8261 },
  { city: 'Garden Grove', slug: 'garden-grove', county: 'Orange County', region: 'orange-county', lat: 33.7743, lng: -117.938 },
  { city: 'Costa Mesa', slug: 'costa-mesa', county: 'Orange County', region: 'orange-county', lat: 33.6411, lng: -117.9187 },
  { city: 'Mission Viejo', slug: 'mission-viejo', county: 'Orange County', region: 'orange-county', lat: 33.6, lng: -117.672 },
  { city: 'Lake Forest', slug: 'lake-forest', county: 'Orange County', region: 'orange-county', lat: 33.6469, lng: -117.6892 },
  { city: 'Laguna Niguel', slug: 'laguna-niguel', county: 'Orange County', region: 'orange-county', lat: 33.5225, lng: -117.7075 },
  { city: 'Laguna Beach', slug: 'laguna-beach', county: 'Orange County', region: 'orange-county', lat: 33.5427, lng: -117.7854 },
  { city: 'Dana Point', slug: 'dana-point', county: 'Orange County', region: 'orange-county', lat: 33.4672, lng: -117.6981 },
  { city: 'San Clemente', slug: 'san-clemente', county: 'Orange County', region: 'orange-county', lat: 33.4269, lng: -117.612 },
  { city: 'Seal Beach', slug: 'seal-beach', county: 'Orange County', region: 'orange-county', lat: 33.7414, lng: -118.1048 },
  { city: 'Riverside', slug: 'riverside', county: 'Riverside County', region: 'riverside-county', lat: 33.9533, lng: -117.3962 },
  { city: 'Corona', slug: 'corona', county: 'Riverside County', region: 'riverside-county', lat: 33.8753, lng: -117.5664 },
  { city: 'Norco', slug: 'norco', county: 'Riverside County', region: 'riverside-county', lat: 33.9311, lng: -117.5481 },
  { city: 'Eastvale', slug: 'eastvale', county: 'Riverside County', region: 'riverside-county', lat: 33.9525, lng: -117.5848 },
  { city: 'Jurupa Valley', slug: 'jurupa-valley', county: 'Riverside County', region: 'riverside-county', lat: 34.0029, lng: -117.4685 },
  { city: 'Moreno Valley', slug: 'moreno-valley', county: 'Riverside County', region: 'riverside-county', lat: 33.9425, lng: -117.2297 },
  { city: 'Perris', slug: 'perris', county: 'Riverside County', region: 'riverside-county', lat: 33.7825, lng: -117.2286 },
  { city: 'Menifee', slug: 'menifee', county: 'Riverside County', region: 'riverside-county', lat: 33.6971, lng: -117.1853 },
  { city: 'Lake Elsinore', slug: 'lake-elsinore', county: 'Riverside County', region: 'riverside-county', lat: 33.6681, lng: -117.3273 },
  { city: 'Murrieta', slug: 'murrieta', county: 'Riverside County', region: 'riverside-county', lat: 33.5539, lng: -117.2139 },
  { city: 'Temecula', slug: 'temecula', county: 'Riverside County', region: 'riverside-county', lat: 33.4936, lng: -117.1484 },
  { city: 'Chino', slug: 'chino', county: 'San Bernardino County', region: 'san-bernardino-county', lat: 34.0122, lng: -117.6889 },
  { city: 'Chino Hills', slug: 'chino-hills', county: 'San Bernardino County', region: 'san-bernardino-county', lat: 33.9898, lng: -117.7326 },
  { city: 'Ontario', slug: 'ontario', county: 'San Bernardino County', region: 'san-bernardino-county', lat: 34.0633, lng: -117.6509 },
  { city: 'Montclair', slug: 'montclair', county: 'San Bernardino County', region: 'san-bernardino-county', lat: 34.0775, lng: -117.6898 },
  { city: 'Upland', slug: 'upland', county: 'San Bernardino County', region: 'san-bernardino-county', lat: 34.0975, lng: -117.6484 },
  { city: 'Rancho Cucamonga', slug: 'rancho-cucamonga', county: 'San Bernardino County', region: 'san-bernardino-county', lat: 34.1064, lng: -117.5931 },
  { city: 'Fontana', slug: 'fontana', county: 'San Bernardino County', region: 'san-bernardino-county', lat: 34.0922, lng: -117.435 },
  { city: 'Rialto', slug: 'rialto', county: 'San Bernardino County', region: 'san-bernardino-county', lat: 34.1064, lng: -117.3703 },
  { city: 'Colton', slug: 'colton', county: 'San Bernardino County', region: 'san-bernardino-county', lat: 34.0739, lng: -117.3137 },
  { city: 'Grand Terrace', slug: 'grand-terrace', county: 'San Bernardino County', region: 'san-bernardino-county', lat: 34.0339, lng: -117.3131 },
];

// Every place on the map: the cities with a page, then the others
export const ALL_PLACES = [...LOCATIONS, ...OTHER_PLACES];
export const placesIn = (region) => OTHER_PLACES.filter((p) => p.region === region);
export const hasPage = (place) => LOCATIONS.some((l) => l.slug === place.slug);
// Where a place's pin and label lead: its own page, or else its county page
export const placePath = (place) => (hasPage(place) ? cityPath(place.slug) : regionPath(place.region));

// The places without a page, by county, as plain names (the "We also serve" lists)
export const ALSO_SERVING = REGIONS.map((r) => ({ name: r.name, region: r.slug, places: placesIn(r.slug).map((p) => p.city) })).filter((g) => g.places.length);

// A ZIP code within this many miles of a city above counts as "in our service area"
export const SERVICE_RADIUS_MI = 15;

// Counties listed as service areas for search engines
export const SERVICE_COUNTIES = ['Los Angeles County, CA', 'Orange County, CA', 'Riverside County, CA', 'San Bernardino County, CA'];

export const findCity = (slug) => LOCATIONS.find((l) => l.slug === slug);
export const findRegion = (slug) => REGIONS.find((r) => r.slug === slug);
export const regionPath = (region) => `/service-areas/${region}/`;
export const cityPath = (slug) => regionPath(findCity(slug).region) + slug + '/';
export const citiesIn = (region) => LOCATIONS.filter((l) => l.region === region);
