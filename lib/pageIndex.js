// Every page, in site order, with the text AI assistants should know about it.
// llms.txt, llms-full.txt and the OKF knowledge bundle (lib/aiFiles.js) are built from this list.
//
// A page: { path, kind, group, parent, label, name, title, description, keyword, summary, paragraphs, lists, faqs }
//   kind: 'home' | 'hub' | 'service' | 'areas' | 'region' | 'city' | 'about' | 'careers' | 'contact' | 'reviews' | 'projects' | 'project' | 'legal'
//   group: 'company' | 'services' | 'residential' | 'commercial' | 'service-areas'; parent: the address of the page above it
//   label: short link text; name: the page's H1; title/description: its meta title and description
//   lists: [{ heading, items: [{ title, text?, bullets?, href? }] }] (process steps, reasons to choose QRS, and so on)
// Text may contain the data files' [links](/path/) and **bold**.

import { ABOUT_LINK, ACCESSIBILITY_LINK, BLOG_LINK, blogPath, CAREERS_LINK, CONTACT_LINK, CONTRACTORS_LINK, LOCATIONS_LINK, PRIVACY_LINK, PROGRAMS, PROJECTS_LINK, RESIDENTIAL, RESIDENTIAL_TYPES, REVIEWS_LINK, TERMS_LINK } from '@/data/catalog';
import { COMMERCIAL, EMERGENCY, FINANCING, HOA, INSPECTION, SECTIONS, SERVICE_HUB_PAGES, VENTILATION, cardFor, sectionPages as pagesOf, serviceHref } from '@/data/content';
import { PUBLISHED_POSTS } from '@/data/blog/posts';
import { FAQS } from '@/data/faqs';
import { LOCATION_PAGES } from '@/data/locationPages';
import { citiesIn, cityPath, LOCATIONS, REGIONS, regionPath } from '@/data/locations';
import { ABOUT_PAGE } from '@/data/pages/about';
import { CAREERS_PAGE } from '@/data/pages/careers';
import { BLOG_PAGE } from '@/data/pages/blog';
import { CONTACT_PAGE } from '@/data/pages/contact';
import { CONTRACTORS_PAGE } from '@/data/pages/contractors';
import { CARE_PLAN } from '@/data/pages/carePlan';
import { ACCESSIBILITY, PRIVACY_POLICY, TERMS } from '@/data/pages/legal';
import { LOCATIONS_PAGE } from '@/data/pages/locations';
import { PROJECTS_PAGE } from '@/data/pages/projects';
import { HOLLYWOOD_HILLS_PROJECT } from '@/data/pages/hollywood-hills-project';
import { MID_WILSHIRE_PROJECT } from '@/data/pages/mid-wilshire-project';
import { PANORAMA_CITY_PROJECT } from '@/data/pages/panorama-city-project';
import { SAN_PEDRO_FULL_ROOF_PROJECT } from '@/data/pages/san-pedro-full-roof-project';
import { SAN_PEDRO_PROJECT } from '@/data/pages/san-pedro-project';
import { RESIDENTIAL_PAGE } from '@/data/pages/residential';
import { REVIEW_DESTINATIONS, REVIEWS_PAGE } from '@/data/pages/reviews';
import { REGION_PAGES } from '@/data/regionPages';
import { SERVICES } from '@/data/services';
import { BUSINESS, COMPANY, HOME_DESCRIPTION, HOME_H1, HOME_TITLE, OFFICES } from '@/data/site';
import { formatDate } from './dates';

const processList = (process) => process && { heading: process.subheading || process.heading, items: process.steps };
const CORE_VALUES = { heading: 'Our core values', items: COMPANY.values };
const pointsList = (block) => block && { heading: block.heading, items: block.points || block.items };

// A service page (section services and the stand-alone rain gutters and HOA pages)
const servicePage = (path, page, group, parent) => ({
  path,
  kind: 'service',
  group,
  parent,
  label: page.title,
  name: page.h1 || page.title,
  title: page.metaTitle,
  description: page.metaDescription,
  keyword: page.keyword,
  summary: page.hero.intro,
  paragraphs: [...page.overview.paragraphs, ...(page.sections || []).flatMap((s) => s.paragraphs)],
  lists: [...(page.sections || []).map(pointsList), processList(page.process), pointsList(page.why)].filter(Boolean),
  faqs: page.faqs,
});

// A roof-type or commercial hub and its service pages
const sectionPages = (section, group) => [
  {
    path: section.href,
    kind: 'hub',
    group,
    parent: section.parent ? section.parent.href : '/',
    label: section.label,
    name: section.hub.hero.heading,
    title: section.hub.metaTitle,
    description: section.hub.metaDescription,
    keyword: section.hub.keyword,
    summary: section.hub.hero.intro,
    paragraphs: section.hub.overview.paragraphs,
    lists: [
      { heading: section.hub.cards.heading, items: pagesOf(section).map((s) => ({ title: s.title, text: s.card, href: serviceHref(section, s) })) },
      pointsList(section.hub.highlights),
    ],
    faqs: section.hub.faqs,
  },
  ...pagesOf(section).map((s) => servicePage(serviceHref(section, s), s, group, section.href)),
];

const cityPage = (location) => {
  const page = LOCATION_PAGES[location.slug];
  return {
    path: cityPath(location.slug),
    kind: 'city',
    group: 'service-areas',
    parent: regionPath(location.region),
    label: `${location.city} Roofing`,
    name: page.hero.heading,
    title: page.metaTitle,
    description: page.metaDescription,
    keyword: page.keyword,
    summary: page.hero.sub,
    paragraphs: page.intro.paragraphs,
    lists: [
      { heading: `Neighborhoods we serve in ${location.city}`, items: page.neighborhoods.map((n) => ({ title: n })) },
      { heading: 'Roof conditions we plan for', items: page.considerations },
      { heading: 'Nearby service areas', items: page.nearby.map((slug) => ({ title: `${LOCATIONS.find((l) => l.slug === slug).city} Roofing`, href: cityPath(slug) })) },
    ],
    faqs: page.faqs,
    city: location.city,
    county: location.county,
  };
};

const residentialSections = SECTIONS.filter((s) => s.parent === RESIDENTIAL);

// A service-first hub (/roof-repair/, …)
const serviceHubPage = (h) => ({
  path: h.href,
  kind: 'hub',
  group: 'services',
  parent: '/',
  label: h.label,
  name: h.hub.hero.heading,
  title: h.hub.metaTitle,
  description: h.hub.metaDescription,
  keyword: h.hub.keyword,
  summary: h.hub.hero.intro,
  paragraphs: h.hub.overview.paragraphs,
  lists: [
    { heading: h.hub.cards.heading, items: h.cards.map(cardFor).filter(Boolean).map((c) => ({ title: c.title, text: c.text, href: c.href })) },
    pointsList(h.hub.highlights),
  ],
  faqs: h.hub.faqs,
});

const regionPage = (r) => {
  const page = REGION_PAGES[r.slug];
  return {
    path: regionPath(r.slug),
    kind: 'region',
    group: 'service-areas',
    parent: LOCATIONS_LINK.href,
    label: `${r.name} Roofing`,
    name: page.hero.heading,
    title: page.metaTitle,
    description: page.metaDescription,
    keyword: page.keyword,
    summary: page.hero.intro,
    paragraphs: page.intro.paragraphs,
    lists: [
      { heading: `Cities we serve in ${r.name}`, items: citiesIn(r.slug).map((l) => ({ title: `${l.city} Roofing`, text: LOCATION_PAGES[l.slug].hero.sub, href: cityPath(l.slug) })) },
      { heading: 'Roof conditions we plan for', items: page.considerations },
    ],
    faqs: page.faqs,
  };
};

// Privacy policy and terms: each section becomes a list
const legalPage = (path, page) => ({
  path,
  kind: 'legal',
  group: 'company',
  parent: '/',
  label: page.title,
  name: page.h1 || page.title,
  title: page.metaTitle,
  description: page.metaDescription,
  keyword: page.keyword,
  summary: page.intro,
  paragraphs: [],
  lists: page.sections.map((s) => ({ heading: s.heading, items: [...(s.paragraphs || []), ...(s.items || []), ...(s.after || [])].map((text) => ({ text })) })),
  faqs: [],
});

// A blog post block (data/blog/posts.js) as list items: subheadings become bold items, tables one item per row
function postBlockItems(block) {
  if (typeof block === 'string') return [{ text: block }];
  if (block.h3) return [{ title: block.h3 }];
  if (block.note) return [{ text: block.note }];
  if (block.list || block.checklist) return (block.list || block.checklist).map((text) => ({ text }));
  if (block.steps) return block.steps.map((text, i) => ({ text: `${i + 1}. ${text}` }));
  if (block.table) {
    const { head, rows } = block.table;
    return rows.map(([first, ...rest]) => ({ title: first, text: rest.map((cell, i) => `${head[i + 1]}: ${cell}`).join(' ') }));
  }
  return [];
}

// The list of every page, with the blog articles passed in: buildPageIndex(posts). PAGE_INDEX (below) is the version with the articles from the
// site files; lib/siteIndex.js builds it with the published articles from the dashboard.
export const buildPageIndex = (posts) => [
  {
    path: '/',
    kind: 'home',
    group: 'company',
    label: 'Home',
    name: HOME_H1,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    summary: 'Clear inspections. Straightforward estimates. Clean workmanship.',
    paragraphs: [],
    lists: [{ heading: 'Roofing services', items: SERVICES.map((s) => ({ title: s.title, text: s.text, href: s.href })) }],
    faqs: FAQS,
  },
  {
    path: RESIDENTIAL.href,
    kind: 'hub',
    group: 'residential',
    parent: '/',
    label: RESIDENTIAL.label,
    name: RESIDENTIAL_PAGE.hero.heading,
    title: RESIDENTIAL_PAGE.metaTitle,
    description: RESIDENTIAL_PAGE.metaDescription,
    keyword: RESIDENTIAL_PAGE.keyword,
    summary: RESIDENTIAL_PAGE.hero.intro,
    paragraphs: RESIDENTIAL_PAGE.overview.paragraphs,
    lists: [
      { heading: RESIDENTIAL_PAGE.cards.heading, items: RESIDENTIAL_TYPES.map((t) => ({ title: t.label, text: t.blurb, href: t.href })) },
      { heading: RESIDENTIAL_PAGE.finder.heading, items: RESIDENTIAL_PAGE.finder.rows },
    ],
    faqs: RESIDENTIAL_PAGE.faqs,
  },
  ...SERVICE_HUB_PAGES.map(serviceHubPage),
  ...[EMERGENCY, INSPECTION, FINANCING].map((p) => servicePage(p.href, p.page, 'services', p.parent?.href || '/')),
  {
    // The Roof Care Plan: a bespoke page (app/roof-maintenance-plans/page.js), not the generic
    // ServicePage template, so it gets a hand-built entry (like Contractors below) instead of servicePage().
    path: PROGRAMS.plans.href,
    kind: 'service',
    group: 'services',
    parent: '/',
    label: PROGRAMS.plans.label,
    name: CARE_PLAN.hero.heading,
    title: CARE_PLAN.metaTitle,
    description: CARE_PLAN.metaDescription,
    keyword: CARE_PLAN.keyword,
    summary: CARE_PLAN.hero.intro,
    paragraphs: [CARE_PLAN.scope.intro, ...CARE_PLAN.tuneUp.paragraphs],
    lists: [
      { heading: 'Plans and pricing', items: CARE_PLAN.plans.map((p) => ({ title: `${p.name} — $${p.prices.small}–$${p.prices.large}/year`, text: `${p.tagline}. ${p.visits}.` })) },
      { heading: 'Every visit includes', items: CARE_PLAN.scope.included.map((i) => ({ title: i.title, text: i.text })) },
      { heading: 'Not included', items: CARE_PLAN.scope.excluded.map((text) => ({ text })) },
      { heading: CARE_PLAN.byRoof.heading, items: CARE_PLAN.byRoof.items },
      { heading: CARE_PLAN.tuneUp.heading, items: CARE_PLAN.tuneUp.points },
      { heading: CARE_PLAN.schedule.heading, items: CARE_PLAN.schedule.steps.map((s) => ({ title: s.title, text: s.text })) },
      { heading: CARE_PLAN.memberBenefits.heading, items: CARE_PLAN.memberBenefits.points.map((p) => ({ title: p.title, text: p.text })) },
    ],
    faqs: CARE_PLAN.faqs,
  },
  ...residentialSections.flatMap((s) => sectionPages(s, 'residential')),
  // Rain Gutters is hidden for now (see app/residential-roofing/rain-gutters/page.js)
  servicePage(HOA.href, HOA.page, 'residential', RESIDENTIAL.href),
  servicePage(VENTILATION.href, VENTILATION.page, 'residential', RESIDENTIAL.href),
  ...sectionPages(COMMERCIAL, 'commercial'),
  {
    path: CONTRACTORS_LINK.href,
    kind: 'service',
    group: 'commercial',
    parent: '/',
    label: 'Contractor Partnerships',
    name: CONTRACTORS_PAGE.hero.heading,
    title: CONTRACTORS_PAGE.metaTitle,
    description: CONTRACTORS_PAGE.metaDescription,
    keyword: CONTRACTORS_PAGE.keyword,
    summary: CONTRACTORS_PAGE.hero.intro,
    paragraphs: [...CONTRACTORS_PAGE.overview.paragraphs, ...CONTRACTORS_PAGE.whiteLabel.paragraphs],
    lists: [pointsList(CONTRACTORS_PAGE.audiences), pointsList(CONTRACTORS_PAGE.whiteLabel), processList(CONTRACTORS_PAGE.process), pointsList(CONTRACTORS_PAGE.why)],
    faqs: CONTRACTORS_PAGE.faqs,
  },
  {
    path: LOCATIONS_LINK.href,
    kind: 'areas',
    group: 'service-areas',
    parent: '/',
    label: 'Roofing Service Areas',
    name: LOCATIONS_PAGE.hero.heading,
    title: LOCATIONS_PAGE.metaTitle,
    description: LOCATIONS_PAGE.metaDescription,
    keyword: LOCATIONS_PAGE.keyword,
    summary: LOCATIONS_PAGE.hero.intro,
    paragraphs: [],
    lists: ['Los Angeles County', 'Orange County'].map((county) => ({
      heading: county,
      items: LOCATIONS.filter((l) => l.county === county).map((l) => ({ title: `${l.city} Roofing`, text: LOCATION_PAGES[l.slug].hero.sub, href: cityPath(l.slug) })),
    })),
    faqs: LOCATIONS_PAGE.faqs,
  },
  ...REGIONS.flatMap((r) => [regionPage(r), ...citiesIn(r.slug).map(cityPage)]),
  {
    path: PROJECTS_LINK.href,
    kind: 'projects',
    group: 'company',
    parent: '/',
    label: 'Roofing Projects',
    name: PROJECTS_PAGE.hero.heading,
    title: PROJECTS_PAGE.metaTitle,
    description: PROJECTS_PAGE.metaDescription,
    keyword: PROJECTS_PAGE.keyword,
    summary: PROJECTS_PAGE.hero.intro,
    paragraphs: [PROJECTS_PAGE.hero.more],
    lists: [],
    faqs: [],
  },
  {
    path: MID_WILSHIRE_PROJECT.path,
    kind: 'project',
    group: 'company',
    parent: PROJECTS_LINK.href,
    label: 'Tile & Flat Roofing in Mid-Wilshire 90019',
    name: MID_WILSHIRE_PROJECT.title,
    title: MID_WILSHIRE_PROJECT.title,
    description: MID_WILSHIRE_PROJECT.description,
    keyword: MID_WILSHIRE_PROJECT.keyword,
    summary: MID_WILSHIRE_PROJECT.paragraphs[0],
    paragraphs: MID_WILSHIRE_PROJECT.paragraphs,
    lists: [],
    faqs: [],
  },
  {
    path: SAN_PEDRO_PROJECT.path,
    kind: 'project',
    group: 'company',
    parent: PROJECTS_LINK.href,
    label: SAN_PEDRO_PROJECT.title,
    name: SAN_PEDRO_PROJECT.title,
    title: SAN_PEDRO_PROJECT.title,
    description: SAN_PEDRO_PROJECT.description,
    keyword: SAN_PEDRO_PROJECT.keyword,
    summary: SAN_PEDRO_PROJECT.paragraphs[0],
    paragraphs: SAN_PEDRO_PROJECT.paragraphs,
    lists: [],
    faqs: [],
  },
  {
    path: SAN_PEDRO_FULL_ROOF_PROJECT.path,
    kind: 'project',
    group: 'company',
    parent: PROJECTS_LINK.href,
    label: SAN_PEDRO_FULL_ROOF_PROJECT.title,
    name: SAN_PEDRO_FULL_ROOF_PROJECT.title,
    title: SAN_PEDRO_FULL_ROOF_PROJECT.title,
    description: SAN_PEDRO_FULL_ROOF_PROJECT.description,
    keyword: SAN_PEDRO_FULL_ROOF_PROJECT.keyword,
    summary: SAN_PEDRO_FULL_ROOF_PROJECT.paragraphs[0],
    paragraphs: SAN_PEDRO_FULL_ROOF_PROJECT.paragraphs,
    lists: [],
    faqs: [],
  },
  {
    path: PANORAMA_CITY_PROJECT.path,
    kind: 'project',
    group: 'company',
    parent: PROJECTS_LINK.href,
    label: PANORAMA_CITY_PROJECT.title,
    name: PANORAMA_CITY_PROJECT.title,
    title: PANORAMA_CITY_PROJECT.title,
    description: PANORAMA_CITY_PROJECT.description,
    keyword: PANORAMA_CITY_PROJECT.keyword,
    summary: PANORAMA_CITY_PROJECT.paragraphs[0],
    paragraphs: PANORAMA_CITY_PROJECT.paragraphs,
    lists: [],
    faqs: [],
  },
  {
    path: HOLLYWOOD_HILLS_PROJECT.path,
    kind: 'project',
    group: 'company',
    parent: PROJECTS_LINK.href,
    label: HOLLYWOOD_HILLS_PROJECT.title,
    name: HOLLYWOOD_HILLS_PROJECT.title,
    title: HOLLYWOOD_HILLS_PROJECT.title,
    description: HOLLYWOOD_HILLS_PROJECT.description,
    keyword: HOLLYWOOD_HILLS_PROJECT.keyword,
    summary: HOLLYWOOD_HILLS_PROJECT.paragraphs[0],
    paragraphs: HOLLYWOOD_HILLS_PROJECT.paragraphs,
    lists: [],
    faqs: [],
  },
  {
    path: REVIEWS_LINK.href,
    kind: 'reviews',
    group: 'company',
    parent: '/',
    label: 'Customer Reviews',
    name: REVIEWS_PAGE.hero.heading,
    title: REVIEWS_PAGE.metaTitle,
    description: REVIEWS_PAGE.metaDescription,
    keyword: REVIEWS_PAGE.keyword,
    summary: REVIEWS_PAGE.hero.intro,
    paragraphs: [REVIEWS_PAGE.hero.intro, ...REVIEWS_PAGE.note.paragraphs],
    lists: [{
      heading: 'Leave a review by location and platform',
      items: REVIEW_DESTINATIONS.flatMap(({ location, links }) =>
        links.map(({ platform, href }) => ({ title: `${platform} review for ${location}`, href })),
      ),
    }],
    faqs: [],
  },
  {
    path: ABOUT_LINK.href,
    kind: 'about',
    group: 'company',
    parent: '/',
    label: 'About Us',
    name: ABOUT_PAGE.hero.heading,
    title: ABOUT_PAGE.metaTitle,
    description: ABOUT_PAGE.metaDescription,
    keyword: ABOUT_PAGE.keyword,
    summary: ABOUT_PAGE.hero.intro,
    paragraphs: [...ABOUT_PAGE.intro.paragraphs, COMPANY.mission, COMPANY.vision, ...ABOUT_PAGE.services.paragraphs],
    lists: [CORE_VALUES, pointsList(ABOUT_PAGE.values)],
    faqs: ABOUT_PAGE.faqs,
  },
  {
    path: CAREERS_LINK.href,
    kind: 'careers',
    group: 'company',
    parent: '/',
    label: 'Careers',
    name: CAREERS_PAGE.hero.heading,
    title: CAREERS_PAGE.metaTitle,
    description: CAREERS_PAGE.metaDescription,
    keyword: CAREERS_PAGE.keyword,
    summary: CAREERS_PAGE.hero.intro,
    paragraphs: [],
    lists: [pointsList(CAREERS_PAGE.values), CORE_VALUES, { heading: CAREERS_PAGE.roles.heading, items: CAREERS_PAGE.roles.items }, processList(CAREERS_PAGE.apply)],
    faqs: CAREERS_PAGE.faqs,
  },
  {
    path: CONTACT_LINK.href,
    kind: 'contact',
    group: 'company',
    parent: '/',
    label: 'Contact Us',
    name: CONTACT_PAGE.hero.heading,
    title: CONTACT_PAGE.metaTitle,
    description: CONTACT_PAGE.metaDescription,
    keyword: CONTACT_PAGE.keyword,
    summary: CONTACT_PAGE.hero.intro,
    paragraphs: [],
    lists: [
      { heading: 'Offices', items: OFFICES.map((o) => ({ title: o.name, text: `${o.address.street}, ${o.address.city}, ${o.address.region} ${o.address.postalCode}` })) },
      pointsList(CONTACT_PAGE.ways),
    ],
    faqs: CONTACT_PAGE.faqs,
  },
  // The blog index is listed once it has a published post (until then it's a "coming soon" page, kept out of search)
  ...(posts.length === 0 ? [] : [{
    path: BLOG_LINK.href,
    kind: 'blog',
    group: 'blog',
    parent: '/',
    label: 'Roofing Blog',
    name: BLOG_PAGE.hero.heading,
    title: BLOG_PAGE.metaTitle,
    description: BLOG_PAGE.metaDescription,
    keyword: BLOG_PAGE.keyword,
    summary: BLOG_PAGE.hero.intro,
    paragraphs: BLOG_PAGE.note.paragraphs,
    lists: [{ heading: 'Articles', items: posts.map((p) => ({ title: p.title, text: p.excerpt, href: blogPath(p.slug) })) }],
    faqs: [],
  }]),
  ...posts.map((p) => ({
    path: blogPath(p.slug),
    kind: 'post',
    group: 'blog',
    parent: BLOG_LINK.href,
    label: p.title,
    name: p.title,
    title: p.metaTitle,
    description: p.metaDescription,
    keyword: p.keyword,
    summary: p.excerpt,
    paragraphs: [...(p.author ? [`By ${p.author}, ${BUSINESS.name}. Published ${formatDate(p.datePublished)}.`] : []), ...(p.intro || [])],
    lists: [...p.sections, ...(p.closing ? [p.closing] : [])].map((s) => ({ heading: s.heading, items: s.blocks.flatMap(postBlockItems) })),
    faqs: p.faqs || [],
  })),
  legalPage(PRIVACY_LINK.href, PRIVACY_POLICY),
  legalPage(TERMS_LINK.href, TERMS),
  legalPage(ACCESSIBILITY_LINK.href, ACCESSIBILITY),
];

export const PAGE_INDEX = buildPageIndex(PUBLISHED_POSTS);
