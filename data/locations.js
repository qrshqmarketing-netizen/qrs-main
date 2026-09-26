// Service regions and their cities. Each region has a page at /service-areas/<region>/ (copy in data/regionPages.js)
// and each city a page at /service-areas/<region>/<city>/ (copy in data/locationPages.js).
// To expand to a new market, add a region here, then its cities (with that region's slug) and their page copy.

export const REGIONS = [
  { slug: 'la-county', name: 'Los Angeles County', short: 'LA County', state: 'CA' },
  { slug: 'orange-county', name: 'Orange County', short: 'Orange County', state: 'CA' },
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

// A ZIP code within this many miles of a city above counts as "in our service area"
export const SERVICE_RADIUS_MI = 15;

// Counties listed as service areas for search engines
export const SERVICE_COUNTIES = ['Los Angeles County, CA', 'Orange County, CA'];

export const findCity = (slug) => LOCATIONS.find((l) => l.slug === slug);
export const findRegion = (slug) => REGIONS.find((r) => r.slug === slug);
export const regionPath = (region) => `/service-areas/${region}/`;
export const cityPath = (slug) => regionPath(findCity(slug).region) + slug + '/';
export const citiesIn = (region) => LOCATIONS.filter((l) => l.region === region);
