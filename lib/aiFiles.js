// Files for AI assistants and agents, built from the page index so they always match the site:
//   /llms.txt       a map of the site in the llms.txt format (llmstxt.org)
//   /llms-full.txt  the main text and FAQs of every page in one Markdown file
//   /okf/           the same knowledge as a Google Open Knowledge Format (OKF v0.2) bundle of Markdown files
// Google Search doesn't read these; it uses the sitemap, the pages and their structured data.

import { LOCATIONS } from '@/data/locations';
import { OFFERS } from '@/data/offers';
import { BUSINESS, COMPANY, OFFICES, PHONE, PROOF_POINTS, SITE_URL } from '@/data/site';
import { formatDate } from './dates';
import { hoursText } from './hours';
import { PAGE_INDEX } from './pageIndex';
import { plainText, toMarkdown, unmark } from './richText';

const md = (text) => toMarkdown(text, SITE_URL);
const webLink = (href) => (href.startsWith('/') ? SITE_URL + href : href);

// ----- Business facts (shared by all three) -----

const officeText = ({ name, address: a }) => `${name}, ${a.street}, ${a.city}, ${a.region} ${a.postalCode}`;

const FACTS = [
  ['Business', `${BUSINESS.name} (${BUSINESS.shortName}), a roofing contractor for homes and commercial buildings`],
  ['Mission', COMPANY.mission],
  ['Vision', COMPANY.vision],
  ['Core values', COMPANY.values.map((v) => v.title).join(', ')],
  ['License', `California contractor license (CSLB) #${BUSINESS.license}, licensed since ${formatDate(BUSINESS.licenseSince)}`],
  ['Phone', PHONE],
  ['Email', BUSINESS.email],
  ['Offices', OFFICES.map(officeText).join('; ')],
  ['Hours', hoursText(BUSINESS.hours)],
  ['Service area', `Los Angeles County and Orange County, California: ${LOCATIONS.map((l) => l.city).join(', ')} and nearby cities`],
  ['Website', `${SITE_URL}/`],
  ['MCP server (for AI agents)', `${SITE_URL}/mcp/ — check service-area coverage, search site content, get business info, and request an estimate callback`],
];

const HOW_WE_WORK =
  'Every project starts with a look at the roof (a free drone roof evaluation for homes, with an optional $199 Roof Check ' +
  'tune-up; a roof survey for commercial, HOA and partner projects), photo documentation, and a written scope and price ' +
  'before any work begins. ' +
  'Installs are backed by a 10-year workmanship warranty.';

const offerLines = (heading, offer) => [heading, '', offer.text, '', ...offer.points.map((p) => `- ${p.title} ${p.text}`), ''];

function workingWithQrs(level) {
  const h = '#'.repeat(level);
  return [
    HOW_WE_WORK,
    '',
    ...PROOF_POINTS.map((p) => `- ${p.title}: ${p.text}`),
    '',
    ...offerLines(`${h} Free roof evaluation and optional $199 Roof Check (homes)`, OFFERS.home),
    ...offerLines(`${h} Roof survey (commercial, HOA and partner projects)`, OFFERS.commercial),
  ];
}

// ----- Page text as Markdown. level: heading level for the page's sections; link: how to write a page address -----

function itemLines(item, link) {
  if (!item.title) return [`- ${md(item.text)}`];
  const title = item.href ? `[${item.title}](${link(item.href)})` : `**${item.title}**`;
  const links = item.links ? ` (${item.links.map((l) => `[${l.label}](${link(l.href)})`).join(', ')})` : '';
  return [`- ${title}${item.text ? `: ${md(item.text)}` : ''}${links}`, ...(item.bullets || []).map((b) => `  - ${md(b)}`)];
}

function pageBody(page, level, link) {
  const h = (extra = 0) => '#'.repeat(level + extra);
  const out = [];
  if (page.summary) out.push(md(page.summary), '');
  for (const p of page.paragraphs) out.push(md(p), '');
  for (const list of page.lists) {
    out.push(`${h()} ${unmark(list.heading)}`, '', ...list.items.flatMap((item) => itemLines(item, link)), '');
  }
  if (page.faqs.length > 0) {
    out.push(`${h()} FAQs`, '');
    for (const f of page.faqs) out.push(`${h(1)} ${plainText(f.q)}`, '', md(f.a), '');
  }
  return out;
}

// ----- /llms.txt -----

const GROUPS = [
  ['company', 'Company'],
  ['services', 'Roofing services'],
  ['residential', 'Residential roofing'],
  ['commercial', 'Commercial roofing'],
  ['service-areas', 'Service areas'],
  ['blog', 'Roofing blog'],
];

export function llmsTxt(index = PAGE_INDEX) {
  const lines = [`# ${BUSINESS.name}`, '', `> ${BUSINESS.description}`, '', ...FACTS.map(([k, v]) => `- ${k}: ${v}`), '', HOW_WE_WORK, ''];
  for (const [group, heading] of GROUPS) {
    const pages = index.filter((page) => page.group === group);
    if (pages.length === 0) continue; // e.g. the blog, until it has a published post
    lines.push(`## ${heading}`, '');
    for (const p of pages) lines.push(`- [${p.label}](${webLink(p.path)}): ${p.description}`);
    lines.push('');
  }
  lines.push(
    '## Optional',
    '',
    `- [Full site content](${SITE_URL}/llms-full.txt): The main text and FAQs of every page in one Markdown file`,
    `- [OKF knowledge bundle](${SITE_URL}/okf/index.md): The same knowledge as Open Knowledge Format (OKF v0.2) Markdown files`,
    `- [Sitemap](${SITE_URL}/sitemap.xml): Every page on the site`,
    `- [MCP server manifest](${SITE_URL}/.well-known/mcp.json): Machine-readable pointer to the MCP server above, for AI clients that check for one`,
    ''
  );
  return lines.join('\n');
}

// ----- /llms-full.txt -----

export function llmsFullTxt(index = PAGE_INDEX) {
  const lines = [
    `# ${BUSINESS.name}`,
    '',
    `> ${BUSINESS.description}`,
    '',
    '## Business facts',
    '',
    ...FACTS.map(([k, v]) => `- ${k}: ${v}`),
    '',
    '## Working with QRS',
    '',
    ...workingWithQrs(3),
  ];
  for (const page of index) {
    lines.push('---', '', `## ${page.label}`, '', `URL: ${webLink(page.path)}`, '', page.description, '', ...pageBody(page, 3, webLink));
  }
  return lines.join('\n');
}

// ----- /okf/: one concept per page, stored at the page's address (/residential-roofing/tile-roofing/lift-and-relay/ → tile-roofing/lift-and-relay.md) -----

const OKF_TYPES = {
  home: 'Organization',
  hub: 'Service Category',
  service: 'Service',
  areas: 'Service Area List',
  region: 'Service Region',
  contact: 'Contact Information',
  reviews: 'Customer Reviews',
  projects: 'Project Portfolio',
  project: 'Roofing Project',
  legal: 'Policy',
  blog: 'Article List',
  post: 'Article',
  city: 'Service Area',
  about: 'Company Profile',
  careers: 'Careers',
};

const conceptPath = (path) => (path === '/' ? 'company.md' : `${path.slice(1, -1)}.md`);
const conceptsFor = (index) => new Map(index.map((p) => [p.path, conceptPath(p.path)]));

// Links to pages that have a concept point inside the bundle (/tile-roofing.md); others go to the website
const okfLinker = (concepts) => (href) => {
  const path = href.split('#')[0];
  return concepts.has(path) ? `/${concepts.get(path)}` : webLink(href);
};

const frontmatter = (fields) => ['---', ...Object.entries(fields).map(([k, v]) => `${k}: ${JSON.stringify(v)}`), '---', ''];

function concept(page, index, concepts) {
  const isHome = page.kind === 'home';
  const tags = [...new Set([page.group, ...page.path.split('/').filter(Boolean), ...(page.county ? [page.county.toLowerCase().replace(/\s+/g, '-')] : [])])];
  const parent = page.parent && index.find((p) => p.path === page.parent);
  const lines = [
    ...frontmatter({
      type: OKF_TYPES[page.kind],
      title: isHome ? BUSINESS.name : page.label,
      description: isHome ? BUSINESS.description : page.description,
      resource: webLink(page.path),
      tags: isHome ? ['company', 'roofing-contractor', 'los-angeles-county', 'orange-county'] : tags,
    }),
  ];
  if (isHome) {
    lines.push('# Facts', '', '| Fact | Detail |', '| --- | --- |', ...FACTS.map(([k, v]) => `| ${k} | ${v} |`), '', '# Working with QRS', '', ...workingWithQrs(2));
  }
  lines.push(...pageBody(isHome ? { ...page, summary: '' } : page, 1, okfLinker(concepts)));
  lines.push('# Related', '');
  if (parent) lines.push(`- Part of: [${parent.kind === 'home' ? BUSINESS.name : parent.label}](/${concepts.get(parent.path)})`);
  lines.push(`- Web page: ${webLink(page.path)}`, '');
  return lines.join('\n');
}

const indexEntry = (page, from, concepts) => `* [${page.kind === 'home' ? BUSINESS.name : page.label}](${concepts.get(page.path).slice(from.length)}) - ${page.kind === 'home' ? BUSINESS.description : page.description}`;

const bundles = new WeakMap(); // one bundle per page list

// Every file in the bundle: { 'index.md': '...', 'company.md': '...', 'tile-roofing/lift-and-relay.md': '...', ... }
export function okfFiles(index = PAGE_INDEX) {
  if (bundles.has(index)) return bundles.get(index);
  const concepts = conceptsFor(index);
  const bundle = {};
  for (const page of index) bundle[concepts.get(page.path)] = concept(page, index, concepts);

  // Folders (tile-roofing/, locations/, ...) get an index.md listing their concepts
  const folders = new Map();
  for (const page of index) {
    const file = concepts.get(page.path);
    if (!file.includes('/')) continue;
    const folder = file.slice(0, file.lastIndexOf('/') + 1);
    folders.set(folder, [...(folders.get(folder) || []), page]);
  }
  for (const [folder, pages] of folders) {
    const owner = index.find((p) => concepts.get(p.path) === `${folder.slice(0, -1)}.md`);
    bundle[`${folder}index.md`] = [`# ${owner ? owner.label : folder}`, '', ...pages.map((p) => indexEntry(p, folder, concepts)), ''].join('\n');
  }

  // Bundle root index, grouped like the site
  const root = frontmatter({ okf_version: '0.2' });
  for (const [group, heading] of GROUPS) {
    root.push(`# ${heading}`, '');
    for (const page of index.filter((p) => p.group === group && !concepts.get(p.path).includes('/'))) {
      root.push(indexEntry(page, '', concepts));
      const folder = `${concepts.get(page.path).slice(0, -3)}/`;
      if (folders.has(folder)) root.push(`* [${page.label}: all pages](${folder}index.md) - ${folders.get(folder).length} ${folders.get(folder).length === 1 ? 'concept' : 'concepts'}`);
    }
    root.push('');
  }
  bundle['index.md'] = root.join('\n');
  bundles.set(index, bundle);
  return bundle;
}
