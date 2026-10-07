// Projects page (/projects/): a map of every project that has its own page (components/sections/ProjectMap.jsx).

import { HOLLYWOOD_HILLS_PROJECT } from './hollywood-hills-project';
import { MID_WILSHIRE_PROJECT } from './mid-wilshire-project';
import { PANORAMA_CITY_PROJECT } from './panorama-city-project';
import { VENICE_PROJECT } from './venice-project';
import { WHITE_FLAT_PROJECT } from './white-flat-roof-project';
import { SAN_PEDRO_FULL_ROOF_PROJECT } from './san-pedro-full-roof-project';
import { SAN_PEDRO_PROJECT } from './san-pedro-project';

// Projects on the map, each linking to its page, newest first. To add one: put its WebP photos in a folder named after the
// page's address (public/images/projects/<page-slug>/), give its data file a `place` and a `geo` pin ([lat, lng] of the
// ZIP code's center, not the street address), then list it here.
export const PROJECT_PAGES = [WHITE_FLAT_PROJECT, VENICE_PROJECT, PANORAMA_CITY_PROJECT, MID_WILSHIRE_PROJECT, HOLLYWOOD_HILLS_PROJECT, SAN_PEDRO_PROJECT, SAN_PEDRO_FULL_ROOF_PROJECT];

export const PROJECTS_PAGE = {
  keyword: 'roofing projects',
  metaTitle: 'Roofing Projects',
  metaDescription:
    'Roofing projects by QRS: tile, shingle and flat roofs for homes, HOAs and businesses across Southern California. Book a free roof evaluation.',
  hero: {
    heading: 'Our Roofing Projects Near You',
    intro:
      'Browse roofing projects from homes, communities and commercial properties across Southern California, featuring tile, shingle and flat roof work.',
    // Second paragraph under the intro, smaller type. Describes only what the project pages show.
    more:
      'Each project page shows the finished roof in photos, where it is and how the work was done. So far that includes [shingle roof replacements](/residential-roofing/shingle-roofing/replacement/) on apartment and multi-family buildings in Panorama City and San Pedro, a single-story home in San Pedro, a round, 12-sided home with a new [flat roof](/residential-roofing/flat-roofing/replacement/) in Hollywood Hills West, and a Mid-Wilshire building with both [tile](/residential-roofing/tile-roofing/replacement/) and flat roofing, a canal-side home in Venice re-roofed in new charcoal shingles with its flat roof section rebuilt, and a white flat roof on a mid-century home in Los Angeles 90049. Use the map to find the project closest to you, or enter your ZIP code. Planning a roof of your own? [Contact us](/contact-us/) to start with a free roof evaluation.',
  },
};
