import FinalCta from '@/components/sections/FinalCta';
import ProofBar from '@/components/sections/ProofBar';
import TrustLogos from '@/components/sections/TrustLogos';
import { QhAccount, QhFinder, QhHero, QhOffer, QhPosts, QhProjects, QhReviews, QhRoofFan, QhServices, QhStart, QhStory } from '@/components/home/QrsSections';
import JsonLd from '@/components/ui/JsonLd';
import { RESIDENTIAL, RESIDENTIAL_TYPES } from '@/data/catalog';
import { ES_RESIDENTIAL as page, ES_RESIDENTIAL_PATH as PATH } from '@/data/i18n/esResidential';
import { projectsShownOn } from '@/data/projectPages';
import { articlesFor } from '@/lib/articles';
import { LANGS, languagesFor } from '@/lib/lang';
import { openGraphBase, twitterBase } from '@/lib/seo';
import { pageJsonLd } from '@/lib/structuredData';

// Residential roofing in Spanish (Mexico) (owner, November 9 2026): the same page and sections as app/residential-roofing/page.js with the
// words from data/i18n/esResidential.js and `lang="es"` on the shared sections (their built-in words in data/i18n/es.js). The links lead to the
// English pages (the only versions), project names and article titles stay in English, and the reviews are the translated ones of the Spanish
// home page. hreflang both ways (languagesFor in lib/lang.js), and the header's EN/ES switch links the two.
const title = page.metaTitle;
const description = page.metaDescription;
const HERO_IMAGE = '/images/home-hero-drone-view.webp';

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PATH, languages: languagesFor(RESIDENTIAL.href) },
  openGraph: { ...openGraphBase, url: PATH, title, description, locale: 'es_MX' },
  twitter: { ...twitterBase, title, description },
};

const TYPES = RESIDENTIAL_TYPES.map((t) => {
  const es = page.types[t.href] || {};
  return { title: es.title || t.label, text: es.text || t.blurb, href: t.href, image: t.cardImage || t.image, caption: es.title || t.label };
});

const schema = pageJsonLd({
  path: PATH,
  title,
  description,
  type: 'CollectionPage',
  crumbs: page.crumbs,
  faqs: page.faqs,
  service: { name: page.hero.heading, type: page.keyword, catalog: TYPES.map((t) => ({ name: t.title, href: t.href })) },
  image: HERO_IMAGE,
  language: LANGS.es.code,
});

export default async function SpanishResidentialRoofingPage() {
  return (
    <main id="top" className="qh" lang="es-MX">
      <JsonLd data={schema} />
      <QhHero
        lang="es"
        crumbs={page.crumbs}
        title={page.hero.heading}
        outcome={page.hero.outcome}
        text={page.hero.intro}
        checks={page.hero.highlights}
        visual={<QhRoofFan items={TYPES} caption={page.fanCaption} />}
        badges
      />
      <ProofBar strip lang="es" />
      <TrustLogos lang="es" />
      <QhStory id="overview" heading={page.overview.heading} paragraphs={page.overview.paragraphs} images={page.overview.images} />
      <QhServices id="roof-types" heading={page.cards.heading} lede={page.cards.intro} cats={page.serviceLinks} items={TYPES} />
      <QhFinder heading={page.finder.heading} intro={page.finder.intro} rows={page.finder.rows} />
      <QhAccount lang="es" />
      <QhOffer lang="es" />
      <QhProjects lang="es" projects={projectsShownOn(RESIDENTIAL.href).projects} heading={page.projectsHeading} />
      <QhReviews lang="es" path={RESIDENTIAL.href} heading={page.reviewsHeading} />
      <QhPosts lang="es" posts={await articlesFor(RESIDENTIAL.href)} heading={page.postsHeading} />
      <QhStart lang="es" faqs={page.faqs} heading={page.faqHeading} />
      <FinalCta lang="es" heading={page.final.heading} text={page.final.text} />
    </main>
  );
}
