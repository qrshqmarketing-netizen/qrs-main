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
