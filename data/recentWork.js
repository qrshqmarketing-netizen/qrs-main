import { HOLLYWOOD_HILLS_PROJECT } from './pages/hollywood-hills-project';
import { MID_WILSHIRE_PROJECT } from './pages/mid-wilshire-project';
import { PANORAMA_CITY_PROJECT } from './pages/panorama-city-project';
import { SAN_PEDRO_FULL_ROOF_PROJECT } from './pages/san-pedro-full-roof-project';
import { SAN_PEDRO_PROJECT } from './pages/san-pedro-project';

export const RECENT_WORK_SUB = 'A look at the roofing projects our crews take on.';

export const RECENT_WORK = [
  { title: 'Apartment Building Shingle Roof Replacement in Panorama City 91402', image: PANORAMA_CITY_PROJECT.image, href: PANORAMA_CITY_PROJECT.path },
  { title: 'Full Roof Replacement in San Pedro 90732', image: SAN_PEDRO_FULL_ROOF_PROJECT.image, href: SAN_PEDRO_FULL_ROOF_PROJECT.path },
  { title: 'Flat Roof Replacement in Hollywood Hills West 90046', image: HOLLYWOOD_HILLS_PROJECT.image, href: HOLLYWOOD_HILLS_PROJECT.path },
  { title: 'Warehouse Flat Roof Replacement in Santa Ana 92703', image: '/images/recent-work-commercial-flat-roof-drone-view.webp' },
  { title: 'Multi-Family Shingle Roof Replacement in San Pedro 90731', image: SAN_PEDRO_PROJECT.image, href: SAN_PEDRO_PROJECT.path },
  { title: 'Multi-Family Flat/Shingle Roof Replacement in West Hollywood 90036', image: '/images/recent-work-tudor-flat-roof-street-view.webp' },
  { title: 'Tile & Flat Roofing in Mid-Wilshire 90019', image: MID_WILSHIRE_PROJECT.image, href: MID_WILSHIRE_PROJECT.path },
];
