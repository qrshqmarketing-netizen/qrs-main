// Other review sites shown next to the Google reviews (components/sections/ReviewSites.jsx). Ratings are copied by hand from the business's own page and
// must be updated when they change (`checked` is the date they were read). A site is shown only when its rating is at least MIN_BADGE_RATING.
// Don't put these ratings in structured data: Google ignores (or penalizes) review ratings a business marks up about itself.
export const MIN_BADGE_RATING = 4.7;

export const REVIEW_SITES = [
  {
    name: 'Yelp',
    rating: 5.0,
    count: 22,
    checked: '2026-10-08',
    url: 'https://www.yelp.com/biz/quality-roofing-specialist-woodland-hills',
  },
];
