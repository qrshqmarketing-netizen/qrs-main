import FinalCta from '@/components/sections/FinalCta';
import PartnerLogos from '@/components/sections/PartnerLogos';
import ProofBar from '@/components/sections/ProofBar';
import TrustLogos from '@/components/sections/TrustLogos';
import RoofCheck from '@/components/sections/RoofCheck';
import { HomeAreas, HomeCommercial, HomeCores, HomeFaq, HomeGuides, HomeHero, HomeOffers, HomeProjects, HomeRepair, HomeReplacement, HomeResidential, HomeReviews, HomeStatement } from '@/components/home/HomeSections';
import HomeMotion from '@/components/home/HomeMotion';
import JsonLd from '@/components/ui/JsonLd';
import { ES_HOME_FAQS, ES_HOME_META } from '@/data/i18n/esHome';
import { ROOF_FINANCING } from '@/data/services/programs';
import { ES_HOME, HOME_LANGUAGES, LANGS, t } from '@/lib/lang';
import { openGraphBase, twitterBase } from '@/lib/seo';
import { pageJsonLd } from '@/lib/structuredData';

// The home page in Spanish (Mexico) (owner, November 3 2026): the same sections as app/page.js with lang="es", the words from
// data/i18n/esHome.js (page body, FAQs, title and description) and data/i18n/es.js (header, footer, form, widgets). The header's language
// switcher links the two home pages, which point at each other with hreflang (HOME_LANGUAGES). Every other page is English for now, so its
// links lead to English pages. Keyword: "contratista de techos" (title, description, H1 and the hero line).
const { title, description, h1, heading, text, cta } = ES_HOME_META;

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: ES_HOME, languages: HOME_LANGUAGES },
  openGraph: { ...openGraphBase, url: ES_HOME, title, description, locale: 'es_MX' },
  twitter: { ...twitterBase, title, description },
};

const HERO_VIDEO = [
  { src: '/videos/home-hero-drone.webm', type: 'video/webm' },
  { src: '/videos/home-hero-drone-h264.mp4', type: 'video/mp4' },
];
const HERO_POSTER = '/images/home-hero-drone-poster.webp';

export default function SpanishHomePage() {
  const lang = 'es';
  const partners = ROOF_FINANCING.partners;
  return (
    <>
      <JsonLd data={pageJsonLd({ path: ES_HOME, title, description, faqs: ES_HOME_FAQS, language: LANGS.es.code })} />
      <main id="top" className="hg" lang={LANGS.es.code}>
        <HomeMotion />
        <HomeHero lang={lang} h1={h1} heading={heading} text={text} cta={cta} video={HERO_VIDEO} poster={HERO_POSTER} />
        <ProofBar strip lang={lang} />
        <TrustLogos lang={lang} />
        <HomeStatement lang={lang} />
        <HomeCores lang={lang} />
        <HomeResidential lang={lang} />
        <HomeCommercial lang={lang} />
        <HomeRepair lang={lang} />
        <HomeReplacement lang={lang}>
          <PartnerLogos {...partners} heading={t(lang, partners.heading)} intro={t(lang, partners.intro)} />
        </HomeReplacement>
        <HomeAreas lang={lang} />
        <HomeProjects lang={lang} />
        <HomeReviews lang={lang} />
        <HomeOffers lang={lang} />
        <HomeGuides lang={lang} />
        <HomeFaq faqs={ES_HOME_FAQS} lang={lang} />
        <div className="hg-form-wrap">
          <RoofCheck lang={lang} />
        </div>
        <FinalCta lang={lang} />
      </main>
    </>
  );
}
