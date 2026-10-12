import LandingTracker from '@/components/widgets/LandingTracker';
import PromoCard from '@/components/widgets/PromoCard';
import QuickLeadForm from '@/components/widgets/QuickLeadForm';
import JsonLd from '@/components/ui/JsonLd';
import { HOME } from '@/data/catalog';
import { EL_NINO_PAGE as page } from '@/data/pages/elNino';
import { SEASON_PROMO as promo } from '@/data/promo';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

// /el-nino-roof-check/: where the El Niño popup and the home page's El Niño hero lead (data/promo.js, components/widgets/PromoCard.jsx). The whole page is the
// storm hero in two columns: the offer on the left (the heading is the H1) and a quick request form on the right (QuickLeadForm), which sends the lead to the
// team's email, the Google Sheet and Supabase. The visit is tagged utm_campaign=el-nino-2026 and the tags travel with the lead (LandingTracker,
// lib/attribution.js). A campaign page, so it stays out of search results, the sitemap and the AI files.
export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path, noindex: true });

const CRUMBS = [HOME, { label: 'El Niño Roof Inspection', href: page.path }];

export default function ElNinoPage() {
  return (
    <main id="top">
      <JsonLd data={pageJsonLd({ path: page.path, title: page.metaTitle, description: page.metaDescription, crumbs: CRUMBS })} />
      <LandingTracker />
      <PromoCard
        as="section"
        variant="landing"
        track="landing"
        eyebrow={promo.eyebrow}
        heading={promo.heading}
        headingTag="h1"
        text={page.hero.text}
        points={page.hero.points}
        rain={promo.rain}
        aside={
          <QuickLeadForm
            title="Book your free El Niño roof evaluation"
            text="Leave your details and a roofer will call you to schedule it."
            note="El Niño free roof evaluation (quick form on the El Niño page)."
            page={page.path}
            leadSource="el_nino_form"
          />
        }
      />
    </main>
  );
}
