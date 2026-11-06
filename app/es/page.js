import QrsHome from '@/components/home/QrsHome';
import JsonLd from '@/components/ui/JsonLd';
import { ES_HOME_FAQS, ES_HOME_META } from '@/data/i18n/esHome';
import { LATEST_PROJECTS } from '@/data/projectPages';
import { latestArticles } from '@/lib/articles';
import { ES_HOME, HOME_LANGUAGES, LANGS } from '@/lib/lang';
import { openGraphBase, twitterBase } from '@/lib/seo';
import { pageJsonLd } from '@/lib/structuredData';

// The home page in Spanish (Mexico) (owner, November 3 2026). Since November 6 2026 it renders the same new home page as app/page.js
// (components/home/QrsHome.jsx, sections in QrsSections.jsx) with `lang="es"`: every text goes through `th` (data/i18n/esHome.js, then
// data/i18n/es.js). Project names and article titles stay in English ("Artículos en inglés"), the reviews are the four translated in
// ES_HOME_REVIEWS (labelled as translated; no live Google reviews here), and every link leads to the English pages. No place names, as on the
// English home page (owner: city names only on the location pages). Keyword: "contratista de techos" (title, description, H1 and the hero line).
const { title, description, h1, text } = ES_HOME_META;

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: ES_HOME, languages: HOME_LANGUAGES },
  openGraph: { ...openGraphBase, url: ES_HOME, title, description, locale: 'es_MX' },
  twitter: { ...twitterBase, title, description },
};

export default async function SpanishHomePage() {
  return (
    <>
      <JsonLd data={pageJsonLd({ path: ES_HOME, title, description, faqs: ES_HOME_FAQS, language: LANGS.es.code })} />
      <QrsHome lang="es" h1={h1} heroText={text} faqs={ES_HOME_FAQS} posts={await latestArticles(3)} projects={LATEST_PROJECTS} />
    </>
  );
}
