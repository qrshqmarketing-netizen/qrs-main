// Loads the site's content into the assistant's knowledge table (`assistant_pages`, scripts/supabase-assistant.sql) so the chat function can
// search it. Run it after changing page copy or publishing articles:
//   npm run assistant:sync            (needs SUPABASE_URL and SUPABASE_SECRET_KEY in the environment or .env.local)
//   npm run assistant:sync -- --dry   (only counts what it would send)
// It also saves the assistant's instructions (data/assistant.js) as `system_prompt` in `assistant_config` the first time only, so later edits made
// in the database aren't overwritten; pass --prompt to replace it with the site's current text.
import { readFileSync } from 'node:fs';
import { getPageIndex } from '../lib/siteIndex.js';
import { SYSTEM_PROMPT } from '../data/assistant.js';
import { dbRequest } from '../lib/supabase.js';

try {
  for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch {}

// Same scrub as the website's lib/chatRetrieval.js: no links or bold marks in what the model reads, and the paused $199 Roof Check price stays out
const plain = (text) =>
  String(text || '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\$199\s*Roof\s*Check/gi, 'Roof Check tune-up');

function block(page) {
  const lines = [`### ${plain(page.name)} (${page.path})`];
  if (page.summary) lines.push(plain(page.summary));
  for (const p of (page.paragraphs || []).slice(0, 2)) if (p) lines.push(plain(p));
  for (const list of (page.lists || []).filter(Boolean).slice(0, 4)) {
    if (!list.items?.length) continue;
    if (list.heading) lines.push(plain(list.heading) + ':');
    for (const item of list.items.filter(Boolean).slice(0, 6)) {
      const row = [plain(item.title), plain(item.text)].filter(Boolean).join(' — ');
      if (row) lines.push('- ' + row);
    }
  }
  for (const f of (page.faqs || []).filter(Boolean).slice(0, 3)) lines.push(`Q: ${plain(f.q)} A: ${plain(f.a)}`);
  return lines.join('\n');
}

const searchText = (page) =>
  plain(
    [
      page.title,
      page.summary,
      ...(page.paragraphs || []),
      ...(page.lists || []).filter(Boolean).flatMap((l) => [l.heading, ...(l.items || []).filter(Boolean).flatMap((i) => [i.title, i.text])]),
      ...(page.faqs || []).filter(Boolean).flatMap((f) => [f.q, f.a]),
    ]
      .filter(Boolean)
      .join(' ')
  );

const index = await getPageIndex();
const rows = index.map((page) => ({ path: page.path, kind: page.kind || null, name: plain(page.name), block: block(page), search_text: searchText(page), updated_at: new Date().toISOString() }));
console.log(`${rows.length} pages ready`);
if (process.argv.includes('--dry')) process.exit(0);

// Replace the whole set: upsert everything, then remove pages that no longer exist
for (let i = 0; i < rows.length; i += 50) {
  await dbRequest('assistant_pages?on_conflict=path', { method: 'POST', body: rows.slice(i, i + 50), prefer: 'resolution=merge-duplicates,return=minimal' });
}
const have = await dbRequest('assistant_pages?select=path');
const keep = new Set(rows.map((r) => r.path));
const gone = have.map((r) => r.path).filter((p) => !keep.has(p));
for (const path of gone) await dbRequest(`assistant_pages?path=eq.${encodeURIComponent(path)}`, { method: 'DELETE' });
console.log(`saved ${rows.length} pages, removed ${gone.length}`);

const existing = await dbRequest('assistant_config?key=eq.system_prompt&select=key');
if (!existing?.length || process.argv.includes('--prompt')) {
  await dbRequest('assistant_config?on_conflict=key', { method: 'POST', body: [{ key: 'system_prompt', value: SYSTEM_PROMPT, updated_at: new Date().toISOString() }], prefer: 'resolution=merge-duplicates,return=minimal' });
  console.log('saved the assistant instructions');
}
