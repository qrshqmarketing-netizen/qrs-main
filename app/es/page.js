import Faq from '@/components/sections/Faq';
import LatestArticles from '@/components/sections/LatestArticles';
import FinalCta from '@/components/sections/FinalCta';
import PartnerLogos from '@/components/sections/PartnerLogos';
import ReviewMarquee from '@/components/sections/ReviewMarquee';
import RoofCheck from '@/components/sections/RoofCheck';
import ServiceArea from '@/components/sections/ServiceArea';
import { QhHero } from '@/components/home/QrsSections';
import { HERO_BACKGROUND } from '@/components/home/QrsHome';
import '@/components/home/QrsHome.css';
import ProofBar from '@/components/sections/ProofBar';
import TrustLogos from '@/components/sections/TrustLogos';
import StudioIntro from '@/components/studio/StudioIntro';
import StudioHowWeWork from '@/components/studio/StudioHowWeWork';
import StudioProjects from '@/components/studio/StudioProjects';
import StudioServices from '@/components/studio/StudioServices';
import JsonLd from '@/components/ui/JsonLd';
import { ES_HOME_FAQS, ES_HOME_META } from '@/data/i18n/esHome';
import { HOME_PRODUCTS } from '@/data/homeProducts';
import { LATEST_PROJECTS } from '@/data/projectPages';
import { SERVICE_CATEGORIES } from '@/data/serviceCategories';
import { ROOF_FINANCING } from '@/data/services/programs';
import { BUSINESS, GOOGLE_REVIEWS, HERO_ANNOTATIONS } from '@/data/site';
import { latestArticles } from '@/lib/articles';
import { ES_HOME, HOME_LANGUAGES, LANGS, t } from '@/lib/lang';
import { th } from '@/lib/langHome';
import { openGraphBase, twitterBase } from '@/lib/seo';
import { pageJsonLd } from '@/lib/structuredData';

// The home page in Spanish (Mexico) (owner, November 3 2026; matched to the studio home page on November 4 2026): the same sections as
// app/page.js, in the same order. The client sections read the language from the address (components/ui/useLang.js) and the words from
// data/i18n/es.js; the server ones take `lang` (StudioIntro reads data/i18n/esHome.js). Project names, article titles and Google reviews stay
// as written in English, and every link leads to the English pages. Back on this layout November 10 2026 (owner), with the new video hero on top. Keyword: "contratista de techos" (title, description, H1 and the hero line).
const lang = 'es';
const { title, description, h1, text } = ES_HOME_META;

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: ES_HOME, languages: HOME_LANGUAGES },
  openGraph: { ...openGraphBase, url: ES_HOME, title, description, locale: 'es_MX' },
  twitter: { ...twitterBase, title, description },
};

export default async function SpanishHomePage() {
  const partners = ROOF_FINANCING.partners;
  return (
    <>
      <JsonLd data={pageJsonLd({ path: ES_HOME, title, description, faqs: ES_HOME_FAQS, language: LANGS.es.code })} />
      <main id="top" className="studio" lang={LANGS.es.code}>
        {/* The new-theme video hero, as on the English home page (owner, November 10 2026), in Spanish (QhHero lang="es") */}
        <div className="qh-scope">
          <QhHero
            lang={lang}
            where={th(lang, 'Family-owned · Licensed since {year}', { year: new Date(BUSINESS.licenseSince).getUTCFullYear() })}
            title={h1}
            text={text}
            checks={HERO_ANNOTATIONS.home.slice(0, 3).map((p) => t(lang, p))}
            visual={false}
            background={HERO_BACKGROUND}
          />
        </div>
        <ProofBar strip lang={lang} />
        <TrustLogos lang={lang} />
        <StudioIntro lang={lang} />
        <StudioServices categories={SERVICE_CATEGORIES} items={HOME_PRODUCTS} />
        <StudioHowWeWork />
        <ReviewMarquee
          heading={t(lang, 'What people say after the job')}
          text={t(lang, '{count} reviews from the people we roof for, on Google.', { count: GOOGLE_REVIEWS.count })}
        />
        <StudioProjects lang={lang} projects={LATEST_PROJECTS.slice(0, 3)} more={LATEST_PROJECTS.slice(3)} />
        <ServiceArea allAreasLink />
        <PartnerLogos {...partners} heading={t(lang, partners.heading)} intro={t(lang, partners.intro)} />
        <LatestArticles lang={lang} posts={await latestArticles(3)} />
        <Faq cta={false} faqs={ES_HOME_FAQS} heading={t(lang, 'Frequently Asked __Questions__')} sub={t(lang, 'Straight answers to the questions homeowners ask us most.')} />
        <RoofCheck lang={lang} />
        <FinalCta lang={lang} />
      </main>
    </>
  );
}
