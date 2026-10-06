import Faq from '@/components/sections/Faq';
import LatestArticles from '@/components/sections/LatestArticles';
import FeatureBand from '@/components/sections/FeatureBand';
import FinalCta from '@/components/sections/FinalCta';
import Hero from '@/components/sections/Hero';
import RelatedLinks from '@/components/sections/RelatedLinks';
import ReviewStrip from '@/components/sections/ReviewStrip';
import Overview from '@/components/sections/Overview';
import PartnerLogos from '@/components/sections/PartnerLogos';
import ProcessSteps from '@/components/sections/ProcessSteps';
import RoofCheck from '@/components/sections/RoofCheck';
import WhyChoose from '@/components/sections/WhyChoose';
import JsonLd from '@/components/ui/JsonLd';
import { projectsRelatedTo } from '@/data/projectPages';
import { pageJsonLd } from '@/lib/structuredData';
import { closingCta, faqSub } from './shared';
import { heroOutcome } from '@/data/heroOutcomes';
import { articlesFor } from '@/lib/articles';

const PROCESS_PHOTOS = {
  tile: [
    ['/images/tile-lift-off-and-reset-drone-view-2.webp', 'Tile roofing exposed during a lift and relay project'],
    ['/images/tile-roof-replacement-drone-view.webp', 'Aerial view of a tile roof replacement project'],
    ['/images/tile-roof-replacement.webp', 'Completed tile roof replacement'],
  ],
  flat: [
    ['/images/flat-roof-replacement-tear-off-drone-view.webp', 'Flat roof tear-off in progress'],
    ['/images/flat-roof-replacement-completed-white-membrane.webp', 'Completed white membrane flat roof'],
    ['/images/flat-roof-torch-down-drone-view-services.webp', 'Flat roofing installation in progress'],
  ],
  commercial: [
    ['/images/recent-work-commercial-flat-roof-drone-view.webp', 'Aerial view of a commercial flat roof project'],
    ['/images/home-services-commercial-flat-roof-drone-view.webp', 'Aerial view of a commercial flat roof'],
  ],
  industrial: [
    ['/images/recent-work-commercial-flat-roof-drone-view.webp', 'Aerial view of an industrial flat roof with rooftop equipment'],
    ['/images/vernon-industrial.webp', 'Industrial flat roof with rooftop equipment in Vernon'],
  ],
  shingle: [
    ['/images/shingle-roof-installation-underlayment.webp', 'Shingle roof installation with underlayment exposed'],
    ['/images/shingle-roof-repair-ridge-finish.webp', 'Finished shingle roof ridge repair'],
    ['/images/recent-work-shingle-row-drone-view.webp', 'Aerial view of a completed shingle roof project'],
    ['/images/shingle-roof-completed-drone-view.webp', 'Aerial view of a completed shingle roof'],
  ],
  gutter: [
    ['/images/roof-drone-palms.webp', 'Aerial view of a home roof and its surrounding property'],
    ['/images/home-hero-drone-view.webp', 'Aerial view of a residential roofing project'],
  ],
  hoa: [
    ['/images/shingle-roof-care-multi-family.webp', 'Aerial view of a multifamily community roof'],
    ['/images/recent-work-tudor-flat-roof-street-view.webp', 'Multifamily building with tile and flat roof sections'],
    ['/images/recent-work-shingle-row-drone-view.webp', 'Aerial view of a row of homes with shingle roofs'],
  ],
  repair: [
    ['/images/shingle-roof-repair-ridge-finish.webp', 'Finished shingle roof repair at the ridge'],
    ['/images/tile-lift-off-and-reset-drone-view.webp', 'Tile roof repair and reset work'],
    ['/images/homeowners-looking-at-leak-in-ceiling.webp', 'Homeowners checking a ceiling leak after roof damage'],
  ],
  replacement: [
    ['/images/shingle-roof-replacement-tear-off-drone-view.webp', 'Shingle roof replacement in progress'],
    ['/images/tile-roof-replacement-drone-view.webp', 'Aerial view of a tile roof replacement project'],
    ['/images/flat-roof-replacement-tear-off-drone-view.webp', 'Flat roof replacement in progress'],
  ],
  inspection: [
    ['/images/contractors-process-roofer-tablet.webp', 'Roofer reviewing inspection details on a tablet'],
    ['/images/contractors-hero-roofer-tablet.webp', 'Roofer documenting a roof inspection on a tablet'],
    ['/images/shingle-roof-inspection-overhead.webp', 'Aerial view of a shingle roof during inspection'],
  ],
  general: [
    ['/images/home-services-residential-shingle-drone-view.webp', 'Aerial view of a residential roof'],
    ['/images/qrs-truck-4k.webp', 'QRS roofing truck at a project site'],
  ],
};

function processPhoto(page) {
  const description = `${page.keyword || ''} ${page.title || ''} ${page.slug || ''}`.toLowerCase();
  let category = 'general';
  if (description.includes('hoa') || description.includes('multi-family') || description.includes('multifamily')) category = 'hoa';
  else if (description.includes('industrial')) category = 'industrial';
  else if (description.includes('commercial')) category = 'commercial';
  else if (description.includes('gutter')) category = 'gutter';
  else if (description.includes('tile')) category = 'tile';
  else if (description.includes('flat')) category = 'flat';
  else if (description.includes('inspect')) category = 'inspection';
  else if (description.includes('shingle')) category = 'shingle';
  else if (description.includes('repair')) category = 'repair';
  else if (description.includes('replace') || description.includes('installation') || description.includes('install')) category = 'replacement';
  const match = PROCESS_PHOTOS[category].find(([src]) => src !== page.image) || PROCESS_PHOTOS.general.find(([src]) => src !== page.image);
  return match || PROCESS_PHOTOS.general[0];
}

// A service page (e.g. /residential-roofing/tile-roofing/lift-and-relay/). Content shape: see data/services/*.js.
// crumbs: breadcrumb trail; eyebrow: section label above the H1; scenes: [heroArt, processArt] placeholder
// art until photos exist. actions: hero buttons (Hero); finalCta: the closing call to action (FinalCta
// props; defaults to page.final, else one worded around page.keyword). page.sections (optional): bands after the
// overview, e.g. one per roof type on /roof-inspection/ ([{ eyebrow, heading, paragraphs, points }]). hub: the service-first
// hub this page belongs to ({ label, href }); the overview links back to it, so the hub is the page for the general search.
export default async function ServicePage({ page, crumbs, eyebrow, scenes = [], offer, actions, hub, finalCta = page.final || closingCta(page.keyword, offer) }) {
  const [heroScene = 'scene-shingle', processScene = heroScene] = scenes;
  const [processImage, processImageAlt] = page.process.image ? [page.process.image, page.process.imageAlt] : processPhoto(page);
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
        title={page.h1 || page.title}
        outcome={heroOutcome(crumbs.at(-1).href)}
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
        image={processImage}
        imageAlt={processImageAlt}
      />
      <WhyChoose heading={page.why.heading} intro={page.why.intro} points={page.why.points} />
      <LatestArticles posts={await articlesFor(crumbs.at(-1).href)} heading="Related Roofing Articles" />
      {page.faqs?.length > 0 && <Faq heading="Frequently Asked Questions" sub={faqSub(page.keyword)} faqs={page.faqs} cta={false} />}
      <RelatedLinks heading="Recent projects" links={projectsRelatedTo(crumbs.at(-1).href)} />
      <RoofCheck tone="white" offer={offer} />
      <FinalCta {...finalCta} />
    </main>
  );
}
