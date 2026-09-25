// Lightweight keyword search over PAGE_INDEX (lib/pageIndex.js — the same data that builds /llms-full.txt)
// so the chat assistant (app/api/chat/route.js) can ground its answers in the site's actual page content,
// not just the short facts list in SYSTEM_PROMPT. No embeddings, no vector store — just token overlap,
// which is plenty for a ~150-page site and keeps this free to run.

import { PAGE_INDEX } from './pageIndex';

// This site's content uses [text](/path/) links and **bold** (see AGENTS.md); the chat widget doesn't
// render either for AI replies, so strip them before this text ever reaches the model. Also scrubs the
// $199 Roof Check offer out of retrieved page content — it's paused in the assistant's context for now
// (SYSTEM_PROMPT in data/assistant.js), so page copy that still mentions it shouldn't reintroduce it here.
const plain = (text) =>
  String(text || '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\$199\s*Roof\s*Check/gi, 'roof inspection');

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'for', 'in', 'on', 'is', 'are', 'do', 'does', 'my', 'your',
  'you', 'i', 'it', 'what', 'how', 'can', 'with', 'about', 'we', 'me', 'this', 'that', 'have', 'has', 'be',
]);

const tokenize = (text) => String(text || '').toLowerCase().match(/[a-z0-9]+/g)?.filter((w) => w.length > 1 && !STOPWORDS.has(w)) || [];

// One token-frequency map per page, built once when this module first loads (PAGE_INDEX doesn't change at runtime)
const CORPUS = PAGE_INDEX.map((page) => {
  const blob = [
    page.name,
    page.title,
    page.keyword,
    page.summary,
    ...(page.paragraphs || []),
    ...(page.lists || []).filter(Boolean).flatMap((l) => [l.heading, ...(l.items || []).filter(Boolean).flatMap((i) => [i.title, i.text])]),
    ...(page.faqs || []).filter(Boolean).flatMap((f) => [f.q, f.a]),
  ]
    .filter(Boolean)
    .join(' ');
  const freq = new Map();
  for (const t of tokenize(blob)) freq.set(t, (freq.get(t) || 0) + 1);
  return { page, freq };
});

function summarize(page) {
  const faqs = (page.faqs || []).filter(Boolean).slice(0, 2).map((f) => `Q: ${plain(f.q)} A: ${plain(f.a)}`);
  const lines = [`### ${plain(page.name)} (${page.path})`, plain(page.summary), plain((page.paragraphs || [])[0]), ...faqs].filter(Boolean);
  return lines.join('\n');
}

// The top few pages relevant to a visitor's message, each reduced to a compact plain-text summary. Returns
// [] when nothing scores well enough to be worth adding to the prompt (small talk, thanks, etc.).
export function findRelevantPages(query, limit = 3) {
  const queryTokens = [...new Set(tokenize(query))];
  if (!queryTokens.length) return [];

  const scored = CORPUS.map(({ page, freq }) => {
    let score = 0;
    for (const qt of queryTokens) score += Math.min(freq.get(qt) || 0, 3);
    if (page.keyword && queryTokens.some((qt) => page.keyword.includes(qt))) score += 3;
    return { page, score };
  });

  return scored
    .filter((s) => s.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => summarize(s.page));
}
