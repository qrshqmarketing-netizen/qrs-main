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
