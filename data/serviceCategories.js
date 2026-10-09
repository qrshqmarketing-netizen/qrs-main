// The two top-level kinds of work, as large photo cards: the home page's services section and the city and county pages (components/sections/ServiceCategories.jsx).
import { COMMERCIAL_LINK, RESIDENTIAL } from './catalog';

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
    title: 'Commercial Roofing',
    schemaName: 'Commercial Roofing',
    scene: 'scene-commercial',
    image: '/images/home-services-commercial-flat-roof-drone-view.webp',
    text: 'Roofing for offices, retail, churches and warehouses, with written scopes built around your building.',
    href: COMMERCIAL_LINK.href,
  },
];
