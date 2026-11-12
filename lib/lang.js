import { ES } from '@/data/i18n/es';

// Languages (owner, November 3 2026): the home page has a Spanish (Mexico) version at /es/, with a language switcher in the header shown on
// the two home pages only. Every other page is English. `t(lang, text, vars)` looks the English text up in data/i18n/es.js and falls back to the
// English when there is no translation, so the English pages render exactly as written. `{name}` in a text is replaced from `vars`.
export const ES_HOME = '/es/';
export const LANGS = { en: { code: 'en-US', label: 'English', short: 'EN', home: '/' }, es: { code: 'es-MX', label: 'Español', short: 'ES', home: ES_HOME } };

export const langOf = (path = '') => (path === '/es' || path.startsWith('/es/') ? 'es' : 'en');
export const isHomePath = (path = '') => path === '/' || path === '/es' || path === ES_HOME;

const fill = (text, vars) => (vars ? text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)) : text);
export function t(lang, text, vars) {
  if (typeof text !== 'string') return text;
  return fill(lang === 'es' && ES[text] != null ? ES[text] : text, vars);
}

// A text that starts with a number ("269 Google reviews") is looked up as "{count} Google reviews"
export function tCount(lang, text) {
  const m = lang === 'es' && typeof text === 'string' ? text.match(/^(\d[\d,]*)\s/) : null;
  return m ? t(lang, text.replace(m[1], '{count}'), { count: m[1] }) : t(lang, text);
}

// "A, B and C" / "A, B y C"
export const listJoin = (lang, items) => (items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} ${lang === 'es' ? 'y' : 'and'} ${items[items.length - 1]}`);

// hreflang alternates for the two home pages (metadata `alternates.languages`)
export const HOME_LANGUAGES = { 'en-US': '/', 'es-MX': ES_HOME, 'x-default': '/' };

// Pages that have a Spanish version (owner, November 9 2026: /residential-roofing/ after the home page), English address -> Spanish address.
// The header's language switcher shows on these pairs and links each to the other; the header's links lead to the Spanish version where there is one.
export const ES_PAGES = { '/': ES_HOME, '/residential-roofing/': '/es/residential-roofing/', '/commercial-roofing/': '/es/commercial-roofing/' };
const EN_OF = Object.fromEntries(Object.entries(ES_PAGES).map(([en, es]) => [es, en]));
const norm = (p = '') => (p.endsWith('/') ? p : `${p}/`);
// The other language's address of this page, or undefined
export const langPair = (path = '') => (langOf(path) === 'es' ? EN_OF[norm(path)] : ES_PAGES[norm(path)]);
// The Spanish address of an English link, when that page has one (used by the header on Spanish pages)
export const esHref = (href) => ES_PAGES[href] || href;
// hreflang alternates for a translated page, from its English address
export const languagesFor = (enPath) => ({ 'en-US': enPath, 'es-MX': ES_PAGES[enPath], 'x-default': enPath });
