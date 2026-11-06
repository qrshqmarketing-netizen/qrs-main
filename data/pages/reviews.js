// Review links by office, used by the review hub and site search index.
export const REVIEW_DESTINATIONS = [
  {
    location: 'Woodland Hills',
    // Shown on the review page without the city (owner, November 6 2026: no place names on the redesigned pages); `location` stays for tracking
    label: 'Ventura Blvd office',
    detail: '(818) 918-3184',
    links: [
      { id: 'woodland-hills-google', platform: 'Google', href: 'https://g.page/r/CR1o7Ju0Q1QjEBM/review' },
      { id: 'woodland-hills-yelp', platform: 'Yelp', href: 'https://www.yelp.com/writeareview/biz/RXY3eryZVywVqsxR8rlXyw?return_url=%2Fbiz%2FRXY3eryZVywVqsxR8rlXyw&review_origin=biz-details-war-button' },
    ],
  },
  {
    location: 'West Hollywood',
    label: 'Poinsettia Pl office',
    detail: '(310) 340-1643',
    links: [
      { id: 'west-hollywood-google', platform: 'Google', href: 'https://g.page/r/CWsVFBHyvyZiEBM/review' },
      { id: 'west-hollywood-yelp', platform: 'Yelp', href: 'https://www.yelp.com/writeareview/biz/JQZfz176BB3CsUb30IJ6rg?return_url=%2Fbiz%2FJQZfz176BB3CsUb30IJ6rg&review_origin=biz-details-war-button' },
    ],
  },
  {
    location: 'Vernon',
    label: 'E 46th St office',
    detail: '(213) 263-5976',
    links: [{ id: 'vernon-google', platform: 'Google', href: 'https://g.page/r/CfLQ6GkPIVdtEBM/review' }],
  },
];

export const REVIEWS_PAGE = {
  keyword: 'customer reviews',
  metaTitle: 'Customer Reviews | Quality Roofing Specialists',
  metaDescription:
    'Read customer reviews of Quality Roofing Specialists and leave your own: pick the office you worked with, then write a review on Google or Yelp.',
  hero: {
    heading: 'Customer Reviews',
    image: '/images/reviews-hero-bg.webp',
    imageAlt: 'Homeowners sharing feedback outside their home',
    intro:
      'Customer reviews from the people we roof for, and a quick way to leave yours. Pick the office you worked with below, then Google or Yelp. A few sentences about your roof and how the job went help the next homeowner deciding on a roofer.',
  },
  // Text block under the location cards (components/sections/IndexNote.jsx)
  note: {
    heading: 'How Your Review Helps',
    paragraphs: [
      'Reviews on Google and Yelp help homeowners and clients choose a roofer. If you worked with QRS, a few sentences about your roof, the work we did and how it went will help the next person who is deciding. Choose the office that handled your project above.',
      'Thinking about a roof of your own? See our [recent roofing projects](/projects/) or the [cities we serve](/service-areas/), then [contact us](/contact-us/) to start with a free roof evaluation.',
    ],
  },
};
