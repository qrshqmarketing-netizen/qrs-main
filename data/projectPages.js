// The project pages (/projects/<name>/), for "Recent projects" links from the service and city pages they relate to.
// Each project lists those pages in `related` (data/pages/*-project.js) and has a short `label` for the link.
import { HOLLYWOOD_HILLS_PROJECT } from './pages/hollywood-hills-project';
import { MID_WILSHIRE_PROJECT } from './pages/mid-wilshire-project';
import { PANORAMA_CITY_PROJECT } from './pages/panorama-city-project';
import { SAN_PEDRO_FULL_ROOF_PROJECT } from './pages/san-pedro-full-roof-project';
import { SAN_PEDRO_PROJECT } from './pages/san-pedro-project';

export const PROJECT_PAGES = [PANORAMA_CITY_PROJECT, MID_WILSHIRE_PROJECT, SAN_PEDRO_PROJECT, SAN_PEDRO_FULL_ROOF_PROJECT, HOLLYWOOD_HILLS_PROJECT];

// The newest projects first: the home page hero rotates through their photos (app/page.js). Put a new project at the top.
export const LATEST_PROJECTS = [PANORAMA_CITY_PROJECT, SAN_PEDRO_FULL_ROOF_PROJECT, HOLLYWOOD_HILLS_PROJECT, SAN_PEDRO_PROJECT, MID_WILSHIRE_PROJECT];

// Links to the projects that list `href` (a service or city page) as related: [{ href, label }]
export const projectsRelatedTo = (href) => PROJECT_PAGES.filter((p) => p.related?.includes(href)).map((p) => ({ href: p.path, label: p.label }));
