// /thank-you/: where the estimate form sends visitors once their request is delivered (app/thank-you/page.js).
// Kept out of search results and the sitemap; it's the page conversion tracking can count.

export const THANK_YOU_PAGE = {
  path: '/thank-you/',
  keyword: 'thank you',
  metaTitle: 'Thank You for Your Request',
  metaDescription: 'Thank you for contacting Quality Roofing Specialists. Your roof request is in, and our team will reach out to follow up by phone or email.',
  hero: {
    eyebrow: 'Request received',
    heading: 'Thank You. Your Request Is In.',
    intro: 'Thank you for contacting Quality Roofing Specialists. Our team will reach out to follow up by phone or email.',
  },
  next: {
    heading: 'What Happens Next',
    subheading: 'Roof damaged in a storm or leaking now? Don’t wait for us: call [(310) 340-1643](tel:+13103401643) or see [emergency roof repair](/roof-repair/emergency/).',
    steps: [
      { title: 'We reach out', text: 'Our team contacts you to talk through your roof and set up a time for your free roof evaluation.' },
      { title: 'A roofer checks your roof', text: 'A roofer, not a salesperson, looks at your roof and photographs what they find, so you can see it for yourself.' },
      { title: 'You get a written scope and price', text: 'You get one clear next step, with a written scope and price before any work begins.' },
    ],
  },
};
