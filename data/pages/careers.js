// Careers page (/careers/). Update the roles as openings change. The vision and core values come from COMPANY in data/site.js.

import { COMPANY } from '@/data/site';

const EMAIL = 'info@qualityroofingspecialists.com';
const VALUE_NAMES = COMPANY.values.map((v) => v.title.toLowerCase());
const apply = (role) => `mailto:${EMAIL}?subject=${encodeURIComponent(`Careers: ${role}`)}`;

export const CAREERS_PAGE = {
  email: EMAIL,
  keyword: 'roofing jobs',
  metaTitle: 'Roofing Jobs in Los Angeles',
  metaDescription:
    'Roofing jobs and careers at Quality Roofing Specialists across Los Angeles & Orange County. Join a detail-first crew and send us your info today.',
  hero: {
    heading: 'Roofing Jobs & Careers at QRS',
    intro:
      'Quality Roofing Specialists hires for roofing jobs across Los Angeles and Orange County: roofers and installers, crew leads, estimators, project managers and office staff. To apply, email us your info and the role you’re interested in. We’re building a team of dedicated professionals who share our core values and our mission of crafting top-quality roofs.',
  },
  values: {
    heading: 'What It’s Like to Work at QRS',
    items: [
      { title: 'Detail-first standards', text: 'Clean lines, proper details and tidy job sites. We’d rather do it right than do it twice.' },
      { title: 'Roofers lead the work', text: 'Roofers inspect, scope and explain the work, so roofing skill sits at the center of every job.' },
      { title: 'Clear communication', text: 'Written scopes, photos and plain English, with homeowners and within the crew.' },
      { title: 'Local projects', text: 'Work across Los Angeles and Orange County, from tile lift & relay to full roof replacements.' },
    ],
  },
  coreValues: {
    eyebrow: 'Our Core Values',
    heading: 'Help Us Protect 6,000 Homes',
    paragraphs: [COMPANY.vision, 'We’re building a team of dedicated professionals who align with these core values. If they sound like you, we’d like to meet you.'],
    points: COMPANY.values,
    cta: { label: 'See the roles we hire for', href: '#roles' },
  },
  roles: {
    heading: 'Roles We Hire For',
    intro: 'Openings change through the year. If there’s no posting for your role, send us your info anyway.',
    items: [
      { title: 'Roofers & installers', text: 'Hands-on roofing work on tile, shingle and flat roofs, with pride in clean, careful installs.', link: { label: 'Ask about this role', href: apply('Roofer / installer') } },
      { title: 'Crew leads & foremen', text: 'Lead a crew on site, keep the work to the written scope and leave every job site clean.', link: { label: 'Ask about this role', href: apply('Crew lead / foreman') } },
      { title: 'Estimators & project managers', text: 'Run roof checks, write clear scopes and keep homeowners informed from start to final walkthrough.', link: { label: 'Ask about this role', href: apply('Estimator / project manager') } },
      { title: 'Office & customer care', text: 'Schedule roof checks, answer calls and keep projects organized behind the scenes.', link: { label: 'Ask about this role', href: apply('Office / customer care') } },
    ],
  },
  apply: {
    heading: 'How to Apply',
    subheading: 'Three simple steps',
    steps: [
      { title: 'Send us your info', text: `Email [${EMAIL}](mailto:${EMAIL}) with your name, phone number, the role you’re interested in and a short note about your experience.` },
      { title: 'Talk with our team', text: 'If there’s a fit, we’ll reach out to talk through the role and the kind of work we do.' },
      { title: 'See how we work', text: 'Meet the team, ask your questions and see our detail-first approach for yourself.' },
    ],
  },
  faqs: [
    { q: 'Where are the jobs located?', a: 'Our projects are across Los Angeles County and Orange County, including [Los Angeles](/service-areas/la-county/los-angeles/), Pasadena, Long Beach, Irvine and the [other cities we serve](/service-areas/).' },
    { q: 'What do you look for?', a: `People who share our core values (${VALUE_NAMES.slice(0, -1).join(', ')} and ${VALUE_NAMES.at(-1)}), take pride in careful work and treat homeowners’ property with respect.` },
    { q: 'What if I don’t see an opening for my role?', a: 'Send us your info anyway. Openings change through the year, and we’re always glad to hear from people who share our standards.' },
    { q: 'How do I apply?', a: `Email [${EMAIL}](mailto:${EMAIL}) with the role you’re interested in and a little about your experience, or call us during business hours.` },
  ],
};

// Careers section on the home page (after the financing partners): this intro beside the roles above, linking to /careers/
export const CAREERS_TEASER = {
  eyebrow: 'Join the crew',
  heading: 'Roofing Careers at QRS',
  paragraphs: [
    'We’re building a team of dedicated professionals with a bold goal: protecting 6,000 homes with quality roofing over the next 10 years. Join a detail-first crew doing tile, shingle and flat roofing across Los Angeles and Orange County.',
  ],
  cta: { label: 'Explore Careers', href: '/careers/' },
};
