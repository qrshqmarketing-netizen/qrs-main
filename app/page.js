import QrsHome from '@/components/home/QrsHome';
import JsonLd from '@/components/ui/JsonLd';
import { LATEST_PROJECTS } from '@/data/projectPages';
import { HOME_DESCRIPTION, HOME_TITLE } from '@/data/site';
import { latestArticles } from '@/lib/articles';
import { getHomeFaqs } from '@/lib/contentStore';
import { HOME_LANGUAGES } from '@/lib/lang';
import { openGraphBase, twitterBase } from '@/lib/seo';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = {
  title: { absolute: HOME_TITLE }, // the title already names the company, so no " | Quality Roofing Specialists, Inc." suffix
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/', languages: HOME_LANGUAGES }, // the Spanish home page is /es/ (app/es/page.js)
  openGraph: { ...openGraphBase, url: '/', title: HOME_TITLE, description: HOME_DESCRIPTION },
  twitter: { ...twitterBase, title: HOME_TITLE, description: HOME_DESCRIPTION },
};

// Home page from the owner's homepage file (November 6 2026; components/home/QrsHome.jsx + QrsHome.css): the file's sections and styling in the
// site's header, footer, fonts and colors. The H1 is HOME_H1 ("Roofing Contractor in Los Angeles & Orange County"), the hero line carries the
// keyword in the first 100 words, the FAQ is the dashboard copy (lib/contentStore.js, else data/faqs.js) and the request form is the site's
// estimate form (#roof-check / #estimate). The earlier studio home is in git history (commit before this one); the Spanish /es/ page keeps it.
const HERO_TEXT =
  'Roofs built right, from the deck up. As a family-owned roofing contractor, we have a roofer look at your roof first, you get photos and a written price before any work, and installs carry our 10-year workmanship warranty (call for details).';

export default async function HomePage() {
  const faqs = await getHomeFaqs();
  return (
    <>
      <JsonLd data={pageJsonLd({ path: '/', title: HOME_TITLE, description: HOME_DESCRIPTION, faqs })} />
      <QrsHome heroText={HERO_TEXT} faqs={faqs} posts={await latestArticles(3)} projects={LATEST_PROJECTS} />
    </>
  );
}
