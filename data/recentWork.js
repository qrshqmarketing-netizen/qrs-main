import { MID_WILSHIRE_PROJECT } from './pages/mid-wilshire-project';
import { SAN_PEDRO_PROJECT } from './pages/san-pedro-project';

export const RECENT_WORK_SUB = 'A look at the roofing projects our crews take on.';

export const RECENT_WORK = [
  { title: 'Shingle Roof Replacement in San Pedro 90019', image: '/images/recent-work-shingle-multi-hip-drone-view.webp' },
  { title: 'Flat Roof Replacement in Hollywood Hills West 90046', image: '/images/recent-work-round-flat-roof-drone-view.webp' },
  { title: 'Warehouse Flat Roof Replacement in Santa Ana 92703', image: '/images/recent-work-commercial-flat-roof-drone-view.webp' },
  { title: 'Shingle Roof Replacement in San Pedro 90731', image: SAN_PEDRO_PROJECT.image, href: SAN_PEDRO_PROJECT.path },
  { title: 'Multi-Family Flat/Shingle Roof Replacement in West Hollywood 90036', image: '/images/recent-work-tudor-flat-roof-street-view.webp' },
  { title: 'Tile & Flat Roofing in Mid-Wilshire 90019', image: MID_WILSHIRE_PROJECT.image, href: MID_WILSHIRE_PROJECT.path },
];
