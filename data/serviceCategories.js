// The top-level kinds of property we roof, as large photo cards: the home page's services section and the city and county pages
// (components/sections/ServiceCategories.jsx). HOA & Multi-Family was added as the third card in October 2026 (homes, communities, commercial).
import { COMMERCIAL_LINK, RESIDENTIAL, SINGLES } from './catalog';

export const SERVICE_CATEGORIES = [
  {
    title: 'Residential Roofing',
    schemaName: 'Residential Roofing',
    scene: 'scene-shingle',
    image: '/images/home-services-residential-shingle-drone-view.webp',
    text: 'Every residential roof type under one roofer-led process, from a single repair to a full tear-off.',
    href: RESIDENTIAL.href,
  },
  {
    title: 'HOA & Multi-Family Roofing',
    schemaName: 'HOA & Multi-Family Roofing',
    scene: 'scene-hoa',
    image: '/images/shingle-roof-care-multi-family.webp',
    text: 'Condo and townhome communities and apartment buildings, with one point of contact and photo-documented reports boards and managers can review.',
    href: SINGLES.hoa.href,
  },
  {
    title: 'Commercial Roofing',
    schemaName: 'Commercial Roofing',
    scene: 'scene-commercial',
    image: '/images/home-services-commercial-flat-roof-drone-view.webp',
    text: 'Roofing for offices, retail, churches and warehouses, with written scopes built around your building.',
    href: COMMERCIAL_LINK.href,
  },
];
