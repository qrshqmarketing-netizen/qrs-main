// Cities on the service area map, each with its own page at /locations/<slug>/.
// Edit this list to match your real service footprint (page copy for each city is in data/locationPages.js).

export const LOCATIONS = [
  { city: 'Los Angeles', slug: 'los-angeles', county: 'Los Angeles County', lat: 34.0522, lng: -118.2437 },
  { city: 'Santa Monica', slug: 'santa-monica', county: 'Los Angeles County', lat: 34.0195, lng: -118.4912 },
  { city: 'Pasadena', slug: 'pasadena', county: 'Los Angeles County', lat: 34.1478, lng: -118.1445 },
  { city: 'Glendale', slug: 'glendale', county: 'Los Angeles County', lat: 34.1425, lng: -118.2551 },
  { city: 'Burbank', slug: 'burbank', county: 'Los Angeles County', lat: 34.1808, lng: -118.309 },
  { city: 'Torrance', slug: 'torrance', county: 'Los Angeles County', lat: 33.8358, lng: -118.3406 },
  { city: 'Long Beach', slug: 'long-beach', county: 'Los Angeles County', lat: 33.7701, lng: -118.1937 },
  { city: 'Anaheim', slug: 'anaheim', county: 'Orange County', lat: 33.8366, lng: -117.9143 },
  { city: 'Santa Ana', slug: 'santa-ana', county: 'Orange County', lat: 33.7455, lng: -117.8677 },
  { city: 'Huntington Beach', slug: 'huntington-beach', county: 'Orange County', lat: 33.6595, lng: -117.9988 },
  { city: 'Irvine', slug: 'irvine', county: 'Orange County', lat: 33.6846, lng: -117.8265 },
  { city: 'Newport Beach', slug: 'newport-beach', county: 'Orange County', lat: 33.6189, lng: -117.9298 },
];

// A ZIP code within this many miles of a city above counts as "in our service area"
export const SERVICE_RADIUS_MI = 15;

// Counties listed as service areas for search engines
export const SERVICE_COUNTIES = ['Los Angeles County, CA', 'Orange County, CA'];

export const cityPath = (slug) => `/locations/${slug}/`;
export const findCity = (slug) => LOCATIONS.find((l) => l.slug === slug);
