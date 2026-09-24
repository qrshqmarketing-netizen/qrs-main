// Cities on the service area map. Edit this list to match your real service footprint.

export const LOCATIONS = [
  { city: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
  { city: 'Santa Monica', lat: 34.0195, lng: -118.4912 },
  { city: 'Pasadena', lat: 34.1478, lng: -118.1445 },
  { city: 'Glendale', lat: 34.1425, lng: -118.2551 },
  { city: 'Burbank', lat: 34.1808, lng: -118.309 },
  { city: 'Torrance', lat: 33.8358, lng: -118.3406 },
  { city: 'Long Beach', lat: 33.7701, lng: -118.1937 },
  { city: 'Anaheim', lat: 33.8366, lng: -117.9143 },
  { city: 'Santa Ana', lat: 33.7455, lng: -117.8677 },
  { city: 'Huntington Beach', lat: 33.6595, lng: -117.9988 },
  { city: 'Irvine', lat: 33.6846, lng: -117.8265 },
  { city: 'Newport Beach', lat: 33.6189, lng: -117.9298 },
];

// A ZIP code within this many miles of a city above counts as "in our service area"
export const SERVICE_RADIUS_MI = 15;

// Counties listed as service areas for search engines
export const SERVICE_COUNTIES = ['Los Angeles County, CA', 'Orange County, CA'];
