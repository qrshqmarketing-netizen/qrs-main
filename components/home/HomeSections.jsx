import Image from 'next/image';
import Rich from '@/components/ui/Rich';
import Mark from '@/components/ui/Mark';
import SiteLink from '@/components/ui/SiteLink';
import HeroVideo from '@/components/widgets/HeroVideo';
import QrsMarkSvg from '@/components/ui/QrsMarkSvg';
import { LATEST_PROJECTS } from '@/data/projectPages';
import { GOOGLE_REVIEWS as REVIEW_LIST } from '@/data/reviews';
import { LOCATIONS, REGIONS, cityPath, placesIn, regionPath } from '@/data/locations';
import { BBB, BUSINESS, GOOGLE_REVIEWS, OFFICES, PHONE, TEL } from '@/data/site';
import { SERVICE_CATEGORIES } from '@/data/serviceCategories';
import { CREDENTIALS_PAGE, CREDENTIALS_PUBLIC } from '@/data/pages/credentials';
import BbbBadge from '@/components/ui/BbbBadge';
import { listJoin } from '@/lib/lang';
import { th } from '@/lib/langHome';
import { ES_HOME_REVIEWS } from '@/data/i18n/esHome';
import HomeTabs from './HomeTabs';
import HomeQuotes from './HomeQuotes';
import CoresMotion from './CoresMotion';
import './HomeGradient.css';

// The home page's sections in the gradient story (owner, October 29 2026; adapted from the owner's reference homepage: its continuous
// gradient, its section patterns and its short, confident voice, in the QRS colors). The sections after the hero follow the main navigation:
// Residential, Commercial, Roof Repair, Replacement, Service Areas, Projects, then reviews, the evaluation offers, guides and the FAQ.
// Every fact is one the site already states (data/site.js, the service pages, data/offers.js, data/reviews.js): no response times, no
// prices beyond the $199 Roof Check, the warranty always with "call for details". Styles: HomeGradient.css.

// ---------- small line icons (decorative) ----------
const Svg = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const IconHome = () => <Svg><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9.5h13V10" /><path d="M10 19.5v-5h4v5" /></Svg>;
const IconStar = () => <Svg><path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" /></Svg>;
const IconDoc = () => <Svg><path d="M7 3.5h7l4 4v13H7z" /><path d="M14 3.5v4h4" /><path d="M10 12h5M10 15.5h5" /></Svg>;
const IconShield = () => <Svg><path d="M12 3.5 19 6v5.5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" /><path d="m9 12 2.2 2.2L15.5 10" /></Svg>;
const IconDrone = () => <Svg><circle cx="5" cy="6" r="2.2" /><circle cx="19" cy="6" r="2.2" /><path d="M7 7.5 10 10h4l3-2.5" /><rect x="9.5" y="10" width="5" height="4" rx="1" /><path d="M12 14v3" /></Svg>;
const IconDrop = () => <Svg><path d="M12 3.5s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" /></Svg>;
const IconTile = () => <Svg><path d="M3 15c1.5-3 3-3 4.5 0s3 3 4.5 0 3-3 4.5 0 3 3 4.5 0" /><path d="M3 10c1.5-3 3-3 4.5 0s3 3 4.5 0 3-3 4.5 0 3 3 4.5 0" /></Svg>;
const IconFlat = () => <Svg><path d="M3 9h18v3H3z" /><path d="M5 12v7M19 12v7M9 19h6" /></Svg>;
const IconPhone = () => <Svg><path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" /></Svg>;
const IconRoof = () => <Svg><path d="M2.5 13 12 5l9.5 8" /><path d="M5 11v8.5h14V11" /><path d="M2.5 13h19" /></Svg>;

const offices = OFFICES.map((o) => o.name.replace(/ Office$/, ''));
// Every section takes `lang` ('en' or 'es' for the Spanish home page at /es/); th() looks the English text up in data/i18n/esHome.js and
// returns it unchanged in English, so the English page is exactly as written here.
const officeList = (lang = 'en') => listJoin(lang, offices.map((o) => th(lang, o)));

// ---------- Hero ----------
export function HomeHero({ h1, heading, text, cta, video, poster, lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  return (
    <section className="hg-hero" aria-label="Quality Roofing Specialists">
      {/* The header's logo, large (owner, November 2 2026): the gold roof mark, QUALITY in white and "Roofing Specialists" in gold under it,
          wiping in from left to right on load like the header logo (.hg-logo in HomeGradient.css). Decorative: the H1 is below. */}
      <p className="hg-wordmark hg-logo" aria-hidden="true">
        <QrsMarkSvg className="hg-logo-mark" />
        <span className="hg-logo-text">
          <span className="hg-logo-word">QUALITY</span>
          <span className="hg-logo-sub">{T('Roofing Specialists')}</span>
        </span>
      </p>
      <div className="container">
        <div className="hg-hero-copy">
          <span className="hg-pill"><b>{T('FREE')}</b> {T('Drone roof evaluation, with a written price before any work')}</span>
          <h1 className="hg-kicker">{h1}</h1>
          <p className="hg-title">
            <Mark text={heading} animate />
          </p>
          <p className="hg-lead">{text}</p>
          <div className="hg-ctas">
            <SiteLink className="btn btn-gold" href="#roof-check">
              {cta} <span className="arrow">→</span>
            </SiteLink>
            <a className="btn btn-outline" href={TEL}>
              {T('Call {phone}', { phone: PHONE })}
            </a>
          </div>
          <p className="hg-note">{T('No pressure, no mystery scope and no surprises.')}</p>
          {/* The license and the BBB seal right in the hero (owner, November 4 2026, after a comparison with another LA roofer's home page) */}
          <div className="hg-hero-proof">
            <BbbBadge width={132} className="hg-hero-bbb" />
            <ul>
              <li>{T('CSLB #{license}', { license: BUSINESS.license })}</li>
              <li>{T('Licensed since 2020')}</li>
              <li>{T('Licensed, bonded & insured')}</li>
            </ul>
          </div>
        </div>
        <div className="hg-stage">
          <div className="hg-frame">
            <div className="hg-frame-bar" aria-hidden="true">
              <span className="hg-dot" /><span className="hg-dot" /><span className="hg-dot" />
              <span className="hg-url">{T('RoofScan 360 · drone view of a QRS job')}</span>
            </div>
            <div className="hg-media">
              <Image src={poster} alt={T('Drone view of a roof replacement by Quality Roofing Specialists')} fill sizes="(min-width: 1240px) 1180px, 100vw" quality={70} preload fetchPriority="high" />
              <HeroVideo sources={video} />
            </div>
          </div>
          <div className="hg-float hg-f1">
            <span className="hg-ico" style={{ background: 'var(--plum)' }}><IconStar /></span>
            <span><strong>{T('{count} Google reviews', { count: GOOGLE_REVIEWS.count })}</strong><small>{T('From homeowners and clients')}</small></span>
          </div>
          <div className="hg-float hg-f2">
            <span className="hg-ico" style={{ background: 'var(--hg-blue)' }}><IconDoc /></span>
            <span><strong>{T('Written price first')}</strong><small>{T('Before any work starts')}</small></span>
          </div>
          <div className="hg-float hg-f3">
            <span className="hg-ico" style={{ background: 'var(--hg-navy)' }}><IconShield /></span>
            <span><strong>{T('10-year workmanship warranty')}</strong><small>{T('On installs, call for details')}</small></span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Four principles ----------
// The first card's picture says what it claims (owner, October 29 2026): a drone over a home, its beam scanning the roof, a scan line sweeping
// down the slope and the usual problem spots (chimney flashing, a vent pipe, the lower slope) lighting up in turn, with a blinking REC tag.
// Drawn in SVG on the card's sky; the motion is CSS (CoresMotion starts it when the cards are on screen).
function RoofScanArt({ lang = 'en' }) {
  return (
    <>
      <span className="hg-rec" title={th(lang, 'Recording drone footage')}><i />REC</span>
      <svg className="hg-scan" viewBox="28 4 244 172" preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient id="hgBeam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d4b572" stopOpacity=".5" />
            <stop offset="1" stopColor="#d4b572" stopOpacity=".22" />
          </linearGradient>
          <clipPath id="hgRoofClip"><polygon points="34,128 150,70 266,128" /></clipPath>
        </defs>
        <rect className="hg-scan-wall" x="58" y="126" width="184" height="50" />
        <rect className="hg-scan-door" x="136" y="142" width="28" height="34" rx="2" />
        <rect className="hg-scan-chimney" x="200" y="84" width="17" height="30" />
        <polygon className="hg-scan-roof" points="34,128 150,70 266,128" />
        <rect className="hg-scan-pipe" x="104" y="82" width="6" height="12" rx="1" />
        <polygon className="hg-scan-beam" points="145,46 155,46 246,124 54,124" fill="url(#hgBeam)" />
        <g clipPath="url(#hgRoofClip)">
          <rect className="hg-scan-line" x="30" y="70" width="240" height="3" />
        </g>
        <g className="hg-spot sp1" transform="translate(208 101)"><circle className="hg-spot-ring" r="9" /><circle className="hg-spot-dot" r="3" /></g>
        <g className="hg-spot sp2" transform="translate(107 92)"><circle className="hg-spot-ring" r="9" /><circle className="hg-spot-dot" r="3" /></g>
        <g className="hg-spot sp3" transform="translate(70 112)"><circle className="hg-spot-ring" r="9" /><circle className="hg-spot-dot" r="3" /></g>
        <g className="hg-drone">
          <path className="hg-drone-arm" d="M126 34 L144 40 M174 34 L156 40" />
          <rect className="hg-drone-body" x="140" y="36" width="20" height="10" rx="3" />
          <circle className="hg-drone-cam" cx="150" cy="47" r="3" />
          <ellipse className="hg-rotor" cx="124" cy="32" rx="13" ry="2.4" />
          <ellipse className="hg-rotor" cx="176" cy="32" rx="13" ry="2.4" />
        </g>
      </svg>
    </>
  );
}

export function HomeCores({ lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  return (
    <section className="hg-section hg-bg-sky" style={{ paddingTop: 24 }} aria-label={T('How QRS works')}>
      <CoresMotion />
      <div className="container hg-cores">
        <article className="hg-core">
          <div className="hg-core-art hg-art-1" aria-hidden="true"><RoofScanArt lang={lang} /></div>
          <div className="hg-core-body">
            <h3>{T('A roofer looks first')}</h3>
            <p>{T('A trained in-house roofer inspects your roof, with drone footage of the areas of concern, before anyone talks price.')}</p>
          </div>
        </article>
        <article className="hg-core">
          <div className="hg-core-art hg-art-2" aria-hidden="true"><span className="hg-pin p1" /><span className="hg-pin p2" /><span className="hg-pin p3" /><span className="hg-ring" /></div>
          <div className="hg-core-body">
            <h3>{T('Local, family-owned')}</h3>
            <p>{T('Offices in {offices}, and 12 crews from the coast to the Inland Empire. We speak English, Spanish and Tagalog.', { offices: officeList(lang) })}</p>
          </div>
        </article>
        <article className="hg-core">
          <div className="hg-core-art hg-art-3" aria-hidden="true"><span className="hg-roofs"><i /><i /><i /><i /></span></div>
          <div className="hg-core-body">
            <h3>{T('Every kind of roof')}</h3>
            <p>{T('Shingle, tile and flat roofs on homes, plus HOA, multi-family and commercial buildings.')}</p>
          </div>
        </article>
        <article className="hg-core">
          <div className="hg-core-art hg-art-4" aria-hidden="true">
            <span className="hg-chat q">{T('What will it cost?')}</span>
            <span className="hg-typing"><i /><i /><i /></span>
            <span className="hg-chat a"><b>{T('Here’s your written scope and price,')}</b> {T('before any work.')}</span>
          </div>
          <div className="hg-core-body">
            <h3>{T('Everything in writing')}</h3>
            <p>{T('Photos of what we found, a written scope and price before any work, and a 10-year workmanship warranty on installs (call for details).')}</p>
          </div>
        </article>
      </div>
    </section>
  );
}

// ---------- Statement ----------
export function HomeStatement({ lang = 'en' }) {
  const T = (x) => th(lang, x);
  return (
    <section className="hg-statement" aria-label={T('Statement')}>
      <span className="hg-orbit hg-o1" aria-hidden="true"><IconDrone /></span>
      <span className="hg-orbit hg-o2" aria-hidden="true"><IconRoof /></span>
      <span className="hg-orbit hg-o3" aria-hidden="true"><IconShield /></span>
      <span className="hg-orbit hg-o4" aria-hidden="true"><IconDoc /></span>
      <div className="container">
        <h2>
          {T('A roof is only as good as')} <span className="hg-grad">{T('the parts you never see.')}</span>
        </h2>
      </div>
    </section>
  );
}

// ---------- Who we roof for (owner, November 4 2026) ----------
// The three kinds of property as cards, each with its own ask and its page, so a homeowner, an HOA board and a building owner each see where to
// start right after the statement. Photos and pages from data/serviceCategories.js; the commercial card never calls the survey free.
const AUDIENCE = [
  { key: 'home', label: 'Homes', ask: 'Book a free roof evaluation', link: 'Residential roofing', text: 'Shingle, tile and flat roofs, from one leak to a full tear-off. A roofer looks first, and the evaluation is free.' },
  { key: 'hoa', label: 'HOAs & multi-family', ask: 'Request an estimate', link: 'HOA & multi-family roofing', text: 'Condo and townhome communities and apartment buildings, with one point of contact and photo reports your board or manager can review.' },
  { key: 'commercial', label: 'Commercial buildings', ask: 'Request a roof survey', link: 'Commercial roofing', text: 'Offices, retail, churches and warehouses. A roofer surveys the roof, and the written scope is built around your building and your hours.' },
];
export function HomeAudience({ lang = 'en' }) {
  const T = (x) => th(lang, x);
  return (
    <section className="hg-section hg-bg-sky2-paper" id="who-we-roof-for" style={{ paddingTop: 24 }} aria-labelledby="hg-audience">
      <div className="container">
        <div className="hg-head">
          <h2 id="hg-audience">{T('Homes, communities and commercial buildings.')}</h2>
          <p>{T('Tell us what you own or manage. Every job starts the same way: a roofer looks first, and you get a written scope and price before any work.')}</p>
        </div>
        <div className="hg-aud">
          {AUDIENCE.map((a, i) => {
            const cat = SERVICE_CATEGORIES[i];
            return (
              <article className="hg-aud-card" key={a.key}>
                <div className="hg-aud-photo">
                  <Image src={cat.image} alt="" fill sizes="(min-width: 900px) 30vw, 100vw" quality={60} loading="lazy" />
                </div>
                <div className="hg-aud-body">
                  <h3>{T(a.label)}</h3>
                  <p>{T(a.text)}</p>
                  <div className="hg-aud-ctas">
                    <SiteLink className="btn btn-gold" href="#roof-check">{T(a.ask)}</SiteLink>
                    <SiteLink className="hg-arrow" href={cat.href}>{T(a.link)} <span aria-hidden="true">→</span></SiteLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------- Residential ----------
const RESIDENTIAL = [
  {
    tab: 'Shingle', color: '#1d5fae',
    title: 'Shingle roofs, from the deck up.',
    text: 'Our *TotalShield* Shingle System replaces every layer: the decking and underlayment, the flashings and vents, and the shingles and ridge.',
    points: ['Deck checked and photographed while it’s open', 'Step flashing, pipe boots and balanced attic ventilation', 'Architectural shingles in many colors'],
    href: '/residential-roofing/shingle-roofing/', link: 'Shingle roofing',
    image: '/images/shingle-roof-completed-drone-view.webp', imageAlt: 'A finished shingle roof seen from a drone',
  },
  {
    tab: 'Tile', color: '#c2703d',
    title: 'Tile roofs that keep their look.',
    text: 'The tiles usually outlast the underlayment beneath them. Our *SecondLife* Tile Reset keeps your sound tiles and renews what’s under them.',
    points: ['Broken and slipped tiles replaced with the closest match', 'New underlayment, with worn battens and flashings renewed', 'Clay and concrete tile roofs'],
    href: '/residential-roofing/tile-roofing/', link: 'Tile roofing',
    image: '/images/tile-lift-off-and-reset-drone-view.webp', imageAlt: 'A tile roof lifted and reset, seen from a drone',
  },
  {
    tab: 'Flat', color: '#062d57',
    title: 'Flat roofs planned around the water.',
    text: 'Our *FlatGuard* flat roofs start with a full tear-off down to the deck and are built around how the roof drains.',
    points: ['Full tear-off on every flat roof replacement', 'Every lap sealed, every curb and parapet flashed', 'White reflective cap sheets'],
    href: '/residential-roofing/flat-roofing/', link: 'Flat roofing',
    image: '/images/flat-roof-torch-down-drone-view-services.webp', imageAlt: 'A torch-down flat roof seen from a drone',
  },
  // Metal tab hidden for now (owner, November 2 2026)
  {
    tab: 'HOA & multi-family', color: '#6b2545',
    title: 'HOA and multi-family roofs.',
    text: 'Our *ReserveReady* program gives boards and managers roof inspections, clear scopes and planning support across every building.',
    points: ['One point of contact for the project', 'Photo reports boards can follow', 'Work planned around residents'],
    href: '/residential-roofing/hoa-multi-family/', link: 'HOA & multi-family roofing',
    image: '/images/shingle-roof-care-multi-family.webp', imageAlt: 'Shingle roofs on a multi-family building',
  },
];

const trTab = (lang, t) => ({ ...t, tab: th(lang, t.tab), title: th(lang, t.title), text: th(lang, t.text), points: t.points.map((p) => th(lang, p)), link: th(lang, t.link), imageAlt: th(lang, t.imageAlt) });

export function HomeResidential({ lang = 'en' }) {
  const T = (x) => th(lang, x);
  return (
    <section className="hg-section hg-bg-white" id="residential" aria-labelledby="hg-residential">
      <div className="container">
        <div className="hg-head">
          <h2 id="hg-residential">{T('Every kind of home roof.')}</h2>
          <p>{T('Pick your roof. Every job starts the same way: a roofer looks first, and you get the scope and price in writing.')}</p>
        </div>
        <HomeTabs items={RESIDENTIAL.map((t) => trTab(lang, t))} label={T('Roof types')} />
      </div>
    </section>
  );
}

// ---------- Commercial ----------
export function HomeCommercial({ lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  return (
    <section className="hg-section hg-bg-white-sky" id="commercial" style={{ paddingTop: 0 }} aria-labelledby="hg-commercial">
      <div className="container">
        <div className="hg-sys">
          <div className="hg-head">
            <h2 id="hg-commercial">{T('One roofer for the buildings you run.')}</h2>
            <p>{T('Offices, retail, warehouses, churches and shopping centers. A roofer surveys the roof, you get photos and a written scope, and the work is planned around your hours.')}</p>
            <ul className="hg-badges">
              <li>{T('Roofer-led roof surveys')}</li>
              <li>{T('Written scope and price')}</li>
              <li>{T('Work planned around your hours')}</li>
              <li>{T('TPO and modified bitumen')}</li>
              <li>{T('Closeout photos')}</li>
            </ul>
          </div>
          <div className="hg-stats">
            <div className="hg-stat"><b>{GOOGLE_REVIEWS.count}</b><span>{T('Google reviews from the people we roof for')}</span></div>
            <div className="hg-stat"><b>2020</b><span>{T('Licensed California contractor since, CSLB #{license}', { license: BUSINESS.license })}</span></div>
            <div className="hg-stat"><b>12</b><span>{T('Crews across Southern California')}</span></div>
            <div className="hg-stat"><b>4</b><span>{T('Counties: Los Angeles, Orange, Riverside and San Bernardino')}</span></div>
          </div>
          <div className="hg-sys-ctas">
            <SiteLink className="btn btn-gold" href="/commercial-roofing/">
              {T('Commercial roofing')} <span className="arrow">→</span>
            </SiteLink>
            <SiteLink className="btn btn-line" href="/commercial-roofing/property-managers/">{T('For property managers')}</SiteLink>
          </div>
          <p className="hg-sys-note">
            {T('See a')} <SiteLink href="/projects/commercial-flat-roof-replacement-westminster-92683/">{T('commercial flat roof replacement in Westminster')}</SiteLink>.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- Roof repair ----------
export function HomeRepair({ lang = 'en' }) {
  const T = (x) => th(lang, x);
  return (
    <section className="hg-section hg-bg-white" id="roof-repair" style={{ paddingTop: 0 }} aria-labelledby="hg-repair">
      <div className="container">
        <div className="hg-row-head">
          <h2 id="hg-repair">{T('Fix the leak where it starts.')}</h2>
          <SiteLink className="hg-arrow" href="/blog/roof-leak-source/">{T('How we find a leak')} <span aria-hidden="true">→</span></SiteLink>
        </div>
        <div className="hg-tiles">
          <div className="hg-tile">
            <span className="hg-ico" style={{ background: 'var(--hg-blue)' }}><IconRoof /></span>
            <div>
              <p><strong>{T('Shingle roof repair:')}</strong> {T('lifted shingles, failed flashing and cracked pipe boots, fixed with the closest match.')}</p>
              <SiteLink className="hg-arrow" href="/residential-roofing/shingle-roofing/repair/">{T('Shingle repair')} <span aria-hidden="true">→</span></SiteLink>
            </div>
          </div>
          <div className="hg-tile">
            <span className="hg-ico" style={{ background: '#c2703d' }}><IconTile /></span>
            <div>
              <p><strong>{T('Tile roof repair:')}</strong> {T('broken and slipped tiles replaced, with the underlayment and flashing around them checked.')}</p>
              <SiteLink className="hg-arrow" href="/residential-roofing/tile-roofing/repair/">{T('Tile repair')} <span aria-hidden="true">→</span></SiteLink>
            </div>
          </div>
          <div className="hg-tile">
            <span className="hg-ico" style={{ background: 'var(--hg-navy)' }}><IconFlat /></span>
            <div>
              <p><strong>{T('Flat roof repair:')}</strong> {T('splits, open laps and failed curb flashing, sealed at the source.')}</p>
              <SiteLink className="hg-arrow" href="/residential-roofing/flat-roofing/repair/">{T('Flat roof repair')} <span aria-hidden="true">→</span></SiteLink>
            </div>
          </div>
          <div className="hg-tile hg-tile-em">
            <span className="hg-ico" style={{ background: 'rgba(255,255,255,.18)' }}><IconDrop /></span>
            <div>
              <h3>{T('Water coming in now?')}</h3>
              <p>{T('Call us. We can tarp the area to stop more damage, then find the source.')}</p>
              <a className="hg-phone" href={TEL}>{PHONE}</a>
              <div><SiteLink className="hg-arrow" href="/roof-repair/emergency/">{T('Emergency roof repair')} <span aria-hidden="true">→</span></SiteLink></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Replacement ----------
export function HomeReplacement({ children, lang = 'en' }) {
  const T = (x) => th(lang, x);
  return (
    <section className="hg-section hg-bg-white-sky" id="replacement" style={{ paddingTop: 0 }} aria-labelledby="hg-replacement">
      <div className="container">
        <div className="hg-row-head">
          <h2 id="hg-replacement">{T('Replace it only when it’s worn out.')}</h2>
          <SiteLink className="hg-arrow" href="/blog/roof-replacement-guide/">{T('Read the roof replacement guide')} <span aria-hidden="true">→</span></SiteLink>
        </div>
        <div className="hg-segs">
          <article className="hg-seg">
            <div className="hg-seg-art hg-sa1" aria-hidden="true"><span className="glass" style={{ left: 30, top: 30, width: 120, height: 80 }} /><IconTile /></div>
            <div className="hg-seg-body">
              <h3>{T('Sound tiles, worn underlayment')}</h3>
              <p>{T('A tile lift and relay keeps your tiles and replaces what’s under them, for less than a new tile roof.')}</p>
              <SiteLink className="hg-arrow" href="/residential-roofing/tile-roofing/lift-and-relay/">{T('Keep your tiles')} <span aria-hidden="true">→</span></SiteLink>
            </div>
          </article>
          <article className="hg-seg">
            <div className="hg-seg-art hg-sa2" aria-hidden="true"><span className="glass" style={{ right: 26, top: 34, width: 110, height: 110 }} /><IconRoof /></div>
            <div className="hg-seg-body">
              <h3>{T('Worn out, roof-wide')}</h3>
              <p>{T('A full replacement from the deck up: typically 3 to 5 days on a home, with the permits pulled and the site swept every day.')}</p>
              <SiteLink className="hg-arrow" href="/roof-replacement/">{T('Plan a replacement')} <span aria-hidden="true">→</span></SiteLink>
            </div>
          </article>
          <article className="hg-seg">
            <div className="hg-seg-art hg-sa3" aria-hidden="true"><span className="glass" style={{ left: 40, bottom: 26, width: 150, height: 70 }} /><IconDoc /></div>
            <div className="hg-seg-body">
              <h3>{T('Paying for it')}</h3>
              <p>{T('Financing on home roof replacements, and a guide to every way to pay for a new roof.')}</p>
              <SiteLink className="hg-arrow" href="/roof-financing/">{T('See financing')} <span aria-hidden="true">→</span></SiteLink>
            </div>
          </article>
        </div>
        {children}
      </div>
    </section>
  );
}

// ---------- Service areas ----------
const COUNTY_NOTES = {
  'la-county': 'Our three offices',
  'orange-county': 'From the beach cities inland',
  'riverside-county': 'The Inland Empire',
  'san-bernardino-county': 'The Inland Empire',
};

export function HomeAreas({ lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  return (
    <section className="hg-section hg-bg-sky-up" id="service-areas" aria-labelledby="hg-areas">
      <div className="container">
        <div className="hg-head">
          <h2 id="hg-areas">{T('Roofers near you, across four counties.')}</h2>
          <p>{T('Offices in {offices}, and crews from the coast to the Inland Empire.', { offices: officeList(lang) })}</p>
        </div>
        <div className="hg-plans hg-four">
          {REGIONS.map((r, n) => {
            const cities = LOCATIONS.filter((l) => l.region === r.slug);
            const others = placesIn(r.slug).slice(0, Math.max(0, 6 - cities.length));
            return (
              <div className={'hg-plan' + (n === 0 ? ' feat' : '')} key={r.slug}>
                {n === 0 && <span className="hg-tag">{T('Offices')}</span>}
                <small className="hg-k2">{T(COUNTY_NOTES[r.slug])}</small>
                <h3>{T(r.name)}</h3>
                <p className="hg-big">{cities.length + placesIn(r.slug).length}<span>{T('places we serve')}</span></p>
                <ul>
                  {cities.slice(0, 6).map((c) => (
                    <li key={c.slug}><SiteLink href={cityPath(c.slug)}>{c.city}</SiteLink></li>
                  ))}
                  {others.map((p) => (
                    <li key={p.city}>{p.city}</li>
                  ))}
                </ul>
                <SiteLink className={'btn ' + (n === 0 ? 'btn-gold' : 'btn-line')} href={regionPath(r.slug)}>
                  {T('Roofing in {area}', { area: T(r.short) })}
                </SiteLink>
              </div>
            );
          })}
        </div>
        <p className="hg-fine">
          {T('Not sure we cover you?')} <SiteLink className="hg-arrow" href="/service-areas/">{T('Check every service area')} <span aria-hidden="true">→</span></SiteLink>
        </p>
      </div>
    </section>
  );
}

// ---------- Projects ----------
export function HomeProjects({ lang = 'en' }) {
  const T = (x) => th(lang, x);
  const projects = LATEST_PROJECTS.slice(0, 3);
  return (
    <section className="hg-section hg-bg-sky" id="projects" aria-labelledby="hg-projects">
      <div className="container">
        <div className="hg-row-head">
          <h2 id="hg-projects">{T('Real roofs, finished.')}</h2>
          <SiteLink className="hg-arrow" href="/projects/">{T('See every project')} <span aria-hidden="true">→</span></SiteLink>
        </div>
        <div className="hg-posts">
          {projects.map((p) => (
            <SiteLink className="hg-postcard" href={p.path} key={p.path}>
              <div className="hg-postart">
                <Image src={p.image} alt={p.imageAlt || p.title} fill sizes="(min-width: 901px) 40vw, 100vw" quality={60} loading="lazy" />
              </div>
              <div className="hg-postbody">
                <small>{p.place}</small>
                <h3>{T(p.title)}</h3>
                <p>{T(p.description)}</p>
                <span className="hg-arrow">{T('View the project')} <span aria-hidden="true">→</span></span>
              </div>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Reviews ----------
const QUOTES = [
  { name: 'Noam Nahori', stat: `${GOOGLE_REVIEWS.count}`, statText: 'Google reviews from the people we roof for', statClass: 'hg-qs1' },
  { name: 'Emilee Crowley', stat: '3–5 days', statText: 'for a typical home roof replacement', statClass: 'hg-qs2' },
  { name: 'Liron Yosef', stat: '10-year', statText: 'workmanship warranty on installs (call for details)', statClass: 'hg-qs3' },
  { name: 'Cynthia Pina', stat: '12', statText: 'crews across Los Angeles, Orange County and the Inland Empire', statClass: 'hg-qs4' },
];

export function HomeReviews({ lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  // On the Spanish page the reviews are shown translated (ES_HOME_REVIEWS), labelled "traducida del inglés"
  const original = (q) => (REVIEW_LIST.find((r) => r.name === q.name)?.text || '').replace(/\s*\n\s*/g, ' ');
  const slides = QUOTES.map((q) => ({ ...q, stat: T(q.stat), statText: T(q.statText), text: (lang === 'es' && original(q) && ES_HOME_REVIEWS[q.name]) || original(q) })).filter((q) => q.text);
  const labels = { review: T(lang === 'es' ? 'Google review · translated from English' : 'Google review'), stars: T('5 out of 5 stars'), prev: T('Previous review'), next: T('Next review'), of: T('Review {n} of {total}') };
  return (
    <section className="hg-section hg-bg-sky-up" id="reviews" style={{ paddingTop: 0 }} aria-labelledby="hg-reviews">
      <div className="container">
        <div className="hg-row-head">
          <h2 id="hg-reviews">{T('Homes across Los Angeles, roofed right.')}</h2>
          <SiteLink className="hg-arrow" href="/reviews/">{T('Read more reviews')} <span aria-hidden="true">→</span></SiteLink>
        </div>
        <HomeQuotes slides={slides} labels={labels} />
      </div>
    </section>
  );
}

// ---------- Credentials (owner, November 4 2026) ----------
// "On the record": the license, insurance, manufacturer certifications and BBB accreditation as four facts anyone can check, then the badge
// row (the five manufacturer logos from the Credentials page and the BBB seal). Only what /credentials/ already states.
export function HomeCredentials({ lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  const badges = CREDENTIALS_PUBLIC ? CREDENTIALS_PAGE.manufacturers.items.filter((m) => m.logo) : [];
  const facts = [
    { big: `#${BUSINESS.license}`, text: T('CSLB license, a licensed California contractor since 2020') },
    { big: T('Bonded'), text: T('Licensed, bonded and insured on every job') },
    { big: '5', text: T('Manufacturer certifications: Owens Corning, IKO, GAF, CertainTeed Master Craftsman and Polyglass Premio Pro') },
    { big: BBB.rating, text: T('BBB rating, an Accredited Business since October 2026') },
  ];
  return (
    <section className="hg-section hg-bg-sky" id="credentials" style={{ paddingTop: 0 }} aria-labelledby="hg-creds">
      <div className="container">
        <div className="hg-head">
          <h2 id="hg-creds">{T('Licensed, certified and on the record.')}</h2>
          <p>{T('You shouldn’t have to take a roofer’s word for it. Every one of these can be checked.')}</p>
        </div>
        <div className="hg-creds">
          {facts.map((f) => (
            <div className="hg-cred" key={f.big}><b>{f.big}</b><span>{f.text}</span></div>
          ))}
        </div>
        {badges.length > 0 && (
          <ul className="hg-cred-logos" aria-label={T('Manufacturer certifications and BBB accreditation')}>
            {badges.map((m) => (
              <li key={m.id}><Image src={m.logo} alt={`${m.name}${m.program ? ` ${m.program}` : ''}`} width={m.width} height={m.height} sizes="140px" loading="lazy" /></li>
            ))}
            <li className="hg-cred-bbb"><BbbBadge width={170} /></li>
          </ul>
        )}
        <div className="hg-cred-ctas">
          <SiteLink className="btn btn-line" href="/credentials/">{T('See our credentials')}</SiteLink>
          <a className="hg-arrow" href={CREDENTIALS_PAGE.license.verify.href} target="_blank" rel="noopener noreferrer">{T('Verify our license with the CSLB')} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}

// ---------- Giving back (owner, November 4 2026; the About page's own sentence) ----------
export function HomeGiving({ lang = 'en' }) {
  const T = (x) => th(lang, x);
  return (
    <section className="hg-section hg-bg-peri" style={{ paddingTop: 0 }} aria-labelledby="hg-giving">
      <div className="container">
        <div className="hg-giving">
          <span className="hg-ico" style={{ background: 'var(--plum)' }} aria-hidden="true"><IconHome /></span>
          <div>
            <h2 id="hg-giving">{T('Roofs for the neighborhoods we work in.')}</h2>
            <p>{T('Giving back is part of how we operate: we’ve donated a full roof to a local church and contribute roofing work to senior living communities and elderly assistance programs in the neighborhoods we serve.')}</p>
            <SiteLink className="hg-arrow" href="/about-us/">{T('About QRS')} <span aria-hidden="true">→</span></SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- The evaluation and the two offers after it ----------
export function HomeOffers({ lang = 'en' }) {
  const T = (x) => th(lang, x);
  return (
    <section className="hg-section hg-bg-sky" id="offers" aria-labelledby="hg-offers">
      <div className="container">
        <div className="hg-head">
          <h2 id="hg-offers">{T('Know what your roof needs before you spend a dollar.')}</h2>
          <p>{T('Start with a free roof evaluation. A roofer tells you what’s worth fixing, and you decide what to hire us for.')}</p>
        </div>
        <div className="hg-plans hg-three">
          <div className="hg-plan feat">
            <span className="hg-tag">{T('Start here')}</span>
            <small className="hg-k2">{T('Roof evaluation')}</small>
            <h3>{T('Just look')}</h3>
            <p className="hg-big">{T('Free')}<span>{T('no obligation')}</span></p>
            <ul>
              <li>{T('A trained in-house roofer on your roof')}</li>
              <li>{T('Drone footage of the areas of concern')}</li>
              <li>{T('Photos and plain-English findings')}</li>
              <li>{T('A written scope and price before any work')}</li>
            </ul>
            <SiteLink className="btn btn-gold" href="#roof-check">{T('Book my free evaluation')}</SiteLink>
          </div>
          <div className="hg-plan">
            <small className="hg-k2">{T('Roof Check')}</small>
            <h3>{T('Seal and tune up')}</h3>
            <p className="hg-big">$199<span>{T('one visit')}</span></p>
            <ul>
              <li>{T('Only if you want it, after the evaluation')}</li>
              <li>{T('Vents, pipes and flashings sealed')}</li>
              <li>{T('Credited toward a replacement if you move forward')}</li>
              <li>{T('Pay after the visit, no deposit')}</li>
            </ul>
            <SiteLink className="btn btn-line" href="#roof-check">{T('Ask about a Roof Check')}</SiteLink>
          </div>
          <div className="hg-plan">
            <small className="hg-k2"><Rich text="*RoofCare Plan*" /></small>
            <h3>{T('Keep it up')}</h3>
            <p className="hg-big">{T('Seasonal')}<span>{T('visits')}</span></p>
            <ul>
              <li>{T('Scheduled seasonal visits')}</li>
              <li>{T('A photo report every time')}</li>
              <li>{T('Small problems caught before they leak')}</li>
            </ul>
            <SiteLink className="btn btn-line" href="/roof-maintenance-plans/">{T('See maintenance plans')}</SiteLink>
          </div>
        </div>
        <p className="hg-fine">{T('Repairs and replacements are priced in writing after the evaluation. Financing is available on home roof replacements.')}</p>
      </div>
    </section>
  );
}

// ---------- Guides ----------
const GUIDES = [
  { href: '/blog/roof-replacement-guide/', label: 'Roof replacement', title: 'The Roof Replacement Guide: From First Inspection to Final Walkthrough', text: 'Repair or replace, comparing bids line by line, permits, tear-off day, timelines and warranties.', image: '/images/blog/roof-replacement-guide.webp' },
  { href: '/blog/asphalt-shingle-roof-guide/', label: 'Shingle roofs', title: 'Asphalt Shingle Roofs: The Complete SoCal Guide', text: 'How sun and heat age shingles, why the attic matters and what a roof built from the deck up includes.', image: '/images/blog/asphalt-shingle-roof-guide.webp' },
  { href: '/blog/tile-roof-guide-southern-california/', label: 'Tile roofs', title: 'Tile Roof Guide for Southern California Homeowners', text: 'Why the underlayment wears out before the tiles, and what to do about it.', image: '/images/blog/tile-roof-guide-southern-california.webp' },
];

export function HomeGuides({ lang = 'en' }) {
  const T = (x) => th(lang, x);
  return (
    <section className="hg-section hg-bg-sky-peri" aria-labelledby="hg-guides">
      <div className="container">
        <div className="hg-row-head">
          <h2 id="hg-guides">{T('Learn how Southern California roofs work.')}</h2>
          <SiteLink className="hg-arrow" href="/blog/">{T('See all guides')} <span aria-hidden="true">→</span></SiteLink>
        </div>
        <div className="hg-posts">
          {GUIDES.map((g) => (
            <SiteLink className="hg-postcard" href={g.href} key={g.href}>
              <div className="hg-postart">
                <Image src={g.image} alt="" fill sizes="(min-width: 901px) 40vw, 100vw" quality={60} loading="lazy" />
              </div>
              <div className="hg-postbody">
                <small>{T(g.label)}{lang !== 'en' && <> · {T('Articles in English')}</>}</small>
                <h3>{T(g.title)}</h3>
                <p>{T(g.text)}</p>
                <span className="hg-arrow">{T('Read more')} <span aria-hidden="true">→</span></span>
              </div>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
export function HomeFaq({ faqs, lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  return (
    <section className="hg-section hg-bg-peri-cream" id="faq" aria-labelledby="hg-faq">
      <div className="container">
        <div className="hg-head">
          <h2 id="hg-faq">
            {T('Questions, answered.')} <span className="hg-grad">{T('Still curious? Call {phone}.', { phone: PHONE })}</span>
          </h2>
        </div>
        <div className="hg-faq">
          {faqs.map((f, n) => (
            <details key={f.q} open={n === 0}>
              <summary>
                <Rich text={f.q} />
              </summary>
              <div className="hg-faq-a">
                <Rich text={f.a} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
