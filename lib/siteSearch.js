// Site search (owner, November 9 2026): the header's search box and the /search/ results page. It searches the same page index as the AI files and
// the chat assistant (lib/siteIndex.js: every service, hub, city, county, project, article and company page, with their FAQs and lists), scored by
// where the words appear: the page's name and keyword count most, then its meta title, description, summary, and finally its body text and FAQs.
// A word matches whole or as the start of a longer word ("shingl" finds shingles). Only pages that match every word are shown, unless nothing
// does, in which case pages matching most of the words are shown. No outside service and nothing stored: it runs on the server per request.
import { getPageIndex } from './siteIndex';
import { searchHeading } from './headings';

const STOPWORDS = new Set(['the', 'a', 'an', 'and', 'or', 'of', 'to', 'for', 'in', 'on', 'is', 'are', 'do', 'does', 'my', 'your', 'you', 'it', 'what', 'how', 'can', 'with', 'about', 'me', 'this', 'that', 'near', 'qrs']);

// Plain text from the data files' [links](/path/), **bold**, *brand* and __marks__
export const plainText = (text) =>
  String(text || '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

// singular and plural count as the same word: warranties = warranty, leaks = leak, shingles = shingle
const stem = (w) => (w.length > 4 && w.endsWith('ies') ? w.slice(0, -3) + 'y' : w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w);
const rawWords = (text) => String(text || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').match(/[a-z0-9]+/g) || [];
export const searchTokens = (q) => [...new Set(rawWords(q).filter((w) => w.length > 1 && !STOPWORDS.has(w)).map(stem))].slice(0, 8);

// Which group a page appears under on the results page
const GROUPS = {
  service: 'Services', hub: 'Services', home: 'Pages',
  city: 'Service areas', region: 'Service areas', areas: 'Service areas',
  post: 'Articles', blog: 'Articles', faq: 'Articles', glossary: 'Articles',
  project: 'Projects', projects: 'Projects',
  about: 'Company', careers: 'Company', contact: 'Company', reviews: 'Company', legal: 'Company',
};
export const SEARCH_GROUPS = ['Services', 'Service areas', 'Projects', 'Articles', 'Company', 'Pages'];

const wordsOf = (text) => rawWords(text).map(stem);
const hits = (words, token) => words.reduce((n, w) => n + (w === token || (token.length > 3 && w.startsWith(token)) ? 1 : 0), 0);

function prepare(page) {
  const body = [
    ...(page.paragraphs || []),
    ...(page.lists || []).filter(Boolean).flatMap((l) => [l.heading, ...(l.items || []).filter(Boolean).flatMap((i) => [i.title, i.text])]),
    ...(page.faqs || []).filter(Boolean).flatMap((f) => [f.q, f.a]),
  ].map(plainText);
  return {
    page,
    name: wordsOf(plainText(`${page.name || ''} ${page.label || ''}`)),
    keyword: wordsOf(page.keyword),
    title: wordsOf(plainText(page.title)),
    desc: wordsOf(plainText(`${page.description || ''} ${page.summary || ''}`)),
    body: wordsOf(body.join(' ')),
    sentences: [plainText(page.description), plainText(page.summary), ...body].filter(Boolean).flatMap((t) => t.split(/(?<=[.!?])\s+/)),
  };
}

let cacheKey = '';
let prepared = [];
async function corpus() {
  const index = await getPageIndex();
  const key = `${index.length}:${index.map((p) => p.path).join('|').length}:${JSON.stringify(index.filter((p) => p.kind === 'post')).length}`;
  if (key !== cacheKey) {
    prepared = index.filter((p) => p.path && p.kind !== 'home-es').map(prepare);
    cacheKey = key;
  }
  return prepared;
}

// The sentence that best shows why a page matched, cut to about 180 characters
function snippetFor(entry, tokens) {
  let best = '';
  let bestScore = 0;
  for (const s of entry.sentences) {
    const w = wordsOf(s);
    const score = tokens.reduce((n, t) => n + (hits(w, t) ? 1 : 0), 0);
    if (score > bestScore) {
      best = s;
      bestScore = score;
    }
  }
  const text = best || entry.sentences[0] || '';
  return text.length > 190 ? text.slice(0, 186).replace(/\s+\S*$/, '') + '…' : text;
}

export async function searchSite(query, { limit = 40 } = {}) {
  const tokens = searchTokens(query);
  if (!tokens.length) return { query: String(query || '').trim(), tokens, results: [], total: 0 };
  const phrase = tokens.join(' ');
  const scored = (await corpus()).map((e) => {
    let score = 0;
    let matched = 0;
    for (const t of tokens) {
      const s = hits(e.name, t) * 10 + hits(e.keyword, t) * 8 + hits(e.title, t) * 5 + Math.min(hits(e.desc, t), 3) * 3 + Math.min(hits(e.body, t), 6);
      if (s) matched += 1;
      score += s;
    }
    if (tokens.length > 1 && wordsOf(plainText(e.page.name)).join(' ').includes(phrase)) score += 20;
    // a service or hub page outranks an article on the same words
    if (score && (e.page.kind === 'service' || e.page.kind === 'hub')) score = Math.round(score * 1.3) + 6;
    return { e, score, matched };
  });
  let list = scored.filter((s) => s.matched === tokens.length && s.score > 0);
  const partial = !list.length;
  if (partial) list = scored.filter((s) => s.matched >= Math.max(1, Math.ceil(tokens.length / 2)) && s.score > 0);
  list.sort((a, b) => b.score - a.score);
  const results = list.slice(0, limit).map(({ e }) => ({
    path: e.page.path,
    // service and hub pages show their live H1 (no place, with the product name); others their own name
    title: plainText(e.page.kind === 'service' || e.page.kind === 'hub' ? searchHeading(e.page.name || e.page.label, { place: false }) : e.page.name || e.page.label || e.page.title),
    group: GROUPS[e.page.kind] || 'Pages',
    snippet: snippetFor(e, tokens),
  }));
  return { query: String(query || '').trim(), tokens, results, total: list.length, partial };
}
