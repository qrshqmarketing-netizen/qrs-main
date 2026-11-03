import { ES_HOME } from '@/data/i18n/esHome';
import { t } from '@/lib/lang';

// The home page's own words in Spanish (data/i18n/esHome.js), then the shared ones (data/i18n/es.js), then the English. Server components only.
export function th(lang, text, vars) {
  if (lang === 'es' && typeof text === 'string' && ES_HOME[text] != null) return t('en', ES_HOME[text], vars);
  return t(lang, text, vars);
}
