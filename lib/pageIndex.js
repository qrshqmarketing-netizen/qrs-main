// Every page, in site order, with the text AI assistants should know about it.
// llms.txt, llms-full.txt and the OKF knowledge bundle (lib/aiFiles.js) are built from this list.
//
// A page: { path, kind, group, parent, label, name, title, description, keyword, summary, paragraphs, lists, faqs }
//   kind: 'home' | 'hub' | 'service' | 'areas' | 'city' | 'about' | 'careers'
//   group: 'company' | 'residential' | 'commercial' | 'service-areas'; parent: the address of the page above it
//   label: short link text; name: the page's H1; title/description: its meta title and description
//   lists: [{ heading, items: [{ title, text?, bullets?, href? }] }] (process steps, reasons to choose QRS, and so on)
// Text may contain the data files' [links](/path/) and **bold**.

import { ABOUT_LINK, CAREERS_LINK, CONTRACTORS_LINK, LOCATIONS_LINK, RESIDENTIAL, RESIDENTIAL_TYPES } from '@/data/catalog';
import { COMMERCIAL, GUTTERS, HOA, SECTIONS, serviceHref } from '@/data/content';
import { FAQS } from '@/data/faqs';
import { LOCATION_PAGES } from '@/data/locationPages';
import { cityPath, LOCATIONS } from '@/data/locations';
import { ABOUT_PAGE } from '@/data/pages/about';
import { CAREERS_PAGE } from '@/data/pages/careers';
import { CONTRACTORS_PAGE } from '@/data/pages/contractors';
import { LOCATIONS_PAGE } from '@/data/pages/locations';
import { RESIDENTIAL_PAGE } from '@/data/pages/residential';
import { SERVICES } from '@/data/services';
import { HOME_DESCRIPTION, HOME_TITLE } from '@/data/site';

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
      { heading: section.hub.cards.heading, items: section.services.map((s) => ({ title: s.title, text: s.card, href: serviceHref(section, s) })) },
      pointsList(section.hub.highlights),
    ],
    faqs: section.hub.faqs,
  },
  ...section.services.map((s) => servicePage(serviceHref(section, s), s, group, section.href)),
];

const cityPage = (location) => {
  const page = LOCATION_PAGES[location.slug];
  return {
    path: cityPath(location.slug),
    kind: 'city',
    group: 'service-areas',
    parent: LOCATIONS_LINK.href,
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
    paragraphs: CONTRACTORS_PAGE.overview.paragraphs,
    lists: [pointsList(CONTRACTORS_PAGE.audiences), processList(CONTRACTORS_PAGE.process), pointsList(CONTRACTORS_PAGE.why)],
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
  ...LOCATIONS.map(cityPage),
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
];
