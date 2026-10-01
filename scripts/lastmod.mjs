// Keeps data/lastModified.json up to date: each page's last-modified date for the sitemap (app/sitemap.js).
// It fingerprints each page's text (title, description, H1, intro, body, lists and FAQs from lib/pageIndex.js) and
// moves a page's date to today only when that text changed, so search engines can trust the dates.
// Runs before every build (npm run build) and on its own with: npm run lastmod
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = new URL('../data/lastModified.json', import.meta.url);
const { PAGE_INDEX } = await import('../lib/pageIndex.js');

let saved = {};
try {
  saved = JSON.parse(readFileSync(FILE, 'utf8'));
} catch {} // first run

const today = new Date().toISOString().slice(0, 10);
const next = {};
let changed = 0;
for (const { path, title, description, name, summary, paragraphs, lists, faqs } of PAGE_INDEX) {
  const hash = createHash('sha256').update(JSON.stringify({ title, description, name, summary, paragraphs, lists, faqs })).digest('hex').slice(0, 16);
  const unchanged = saved[path]?.hash === hash;
  next[path] = { date: unchanged ? saved[path].date : today, hash };
  if (!unchanged) changed++;
}
writeFileSync(FILE, JSON.stringify(next, null, 2) + '\n');
console.log(`lastmod: ${Object.keys(next).length} pages, ${changed} updated to ${today}`);
