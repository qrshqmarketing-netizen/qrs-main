import CarePlanPricing from '@/components/sections/CarePlanPricing';
import FinalCta from '@/components/sections/FinalCta';
import PlanScope from '@/components/sections/PlanScope';
import ProofBar from '@/components/sections/ProofBar';
import TrustLogos from '@/components/sections/TrustLogos';
import { QhAccount, QhHero, QhPoints, QhPosts, QhReviews, QhSeasonDial, QhStart, QhSteps } from '@/components/home/QrsSections';
import SiteLink from '@/components/ui/SiteLink';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, PROGRAMS } from '@/data/catalog';
import { CARE_PLAN as page } from '@/data/pages/carePlan';
import { heroOutcome } from '@/data/heroOutcomes';
import { articlesFor } from '@/lib/articles';
import { searchHeading } from '@/lib/headings';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

// The Roof Care Plan (content in data/pages/carePlan.js): three priced maintenance tiers with an interactive size-based pricing table
// (components/sections/CarePlanPricing.jsx). In the new home page's theme (owner, November 6 2026; components/home/QrsSections.jsx, QrsHome.css):
// the hero with its own visual, a year dial with the two plan visits (QhSeasonDial), the manufacturer logos, then the proof strip and review logos,
// what goes wrong on a roof, the pricing table and plan scope, a review, what each visit checks by roof type, the two seasonal visits, the one-time
// tune-up, member benefits, credentials and numbers, articles, the FAQ beside the request form and the closing call to action.
const LINK = PROGRAMS.plans;

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: LINK.href });

const CRUMBS = [HOME, { label: LINK.label, href: LINK.href }];
const schema = pageJsonLd({ path: LINK.href, title: page.metaTitle, description: page.metaDescription, crumbs: CRUMBS, faqs: page.faqs, image: page.image });

const jump = (label) => (
  <div className="qh-actions">
    <SiteLink className="qh-btn qh-btn-sun" href="#roof-check">{label}</SiteLink>
  </div>
);

export default async function RoofMaintenancePlansPage() {
  return (
    <main id="top" className="qh">
      <JsonLd data={schema} />
      <QhHero
        crumbs={CRUMBS}
        title={searchHeading(page.hero.heading, { place: false })}
        outcome={heroOutcome(LINK.href)}
        text={page.hero.intro}
        checks={page.hero.highlights}
        badges
        visual={
          <QhSeasonDial
            labels={['Sep & Oct: before the rains', 'May & Jun: after the rains', 'A written photo report every time']}
            caption="Two visits, timed to the season."
            links={[
              { label: 'One-time tune-up', href: '#tune-up' },
              { label: 'Roof Inspection', href: '/roof-inspection/' },
              { label: 'Roof Repair', href: '/roof-repair/' },
            ]}
          />
        }
      />
      <ProofBar strip />
      <TrustLogos />
      <QhPoints id="what-goes-wrong" kicker="Why maintenance" heading={page.whatGoesWrong.heading} items={page.whatGoesWrong.items} />
      <CarePlanPricing />
      <PlanScope />
      <QhReviews path={LINK.href} />
      <QhPoints id="roof-types" kicker="Every visit" heading={page.byRoof.heading} paragraphs={[page.byRoof.intro]} items={page.byRoof.items} />
      <QhSteps heading={page.schedule.heading} steps={page.schedule.steps} image={page.schedule.image} imageAlt={page.schedule.imageAlt} />
      <QhPoints
        id={page.tuneUp.id}
        kicker={page.tuneUp.eyebrow}
        heading={page.tuneUp.heading}
        paragraphs={page.tuneUp.paragraphs}
        items={page.tuneUp.points}
        actions={jump(page.tuneUp.cta.label)}
      />
      <QhPoints
        id="member-benefits"
        kicker={page.memberBenefits.eyebrow}
        heading={page.memberBenefits.heading}
        paragraphs={page.memberBenefits.paragraphs}
        items={page.memberBenefits.points}
        actions={jump('Get Started')}
      />
      <QhAccount />
      <QhPosts posts={await articlesFor(LINK.href)} heading="Related roofing articles" />
      <QhStart faqs={page.faqs} heading="Roof Care Plan FAQs" />
      <FinalCta heading={page.final.heading} text={page.final.text} />
    </main>
  );
}
