// Projects page (/projects/): a map of every project that has its own page (components/sections/ProjectMap.jsx).

import { MID_WILSHIRE_PROJECT } from './mid-wilshire-project';
import { SAN_PEDRO_PROJECT } from './san-pedro-project';

// Projects on the map, each linking to its page. To add one: give its data file a `place` and a `geo` pin
// ([lat, lng] of the ZIP code's center, not the street address), then list it here.
export const PROJECT_PAGES = [MID_WILSHIRE_PROJECT, SAN_PEDRO_PROJECT];

export const PROJECTS_PAGE = {
  keyword: 'roofing projects',
  metaTitle: 'Roofing Projects',
  metaDescription:
    'Roofing projects by Quality Roofing Specialists: tile, shingle and flat roofs for homes, HOAs and businesses across Southern California. Book a free roof evaluation.',
  hero: {
    heading: 'Our Roofing Projects',
    intro:
      'Browse roofing projects from homes, communities and commercial properties across Southern California, featuring tile, shingle and flat roof work.',
  },
  map: {
    heading: 'Projects Near You',
    sub: 'Each pin is a finished QRS project. Enter your ZIP code to find the one closest to you.',
  },
};
