// About page (/about-us/), linked from the footer ("About QRS") and the header ("Why QRS").
// The mission, vision and core values come from COMPANY in data/site.js.

import { BUSINESS, COMPANY } from '@/data/site';

export const ABOUT_PAGE = {
  keyword: 'quality roofing specialists',
  metaTitle: 'About Us',
  metaDescription:
    'Quality Roofing Specialists crafts top-quality roofs with passion and precision. A licensed California contractor since 2020 serving Los Angeles & Orange County.',
  hero: {
    eyebrow: 'About Our Company',
    heading: 'Meet Quality Roofing Specialists',
    intro: `Quality Roofing Specialists (QRS) is a family-owned roofing contractor serving homes and businesses across Los Angeles and Orange County, licensed in California since 2020 (CSLB #${BUSINESS.license}). Co-founded by Tony and Adva Goldberg, QRS repairs and replaces tile, shingle and flat roofs, and every project starts with a roofer-led look at the roof.`,
  },
  intro: {
    heading: 'Your Detail-First Roofing Team',
    paragraphs: [
      `${COMPANY.belief} We’re a small, locally owned roofing company serving homeowners and property owners across Los Angeles and Orange County. Our local crews handle projects of every size, from a single roof repair to large residential, commercial and multi-family projects. We’re licensed, bonded and insured as a California contractor since 2020. Our approach is simple: a roofer should look at your roof before anyone tries to sell you one.`,
      'That’s why our work starts with a roofer-led [free roof evaluation](#roof-check), photo documentation and a plain-English explanation. Before any work begins you get a written scope and price. When the job is done, we walk the finished roof with you and back our installs with a 10-year workmanship warranty.',
    ],
  },
  mission: {
    eyebrow: 'Our Mission',
    heading: 'Lasting Protection, Built With Precision',
    paragraphs: [COMPANY.mission, COMPANY.vision, 'We’re building a team of dedicated professionals who share our core values.'],
    points: COMPANY.values,
  },
  values: {
    heading: 'What You Can Expect',
    items: [
      { title: 'Roofer first', text: 'A roofer, not a salesperson, looks at your roof and tells you what it actually needs.' },
      { title: 'Photos, not guesswork', text: 'We photo-document what we find and what we fix, so you can see it for yourself.' },
      { title: 'No mystery pricing', text: 'You get a written scope and price before any work starts. No pressure and no surprises.' },
      { title: 'Done right, then walked', text: 'We review the finished roof with you and go over your 10-year workmanship warranty in plain English.' },
    ],
  },
  story: {
    eyebrow: 'Our Story',
    heading: 'Family-Owned, Locally Built',
    paragraphs: [
      'Quality Roofing Specialists was incorporated in July 2019 and licensed as a California contractor in January 2020, co-founded by **Tony Goldberg** and **Adva Goldberg**, who serve as CEO and President. Tony did his first roofing job at 16 and never looked back — after years working in the roofing departments of other companies, he went out on his own when his uncle, who ran his own roofing business, retired.',
      'QRS is a family-owned, woman-owned and locally owned business, and giving back is part of how we operate: we’ve donated a full roof to a local church and contribute roofing work to senior living communities and elderly assistance programs in the neighborhoods we serve.',
    ],
  },
  team: {
    heading: 'Our Team',
    intro: 'Real people behind every roof, from the office to the ridge line. Names and photos are on the way — here’s who does the work today.',
    items: [
      { title: 'Field Inspectors & Lead Roofers', text: 'Every $199 Roof Check is done by a field inspector, lead roofer or estimator on our own team — never a subcontractor.' },
      { title: 'Senior Production Manager', text: '30 years overseeing roofing projects, managing our crews and quality control on every job.' },
      { title: '12 Crews, Every Roof Type', text: 'Dedicated crews for shingle, tile and flat roofing, with vetted subcontractors brought in only during overflow.' },
      { title: 'Bilingual Office & Field Staff', text: 'Our team communicates in English, Spanish and Tagalog.' },
    ],
  },
  services: {
    heading: 'Roofing We Do Every Day',
    paragraphs: [
      'From a [tile lift & relay](/tile-roofing/lift-and-relay/) on a Spanish Revival home to a [shingle roof replacement](/shingle-roofing/replacement/) or a [flat roof repair](/flat-roofing/repairs/) on a mid-century house, our crews bring the same care to every roof. We also handle [commercial roofing](/commercial-roofing/) and [HOA & multi-family](/hoa-multi-family/) properties.',
    ],
    cta: { label: 'See residential roofing', href: '/residential-roofing/' },
  },
  careers: {
    eyebrow: 'Careers',
    heading: 'Build Something That Lasts',
    subheading: 'Join the QRS crew',
    paragraphs: ['We like meeting roofers and team members who take pride in careful, clean work and clear communication with homeowners.'],
    cta: { label: 'Explore careers', href: '/careers/' },
  },
  partners: {
    eyebrow: 'Contractors',
    heading: 'Partner With QRS',
    subheading: 'A roofing team you can put your name next to',
    paragraphs: ['General contractors, builders, remodelers and property managers work with QRS for roofer-led assessments, written scopes and photo-documented work.'],
    cta: { label: 'Partner with us', href: '/contractors/' },
  },
};
