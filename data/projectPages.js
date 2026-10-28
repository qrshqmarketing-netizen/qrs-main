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

// The projects a service or hub page shows, matched to the page's topic (owner, October 22 2026: "the projects on those pages should match
// the topic of the page"). A project's roof types come from its own address (tile, flat, shingle; a tile and flat job is both, tile first),
// the page's from its section in the address (/tile-roofing/, /flat-roofing/ ...). Each project scores: listed in this page's `related` (100), its main roof is the page's
// roof (40) or one of its roofs is (20), related to a page under this hub or in the same section (10), the same kind of work, repair,
// replacement or installation (5). On a page about one roof type only projects with that roof are shown (none on the metal pages until a
// metal job is published); commercial pages show only commercial projects, and residential pages never show a commercial one. Pages with no roof type (inspection, maintenance
// plans, financing, the repair and replacement hubs) show the best matches, then the newest. Highest score first, newest first within a
// score, up to `limit`. Returns { projects, exact, roof, heading } (heading: for the section, with one underlined word).
const KINDS = ['repair', 'replacement', 'installation'];
const ROOF_TYPES = ['tile', 'flat', 'shingle', 'metal'];
export const projectRoofs = (p) => [/tile/.test(p.path) && 'tile', /flat/.test(p.path) && 'flat', /shingle|full-roof/.test(p.path) && 'shingle'].filter(Boolean);

export function projectsShownOn(href, limit = 4) {
  const roof = ROOF_TYPES.find((r) => href.includes(`/${r}-roofing/`)); // the roof a page is about, from its section (/tile-roofing/ ...)
  const parent = href.replace(/[^/]+\/$/, '');
  const kind = KINDS.find((k) => href.includes(k));
  const commercial = href.startsWith('/commercial-roofing/');
  const scored = PROJECT_PAGES.map((p, order) => {
    const related = p.related || [];
    const roofs = projectRoofs(p);
    let score = related.includes(href) ? 100 : 0;
    if (roof && roofs[0] === roof) score += 40;
    else if (roof && roofs.includes(roof)) score += 20;
    if (related.some((r) => r !== href && (r.startsWith(href) || (parent.split('/').length > 3 && r.startsWith(parent))))) score += 10;
    if (kind && (p.path.includes(kind) || related.some((r) => r.includes(kind)))) score += 5;
    const commercialJob = related.some((r) => r.startsWith('/commercial-roofing/'));
    // a commercial job is never shown on the residential roof pages (/residential-roofing/...), only on commercial and general pages
    const fits = commercial ? commercialJob : (!roof || score >= 20) && !(commercialJob && href.startsWith('/residential-roofing/'));
    return { p, score, order, fits };
  });
  const ranked = scored.filter((x) => x.fits).sort((a, b) => b.score - a.score || a.order - b.order).map((x) => x.p);
  // A page about no one roof shows a mix (the best tile, flat and shingle job first), so it doesn't read as shingle-only
  // (projects listed in this page's `related` always come first, in their own order)
  const own = ranked.filter((p) => p.related?.includes(href));
  const rest = ranked.filter((p) => !own.includes(p));
  const mixed = roof ? ranked : [...own, ...new Set([...rest.filter((p, i) => rest.findIndex((q) => projectRoofs(q)[0] === projectRoofs(p)[0]) === i), ...rest])];
  const projects = mixed.slice(0, limit);
  const exact = projects.length > 0 && projects[0].related?.includes(href);
  const heading = exact ? 'This work, on real __roofs__' : roof ? `Recent ${roof} roof __projects__` : 'Recent roofing __projects__';
  return { projects, exact, roof, heading };
}
