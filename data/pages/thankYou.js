// /thank-you/: where the request forms send visitors once their request is delivered (app/thank-you/page.js, layout in components/sections/ThankYou.jsx).
// Kept out of search results and the sitemap; it's the page conversion tracking can count. Only what the site already says: no response time, no price.

export const THANK_YOU_PAGE = {
  path: '/thank-you/',
  keyword: 'thank you',
  metaTitle: 'Thank You for Your Request',
  metaDescription: 'Thank you for contacting Quality Roofing Specialists. Your roof request is in, and our team will reach out to follow up by phone or email.',
  hero: {
    eyebrow: 'Request received',
    heading: 'Thank you. Your request is __in__.',
    intro: 'Thank you for contacting Quality Roofing Specialists. Our team will reach out to follow up by phone or email.',
    image: '/images/contractors-hero-roofer-tablet.webp',
    imageAlt: 'A smiling roofer on a shingle roof holding a tablet',
  },
  next: {
    heading: 'What happens __next__',
    steps: [
      { title: 'We reach out', text: 'Our team contacts you to talk through your roof and set up a time for your free roof evaluation.' },
      { title: 'A roofer checks your roof', text: 'A roofer, not a salesperson, looks at your roof and photographs what they find, so you can see it for yourself.' },
      { title: 'You get a written scope and price', text: 'You get one clear next step, with a written scope and price before any work begins.' },
    ],
  },
  urgent: {
    heading: 'Leaking right now?',
    text: 'Don’t wait for us to call. Phone us now, or see what to do in the meantime on our emergency roof repair page.',
    link: { label: 'Emergency roof repair', href: '/roof-repair/emergency/' },
  },
  more: {
    heading: 'While you __wait__',
    cards: [
      { title: 'See roofs we’ve finished', text: 'Real projects across Los Angeles and Orange County, with photos from start to finish.', href: '/projects/', image: '/images/recent-work-shingle-row-drone-view.webp' },
      { title: 'Read our roofing guides', text: 'Plain-English articles on leaks, repairs, replacements and roof care.', href: '/blog/', image: '/images/homeowners-looking-at-leak-in-ceiling.webp' },
      { title: 'Meet the team', text: 'Who we are, how we work and why every job starts with a roofer-led look at the roof.', href: '/about-us/', image: '/images/careers-hero-crew-shingle-roof.webp' },
    ],
  },
};
