// How an article is written in the dashboard (/admin/): plain text instead of the structured data the site pages use.
// No imports, so it runs in the browser (the editor's live checks) and on the server (saving, importing).
//
// The article body is a list of sections. A section starts with a "## Heading" line, then its content, one block at a time,
// with a blank line between blocks:
//
//   ## What to Check First
//
//   A paragraph. It can have [a link](/roof-repair/) and **bold** words.
//
//   ### A subheading
//
//   > A callout paragraph (a highlighted note).
//
//   - A bullet
//   - Another bullet
//
//   1. A numbered step
//   2. The next step
//
//   - [ ] A checklist item
//   - [ ] Another one
//
//   | Column A | Column B |
//   | --- | --- |
//   | A cell | Another cell |
//
// The intro is paragraphs separated by blank lines. The FAQs are "Q: question" followed by "A: answer", with a blank line between pairs.
// The structured data these become is described at the top of data/blog/posts.js.

const H2 = /^## (.+)$/;
const H3 = /^### (.+)$/;
const NOTE = /^> (.+)$/;
const CHECK = /^- \[ \] (.+)$/;
const BULLET = /^- (.+)$/;
const STEP = /^\d+\. (.+)$/;
const ROW = /^\|(.*)\|\s*$/;

const clean = (s) => String(s).replace(/\s+/g, ' ').trim();
const escapeCell = (s) => String(s).replace(/\|/g, '\\|');
const splitRow = (line) => {
  const cells = [];
  let cell = '';
  const inner = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  for (let i = 0; i < inner.length; i++) {
    if (inner[i] === '\\' && inner[i + 1] === '|') {
      cell += '|';
      i++;
    } else if (inner[i] === '|') {
      cells.push(cell.trim());
      cell = '';
    } else cell += inner[i];
  }
  cells.push(cell.trim());
  return cells;
};

// ---------- blocks ----------

// Text -> blocks ([ 'a paragraph', { h3 }, { note }, { list }, { steps }, { checklist }, { table: { head, rows } } ])
export function textToBlocks(text) {
  const blocks = [];
  let paragraph = [];
  let group = null; // { kind, items } for list, steps, checklist
  let table = null; // [ [cells], ... ]
  const flushParagraph = () => {
    if (paragraph.length) blocks.push(clean(paragraph.join(' ')));
    paragraph = [];
  };
  const flushGroup = () => {
    if (group) blocks.push({ [group.kind]: group.items });
    group = null;
  };
  const flushTable = () => {
    if (table && table.length) {
      const [head, ...rest] = table;
      const rows = rest.filter((r, i) => !(i === 0 && r.every((c) => /^:?-{2,}:?$/.test(c))));
      blocks.push({ table: { head, rows } });
    }
    table = null;
  };
  const flushAll = () => {
    flushParagraph();
    flushGroup();
    flushTable();
  };
  const addItem = (kind, item) => {
    flushParagraph();
    flushTable();
    if (group && group.kind !== kind) flushGroup();
    if (!group) group = { kind, items: [] };
    group.items.push(clean(item));
  };

  for (const raw of String(text || '').replace(/\r\n?/g, '\n').split('\n')) {
    const line = raw.trim();
    let m;
    if (!line) flushAll();
    else if ((m = line.match(H3))) {
      flushAll();
      blocks.push({ h3: clean(m[1]) });
    } else if ((m = line.match(NOTE))) {
      flushAll();
      blocks.push({ note: clean(m[1]) });
    } else if ((m = line.match(CHECK))) addItem('checklist', m[1]);
    else if ((m = line.match(BULLET))) addItem('list', m[1]);
    else if ((m = line.match(STEP))) addItem('steps', m[1]);
    else if (ROW.test(line)) {
      flushParagraph();
      flushGroup();
      (table = table || []).push(splitRow(line));
    } else {
      flushGroup();
      flushTable();
      paragraph.push(line);
    }
  }
  flushAll();
  return blocks;
}

// Blocks -> text
export function blocksToText(blocks = []) {
  return blocks
    .map((b) => {
      if (typeof b === 'string') return b;
      if (b.h3) return `### ${b.h3}`;
      if (b.note) return `> ${b.note}`;
      if (b.list) return b.list.map((i) => `- ${i}`).join('\n');
      if (b.checklist) return b.checklist.map((i) => `- [ ] ${i}`).join('\n');
      if (b.steps) return b.steps.map((i, n) => `${n + 1}. ${i}`).join('\n');
      if (b.table) {
        const { head, rows } = b.table;
        const row = (cells) => `| ${cells.map(escapeCell).join(' | ')} |`;
        return [row(head), row(head.map(() => '---')), ...rows.map(row)].join('\n');
      }
      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}

// ---------- sections ----------

// Text -> { sections, stray }. `stray` is any text found before the first "## Heading" (it can't be placed, so the editor warns).
export function textToSections(text) {
  const sections = [];
  let current = null;
  let stray = '';
  let body = [];
  const close = () => {
    if (current) sections.push({ heading: current, blocks: textToBlocks(body.join('\n')) });
    else stray = body.join('\n').trim();
    body = [];
  };
  for (const line of String(text || '').replace(/\r\n?/g, '\n').split('\n')) {
    const m = line.trim().match(H2);
    if (m) {
      close();
      current = clean(m[1]);
    } else body.push(line);
  }
  close();
  return { sections, stray };
}

export const sectionsToText = (sections = []) =>
  sections.map((s) => `## ${s.heading}\n\n${blocksToText(s.blocks)}`.trimEnd()).join('\n\n');

// ---------- intro and FAQs ----------

export const textToIntro = (text) =>
  String(text || '')
    .replace(/\r\n?/g, '\n')
    .split(/\n\s*\n/)
    .map(clean)
    .filter(Boolean);
export const introToText = (intro = []) => intro.join('\n\n');

export function textToFaqs(text) {
  const faqs = [];
  let current = null;
  let field = null;
  for (const raw of String(text || '').replace(/\r\n?/g, '\n').split('\n')) {
    const line = raw.trim();
    let m;
    if (!line) {
      field = null;
    } else if ((m = line.match(/^Q:\s*(.*)$/i))) {
      current = { q: clean(m[1]), a: '' };
      faqs.push(current);
      field = 'q';
    } else if (current && (m = line.match(/^A:\s*(.*)$/i))) {
      current.a = clean(m[1]);
      field = 'a';
    } else if (current && field) current[field] = clean(`${current[field]} ${line}`);
  }
  return faqs.filter((f) => f.q);
}
export const faqsToText = (faqs = []) => faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n');

// ---------- the whole article ----------

// The editor's text fields <-> the article (the shape the site pages use, see data/blog/posts.js)
export function postToForm(post) {
  return {
    slug: post.slug || '',
    status: post.status || 'draft',
    title: post.title || '',
    keyword: post.keyword || '',
    metaTitle: post.metaTitle || '',
    metaDescription: post.metaDescription || '',
    datePublished: post.datePublished || '',
    excerpt: post.excerpt || '',
    topics: (post.topics || []).join(', '),
    related: (post.related || []).join('\n'),
    image: post.image || '',
    imageAlt: post.imageAlt || '',
    cardImage: post.cardImage || '',
    heroImage: post.heroImage || '',
    author: post.author || '',
    noindex: Boolean(post.noindex),
    homeSlot: post.homeSlot ? String(post.homeSlot) : '',
    intro: introToText(post.intro),
    body: sectionsToText(post.sections),
    faqs: faqsToText(post.faqs),
    closingHeading: post.closing?.heading || '',
    closingBody: blocksToText(post.closing?.blocks),
  };
}

const list = (s, sep) => String(s || '').split(sep).map((x) => x.trim()).filter(Boolean);

export function formToPost(form) {
  const { sections, stray } = textToSections(form.body);
  const closingBlocks = textToBlocks(form.closingBody);
  return {
    stray,
    post: {
      slug: String(form.slug || '').trim(),
      status: form.status === 'published' ? 'published' : 'draft',
      title: clean(form.title),
      keyword: clean(form.keyword),
      metaTitle: clean(form.metaTitle),
      metaDescription: clean(form.metaDescription),
      datePublished: String(form.datePublished || '').trim(),
      excerpt: clean(form.excerpt),
      topics: list(form.topics, /[,\n]/).map((t) => t.toLowerCase()),
      related: list(form.related, /[\s,]+/),
      image: String(form.image || '').trim() || null,
      imageAlt: clean(form.imageAlt) || null,
      cardImage: String(form.cardImage || '').trim() || null,
      heroImage: String(form.heroImage || '').trim() || null,
      author: clean(form.author) || null,
      noindex: Boolean(form.noindex),
      homeSlot: form.homeSlot ? Number(form.homeSlot) : null,
      intro: textToIntro(form.intro),
      sections,
      faqs: textToFaqs(form.faqs),
      closing: clean(form.closingHeading) || closingBlocks.length ? { heading: clean(form.closingHeading), blocks: closingBlocks } : null,
    },
  };
}

// ---------- checks ----------

export const slugify = (title) =>
  String(title || '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
    .replace(/-$/, '');

const allText = (post) => {
  const out = [...(post.intro || []), ...(post.sections || []).flatMap((s) => [s.heading, ...blocksText(s.blocks)])];
  (post.faqs || []).forEach((f) => out.push(f.q, f.a));
  if (post.closing) out.push(post.closing.heading, ...blocksText(post.closing.blocks));
  return out;
};
const blocksText = (blocks = []) =>
  blocks.flatMap((b) => {
    if (typeof b === 'string') return [b];
    if (b.h3) return [b.h3];
    if (b.note) return [b.note];
    if (b.list || b.checklist || b.steps) return b.list || b.checklist || b.steps;
    if (b.table) return [...b.table.head, ...b.table.rows.flat()];
    return [];
  });

// The site's content rules, for the editor's live panel and for saving.
//   problems: the article can't be saved like this
//   seo: the keyword rule (the keyword in the title, meta title, meta description and first 100 words): required to publish
//   warnings: worth fixing (lengths, links to pages that don't exist, the owner's wording rules)
// knownPaths (optional): every address on the site, to catch links to pages that don't exist
export function checkPost(post, { knownPaths } = {}) {
  const problems = [];
  const seo = [];
  const warnings = [];
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(post.slug || '')) problems.push('The address (slug) can only use lowercase letters, numbers and dashes, like "roof-leak-source".');
  if (!post.title) problems.push('Add a title.');
  if (!post.keyword) problems.push('Add the keyword (the search the article is for).');
  if (!post.metaTitle) problems.push('Add a meta title.');
  if (!post.metaDescription) problems.push('Add a meta description.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.datePublished || '') || Number.isNaN(Date.parse(`${post.datePublished}T12:00:00Z`))) problems.push('The published date needs to be a real date.');
  if (!post.sections?.length) problems.push('Add at least one "## Heading" section to the body.');
  const headings = (post.sections || []).map((s) => s.heading.toLowerCase());
  if (new Set(headings).size !== headings.length) problems.push('Two sections have the same heading. Each heading needs to be different.');
  (post.sections || []).forEach((s) => {
    if (!s.blocks.length) problems.push(`The section "${s.heading}" is empty.`);
  });
  for (const field of ['image', 'cardImage', 'heroImage']) {
    const v = post[field];
    if (v && !/^(\/images\/[\w./-]+|https:\/\/[\w.-]+\/[\w./%-]+)$/.test(v)) problems.push(`The ${field === 'image' ? 'image' : field} address should look like /images/blog/name.webp.`);
  }

  const key = (post.keyword || '').toLowerCase();
  if (key) {
    const first100 = (post.intro || []).join(' ').split(/\s+/).slice(0, 100).join(' ').toLowerCase();
    if (!(post.title || '').toLowerCase().includes(key)) seo.push('The title (H1) needs to contain the keyword.');
    if (!(post.metaTitle || '').toLowerCase().includes(key)) seo.push('The meta title needs to contain the keyword.');
    if (!(post.metaDescription || '').toLowerCase().includes(key)) seo.push('The meta description needs to contain the keyword.');
    if (!first100.includes(key)) seo.push('The first 100 words of the intro need to contain the keyword.');
  }
  if ((post.metaTitle || '').length > 60) warnings.push(`The meta title is ${post.metaTitle.length} characters. About 60 or fewer keeps the keyword from being cut off.`);
  if ((post.metaDescription || '').length > 160) warnings.push(`The meta description is ${post.metaDescription.length} characters. 160 or fewer is best.`);
  if (!post.excerpt) warnings.push('Add an excerpt: it is the text on the article card.');
  if (!post.topics?.length) warnings.push('Add topics (like leak, repair, tile) so the article shows up as a related article on the right pages.');
  if (!post.image && !post.cardImage) warnings.push('No image yet: the cards will show placeholder art.');
  if (post.image && !post.imageAlt) warnings.push('Add alt text for the image.');

  const text = allText(post).join('\n');
  const oddLinks = [...text.matchAll(/\]\(\s*([^)\s]*)\s*\)/g)].map((m) => m[1]).filter((href) => !/^(\/|https:\/\/|mailto:|tel:|#)/i.test(href));
  if (oddLinks.length) problems.push(`These links aren't allowed (a link has to start with /, https://, mailto: or tel:): ${[...new Set(oddLinks)].join(', ')}`);
  if (/\bsubs\b|subcontractor/i.test(text)) warnings.push('Wording rule: say "crews", not "subs" or "subcontractors".');
  if (/30\+ years/i.test(text)) warnings.push('"30+ years" was retired from the site: do not use it.');
  if (knownPaths) {
    const bad = new Set();
    for (const m of [...text, ...(post.related || [])].join('\n').matchAll(/\]\((\/[^)#?\s]*)\)|^(\/[^\s]+)$/gm)) {
      const path = m[1] || m[2];
      if (path && !path.startsWith('/images/') && !knownPaths.has(path.endsWith('/') ? path : `${path}/`)) bad.add(path);
    }
    for (const path of (post.related || [])) if (!knownPaths.has(path)) bad.add(path);
    if (bad.size) warnings.push(`These links go to pages that don't exist: ${[...bad].join(', ')}`);
  }
  return { problems, seo, warnings };
}
