import Image from 'next/image';
import TrustLogos from '@/components/sections/TrustLogos';
import SiteLink from '@/components/ui/SiteLink';
import { BUSINESS, HERO_ANNOTATIONS, OFFICES } from '@/data/site';
import { th } from '@/lib/langHome';
import { QhBanner, QhChoice, QhHero, QhPoints, QhPosts, QhProjects, QhReviews, QhServices, QhSteps, QhStart, QhStory, QhTrust } from './QrsSections';

// The home page from the owner's homepage file (November 6 2026, "qrs-homepage.html"): its layout and sections (hero with the exploded roof
// layers on a dark blue gradient, trust strip, story collage, services list with a photo that swaps on hover, crews band, ReserveReady
// program, four steps, reviews, projects, a photo banner, articles, FAQ beside the request form), in the site's own header, footer, fonts and
// theme colors (dark mode follows). The sections are shared with the pages built in the same style (QrsSections.jsx).
// The file's wording was checked against what the site already states: no "in-house only" crews (partner crews help in overflow), no star rating,
// no "one phone number for all offices" (each office has its own), the commercial survey never called free, the warranty with "call for details".
// Every section links to the matching service, program, project or company pages.

// The hero H1 names no place (owner, November 6 2026: city names in hero headings only on the location pages); HOME_H1 stays for the AI files
const HOME_HERO_H1 = 'Residential & Commercial Roofing Contractor';

export const QH_SERVICES = [
  { title: '*TotalShield* shingle systems', text: 'Complete shingle replacements and new installations, built from the deck up.', href: '/residential-roofing/shingle-roofing/replacement/', image: '/images/shingle-roof-completed-drone-view.webp', caption: 'Completed shingle roof, drone view' },
  { title: '*FlatGuard* flat roofing', text: 'Flat roof systems planned around drainage, seams and lasting protection.', href: '/residential-roofing/flat-roofing/replacement/', image: '/images/flat-roof-torch-down-drone-view-services.webp', caption: 'Torch-down flat roof, drone view' },
  { title: '*LeakRescue* roof repairs', text: 'We trace the leak to where the water really gets in, fix it and show you the photos.', href: '/roof-repair/', image: '/images/shingle-roof-repair-ridge-finish.webp', caption: 'Shingle repair with a finished ridge' },
  { title: '*RoofScan 360* inspections', text: 'A roofer-led inspection with photos, plain-English findings and a clear next step.', href: '/roof-inspection/', image: '/images/recent-work-shingle-row-drone-view.webp', caption: 'Drone view from straight above a row of shingle roofs' }, // owner, November 6 2026: a drone shot from above
  { title: '*SecondLife* tile lift & relay', text: 'Keep your sound roof tiles and replace the worn underlayment beneath them.', href: '/residential-roofing/tile-roofing/lift-and-relay/', image: '/images/tile-lift-off-and-reset-drone-view.webp', caption: 'Tile lift-off and reset in progress' },
  { title: '*RoofCare Plan* & *RoofRevive* tune-ups', text: 'Seasonal visits that catch small problems early, with a photo report each time.', href: '/roof-maintenance-plans/', image: '/images/shingle-roof-inspection-overhead.webp', caption: 'Overhead view during a seasonal visit' },
  { title: 'Commercial roofing', text: 'Repair, replacement and maintenance for offices, retail, warehouses and industrial buildings.', href: '/commercial-roofing/', image: '/images/recent-work-commercial-flat-roof-drone-view.webp', caption: 'Finished white flat roof on a warehouse' },
];

const CATEGORIES = [
  { label: 'Residential', href: '/residential-roofing/' },
  { label: 'HOA & multi-family', href: '/residential-roofing/hoa-multi-family/' },
  { label: 'Commercial', href: '/commercial-roofing/' },
  { label: 'Emergency repair', href: '/roof-repair/emergency/' },
];

const PROGRAM = [
  { title: 'One point of contact', text: 'The same QRS lead from the first survey to the final walk-through.', icon: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1.2-3.6 4-5 7-5s5.8 1.4 7 5" /></> },
  { title: 'Photo-documented reports', text: 'Findings your board and owners can review without climbing a ladder.', icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="m21 16-5-5-8 8" /></> },
  { title: 'Phased proposals', text: 'Repair, maintain or replace, building by building or phase by phase.', icon: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></> },
  { title: 'Long-range budget planning', text: 'Clear scopes your board can plan around for the years ahead.', icon: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4M8 14l2.5 2.5L16 12" /></> },
];

// Home hero background (owner, November 9 2026): the final cut of the "Need a Roof" reel (home-hero-final.mp4, 4K source) (truck, tear-off, underlayment, new shingles, the yard sign), silent,
// 1600x900, VP9 WebM with an H.264 fallback; its first frame is the poster photo (phones and tablets keep the photo, see HeroVideo)
export const HERO_BACKGROUND = {
  poster: '/images/home-hero-final-poster.webp',
  alt: 'A Quality Roofing Specialists truck parked at a job site',
  sources: [
    { src: '/videos/home-hero-final.webm', type: 'video/webm' },
    { src: '/videos/home-hero-final-h264.mp4', type: 'video/mp4' },
  ],
};

// `lang` (owner, November 6 2026): the Spanish home page at /es/ renders this too; every English text goes through `th` (data/i18n/esHome.js, then
// data/i18n/es.js), so the English page is unchanged and a missing Spanish text shows in English
const COUNT_WORDS = { en: ['no', 'one', 'two', 'three', 'four', 'five', 'six'], es: ['ninguna', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis'] };

export default function QrsHome({ heroText, faqs = [], posts = [], projects = [], lang = 'en', h1 }) {
  const T = (x, v) => th(lang, x, v);
  const tr = (list, keys) => list.map((it) => ({ ...it, ...Object.fromEntries(keys.map((k) => [k, T(it[k])])) }));
  return (
    <main id="top" className="qh" {...(lang === 'es' && { lang: 'es-MX' })}>
      <QhHero lang={lang} where={T('Family-owned · Licensed since {year}', { year: new Date(BUSINESS.licenseSince).getUTCFullYear() })} title={h1 || T(HOME_HERO_H1)} text={heroText} checks={HERO_ANNOTATIONS.home.slice(0, 3).map((c) => T(c))} visual={false} background={HERO_BACKGROUND} />
      <QhTrust lang={lang} />
      {/* Google, BBB and Yelp logos linking to our profiles (owner, November 6 2026) */}
      <TrustLogos lang={lang} />
      <QhStory
        kicker={T('Who we are')}
        heading={T('A roofer should look at your roof before anyone tries to sell you one.')}
        chips={['Family-owned', 'Woman-owned', 'Locally owned'].map((c) => T(c))}
        paragraphs={[
          T('QRS is a family business co-founded by Tony and Adva Goldberg, with {count} offices. Our crews each specialize in one kind of roof, and our senior production manager oversees quality control on every job.', { count: COUNT_WORDS[lang === 'es' ? 'es' : 'en'][OFFICES.length] || OFFICES.length }),
          T('Every job starts the same way: a roofer-led look at the roof, photos of what we find and a written scope and price before any work begins, whether it’s a single [roof repair](/roof-repair/) or a full [roof replacement](/roof-replacement/).'),
        ]}
        images={tr([
          { src: '/images/home-services-residential-shingle-drone-view.webp', alt: 'Drone view of a home with a new light gray shingle roof' },
          { src: '/images/home-hero-drone-view.webp', alt: 'Drone view from above of a home with a new gray shingle roof' }, // owner, November 6 2026: a roof from above
          { src: '/images/tile-lift-off-and-reset-drone-view.webp', alt: 'A tile roof being lifted and reset over new underlayment' },
        ], ['alt'])}
        link={{ label: T('Read the QRS story'), href: '/about-us/' }}
      />
      <QhChoice lang={lang} />
      <QhServices
        kicker={T('Services')}
        heading={T('From a single leak to a full tear-off, one team handles it.')}
        lede={T('We trace leaks, replace roofs and keep them maintained, across tile, shingle and flat roofs on homes, communities and commercial buildings.')}
        cats={tr(CATEGORIES, ['label'])}
        items={tr(QH_SERVICES, ['title', 'text', 'caption'])}
      />
      {/* ---------- Crews ---------- */}
      <section className="qh-team" aria-labelledby="qh-team-h">
        {/* The crew photo fills the band, under a navy shade, with the copy over it at the left (owner, November 6 2026) */}
        <div className="qh-team-img">
            <Image src="/images/careers-hero-qrs-crew-group.webp" alt={T('The QRS crew on a flat roof')} fill sizes="100vw" quality={70} />
        </div>
        <div className="qh-wrap qh-team-in">
          <div className="qh-team-copy">
            <h2 id="qh-team-h">{T('Our crews, on every kind of roof.')}</h2>
            <div className="qh-nums">
              <div><b>12</b><span>{T('crews for shingle, tile and flat')}</span></div>
              <div><b>{OFFICES.length}</b><span>{T('offices, each with its own number')}</span></div>
            </div>
            <ul className="qh-langs">
              <li>{T('English')}</li>
              <li lang="es">Español</li>
              <li lang="tl">{T('Tagalog')}</li>
            </ul>
            <p>{T('A roofer on our team looks at your roof first, and crews dedicated to shingle, tile and flat roofing do the work. Ask for your roofer in the language you’re most comfortable with.')}</p>
            <div className="qh-team-links">
              <SiteLink className="qh-btn qh-btn-sun" href="/careers/">{T('Careers at QRS')}</SiteLink>
              <SiteLink href="/contractors/">{T('For contractors')}</SiteLink>
              <SiteLink href="/service-areas/">{T('Our service areas')}</SiteLink>
            </div>
          </div>
        </div>
      </section>

      <QhPoints
        id="reserveready"
        name={T('*ReserveReady* for HOAs, property managers & owners')}
        heading={T('One point of contact for every building you manage.')}
        paragraphs={[
          T('Juggling several roofers across a community or portfolio means chasing reports, comparing scopes that don’t match and wondering whether the work is the same from one building to the next.'),
          T('*ReserveReady* gives boards and managers one point of contact, photo-documented reports you can take into a board meeting, phased proposals and long-range budget planning, with the work phased building by building.'),
        ]}
        actions={
          <div className="qh-actions">
            <SiteLink className="qh-btn qh-btn-navy" href="/residential-roofing/hoa-multi-family/">{T('See how ReserveReady works')}</SiteLink>
            <SiteLink className="qh-link" href="/commercial-roofing/property-managers/">{T('For property managers')}</SiteLink>
          </div>
        }
        items={tr(PROGRAM, ['title', 'text'])}
      />
      <QhSteps lang={lang} />
      <QhReviews path="/" lang={lang} />
      <QhProjects projects={projects} lang={lang} />
      <QhBanner lang={lang} text={T('One home or a whole community, we start with a roofer-led look at the roof and give you a clear next step.')} />
      <QhPosts posts={posts} lang={lang} />
      <QhStart faqs={faqs} lang={lang} />
    </main>
  );
}
