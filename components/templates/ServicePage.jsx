import Faq from '@/components/sections/Faq';
import AreaLinks from '@/components/home/AreaLinks';
import CheckBand from '@/components/home/CheckBand';
import ReviewTrio from '@/components/home/ReviewTrio';
import { AREA_LINKS, checksFor } from '@/data/nearYou';
import HomeArticles from '@/components/home/HomeArticles';
import HomeWork from '@/components/home/HomeWork';
import '@/components/home/HomeClean.css';
import '@/components/home/CleanPages.css';
import BandCards from '@/components/home/BandCards';
import Hero from '@/components/sections/Hero';
import Overview from '@/components/sections/Overview';
import PartnerLogos from '@/components/sections/PartnerLogos';
import ProcessSteps from '@/components/sections/ProcessSteps';
import ServiceStory from '@/components/sections/ServiceStory';
import RoofDiagram from '@/components/sections/RoofDiagram';
import { diagramFor } from '@/data/roofDiagrams';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import { projectsShownOn } from '@/data/projectPages';
import { pageJsonLd } from '@/lib/structuredData';
import { faqSub } from './shared';
import { heroOutcome } from '@/data/heroOutcomes';
import { articlesFor } from '@/lib/articles';
import { searchHeading } from '@/lib/headings';

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
  metal: [
    ['/images/metal-roof-standing-seam-panel-detail.webp', 'Close-up of bronze standing seam metal roof panels with raised seams running down to the eave'],
    ['/images/metal-roof-standing-seam-modern-home.webp', 'Modern two-story home with a dark gray standing seam metal roof over wood and stucco walls'],
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
  else if (description.includes('metal')) category = 'metal';
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
// art until photos exist. actions: hero buttons (Hero). The closing call to action (page.final) is no longer shown on sub pages (October 21 2026:
// the request form just above it is the one ask). page.sections (optional): one per roof type on /roof-inspection/ ([{ eyebrow, heading,
// paragraphs, points }]), shown as cards in one row under `page.sectionsHeading` (BandCards). hub: the service-first
// hub this page belongs to ({ label, href }); the overview links back to it, so the hub is the page for the general search.
export default async function ServicePage({ page, crumbs, eyebrow, scenes = [], offer, actions, hub }) {
  const [heroScene = 'scene-shingle', processScene = heroScene] = scenes;
  const [processImage, processImageAlt] = page.process?.image ? [page.process.image, page.process.imageAlt] : processPhoto(page);
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
    <main id="top" className="clean-page">
      <JsonLd data={schema} />
      <Hero
        crumbs={crumbs}
        eyebrow={eyebrow}
        title={searchHeading(page.h1 || page.title)}
        outcome={heroOutcome(crumbs.at(-1).href)}
        intro={page.hero.intro}
        image={page.image}
        imageAlt={page.imageAlt}
        stats
        {...(actions && { actions })}
      />
      {/* Pages rewritten the home page's way have a `story` (ServiceStory: statement + "How we …" principles), which replaces the overview, the
          process steps and "Why choose QRS"; the rest keep those three (owner, October 16 2026: page by page) */}
      {page.story ? (
        <ServiceStory story={page.story} image={page.story.image === false ? null : page.story.image || processImage} imageAlt={page.story.image ? page.story.imageAlt : processImageAlt} />
      ) : (
        <Overview paragraphs={page.overview.paragraphs} cta={hub && { label: `Compare All ${hub.label} Options`, href: hub.href }} />
      )}
      {/* The blog's roof illustration where it explains this service (data/roofDiagrams.js) */}
      <RoofDiagram diagram={diagramFor(crumbs.at(-1).href)} />
      {page.sections?.length > 0 && <BandCards heading={page.sectionsHeading} sections={page.sections} />}
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
      {work.projects.length > 0 && <HomeWork heading={work.exact ? 'This work, on real __roofs__' : 'Recent roofing __projects__'} projects={work.projects.slice(0, 3)} all={{ label: 'View all projects', href: '/projects/' }} />}
      {/* After publicstorage.com (owner, October 21 2026: less on each page): three reviews side by side instead of the review wall, and the
          checklist photo band instead of "Why choose QRS" on the pages without a story */}
      {page.showReviews !== false && <ReviewTrio path={crumbs.at(-1).href} />}
      {!page.story && <CheckBand {...checksFor(crumbs.at(-1).href)} />}
      {page.partners && <PartnerLogos {...page.partners} />}
      <HomeArticles posts={await articlesFor(crumbs.at(-1).href)} heading="Related articles" />
      {page.faqs?.length > 0 && <Faq heading="Frequently Asked __Questions__" sub={faqSub(page.keyword)} faqs={page.faqs} cta={false} limit={4} />}
      <RoofCheck tone="white" offer={offer} />
      <AreaLinks {...AREA_LINKS} />
    </main>
  );
}
