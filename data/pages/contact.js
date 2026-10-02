// Contact page (/contact-us/): the same address as the old WordPress site, so its links and rankings carry over.
// Hours come from BUSINESS.hours and the offices from OFFICES (both in data/site.js).

import { BUSINESS, PHONE, TEL } from '@/data/site';
import { hoursText } from '@/lib/hours';

export const CONTACT_PAGE = {
  keyword: 'contact quality roofing specialists',
  metaTitle: 'Contact',
  metaDescription:
    'Contact Quality Roofing Specialists: call (310) 340-1643, visit our Los Angeles, Valley or Vernon office, or request a free roof evaluation online and get a clear next step.',
  hero: {
    heading: 'Contact Quality Roofing Specialists',
    image: '/images/reviews-hero-bg.webp',
    imageAlt: 'Clients sharing feedback outside their home',
    intro: `To contact Quality Roofing Specialists, call [${PHONE}](${TEL}) (${hoursText(BUSINESS.hours)}), email [${BUSINESS.email}](mailto:${BUSINESS.email}) or send your project details through the [estimate form](#roof-check). One number reaches all of our offices, and our team gets back to you with a clear next step.`,
  },
  ways: {
    heading: 'How to Reach Us',
    items: [
      { title: 'Call us', text: 'Talk with our team at [(310) 340-1643](tel:+13103401643). One number reaches all of our offices.' },
      { title: 'Email us', text: 'Send questions or roof photos to [info@qualityroofingspecialists.com](mailto:info@qualityroofingspecialists.com).' },
      { title: 'Request an estimate', text: 'Tell us about the property in the [estimate form](#roof-check) and we’ll follow up to schedule.' },
      { title: 'Storm damage or a leak', text: 'Roof damaged in a storm or leaking now? Call us and see [emergency roof repair](/roof-repair/emergency/) for what to do first.' },
    ],
  },
  faqs: [
    { q: 'Which office should I contact?', a: 'Any of them. All of our offices share one phone number, so calling (310) 340-1643 reaches our team wherever your property is.' },
    { q: 'Can I send photos of my roof before a visit?', a: 'Yes. Email them with the property address and a short note about what you’re seeing. A roofer still confirms everything in person during the roof evaluation.' },
    { q: 'Do you work in my area?', a: 'We serve homes and businesses across [Los Angeles County](/service-areas/la-county/) and [Orange County](/service-areas/orange-county/). Enter your ZIP code on the map on this page to check your address.' },
  ],
};
