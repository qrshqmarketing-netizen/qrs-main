import ProofBar from '@/components/sections/ProofBar';
import Image from 'next/image';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import FinalCta from '@/components/sections/FinalCta';
import RelatedLinks from '@/components/sections/RelatedLinks';
import ProjectChapters from '@/components/project/ProjectChapters';
import ProjectCounter from '@/components/project/ProjectCounter';
import ProjectGallery from '@/components/project/ProjectGallery';
import ProjectReveal from '@/components/project/ProjectReveal';
import ReviewMarquee from '@/components/sections/ReviewMarquee';
import JsonLd from '@/components/ui/JsonLd';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { HOME, PROJECTS_LINK } from '@/data/catalog';
import { relatedLinks } from '@/data/content';
import { PROJECT_PAGES } from '@/data/pages/projects';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import './ProjectDetail.css';
import RoofCheck from '@/components/sections/RoofCheck';

// A project page (e.g. /projects/shingle-roof-replacements-90731/), in the studio style: a full-bleed cover photo with the title and the ZIP code rolling up
// like an odometer; a facts column (where, what, how many photos) beside the story's lead paragraph; for a project with a matching pair, the job photo
// wiping away to the finished roof as you scroll (ProjectReveal); the rest of the story as numbered chapters with job photos between them, pinned and
// sliding sideways on desktop (ProjectChapters; both adapted from fluid.glass/approach); every photo in a gallery you can switch between Detail
// (editorial rows), Grid and Slider, each opening full screen; Google reviews, led by the ones naming the area and the kind of roof; then the next
// project and the related services.
// page: a project from data/pages/ ({ path, title, metaTitle?, description, image, imageAlt, place, label, photos: [{ src, alt }], paragraphs, headings?, related? }).
// metaTitle: a shorter <title> than `title` (which is also the headline) when that one runs past ~60 characters.
// headings: { position: 'text' } labels the paragraph at that position; related: pages shown as "Related services"; reveal: see revealOf below.
// The first photo in `photos` is also `image` (share image, structured data, Projects map). The facts come from the data: `place`, the work named in the
// title (the words before the last " in ") and the photo count; the number is the ZIP code found in `place`.
export const projectMetadata = (page) => pageMetadata({ title: page.metaTitle || page.title, description: page.description, path: page.path });

const workOf = (title) => {
  const at = title.lastIndexOf(' in ');
  return at > 0 ? title.slice(0, at) : title;
};

// The story after the lead paragraph as chapters, each but the last followed by a photo from the job, spread evenly through the photos that
// aren't already the cover or in the during/finished wipe (a project with few photos gives the first chapters one each). `chapterPhotos`
// ({ <chapter number, as in headings>: <index in photos> }) picks the photo after a chapter by hand, so it shows what that chapter tells.
function chaptersOf(page, used) {
  const rest = page.paragraphs.slice(1);
  const pool = page.photos.filter((photo, i) => i > 0 && !used.includes(photo.src));
  const wanted = Math.min(rest.length - 1, pool.length);
  return rest.map((text, i) => ({
    heading: page.headings?.[i + 1] || '',
    text,
    photo: page.photos[page.chapterPhotos?.[i + 1]] || (i < wanted ? pool[Math.floor(((i + 0.5) * pool.length) / wanted)] : null),
  }));
}

// The during/finished wipe, when the data names a photo from during the job taken from about the same spot as the finished one
// (`reveal: { before: <index in photos>, after?: <index>, heading? }`; `after` defaults to the cover photo)
function revealOf(page) {
  const r = page.reveal;
  const before = r && page.photos[r.before];
  if (!before) return null;
  const after = r.after != null ? page.photos[r.after] : { src: page.image, alt: page.imageAlt || '' };
  return { before, after, heading: r.heading || 'From tear-off to finished roof' };
}

// Words that tie a Google review to this project's area: the neighborhood and city from `place` (not the state or ZIP code)
const placesOf = (place = '') => place.split(',').map((s) => s.trim()).filter((s) => s && !/^CA\b/.test(s));

export default function ProjectDetail({ page }) {
  const crumbs = [HOME, PROJECTS_LINK, { label: page.title, href: page.path }];
  const schema = pageJsonLd({ path: page.path, title: page.title, description: page.description, crumbs, image: page.image });
  const place = (page.place || '').replace(/,?\s*CA\b/, '');
  const zip = (page.place || '').match(/\b9\d{4}\b/)?.[0];
  const lead = page.paragraphs[0];
  const reveal = revealOf(page);
  const chapters = chaptersOf(page, [page.image, reveal?.before.src, reveal?.after.src]);
  const at = PROJECT_PAGES.findIndex((p) => p.path === page.path);
  const next = PROJECT_PAGES.length > 1 ? PROJECT_PAGES[(at + 1) % PROJECT_PAGES.length] : null;
  const words = page.title.split(' ');
  const cut = Math.ceil(words.length / 2);

  return (
    <main id="top" className="project-detail">
      <JsonLd data={schema} />

      <section className="pd-hero" aria-label={page.title}>
        <Image className="pd-hero-img" src={page.image} alt={page.imageAlt || ''} fill sizes="100vw" quality={75} preload fetchPriority="high" />
        <div className="pd-hero-shade" aria-hidden="true"></div>
        <div className="container pd-hero-inner">
          <Breadcrumbs items={crumbs} />
          <div className="pd-hero-bottom">
            <h1>
              <span>{words.slice(0, cut).join(' ')}</span> <span>{words.slice(cut).join(' ')}</span>
            </h1>
            {zip && <ProjectCounter value={zip} label="ZIP code" />}
          </div>
        </div>
      </section>
      <ProofBar strip />

      <section className="pd-intro">
        <div className="container pd-intro-grid">
          <dl className="pd-facts">
            <div>
              <dt>Location</dt>
              <dd>{place}</dd>
            </div>
            <div>
              <dt>Work</dt>
              <dd>{workOf(page.title)}</dd>
            </div>
            <div>
              <dt>Photos</dt>
              <dd>{page.photos.length} from the job</dd>
            </div>
          </dl>
          <p className="pd-lead">
            <Rich text={lead} />
          </p>
        </div>
      </section>

      {reveal && <ProjectReveal {...reveal} />}

      {chapters.length > 0 && <ProjectChapters chapters={chapters} />}

      <ProjectGallery photos={page.photos} name={page.title} />

      <ReviewMarquee places={placesOf(page.place)} />

      {next && next.path !== page.path && (
        <section className="pd-next" aria-label="Next project">
          <div className="container">
            <p className="pd-label">Next project</p>
            <SiteLink className="pd-next-card" href={next.path}>
              <span className="pd-next-img">
                <Image src={next.image} alt="" fill sizes="(min-width: 901px) 50vw, 100vw" quality={65} loading="lazy" />
              </span>
              <span className="pd-next-text">
                <small>{(next.place || '').replace(/,?\s*CA\b/, '')}</small>
                <b>{next.title}</b>
                <span>
                  View project <ArrowRight />
                </span>
              </span>
            </SiteLink>
          </div>
        </section>
      )}

      <RelatedLinks heading="Related services" links={relatedLinks(page.related)} />
      <RoofCheck tone="white" />
      <FinalCta />
    </main>
  );
}
