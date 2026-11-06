import DifferenceBand from '@/components/sections/DifferenceBand';
import FinalCta from '@/components/sections/FinalCta';
import RelatedLinks from '@/components/sections/RelatedLinks';
import { QhHero, QhPoints, QhStart, QhSteps, QhStory, QhTradeSchedule } from '@/components/home/QrsSections';
import JsonLd from '@/components/ui/JsonLd';
import { CONTRACTORS_LINK, HOME } from '@/data/catalog';
import { relatedLinks } from '@/data/content';
import { CONTRACTORS_PAGE as page } from '@/data/pages/contractors';
import { HERO_ANNOTATIONS, PHONE, TEL } from '@/data/site';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: CONTRACTORS_LINK.href });

const CRUMBS = [HOME, CONTRACTORS_LINK];

const schema = pageJsonLd({
  path: CONTRACTORS_LINK.href,
  title: page.metaTitle,
  description: page.metaDescription,
  crumbs: CRUMBS,
  faqs: page.faqs,
  service: { name: 'Roofing Crews for Contractors', type: page.keyword },
});

const RELATED = relatedLinks(['/commercial-roofing/', '/residential-roofing/hoa-multi-family/', '/residential-roofing/flat-roofing/', '/residential-roofing/']);

const talk = (label = 'Start a Conversation') => (
  <div className="qh-actions">
    <a className="qh-btn qh-btn-sun" href="#roof-check">{label}</a>
    <a className="qh-link" href={TEL}>or call {PHONE}</a>
  </div>
);

// Contractor partnerships (B2B) page (content in data/pages/contractors.js), in the new home page's theme (owner, November 6 2026; components/home/
// QrsSections.jsx, QrsHome.css): the hero with a trade schedule whose roofing bar fills in (QhTradeSchedule), the overview beside its photos, who we
// work with, white-label roofing, how a partnership project runs, the QRS difference, why contractors partner with us, related pages, the FAQ beside
// the request form (commercial: a roof survey, never called free) and the closing call to action.
export default function ContractorsPage() {
  return (
    <main id="top" className="qh">
      <JsonLd data={schema} />
      <QhHero
        crumbs={CRUMBS}
        title={page.hero.heading}
        outcome={heroOutcome('/contractors/')}
        text={page.hero.intro}
        checks={page.hero.highlights || HERO_ANNOTATIONS.commercial}
        actions={[
          { label: 'Start a Conversation', href: '#roof-check', style: 'gold' },
          { label: `Call ${PHONE}`, href: TEL, style: 'line' },
        ]}
        badges
        visual={<QhTradeSchedule labels={['Written scope before work', 'Photos for your client']} caption="One trade you don’t have to chase." />}
      />
      <QhStory
        id="overview"
        kicker="Contractor partnerships"
        heading={page.overview.heading}
        paragraphs={page.overview.paragraphs}
        images={[
          { src: '/images/contractors-hero-roofer-tablet.webp', alt: 'Roofer on a rooftop reviewing a scope on a tablet' },
          { src: '/images/recent-work-commercial-flat-roof-drone-view.webp', alt: '' },
          { src: '/images/recent-work-shingle-row-drone-view.webp', alt: '' },
        ]}
        actions={talk()}
      />
      <QhPoints id="who-we-work-with" kicker="Partners" heading={page.audiences.heading} items={page.audiences.points} />
      <QhPoints
        id="white-label"
        kicker={page.whiteLabel.eyebrow}
        heading={page.whiteLabel.heading}
        paragraphs={page.whiteLabel.paragraphs}
        items={page.whiteLabel.points}
        actions={talk(page.whiteLabel.cta.label)}
      />
      <QhSteps
        kicker="How we work"
        heading={page.process.subheading}
        steps={page.process.steps}
        image="/images/contractors-process-roofer-tablet.webp"
        imageAlt="Roofer on a rooftop smiling while reviewing a scope on a tablet"
        actions={talk()}
      />
      <DifferenceBand />
      <QhPoints id="why-qrs" kicker="Why QRS" heading={page.why.heading} paragraphs={[page.why.intro]} items={page.why.points} actions={talk()} />
      <div className="lc-keep">
        <RelatedLinks heading="Related pages" links={RELATED} />
      </div>
      <QhStart faqs={page.faqs} heading="Contractor FAQs" offer="commercial" />
      <FinalCta heading="Let’s Build Something Together" text="Tell us about your project and we’ll start with a roofer-led look at the roof." cta={{ label: 'Start a Conversation', href: '#roof-check' }} />
    </main>
  );
}
