// The project pages (/projects/<name>/), for "Recent projects" links from the service and city pages they relate to, and for the
// home page hero photos. The list itself is PROJECT_PAGES in data/pages/projects.js (newest first, the order of the Projects
// page): add a new project there and it shows up everywhere. Each project lists the pages it relates to in `related`
// (data/pages/*-project.js) and has a short `label` for the link.
import { PROJECT_PAGES } from './pages/projects';

export { PROJECT_PAGES };

// The home page hero rotates through these projects' cover photos (app/page.js), newest first
export const LATEST_PROJECTS = PROJECT_PAGES;

// Links to the projects that list `href` (a service or city page) as related: [{ href, label }]
export const projectsRelatedTo = (href) => PROJECT_PAGES.filter((p) => p.related?.includes(href)).map((p) => ({ href: p.path, label: p.label }));

// The project pages that list `href` (a service or city page) as related, newest first, as full project objects (for the stacked project cards)
export const projectPagesFor = (href, limit = 4) => PROJECT_PAGES.filter((p) => p.related?.includes(href)).slice(0, limit);

// The projects a service or hub page shows (owner, October 15 2026, after maben.com.au: the work itself, in the middle of every page).
// Newest first within each step, up to `limit`: (1) projects that list this page in `related` (`exact`), (2) for a hub, projects related to
// a page under it, (3) projects related to a sibling page in the same section (a shingle repair page shows shingle projects; never across
// /residential-roofing/ and /commercial-roofing/), (4) for /roof-repair/, /roof-replacement/ and similar, projects of the same kind of work.
const KINDS = ['repair', 'replacement', 'installation', 'inspection'];
export function projectsShownOn(href, limit = 4) {
  const parent = href.replace(/[^/]+\/$/, '');
  const kind = KINDS.find((k) => href.includes(k));
  const steps = [
    (r) => r === href,
    (r) => r.startsWith(href),
    (r) => parent.split('/').length > 3 && r.startsWith(parent), // a section like /residential-roofing/shingle-roofing/, not the site root or a whole category
    (r) => href.startsWith('/roof-') && kind && r.includes(kind),
  ];
  const picked = [];
  for (const test of steps) {
    for (const p of PROJECT_PAGES) if (picked.length < limit && !picked.includes(p) && p.related?.some(test)) picked.push(p);
  }
  return { projects: picked, exact: picked.length > 0 && picked[0].related.includes(href) };
}
