// Every page, in site order, with the text AI assistants should know about it.
// llms.txt, llms-full.txt and the OKF knowledge bundle (lib/aiFiles.js) are built from this list.
//
// A page: { path, kind, group, parent, label, name, title, description, keyword, summary, paragraphs, lists, faqs }
//   kind: 'home' | 'hub' | 'service' | 'areas' | 'region' | 'city' | 'about' | 'careers' | 'contact' | 'reviews' | 'projects' | 'legal'
//   group: 'company' | 'services' | 'residential' | 'commercial' | 'service-areas'; parent: the address of the page above it
//   label: short link text; name: the page's H1; title/description: its meta title and description
//   lists: [{ heading, items: [{ title, text?, bullets?, href? }] }] (process steps, reasons to choose QRS, and so on)
// Text may contain the data files' [links](/path/) and **bold**.

import { ABOUT_LINK, BLOG_LINK, blogPath, CAREERS_LINK, CONTACT_LINK, CONTRACTORS_LINK, LOCATIONS_LINK, PRIVACY_LINK, PROJECTS_LINK, RESIDENTIAL, RESIDENTIAL_TYPES, REVIEWS_LINK, TERMS_LINK } from '@/data/catalog';
import { cardFor, COMMERCIAL, EMERGENCY, FINANCING, GUTTERS, HOA, MAINTENANCE_PLANS, SECTIONS, sectionPages as pagesOf, SERVICE_HUB_PAGES, serviceHref } from '@/data/content';
import { BLOG_POSTS } from '@/data/blog/posts';
import { FAQS } from '@/data/faqs';
import { LOCATION_PAGES } from '@/data/locationPages';
import { citiesIn, cityPath, LOCATIONS, REGIONS, regionPath } from '@/data/locations';
import { ABOUT_PAGE } from '@/data/pages/about';
import { CAREERS_PAGE } from '@/data/pages/careers';
import { BLOG_PAGE } from '@/data/pages/blog';
import { CONTACT_PAGE } from '@/data/pages/contact';
import { CONTRACTORS_PAGE } from '@/data/pages/contractors';
import { PRIVACY_POLICY, TERMS } from '@/data/pages/legal';
import { LOCATIONS_PAGE } from '@/data/pages/locations';
import { PROJECTS_PAGE } from '@/data/pages/projects';
import { RESIDENTIAL_PAGE } from '@/data/pages/residential';
import { REVIEWS_PAGE } from '@/data/pages/reviews';
import { REGION_PAGES } from '@/data/regionPages';
import { GOOGLE_REVIEWS } from '@/data/reviews';
import { SERVICES } from '@/data/services';
import { HOME_DESCRIPTION, HOME_TITLE, OFFICES } from '@/data/site';

const processList = (process) => process && { heading: process.subheading || process.heading, items: process.steps };
const pointsList = (block) => block && { heading: block.heading, items: block.points || block.items };

// A service page (section services and the stand-alone rain gutters and HOA pages)
const servicePage = (path, page, group, parent) => ({
  path,
  kind: 'service',
  group,
  parent,
  label: page.title,
  name: page.title,
  title: page.metaTitle,
  description: page.metaDescription,
  keyword: page.keyword,
  summary: page.hero.intro,
  paragraphs: page.overview.paragraphs,
  lists: [processList(page.process), pointsList(page.why)].filter(Boolean),
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
  name: page.title,
  title: page.metaTitle,
  description: page.metaDescription,
  keyword: page.keyword,
  summary: page.intro,
  paragraphs: [],
  lists: page.sections.map((s) => ({ heading: s.heading, items: [...(s.paragraphs || []), ...(s.items || []), ...(s.after || [])].map((text) => ({ text })) })),
  faqs: [],
});

export const PAGE_INDEX = [
  {
    path: '/',
    kind: 'home',
    group: 'company',
    label: 'Home',
    name: 'Roof Repair & Replacement in Southern California',
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
  ...[EMERGENCY, MAINTENANCE_PLANS, FINANCING].map((p) => servicePage(p.href, p.page, 'services', '/')),
  ...residentialSections.flatMap((s) => sectionPages(s, 'residential')),
  servicePage(GUTTERS.href, GUTTERS.page, 'residential', RESIDENTIAL.href),
  servicePage(HOA.href, HOA.page, 'residential', RESIDENTIAL.href),
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
    paragraphs: [],
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
    paragraphs: [],
    lists: [{ heading: 'Google reviews', items: GOOGLE_REVIEWS.map((r) => ({ title: `${r.name} (5 stars)`, text: r.text.replace(/\s+/g, ' ') })) }],
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
    summary: ABOUT_PAGE.intro.paragraphs[0],
    paragraphs: [...ABOUT_PAGE.intro.paragraphs.slice(1), ...ABOUT_PAGE.services.paragraphs],
    lists: [pointsList(ABOUT_PAGE.values)],
    faqs: [],
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
    lists: [pointsList(CAREERS_PAGE.values), { heading: CAREERS_PAGE.roles.heading, items: CAREERS_PAGE.roles.items }, processList(CAREERS_PAGE.apply)],
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
  {
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
    paragraphs: [],
    lists: [{ heading: 'Articles', items: BLOG_POSTS.map((p) => ({ title: p.title, text: p.excerpt, href: blogPath(p.slug) })) }],
    faqs: [],
  },
  ...BLOG_POSTS.map((p) => ({
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
    paragraphs: [],
    lists: p.sections.map((s, i) => ({ heading: s.heading || (i === 0 ? 'Overview' : 'More'), items: [...(s.paragraphs || []), ...(s.items || [])].map((text) => ({ text })) })),
    faqs: [],
  })),
  legalPage(PRIVACY_LINK.href, PRIVACY_POLICY),
  legalPage(TERMS_LINK.href, TERMS),
];
