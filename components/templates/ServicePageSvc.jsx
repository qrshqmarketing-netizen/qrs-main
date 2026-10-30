import Faq from '@/components/sections/Faq';
import LatestArticles from '@/components/sections/LatestArticles';
import FeatureBand from '@/components/sections/FeatureBand';
import FinalCta from '@/components/sections/FinalCta';
import Overview from '@/components/sections/Overview';
import PartnerLogos from '@/components/sections/PartnerLogos';
import ProofBar from '@/components/sections/ProofBar';
import RoofDiagram from '@/components/sections/RoofDiagram';
import { diagramFor } from '@/data/roofDiagrams';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import { projectsShownOn } from '@/data/projectPages';
import { relatedLinks } from '@/data/content';
import StudioProjects from '@/components/studio/StudioProjects';
import { SvcFeatures, SvcHero, SvcIncludes, SvcOffer, SvcRelated, SvcReviews, SvcTrust } from '@/components/svc/SvcSections';
import { pageJsonLd } from '@/lib/structuredData';
import { closingCta, faqSub } from './shared';
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

function photoCategory(page) {
  const description = `${page.keyword || ''} ${page.title || ''} ${page.slug || ''}`.toLowerCase();
  let category = 'general';
  if (description.includes('hoa') || description.includes('multi-family') || description.includes('multifamily')) category = 'hoa';
  else if (description.includes('industrial')) category = 'industrial';
  // property management is a commercial page, so its cards use commercial roof photos (owner, October 29 2026: never the truck photo there)
  else if (description.includes('commercial') || description.includes('property')) category = 'commercial';
  else if (description.includes('gutter')) category = 'gutter';
  else if (description.includes('metal')) category = 'metal';
  else if (description.includes('tile')) category = 'tile';
  else if (description.includes('flat')) category = 'flat';
  else if (description.includes('inspect')) category = 'inspection';
  else if (description.includes('shingle')) category = 'shingle';
  else if (description.includes('repair')) category = 'repair';
  else if (description.includes('replace') || description.includes('installation') || description.includes('install')) category = 'replacement';
  return category;
}

function processPhoto(page) {
  const category = photoCategory(page);
  const match = PROCESS_PHOTOS[category].find(([src]) => src !== page.image) || PROCESS_PHOTOS.general.find(([src]) => src !== page.image);
  return match || PROCESS_PHOTOS.general[0];
}

// The photos for the feature cards: the page's own process photo first, then the rest of its category, then the hero photo
function cardPhotos(page, first) {
  const list = [first, ...PROCESS_PHOTOS[photoCategory(page)], [page.image, page.imageAlt]].filter((p) => p && p[0]);
  return list.filter((p, i) => list.findIndex((q) => q[0] === p[0]) === i);
}

// The service page in the remote.com/global-hr/global-payroll design (owner, October 29 2026). ServicePage.jsx sends the pages listed in
// SVC_DESIGN_PAGES there (released October 30 2026: emergency roof repair and roof financing); every other service page keeps the classic layout.
// Content shape: see data/services/*.js.
// crumbs: breadcrumb trail; eyebrow: the section's name (structured data); actions: hero buttons; finalCta: the closing call to action
// (FinalCta props; defaults to page.final, else one worded around page.keyword). page.sections (optional): bands after the overview, e.g. one
// per roof type on /roof-inspection/. hub: the service-first hub this page belongs to ({ label, href }).
// Layout (owner, October 29 2026; the section patterns of remote.com/global-hr/global-payroll, components/svc/): the gradient hero with the WebGL
// roof frame, the proof strip, the page's own story as feature cards (or, on pages without a `story`, the overview and the process steps as
// cards), the roof diagram, `about` and `sections`, local credibility with numbers, what every job includes (the story's bullets, or the "why"
// points), the written-price offer, projects, review cards, related services, financing logos, articles, FAQ, the request form and the closing
// call to action. Every page keeps all of its own copy.
export default async function ServicePageSvc({ page, crumbs, eyebrow, offer, actions, hub, finalCta = page.final || closingCta(page.keyword, offer) }) {
  const path = crumbs.at(-1).href;
  const [processImage, processImageAlt] = page.process?.image ? [page.process.image, page.process.imageAlt] : processPhoto(page);
  const firstPhoto = page.story?.image === false ? null : page.story?.image ? [page.story.image, page.story.imageAlt] : [processImage, processImageAlt];
  const photos = cardPhotos(page, firstPhoto);
  const work = projectsShownOn(path);
  const commercial = offer === 'commercial';
  const related = relatedLinks([...(page.related || []), ...(hub ? [hub.href] : [])].filter((h, i, all) => all.indexOf(h) === i && h !== path));
  const storyBullets = page.story?.principles?.flatMap((p) => p.bullets || []) || [];
  const schema = pageJsonLd({
    path,
    title: page.metaTitle,
    description: page.metaDescription,
    crumbs,
    service: { name: page.title, type: page.keyword, category: eyebrow },
    faqs: page.faqs,
    image: page.image,
  });
  return (
    <main id="top" className="svc">
      <JsonLd data={schema} />
      <SvcHero
        crumbs={crumbs}
        title={searchHeading(page.h1 || page.title)}
        outcome={heroOutcome(path)}
        intro={page.hero.intro}
        {...(page.heroNotes && { annotations: page.heroNotes })}
        {...(actions && { actions })}
      />
      <ProofBar strip />
      {page.story ? (
        <SvcFeatures
          label={page.story.label}
          heading={page.story.lead}
          text={page.story.text}
          subheading={page.story.heading}
          cards={page.story.principles.map(({ title, text }) => ({ title, text }))}
          photos={photos}
        />
      ) : (
        <>
          <div className="sv-keep">
            <Overview paragraphs={page.overview.paragraphs} cta={hub && { label: `Compare All ${hub.label} Options`, href: hub.href }} />
          </div>
          <SvcFeatures heading={page.process.heading} text={page.process.subheading} cards={page.process.steps} photos={photos} />
        </>
      )}
      {/* The blog's roof illustration where it explains this service (data/roofDiagrams.js) */}
      <RoofDiagram diagram={diagramFor(path)} />
      {page.about && <Overview heading={page.about.heading} paragraphs={page.about.paragraphs} />}
      {page.sections?.map((section, i) => (
        <FeatureBand key={section.heading} {...section} tone={i % 2 ? 'navy' : 'light'} />
      ))}
      <SvcTrust path={path} />
      {page.story ? (
        <SvcIncludes keyword={page.keyword} points={storyBullets.length >= 3 ? storyBullets : []} />
      ) : (
        <SvcIncludes heading={page.why.heading} intro={page.why.intro} points={page.why.points} />
      )}
      <SvcOffer offer={offer} />
      <StudioProjects projects={work.projects} heading={work.exact ? 'This work, on real roofs' : 'Recent roofing projects'} />
      {page.showReviews !== false && <SvcReviews path={path} heading={page.reviewsHeading} />}
      <SvcRelated links={related} commercial={commercial} />
      {page.partners && <PartnerLogos {...page.partners} />}
      <LatestArticles posts={await articlesFor(path)} heading="Related Roofing Articles" />
      {page.faqs?.length > 0 && (
        <div className="sv-faq-wrap">
          <Faq heading="Frequently Asked __Questions__" sub={faqSub(page.keyword)} faqs={page.faqs} cta={false} />
        </div>
      )}
      <RoofCheck tone="white" offer={offer} />
      <FinalCta {...finalCta} />
    </main>
  );
}
