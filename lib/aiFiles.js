// Files for AI assistants and agents, built from the page index so they always match the site:
//   /llms.txt       a map of the site in the llms.txt format (llmstxt.org)
//   /llms-full.txt  the main text and FAQs of every page in one Markdown file
//   /okf/           the same knowledge as a Google Open Knowledge Format (OKF v0.2) bundle of Markdown files
// Google Search doesn't read these; it uses the sitemap, the pages and their structured data.

import { LOCATIONS } from '@/data/locations';
import { OFFERS } from '@/data/offers';
import { BUSINESS, OFFICES, PHONE, PROOF_POINTS, SITE_URL } from '@/data/site';
import { PAGE_INDEX } from './pageIndex';
import { plainText, toMarkdown } from './richText';

const md = (text) => toMarkdown(text, SITE_URL);
const webLink = (href) => (href.startsWith('/') ? SITE_URL + href : href);

// ----- Business facts (shared by all three) -----

const time = (t) => {
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, '0')}` : ''} ${h < 12 ? 'am' : 'pm'}`;
};
const dayRange = (days) => (days.length > 1 ? `${days[0]}–${days.at(-1)}` : days[0]);
const officeText = ({ name, address: a }) => `${name}, ${a.street}, ${a.city}, ${a.region} ${a.postalCode}`;

const FACTS = [
  ['Business', `${BUSINESS.name} (${BUSINESS.shortName}), a roofing contractor for homes and commercial buildings`],
  ['License', `California contractor license (CSLB) #${BUSINESS.license}`],
  ['Phone', PHONE],
  ['Email', BUSINESS.email],
  ['Offices', OFFICES.map(officeText).join('; ')],
  ['Hours', BUSINESS.hours.map((h) => `${dayRange(h.days)} ${time(h.opens)}–${time(h.closes)}`).join('; ')],
  ['Service area', `Los Angeles County and Orange County, California: ${LOCATIONS.map((l) => l.city).join(', ')} and nearby cities`],
  ['Website', `${SITE_URL}/`],
];

const HOW_WE_WORK =
  `Every project starts with a roofer-led look at the roof (the ${OFFERS.home.price} Roof Check for homes, a roof survey for ` +
  'commercial, HOA and partner projects), photo documentation, and a written scope and price before any work begins. ' +
  'Installs are backed by a lifetime workmanship warranty.';

const offerLines = (heading, offer) => [heading, '', offer.text, '', ...offer.points.map((p) => `- ${p.title} ${p.text}`), ''];

function workingWithQrs(level) {
  const h = '#'.repeat(level);
  return [
    HOW_WE_WORK,
    '',
    ...PROOF_POINTS.map((p) => `- ${p.title}: ${p.text}`),
    '',
    ...offerLines(`${h} ${OFFERS.home.price} Roof Check (homes)`, OFFERS.home),
    ...offerLines(`${h} Roof survey (commercial, HOA and partner projects)`, OFFERS.commercial),
  ];
}

// ----- Page text as Markdown. level: heading level for the page's sections; link: how to write a page address -----

function itemLines(item, link) {
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
    out.push(`${h()} ${list.heading}`, '', ...list.items.flatMap((item) => itemLines(item, link)), '');
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
  ['residential', 'Residential roofing'],
  ['commercial', 'Commercial roofing'],
  ['service-areas', 'Service areas'],
];

export function llmsTxt() {
  const lines = [`# ${BUSINESS.name}`, '', `> ${BUSINESS.description}`, '', ...FACTS.map(([k, v]) => `- ${k}: ${v}`), '', HOW_WE_WORK, ''];
  for (const [group, heading] of GROUPS) {
    lines.push(`## ${heading}`, '');
    for (const p of PAGE_INDEX.filter((page) => page.group === group)) lines.push(`- [${p.label}](${webLink(p.path)}): ${p.description}`);
    lines.push('');
  }
  lines.push(
    '## Optional',
    '',
    `- [Full site content](${SITE_URL}/llms-full.txt): The main text and FAQs of every page in one Markdown file`,
    `- [OKF knowledge bundle](${SITE_URL}/okf/index.md): The same knowledge as Open Knowledge Format (OKF v0.2) Markdown files`,
    `- [Sitemap](${SITE_URL}/sitemap.xml): Every page on the site`,
    ''
  );
  return lines.join('\n');
}

// ----- /llms-full.txt -----

export function llmsFullTxt() {
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
  for (const page of PAGE_INDEX) {
    lines.push('---', '', `## ${page.label}`, '', `URL: ${webLink(page.path)}`, '', page.description, '', ...pageBody(page, 3, webLink));
  }
  return lines.join('\n');
}

// ----- /okf/: one concept per page, stored at the page's address (/tile-roofing/lift-and-relay/ → tile-roofing/lift-and-relay.md) -----

const OKF_TYPES = {
  home: 'Organization',
  hub: 'Service Category',
  service: 'Service',
  areas: 'Service Area List',
  city: 'Service Area',
  about: 'Company Profile',
  careers: 'Careers',
};

const conceptPath = (path) => (path === '/' ? 'company.md' : `${path.slice(1, -1)}.md`);
const CONCEPTS = new Map(PAGE_INDEX.map((p) => [p.path, conceptPath(p.path)]));

// Links to pages that have a concept point inside the bundle (/tile-roofing.md); others go to the website
const okfLink = (href) => {
  const path = href.split('#')[0];
  return CONCEPTS.has(path) ? `/${CONCEPTS.get(path)}` : webLink(href);
};

const frontmatter = (fields) => ['---', ...Object.entries(fields).map(([k, v]) => `${k}: ${JSON.stringify(v)}`), '---', ''];

function concept(page) {
  const isHome = page.kind === 'home';
  const tags = [...new Set([page.group, ...page.path.split('/').filter(Boolean), ...(page.county ? [page.county.toLowerCase().replace(/\s+/g, '-')] : [])])];
  const parent = page.parent && PAGE_INDEX.find((p) => p.path === page.parent);
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
  lines.push(...pageBody(isHome ? { ...page, summary: '' } : page, 1, okfLink));
  lines.push('# Related', '');
  if (parent) lines.push(`- Part of: [${parent.kind === 'home' ? BUSINESS.name : parent.label}](/${CONCEPTS.get(parent.path)})`);
  lines.push(`- Web page: ${webLink(page.path)}`, '');
  return lines.join('\n');
}

const indexEntry = (page, from) => `* [${page.kind === 'home' ? BUSINESS.name : page.label}](${CONCEPTS.get(page.path).slice(from.length)}) - ${page.kind === 'home' ? BUSINESS.description : page.description}`;

let bundle;

// Every file in the bundle: { 'index.md': '...', 'company.md': '...', 'tile-roofing/lift-and-relay.md': '...', ... }
export function okfFiles() {
  if (bundle) return bundle;
  bundle = {};
  for (const page of PAGE_INDEX) bundle[CONCEPTS.get(page.path)] = concept(page);

  // Folders (tile-roofing/, locations/, ...) get an index.md listing their concepts
  const folders = new Map();
  for (const page of PAGE_INDEX) {
    const file = CONCEPTS.get(page.path);
    if (!file.includes('/')) continue;
    const folder = file.slice(0, file.lastIndexOf('/') + 1);
    folders.set(folder, [...(folders.get(folder) || []), page]);
  }
  for (const [folder, pages] of folders) {
    const owner = PAGE_INDEX.find((p) => CONCEPTS.get(p.path) === `${folder.slice(0, -1)}.md`);
    bundle[`${folder}index.md`] = [`# ${owner ? owner.label : folder}`, '', ...pages.map((p) => indexEntry(p, folder)), ''].join('\n');
  }

  // Bundle root index, grouped like the site
  const root = frontmatter({ okf_version: '0.2' });
  for (const [group, heading] of GROUPS) {
    root.push(`# ${heading}`, '');
    for (const page of PAGE_INDEX.filter((p) => p.group === group && !CONCEPTS.get(p.path).includes('/'))) {
      root.push(indexEntry(page, ''));
      const folder = `${CONCEPTS.get(page.path).slice(0, -3)}/`;
      if (folders.has(folder)) root.push(`* [${page.label}: all pages](${folder}index.md) - ${folders.get(folder).length} ${folders.get(folder).length === 1 ? 'concept' : 'concepts'}`);
    }
    root.push('');
  }
  bundle['index.md'] = root.join('\n');
  return bundle;
}
