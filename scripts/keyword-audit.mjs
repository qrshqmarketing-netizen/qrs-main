// The owner's SEO rule, checked on the running site: for every sitemap page with a keyword (PAGE_INDEX, lib/pageIndex.js; the home page's is
// "roofing contractor"), the keyword must be in the meta title, the meta description, the H1 and the first 100 words of body text after the H1
// (a plural counts). Run `npm run dev`, then `npm run seo:keywords` (optionally a path filter: `npm run seo:keywords -- '^/service-areas/'`).
// Uses the Google Chrome app (macOS path below) in headless mode.
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { PAGE_INDEX } from '@/lib/pageIndex';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const kw = { '/': 'roofing contractor', ...Object.fromEntries(PAGE_INDEX.filter((p) => p.keyword).map((p) => [p.path, p.keyword])) };
const filter = process.argv[2] ? new RegExp(process.argv[2]) : null;
const sitemap = await (await fetch('http://localhost:3000/sitemap.xml')).text();
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1]).filter((p) => !filter || filter.test(p));
const profile = mkdtempSync(join(tmpdir(), 'aud-'));
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets; for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(200); } }
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const pending = new Map(); const loaded = [];
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.method === 'Page.loadEventFired') loaded.shift()?.(); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable');
await send('Network.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36' });
const EXTRACT = `(() => {
  const h1 = document.querySelector('main h1') || document.querySelector('h1');
  const words = [];
  if (h1) {
    const w = document.createTreeWalker(document.querySelector('main') || document.body, NodeFilter.SHOW_TEXT, { acceptNode: (n) => {
      const el = n.parentElement;
      if (!el || el.closest('script,style,noscript,[aria-hidden="true"],.sr-only,[hidden]')) return NodeFilter.FILTER_REJECT;
      if (h1.contains(n) || !(h1.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING)) return NodeFilter.FILTER_REJECT; // body text after the H1 only
      return NodeFilter.FILTER_ACCEPT; } });
    let n; while ((n = w.nextNode()) && words.length < 100) words.push(...n.textContent.split(/\\s+/).filter(Boolean));
  }
  return { title: document.title, desc: document.querySelector('meta[name=description]')?.content || '', h1: h1?.innerText || '', first: words.slice(0, 100).join(' ') };
})()`;
const norm = (s) => ' ' + s.toLowerCase().replace(/&/g, ' and ').replace(/[’']/g, '').replace(/[^a-z0-9]+/g, ' ').trim() + ' ';
const has = (text, k) => norm(text).includes(norm(k).trimEnd()); // a plural ("cool roofs") counts
const rows = [];
for (const p of paths) {
  const k = kw[p]; if (!k) continue;
  const done = new Promise((r) => loaded.push(r));
  await send('Page.navigate', { url: 'http://localhost:3000' + p });
  await Promise.race([done, sleep(15000)]);
  const r = (await send('Runtime.evaluate', { expression: EXTRACT, returnByValue: true })).result.result.value;
    const miss = ['title', 'desc', 'h1', 'first'].filter((f) => !has(r[f], k));
  rows.push({ p, k, miss, first: r.first.slice(0, 260), h1: r.h1 });
}
ws.close(); chrome.kill();
const bad = rows.filter((r) => r.miss.length);
console.log(`${rows.length} pages checked, ${bad.length} missing somewhere`);
for (const r of bad) console.log(`\n${r.p}  [${r.k}]  missing: ${r.miss.join(', ')}\n  H1: ${r.h1.replace(/\s+/g, ' ')}\n  first: ${r.first}`);
