import Faq from '@/components/sections/Faq';
import FeatureBand from '@/components/sections/FeatureBand';
import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import ReviewStrip from '@/components/sections/ReviewStrip';
import Overview from '@/components/sections/Overview';
import PartnerLogos from '@/components/sections/PartnerLogos';
import ProcessSteps from '@/components/sections/ProcessSteps';
import RoofCheck from '@/components/sections/RoofCheck';
import WhyChoose from '@/components/sections/WhyChoose';
import JsonLd from '@/components/ui/JsonLd';
import { pageJsonLd } from '@/lib/structuredData';
import { closingCta, faqSub } from './shared';

// A service page (e.g. /residential-roofing/tile-roofing/lift-and-relay/). Content shape: see data/services/*.js.
// crumbs: breadcrumb trail; eyebrow: section label above the H1; scenes: [heroArt, processArt] placeholder
// art until photos exist. actions: hero buttons (Hero); finalCta: the closing call to action (FinalCta
// props; defaults to page.final, else one worded around page.keyword). page.sections (optional): bands after the
// overview, e.g. one per roof type on /roof-inspection/ ([{ eyebrow, heading, paragraphs, points }]). hub: the service-first
// hub this page belongs to ({ label, href }); the overview links back to it, so the hub is the page for the general search.
export default function ServicePage({ page, crumbs, eyebrow, scenes = [], offer, actions, hub, finalCta = page.final || closingCta(page.keyword, offer) }) {
  const [heroScene = 'scene-shingle', processScene = heroScene] = scenes;
  const schema = pageJsonLd({
    path: crumbs.at(-1).href,
    title: page.metaTitle,
    description: page.metaDescription,
    crumbs,
    service: { name: page.title, type: page.keyword, category: eyebrow },
    faqs: page.faqs,
    image: page.image,
  });
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        crumbs={crumbs}
        eyebrow={eyebrow}
        title={page.title}
        intro={page.hero.intro}
        image={page.image}
        imageAlt={page.imageAlt}
        stats
        {...(actions && { actions })}
      />
      <Overview paragraphs={page.overview.paragraphs} cta={hub && { label: `Compare All ${hub.label} Options`, href: hub.href }} />
      {page.sections?.map((section, i) => (
        <FeatureBand key={section.heading} {...section} tone={i % 2 ? 'navy' : 'light'} />
      ))}
      {page.showReviews !== false && <ReviewStrip />}
      {page.partners && <PartnerLogos {...page.partners} />}
      <ProcessSteps
        heading={page.process.heading}
        subheading={page.process.subheading}
        steps={page.process.steps}
        scene={processScene}
        image={page.process.image}
        imageAlt={page.process.imageAlt}
      />
      <WhyChoose heading={page.why.heading} intro={page.why.intro} points={page.why.points} />
      {page.faqs?.length > 0 && <Faq heading="Frequently Asked Questions" sub={faqSub(page.keyword)} faqs={page.faqs} cta={false} />}
      <RoofCheck tone="white" offer={offer} />
      <FinalCta {...finalCta} />
    </main>
  );
}
