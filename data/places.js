// Live Google reviews in the testimonials slider (components/sections/ReviewSlider.jsx), from Google's Places API
// (app/api/google-reviews/route.js, lib/placesReviews.js). Each visit that reaches the slider asks Google for one
// location's reviews: Google's rules don't allow storing reviews, so nothing is cached, and each request is billed
// (Place Details "Enterprise + Atmosphere": the first 1,000 a month are free, then $25 per 1,000).
//
// Setup: enable "Places API (New)" in the Google Cloud project, make a second API key restricted to that API only, and set it
// as GOOGLE_PLACES_KEY (server side only, never NEXT_PUBLIC_). Then fill in each location's placeId below (a place ID may be
// stored; "ChIJ…"; these three were converted from the locations' Google review links in data/pages/reviews.js). A location with no placeId is skipped, and with none set the slider keeps the hand-picked reviews in
// data/reviews.js. The same fallback applies if Google doesn't answer.

// citySlug: the city page that location belongs to (data/locations.js); a page can ask for its own location's reviews
export const GOOGLE_PLACES = [
  { slug: 'west-hollywood', name: 'West Hollywood', citySlug: 'los-angeles', placeId: 'ChIJuebO04MknGwRaxUUEfK_JmI' },
  { slug: 'woodland-hills', name: 'Woodland Hills', citySlug: 'woodland-hills', placeId: 'ChIJRQG9EFydugcRHWjsm7RDVCM' },
  { slug: 'vernon', name: 'Vernon', citySlug: 'vernon', placeId: 'ChIJY-O0LoNSpCER8tDoaQ8hV20' },
];

// Reviews are whole stars (1 to 5): only reviews at or above this are shown, and only ones with written text
export const MIN_REVIEW_STARS = 5;
export const MAX_LIVE_REVIEWS = 5; // Google returns at most 5 reviews per location
