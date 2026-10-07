import Faq from '@/components/sections/Faq';
import FinalCta from '@/components/sections/FinalCta';
import LatestArticles from '@/components/sections/LatestArticles';
import ProcessSteps from '@/components/sections/ProcessSteps';
import ProofBar from '@/components/sections/ProofBar';
import ReviewStrip from '@/components/sections/ReviewStrip';
import RoofCheck from '@/components/sections/RoofCheck';
import ValueGrid from '@/components/sections/ValueGrid';
import LandingTracker from '@/components/widgets/LandingTracker';
import PromoCard from '@/components/widgets/PromoCard';
import JsonLd from '@/components/ui/JsonLd';
import { HOME } from '@/data/catalog';
import { EL_NINO_PAGE as page } from '@/data/pages/elNino';
import { SEASON_PROMO as promo } from '@/data/promo';
import { startHref } from '@/data/start';
import { articlesFor } from '@/lib/articles';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

// /el-nino-roof-check/: where the El Niño popup and the home page's El Niño card lead (data/promo.js, components/widgets/PromoCard.jsx). The
// top is that same card at full width (its heading is the H1); the buttons open the request steps with the roof inspection picked. The visit
// is tagged utm_campaign=el-nino-2026 and the tags travel with the lead (LandingTracker, lib/attribution.js). A campaign page, so it stays out of
// search results, the sitemap and the AI files (to let search engines have it: remove `noindex` here, and add the page to PAGE_INDEX in
// lib/pageIndex.js and ALL_PATHS in data/content.js).
export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path, noindex: true });

const CRUMBS = [HOME, { label: 'El Niño Roof Inspection', href: page.path }];
const BOOK = startHref('inspection'); // the request steps with the roof inspection already picked

export default async function ElNinoPage() {
  return (
    <main id="top">
      <JsonLd data={pageJsonLd({ path: page.path, title: page.metaTitle, description: page.metaDescription, crumbs: CRUMBS, faqs: page.faqs })} />
      <LandingTracker />
      <PromoCard
        as="section"
        variant="landing"
        track="landing"
        eyebrow={promo.eyebrow}
        heading={promo.heading}
        headingTag="h1"
        text={page.hero.text}
        cta={{ label: 'Book My Free Evaluation', href: BOOK }}
        points={page.hero.points}
        rain={promo.rain}
      />
      <ProofBar strip />
      <ValueGrid heading={page.covers.heading} intro={page.covers.intro} items={page.covers.items} columns={3} />
      <ValueGrid heading={page.weak.heading} intro={page.weak.intro} items={page.weak.items} columns={3} tone="wash" pattern />
      <ProcessSteps heading={page.process.heading} subheading={page.process.subheading} steps={page.process.steps} image={page.process.image} imageAlt={page.process.imageAlt} />
      <ReviewStrip />
      <LatestArticles posts={await articlesFor(page.path)} heading="Storm and Leak Guides" />
      <Faq heading="Frequently Asked __Questions__" sub="Straight answers about the free El Niño roof evaluation." faqs={page.faqs} cta={false} />
      <RoofCheck />
      <FinalCta
        heading="Get Ahead of the __Storms__"
        text="Book your free drone roof evaluation now and find the weak spots before the rain does."
        cta={{ label: 'Book My Free Evaluation', href: BOOK }}
      />
    </main>
  );
}
