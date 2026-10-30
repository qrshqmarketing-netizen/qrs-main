import Image from 'next/image';
import Rich from '@/components/ui/Rich';
import Mark from '@/components/ui/Mark';
import SiteLink from '@/components/ui/SiteLink';
import HeroVideo from '@/components/widgets/HeroVideo';
import QrsMarkSvg from '@/components/ui/QrsMarkSvg';
import { LATEST_PROJECTS } from '@/data/projectPages';
import { GOOGLE_REVIEWS as REVIEW_LIST } from '@/data/reviews';
import { LOCATIONS, REGIONS, cityPath, placesIn, regionPath } from '@/data/locations';
import { BUSINESS, GOOGLE_REVIEWS, OFFICES, PHONE, TEL } from '@/data/site';
import HomeTabs from './HomeTabs';
import HomeQuotes from './HomeQuotes';
import WordmarkScript from './WordmarkScript';
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
const officeList = `${offices.slice(0, -1).join(', ')} and ${offices[offices.length - 1]}`;

// ---------- Hero ----------
export function HomeHero({ h1, heading, text, cta, video, poster }) {
  return (
    <section className="hg-hero" aria-label="Quality Roofing Specialists">
      <p className="hg-wordmark" aria-hidden="true">
        <QrsMarkSvg className="hg-wm-mark" parts />
        <span className="hg-wm-word">
          {'QUALITY'.split('').map((ch, i) => (
            <span data-wm={i + 3} key={i}>
              {ch}
            </span>
          ))}
        </span>
      </p>
      <WordmarkScript />
      <div className="container">
        <div className="hg-hero-copy">
          <span className="hg-pill"><b>FREE</b> Drone roof evaluation, with a written price before any work</span>
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
              Call {PHONE}
            </a>
          </div>
          <p className="hg-note">No pressure, no mystery scope and no surprises.</p>
        </div>
        <div className="hg-stage">
          <div className="hg-frame">
            <div className="hg-frame-bar" aria-hidden="true">
              <span className="hg-dot" /><span className="hg-dot" /><span className="hg-dot" />
              <span className="hg-url">RoofScan 360 · drone view of a QRS job</span>
            </div>
            <div className="hg-media">
              <Image src={poster} alt="Drone view of a roof replacement by Quality Roofing Specialists" fill sizes="(min-width: 1240px) 1180px, 100vw" quality={70} preload fetchPriority="high" />
              <HeroVideo sources={video} />
            </div>
          </div>
          <div className="hg-float hg-f1">
            <span className="hg-ico" style={{ background: 'var(--plum)' }}><IconStar /></span>
            <span><strong>{GOOGLE_REVIEWS.count} Google reviews</strong><small>From homeowners and clients</small></span>
          </div>
          <div className="hg-float hg-f2">
            <span className="hg-ico" style={{ background: 'var(--hg-blue)' }}><IconDoc /></span>
            <span><strong>Written price first</strong><small>Before any work starts</small></span>
          </div>
          <div className="hg-float hg-f3">
            <span className="hg-ico" style={{ background: 'var(--hg-navy)' }}><IconShield /></span>
            <span><strong>10-year workmanship warranty</strong><small>On installs, call for details</small></span>
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
function RoofScanArt() {
  return (
    <>
      <span className="hg-rec" title="Recording drone footage"><i />REC</span>
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

export function HomeCores() {
  return (
    <section className="hg-section hg-bg-sky" style={{ paddingTop: 24 }} aria-label="How QRS works">
      <CoresMotion />
      <div className="container hg-cores">
        <article className="hg-core">
          <div className="hg-core-art hg-art-1" aria-hidden="true"><RoofScanArt /></div>
          <div className="hg-core-body">
            <h3>A roofer looks first</h3>
            <p>A trained in-house roofer inspects your roof, with drone footage of the areas of concern, before anyone talks price.</p>
          </div>
        </article>
        <article className="hg-core">
          <div className="hg-core-art hg-art-2" aria-hidden="true"><span className="hg-pin p1" /><span className="hg-pin p2" /><span className="hg-pin p3" /><span className="hg-ring" /></div>
          <div className="hg-core-body">
            <h3>Local, family-owned</h3>
            <p>Offices in {officeList}, and 12 crews from the coast to the Inland Empire. We speak English, Spanish and Tagalog.</p>
          </div>
        </article>
        <article className="hg-core">
          <div className="hg-core-art hg-art-3" aria-hidden="true"><span className="hg-roofs"><i /><i /><i /><i /></span></div>
          <div className="hg-core-body">
            <h3>Every kind of roof</h3>
            <p>Shingle, tile, flat and metal roofs on homes, plus HOA, multi-family and commercial buildings.</p>
          </div>
        </article>
        <article className="hg-core">
          <div className="hg-core-art hg-art-4" aria-hidden="true">
            <span className="hg-chat q">What will it cost?</span>
            <span className="hg-typing"><i /><i /><i /></span>
            <span className="hg-chat a"><b>Here’s your written scope and price,</b> before any work.</span>
          </div>
          <div className="hg-core-body">
            <h3>Everything in writing</h3>
            <p>Photos of what we found, a written scope and price before any work, and a 10-year workmanship warranty on installs (call for details).</p>
          </div>
        </article>
      </div>
    </section>
  );
}

// ---------- Statement ----------
export function HomeStatement() {
  return (
    <section className="hg-statement" aria-label="Statement">
      <span className="hg-orbit hg-o1" aria-hidden="true"><IconDrone /></span>
      <span className="hg-orbit hg-o2" aria-hidden="true"><IconRoof /></span>
      <span className="hg-orbit hg-o3" aria-hidden="true"><IconShield /></span>
      <span className="hg-orbit hg-o4" aria-hidden="true"><IconDoc /></span>
      <div className="container">
        <h2>
          A roof is only as good as <span className="hg-grad">the parts you never see.</span>
        </h2>
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
  {
    tab: 'Metal', color: '#5a6b82',
    title: 'Standing seam metal roofs.',
    text: 'Standing seam metal roofs installed and repaired, with panels, fasteners and flashings matched to the roof.',
    points: ['Standing seam installation', 'Metal roof and metal roof leak repair', 'Noncombustible metal panels'],
    href: '/residential-roofing/metal-roofing/', link: 'Metal roofing',
    image: '/images/metal-roof-standing-seam-modern-home.webp', imageAlt: 'A modern home with a dark standing seam metal roof',
  },
  {
    tab: 'HOA & multi-family', color: '#6b2545',
    title: 'HOA and multi-family roofs.',
    text: 'Our *ReserveReady* program gives boards and managers roof inspections, clear scopes and planning support across every building.',
    points: ['One point of contact for the project', 'Photo reports boards can follow', 'Work planned around residents'],
    href: '/residential-roofing/hoa-multi-family/', link: 'HOA & multi-family roofing',
    image: '/images/shingle-roof-care-multi-family.webp', imageAlt: 'Shingle roofs on a multi-family building',
  },
];

export function HomeResidential() {
  return (
    <section className="hg-section hg-bg-white" id="residential" aria-labelledby="hg-residential">
      <div className="container">
        <div className="hg-head">
          <h2 id="hg-residential">Every kind of home roof.</h2>
          <p>Pick your roof. Every job starts the same way: a roofer looks first, and you get the scope and price in writing.</p>
        </div>
        <HomeTabs items={RESIDENTIAL} />
      </div>
    </section>
  );
}

// ---------- Commercial ----------
export function HomeCommercial() {
  return (
    <section className="hg-section hg-bg-white" id="commercial" style={{ paddingTop: 0 }} aria-labelledby="hg-commercial">
      <div className="container">
        <div className="hg-sys">
          <div className="hg-head">
            <h2 id="hg-commercial">One roofer for the buildings you run.</h2>
            <p>Offices, retail, warehouses, churches and shopping centers. A roofer surveys the roof, you get photos and a written scope, and the work is planned around your hours.</p>
            <ul className="hg-badges">
              <li>Roofer-led roof surveys</li>
              <li>Written scope and price</li>
              <li>Work planned around your hours</li>
              <li>TPO and modified bitumen</li>
              <li>Closeout photos</li>
            </ul>
          </div>
          <div className="hg-stats">
            <div className="hg-stat"><b>{GOOGLE_REVIEWS.count}</b><span>Google reviews from the people we roof for</span></div>
            <div className="hg-stat"><b>2020</b><span>Licensed California contractor since, CSLB #{BUSINESS.license}</span></div>
            <div className="hg-stat"><b>12</b><span>Crews across Southern California</span></div>
            <div className="hg-stat"><b>4</b><span>Counties: Los Angeles, Orange, Riverside and San Bernardino</span></div>
          </div>
          <div className="hg-sys-ctas">
            <SiteLink className="btn btn-gold" href="/commercial-roofing/">
              Commercial roofing <span className="arrow">→</span>
            </SiteLink>
            <SiteLink className="btn btn-line" href="/commercial-roofing/property-managers/">For property managers</SiteLink>
          </div>
          <p className="hg-sys-note">
            See a <SiteLink href="/projects/commercial-flat-roof-replacement-westminster-92683/">commercial flat roof replacement in Westminster</SiteLink>.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- Roof repair ----------
export function HomeRepair() {
  return (
    <section className="hg-section hg-bg-white" id="roof-repair" style={{ paddingTop: 0 }} aria-labelledby="hg-repair">
      <div className="container">
        <div className="hg-row-head">
          <h2 id="hg-repair">Fix the leak where it starts.</h2>
          <SiteLink className="hg-arrow" href="/blog/roof-leak-source/">How we find a leak <span aria-hidden="true">→</span></SiteLink>
        </div>
        <div className="hg-tiles">
          <div className="hg-tile">
            <span className="hg-ico" style={{ background: 'var(--hg-blue)' }}><IconRoof /></span>
            <div>
              <p><strong>Shingle roof repair:</strong> lifted shingles, failed flashing and cracked pipe boots, fixed with the closest match.</p>
              <SiteLink className="hg-arrow" href="/residential-roofing/shingle-roofing/repair/">Shingle repair <span aria-hidden="true">→</span></SiteLink>
            </div>
          </div>
          <div className="hg-tile">
            <span className="hg-ico" style={{ background: '#c2703d' }}><IconTile /></span>
            <div>
              <p><strong>Tile roof repair:</strong> broken and slipped tiles replaced, with the underlayment and flashing around them checked.</p>
              <SiteLink className="hg-arrow" href="/residential-roofing/tile-roofing/repair/">Tile repair <span aria-hidden="true">→</span></SiteLink>
            </div>
          </div>
          <div className="hg-tile">
            <span className="hg-ico" style={{ background: 'var(--hg-navy)' }}><IconFlat /></span>
            <div>
              <p><strong>Flat roof repair:</strong> splits, open laps and failed curb flashing, sealed at the source.</p>
              <SiteLink className="hg-arrow" href="/residential-roofing/flat-roofing/repair/">Flat roof repair <span aria-hidden="true">→</span></SiteLink>
            </div>
          </div>
          <div className="hg-tile hg-tile-em">
            <span className="hg-ico" style={{ background: 'rgba(255,255,255,.18)' }}><IconDrop /></span>
            <div>
              <h3>Water coming in now?</h3>
              <p>Call us. We can tarp the area to stop more damage, then find the source.</p>
              <a className="hg-phone" href={TEL}>{PHONE}</a>
              <div><SiteLink className="hg-arrow" href="/roof-repair/emergency/">Emergency roof repair <span aria-hidden="true">→</span></SiteLink></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Replacement ----------
export function HomeReplacement({ children }) {
  return (
    <section className="hg-section hg-bg-white-sky" id="replacement" style={{ paddingTop: 0 }} aria-labelledby="hg-replacement">
      <div className="container">
        <div className="hg-row-head">
          <h2 id="hg-replacement">Replace it only when it’s worn out.</h2>
          <SiteLink className="hg-arrow" href="/blog/roof-replacement-guide/">Read the roof replacement guide <span aria-hidden="true">→</span></SiteLink>
        </div>
        <div className="hg-segs">
          <article className="hg-seg">
            <div className="hg-seg-art hg-sa1" aria-hidden="true"><span className="glass" style={{ left: 30, top: 30, width: 120, height: 80 }} /><IconTile /></div>
            <div className="hg-seg-body">
              <h3>Sound tiles, worn underlayment</h3>
              <p>A tile lift and relay keeps your tiles and replaces what’s under them, for less than a new tile roof.</p>
              <SiteLink className="hg-arrow" href="/residential-roofing/tile-roofing/lift-and-relay/">Keep your tiles <span aria-hidden="true">→</span></SiteLink>
            </div>
          </article>
          <article className="hg-seg">
            <div className="hg-seg-art hg-sa2" aria-hidden="true"><span className="glass" style={{ right: 26, top: 34, width: 110, height: 110 }} /><IconRoof /></div>
            <div className="hg-seg-body">
              <h3>Worn out, roof-wide</h3>
              <p>A full replacement from the deck up: typically 3 to 5 days on a home, with the permits pulled and the site swept every day.</p>
              <SiteLink className="hg-arrow" href="/roof-replacement/">Plan a replacement <span aria-hidden="true">→</span></SiteLink>
            </div>
          </article>
          <article className="hg-seg">
            <div className="hg-seg-art hg-sa3" aria-hidden="true"><span className="glass" style={{ left: 40, bottom: 26, width: 150, height: 70 }} /><IconDoc /></div>
            <div className="hg-seg-body">
              <h3>Paying for it</h3>
              <p>Financing on home roof replacements, and a guide to every way to pay for a new roof.</p>
              <SiteLink className="hg-arrow" href="/roof-financing/">See financing <span aria-hidden="true">→</span></SiteLink>
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

export function HomeAreas() {
  return (
    <section className="hg-section hg-bg-sky-up" id="service-areas" aria-labelledby="hg-areas">
      <div className="container">
        <div className="hg-head">
          <h2 id="hg-areas">Roofers near you, across four counties.</h2>
          <p>Offices in {officeList}, and crews from the coast to the Inland Empire.</p>
        </div>
        <div className="hg-plans hg-four">
          {REGIONS.map((r, n) => {
            const cities = LOCATIONS.filter((l) => l.region === r.slug);
            const others = placesIn(r.slug).slice(0, Math.max(0, 6 - cities.length));
            return (
              <div className={'hg-plan' + (n === 0 ? ' feat' : '')} key={r.slug}>
                {n === 0 && <span className="hg-tag">Offices</span>}
                <small className="hg-k2">{COUNTY_NOTES[r.slug]}</small>
                <h3>{r.name}</h3>
                <p className="hg-big">{cities.length + placesIn(r.slug).length}<span>places we serve</span></p>
                <ul>
                  {cities.slice(0, 6).map((c) => (
                    <li key={c.slug}><SiteLink href={cityPath(c.slug)}>{c.city}</SiteLink></li>
                  ))}
                  {others.map((p) => (
                    <li key={p.city}>{p.city}</li>
                  ))}
                </ul>
                <SiteLink className={'btn ' + (n === 0 ? 'btn-gold' : 'btn-line')} href={regionPath(r.slug)}>
                  Roofing in {r.short}
                </SiteLink>
              </div>
            );
          })}
        </div>
        <p className="hg-fine">
          Not sure we cover you? <SiteLink className="hg-arrow" href="/service-areas/">Check every service area <span aria-hidden="true">→</span></SiteLink>
        </p>
      </div>
    </section>
  );
}

// ---------- Projects ----------
export function HomeProjects() {
  const projects = LATEST_PROJECTS.slice(0, 3);
  return (
    <section className="hg-section hg-bg-sky" id="projects" aria-labelledby="hg-projects">
      <div className="container">
        <div className="hg-row-head">
          <h2 id="hg-projects">Real roofs, finished.</h2>
          <SiteLink className="hg-arrow" href="/projects/">See every project <span aria-hidden="true">→</span></SiteLink>
        </div>
        <div className="hg-posts">
          {projects.map((p) => (
            <SiteLink className="hg-postcard" href={p.path} key={p.path}>
              <div className="hg-postart">
                <Image src={p.image} alt={p.imageAlt || p.title} fill sizes="(min-width: 901px) 40vw, 100vw" quality={60} loading="lazy" />
              </div>
              <div className="hg-postbody">
                <small>{p.place}</small>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="hg-arrow">View the project <span aria-hidden="true">→</span></span>
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

export function HomeReviews() {
  const slides = QUOTES.map((q) => ({ ...q, text: (REVIEW_LIST.find((r) => r.name === q.name)?.text || '').replace(/\s*\n\s*/g, ' ') })).filter((q) => q.text);
  return (
    <section className="hg-section hg-bg-sky-up" id="reviews" style={{ paddingTop: 0 }} aria-labelledby="hg-reviews">
      <div className="container">
        <div className="hg-row-head">
          <h2 id="hg-reviews">Homes across Los Angeles, roofed right.</h2>
          <SiteLink className="hg-arrow" href="/reviews/">Read more reviews <span aria-hidden="true">→</span></SiteLink>
        </div>
        <HomeQuotes slides={slides} />
      </div>
    </section>
  );
}

// ---------- The evaluation and the two offers after it ----------
export function HomeOffers() {
  return (
    <section className="hg-section hg-bg-sky" id="offers" aria-labelledby="hg-offers">
      <div className="container">
        <div className="hg-head">
          <h2 id="hg-offers">Know what your roof needs before you spend a dollar.</h2>
          <p>Start with a free roof evaluation. A roofer tells you what’s worth fixing, and you decide what to hire us for.</p>
        </div>
        <div className="hg-plans hg-three">
          <div className="hg-plan feat">
            <span className="hg-tag">Start here</span>
            <small className="hg-k2">Roof evaluation</small>
            <h3>Just look</h3>
            <p className="hg-big">Free<span>no obligation</span></p>
            <ul>
              <li>A trained in-house roofer on your roof</li>
              <li>Drone footage of the areas of concern</li>
              <li>Photos and plain-English findings</li>
              <li>A written scope and price before any work</li>
            </ul>
            <SiteLink className="btn btn-gold" href="#roof-check">Book my free evaluation</SiteLink>
          </div>
          <div className="hg-plan">
            <small className="hg-k2">Roof Check</small>
            <h3>Seal and tune up</h3>
            <p className="hg-big">$199<span>one visit</span></p>
            <ul>
              <li>Only if you want it, after the evaluation</li>
              <li>Vents, pipes and flashings sealed</li>
              <li>Credited toward a replacement if you move forward</li>
              <li>Pay after the visit, no deposit</li>
            </ul>
            <SiteLink className="btn btn-line" href="#roof-check">Ask about a Roof Check</SiteLink>
          </div>
          <div className="hg-plan">
            <small className="hg-k2"><Rich text="*RoofCare Plan*" /></small>
            <h3>Keep it up</h3>
            <p className="hg-big">Seasonal<span>visits</span></p>
            <ul>
              <li>Scheduled seasonal visits</li>
              <li>A photo report every time</li>
              <li>Small problems caught before they leak</li>
            </ul>
            <SiteLink className="btn btn-line" href="/roof-maintenance-plans/">See maintenance plans</SiteLink>
          </div>
        </div>
        <p className="hg-fine">Repairs and replacements are priced in writing after the evaluation. Financing is available on home roof replacements.</p>
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

export function HomeGuides() {
  return (
    <section className="hg-section hg-bg-sky-peri" aria-labelledby="hg-guides">
      <div className="container">
        <div className="hg-row-head">
          <h2 id="hg-guides">Learn how Southern California roofs work.</h2>
          <SiteLink className="hg-arrow" href="/blog/">See all guides <span aria-hidden="true">→</span></SiteLink>
        </div>
        <div className="hg-posts">
          {GUIDES.map((g) => (
            <SiteLink className="hg-postcard" href={g.href} key={g.href}>
              <div className="hg-postart">
                <Image src={g.image} alt="" fill sizes="(min-width: 901px) 40vw, 100vw" quality={60} loading="lazy" />
              </div>
              <div className="hg-postbody">
                <small>{g.label}</small>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
                <span className="hg-arrow">Read more <span aria-hidden="true">→</span></span>
              </div>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
export function HomeFaq({ faqs }) {
  return (
    <section className="hg-section hg-bg-peri-cream" id="faq" aria-labelledby="hg-faq">
      <div className="container">
        <div className="hg-head">
          <h2 id="hg-faq">
            Questions, answered. <span className="hg-grad">Still curious? Call {PHONE}.</span>
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
