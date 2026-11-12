import FinalCta from '@/components/sections/FinalCta';
import ProofBar from '@/components/sections/ProofBar';
import TrustLogos from '@/components/sections/TrustLogos';
import { QhAccount, QhBanner, QhHero, QhOffer, QhPoints, QhPosts, QhProjects, QhReviews, QhRoofSurvey, QhServices, QhStart, QhStory } from '@/components/home/QrsSections';
import JsonLd from '@/components/ui/JsonLd';
import { COMMERCIAL, serviceCards, serviceTypeCards } from '@/data/content';
import { CONTRACTORS_LINK } from '@/data/catalog';
import { ES_COMMERCIAL as page, ES_COMMERCIAL_PATH as PATH } from '@/data/i18n/esCommercial';
import { projectsShownOn } from '@/data/projectPages';
import { articlesFor } from '@/lib/articles';
import { LANGS, languagesFor } from '@/lib/lang';
import { openGraphBase, twitterBase } from '@/lib/seo';
import { pageJsonLd } from '@/lib/structuredData';

// Commercial roofing in Spanish (Mexico) (owner, November 12 2026): the same page and sections as /commercial-roofing/ (SectionHub, in the
// new theme) with the words from data/i18n/esCommercial.js and `lang="es"` on the shared sections (their built-in words in data/i18n/es.js and
// esHome.js). The links lead to the English pages (the only versions), project names and article titles stay in English, and the reviews are
// the translated ones of the Spanish home page. hreflang both ways (languagesFor in lib/lang.js); the header's EN/ES switch links the two.
const title = page.metaTitle;
const description = page.metaDescription;

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: PATH, languages: languagesFor(COMMERCIAL.href) },
  openGraph: { ...openGraphBase, url: PATH, title, description, locale: 'es_MX' },
  twitter: { ...twitterBase, title, description },
};

const es = (c) => {
  const t = page.types[c.href] || {};
  return { title: t.title || c.title, text: t.text || c.text, href: c.href, image: c.image || COMMERCIAL.image, caption: t.title || c.title };
};
const SERVICES = serviceTypeCards(COMMERCIAL).map(es);
const BUILDINGS = serviceCards(COMMERCIAL).map(es);
const CHIPS = BUILDINGS.slice(0, 6).map((c) => ({ label: c.title.replace(/^(Techos (para|de) )/i, '').replace(/^./, (m) => m.toUpperCase()), href: c.href }));

const schema = pageJsonLd({
  path: PATH,
  title,
  description,
  type: 'CollectionPage',
  crumbs: page.crumbs,
  faqs: page.faqs,
  service: { name: page.hero.heading, type: page.keyword, catalog: [...SERVICES, ...BUILDINGS].map((c) => ({ name: c.title, href: c.href })) },
  image: COMMERCIAL.image,
  language: LANGS.es.code,
});

export default async function SpanishCommercialRoofingPage() {
  const photos = [COMMERCIAL.image, ...[...SERVICES, ...BUILDINGS].map((c) => c.image)].filter((src, i, a) => src && a.indexOf(src) === i);
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
        cta="Pida una revisión del techo"
        visual={<QhRoofSurvey chips={CHIPS} card={{ title: 'Revisión del techo hecha por un techador', text: 'Fotos, un alcance y precio por escrito antes de cualquier trabajo.' }} rows={['Fotos de cada hallazgo', 'Un alcance por escrito', 'El precio, antes de cualquier trabajo']} />}
        badges
      />
      <ProofBar strip lang="es" />
      <TrustLogos lang="es" />
      <QhStory id="overview" heading={page.overview.heading} paragraphs={page.overview.paragraphs} images={photos.slice(0, 3).map((src) => ({ src, alt: '' }))} />
      <QhServices id="services" heading={page.servicesGroup.heading} lede={page.servicesGroup.intro} items={SERVICES} />
      <QhServices id="buildings" heading={page.cards.heading} lede={page.cards.intro} items={BUILDINGS} />
      <QhAccount lang="es" commercial />
      <QhPoints id="why-qrs" kicker="Por qué QRS" heading={page.highlights.heading} items={page.highlights.points} />
      <QhOffer lang="es" offer="commercial" />
      <QhProjects lang="es" projects={projectsShownOn(COMMERCIAL.href).projects} heading={page.projectsHeading} />
      <QhReviews lang="es" path={COMMERCIAL.href} heading={page.reviewsHeading} />
      <QhBanner lang="es" heading={page.banner.heading} text={page.banner.text} image="/images/bottom-cta-background.webp" cta={page.banner.cta} href={CONTRACTORS_LINK.href} links={false} />
      <QhPosts lang="es" posts={await articlesFor(COMMERCIAL.href)} heading={page.postsHeading} />
      <QhStart lang="es" offer="commercial" faqs={page.faqs} heading={page.faqHeading} />
      <FinalCta lang="es" heading={page.final.heading} text={page.final.text} />
    </main>
  );
}
