// Review links by office, used by the review hub and site search index.
export const REVIEW_DESTINATIONS = [
  {
    location: 'Woodland Hills',
    links: [
      { id: 'woodland-hills-google', platform: 'Google', href: 'https://g.page/r/CR1o7Ju0Q1QjEBM/review' },
      { id: 'woodland-hills-yelp', platform: 'Yelp', href: 'https://www.yelp.com/writeareview/biz/RXY3eryZVywVqsxR8rlXyw?return_url=%2Fbiz%2FRXY3eryZVywVqsxR8rlXyw&review_origin=biz-details-war-button' },
    ],
  },
  {
    location: 'West Hollywood',
    links: [
      { id: 'west-hollywood-google', platform: 'Google', href: 'https://g.page/r/CWsVFBHyvyZiEBM/review' },
      { id: 'west-hollywood-yelp', platform: 'Yelp', href: 'https://www.yelp.com/writeareview/biz/JQZfz176BB3CsUb30IJ6rg?return_url=%2Fbiz%2FJQZfz176BB3CsUb30IJ6rg&review_origin=biz-details-war-button' },
    ],
  },
  {
    location: 'Vernon',
    links: [{ id: 'vernon-google', platform: 'Google', href: 'https://g.page/r/CfLQ6GkPIVdtEBM/review' }],
  },
];

export const REVIEWS_PAGE = {
  keyword: 'customer reviews',
  metaTitle: 'Customer Reviews | Leave QRS a Review',
  metaDescription:
    'Leave customer reviews for Quality Roofing Specialists. Choose your QRS location and write a review on Google or Yelp.',
  hero: {
    heading: 'Customer Reviews',
    image: '/images/reviews-hero-bg.webp',
    imageAlt: 'Homeowners sharing feedback outside their home',
    intro:
      'Leave customer reviews for Quality Roofing Specialists on Google or Yelp: pick the location you worked with below, then the platform you’d like to use. Thanks for choosing QRS — your review helps other local property owners.',
  },
};
