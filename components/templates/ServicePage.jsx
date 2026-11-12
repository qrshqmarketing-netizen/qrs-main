import Faq from '@/components/sections/Faq';
import ReviewMarquee from '@/components/sections/ReviewMarquee';
import LatestArticles from '@/components/sections/LatestArticles';
import FeatureBand from '@/components/sections/FeatureBand';
import FinalCta from '@/components/sections/FinalCta';
import TrustLogos from '@/components/sections/TrustLogos';
import JumpCta from '@/components/sections/JumpCta';
import Overview from '@/components/sections/Overview';
import PartnerLogos from '@/components/sections/PartnerLogos';
import ProcessSteps from '@/components/sections/ProcessSteps';
import ServiceStory from '@/components/sections/ServiceStory';
import RoofDiagram from '@/components/sections/RoofDiagram';
import { diagramFor } from '@/data/roofDiagrams';
import RoofCheck from '@/components/sections/RoofCheck';
import WhyChoose from '@/components/sections/WhyChoose';
import JsonLd from '@/components/ui/JsonLd';
import { projectsShownOn } from '@/data/projectPages';
import StudioProjects from '@/components/studio/StudioProjects';
import { pageJsonLd } from '@/lib/structuredData';
import { closingCta, faqHeading, faqSub, nearYou, projectsHeading, REVIEWS_HEADING } from './shared';
import { heroOutcome } from '@/data/heroOutcomes';
import { articlesFor } from '@/lib/articles';
import { searchHeading } from '@/lib/headings';
import ServicePageSvc from './ServicePageSvc';
import ProofBar from '@/components/sections/ProofBar';
import { ServiceQhHero } from './qhHeroes';

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
  // Commercial pages only ever get commercial roofs (owner, November 12 2026): real QRS commercial jobs, no homes
  commercial: [
    ['/images/recent-work-commercial-flat-roof-drone-view.webp', 'Aerial view of a commercial flat roof project'],
    ['/images/home-services-commercial-flat-roof-drone-view.webp', 'Aerial view of a commercial flat roof'],
    ['/images/projects/commercial-flat-roof-replacement-westminster-92683/commercial-flat-roof-westminster-92683-09.webp', 'Aerial view of a commercial building with a new white flat roof'],
    ['/images/projects/commercial-flat-roof-replacement-westminster-92683/commercial-flat-roof-westminster-92683-13.webp', 'A rooftop unit and flashed curb on a new white commercial roof'],
    ['/images/commercial-low-slope-roof-install-crew-drone-view.webp', 'A crew installing a low-slope commercial roof'],
    ['/images/commercial-roof-replacement-tear-off-overhead-drone-view.webp', 'Overhead view of a commercial roof tear-off in progress'],
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
  metal: [
    ['/images/metal-roof-standing-seam-panel-detail.webp', 'Close-up of bronze standing seam metal roof panels with raised seams running down to the eave'],
    ['/images/metal-roof-standing-seam-modern-home.webp', 'Modern two-story home with a dark gray standing seam metal roof over wood and stucco walls'],
  ],
  general: [
    ['/images/home-services-residential-shingle-drone-view.webp', 'Aerial view of a residential roof'],
    // no truck photo on sub pages (owner, November 2 2026)
    ['/images/roofscan-360-roofer-chimney-flashing.webp', 'A roofer with a tablet pointing out the chimney flashing during a roof inspection'],
  ],
};

function processPhoto(page, commercial = false) {
  const description = `${page.keyword || ''} ${page.title || ''} ${page.slug || ''}`.toLowerCase();
  let category = 'general';
  if (commercial && !description.includes('hoa') && !description.includes('multi-family') && !description.includes('multifamily') && !description.includes('industrial')) category = 'commercial'; // the pages under /commercial-roofing/
  else if (description.includes('hoa') || description.includes('multi-family') || description.includes('multifamily')) category = 'hoa';
  else if (description.includes('industrial')) category = 'industrial';
  else if (description.includes('commercial')) category = 'commercial';
  else if (description.includes('gutter')) category = 'gutter';
  else if (description.includes('metal')) category = 'metal';
  else if (description.includes('tile')) category = 'tile';
  else if (description.includes('flat')) category = 'flat';
  else if (description.includes('inspect')) category = 'inspection';
  else if (description.includes('shingle')) category = 'shingle';
  else if (description.includes('repair')) category = 'repair';
  else if (description.includes('replace') || description.includes('installation') || description.includes('install')) category = 'replacement';
  const match = PROCESS_PHOTOS[category].find(([src]) => src !== page.image) || (commercial ? undefined : PROCESS_PHOTOS.general.find(([src]) => src !== page.image));
  return match || (commercial ? PROCESS_PHOTOS.commercial[0] : PROCESS_PHOTOS.general[0]);
}

// A service page (e.g. /residential-roofing/tile-roofing/lift-and-relay/). Content shape: see data/services/*.js.
// crumbs: breadcrumb trail; eyebrow: section label above the H1; scenes: [heroArt, processArt] placeholder
// art until photos exist. actions: hero buttons (Hero); finalCta: the closing call to action (FinalCta
// props; defaults to page.final, else one worded around page.keyword). page.sections (optional): bands after the
// overview, e.g. one per roof type on /roof-inspection/ ([{ eyebrow, heading, paragraphs, points }]). hub: the service-first
// hub this page belongs to ({ label, href }); the overview links back to it, so the hub is the page for the general search.
// The new design (components/svc/, ServicePageSvc.jsx): released for SVC_DESIGN_PAGES first (October 30 2026), then for every service page
// (SVC_DESIGN_EVERYWHERE, the same day). Owner, November 5 2026 (step 1 of bringing the sub pages back to the studio look of the home page):
// every service page uses this studio layout again; set SVC_DESIGN_EVERYWHERE to true, or list a page in SVC_DESIGN_PAGES, to show the other.
const SVC_DESIGN_PAGES = new Set();
const SVC_DESIGN_EVERYWHERE = false;
// The new-theme layout (QhServicePage.jsx, November 6-9 2026) is no longer used: since November 10 2026 every service page is this studio
// layout with the earlier content and meta, under the new-theme hero (ServiceQhHero).

export default async function ServicePage({ page, crumbs, eyebrow, scenes = [], offer, actions, hub, finalCta = page.final || closingCta(page.keyword, offer) }) {
  if (SVC_DESIGN_EVERYWHERE || SVC_DESIGN_PAGES.has(crumbs.at(-1).href)) return ServicePageSvc({ page, crumbs, eyebrow, offer, actions, hub, finalCta });
  // The jump-to-form buttons' words: a roof survey on commercial pages (never called free), else the site's usual Get Pro Advice
  const jumpLabel = offer === 'commercial' ? 'Request a Roof Survey' : 'Get Pro Advice';
  const [heroScene = 'scene-shingle', processScene = heroScene] = scenes;
  const [processImage, processImageAlt] = page.process?.image ? [page.process.image, page.process.imageAlt] : processPhoto(page, offer === 'commercial');
  const work = projectsShownOn(crumbs.at(-1).href);
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
      {/* The new-theme hero with the page's own animation on the earlier layout (owner, November 10 2026; qhHeroes.jsx) */}
      <ServiceQhHero page={page} crumbs={crumbs} offer={offer} actions={actions} />
      <ProofBar strip />
      {/* Google, BBB and Yelp logos under the proof strip, as on the studio home page */}
      <TrustLogos />
      {/* Pages rewritten the home page's way have a `story` (ServiceStory: statement + "How we …" principles), which replaces the overview, the
          process steps and "Why choose QRS"; the rest keep those three (owner, October 16 2026: page by page) */}
      {page.story ? (
        <ServiceStory cta={jumpLabel} story={page.story} image={page.story.image === false ? null : page.story.image || processImage} imageAlt={page.story.image ? page.story.imageAlt : processImageAlt} />
      ) : (
        <Overview paragraphs={page.overview.paragraphs} cta={hub && { label: `Compare All ${hub.label} Options`, href: hub.href }} />
      )}
      {/* The blog's roof illustration where it explains this service (data/roofDiagrams.js) */}
      <RoofDiagram diagram={diagramFor(crumbs.at(-1).href)} />
      {/* `about`: a short section of the page's own after the story (the commercial replacement page's "Commercial roofing company in Los Angeles") */}
      {page.about && <Overview heading={page.about.heading} paragraphs={page.about.paragraphs} />}
      {page.sections?.map((section, i) => (
        <FeatureBand key={section.heading} {...section} tone={i % 2 ? 'navy' : 'light'} />
      ))}
      {!page.story && (
        <ProcessSteps
          heading={page.process.heading}
          subheading={page.process.subheading}
          steps={page.process.steps}
          scene={processScene}
          image={processImage}
          imageAlt={processImageAlt}
        />
      )}
      {/* The story in order (owner, October 15 2026, after maben.com.au): what we do, how we do it, then the work itself on real roofs, what people
          say, why QRS, and the questions. The projects used to sit at the bottom, under the FAQ. */}
      <StudioProjects projects={work.projects} heading={projectsHeading(page.keyword, work.exact)} />
      {/* Google reviews, a few sections below the hero (owner, October 14 2026) */}
      {page.showReviews !== false && <ReviewMarquee heading={page.reviewsHeading || REVIEWS_HEADING} />}
      {/* A jump to the estimate form under the reviews (owner, November 6 2026) */}
      <div className="container jump-cta-band">
        <JumpCta label={jumpLabel} align="center" />
      </div>
      {!page.story && <WhyChoose heading={page.why.heading} intro={page.why.intro} points={page.why.points} />}
      {page.partners && <PartnerLogos {...page.partners} />}
      <LatestArticles posts={await articlesFor(crumbs.at(-1).href)} heading="Related Roofing Articles" />
      {/* Where we do this work, with links to the county and office pages (owner, November 10 2026) */}
      <Overview {...nearYou(page.keyword, offer)} />
      {page.faqs?.length > 0 && <Faq heading={faqHeading(page.keyword)} sub={faqSub(page.keyword)} faqs={page.faqs} cta={false} />}
      <RoofCheck tone="white" offer={offer} />
      <FinalCta {...finalCta} />
    </main>
  );
}
