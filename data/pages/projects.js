// Projects page (/projects/): a map of every project that has its own page (components/sections/ProjectMap.jsx).

import { HOLLYWOOD_HILLS_PROJECT } from './hollywood-hills-project';
import { MID_WILSHIRE_PROJECT } from './mid-wilshire-project';
import { PANORAMA_CITY_PROJECT } from './panorama-city-project';
import { SAN_PEDRO_FULL_ROOF_PROJECT } from './san-pedro-full-roof-project';
import { SAN_PEDRO_PROJECT } from './san-pedro-project';

// Projects on the map, each linking to its page, newest first. To add one: put its WebP photos in a folder named after the
// page's address (public/images/projects/<page-slug>/), give its data file a `place` and a `geo` pin ([lat, lng] of the
// ZIP code's center, not the street address), then list it here.
export const PROJECT_PAGES = [PANORAMA_CITY_PROJECT, MID_WILSHIRE_PROJECT, HOLLYWOOD_HILLS_PROJECT, SAN_PEDRO_PROJECT, SAN_PEDRO_FULL_ROOF_PROJECT];

export const PROJECTS_PAGE = {
  keyword: 'roofing projects',
  metaTitle: 'Roofing Projects',
  metaDescription:
    'Roofing projects by QRS: tile, shingle and flat roofs for homes, HOAs and businesses across Southern California. Book a free roof evaluation.',
  hero: {
    heading: 'Our Roofing Projects Near You',
    intro:
      'Browse roofing projects from homes, communities and commercial properties across Southern California, featuring tile, shingle and flat roof work.',
  },
};
