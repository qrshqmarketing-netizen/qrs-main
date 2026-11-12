import Image from 'next/image';
import HeroVideo from '@/components/widgets/HeroVideo';
import Link from 'next/link';
import EstimateForm from '@/components/sections/EstimateForm';
import Rich from '@/components/ui/Rich';
import SiteLink from '@/components/ui/SiteLink';
import { BLOG_LINK, blogPath } from '@/data/catalog';
import { GOOGLE_REVIEWS as REVIEWS } from '@/data/reviews';
import { OFFERS } from '@/data/offers';
import { ALL_PLACES } from '@/data/locations';
import { CREDENTIALS_PAGE, CREDENTIALS_PUBLIC } from '@/data/pages/credentials';
import { BBB, BUSINESS, GOOGLE_REVIEWS, PHONE, TEL, TRUST_LOGOS } from '@/data/site';
import { START_PATH } from '@/data/start';
import { articleDate } from '@/lib/articles';
import { sortReviewsFor } from '@/lib/reviewTopics';
import QrsHomeServices from './QrsHomeServices';
import QhReviewRotator from './QhReviewRotator';
import { ES_HOME_REVIEWS } from '@/data/i18n/esHome';
import { th } from '@/lib/langHome';
import './QrsHome.css';

// The sections of the owner's homepage file (November 6 2026), shared by the home page (QrsHome.jsx) and the pages built in the same style
// (the Residential page first). Wrap a page in <main className="qh">; styles in QrsHome.css. Wording on every page follows the site's rules.

export const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
    <path d="M4 12l5 5L20 6" />
  </svg>
);

// Hero buttons from the site's action lists ({ label, href, style: 'gold' | 'plum' | 'line' })
const BTN = { gold: 'qh-btn-sun', plum: 'qh-btn-plum', line: 'qh-btn-ghost' };

// Hero: dark blue gradient, an optional breadcrumb trail (sub pages), the H1, one line, two buttons, check points and the exploded roof layers
// background: { poster, alt, sources } puts a photo with a muted looping video over it (HeroVideo: on every screen size, after load; the photo is the
// first paint and the fallback) behind the hero; visual={false} leaves the right-hand visual out (the home page, owner, November 9 2026)
export function QhHero({ crumbs, where, title, outcome, text, checks = [], cta, actions, visual, background, badges = false, layers = ['Shingle, tile or flat roof', 'New underlayment', 'Deck, inspected and secured'], lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  cta = cta || T('Book a free roof evaluation');
  return (
    <section className={`qh-hero${background ? ' qh-hero-media' : ''}`} aria-labelledby="qh-h1">
      {background && (
        <div className="qh-hero-bg">
          <Image src={background.poster} alt={background.alt || ''} fill priority sizes="100vw" quality={70} />
          {background.sources && <HeroVideo sources={background.sources} />}
        </div>
      )}
      <div className="qh-wrap qh-hero-in">
        <div>
          {crumbs ? (
            <nav className="qh-crumbs" aria-label="Breadcrumb">
              <ol>
                {crumbs.map((c, i) => (
                  <li key={c.href}>{i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
                ))}
              </ol>
            </nav>
          ) : (
            where && <p className="qh-where">{where}</p>
          )}
          <h1 id="qh-h1">{typeof title === 'string' ? <Rich text={title} registeredMark /> : title}</h1>
          {outcome && <p className="qh-outcome">{outcome.replace(/__/g, '')}</p>}
          <p className="qh-hero-text">
            <Rich text={text} />
          </p>
          <div className="qh-actions">
            {actions ? (
              actions.map((a) =>
                a.drawer ? (
                  <button type="button" className={`qh-btn ${BTN[a.style] || 'qh-btn-sun'}`} data-rm-open="" key={a.label}>{a.label}</button>
                ) : (
                  <SiteLink className={`qh-btn ${BTN[a.style] || 'qh-btn-sun'}`} href={a.href} key={a.href}>{a.label}</SiteLink>
                )
              )
            ) : (
              <>
                <SiteLink className="qh-btn qh-btn-sun" href="#roof-check">{cta}</SiteLink>
                <a className="qh-btn qh-btn-ghost" href={TEL}>{T('Call {phone}', { phone: PHONE })}</a>
              </>
            )}
          </div>
          <ul className="qh-checks">
            {checks.map((p) => (
              <li key={p}>
                <Check />
                {p}
              </li>
            ))}
          </ul>
        </div>
        {visual === false ? null : visual || (
        <div className="qh-stack" aria-hidden="true">
          <div className="qh-layer qh-l-deck" />
          <div className="qh-layer qh-l-under" />
          <div className="qh-layer qh-l-shingle" />
          <b className="qh-tag qh-t1">{T(layers[0])}</b>
          <b className="qh-tag qh-t2">{T(layers[1])}</b>
          <b className="qh-tag qh-t3">{T(layers[2])}</b>
          <span className="qh-stack-cap">{T('Every QRS roof, built from the deck up')}</span>
        </div>
        )}
      </div>
      {badges && <QhBrandRow lang={lang} />}
    </section>
  );
}

// The manufacturer logos from the Credentials page, along the bottom of a sub page's hero (white tiles on the dark blue)
function QhBrandRow({ lang = "en" }) {
  const logos = CREDENTIALS_PUBLIC ? CREDENTIALS_PAGE.manufacturers.items.filter((m) => m.logo) : [];
  if (!logos.length) return null;
  return (
    <div className="qh-wrap qh-brands">
      <p>{th(lang, 'Certified with the manufacturers we install')}</p>
      <ul>
        {logos.map((m) => (
          <li key={m.id}>
            <SiteLink href="/credentials/#certifications" title={m.program ? `${m.name} ${m.program}` : m.name}>
              <Image src={m.logo} alt={m.program ? `${m.name} ${m.program}` : m.name} width={m.width} height={m.height} sizes="140px" />
            </SiteLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Residential hero visual: the three roof types as fanned photo cards, each a link to its page (straighten and lift on hover)
export function QhRoofFan({ items, caption = 'Shingle, tile and flat roofs, one team' }) {
  return (
    <div className="qh-fan">
      {items.slice(0, 3).map((t, i) => (
        <SiteLink className={`qh-fan-card qh-fan-${i + 1}`} href={t.href} key={t.href}>
          <Image src={t.image} alt="" fill sizes="(min-width: 1081px) 22vw, 0px" quality={60} priority={i === 1} />
          <span className="qh-fan-label">
            {t.title}
            <span className="arrow" aria-hidden="true">→</span>
          </span>
        </SiteLink>
      ))}
      <span className="qh-fan-cap">{caption}</span>
    </div>
  );
}

// Commercial hero visual: a building photo in a frame with a survey line sweeping across it, the roof survey card and the building types as links
export function QhSurveyFrame({ image, alt = '', chips = [], card }) {
  return (
    <div className="qh-survey">
      <div className="qh-survey-photo">
        <Image src={image} alt={alt} fill sizes="(min-width: 1081px) 40vw, 0px" quality={65} priority />
        <span className="qh-survey-scan" aria-hidden="true" />
        <span className="qh-survey-corners" aria-hidden="true" />
      </div>
      {card && (
        <div className="qh-survey-card">
          <b>{card.title}</b>
          <span>{card.text}</span>
        </div>
      )}
      {chips.length > 0 && (
        <ul className="qh-survey-chips">
          {chips.map((c) => (
            <li key={c.href}>
              <SiteLink href={c.href}>{c.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Roof Repair hero visual: a house cut-away. The stain shows on the ceiling, a dashed line traces the water back up the rafter to the flashing
// where it gets in ("we start upslope of the stain", the page's own words), and the roof types below link to their repair pages
export function QhLeakTrace({ links = [] }) {
  // A house in cross-section, drawn like the real thing (owner, November 11 2026; same tags, caption, links and motion; the water path, the
  // stain and the source keep their classes and geometry): staggered shingle courses with a drip edge, gutters and fascia, a brick chimney
  // with a cap and gold step flashing, the attic with rafters, insulation batts between the ceiling joists, a drywall ceiling with the stain
  // (its ring is the animated ellipse), and the room below with a window, a floor lamp and a bucket under the drip.
  return (
    <div className="qh-leak">
      <div className="qh-leak-art">
        <svg viewBox="0 0 560 400" aria-hidden="true">
          <defs>
            <linearGradient id="qhLeakRoof" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#737c88" />
              <stop offset="1" stopColor="#454d57" />
            </linearGradient>
            <pattern id="qhLeakCourses" width="44" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
              <path d="M0 13.5H44" stroke="rgba(0,0,0,.42)" strokeWidth="1.6" />
              <path d="M0 13H44" stroke="rgba(255,255,255,.14)" strokeWidth=".8" />
              <path d="M11 0V14M33 7V14" stroke="rgba(0,0,0,.25)" strokeWidth="1" />
            </pattern>
            <pattern id="qhLeakCoursesR" width="44" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
              <path d="M0 13.5H44" stroke="rgba(0,0,0,.42)" strokeWidth="1.6" />
              <path d="M0 13H44" stroke="rgba(255,255,255,.14)" strokeWidth=".8" />
              <path d="M11 0V14M33 7V14" stroke="rgba(0,0,0,.25)" strokeWidth="1" />
            </pattern>
            <pattern id="qhLeakBrick" width="14" height="8" patternUnits="userSpaceOnUse">
              <rect width="14" height="8" fill="#7a4a3c" />
              <path d="M0 7.5h14M7 0v4M0 4h14M3.5 4v4M10.5 4v8" stroke="#c9b9a8" strokeWidth="1" />
            </pattern>
            <pattern id="qhLeakBatt" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect width="12" height="12" fill="#e6a1b5" />
              <path d="M0 6c3-4 6 4 12 0" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
            </pattern>
            <linearGradient id="qhLeakWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#efe9df" />
              <stop offset="1" stopColor="#d9d1c3" />
            </linearGradient>
            <linearGradient id="qhLeakGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#dcefff" />
              <stop offset="1" stopColor="#3f78ad" />
            </linearGradient>
            <radialGradient id="qhLeakStainFill" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#b08a5a" stopOpacity="0.35" />
              <stop offset="0.75" stopColor="#8a6a40" stopOpacity="0.6" />
              <stop offset="1" stopColor="#6a4e2c" stopOpacity="0.2" />
            </radialGradient>
          </defs>

          {/* The room: walls, floor, baseboard, a window and a floor lamp */}
          <path d="M70 262V380H490V262" fill="url(#qhLeakWall)" />
          <rect x="70" y="372" width="420" height="8" fill="#9c7a52" />
          <path d="M70 372h420" stroke="rgba(0,0,0,.25)" strokeWidth="1" />
          <rect x="70" y="364" width="420" height="4" fill="#fff" />
          <rect x="396" y="284" width="60" height="56" rx="2" fill="#fff" />
          <rect x="400" y="288" width="52" height="48" fill="url(#qhLeakGlass)" />
          <path d="M426 288v48M400 312h52" stroke="#fff" strokeWidth="2.5" />
          <path d="M404 294l10 -3" stroke="rgba(255,255,255,.75)" strokeWidth="2" strokeLinecap="round" />
          <path d="M120 372V300" stroke="#4a4e55" strokeWidth="3" />
          <path d="M104 372h32" stroke="#4a4e55" strokeWidth="4" strokeLinecap="round" />
          <path d="M98 300h44l-6-22h-32z" fill="#f3e4b8" stroke="rgba(0,0,0,.2)" />
          <ellipse cx="120" cy="320" rx="36" ry="14" fill="rgba(255,236,170,.14)" />
          {/* The bucket under the drip */}
          <path d="M206 372l4-26h24l4 26z" fill="#8a949f" stroke="rgba(0,0,0,.35)" />
          <ellipse cx="222" cy="346" rx="14" ry="3" fill="#aeb6bf" stroke="rgba(0,0,0,.35)" />
          <ellipse cx="222" cy="348" rx="10" ry="2" fill="#5aa4e6" />
          <path d="M208 354c0-10 28-10 28 0" fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="1.5" />
          {/* The ceiling: drywall, with the joists and insulation batts above it */}
          <rect x="70" y="258" width="420" height="6" fill="#f6f2ea" />
          <path d="M70 264h420" stroke="rgba(0,0,0,.3)" strokeWidth="1" />
          <path d="M70 258h420" stroke="rgba(255,255,255,.6)" strokeWidth="1" />
          <rect x="70" y="240" width="420" height="18" fill="url(#qhLeakBatt)" />
          {[70, 118, 166, 214, 262, 310, 358, 406, 454].map((x) => (
            <rect key={x} x={x} y="238" width="8" height="20" fill="#b98b57" stroke="rgba(0,0,0,.3)" />
          ))}
          <path d="M70 210V240M490 210V240" stroke="#c9b9a8" strokeWidth="4" />
          <path d="M70 210V380M490 210V380" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
          {/* Attic rafters */}
          {[120, 170, 220, 340, 390, 440].map((x) => (
            <path key={x} d={`M${x} ${x < 280 ? 210 - (x - 40) * 0.58 + 10 : 210 - (520 - x) * 0.58 + 10}V240`} stroke="#8d6b47" strokeWidth="5" />
          ))}
          <path d="M280 70V240" stroke="#8d6b47" strokeWidth="5" />
          {/* Deck, underlayment and the shingle roof with its ridge cap, drip edges, gutters and fascia */}
          <path d="M28 216L280 70L532 216" fill="none" stroke="#c39663" strokeWidth="9" strokeLinejoin="round" />
          <path d="M26 212L280 66L534 212" fill="none" stroke="#2e3a47" strokeWidth="3" />
          <path d="M20 206L280 56L532 202L532 216L280 70L28 216Z" fill="url(#qhLeakRoof)" />
          <path d="M20 206L280 56L280 70L28 216Z" fill="url(#qhLeakCourses)" />
          <path d="M280 56L540 206L532 216L280 70Z" fill="url(#qhLeakCoursesR)" />
          <path d="M270 62l10-9 10 9" fill="none" stroke="#3b434c" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 206l-6 4M540 206l6 4" stroke="#aeb6bf" strokeWidth="3" strokeLinecap="round" />
          <path d="M8 212h14v10H8zM538 212h14v10h-14z" fill="#aeb6bf" stroke="rgba(0,0,0,.3)" />
          <path d="M12 222v150M548 222v150" stroke="#aeb6bf" strokeWidth="4" />
          <path d="M22 212h-2v10M538 212h2v10" stroke="rgba(0,0,0,.2)" />
          {/* Chimney: brick, a cap and crown, the step flashing in gold */}
          <path d="M372 132V64H414V152" fill="url(#qhLeakBrick)" stroke="rgba(0,0,0,.35)" strokeWidth="1.5" />
          <rect x="366" y="58" width="54" height="8" rx="1" fill="#c9c2b6" stroke="rgba(0,0,0,.3)" />
          <rect x="380" y="44" width="10" height="14" fill="#5b5047" />
          <rect x="396" y="44" width="10" height="14" fill="#5b5047" />
          <path d="M362 128L372 122V64M414 152L426 156" fill="none" stroke="var(--qh-sun)" strokeWidth="4" strokeLinecap="round" />
          <path d="M364 126l8-5M414 134l8 4M414 144l8 4" stroke="#c48d1c" strokeWidth="2" strokeLinecap="round" />
          {/* The water's path: in at the flashing, along the underside of the deck, down to the ceiling */}
          <path className="qh-leak-path" d="M366 136C356 146 340 156 322 166S262 196 238 206C226 211 222 222 222 236V258" fill="none" stroke="#7cc4ff" strokeWidth="3" strokeLinecap="round" strokeDasharray="7 9" />
          <circle className="qh-leak-drop" cx="222" cy="250" r="5" fill="#7cc4ff" />
          {/* The stain on the ceiling: a brown ring on the drywall, and a bulge where the paint has sagged */}
          <ellipse cx="222" cy="261" rx="38" ry="6" fill="url(#qhLeakStainFill)" />
          <ellipse cx="222" cy="262" rx="30" ry="3.5" fill="none" stroke="rgba(120,85,45,.6)" strokeWidth="1.2" />
          <ellipse className="qh-leak-stain" cx="222" cy="270" rx="34" ry="8" fill="rgba(124,196,255,.45)" />
          <path d="M222 266v70" stroke="#7cc4ff" strokeWidth="1.2" strokeDasharray="2 6" opacity="0.6" />
          {/* The source */}
          <circle className="qh-leak-ring" cx="366" cy="134" r="14" fill="none" stroke="var(--qh-sun)" strokeWidth="2.5" />
          <circle cx="366" cy="134" r="5" fill="var(--qh-sun)" />
        </svg>
        <span className="qh-leak-tag qh-leak-src">Where the water gets in</span>
        <span className="qh-leak-tag qh-leak-mid">Water runs downhill before it drips</span>
        <span className="qh-leak-tag qh-leak-spot">Where the stain shows</span>
      </div>
      <p className="qh-leak-cap">We start upslope of the stain and fix the leak at its source.</p>
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// The house wall under the hero roofs (QhReroof, QhShingleColors), drawn like the real thing (owner, November 11 2026): stucco with a belt
// course, two framed windows with glass and mullions, a front door with a light and a step, and the ground line. It sits in the .qh-rr-wall
// box so the layout and the roof above it are unchanged.
function RrWall() {
  return (
    <div className="qh-rr-wall qh-rr-wallx" aria-hidden="true">
      <svg viewBox="0 0 460 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="qhRrWallG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ded6c7" />
            <stop offset="1" stopColor="#bbb2a2" />
          </linearGradient>
          <linearGradient id="qhRrGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dcefff" />
            <stop offset="0.5" stopColor="#7fb4e6" />
            <stop offset="1" stopColor="#2f5f8f" />
          </linearGradient>
        </defs>
        <rect width="460" height="120" fill="url(#qhRrWallG)" />
        <rect width="460" height="5" fill="rgba(0,0,0,.2)" />
        {[48, 332].map((x) => (
          <g key={x}>
            <rect x={x - 4} y="26" width="88" height="58" rx="2" fill="#f3efe6" />
            <rect x={x} y="30" width="80" height="50" fill="url(#qhRrGlass)" />
            <path d={`M${x + 40} 30v50M${x} 55h80`} stroke="#f3efe6" strokeWidth="3" />
            <path d={`M${x + 6} 36l16-2`} stroke="rgba(255,255,255,.75)" strokeWidth="2.5" strokeLinecap="round" />
            <rect x={x - 6} y="84" width="92" height="4" fill="#cfc7b8" />
          </g>
        ))}
        <rect x="196" y="38" width="68" height="82" rx="2" fill="#f3efe6" />
        <rect x="201" y="43" width="58" height="77" fill="#4a3a2c" />
        <rect x="208" y="50" width="44" height="24" fill="url(#qhRrGlass)" opacity="0.9" />
        <rect x="208" y="82" width="44" height="30" rx="1" fill="rgba(255,255,255,.08)" stroke="rgba(0,0,0,.3)" />
        <circle cx="250" cy="90" r="2.2" fill="#d6c08a" />
        <rect x="223" y="24" width="14" height="8" rx="2" fill="#2b323a" />
        <ellipse cx="230" cy="40" rx="26" ry="8" fill="rgba(255,236,170,.25)" />
        <rect x="186" y="114" width="88" height="6" fill="#aaa193" />
        <rect y="118" width="460" height="2" fill="rgba(0,0,0,.35)" />
      </svg>
    </div>
  );
}

// Roof Replacement hero visual: one gable roof shown in the four stages of a replacement, left to right (the worn roof, torn off to the deck,
// new underlayment and flashings, the new roof), revealed in turn with a gold work line sweeping across; the stages, the page's own
// "3 to 5 days" and the replacement pages as links underneath
const REROOF_STEPS = ['Old roof', 'Tear-off to the deck', 'Underlayment & flashings', 'New roof'];
export function QhReroof({ links = [] }) {
  // The four stages as one roof, drawn like the real thing (owner, November 11 2026; same steps, line, timing and links; each stage keeps its
  // qh-rr-s class, so it still drops in on cue): (1) the worn roof with curled and missing tabs, bare patches and moss, (2) the bare plywood
  // deck with its sheet seams, grain and nail lines and one soft spot, (3) synthetic underlayment with its printed lines, a gold drip edge
  // and valley flashing, (4) new architectural shingles with a ridge cap.
  return (
    <div className="qh-reroof">
      <div className="qh-rr-house" aria-hidden="true">
        <div className="qh-rr-roof qh-rr-roofx">
          <svg viewBox="0 0 560 215" preserveAspectRatio="none">
            <defs>
              <pattern id="qhRrOld" width="44" height="14" patternUnits="userSpaceOnUse">
                <rect width="44" height="14" fill="#5a5f66" />
                <path d="M0 13.5H44" stroke="rgba(0,0,0,.5)" strokeWidth="1.6" />
                <path d="M11 0V14M33 7V14" stroke="rgba(0,0,0,.3)" strokeWidth="1" />
              </pattern>
              <pattern id="qhRrPly" width="140" height="48" patternUnits="userSpaceOnUse">
                <rect width="140" height="48" fill="#c39663" />
                <path d="M0 47.5H140M70 0V48" stroke="#8d6b47" strokeWidth="1.6" />
                {[6, 14, 22, 30, 38].map((y) => <path key={y} d={`M0 ${y}c20-2 40 2 70 0s50-2 70 0`} fill="none" stroke="rgba(120,80,40,.25)" strokeWidth="1" />)}
                <path d="M10 44h0M30 44h0" />
                {[12, 36, 58, 82, 106, 128].map((x) => <circle key={x} cx={x} cy="24" r="1.3" fill="rgba(60,40,20,.5)" />)}
              </pattern>
              <pattern id="qhRrUnder" width="36" height="36" patternUnits="userSpaceOnUse">
                <rect width="36" height="36" fill="#2a3542" />
                <path d="M0 0h36M0 18h36M0 0v36M18 0v36" stroke="rgba(255,255,255,.14)" strokeWidth="1" strokeDasharray="3 3" />
              </pattern>
              <pattern id="qhRrNew" width="44" height="14" patternUnits="userSpaceOnUse">
                <rect width="44" height="14" fill="#3f4650" />
                <rect x="0" y="0" width="22" height="13" fill="#454c57" />
                <rect x="22" y="0" width="22" height="13" fill="#3a414a" />
                <path d="M0 13.5H44" stroke="rgba(0,0,0,.55)" strokeWidth="1.8" />
                <path d="M0 0.6H44" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
                <path d="M11 0V13M33 6V13" stroke="rgba(0,0,0,.35)" strokeWidth="1" />
              </pattern>
            </defs>
            <g className="qh-rr-s qh-rr-s1">
              <rect x="0" y="0" width="140" height="215" fill="url(#qhRrOld)" />
              <rect x="0" y="0" width="140" height="215" fill="url(#qhRrOld)" transform="translate(22 7)" opacity="0" />
              {[[30, 60], [92, 102], [48, 160], [110, 188]].map(([x, y]) => (
                <path key={x + y} d={`M${x} ${y}l20 0l-3-7z`} fill="#2f343a" />
              ))}
              <rect x="64" y="130" width="22" height="12" fill="#9a8f80" />
              <rect x="18" y="112" width="26" height="12" fill="#6f7680" opacity="0.8" />
              {[[26, 40], [118, 70], [84, 180]].map(([x, y]) => (
                <ellipse key={x + y} cx={x} cy={y} rx="12" ry="5" fill="#5c7a3c" opacity="0.8" />
              ))}
              {[[100, 150], [40, 196]].map(([x, y]) => (
                <ellipse key={x + y} cx={x} cy={y} rx="14" ry="4" fill="#8c8a84" opacity="0.7" />
              ))}
            </g>
            <g className="qh-rr-s qh-rr-s2">
              <rect x="140" y="0" width="140" height="215" fill="url(#qhRrPly)" />
              <ellipse cx="236" cy="150" rx="26" ry="14" fill="#5a4330" opacity="0.85" />
              <path d="M214 148c8 4 16-4 24 0s16-4 22 2" fill="none" stroke="#2c1f14" strokeWidth="1.2" />
            </g>
            <g className="qh-rr-s qh-rr-s3">
              <rect x="280" y="0" width="140" height="215" fill="url(#qhRrUnder)" />
              <path d="M280 72h140M280 144h140" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
              <path d="M280 215L420 90" stroke="var(--qh-sun)" strokeWidth="6" strokeLinecap="round" />
              <path d="M280 215L420 90" stroke="rgba(255,255,255,.45)" strokeWidth="1.2" />
              <rect x="280" y="205" width="140" height="10" fill="var(--qh-sun)" />
              <path d="M280 205h140" stroke="rgba(0,0,0,.25)" />
            </g>
            <g className="qh-rr-s qh-rr-s4">
              <rect x="420" y="0" width="140" height="215" fill="url(#qhRrNew)" />
              <rect x="420" y="0" width="140" height="10" fill="#2f353d" />
              <path d="M420 10h140" stroke="rgba(0,0,0,.5)" strokeWidth="1.5" />
              {[438, 468, 498, 528].map((x) => <path key={x} d={`M${x} 0v10`} stroke="rgba(0,0,0,.4)" />)}
              <path d="M420 206h140v9H420z" fill="#aeb6bf" />
            </g>
            <path d="M140 0v215M280 0v215M420 0v215" stroke="rgba(255,255,255,.55)" strokeWidth="2" strokeDasharray="6 6" />
          </svg>
          <i className="qh-rr-line" />
        </div>
        <RrWall />
      </div>
      <ol className="qh-rr-steps">
        {REROOF_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="qh-rr-time">Most home roof replacements take 3 to 5 days.</p>
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Shingle Roof Replacement hero visual (owner, November 6 2026): one roof slope built from the deck up, the way the page describes it: the deck
// checked, drip edge and underlayment, starter strips, the shingle courses laid from the eave up (staggered, row by row), step flashing and a pipe
// boot, then the ridge cap, with the matching step lighting up in the list beside it; then a gold glint sweeps the finished roof. Drawn once
// (SVG + CSS), still and finished for reduced motion.
const COURSE_STEPS = ['Deck checked and photographed', 'Drip edge and underlayment', 'Starter strips at eaves and rakes', 'Shingles, course by course', 'Step flashing and pipe boots', 'Ridge caps and vents'];
export function QhShingleCourses({ caption, links = [] }) {
  const rows = 8;
  const top = 46;
  const bottom = 262;
  const h = (bottom - top) / rows;
  // the slope narrows toward the ridge: x at a given y
  const left = (y) => 40 + ((bottom - y) / (bottom - top)) * 90;
  const right = (y) => 520 - ((bottom - y) / (bottom - top)) * 90;
  const slope = `M${left(bottom)} ${bottom}L${right(bottom)} ${bottom}L${right(top)} ${top}L${left(top)} ${top}Z`;
  return (
    <div className="qh-sc">
      <svg className="qh-sc-roof" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <clipPath id="qhScClip">
            <path d={slope} />
          </clipPath>
          {/* Drawn like the real thing (owner, November 11 2026; same layers, courses, glint, flashing, boot and drip edge): plywood with grain
              and seams, the underlayment with its laps, two-tone architectural tabs with a granule grain, a ridge cap with its own cuts */}
          <pattern id="qhScDeck" width="96" height="27" patternUnits="userSpaceOnUse">
            <rect width="96" height="27" fill="#c39663" />
            <path d="M0 26.5h96M48 0v27" stroke="#9d7143" strokeWidth="1.5" />
            <path d="M0 8c12-2 24 2 48 0s36-2 48 0M0 18c12-2 24 2 48 0s36-2 48 0" fill="none" stroke="rgba(120,80,40,.22)" strokeWidth="1" />
          </pattern>
          <pattern id="qhScUnderP" width="60" height="36" patternUnits="userSpaceOnUse">
            <rect width="60" height="36" fill="#26313d" />
            <path d="M0 35h60" stroke="rgba(255,255,255,.18)" strokeWidth="1.5" />
            <path d="M0 12h60" stroke="rgba(255,255,255,.06)" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
          <filter id="qhScGrain" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="12" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
          </filter>
          {[0, 22].map((dx) => (
            <pattern key={dx} id={`qhScTabs${dx}`} width="44" height={h} patternUnits="userSpaceOnUse" patternTransform={`translate(${dx} ${top})`}>
              <rect width="44" height={h} fill="#414852" />
              <rect x="0" y={h / 2} width="22" height={h / 2} fill="#474e58" />
              <rect x="22" y={h / 2} width="22" height={h / 2} fill="#3a414a" />
              <path d={`M0 ${h - 1}h44`} stroke="#22262c" strokeWidth="2" />
              <path d={`M22 ${h / 2}v${h / 2}`} stroke="#2b3038" strokeWidth="1.2" />
              <path d="M0 1h44" stroke="rgba(255,255,255,.08)" strokeWidth="1" />
            </pattern>
          ))}
          {/* a cut-away at the top left, so the deck and the underlayment show under the finished shingles */}
          <clipPath id="qhScUnder">
            <path d="M0 300H560V0H280L70 250Z" />
          </clipPath>
          <clipPath id="qhScShingles">
            <path d="M0 300H560V0H370L150 280Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#qhScClip)">
          <rect className="qh-sc-l qh-sc-deck" x="0" y="0" width="560" height="300" fill="url(#qhScDeck)" />
          <rect className="qh-sc-l qh-sc-under" x="0" y="0" width="560" height="300" fill="url(#qhScUnderP)" clipPath="url(#qhScUnder)" />
          <rect className="qh-sc-l qh-sc-starter" x="0" y={bottom - 9} width="560" height="9" fill="#5a616b" />
          <g clipPath="url(#qhScShingles)">
          {Array.from({ length: rows }, (_, i) => (
            <rect
              key={i}
              className="qh-sc-course"
              style={{ animationDelay: `${2.4 + i * 0.12}s` }}
              x="0"
              y={bottom - (i + 1) * h}
              width="560"
              height={h + 1}
              fill={`url(#qhScTabs${(rows - 1 - i) % 2 ? 22 : 0})`}
            />
          ))}
          </g>
          <rect x="0" y="0" width="560" height="300" filter="url(#qhScGrain)" opacity="0.22" style={{ mixBlendMode: 'multiply' }} clipPath="url(#qhScShingles)" />
          <g className="qh-sc-l qh-sc-ridge">
            <rect x="0" y={top - 2} width="560" height="12" fill="#5d6570" />
            {Array.from({ length: 19 }, (_, i) => <path key={i} d={`M${left(top) + i * 30} ${top - 2}v12`} stroke="rgba(0,0,0,.4)" />)}
            <path d={`M0 ${top + 10}h560`} stroke="rgba(0,0,0,.5)" strokeWidth="1.5" />
          </g>
          <rect className="qh-sc-glint" x="-120" y="0" width="70" height="300" fill="url(#qhScGlintFill)" />
        </g>
        <linearGradient id="qhScGlintFill" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#f0b43c" stopOpacity=".35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* step flashing along a wall at the right edge, a pipe boot and a ridge vent */}
        <path className="qh-sc-l qh-sc-flash" d={`M${right(bottom) - 4} ${bottom}L${right(top) - 4} ${top}`} stroke="#f0b43c" strokeWidth="5" strokeDasharray="14 6" fill="none" />
        <g className="qh-sc-l qh-sc-boot">
          <ellipse cx="200" cy="150" rx="17" ry="7" fill="#f0b43c" />
          <rect x="193" y="126" width="14" height="24" rx="2" fill="#cfd6de" />
          <ellipse cx="200" cy="126" rx="7" ry="2.6" fill="#8a949f" />
        </g>
        <path className="qh-sc-l qh-sc-drip" d={`M${left(bottom) - 6} ${bottom + 2}H${right(bottom) + 6}`} stroke="#f0b43c" strokeWidth="5" strokeLinecap="round" />
        <path d={slope} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <ol className="qh-sc-steps">
        {COURSE_STEPS.map((step, i) => (
          <li key={step} style={{ animationDelay: `${0.3 + i * 0.75}s` }}>
            {step}
          </li>
        ))}
      </ol>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Shingle Roof Repair hero visual (owner, November 6 2026): a close-up of shingle courses with one creased shingle, repaired the way the page
// describes it, on a 10 s loop: the spot is circled, the course above is lifted, the damaged piece slides out, a matching one slides in, nails go
// into the nailing zone, the course drops back and is sealed, "Repaired" stamps on; the matching step lights up in the list. SVG + CSS; reduced
// motion shows the finished repair, still.
const SHINGLE_FIX_STEPS = ['Find the damaged shingle', 'Lift the course above', 'Nail a new one in the nailing zone', 'Hand-seal and photograph'];
export function QhShingleFix({ caption, links = [] }) {
  const W = 70;
  const H = 46;
  const rows = 7;
  const cols = 9;
  const tr = 3; // the repaired shingle: row 3, column 4
  const tc = 4;
  const x0 = (r) => (r % 2 ? -W / 2 : 0);
  const tx = x0(tr) + tc * W;
  const ty = tr * H;
  return (
    <div className="qh-sf">
      <svg className="qh-sf-roof" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <clipPath id="qhSfClip">
            <rect width="560" height="300" rx="12" />
          </clipPath>
          <filter id="qhSfGrain" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="11" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
          </filter>
        </defs>
        <g clipPath="url(#qhSfClip)">
          <rect width="560" height="300" fill="#262b32" />
          {Array.from({ length: rows }, (_, r) =>
            Array.from({ length: cols }, (_, c) => {
              if (r === tr && c === tc) return null;
              const x = x0(r) + c * W;
              const shade = ['#4a515b', '#434a53', '#4e5560', '#454c56'][(r * 3 + c) % 4];
              // Drawn like the real thing (owner, November 11 2026; same shingles, lifted course, old and new piece, nails, sealant and stamp):
              // each shingle with a granule grain, its two-tone dragon-tooth tabs, a lit top edge and the shadow line of the course above
              return (
                <g key={`${r}-${c}`} className={r === tr - 1 && Math.abs(x0(r) + c * W + W / 2 - (tx + W / 2)) < W ? 'qh-sf-above' : undefined}>
                  <rect x={x + 1} y={r * H + 1} width={W - 2} height={H - 2} rx="2" fill={shade} />
                  <rect x={x + 1} y={r * H + 1} width={W - 2} height={H - 2} rx="2" filter="url(#qhSfGrain)" opacity="0.35" style={{ mixBlendMode: 'multiply' }} />
                  <rect x={x + 1} y={r * H + H / 2} width={W / 2 - 1} height={H / 2 - 1} fill="rgba(255,255,255,.05)" />
                  <rect x={x + W / 2} y={r * H + H / 2} width={W / 2 - 1} height={H / 2 - 1} fill="rgba(0,0,0,.08)" />
                  <path d={`M${x + 2} ${r * H + 2}h${W - 4}`} stroke="rgba(255,255,255,.1)" strokeWidth="1.5" />
                  <path d={`M${x + 1} ${r * H + H - 1}h${W - 2}`} stroke="rgba(0,0,0,.5)" strokeWidth="2" />
                </g>
              );
            })
          )}
          {/* the gap under the lifted course, the old creased shingle, the new one, nails and sealant */}
          <rect className="qh-sf-gap" x={tx - W / 2} y={ty - H + 2} width={W * 2} height="10" fill="#14181d" />
          <g className="qh-sf-old">
            <path d={`M${tx + 1} ${ty + 1}h${W - 2}v${H - 2}h-${W - 2}z`} fill="#6b6f74" />
            <path d={`M${tx + 8} ${ty + 30}l18 -12 14 9 22 -14`} stroke="#2a2d31" strokeWidth="2.5" fill="none" />
          </g>
          <g className="qh-sf-new">
            <rect x={tx + 1} y={ty + 1} width={W - 2} height={H - 2} rx="2" fill="#4b525c" />
            <rect x={tx + 1} y={ty + 1} width={W - 2} height={H - 2} rx="2" filter="url(#qhSfGrain)" opacity="0.35" style={{ mixBlendMode: 'multiply' }} />
            <rect x={tx + 1} y={ty + H / 2} width={W / 2 - 1} height={H / 2 - 1} fill="rgba(255,255,255,.05)" />
            <rect x={tx + W / 2} y={ty + H / 2} width={W / 2 - 1} height={H / 2 - 1} fill="rgba(0,0,0,.08)" />
            <path d={`M${tx + 2} ${ty + 2}h${W - 4}`} stroke="rgba(255,255,255,.1)" strokeWidth="1.5" />
          </g>
          <path className="qh-sf-zone" d={`M${tx - 4} ${ty - 6}h${W + 8}`} stroke="#f0b43c" strokeWidth="2" strokeDasharray="5 5" />
          {[0.2, 0.45, 0.7, 0.92].map((f, i) => (
            <circle key={f} className={`qh-sf-nail qh-sf-nail${i + 1}`} cx={tx + W * f - 4} cy={ty - 6} r="4" fill="#f0b43c" />
          ))}
          {[0.25, 0.5, 0.75].map((f) => (
            <circle key={f} className="qh-sf-seal" cx={tx + W * f} cy={ty + 6} r="3" fill="#0e1114" opacity=".7" />
          ))}
          <circle className="qh-sf-ring" cx={tx + W / 2} cy={ty + H / 2} r="44" fill="none" stroke="#f0b43c" strokeWidth="3" />
        </g>
        <g className="qh-sf-stamp" transform={`translate(${tx + W + 34} ${ty + 4})`}>
          <rect x="-4" y="-18" width="104" height="30" rx="15" fill="#f0b43c" />
          <text x="48" y="2" textAnchor="middle" fill="#0b1b2e" style={{ font: '700 14px var(--font-text), sans-serif' }}>Repaired ✓</text>
        </g>
      </svg>
      <ol className="qh-sc-steps qh-sf-steps">
        {SHINGLE_FIX_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Flat Roof Replacement hero visual (owner, November 6 2026): a building in cross-section between a parapet and a scupper. The old roof, with a
// pond and blisters, lifts off; a bad section of deck is replaced; the new roof goes on with a slope toward the scupper (base sheet, then a white
// cap sheet), the parapets are flashed; then drops of water run down the slope and out of the scupper, on a loop. The steps light up with it.
// SVG + CSS; reduced motion shows the finished roof.
const FLAT_REROOF_STEPS = ['Tear off to the deck', 'Replace damaged decking', 'Slope it toward the drains', 'Base and cap sheets, laps sealed', 'Parapets and curbs flashed'];
export function QhFlatReroof({ caption, links = [] }) {
  // A building in cross-section, drawn like the real thing (owner, November 11 2026; same steps, caption, links and motion, every animated
  // class and its geometry kept): a stucco wall with framed windows and a door, the plywood deck on its joists with one rotten run that is
  // replaced, the old roof as a dark granulated cap with blisters and a pond, the new base sheet and white cap sheet laid toward the
  // scupper, parapets with coping and cant strips, gold counterflashing with a termination bar, a rooftop unit on a flashed curb, the
  // scupper with its conductor head, a downspout on brackets and a splash block, and the water drops running off at the end.
  return (
    <div className="qh-fr">
      <svg className="qh-fr-svg" viewBox="0 0 560 270" aria-hidden="true">
        <defs>
          <filter id="qhFrGrain" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer><feFuncA type="linear" slope="0.55" /></feComponentTransfer>
          </filter>
          <linearGradient id="qhFrWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9d2c4" />
            <stop offset="1" stopColor="#b9b1a2" />
          </linearGradient>
          <linearGradient id="qhFrGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dcefff" />
            <stop offset="0.5" stopColor="#7fb4e6" />
            <stop offset="1" stopColor="#2f5f8f" />
          </linearGradient>
          <linearGradient id="qhFrPly" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9b07a" />
            <stop offset="1" stopColor="#b98a52" />
          </linearGradient>
          <linearGradient id="qhFrCapW" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#d7dde3" />
          </linearGradient>
          <linearGradient id="qhFrUnit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#aeb6bf" />
            <stop offset="1" stopColor="#6f7882" />
          </linearGradient>
          <linearGradient id="qhFrPond" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9ed2ff" />
            <stop offset="1" stopColor="#2f7fc4" />
          </linearGradient>
          <linearGradient id="qhFrParapet" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#5a6471" />
            <stop offset="1" stopColor="#3b4652" />
          </linearGradient>
        </defs>

        {/* Ground and the building: stucco wall, a belt course, framed windows with glass and mullions, a door */}
        <path d="M20 270h520" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
        <rect x="64" y="172" width="432" height="98" fill="url(#qhFrWall)" />
        <rect x="64" y="172" width="432" height="98" filter="url(#qhFrGrain)" opacity="0.22" style={{ mixBlendMode: 'multiply' }} />
        <rect x="64" y="172" width="432" height="6" fill="rgba(0,0,0,.18)" />
        <rect x="64" y="172" width="432" height="98" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1.5" />
        {[110, 210, 410].map((x) => (
          <g key={x}>
            <rect x={x - 3} y="193" width="50" height="46" rx="2" fill="#f1ede4" />
            <rect x={x} y="196" width="44" height="40" rx="1" fill="url(#qhFrGlass)" />
            <path d={`M${x + 22} 196v40M${x} 216h44`} stroke="#f1ede4" strokeWidth="2.5" />
            <path d={`M${x + 4} 200l12 -0`} stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeLinecap="round" />
            <rect x={x - 5} y="239" width="54" height="4" fill="#cfc7b8" />
          </g>
        ))}
        {/* the door, with its light above */}
        <rect x="307" y="206" width="50" height="64" rx="2" fill="#efe9dd" />
        <rect x="311" y="210" width="42" height="60" fill="#4a3a2c" />
        <rect x="316" y="216" width="32" height="20" fill="url(#qhFrGlass)" opacity="0.9" />
        <rect x="316" y="242" width="32" height="24" rx="1" fill="rgba(255,255,255,.08)" stroke="rgba(0,0,0,.3)" />
        <circle cx="346" cy="246" r="1.8" fill="#d6c08a" />
        <rect x="326" y="196" width="12" height="7" rx="2" fill="#2b323a" />
        <ellipse cx="332" cy="206" rx="20" ry="6" fill="rgba(255,236,170,.25)" />

        {/* Deck: plywood sheets on their joists (the joist ends show under the deck), with one rotten run that gets replaced */}
        {[80, 112, 144, 176, 208, 240, 272, 304, 336, 368, 400, 432, 464].map((x) => (
          <rect key={x} x={x} y="172" width="6" height="8" fill="#8a6a44" />
        ))}
        <rect x="64" y="160" width="432" height="12" fill="url(#qhFrPly)" />
        <path d="M64 164h432M64 168h432" stroke="rgba(120,80,40,.25)" strokeWidth="1" />
        <path d="M150 160v12M240 160v12M330 160v12M420 160v12" stroke="#8a6a44" strokeWidth="1.5" />
        <rect className="qh-fr-bad" x="240" y="160" width="90" height="12" fill="#4f3a28" />
        <path className="qh-fr-bad" d="M250 164c8 2 12 6 20 4s14-5 24-2 14 5 26 3" fill="none" stroke="#2c1f14" strokeWidth="1.5" />
        <rect className="qh-fr-l qh-fr-newdeck" x="240" y="160" width="90" height="12" fill="#e4bb86" />
        <path className="qh-fr-l qh-fr-newdeck" d="M240 164h90M240 168h90" stroke="rgba(120,80,40,.25)" strokeWidth="1" />

        {/* The old roof: a dark, weathered granulated cap with blisters and a pond */}
        <g className="qh-fr-old">
          <rect x="64" y="148" width="432" height="12" fill="#30343a" />
          <rect x="64" y="148" width="432" height="12" filter="url(#qhFrGrain)" opacity="0.5" style={{ mixBlendMode: 'screen' }} />
          <path d="M64 150h432" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
          <path d="M190 160v-12M300 160v-12M400 160v-12" stroke="rgba(0,0,0,.45)" strokeWidth="1.5" />
          {[130, 160, 380, 420].map((x) => (
            <g key={x}>
              <path d={`M${x - 10} 149c2-6 18-6 20 0z`} fill="#454a52" />
              <path d={`M${x - 6} 146c2-2 10-2 12 0`} fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
            </g>
          ))}
          <ellipse cx="270" cy="149" rx="70" ry="4" fill="url(#qhFrPond)" opacity="0.9" />
          <path d="M215 148c20-1.5 90-1.5 110 0" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1" />
          <path d="M240 150h12M262 150h24M296 150h10" stroke="rgba(255,255,255,.5)" strokeWidth="1" />
        </g>

        {/* The new roof: a base sheet with its laps, then the white granulated cap sheet, both sloping toward the scupper */}
        <g className="qh-fr-l qh-fr-base">
          <path d="M64 138L496 152V160H64Z" fill="#4f5660" />
          <path d="M64 141L496 155" stroke="rgba(0,0,0,.35)" strokeWidth="1" />
          <path d="M170 141v18M276 145v15M382 148v12" stroke="rgba(0,0,0,.35)" strokeWidth="1.2" />
        </g>
        <g className="qh-fr-l qh-fr-cap">
          <path d="M64 134L496 148L496 153L64 139Z" fill="url(#qhFrCapW)" />
          <path d="M64 134L496 148L496 153L64 139Z" filter="url(#qhFrGrain)" opacity="0.22" style={{ mixBlendMode: 'multiply' }} />
          <path d="M64 134L496 148" stroke="#fff" strokeWidth="1.2" />
          <path d="M150 137v5M240 140v5M330 143v5M420 146v5" stroke="rgba(0,0,0,.2)" strokeWidth="1.2" />
          <path d="M64 139L496 153" stroke="rgba(0,0,0,.25)" strokeWidth="1" />
        </g>

        {/* Parapets with coping caps and cant strips; the scupper through the right wall with its conductor head; the downspout on brackets */}
        <rect x="40" y="96" width="24" height="76" fill="url(#qhFrParapet)" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
        <rect x="36" y="90" width="32" height="8" rx="2" fill="#a39b8c" stroke="rgba(0,0,0,.35)" />
        <path d="M64 134l8-8v8z" fill="#5a6471" />
        <path d="M496 96h24v76h-24V160M496 96v44" fill="url(#qhFrParapet)" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
        <rect x="492" y="90" width="32" height="8" rx="2" fill="#a39b8c" stroke="rgba(0,0,0,.35)" />
        <path d="M496 148l-8-8v8z" fill="#5a6471" />
        <rect x="496" y="140" width="24" height="12" fill="#0d1a29" />
        <path d="M496 140h24M496 152h24" stroke="rgba(255,255,255,.3)" strokeWidth="1" />
        <path d="M520 138h14v18h-14z" fill="#8a949f" stroke="rgba(0,0,0,.35)" />
        <path d="M520 146h10v120" stroke="#9aa4ae" strokeWidth="6" fill="none" strokeLinejoin="round" />
        <path d="M530 150v116" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
        <path d="M524 180h12M524 220h12M524 250h12" stroke="#4c555e" strokeWidth="3" />
        <path d="M526 266h18l4 4h-26z" fill="#8a949f" />

        {/* A rooftop unit on its curb (cant strip, flashed), with its fan grille, louvered panel and refrigerant lines */}
        <g className="qh-fr-l qh-fr-unit">
          <rect x="330" y="132" width="64" height="10" fill="#59606a" />
          <path d="M330 142l-6 0 6-6zM394 142l6 0-6-6z" fill="#59606a" />
          <rect x="336" y="104" width="52" height="28" rx="3" fill="url(#qhFrUnit)" stroke="rgba(255,255,255,.45)" strokeWidth="1.2" />
          <rect x="336" y="104" width="52" height="5" rx="2" fill="rgba(0,0,0,.2)" />
          <circle cx="350" cy="119" r="8" fill="#4c555e" stroke="rgba(255,255,255,.35)" />
          <path d="M350 111v16M342 119h16M344 113l12 12M356 113l-12 12" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" />
          <path d="M366 112h16M366 117h16M366 122h16M366 127h16" stroke="#4c555e" strokeWidth="2" />
          <path d="M388 124h10v8" fill="none" stroke="#9a7c4d" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        {/* Gold counterflashing with its termination bar */}
        <path className="qh-fr-l qh-fr-flash" d="M328 141V133M396 143V133" stroke="#f0b43c" strokeWidth="4" strokeLinecap="round" />
        <path className="qh-fr-l qh-fr-flash" d="M64 104V136M496 104V138" stroke="#f0b43c" strokeWidth="5" strokeLinecap="round" />
        <path className="qh-fr-l qh-fr-flash" d="M60 104h8M492 104h8" stroke="#8a6a2a" strokeWidth="3" strokeLinecap="round" />

        {/* Water on the finished roof, running to the scupper and down the spout */}
        {[0, 1, 2].map((i) => (
          <circle key={i} className="qh-fr-drop" style={{ animationDelay: `${5.2 + i * 0.9}s` }} cx="0" cy="0" r="4.5" fill="#7cc4ff" />
        ))}
      </svg>
      <ol className="qh-sc-steps qh-fr-steps">
        {FLAT_REROOF_STEPS.map((step, i) => (
          <li key={step} style={{ animationDelay: `${0.4 + i * 0.9}s` }}>
            {step}
          </li>
        ))}
      </ol>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Flat Roof Repair hero visual (owner, November 6 2026): a flat roof and the room under it, in cross-section, on a 10 s loop. Water gets in at an
// open lap near the parapet, travels under the membrane and drips onto the ceiling far from the opening; a ring starts at the stain and works
// upslope to the opening, which is photographed and repaired; then the drip stops and the roof is dry. The steps light up with it. SVG + CSS;
// reduced motion shows the repaired roof.
const FLAT_FIX_STEPS = ['Start at the ceiling stain', 'Check the whole area', 'Find the opening, photograph it', 'Repair it to match your roof'];
export function QhFlatFix({ caption, links = [] }) {
  return (
    <div className="qh-ff">
      <svg className="qh-ff-svg" viewBox="0 0 560 270" aria-hidden="true">
        {/* rain on the roof */}
        {[110, 200, 290, 380, 460].map((x, i) => (
          <path key={x} className="qh-ff-rain" style={{ animationDelay: `${i * 0.23}s` }} d={`M${x} 40l-6 16`} stroke="#7cc4ff" strokeWidth="2.5" strokeLinecap="round" />
        ))}
        {/* Drawn like the real thing (owner, November 11 2026; same rain, water path, stain, drip, ring, patch and labels): the room with its
            wall, floor, framed window and a bucket under the drip, the deck on its joists, the dark granulated cap sheet, parapets with coping
            and cant strips */}
        <linearGradient id="qhFfWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe9df" />
          <stop offset="1" stopColor="#d9d1c3" />
        </linearGradient>
        <linearGradient id="qhFfGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dcefff" />
          <stop offset="1" stopColor="#3f78ad" />
        </linearGradient>
        <filter id="qhFfGrain" x="0" y="0" width="1" height="1">
          <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
        </filter>
        <rect x="64" y="142" width="432" height="118" fill="url(#qhFfWall)" />
        <rect x="64" y="252" width="432" height="8" fill="#9c7a52" />
        <rect x="64" y="248" width="432" height="4" fill="#fff" />
        <rect x="376" y="166" width="78" height="64" rx="2" fill="#fff" />
        <rect x="380" y="170" width="70" height="56" fill="url(#qhFfGlass)" />
        <path d="M415 170v56M380 198h70" stroke="#fff" strokeWidth="2.5" />
        <path d="M160 252l4-24h24l4 24z" fill="#8a949f" stroke="rgba(0,0,0,.35)" />
        <ellipse cx="176" cy="228" rx="14" ry="3" fill="#aeb6bf" stroke="rgba(0,0,0,.35)" />
        <path d="M176 150v76" stroke="#7cc4ff" strokeWidth="1.2" strokeDasharray="2 6" opacity="0.5" />
        <path d="M64 132V260M496 132V260" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
        <rect x="64" y="136" width="432" height="6" fill="#f6f2ea" />
        {[80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480].map((x) => <rect key={x} x={x} y="132" width="6" height="4" fill="#8a6a44" />)}
        <rect x="64" y="112" width="432" height="20" fill="#c39663" />
        <path d="M64 118h432M64 124h432" stroke="rgba(120,80,40,.25)" />
        <path d="M172 112v20M280 112v20M388 112v20" stroke="#8a6a44" strokeWidth="1.5" />
        <rect x="64" y="104" width="432" height="8" fill="#3d434b" />
        <rect x="64" y="104" width="432" height="8" filter="url(#qhFfGrain)" opacity="0.5" style={{ mixBlendMode: 'screen' }} />
        <path d="M64 105h432" stroke="rgba(255,255,255,.12)" />
        <path d="M150 112v-8M290 112v-8" stroke="rgba(0,0,0,.45)" strokeWidth="1.5" />
        <rect x="40" y="70" width="24" height="62" fill="#3b4652" stroke="rgba(255,255,255,.45)" strokeWidth="2" />
        <rect x="496" y="70" width="24" height="62" fill="#3b4652" stroke="rgba(255,255,255,.45)" strokeWidth="2" />
        <rect x="36" y="64" width="32" height="8" rx="2" fill="#a39b8c" stroke="rgba(0,0,0,.35)" />
        <rect x="492" y="64" width="32" height="8" rx="2" fill="#a39b8c" stroke="rgba(0,0,0,.35)" />
        <path d="M64 104l6-6v6zM496 104l-6-6v6z" fill="#5a6471" />
        {/* the open lap near the parapet, and its repair */}
        <path d="M424 104l14 -6 14 6" fill="#3d434b" stroke="#22262b" strokeWidth="2" />
        <rect className="qh-ff-patch" x="414" y="96" width="48" height="10" rx="2" fill="#4b525c" stroke="#f0b43c" strokeWidth="2.5" />
        {/* where the water goes: in at the lap, along under the membrane, down to the ceiling */}
        <path className="qh-ff-path" d="M438 104V114H176V140" pathLength="1" stroke="#7cc4ff" strokeWidth="3" strokeDasharray="1" fill="none" strokeLinejoin="round" />
        <ellipse className="qh-ff-stain" cx="176" cy="144" rx="26" ry="5" fill="#8a6d4a" />
        <circle className="qh-ff-drip" cx="176" cy="146" r="4" fill="#7cc4ff" />
        {/* the search: from the stain, upslope to the opening */}
        <circle className="qh-ff-ring" cx="176" cy="122" r="24" fill="none" stroke="#f0b43c" strokeWidth="3" strokeDasharray="6 5" />
        <g className="qh-ff-found">
          <rect x="374" y="52" width="128" height="26" rx="13" fill="#f0b43c" />
          <text x="438" y="69" textAnchor="middle" fill="#0b1b2e" style={{ font: '700 13px var(--font-text), sans-serif' }}>Opening found</text>
        </g>
        <g className="qh-ff-dry">
          <rect x="118" y="160" width="116" height="26" rx="13" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.4)" />
          <text x="176" y="177" textAnchor="middle" fill="#fff" style={{ font: '700 13px var(--font-text), sans-serif' }}>Dry again ✓</text>
        </g>
      </svg>
      <ol className="qh-sc-steps qh-ff-steps">
        {FLAT_FIX_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Flat Roof Installation hero visual (owner, November 6 2026): planned on paper, then built. A house with a pitched roof and a new addition
// beside it are drawn first as blueprint lines (slope arrow, drain and tie-in marked), then the built version fills in over them: walls, the
// new low-slope roof sloping to a scupper, gold flashing where it meets the main house; then drops of water run off on a loop. The steps light
// up with it. SVG + CSS; reduced motion shows the built roof.
const FLAT_INSTALL_STEPS = ['Plans reviewed early', 'Slope and drains set', 'Edges and flashings built', 'Tie-in to the main roof', 'Photos of what gets hidden'];
export function QhFlatInstall({ caption, links = [] }) {
  const lines = [
    'M60 262V150H280V262Z', // main house
    'M40 150L170 72L300 150', // its pitched roof
    'M280 262V172H500V262Z', // the addition
    'M280 158L500 166V172H280Z', // the new flat roof
    'M500 158H516V174H500', // scupper
  ];
  return (
    <div className="qh-fi">
      <svg className="qh-fi-svg" viewBox="0 0 560 280" aria-hidden="true">
        <defs>
          <pattern id="qhFiGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="rgba(124,196,255,.12)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="560" height="280" rx="12" fill="url(#qhFiGrid)" />
        {/* the built version */}
        {/* Drawn like the real thing (owner, November 11 2026; same blueprint lines, notes, flashing and water drops): the house with a stucco
            wall, shingle courses and a ridge cap, a framed window and a hedge; the addition with its own wall, glass doors, the base sheet and
            white cap sheet sloping to the scupper, a cant strip and gold flashing at the tie-in, and the downspout on brackets */}
        <pattern id="qhFiShingle" width="30" height="10" patternUnits="userSpaceOnUse">
          <rect width="30" height="10" fill="#8c5a3c" />
          <rect x="0" y="0" width="15" height="9" fill="#946140" />
          <path d="M0 9.5h30" stroke="rgba(0,0,0,.45)" strokeWidth="1.2" />
          <path d="M15 0v9" stroke="rgba(0,0,0,.25)" strokeWidth="1" />
        </pattern>
        <linearGradient id="qhFiWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9d2c4" />
          <stop offset="1" stopColor="#b9b1a2" />
        </linearGradient>
        <linearGradient id="qhFiGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dcefff" />
          <stop offset="1" stopColor="#2f5f8f" />
        </linearGradient>
        <g className="qh-fi-built">
          <path d="M60 262V150H280V262Z" fill="url(#qhFiWall)" />
          <rect x="60" y="150" width="220" height="4" fill="rgba(0,0,0,.2)" />
          <path d="M40 150L170 72L300 150Z" fill="url(#qhFiShingle)" />
          <path d="M162 78l8-6 8 6" fill="none" stroke="#5a3a26" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 150L170 72L300 150" fill="none" stroke="#6e4630" strokeWidth="3" />
          <path d="M36 152h48" stroke="#aeb6bf" strokeWidth="4" strokeLinecap="round" />
          <path d="M38 154v108" stroke="#aeb6bf" strokeWidth="3" />
          <rect x="116" y="176" width="56" height="56" rx="2" fill="#f3efe6" />
          <rect x="120" y="180" width="48" height="48" fill="url(#qhFiGlass)" />
          <path d="M144 180v48M120 204h48" stroke="#f3efe6" strokeWidth="2" />
          <ellipse cx="90" cy="262" rx="24" ry="8" fill="#4d7a3a" />
          <path d="M280 262V172H500V262Z" fill="url(#qhFiWall)" />
          <rect x="280" y="172" width="220" height="4" fill="rgba(0,0,0,.2)" />
          <path d="M280 156L500 164V172H280Z" fill="#59606a" />
          <path d="M280 164L500 172" stroke="rgba(0,0,0,.35)" />
          <path d="M280 153L500 161V165L280 157Z" fill="#eef2f6" />
          <path d="M280 153L500 161" stroke="#fff" strokeWidth="1" />
          <path d="M280 157l6-6v6z" fill="#5a6471" />
          <rect x="296" y="192" width="68" height="52" rx="2" fill="#e8ecf0" />
          <rect x="300" y="196" width="60" height="44" fill="url(#qhFiGlass)" />
          <path d="M330 196v44" stroke="#e8ecf0" strokeWidth="2" />
          <rect x="396" y="192" width="68" height="52" rx="2" fill="#e8ecf0" />
          <rect x="400" y="196" width="60" height="44" fill="url(#qhFiGlass)" />
          <path d="M430 196v44" stroke="#e8ecf0" strokeWidth="2" />
          <path d="M500 160h14v8h-14" fill="#2b323a" stroke="rgba(255,255,255,.55)" strokeWidth="2" />
          <path d="M514 158h8v12h-8z" fill="#8a949f" stroke="rgba(0,0,0,.35)" />
          <path d="M518 170v90" stroke="#9aa4ae" strokeWidth="5" strokeLinecap="round" />
          <path d="M514 200h8M514 240h8" stroke="#4c555e" strokeWidth="3" />
          <path d="M30 262h500" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
        </g>
        <path className="qh-fi-flash" d="M282 132V156" stroke="#f0b43c" strokeWidth="5" strokeLinecap="round" />
        {/* the blueprint */}
        <g className="qh-fi-plan" fill="none" stroke="#9fd3ff" strokeWidth="2">
          {lines.map((d) => (
            <path key={d} d={d} pathLength="1" strokeDasharray="1" />
          ))}
          <path d="M320 140L470 145" pathLength="1" strokeDasharray="1" markerEnd="url(#qhFiArrow)" />
        </g>
        <marker id="qhFiArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill="#9fd3ff" />
        </marker>
        <g className="qh-fi-notes" style={{ font: '700 12.5px var(--font-text), sans-serif' }}>
          <text x="394" y="132" textAnchor="middle" fill="#9fd3ff">Slope</text>
          <text x="508" y="146" textAnchor="middle" fill="#9fd3ff">Drain</text>
          <text x="282" y="122" textAnchor="middle" fill="#f0b43c">Tie-in</text>
        </g>
        {[0, 1, 2].map((i) => (
          <circle key={i} className="qh-fi-drop" style={{ animationDelay: `${5 + i * 0.9}s` }} cx="0" cy="0" r="4.5" fill="#7cc4ff" />
        ))}
      </svg>
      <ol className="qh-sc-steps qh-fr-steps">
        {FLAT_INSTALL_STEPS.map((step, i) => (
          <li key={step} style={{ animationDelay: `${0.4 + i * 0.85}s` }}>
            {step}
          </li>
        ))}
      </ol>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Tile Roof Replacement hero visual (owner, November 9 2026): a tile roof slope built from the deck up, as the page describes it: the deck, new
// underlayment, battens, then the tile course by course from the eave and the ridge; then the tile profile cycles through the page's options
// (clay barrel, S tile, flat concrete), named under the roof, because replacement is the chance to choose. The steps light up as it builds.
// SVG + CSS; reduced motion shows the finished clay roof.
const TILE_REROOF_STEPS = ['Tear-off to the deck, photographed', 'New underlayment across the deck', 'Battens where the system calls for them', 'Your tile, course by course', 'Flashings, ridge and hip details'];
const TILE_PROFILES = ['Clay barrel tile', 'S tile', 'Flat concrete tile'];
export function QhTileReroof({ caption, links = [] }) {
  const rows = 6;
  const top = 52;
  const bottom = 262;
  const h = (bottom - top) / rows;
  const left = (y) => 40 + ((bottom - y) / (bottom - top)) * 80;
  const right = (y) => 520 - ((bottom - y) / (bottom - top)) * 80;
  const slope = `M${left(bottom)} ${bottom}L${right(bottom)} ${bottom}L${right(top)} ${top}L${left(top)} ${top}Z`;
  const Rows = ({ id, flat }) =>
    Array.from({ length: rows }, (_, i) => (
      <rect
        key={i}
        className="qh-tr-row"
        style={{ animationDelay: `${2.4 + i * 0.16}s` }}
        x="0"
        y={bottom - (i + 1) * h}
        width="560"
        height={h + 1}
        fill={`url(#${id}${flat && i % 2 ? 'b' : ''})`}
      />
    ));
  return (
    <div className="qh-tr">
      <svg className="qh-tr-svg" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <clipPath id="qhTrClip">
            <path d={slope} />
          </clipPath>
          {/* Drawn like the real thing (owner, November 11 2026; same layers, battens, courses, profiles and ridge): plywood with grain and
              seams, the underlayment with its laps, barrel tiles with a shaded cap and the pan tile below, S tiles with their shadow, flat
              concrete tiles with a matte grain, and a ridge of cap tiles over mortar */}
          <pattern id="qhTrDeck" width="96" height="30" patternUnits="userSpaceOnUse">
            <rect width="96" height="30" fill="#c39663" />
            <path d="M0 29.5h96M48 0v30" stroke="#9d7143" strokeWidth="1.5" />
            <path d="M0 8c12-2 24 2 48 0s36-2 48 0M0 20c12-2 24 2 48 0s36-2 48 0" fill="none" stroke="rgba(120,80,40,.22)" strokeWidth="1" />
          </pattern>
          <pattern id="qhTrUnderP" width="60" height="36" patternUnits="userSpaceOnUse">
            <rect width="60" height="36" fill="#26313d" />
            <path d="M0 35h60" stroke="rgba(255,255,255,.18)" strokeWidth="1.5" />
            <path d="M0 12h60" stroke="rgba(255,255,255,.06)" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
          <linearGradient id="qhTrCapG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8f4629" />
            <stop offset="0.4" stopColor="#d9805a" />
            <stop offset="0.75" stopColor="#c66a41" />
            <stop offset="1" stopColor="#7a3a22" />
          </linearGradient>
          <filter id="qhTrGrain" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="13" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer><feFuncA type="linear" slope="0.4" /></feComponentTransfer>
          </filter>
          <pattern id="qhTrBarrel" width="30" height={h} patternUnits="userSpaceOnUse" patternTransform={`translate(0 ${top})`}>
            <rect width="30" height={h} fill="#8f4629" />
            <path d={`M0 ${h - 3}h30`} stroke="#6f351f" strokeWidth="3" />
            <path d={`M0 2q15 8 30 0`} fill="none" stroke="rgba(0,0,0,.3)" strokeWidth="2" />
            <path d={`M6 -2V${h - 9}a9 9 0 0 0 18 0V-2Z`} fill="url(#qhTrCapG)" />
            <path d={`M10 0V${h - 10}`} stroke="rgba(255,255,255,.2)" strokeWidth="3" strokeLinecap="round" />
            <path d={`M6 ${h - 9}a9 9 0 0 0 18 0`} stroke="#7a3a22" strokeWidth="1.5" fill="none" />
            <path d={`M24 0V${h - 9}`} stroke="rgba(0,0,0,.35)" strokeWidth="2" />
          </pattern>
          <pattern id="qhTrS" width="54" height={h} patternUnits="userSpaceOnUse" patternTransform={`translate(0 ${top})`}>
            <rect width="54" height={h} fill="#8a4529" />
            <path d={`M0 ${h - 2}V8C8 0 19 0 27 8C35 16 46 16 54 8V${h - 2}Z`} fill="#b95f39" />
            <path d="M6 9C11 5 17 5 21 8" stroke="rgba(255,255,255,.22)" strokeWidth="3" fill="none" />
          </pattern>
          {[0, 23].map((dx) => (
            <pattern key={dx} id={`qhTrFlat${dx ? 'b' : ''}`} width="46" height={h} patternUnits="userSpaceOnUse" patternTransform={`translate(${dx} ${top})`}>
              <rect width="46" height={h} fill="#7d8288" />
              <path d={`M0 ${h - 1.5}h46M45 0v${h}`} stroke="#555a60" strokeWidth="3" />
              <rect x="3" y="4" width="20" height="3" fill="rgba(255,255,255,.1)" />
            </pattern>
          ))}
        </defs>
        <g clipPath="url(#qhTrClip)">
          <rect className="qh-tr-l qh-tr-deck" width="560" height="300" fill="url(#qhTrDeck)" />
          <rect className="qh-tr-l qh-tr-under" width="560" height="300" fill="url(#qhTrUnderP)" />
          {Array.from({ length: rows }, (_, i) => (
            <rect key={i} className="qh-tr-l qh-tr-batten" style={{ animationDelay: `${1.7 + i * 0.07}s` }} x="0" y={bottom - (i + 1) * h + 4} width="560" height="6" fill="#d8ab74" />
          ))}
          <g className="qh-tr-p qh-tr-p1"><Rows id="qhTrBarrel" /></g>
          <g className="qh-tr-p qh-tr-p2"><Rows id="qhTrS" /></g>
          <g className="qh-tr-p qh-tr-p3"><Rows id="qhTrFlat" flat /><rect width="560" height="300" filter="url(#qhTrGrain)" opacity="0.3" style={{ mixBlendMode: 'multiply' }} /></g>
          <g className="qh-tr-l qh-tr-ridge">
            <rect x="0" y={top - 2} width="560" height="12" fill="#c9c2b6" />
            <rect x="0" y={top - 4} width="560" height="12" rx="6" fill="#a8532f" />
            {Array.from({ length: 19 }, (_, i) => <path key={i} d={`M${left(top) + 10 + i * 28} ${top - 4}v12`} stroke="rgba(0,0,0,.35)" strokeWidth="1.5" />)}
            <path d={`M0 ${top - 2}h560`} stroke="rgba(255,255,255,.25)" />
          </g>
        </g>
        <path d={slope} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2" strokeLinejoin="round" />
        <path className="qh-tr-l qh-tr-flash" d={`M${left(bottom) - 6} ${bottom + 2}H${right(bottom) + 6}`} stroke="#f0b43c" strokeWidth="5" strokeLinecap="round" />
        <g className="qh-tr-names" style={{ font: '700 14px var(--font-text), sans-serif' }}>
          {TILE_PROFILES.map((name, i) => (
            <text key={name} className={`qh-tr-n qh-tr-n${i + 1}`} x="280" y="292" textAnchor="middle" fill="#f0b43c">
              {name}
            </text>
          ))}
        </g>
      </svg>
      <ol className="qh-sc-steps qh-fr-steps">
        {TILE_REROOF_STEPS.map((step, i) => (
          <li key={step} style={{ animationDelay: `${0.3 + i * 0.8}s` }}>
            {step}
          </li>
        ))}
      </ol>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Tile Roof Repair hero visual (owner, November 9 2026): a clay barrel tile roof from above, on a 10 s loop: a cracked tile is circled, footprints
// step only where the tiles are supported on the way to it, the cracked tile lifts out and the underlayment beneath is checked, the closest match
// drops in and "Repaired ✓" shows; the steps light up in turn. SVG + CSS; reduced motion shows the repaired roof.
const TILE_FIX_STEPS = ['Trace the water to where it gets in', 'Step only where tiles are supported', 'Check the underlayment, fit a matched tile', 'Photos before and after'];
export function QhTileFix({ caption, links = [] }) {
  const h = 38;
  const cap = (x, y) => `M${x + 6} ${y - 2}V${y + h - 9}a9 9 0 0 0 18 0V${y - 2}Z`;
  const tx = 330;
  const ty = h * 3;
  const steps = [
    [70, 236],
    [118, 228],
    [166, 198],
    [214, 190],
    [262, 160],
  ];
  return (
    <div className="qh-tf">
      <svg className="qh-tf-svg" viewBox="0 0 560 280" aria-hidden="true">
        <defs>
          <clipPath id="qhTfClip">
            <rect width="560" height="280" rx="12" />
          </clipPath>
          {/* Drawn like the real thing (owner, November 11 2026; same cracked tile, footprints, check, new tile, ring and stamp): the barrel
              caps shaded round, the pan tiles between them in shadow, the course laps, a little weathering, and the underlayment with its laps
              under the lifted tile */}
          <linearGradient id="qhTfCapG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8f4629" />
            <stop offset="0.4" stopColor="#d9805a" />
            <stop offset="0.75" stopColor="#c66a41" />
            <stop offset="1" stopColor="#7a3a22" />
          </linearGradient>
          <pattern id="qhTfTiles" width="30" height={h} patternUnits="userSpaceOnUse">
            <rect width="30" height={h} fill="#8f4629" />
            <path d={`M0 ${h - 3}h30`} stroke="#6f351f" strokeWidth="3" />
            <path d="M0 2q15 8 30 0" fill="none" stroke="rgba(0,0,0,.3)" strokeWidth="2" />
            <path d={cap(0, 0)} fill="url(#qhTfCapG)" />
            <path d={`M10 0V${h - 10}`} stroke="rgba(255,255,255,.2)" strokeWidth="3" strokeLinecap="round" />
            <path d={`M24 0V${h - 9}`} stroke="rgba(0,0,0,.35)" strokeWidth="2" />
            <path d={`M6 ${h - 9}a9 9 0 0 0 18 0`} stroke="#7a3a22" strokeWidth="1.5" fill="none" />
          </pattern>
          <filter id="qhTfGrain" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="14" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer><feFuncA type="linear" slope="0.4" /></feComponentTransfer>
          </filter>
        </defs>
        <g clipPath="url(#qhTfClip)">
          <rect width="560" height="280" fill="url(#qhTfTiles)" />
          <rect width="560" height="280" filter="url(#qhTfGrain)" opacity="0.22" style={{ mixBlendMode: 'multiply' }} />
          {[[90, 60], [420, 150], [200, 230]].map(([x, y]) => <ellipse key={x} cx={x} cy={y} rx="22" ry="8" fill="rgba(60,80,40,.25)" />)}
          {/* under the tile being replaced: the underlayment, and its check */}
          <rect x={tx} y={ty - 2} width="30" height={h + 2} fill="#26313d" />
          <path d={`M${tx} ${ty + 10}h30M${tx} ${ty + 26}h30`} stroke="rgba(255,255,255,.2)" strokeWidth="1.2" />
          <circle className="qh-tf-ok" cx={tx + 15} cy={ty + h / 2} r="10" fill="#f0b43c" />
          <path className="qh-tf-ok" d={`M${tx + 10} ${ty + h / 2}l4 4 7 -8`} stroke="#0b1b2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <g className="qh-tf-new">
            <rect x={tx} y={ty} width="30" height={h - 3} fill="#8f4629" />
            <path d={cap(tx, ty)} fill="url(#qhTfCapG)" />
            <path d={`M${tx + 10} ${ty}V${ty + h - 10}`} stroke="rgba(255,255,255,.2)" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g className="qh-tf-old">
            <rect x={tx} y={ty} width="30" height={h - 3} fill="#8f4629" />
            <path d={cap(tx, ty)} fill="url(#qhTfCapG)" />
            <path d={`M${tx + 9} ${ty + 6}l6 9 -4 7 7 10`} stroke="#3a1a0e" strokeWidth="2" fill="none" />
          </g>
          {steps.map(([x, y], i) => (
            <g key={x} className={`qh-tf-foot qh-tf-foot${i + 1}`} transform={`translate(${x} ${y}) rotate(-28)`}>
              <ellipse cx="0" cy="0" rx="6" ry="10" fill="#f0b43c" />
              <ellipse cx="13" cy="5" rx="6" ry="10" fill="#f0b43c" opacity=".8" />
            </g>
          ))}
          <circle className="qh-tf-ring" cx={tx + 15} cy={ty + h / 2} r="30" fill="none" stroke="#f0b43c" strokeWidth="3" strokeDasharray="6 5" />
        </g>
        <g className="qh-tf-stamp" transform={`translate(${tx + 52} ${ty + 8})`}>
          <rect x="-4" y="-18" width="150" height="30" rx="15" fill="#f0b43c" />
          <text x="71" y="2" textAnchor="middle" fill="#0b1b2e" style={{ font: '700 13.5px var(--font-text), sans-serif' }}>Matched, repaired ✓</text>
        </g>
      </svg>
      <ol className="qh-sc-steps qh-tf-steps">
        {TILE_FIX_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Tile Lift & Relay hero visual (owner, November 9 2026): your own tiles, off and back in their pattern, on a 12 s loop. Each barrel tile (each a
// slightly different shade, so the pattern can be followed) is lifted off to a stack beside the roof, the cracked old underlayment ("paper") is
// replaced by new underlayment rolling across, the same tiles go back to the same places, and the one broken tile is set aside for a matched
// one. The steps light up in turn. SVG + CSS custom properties; reduced motion shows the relaid roof.
const RELAY_STEPS = ['Tiles off by hand, stacked', 'Old paper out, new underlayment on', 'Battens and flashings renewed', 'Same tiles, same pattern', 'Broken ones matched'];
const RELAY_TONES = ['#c66a41', '#bb6139', '#cf7549', '#b5603b', '#c86d45', '#ad5733', '#c2663e', '#d27a4d'];
export function QhTileRelay({ caption, links = [] }) {
  const cols = 8;
  const rows = 5;
  const W = 44;
  const H = 52;
  const X0 = 30;
  const Y0 = 24;
  const broken = [3, 2]; // column, row
  const stack = (k) => [462, 228 - (k % 10) * 7];
  const capPath = (x, y) => `M${x + 8} ${y - 2}V${y + H - 13}a14 14 0 0 0 28 0V${y - 2}Z`;
  const tiles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const k = r * cols + c;
      const x = X0 + c * W;
      const y = Y0 + r * H;
      const [sx, sy] = stack(k);
      tiles.push({ k, x, y, dx: sx - x, dy: sy - y, broken: c === broken[0] && r === broken[1], tone: RELAY_TONES[(k * 5 + r) % RELAY_TONES.length] });
    }
  }
  const panelW = cols * W;
  const panelH = rows * H;
  return (
    <div className="qh-tl">
      <svg className="qh-tl-svg" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <clipPath id="qhTlPanel">
            <rect x={X0} y={Y0 - 4} width={panelW} height={panelH + 4} rx="8" />
          </clipPath>
        </defs>
        <g clipPath="url(#qhTlPanel)">
          {/* the old paper, dried and cracked, then the new underlayment rolling across */}
          {/* Drawn like the real thing (owner, November 11 2026; same tiles, stack, underlayment roll and matched tile): the old paper dried,
              stained and cracked, the new underlayment with battens and lap lines, pan tiles between the caps, the eave with its gutter */}
          <rect x={X0} y={Y0 - 4} width={panelW} height={panelH + 4} fill="#b4925f" />
          {[0, 1, 2, 3].map((r) => <path key={r} d={`M${X0} ${Y0 + 40 + r * 52}h${panelW}`} stroke="rgba(90,60,30,.35)" strokeWidth="1.5" />)}
          <ellipse cx={X0 + 120} cy={Y0 + 110} rx="60" ry="26" fill="rgba(70,40,20,.22)" />
          <ellipse cx={X0 + 270} cy={Y0 + 200} rx="48" ry="20" fill="rgba(70,40,20,.2)" />
          <path d={`M${X0 + 40} ${Y0 + 30}l30 22 -12 30 26 24M${X0 + 190} ${Y0 + 60}l-20 34 24 20M${X0 + 280} ${Y0 + 150}l26 18 -8 40M${X0 + 110} ${Y0 + 190}l40 -14`} stroke="#6f5532" strokeWidth="2.5" fill="none" />
          <rect className="qh-tl-under" x={X0} y={Y0 - 4} width={panelW} height={panelH + 4} fill="#26313d" />
          <g className="qh-tl-under">
            {Array.from({ length: rows }, (_, r) => (
              <g key={r}>
                <path d={`M${X0} ${Y0 + r * H + 30}h${panelW}`} stroke="rgba(255,255,255,.14)" strokeWidth="1.2" />
                <rect x={X0} y={Y0 + r * H + 6} width={panelW} height="6" fill="#d8ab74" opacity=".85" />
                <path d={`M${X0} ${Y0 + r * H + 12}h${panelW}`} stroke="rgba(0,0,0,.35)" />
              </g>
            ))}
          </g>
        </g>
        {/* the pallet the tiles are stacked on */}
        <rect x="436" y="250" width="100" height="12" rx="2" fill="#9d7143" />
        {[446, 462, 478, 494, 510, 526].map((x) => <path key={x} d={`M${x} 250v12`} stroke="rgba(0,0,0,.3)" />)}
        <path d="M444 262v10M486 262v10M528 262v10" stroke="#9d7143" strokeWidth="6" />
        <path d={`M${X0 - 6} ${Y0 + rows * H + 2}h${panelW + 12}`} stroke="#aeb6bf" strokeWidth="6" strokeLinecap="round" />
        <text x="486" y="292" textAnchor="middle" fill="#9fb8d2" style={{ font: '700 12px var(--font-text), sans-serif' }}>
          Your tiles, stacked
        </text>
        {tiles.map((t) => (
          <g
            key={t.k}
            className={`qh-tl-tile${t.broken ? ' broken' : ''}`}
            style={{ '--dx': `${t.dx}px`, '--dy': `${t.dy}px`, animationDelay: `${(t.k % cols) * 0.05 + Math.floor(t.k / cols) * 0.08}s` }}
          >
            <rect x={t.x} y={t.y} width={W} height={H - 4} fill="#7e3f26" />
            <path d={`M${t.x + 2} ${t.y + 2}q20 10 40 0`} fill="none" stroke="rgba(0,0,0,.3)" strokeWidth="2" />
            <path d={capPath(t.x, t.y)} fill={t.tone} />
            <path d={`M${t.x + 14} ${t.y}V${t.y + H - 16}`} stroke="rgba(255,255,255,.18)" strokeWidth="3.5" strokeLinecap="round" />
            <path d={`M${t.x + 32} ${t.y + 2}V${t.y + H - 16}`} stroke="rgba(0,0,0,.25)" strokeWidth="3" strokeLinecap="round" />
            <path d={`M${t.x + 8} ${t.y + H - 13}a14 14 0 0 0 28 0`} fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="1.5" />
            {t.broken && <path d={`M${t.x + 15} ${t.y + 6}l9 12 -6 9 9 12`} stroke="#3a1a0e" strokeWidth="2.5" fill="none" />}
          </g>
        ))}
        {/* the matched tile that takes the broken one's place */}
        {tiles
          .filter((t) => t.broken)
          .map((t) => (
            <g key="match" className="qh-tl-match">
              <rect x={t.x} y={t.y} width={W} height={H - 4} fill="#7e3f26" />
              <path d={capPath(t.x, t.y)} fill="#c4683f" />
              <path d={`M${t.x + 14} ${t.y}V${t.y + H - 16}`} stroke="rgba(255,255,255,.18)" strokeWidth="3.5" strokeLinecap="round" />
              <circle className="qh-tl-ring" cx={t.x + W / 2} cy={t.y + H / 2} r="34" fill="none" stroke="#f0b43c" strokeWidth="3" strokeDasharray="6 5" />
            </g>
          ))}
      </svg>
      <ol className="qh-sc-steps qh-fr-steps qh-tl-steps">
        {RELAY_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Slate Tile Roofing hero visual (owner, November 9 2026): "a slate roof starts with the structure, not the stone". A roof slope with its rafters
// showing; a gold check sweeps along them ("Framing reviewed"); then the deck and underlayment go on, and natural slate is laid course by course
// from the eave in staggered slates of varied width and tone, each with two copper nails; a cut-away at the top left keeps the framing in view.
// The steps light up as it builds. SVG + CSS; reduced motion shows the finished roof.
const SLATE_STEPS = ['Look at the home first', 'Check the framing', 'Every layer in the written scope', 'Slate laid course by course'];
const SLATE_TONES = ['#46505c', '#3d4652', '#525d6a', '#4a5361', '#38414c', '#4f5866'];
export function QhSlateRoof({ caption, links = [] }) {
  const rows = 9;
  const top = 46;
  const bottom = 262;
  const h = (bottom - top) / rows;
  const left = (y) => 40 + ((bottom - y) / (bottom - top)) * 90;
  const right = (y) => 520 - ((bottom - y) / (bottom - top)) * 90;
  const slope = `M${left(bottom)} ${bottom}L${right(bottom)} ${bottom}L${right(top)} ${top}L${left(top)} ${top}Z`;
  // slates of varied widths, the same on every render (a fixed sequence, no randomness)
  const widths = [38, 46, 42, 52, 36, 48, 44, 40, 50];
  const slateRows = Array.from({ length: rows }, (_, r) => {
    const y = bottom - (r + 1) * h;
    const out = [];
    let x = r % 2 ? -22 : 0;
    let i = r * 3;
    while (x < 560) {
      const w = widths[i % widths.length];
      out.push({ x, w, tone: SLATE_TONES[(i * 7 + r) % SLATE_TONES.length] });
      x += w;
      i += 1;
    }
    return { y, slates: out };
  });
  return (
    <div className="qh-sl">
      <svg className="qh-sl-svg" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <clipPath id="qhSlClip">
            <path d={slope} />
          </clipPath>
          <clipPath id="qhSlCover">
            <path d="M0 300H560V0H250L40 270Z" />
          </clipPath>
          <clipPath id="qhSlUnder">
            <path d="M0 300H560V0H290L80 290Z" />
          </clipPath>
          <clipPath id="qhSlSlate">
            <path d="M0 300H560V0H340L130 300Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#qhSlClip)">
          <rect width="560" height="300" fill="#16202b" />
          {/* the framing: rafters running up the slope */}
          {/* Drawn like the real thing (owner, November 11 2026; same sweep, layers, rows and tag): rafters with grain and a ridge board, the
              deck as plywood with seams, the underlayment with laps, and the slate with a stone grain, its nail holes and a ridge cap */}
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i}>
              <rect x={20 + i * 46} y="0" width="12" height="300" fill="#b68955" />
              <path d={`M${24 + i * 46} 0v300M${29 + i * 46} 0v300`} stroke="rgba(120,80,40,.3)" strokeWidth="1" />
            </g>
          ))}
          <rect x="0" y={top - 2} width="560" height="8" fill="#8d6b47" />
          <rect className="qh-sl-sweep" x="-80" y="0" width="80" height="300" fill="url(#qhSlSweep)" />
          <g clipPath="url(#qhSlCover)">
            <g className="qh-sl-l qh-sl-deck">
              <rect width="560" height="300" fill="#c39663" />
              {[60, 120, 180, 240].map((y) => <path key={y} d={`M0 ${y}h560`} stroke="#8d6b47" strokeWidth="1.5" />)}
              {[140, 280, 420].map((x) => <path key={x} d={`M${x} 0v300`} stroke="#8d6b47" strokeWidth="1.2" />)}
              {[20, 40, 80, 100, 140, 160, 200, 220, 260, 280].map((y) => <path key={y} d={`M0 ${y}c40-3 80 3 140 0s100-3 140 0 100 3 140 0 100-3 140 0`} fill="none" stroke="rgba(120,80,40,.2)" strokeWidth="1" />)}
            </g>
            <g className="qh-sl-l qh-sl-under" clipPath="url(#qhSlUnder)">
              <rect width="560" height="300" fill="#26313d" />
              {[50, 100, 150, 200, 250].map((y) => <path key={y} d={`M0 ${y}h560`} stroke="rgba(255,255,255,.18)" strokeWidth="1.5" />)}
              {[30, 80, 130, 180, 230, 280].map((y) => <path key={y} d={`M0 ${y}h560`} stroke="rgba(255,255,255,.06)" strokeWidth="1" strokeDasharray="3 3" />)}
            </g>
            <g clipPath="url(#qhSlSlate)">
            {slateRows.map((row, r) => (
              <g key={r} className="qh-sl-row" style={{ animationDelay: `${2.6 + r * 0.14}s` }}>
                {row.slates.map((sl) => (
                  <g key={sl.x}>
                    <rect x={sl.x + 1} y={row.y + 1} width={sl.w - 2} height={h + 6} rx="1.5" fill={sl.tone} />
                    <path d={`M${sl.x + 4} ${row.y + 10}l${sl.w - 8} 2M${sl.x + 5} ${row.y + 17}l${sl.w - 10} -1`} stroke="rgba(0,0,0,.14)" strokeWidth="1" />
                    <path d={`M${sl.x + 1} ${row.y + h + 7}h${sl.w - 2}`} stroke="rgba(0,0,0,.45)" strokeWidth="1.2" />
                    <circle cx={sl.x + sl.w * 0.3} cy={row.y + 5} r="1.6" fill="#c9824a" />
                    <circle cx={sl.x + sl.w * 0.7} cy={row.y + 5} r="1.6" fill="#c9824a" />
                  </g>
                ))}
              </g>
            ))}
            </g>
          </g>
        </g>
        <linearGradient id="qhSlSweep" x1="0" x2="1">
          <stop offset="0" stopColor="#f0b43c" stopOpacity="0" />
          <stop offset=".5" stopColor="#f0b43c" stopOpacity=".55" />
          <stop offset="1" stopColor="#f0b43c" stopOpacity="0" />
        </linearGradient>
        <path d={slope} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2" strokeLinejoin="round" />
        <path d={`M${left(top)} ${top}H${right(top)}`} stroke="#8a6a44" strokeWidth="7" strokeLinecap="round" />
        <path d={`M${left(top)} ${top - 1}H${right(top)}`} stroke="#b07a3c" strokeWidth="3" strokeLinecap="round" />
        <g className="qh-sl-tag" transform={`translate(${left(150) - 4} 150)`}>
          <rect x="-8" y="-17" width="152" height="28" rx="14" fill="#f0b43c" />
          <text x="68" y="2" textAnchor="middle" fill="#0b1b2e" style={{ font: '700 13px var(--font-text), sans-serif' }}>Framing reviewed ✓</text>
        </g>
      </svg>
      <ol className="qh-sc-steps qh-sl-steps">
        {SLATE_STEPS.map((step, i) => (
          <li key={step} style={{ animationDelay: `${0.3 + i * 1}s` }}>
            {step}
          </li>
        ))}
      </ol>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Concrete Tile Roofing hero visual (owner, November 9 2026): "the tile you see is only one part of the roof". A roof section opens into an
// exploded stack (concrete tile, battens, underlayment and flashing, deck), each layer labelled as it separates; then the tile layer cycles
// through four colors, named under it, since choosing a profile and color is part of the job. SVG + CSS; reduced motion shows the open stack.
const CONCRETE_LAYERS = ['Concrete tile: the part you see', 'Battens', 'Underlayment, flashing', 'Roof deck'];
const CONCRETE_COLORS = [
  ['Terracotta blend', '#b8673f', '#8f4a2b'],
  ['Desert tan', '#b99b72', '#8d7552'],
  ['Weathered gray', '#8a8f95', '#62676d'],
  ['Charcoal', '#4d5259', '#33373c'],
];
export function QhConcreteStack({ caption, links = [] }) {
  // one slab: the top face (a parallelogram) and its front edge
  const face = (y) => `M40 ${y}L320 ${y}L400 ${y - 64}L120 ${y - 64}Z`;
  const edge = (y, t) => `M40 ${y}L320 ${y}L320 ${y + t}L40 ${y + t}Z`;
  const side = (y, t) => `M320 ${y}L400 ${y - 64}L400 ${y - 64 + t}L320 ${y + t}Z`;
  const ys = [92, 150, 204, 258]; // tile, battens, underlayment, deck (open)
  return (
    <div className="qh-cs">
      <svg className="qh-cs-svg" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <pattern id="qhCsWave" width="40" height="13" patternUnits="userSpaceOnUse">
            <path d="M0 9C7 1 13 1 20 9C27 17 33 17 40 9" stroke="rgba(0,0,0,.3)" strokeWidth="3" fill="none" />
            <path d="M2 6C8 0 13 0 18 5" stroke="rgba(255,255,255,.16)" strokeWidth="2" fill="none" />
          </pattern>
          <pattern id="qhCsBattens" width="40" height="16" patternUnits="userSpaceOnUse" patternTransform="skewX(-51)">
            <rect width="40" height="16" fill="#26313d" />
            <rect x="0" y="5" width="40" height="5" fill="#d8ab74" />
            <path d="M0 10h40" stroke="rgba(0,0,0,.35)" strokeWidth=".8" />
            <path d="M0 1h40" stroke="rgba(255,255,255,.1)" strokeWidth=".8" strokeDasharray="3 3" />
          </pattern>
          {/* Drawn like the real thing (owner, November 11 2026; same slabs, labels and color cycle): a plywood deck with grain and seams, the
              underlayment with its laps, battens on the counter-battens, and the tile face in its S profile with a matte grain */}
          <pattern id="qhCsPly" width="60" height="30" patternUnits="userSpaceOnUse" patternTransform="skewX(-51)">
            <rect width="60" height="30" fill="#c39663" />
            <path d="M0 29.5h60M30 0v30" stroke="#8d6b47" strokeWidth="1.2" />
            <path d="M0 8c10-2 20 2 30 0s20-2 30 0M0 20c10-2 20 2 30 0s20-2 30 0" fill="none" stroke="rgba(120,80,40,.25)" strokeWidth="1" />
          </pattern>
          <pattern id="qhCsUnder" width="60" height="30" patternUnits="userSpaceOnUse" patternTransform="skewX(-51)">
            <rect width="60" height="30" fill="#26313d" />
            <path d="M0 29h60" stroke="rgba(255,255,255,.18)" strokeWidth="1.2" />
            <path d="M0 10h60" stroke="rgba(255,255,255,.07)" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
          <filter id="qhCsGrain" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="8" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer><feFuncA type="linear" slope="0.4" /></feComponentTransfer>
          </filter>
        </defs>
        {/* deck */}
        <g className="qh-cs-slab qh-cs-s4">
          <path d={face(ys[3])} fill="url(#qhCsPly)" />
          <path d={edge(ys[3], 10)} fill="#9d7143" />
          <path d={side(ys[3], 10)} fill="#8a6239" />
        </g>
        {/* underlayment, with gold flashing along its edge */}
        <g className="qh-cs-slab qh-cs-s3">
          <path d={face(ys[2])} fill="url(#qhCsUnder)" />
          <path d={edge(ys[2], 6)} fill="#1a222b" />
          <path d={side(ys[2], 6)} fill="#161d25" />
          <path d={`M40 ${ys[2]}L320 ${ys[2]}L400 ${ys[2] - 64}`} stroke="#f0b43c" strokeWidth="4" fill="none" strokeLinejoin="round" />
        </g>
        {/* battens */}
        <g className="qh-cs-slab qh-cs-s2">
          <path d={face(ys[1])} fill="url(#qhCsBattens)" />
          <path d={edge(ys[1], 5)} fill="#b68955" />
        </g>
        {/* concrete tile, in each color */}
        <g className="qh-cs-slab qh-cs-s1">
          {CONCRETE_COLORS.map(([name, top, dark], i) => (
            <g key={name} className={`qh-cs-c qh-cs-c${i + 1}`}>
              <path d={face(ys[0])} fill={top} />
              <path d={face(ys[0])} filter="url(#qhCsGrain)" opacity="0.25" style={{ mixBlendMode: 'multiply' }} />
              <path d={face(ys[0])} fill="url(#qhCsWave)" />
              <path d={edge(ys[0], 12)} fill={dark} />
              <path d={side(ys[0], 12)} fill={dark} opacity=".85" />
            </g>
          ))}
        </g>
        <g style={{ font: '700 13px var(--font-text), sans-serif' }}>
          {CONCRETE_LAYERS.map((label, i) => (
            <g key={label} className={`qh-cs-lab qh-cs-lab${i + 1}`}>
              <path d={`M408 ${ys[i] - 30}h18`} stroke={i === 0 ? '#f0b43c' : 'rgba(255,255,255,.5)'} strokeWidth="2" />
              <text x="432" y={ys[i] - 26} fill={i === 0 ? '#f0b43c' : '#dbe7f3'}>
                {label.includes(':') ? label.split(':')[0] : label}
              </text>
              {label.includes(':') && (
                <text x="432" y={ys[i] - 10} fill="#9fb8d2" style={{ font: '600 11.5px var(--font-text), sans-serif' }}>
                  {label.split(':')[1].trim()}
                </text>
              )}
            </g>
          ))}
        </g>
        <g style={{ font: '700 13px var(--font-text), sans-serif' }}>
          {CONCRETE_COLORS.map(([name], i) => (
            <text key={name} className={`qh-cs-n qh-cs-n${i + 1}`} x="220" y="20" textAnchor="middle" fill="#f0b43c">
              {name}
            </text>
          ))}
        </g>
      </svg>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Torch Down hero visual (owner, November 9 2026): a flat roof in cross-section, on a 9 s loop. A roll lays the white granulated cap sheet over the
// base sheet as a torch flame heats it at the roll, the fused seam glowing behind it; at the end the cap sheet is flashed up the parapet. A
// magnified inset shows an overlap melted into one surface. The steps light up with it. SVG + CSS; reduced motion shows the finished roof.
const TORCH_STEPS = ['Down to the deck', 'Base sheet on the deck', 'Cap sheet torched, seams fused', 'Edges, walls and drains flashed'];
export function QhTorchDown({ caption, links = [] }) {
  const x0 = 64;
  const run = 420;
  return (
    <div className="qh-td">
      <svg className="qh-td-svg" viewBox="0 0 560 290" aria-hidden="true">
        <defs>
          <pattern id="qhTdGran" width="10" height="8" patternUnits="userSpaceOnUse">
            <rect width="10" height="8" fill="#e9edf0" />
            <circle cx="2" cy="2" r="1" fill="#c9ced3" />
            <circle cx="7" cy="5" r="1.1" fill="#d6dade" />
          </pattern>
          <radialGradient id="qhTdFlame" cx=".5" cy=".75" r=".6">
            <stop offset="0" stopColor="#fff2b0" />
            <stop offset=".45" stopColor="#ffb33c" />
            <stop offset="1" stopColor="#ff5a1f" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Drawn like the real thing (owner, November 11 2026; same cap sheet, glow, flashing, roll and torch motion, and the magnified seam):
            a stucco wall with a window and door, the deck on its joists, the base sheet with its laps, a parapet with coping and a cant strip,
            and the propane tank on its cart feeding the torch */}
        <linearGradient id="qhTdWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9d2c4" />
          <stop offset="1" stopColor="#b9b1a2" />
        </linearGradient>
        <linearGradient id="qhTdGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dcefff" />
          <stop offset="1" stopColor="#2f5f8f" />
        </linearGradient>
        <rect x={x0} y="194" width={run + 16} height="70" fill="url(#qhTdWall)" />
        <rect x={x0} y="194" width={run + 16} height="4" fill="rgba(0,0,0,.2)" />
        <rect x="120" y="212" width="52" height="40" rx="2" fill="#f3efe6" />
        <rect x="124" y="216" width="44" height="32" fill="url(#qhTdGlass)" />
        <path d="M146 216v32M124 232h44" stroke="#f3efe6" strokeWidth="2" />
        <rect x="300" y="212" width="52" height="40" rx="2" fill="#f3efe6" />
        <rect x="304" y="216" width="44" height="32" fill="url(#qhTdGlass)" />
        <path d="M326 216v32M304 232h44" stroke="#f3efe6" strokeWidth="2" />
        <rect x="396" y="210" width="40" height="54" rx="2" fill="#f3efe6" />
        <rect x="400" y="214" width="32" height="50" fill="#4a3a2c" />
        <circle cx="428" cy="240" r="1.6" fill="#d6c08a" />
        <path d="M30 264h520" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
        {[80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480].map((x) => <rect key={x} x={x} y="194" width="6" height="7" fill="#8a6a44" />)}
        <rect x="40" y="100" width="24" height="164" fill="#3b4652" stroke="rgba(255,255,255,.45)" strokeWidth="2" />
        <rect x="36" y="94" width="32" height="8" rx="2" fill="#a39b8c" stroke="rgba(0,0,0,.35)" />
        <path d={`M${x0} 175l8-8v8z`} fill="#5a6471" />
        <rect x={x0} y="182" width={run + 16} height="12" fill="#c39663" />
        <path d={`M${x0} 186h${run + 16}M${x0} 190h${run + 16}`} stroke="rgba(120,80,40,.25)" />
        <path d={`M${x0 + 110} 182v12M${x0 + 220} 182v12M${x0 + 330} 182v12`} stroke="#8a6a44" strokeWidth="1.5" />
        <rect x={x0} y="175" width={run + 16} height="7" fill="#4b525c" />
        <path d={`M${x0 + 140} 175v7M${x0 + 280} 175v7`} stroke="rgba(0,0,0,.4)" strokeWidth="1.2" />
        <path d={`M${x0} 176h${run + 16}`} stroke="rgba(255,255,255,.15)" />
        {/* the propane tank on its cart */}
        <rect x="486" y="128" width="26" height="44" rx="8" fill="#c9ced3" stroke="#8a949f" strokeWidth="1.5" />
        <rect x="494" y="120" width="10" height="10" rx="2" fill="#8a949f" />
        <circle cx="492" cy="174" r="4" fill="#2b323a" />
        <circle cx="508" cy="174" r="4" fill="#2b323a" />
        <path d={`M496 122c-20 -30 -60 -30 -110 -10`} fill="none" stroke="#9aa3ad" strokeWidth="2.5" strokeDasharray="4 3" />
        {/* the cap sheet as it's laid, its glowing seam, the flashing up the parapet */}
        <rect className="qh-td-cap" x={x0} y="168" width={run} height="7" fill="url(#qhTdGran)" />
        <rect className="qh-td-glow" x={x0} y="173" width={run} height="3" fill="#ffb33c" />
        <rect className="qh-td-flash" x={x0} y="132" width="7" height="43" fill="url(#qhTdGran)" stroke="#f0b43c" strokeWidth="1.5" />
        {/* the roll, the torch and its flame, moving together */}
        <g className="qh-td-roll">
          <circle cx={x0 + 20} cy="152" r="20" fill="#e9edf0" stroke="#aab2ba" strokeWidth="2" />
          <circle cx={x0 + 20} cy="152" r="7" fill="#8a949f" />
          <ellipse className="qh-td-fire" cx={x0 + 46} cy="166" rx="15" ry="11" fill="url(#qhTdFlame)" />
          <path d={`M${x0 + 56} 160L${x0 + 104} 118`} stroke="#9aa3ad" strokeWidth="5" strokeLinecap="round" />
          <path d={`M${x0 + 104} 118L${x0 + 122} 100`} stroke="#2d3540" strokeWidth="9" strokeLinecap="round" />
        </g>
        {/* the seam, magnified */}
        <g transform="translate(442 58)">
          <circle r="46" fill="#0d1a29" stroke="rgba(255,255,255,.5)" strokeWidth="2" />
          <clipPath id="qhTdLens">
            <circle r="44" />
          </clipPath>
          <g clipPath="url(#qhTdLens)">
            <rect x="-50" y="8" width="100" height="14" fill="#4b525c" />
            <rect x="-50" y="-6" width="58" height="14" fill="url(#qhTdGran)" />
            <rect x="0" y="-12" width="50" height="14" fill="url(#qhTdGran)" />
            <rect className="qh-td-bead" x="-4" y="-3" width="14" height="6" rx="3" fill="#ffb33c" />
          </g>
        </g>
        <text x="442" y="124" textAnchor="middle" fill="#cfe0f2" style={{ font: '700 12px var(--font-text), sans-serif' }}>
          Seams fused into one surface
        </text>
      </svg>
      <ol className="qh-sc-steps qh-td-steps">
        {TORCH_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Commercial Roof Replacement hero visual (owner, November 9 2026): "a new roof without closing your doors". A commercial roof from above in four
// sections, replaced one phase at a time on a 12 s loop (worn roof, torn off to the deck, new white membrane), with "Phase n of 4" counting up,
// while the storefront under it keeps its OPEN sign lit. SVG + CSS; reduced motion shows the finished roof.
export function QhPhasedReroof({ caption, links = [] }) {
  const sections = [0, 1, 2, 3];
  const X = 40;
  const Y = 34;
  const SW = 120;
  const SH = 168;
  return (
    <div className="qh-pr">
      <svg className="qh-pr-svg" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          {/* Drawn like the real thing (owner, November 11 2026; same phases, decks, new-roof fades, tags and OPEN sign): the worn roof as a
              dark granulated cap with patches, blisters and ponding, the deck as plywood with grain and seams, the new white membrane in courses;
              a parapet with coping, units with fans on flashed curbs, drains with strainers, and a storefront with glass, awnings and a door */}
          <filter id="qhPrGrain" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="6" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
          </filter>
          <pattern id="qhPrWorn" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="#5c6168" />
            <rect x="6" y="8" width="22" height="12" fill="#4c5056" stroke="rgba(0,0,0,.35)" />
            <ellipse cx="42" cy="40" rx="9" ry="5" fill="#696e75" />
            <ellipse cx="18" cy="46" rx="12" ry="5" fill="#4a5e74" opacity="0.7" />
          </pattern>
          <pattern id="qhPrPly" width="60" height="30" patternUnits="userSpaceOnUse">
            <rect width="60" height="30" fill="#c39663" />
            <path d="M0 29.5h60M30 0v30" stroke="#8d6b47" strokeWidth="1.2" />
            <path d="M0 8c10-2 20 2 30 0s20-2 30 0M0 20c10-2 20 2 30 0s20-2 30 0" fill="none" stroke="rgba(120,80,40,.25)" strokeWidth="1" />
          </pattern>
          <pattern id="qhPrNew" width="40" height="36" patternUnits="userSpaceOnUse">
            <rect width="40" height="36" fill="#eef2f6" />
            <path d="M0 35.5h40" stroke="#cfd6dd" strokeWidth="1.2" />
            <path d="M0 35h40" stroke="#fff" strokeWidth=".8" />
          </pattern>
          <linearGradient id="qhPrGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dcefff" />
            <stop offset="1" stopColor="#2f5f8f" />
          </linearGradient>
        </defs>
        {sections.map((i) => (
          <g key={i}>
            <rect x={X + i * SW} y={Y} width={SW} height={SH} fill="url(#qhPrWorn)" />
            <rect x={X + i * SW} y={Y} width={SW} height={SH} filter="url(#qhPrGrain)" opacity="0.35" style={{ mixBlendMode: 'multiply' }} />
            <rect className={`qh-pr-deck qh-pr-d${i + 1}`} x={X + i * SW} y={Y} width={SW} height={SH} fill="url(#qhPrPly)" />
            <rect className={`qh-pr-new qh-pr-n${i + 1}`} x={X + i * SW} y={Y} width={SW} height={SH} fill="url(#qhPrNew)" />
            <text x={X + i * SW + SW / 2} y={Y + SH - 12} textAnchor="middle" fill="rgba(11,27,46,.55)" style={{ font: '800 22px var(--font-text), sans-serif' }}>
              {i + 1}
            </text>
          </g>
        ))}
        {/* section lines, parapet, rooftop units and drains */}
        {[1, 2, 3].map((i) => (
          <path key={i} d={`M${X + i * SW} ${Y}V${Y + SH}`} stroke="#f0b43c" strokeWidth="2" strokeDasharray="6 5" />
        ))}
        <rect x={X - 6} y={Y - 6} width={SW * 4 + 12} height={SH + 12} rx="3" fill="none" stroke="#a39b8c" strokeWidth="6" />
        <rect x={X} y={Y} width={SW * 4} height={SH} fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="2" />
        {[[X + SW * 1.5, Y + 40], [X + SW * 3.4, Y + 70]].map(([x, y]) => (
          <g key={x}>
            <rect x={x - 26} y={y - 18} width="52" height="36" rx="3" fill="#8e8a80" stroke="#f0b43c" strokeWidth="2" />
            <rect x={x - 22} y={y - 14} width="44" height="28" rx="3" fill="#aeb6bf" stroke="#5d6570" strokeWidth="1.5" />
            <rect x={x - 22} y={y - 14} width="44" height="5" rx="2" fill="rgba(0,0,0,.2)" />
            <circle cx={x - 6} cy={y + 1} r="8" fill="#5b646e" stroke="rgba(255,255,255,.35)" />
            <path d={`M${x - 6} ${y - 7}v16M${x - 14} ${y + 1}h16`} stroke="rgba(255,255,255,.5)" strokeWidth="1.2" />
            <path d={`M${x + 6} ${y - 6}h12M${x + 6} ${y - 1}h12M${x + 6} ${y + 4}h12`} stroke="#4c555e" strokeWidth="1.6" />
          </g>
        ))}
        {[[X + SW * 0.5, Y + 110], [X + SW * 2.5, Y + 110]].map(([x, y]) => (
          <g key={x}>
            <circle cx={x} cy={y} r="8" fill="#2b323a" stroke="#9aa3ad" strokeWidth="1.5" />
            {[0, 60, 120].map((a) => <path key={a} d={`M${x} ${y - 7}v14`} stroke="rgba(255,255,255,.3)" strokeWidth="1.2" transform={`rotate(${a} ${x} ${y})`} />)}
          </g>
        ))}
        {/* the phase tag */}
        <g style={{ font: '700 13px var(--font-text), sans-serif' }}>
          {['Phase 1 of 4', 'Phase 2 of 4', 'Phase 3 of 4', 'Phase 4 of 4', 'New roof, open all along ✓'].map((t, i) => (
            <text key={t} className={`qh-pr-t qh-pr-t${i + 1}`} x="280" y="22" textAnchor="middle" fill="#f0b43c">
              {t}
            </text>
          ))}
        </g>
        {/* the storefront below, open for business */}
        <rect x={X} y={Y + SH} width={SW * 4} height="88" fill="#d9d2c4" />
        <rect x={X} y={Y + SH} width={SW * 4} height="6" fill="rgba(0,0,0,.2)" />
        {[0, 1, 3].map((i) => (
          <g key={i}>
            <path d={`M${X + 10 + i * SW} ${Y + SH + 12}h${SW - 20}l-4 8h${-(SW - 28)}z`} fill="#8b2f2f" />
            <rect x={X + 16 + i * SW} y={Y + SH + 22} width={SW - 32} height="50" rx="2" fill="url(#qhPrGlass)" stroke="#e8ecf0" strokeWidth="2" />
            <path d={`M${X + 16 + i * SW + (SW - 32) / 2} ${Y + SH + 22}v50`} stroke="#e8ecf0" strokeWidth="2" />
          </g>
        ))}
        <rect x={X + SW * 2 + 34} y={Y + SH + 22} width="52" height="66" fill="url(#qhPrGlass)" stroke="#5d6570" strokeWidth="2" />
        <path d={`M${X + SW * 2 + 60} ${Y + SH + 22}v66`} stroke="#5d6570" strokeWidth="2" />
        <path d={`M${X} ${Y + SH + 88}h${SW * 4}`} stroke="rgba(255,255,255,.35)" strokeWidth="2" />
        <g className="qh-pr-open">
          <rect x={X + SW * 2 + 26} y={Y + SH + 4} width="68" height="16" rx="8" fill="#f0b43c" />
          <text x={X + SW * 2 + 60} y={Y + SH + 16} textAnchor="middle" fill="#0b1b2e" style={{ font: '800 11px var(--font-text), sans-serif', letterSpacing: '.12em' }}>
            OPEN
          </text>
        </g>
      </svg>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// TPO Roofing hero visual (owner, November 9 2026): a white TPO roof from above on a 10 s loop. A hot-air welder travels along the seam between two
// rolls and leaves a fused seam behind it (the earlier seam already welded), around a flashed rooftop curb; then sunlight comes in and bounces off
// the white membrane. Labelled "Seams welded with hot air" and "White surface reflects sunlight". SVG + CSS; reduced motion shows it finished.
export function QhTpoWeld({ caption, links = [] }) {
  const X = 40;
  const W = 480;
  const seams = [108, 178];
  // Drawn like the real thing (owner, November 11 2026; same seams, weld line, heat, welder path, sun rays and labels): a parapet with coping
  // around the white membrane, the rolls' overlaps with a lit edge and the fastener plates along the lap, a rooftop unit with its fan on a
  // membrane-flashed curb, a drain with a strainer and a pipe boot, and a walk pad.
  return (
    <div className="qh-tp">
      <svg className="qh-tp-svg" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <linearGradient id="qhTpMem" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6f8fa" />
            <stop offset="1" stopColor="#dfe5eb" />
          </linearGradient>
          <linearGradient id="qhTpCoping" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b9b4a8" />
            <stop offset="1" stopColor="#8d897f" />
          </linearGradient>
        </defs>
        <rect x={X - 10} y="30" width={W + 20} height="238" rx="5" fill="url(#qhTpCoping)" stroke="rgba(0,0,0,.35)" />
        <path d={`M${X - 4} 36h${W + 8}v226H${X - 4}z M${X} 40v218h${W}V40z`} fill="#4c5159" fillRule="evenodd" />
        <rect x={X} y="40" width={W} height="218" rx="2" fill="url(#qhTpMem)" />
        {/* Roll edges and their overlaps, with the fastener plates along each lap */}
        {seams.map((y) => (
          <g key={y}>
            <rect x={X} y={y - 6} width={W} height="12" fill="#e1e6eb" />
            <path d={`M${X} ${y - 6}h${W}`} stroke="#fff" strokeWidth="1.2" />
            {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={X + 24 + i * 40} cy={y + 2} r="3" fill="#c4ccd4" stroke="#9aa3ad" />)}
          </g>
        ))}
        <rect x={X} y={seams[0] - 1.5} width={W} height="3" fill="#aab3bc" />
        <rect className="qh-tp-weld" x={X} y={seams[1] - 1.5} width={W} height="3" fill="#aab3bc" />
        <rect className="qh-tp-heat" x={X} y={seams[1] - 4} width={W} height="8" fill="#ffb33c" opacity=".35" />
        {/* The unit on its membrane-flashed curb, the drain, the pipe boot and a walk pad */}
        <rect x="190" y="208" width="74" height="40" rx="3" fill="#c4ccd4" stroke="#f0b43c" strokeWidth="3" />
        <rect x="198" y="214" width="58" height="28" rx="2" fill="#8a949f" />
        <rect x="198" y="214" width="58" height="5" rx="2" fill="rgba(0,0,0,.2)" />
        <circle cx="227" cy="228" r="9" fill="#5b646e" stroke="rgba(255,255,255,.35)" />
        <path d="M227 219v18M218 228h18M221 222l12 12M233 222l-12 12" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" />
        <rect x="240" y="220" width="12" height="16" fill="#6f7882" stroke="rgba(0,0,0,.3)" />
        <circle cx="90" cy="230" r="9" fill="#2b323a" stroke="#9aa3ad" strokeWidth="1.5" />
        {[0, 45, 90, 135].map((a) => <path key={a} d="M90 222v16" stroke="rgba(255,255,255,.3)" strokeWidth="1.2" transform={`rotate(${a} 90 230)`} />)}
        <circle cx="420" cy="80" r="9" fill="#c4ccd4" stroke="#f0b43c" strokeWidth="2" />
        <circle cx="420" cy="80" r="4" fill="#3b4047" />
        {[150, 168].map((x) => <rect key={x} x={x} y="226" width="16" height="12" rx="2" fill="#aeb4ba" stroke="rgba(40,50,60,.35)" />)}
        {/* the welder on the seam */}
        <g className="qh-tp-welder">
          <rect x={X - 20} y={seams[1] - 20} width="38" height="40" rx="6" fill="#3b4652" stroke="#f0b43c" strokeWidth="2" />
          <rect x={X + 14} y={seams[1] - 4} width="14" height="8" rx="2" fill="#ffb33c" />
          <path d={`M${X - 6} ${seams[1] - 20}V${seams[1] - 44}H${X - 26}`} stroke="#9aa3ad" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
        {/* sunlight, reflected */}
        <g className="qh-tp-sun">
          <circle cx="64" cy="10" r="16" fill="#f0b43c" />
          {[0, 1, 2].map((i) => (
            <path key={i} className={`qh-tp-ray qh-tp-ray${i + 1}`} d={`M${120 + i * 130} -4L${165 + i * 130} 92L${210 + i * 130} -4`} stroke="#f0b43c" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" />
          ))}
        </g>
        <g style={{ font: '700 12.5px var(--font-text), sans-serif' }}>
          <g className="qh-tp-lab1">
            <rect x="300" y={seams[1] + 14} width="196" height="24" rx="12" fill="#0b1b2e" opacity=".85" />
            <text x="398" y={seams[1] + 30} textAnchor="middle" fill="#f0b43c">Seams welded with hot air</text>
          </g>
          <g className="qh-tp-lab2">
            <rect x="60" y="126" width="210" height="24" rx="12" fill="#0b1b2e" opacity=".85" />
            <text x="165" y="142" textAnchor="middle" fill="#f0b43c">White surface reflects sunlight</text>
          </g>
        </g>
      </svg>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Cool Roofing hero visual (owner, November 9 2026): two homes in the sun on a 12 s loop. Sunlight hits both; the standard dark roof soaks it up and
// heat rises into a red-tinted attic, while the cool roof reflects it back and its attic stays blue; then the cool roof cycles through four of the
// eleven cool shingle colors (data/roofColors.js), down to Midnight, because a cool roof doesn't have to be white. SVG + CSS; reduced motion shows
// the comparison, still.
export function QhCoolRoof({ colors = [], caption, links = [] }) {
  const pick = ['shasta-white', 'amber', 'copper-trail', 'midnight'].map((id) => colors.find((c) => c.id === id)).filter(Boolean);
  // Drawn like the real thing (owner, November 11 2026; same attic fills, sun rays, heat waves and color cycle): each home a stucco wall with
  // framed windows and a door, rafters in the attic, a ridge cap, gutters and a drip edge, and shingle courses over the roof color.
  const house = (x, roofFill, attic, cls, pat) => (
    <g className={cls}>
      <rect x={x + 20} y="160" width="200" height="96" fill="url(#qhCrWall)" />
      <rect x={x + 20} y="160" width="200" height="4" fill="rgba(0,0,0,.2)" />
      <rect x={x + 38} y="184" width="44" height="34" rx="2" fill="#f3efe6" />
      <rect x={x + 41} y="187" width="38" height="28" fill="url(#qhCrGlass)" />
      <path d={`M${x + 60} 187v28M${x + 41} 201h38`} stroke="#f3efe6" strokeWidth="2" />
      <rect x={x + 158} y="184" width="44" height="34" rx="2" fill="#f3efe6" />
      <rect x={x + 161} y="187" width="38" height="28" fill="url(#qhCrGlass)" />
      <path d={`M${x + 180} 187v28M${x + 161} 201h38`} stroke="#f3efe6" strokeWidth="2" />
      <rect x={x + 93} y="197" width="54" height="59" rx="2" fill="#f3efe6" />
      <rect x={x + 96} y="200" width="48" height="56" fill="#4a3a2c" />
      <rect x={x + 104} y="206" width="32" height="16" fill="url(#qhCrGlass)" opacity="0.9" />
      <circle cx={x + 138} cy="232" r="1.8" fill="#d6c08a" />
      <path className="qh-cr-attic" d={`M${x + 20} 160L${x + 120} 112L${x + 220} 160Z`} fill={attic} />
      {[x + 50, x + 80, x + 160, x + 190].map((rx) => (
        <path key={rx} d={`M${rx} ${rx < x + 120 ? 160 - (rx - x - 20) * 0.48 + 6 : 160 - (x + 220 - rx) * 0.48 + 6}V160`} stroke="#8d6b47" strokeWidth="3" />
      ))}
      <path d={`M${x} 166L${x + 120} 96L${x + 240} 166`} fill="none" stroke={roofFill} strokeWidth="14" strokeLinejoin="round" />
      {pat && <path d={`M${x} 166L${x + 120} 96L${x + 240} 166`} fill="none" stroke={pat} strokeWidth="14" strokeLinejoin="round" />}
      <path d={`M${x + 112} 102l8-6 8 6`} fill="none" stroke="rgba(0,0,0,.45)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M${x - 4} 172h48M${x + 196} 172h48`} stroke="#aeb6bf" strokeWidth="4" strokeLinecap="round" />
      <path d={`M${x - 2} 174v82M${x + 242} 174v82`} stroke="#aeb6bf" strokeWidth="3" />
      <path d={`M${x + 20} 256h200`} stroke="rgba(255,255,255,.3)" strokeWidth="2" />
    </g>
  );
  return (
    <div className="qh-cr">
      <svg className="qh-cr-svg" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <linearGradient id="qhCrWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ded6c7" />
            <stop offset="1" stopColor="#bbb2a2" />
          </linearGradient>
          <linearGradient id="qhCrGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dcefff" />
            <stop offset="1" stopColor="#2f5f8f" />
          </linearGradient>
          <pattern id="qhCrCourses" width="26" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
            <path d="M0 13.5H26" stroke="rgba(0,0,0,.35)" strokeWidth="1.5" />
            <path d="M13 0V13" stroke="rgba(0,0,0,.2)" strokeWidth="1" />
          </pattern>
        </defs>
        <circle cx="280" cy="22" r="18" fill="#f0b43c" />
        <circle cx="280" cy="22" r="24" fill="none" stroke="#f0b43c" strokeWidth="1.5" strokeDasharray="4 6" />
        {/* left: a standard dark roof, soaking up the sun */}
        {house(18, '#2b2e33', 'rgba(255,90,60,.32)', 'qh-cr-hot', 'url(#qhCrCourses)')}
        <path className="qh-cr-in qh-cr-in1" d="M262 34L150 106" stroke="#f0b43c" strokeWidth="3" strokeLinecap="round" pathLength="1" strokeDasharray="1" />
        {[118, 138, 158].map((x, i) => (
          <path key={x} className={`qh-cr-heat qh-cr-heat${i + 1}`} d={`M${x} 154c-6 -8 6 -12 0 -20c-6 -8 6 -12 0 -20`} stroke="#ff7a50" strokeWidth="3" fill="none" strokeLinecap="round" />
        ))}
        {/* right: a cool roof, reflecting it back, in four colors */}
        {house(302, 'transparent', 'rgba(124,196,255,.18)', 'qh-cr-cool', null)}
        {pick.map((c, i) => (
          <g key={c.id} className={`qh-cr-c qh-cr-c${i + 1}`}>
            <path d="M302 166L422 96L542 166" fill="none" stroke={c.hex} strokeWidth="14" strokeLinejoin="round" />
            <path d="M302 166L422 96L542 166" fill="none" stroke="url(#qhCrCourses)" strokeWidth="14" strokeLinejoin="round" />
            <path d="M414 102l8-6 8 6" fill="none" stroke="rgba(0,0,0,.4)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
        <path className="qh-cr-in qh-cr-in2" d="M298 34L410 106L470 30" stroke="#f0b43c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" pathLength="1" strokeDasharray="1" />
        <g style={{ font: '700 12.5px var(--font-text), sans-serif' }}>
          <text x="138" y="282" textAnchor="middle" fill="#9fb8d2">Standard dark roof</text>
          <text x="422" y="282" textAnchor="middle" fill="#f0b43c">Cool roof</text>
          {pick.map((c, i) => (
            <text key={c.id} className={`qh-cr-n qh-cr-n${i + 1}`} x="422" y="298" textAnchor="middle" fill="#cfe0f2" style={{ font: '600 11.5px var(--font-text), sans-serif' }}>
              {c.name}, SRI 20+
            </text>
          ))}
        </g>
      </svg>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Commercial Roof Repair hero visual (owner, November 9 2026): a commercial building in cross-section with three tenant suites, on an 11 s loop.
// Water gets in at a roof drain above Suite A, travels along the deck and drips into a bucket in Suite C; a ring traces it from the drip back to
// the drain, the drain flashing is repaired, and a before-and-after photo card comes up, "Sent to owners and tenants". SVG + CSS; reduced motion
// shows the repaired roof with the photo card.
export function QhCommercialFix({ caption, links = [] }) {
  // Drawn like the real thing (owner, November 11 2026; same water path, drip, bucket, rings, suite names and photo card): a commercial building
  // in cross-section with a stucco face, storefront glass and doors for the three suites, the parapets with coping and cant strips, the deck on
  // its joists, the granulated cap sheet, a rooftop unit with its fan on a flashed curb, the drain with its strainer and a pipe boot.
  return (
    <div className="qh-cf">
      <svg className="qh-cf-svg" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <linearGradient id="qhCfWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9d2c4" />
            <stop offset="1" stopColor="#b9b1a2" />
          </linearGradient>
          <linearGradient id="qhCfGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dcefff" />
            <stop offset="0.5" stopColor="#7fb4e6" />
            <stop offset="1" stopColor="#2f5f8f" />
          </linearGradient>
          <linearGradient id="qhCfUnit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#aeb6bf" />
            <stop offset="1" stopColor="#6f7882" />
          </linearGradient>
          <filter id="qhCfGrain" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
          </filter>
        </defs>
        {/* The building: wall, the three suites' storefronts, the deck on its joists, the cap sheet and the parapets */}
        <rect x="40" y="104" width="480" height="150" fill="url(#qhCfWall)" />
        <rect x="40" y="104" width="480" height="150" filter="url(#qhCfGrain)" opacity="0.2" style={{ mixBlendMode: 'multiply' }} />
        <path d="M200 104V254M360 104V254" stroke="rgba(0,0,0,.25)" strokeWidth="3" />
        {[56, 216, 376].map((x) => (
          <g key={x}>
            <rect x={x} y="196" width="128" height="58" fill="#e8ecf0" />
            <rect x={x + 4} y="200" width="78" height="54" fill="url(#qhCfGlass)" />
            <path d={`M${x + 43} 200v54`} stroke="#e8ecf0" strokeWidth="2" />
            <rect x={x + 90} y="206" width="30" height="48" fill="url(#qhCfGlass)" opacity="0.85" />
            <path d={`M${x + 90} 206h30v48`} fill="none" stroke="#5d6570" strokeWidth="2" />
            <circle cx={x + 114} cy="232" r="1.8" fill="#2b323a" />
            <path d={`M${x + 8} 206l10-2`} stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeLinecap="round" />
          </g>
        ))}
        <path d="M24 254h512" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
        {[60, 100, 140, 180, 240, 280, 320, 400, 440, 480].map((x) => <rect key={x} x={x} y="104" width="6" height="8" fill="#8a6a44" />)}
        <rect x="40" y="94" width="480" height="10" fill="#c39663" />
        <path d="M40 98h480M40 101h480" stroke="rgba(120,80,40,.25)" />
        <rect x="40" y="88" width="480" height="6" fill="#d9dee3" />
        <rect x="40" y="88" width="480" height="6" filter="url(#qhCfGrain)" opacity="0.3" style={{ mixBlendMode: 'multiply' }} />
        <path d="M40 88h480" stroke="#fff" />
        <rect x="24" y="60" width="16" height="44" fill="#3b4652" stroke="rgba(255,255,255,.45)" strokeWidth="2" />
        <rect x="520" y="60" width="16" height="44" fill="#3b4652" stroke="rgba(255,255,255,.45)" strokeWidth="2" />
        <rect x="21" y="56" width="22" height="6" rx="2" fill="#a39b8c" stroke="rgba(0,0,0,.3)" />
        <rect x="517" y="56" width="22" height="6" rx="2" fill="#a39b8c" stroke="rgba(0,0,0,.3)" />
        <path d="M40 88l6-6v6zM520 88l-6-6v6z" fill="#5a6471" />
        <path d="M40 66v22M520 66v22" stroke="var(--qh-sun)" strokeWidth="3" strokeLinecap="round" />
        {/* Rooftop unit on its flashed curb, and a pipe boot */}
        <rect x="282" y="82" width="86" height="6" fill="#59606a" />
        <path d="M282 88l-6 0 6-5zM368 88l6 0-6-5z" fill="#59606a" />
        <rect x="290" y="56" width="70" height="32" rx="3" fill="url(#qhCfUnit)" stroke="#5d6570" strokeWidth="1.5" />
        <rect x="290" y="56" width="70" height="6" rx="2" fill="rgba(0,0,0,.2)" />
        <circle cx="308" cy="73" r="9" fill="#4c555e" stroke="rgba(255,255,255,.35)" />
        <path d="M308 64v18M299 73h18M302 67l12 12M314 67l-12 12" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" />
        <path d="M326 66h26M326 72h26M326 78h26" stroke="#4c555e" strokeWidth="2" />
        <path d="M278 82v6M372 82v6" stroke="var(--qh-sun)" strokeWidth="3" strokeLinecap="round" />
        <rect x="412" y="72" width="6" height="16" fill="#2b323a" />
        <path d="M406 88h18l-3-6h-12z" fill="#9f9a90" stroke="var(--qh-sun)" strokeWidth="1.5" />
        {/* rooftop unit and the drain */}
        <rect x="290" y="56" width="70" height="32" rx="3" fill="#8a949f" stroke="#5d6570" strokeWidth="2" />
        <rect x="282" y="82" width="86" height="6" fill="#59606a" />
        <ellipse cx="130" cy="88" rx="16" ry="4" fill="#2b323a" stroke="#9aa3ad" strokeWidth="1.2" />
        <path d="M118 88h24M124 86h12M124 90h12" stroke="rgba(255,255,255,.3)" strokeWidth="1" />
        <ellipse className="qh-cf-fixed" cx="130" cy="88" rx="22" ry="6" fill="none" stroke="#f0b43c" strokeWidth="3" />
        {/* the water: in at the drain, along the deck, down into Suite C */}
        <path className="qh-cf-path" d="M130 90V99H452V200" pathLength="1" stroke="#7cc4ff" strokeWidth="3" strokeDasharray="1" fill="none" strokeLinejoin="round" />
        <circle className="qh-cf-drip" cx="452" cy="206" r="4" fill="#7cc4ff" />
        <path d="M436 226h32l-4 26h-24Z" fill="#59606a" stroke="#8a949f" strokeWidth="2" />
        <circle className="qh-cf-ring" cx="452" cy="96" r="22" fill="none" stroke="#f0b43c" strokeWidth="3" strokeDasharray="6 5" />
        <g style={{ font: '700 12px var(--font-text), sans-serif' }} fill="#9fb8d2">
          <text x="120" y="244" textAnchor="middle">Suite A</text>
          <text x="280" y="244" textAnchor="middle">Suite B</text>
          <text x="400" y="244" textAnchor="middle">Suite C</text>
        </g>
        {/* the photo record */}
        <g className="qh-cf-card">
          <rect x="196" y="118" width="196" height="96" rx="10" fill="#fff" />
          <rect x="208" y="130" width="80" height="52" rx="4" fill="#3b4652" />
          <ellipse cx="248" cy="160" rx="16" ry="5" fill="#1b2633" />
          <path d="M236 152l8 8M252 150l-6 10" stroke="#7cc4ff" strokeWidth="2" />
          <rect x="300" y="130" width="80" height="52" rx="4" fill="#3b4652" />
          <ellipse cx="340" cy="160" rx="16" ry="5" fill="#1b2633" />
          <ellipse cx="340" cy="160" rx="22" ry="7" fill="none" stroke="#f0b43c" strokeWidth="2.5" />
          <g style={{ font: '700 10.5px var(--font-text), sans-serif' }}>
            <text x="248" y="176" textAnchor="middle" fill="#fff">Before</text>
            <text x="340" y="176" textAnchor="middle" fill="#fff">After</text>
            <text x="294" y="203" textAnchor="middle" fill="#0b1b2e" style={{ font: '700 11.5px var(--font-text), sans-serif' }}>Sent to owners and tenants</text>
          </g>
        </g>
      </svg>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Attic Ventilation hero visual (owner, November 9 2026): a house's attic in cross-section on a 10 s loop. First the intake at the eaves is blocked
// by insulation and the attic glows hot ("Intake blocked"); the eaves are cleared (a gold ring, baffles in); then cool air flows in low at the
// eaves and warm air leaves at the ridge vent, and the attic turns cool: "Air in low, out high". SVG + CSS; reduced motion shows the flowing state.
export function QhAtticFlow({ caption, links = [] }) {
  const flow = (d, cls) => <path className={`qh-af-flow ${cls}`} d={d} fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 12" />;
  // Drawn like the real thing (owner, November 11 2026; same hot and cool fills, blocks, baffles, airflow and tags): the shingle roof over its
  // rafters with a ridge vent, soffit vents under the eaves, insulation batts between the ceiling joists, a drywall ceiling and the room below
  // with a window and a door.
  return (
    <div className="qh-af">
      <svg className="qh-af-svg" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <marker id="qhAfArrowC" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#7cc4ff" /></marker>
          <marker id="qhAfArrowW" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#ffa35c" /></marker>
          <pattern id="qhAfShingle" width="40" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(-31)">
            <rect width="40" height="13" fill="#4a515b" />
            <path d="M0 12.5H40" stroke="rgba(0,0,0,.5)" strokeWidth="1.6" />
            <path d="M10 0V12M30 6V12" stroke="rgba(0,0,0,.3)" strokeWidth="1" />
          </pattern>
          <pattern id="qhAfShingleR" width="40" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(31)">
            <rect width="40" height="13" fill="#4a515b" />
            <path d="M0 12.5H40" stroke="rgba(0,0,0,.5)" strokeWidth="1.6" />
            <path d="M10 0V12M30 6V12" stroke="rgba(0,0,0,.3)" strokeWidth="1" />
          </pattern>
          <pattern id="qhAfBatt" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill="#e6a1b5" />
            <path d="M0 6c3-4 6 4 12 0" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
          </pattern>
          <linearGradient id="qhAfWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#efe9df" />
            <stop offset="1" stopColor="#d9d1c3" />
          </linearGradient>
        </defs>
        {/* The room below */}
        <rect x="70" y="206" width="420" height="70" fill="url(#qhAfWall)" />
        <rect x="70" y="270" width="420" height="6" fill="#9c7a52" />
        <rect x="70" y="266" width="420" height="3" fill="#fff" />
        <rect x="372" y="222" width="52" height="36" rx="2" fill="#fff" />
        <rect x="376" y="226" width="44" height="28" fill="#7fb4e6" />
        <path d="M398 226v28M376 240h44" stroke="#fff" strokeWidth="2" />
        <rect x="140" y="226" width="32" height="44" fill="#4a3a2c" />
        <circle cx="167" cy="250" r="1.6" fill="#d6c08a" />
        <path d="M70 206V276M490 206V276" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
        {/* The attic space, hot then cool */}
        <path className="qh-af-hot" d="M70 196L280 70L490 196Z" fill="rgba(255,90,60,.34)" />
        <path className="qh-af-cool" d="M70 196L280 70L490 196Z" fill="rgba(124,196,255,.16)" />
        {/* Rafters and the ridge board */}
        {[120, 170, 220, 340, 390, 440].map((x) => (
          <path key={x} d={`M${x} ${x < 280 ? 196 - (x - 60) * 0.6 + 8 : 196 - (500 - x) * 0.6 + 8}V196`} stroke="#8d6b47" strokeWidth="5" />
        ))}
        <path d="M280 72V196" stroke="#8d6b47" strokeWidth="5" />
        {/* The roof: deck, shingles on each slope, the ridge vent with its slot, fascia and soffit vents */}
        <path d="M40 206L280 62L520 206" fill="none" stroke="#c39663" strokeWidth="8" strokeLinejoin="round" />
        <path d="M34 204L280 56L280 68L46 208Z" fill="url(#qhAfShingle)" />
        <path d="M280 56L526 204L514 208L280 68Z" fill="url(#qhAfShingleR)" />
        <path d="M34 204L280 56L526 204" fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="2" strokeLinejoin="round" />
        <rect x="258" y="46" width="44" height="12" rx="3" fill="#8a949f" stroke="#5d6570" strokeWidth="2" />
        <path d="M264 52h32" stroke="#2b323a" strokeWidth="2" strokeDasharray="3 2" />
        <path d="M40 206h30M490 206h30" stroke="#aeb6bf" strokeWidth="6" />
        <path d="M44 209h22M494 209h22" stroke="#2b323a" strokeWidth="2" strokeDasharray="2 2" />
        {/* Ceiling joists, insulation batts and the drywall ceiling */}
        <rect x="70" y="196" width="420" height="10" fill="#c39663" />
        <rect x="70" y="182" width="420" height="14" fill="url(#qhAfBatt)" />
        {[70, 118, 166, 214, 262, 310, 358, 406, 454, 484].map((x) => (
          <rect key={x} x={x} y="180" width="6" height="16" fill="#b98b57" stroke="rgba(0,0,0,.3)" />
        ))}
        <rect x="70" y="204" width="420" height="4" fill="#f6f2ea" />
        {/* the insulation blocking the eaves, and the baffles that clear them */}
        <g className="qh-af-block">
          <ellipse cx="88" cy="190" rx="22" ry="12" fill="url(#qhAfBatt)" stroke="#c98aa0" />
          <ellipse cx="472" cy="190" rx="22" ry="12" fill="url(#qhAfBatt)" stroke="#c98aa0" />
          <path d="M70 168l20 20M90 168l-20 20M470 168l20 20M490 168l-20 20" stroke="#ff7a50" strokeWidth="3.5" strokeLinecap="round" />
        </g>
        <g className="qh-af-fix">
          <path d="M66 198L104 176M494 198L456 176" stroke="#f0b43c" strokeWidth="4" strokeLinecap="round" />
          <circle cx="86" cy="190" r="24" fill="none" stroke="#f0b43c" strokeWidth="2.5" strokeDasharray="5 4" />
          <circle cx="474" cy="190" r="24" fill="none" stroke="#f0b43c" strokeWidth="2.5" strokeDasharray="5 4" />
        </g>
        {/* the airflow */}
        <g className="qh-af-air">
          <g stroke="#7cc4ff" markerEnd="url(#qhAfArrowC)">
            {flow('M30 222Q70 214 96 184Q150 150 210 128', 'c1')}
            {flow('M530 222Q490 214 464 184Q410 150 350 128', 'c2')}
          </g>
          <g stroke="#ffa35c" markerEnd="url(#qhAfArrowW)">
            {flow('M236 112Q262 88 270 40', 'w1')}
            {flow('M324 112Q298 88 290 40', 'w2')}
          </g>
        </g>
        <g style={{ font: '700 12.5px var(--font-text), sans-serif' }}>
          <g className="qh-af-tag1">
            <rect x="200" y="140" width="160" height="26" rx="13" fill="#0b1b2e" opacity=".85" />
            <text x="280" y="157" textAnchor="middle" fill="#ff9a70">Intake blocked</text>
          </g>
          <g className="qh-af-tag2">
            <rect x="196" y="140" width="168" height="26" rx="13" fill="#0b1b2e" opacity=".85" />
            <text x="280" y="157" textAnchor="middle" fill="#f0b43c">Air in low, out high ✓</text>
          </g>
          <text x="40" y="244" fill="#9fb8d2" style={{ font: '600 11.5px var(--font-text), sans-serif' }}>Eave intake</text>
          <text x="280" y="32" textAnchor="middle" fill="#9fb8d2" style={{ font: '600 11.5px var(--font-text), sans-serif' }}>Ridge exhaust</text>
        </g>
      </svg>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Commercial Roof Maintenance hero visual (owner, November 9 2026): three scheduled visits to a commercial roof on a 12 s loop. Visit 1 clears a
// drain choked with leaves, visit 2 reseals the cracked flashing at a pipe, visit 3 seals a split at the parapet; each ends with a camera flash and
// a photo report card added to the stack beside the roof, while a timeline fills in visit by visit. SVG + CSS; reduced motion shows all three done.
export function QhRoofCare({ caption, links = [] }) {
  // Drawn like the real thing (owner, November 11 2026; same visits, leaves, crack, split, rings, flash, reports and timeline): a parapet with
  // coping around a white granulated cap sheet in courses, a rooftop unit with its fan on a flashed curb, a walk pad, the drain with its dome
  // strainer and the pipe with its boot.
  return (
    <div className="qh-rc">
      <svg className="qh-rc-svg" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <filter id="qhRcGrain" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="9" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
          </filter>
          <linearGradient id="qhRcCoping" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b9b4a8" />
            <stop offset="1" stopColor="#8d897f" />
          </linearGradient>
          <linearGradient id="qhRcUnit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b7bec6" />
            <stop offset="1" stopColor="#7f8891" />
          </linearGradient>
        </defs>
        {/* The roof: parapet with coping, the cap sheet, its courses and crickets */}
        <rect x="22" y="22" width="386" height="212" rx="5" fill="url(#qhRcCoping)" stroke="rgba(0,0,0,.35)" />
        <path d="M30 30h370v196H30z M38 38v180h354V38z" fill="#4c5159" fillRule="evenodd" />
        <rect x="38" y="38" width="354" height="180" fill="#d9dee3" />
        <rect x="38" y="38" width="354" height="180" filter="url(#qhRcGrain)" opacity="0.3" style={{ mixBlendMode: 'multiply' }} />
        {[74, 110, 146, 182].map((y) => (
          <g key={y}>
            <path d={`M38 ${y}h354`} stroke="rgba(255,255,255,.6)" strokeWidth="1.2" />
            <path d={`M38 ${y + 1.5}h354`} stroke="rgba(40,50,60,.28)" strokeWidth="1.6" />
          </g>
        ))}
        <path d="M38 38l130 90-130 90M392 38l-130 90 130 90" fill="none" stroke="rgba(40,50,60,.18)" strokeWidth="1.2" />
        <ellipse cx="96" cy="182" rx="50" ry="34" fill="rgba(0,0,0,.14)" />
        {/* The unit on its flashed curb, with its fan, panel and a walk pad */}
        <rect x="230" y="44" width="88" height="50" rx="3" fill="#8e8a80" stroke="var(--qh-sun)" strokeWidth="2.5" />
        <rect x="236" y="48" width="76" height="40" rx="3" fill="url(#qhRcUnit)" stroke="#5d6570" strokeWidth="1.5" />
        <rect x="236" y="48" width="76" height="7" rx="2" fill="rgba(0,0,0,.18)" />
        <circle cx="290" cy="70" r="12" fill="#5b646e" stroke="rgba(0,0,0,.35)" />
        <path d="M290 60v20M280 70h20M283 63l14 14M297 63l-14 14" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" />
        <rect x="242" y="60" width="24" height="22" rx="1" fill="#6f7882" stroke="rgba(0,0,0,.3)" />
        <path d="M245 65h18M245 70h18M245 75h18" stroke="rgba(0,0,0,.3)" strokeWidth="1.2" />
        {[196, 214].map((x) => <rect key={x} x={x} y="62" width="16" height="12" rx="2" fill="#aeb4ba" stroke="rgba(40,50,60,.35)" />)}
        {/* visit 1: the drain, choked then clear */}
        <circle cx="96" cy="182" r="13" fill="#2b323a" stroke="#9aa3ad" strokeWidth="1.5" />
        {[0, 45, 90, 135].map((a) => <path key={a} d="M96 171v22" stroke="rgba(255,255,255,.3)" strokeWidth="1.2" transform={`rotate(${a} 96 182)`} />)}
        <circle cx="96" cy="182" r="3" fill="#0c1013" />
        <g className="qh-rc-leaves">
          {[[86, 176], [100, 172], [106, 186], [90, 190], [96, 182]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="7" ry="4" fill={i % 2 ? '#8a6d3b' : '#6f7a3a'} transform={`rotate(${i * 40} ${x} ${y})`} />
          ))}
        </g>
        <circle className="qh-rc-ok qh-rc-ok1" cx="96" cy="182" r="22" fill="none" stroke="#f0b43c" strokeWidth="3" />
        {/* visit 2: a pipe, its flashing cracked then resealed */}
        <circle cx="170" cy="70" r="11" fill="#9f9a90" stroke="var(--qh-sun)" strokeWidth="2" />
        <circle cx="170" cy="70" r="6" fill="#3b4047" />
        <circle cx="170" cy="70" r="3" fill="#14181c" />
        <path className="qh-rc-crack" d="M158 62l6 6-4 5 7 6" stroke="#3a1a0e" strokeWidth="2.5" fill="none" />
        <circle className="qh-rc-ok qh-rc-ok2" cx="170" cy="70" r="16" fill="none" stroke="#f0b43c" strokeWidth="4" />
        {/* visit 3: a split at the parapet, then sealed */}
        <path className="qh-rc-split" d="M344 226l8 -10 6 10 8 -10" stroke="#3a1a0e" strokeWidth="3" fill="none" />
        <rect className="qh-rc-ok qh-rc-ok3" x="334" y="214" width="42" height="12" rx="3" fill="#f0b43c" />
        <rect className="qh-rc-flash" x="30" y="30" width="370" height="196" rx="4" fill="#fff" />
        {/* the photo reports, stacking up */}
        {[0, 1, 2].map((i) => (
          <g key={i} className={`qh-rc-rep qh-rc-rep${i + 1}`} transform={`translate(${430 + i * 8} ${150 - i * 30})`}>
            <rect width="100" height="74" rx="6" fill="#fff" stroke="#cfd6dd" />
            <rect x="8" y="8" width="38" height="28" rx="3" fill="#3b4652" />
            <rect x="52" y="10" width="40" height="5" rx="2" fill="#c3cad1" />
            <rect x="52" y="20" width="32" height="5" rx="2" fill="#c3cad1" />
            <rect x="8" y="44" width="84" height="5" rx="2" fill="#dfe4e8" />
            <text x="50" y="66" textAnchor="middle" fill="#0b1b2e" style={{ font: '700 10.5px var(--font-text), sans-serif' }}>
              Visit {i + 1} report
            </text>
          </g>
        ))}
        {/* the visit timeline */}
        <path d="M60 262H520" stroke="rgba(255,255,255,.3)" strokeWidth="3" />
        <path className="qh-rc-line" d="M60 262H520" stroke="#f0b43c" strokeWidth="3" pathLength="1" strokeDasharray="1" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={120 + i * 160} cy="262" r="9" fill="#0d1a29" stroke="rgba(255,255,255,.5)" strokeWidth="2" />
            <circle className={`qh-rc-dot qh-rc-dot${i + 1}`} cx={120 + i * 160} cy="262" r="6" fill="#f0b43c" />
            <text x={120 + i * 160} y="290" textAnchor="middle" fill="#9fb8d2" style={{ font: '700 12px var(--font-text), sans-serif' }}>
              {['Drains cleared', 'Flashings resealed', 'Parapet sealed'][i]}
            </text>
          </g>
        ))}
      </svg>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Roofing FAQ hero visual (owner, November 9 2026): "ask a roofer". Four real questions from the page cycle on a 16 s loop as a chat: the question
// comes in, typing dots, then the first sentence of the page's own answer and the page it comes from. Every word is the FAQ's own (passed in by
// app/roofing-faq/page.js). SVG-free, HTML + CSS; reduced motion shows the first question and answer.
export function QhFaqChat({ items = [], caption }) {
  return (
    <div className="qh-fq">
      <div className="qh-fq-phone">
        <p className="qh-fq-head">
          <span className="qh-fq-dot" aria-hidden="true" />
          Ask a roofer
        </p>
        <div className="qh-fq-stage">
          {items.slice(0, 4).map((it, i) => (
            <div className={`qh-fq-pair qh-fq-p${i + 1}`} key={it.q}>
              <p className="qh-fq-q">{it.q}</p>
              <p className="qh-fq-typing" aria-hidden="true">
                <i />
                <i />
                <i />
              </p>
              <p className="qh-fq-a">
                {it.a}
                <small>{it.label}</small>
              </p>
            </div>
          ))}
        </div>
      </div>
      {caption && <p className="qh-rr-time">{caption}</p>}
    </div>
  );
}

// Roof Inspection hero visual (owner, November 9 2026): RoofScan 360 on a 12 s loop. A drone crosses over a home with a scan beam, three findings
// get numbered pins (flashing, a vent boot, worn shingles), then the report card lights up one next step of four: repair, monitor, maintain,
// replace. SVG + CSS; reduced motion shows the finished report.
export function QhDroneScan({ caption, links = [] }) {
  const pins = [[188, 118, 1], [300, 136, 2], [368, 112, 3]];
  // Drawn like the real thing (owner, November 11 2026; same drone path, beam, pins and card): a shingle roof with a ridge cap, a brick chimney
  // with gold flashing, a pipe boot and a skylight at the three findings, gutters and fascia, a stucco wall with framed windows, a door and a
  // hedge, and a quadcopter with four arms, props and a camera gimbal.
  return (
    <div className="qh-ds">
      <svg className="qh-ds-svg" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <pattern id="qhDsShingle" width="40" height="13" patternUnits="userSpaceOnUse">
            <rect width="40" height="13" fill="#4a515b" />
            <rect x="0" y="0" width="20" height="12" fill="#505863" />
            <path d="M0 12.5H40" stroke="rgba(0,0,0,.55)" strokeWidth="1.6" />
            <path d="M10 0V12M30 6V12" stroke="rgba(0,0,0,.35)" strokeWidth="1" />
          </pattern>
          <pattern id="qhDsBrick" width="12" height="7" patternUnits="userSpaceOnUse">
            <rect width="12" height="7" fill="#6b4a3a" />
            <path d="M0 6.5h12M6 0v3.5M0 3.5h12M3 3.5v3.5M9 3.5v3.5" stroke="#b8a898" strokeWidth=".9" />
          </pattern>
          <linearGradient id="qhDsWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ded6c7" />
            <stop offset="1" stopColor="#bbb2a2" />
          </linearGradient>
          <linearGradient id="qhDsGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dcefff" />
            <stop offset="1" stopColor="#2f5f8f" />
          </linearGradient>
        </defs>
        <clipPath id="qhDsRoof">
          <path d="M70 196L250 96L430 196Z" />
        </clipPath>
        {/* The wall, windows, door and hedge */}
        <rect x="100" y="196" width="300" height="70" fill="url(#qhDsWall)" />
        <rect x="100" y="196" width="300" height="4" fill="rgba(0,0,0,.2)" />
        {[130, 330].map((x) => (
          <g key={x}>
            <rect x={x - 3} y="210" width="46" height="38" rx="2" fill="#f3efe6" />
            <rect x={x} y="213" width="40" height="32" fill="url(#qhDsGlass)" />
            <path d={`M${x + 20} 213v32M${x} 229h40`} stroke="#f3efe6" strokeWidth="2" />
          </g>
        ))}
        <rect x="217" y="212" width="46" height="54" rx="2" fill="#f3efe6" />
        <rect x="220" y="216" width="40" height="50" fill="#4a3a2c" />
        <rect x="226" y="222" width="28" height="16" fill="url(#qhDsGlass)" opacity="0.9" />
        <circle cx="254" cy="246" r="1.8" fill="#d6c08a" />
        <ellipse cx="300" cy="266" rx="30" ry="9" fill="#4d7a3a" />
        <ellipse cx="90" cy="266" rx="22" ry="8" fill="#4d7a3a" />
        <path d="M40 268h480" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
        {/* The roof: shingles, ridge cap, the skylight, the pipe boot, the chimney with its flashing, gutters and fascia */}
        <path d="M70 196L250 96L430 196Z" fill="url(#qhDsShingle)" />
        <path d="M250 96L430 196L70 196Z" fill="rgba(0,0,0,.1)" />
        <path d="M242 101l8-7 8 7" fill="none" stroke="#353b44" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <g clipPath="url(#qhDsRoof)">
          <rect x="166" y="126" width="44" height="28" rx="3" fill="#2f4a64" stroke="#d9d4c8" strokeWidth="2.5" />
          <rect x="170" y="130" width="36" height="20" rx="2" fill="rgba(160,210,255,.75)" />
          <path d="M174 134c8-4 18-5 26-2" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="300" cy="150" rx="9" ry="5" fill="#8a949f" stroke="var(--qh-sun)" strokeWidth="2" />
          <rect x="297" y="134" width="6" height="14" fill="#2b323a" />
        </g>
        <rect x="350" y="96" width="22" height="40" fill="url(#qhDsBrick)" />
        <rect x="347" y="93" width="28" height="5" rx="1" fill="#a39b8c" />
        <path d="M346 138l4-4h22l6 8" fill="none" stroke="var(--qh-sun)" strokeWidth="3" strokeLinecap="round" />
        <path d="M70 196L250 96L430 196" fill="none" stroke="#2c3138" strokeWidth="6" strokeLinejoin="round" />
        <path d="M64 198h372" stroke="#aeb6bf" strokeWidth="5" strokeLinecap="round" />
        <path d="M66 200v66M434 200v66" stroke="#aeb6bf" strokeWidth="3" />
        {/* The drone: four arms, props with their blur, the body and a camera gimbal */}
        <g className="qh-ds-drone">
          <path className="qh-ds-beam" d="M0 18L-58 118H58Z" fill="rgba(240,180,60,.16)" />
          <path d="M-30 4L30 8M-30 8L30 4" stroke="#aeb6bf" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="-16" y="2" width="32" height="12" rx="5" fill="#dbe7f3" stroke="#8a949f" />
          <rect x="-6" y="14" width="12" height="6" rx="2" fill="#4c555e" />
          <circle cx="0" cy="20" r="4" fill="#1b2027" stroke="#8a949f" />
          <circle cx="0" cy="20" r="1.6" fill="#7cc4ff" />
          <circle cx="-12" cy="8" r="1.6" fill="#ff5a5a" />
          <circle cx="12" cy="8" r="1.6" fill="#5aff7a" />
          <ellipse className="qh-ds-prop" cx="-30" cy="4" rx="12" ry="2.5" fill="#9fb8d2" />
          <ellipse className="qh-ds-prop" cx="30" cy="4" rx="12" ry="2.5" fill="#9fb8d2" />
          <ellipse className="qh-ds-prop" cx="-30" cy="8" rx="12" ry="2.5" fill="#9fb8d2" opacity="0.6" />
          <ellipse className="qh-ds-prop" cx="30" cy="8" rx="12" ry="2.5" fill="#9fb8d2" opacity="0.6" />
        </g>
        {pins.map(([x, y, n]) => (
          <g key={n} className={`qh-ds-pin qh-ds-pin${n}`}>
            <circle cx={x} cy={y} r="11" fill="#f0b43c" stroke="#0b1b2e" strokeWidth="2" />
            <text x={x} y={y + 4.5} textAnchor="middle" fill="#0b1b2e" style={{ font: '800 12px var(--font-text), sans-serif' }}>{n}</text>
          </g>
        ))}
        <g className="qh-ds-card" transform="translate(438 110)">
          <rect width="112" height="150" rx="10" fill="#fff" />
          <text x="12" y="22" fill="#0b1b2e" style={{ font: '700 11px var(--font-text), sans-serif' }}>Your next step</text>
          {['Repair', 'Monitor', 'Maintain', 'Replace'].map((t, i) => (
            <g key={t} className={i === 0 ? 'qh-ds-pick' : undefined}>
              <rect x="10" y={34 + i * 27} width="92" height="21" rx="10.5" fill={i === 0 ? '#f0b43c' : '#e8ecf0'} />
              <text x="56" y={48.5 + i * 27} textAnchor="middle" fill="#0b1b2e" style={{ font: '700 11px var(--font-text), sans-serif' }}>{t}</text>
            </g>
          ))}
        </g>
      </svg>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Shingle Roof Installation hero visual (owner, November 9 2026): "the hardest decisions come before the first bundle". A home with a new addition;
// three decisions get pinned and checked in turn (ventilation, flashing at the tie-in, edges), then the new shingle courses go on the addition's
// roof row by row. SVG + CSS; reduced motion shows the finished roof.
export function QhShingleInstall({ caption, links = [] }) {
  const rows = 5;
  // Drawn like the real thing (owner, November 11 2026; same rows, decisions, caption and links): the existing home with its shingle roof,
  // ridge cap, chimney, gutters, stucco wall, framed window and door and a hedge; the addition as framed walls with its studs, a plywood deck
  // with grain and seams, the shingle courses laid up from a gold drip edge, a ridge vent, a soffit intake vent and the gold flashing where the
  // two roofs meet.
  return (
    <div className="qh-si">
      <svg className="qh-si-svg" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <clipPath id="qhSiRoof">
            <path d="M286 170L410 98L534 170Z" />
          </clipPath>
          <pattern id="qhSiTabs" width="30" height="16" patternUnits="userSpaceOnUse">
            <rect width="30" height="16" fill="#4b525c" />
            <rect x="0" y="0" width="15" height="15" fill="#515963" />
            <path d="M0 15h30" stroke="#262a30" strokeWidth="2" />
            <path d="M15 0v15" stroke="#2f343b" strokeWidth="1.2" />
          </pattern>
          <pattern id="qhSiOld" width="36" height="12" patternUnits="userSpaceOnUse">
            <rect width="36" height="12" fill="#59606a" />
            <rect x="0" y="0" width="18" height="11" fill="#5f6771" />
            <path d="M0 11.5h36" stroke="rgba(0,0,0,.5)" strokeWidth="1.4" />
            <path d="M9 0v11M27 5v6" stroke="rgba(0,0,0,.3)" strokeWidth="1" />
          </pattern>
          <pattern id="qhSiPly" width="60" height="30" patternUnits="userSpaceOnUse">
            <rect width="60" height="30" fill="#c39663" />
            <path d="M0 29.5h60M30 0v30" stroke="#8d6b47" strokeWidth="1.2" />
            <path d="M0 8c10-2 20 2 30 0s20-2 30 0M0 20c10-2 20 2 30 0s20-2 30 0" fill="none" stroke="rgba(120,80,40,.25)" strokeWidth="1" />
          </pattern>
          <pattern id="qhSiBrick" width="12" height="7" patternUnits="userSpaceOnUse">
            <rect width="12" height="7" fill="#6b4a3a" />
            <path d="M0 6.5h12M6 0v3.5M0 3.5h12M3 3.5v3.5M9 3.5v3.5" stroke="#b8a898" strokeWidth=".9" />
          </pattern>
          <linearGradient id="qhSiWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ded6c7" />
            <stop offset="1" stopColor="#bbb2a2" />
          </linearGradient>
          <linearGradient id="qhSiGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dcefff" />
            <stop offset="1" stopColor="#2f5f8f" />
          </linearGradient>
        </defs>
        {/* The existing home */}
        <rect x="46" y="176" width="220" height="90" fill="url(#qhSiWall)" />
        <rect x="46" y="176" width="220" height="4" fill="rgba(0,0,0,.2)" />
        <rect x="70" y="196" width="46" height="36" rx="2" fill="#f3efe6" />
        <rect x="73" y="199" width="40" height="30" fill="url(#qhSiGlass)" />
        <path d="M93 199v30M73 214h40" stroke="#f3efe6" strokeWidth="2" />
        <rect x="133" y="203" width="46" height="63" rx="2" fill="#f3efe6" />
        <rect x="136" y="206" width="40" height="60" fill="#4a3a2c" />
        <rect x="142" y="212" width="28" height="16" fill="url(#qhSiGlass)" opacity="0.9" />
        <circle cx="170" cy="240" r="1.8" fill="#d6c08a" />
        <rect x="200" y="196" width="46" height="36" rx="2" fill="#f3efe6" />
        <rect x="203" y="199" width="40" height="30" fill="url(#qhSiGlass)" />
        <path d="M223 199v30M203 214h40" stroke="#f3efe6" strokeWidth="2" />
        <ellipse cx="36" cy="266" rx="22" ry="8" fill="#4d7a3a" />
        <path d="M10 268h540" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
        <path d="M26 176L156 96L286 176Z" fill="url(#qhSiOld)" />
        <path d="M148 101l8-7 8 7" fill="none" stroke="#353b44" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="214" y="104" width="20" height="40" fill="url(#qhSiBrick)" />
        <rect x="211" y="101" width="26" height="5" rx="1" fill="#a39b8c" />
        <path d="M26 176L156 96L286 176" fill="none" stroke="#2c3138" strokeWidth="5" strokeLinejoin="round" />
        <path d="M20 178h130" stroke="#aeb6bf" strokeWidth="5" strokeLinecap="round" />
        <path d="M22 180v86" stroke="#aeb6bf" strokeWidth="3" />
        {/* The addition: framed walls, the deck, then the shingle courses up from the drip edge */}
        <rect x="300" y="170" width="214" height="96" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.35)" strokeDasharray="6 5" strokeWidth="2" />
        {[324, 348, 372, 396, 420, 444, 468, 492].map((x) => (
          <path key={x} d={`M${x} 172v94`} stroke="rgba(255,255,255,.14)" strokeWidth="3" />
        ))}
        <path d="M300 182h214" stroke="rgba(255,255,255,.2)" strokeWidth="3" />
        <path d="M286 170L410 98L534 170Z" fill="url(#qhSiPly)" />
        <path d="M286 170L410 98L534 170Z" fill="none" stroke="#8d6b47" strokeWidth="2" strokeLinejoin="round" />
        <g clipPath="url(#qhSiRoof)">
          {Array.from({ length: rows }, (_, i) => (
            <rect key={i} className="qh-si-row" style={{ animationDelay: `${3.4 + i * 0.22}s` }} x="280" y={170 - (i + 1) * 15} width="260" height="16" fill="url(#qhSiTabs)" />
          ))}
        </g>
        <path d="M286 170L410 98L534 170" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M402 103l8-6 8 6" fill="none" stroke="#2b3138" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M286 170h248" stroke="var(--qh-sun)" strokeWidth="3" />
        <path d="M286 172L410 100" stroke="var(--qh-sun)" strokeWidth="3" strokeLinecap="round" />
        <rect x="300" y="172" width="214" height="5" fill="#2b323a" />
        {[310, 340, 370, 400, 430, 460, 490].map((x) => <path key={x} d={`M${x} 173h18`} stroke="rgba(255,255,255,.3)" strokeWidth="1" />)}
        <path d="M524 172h18" stroke="#aeb6bf" strokeWidth="5" strokeLinecap="round" />
        <text x="407" y="250" textAnchor="middle" fill="#9fb8d2" style={{ font: '700 12px var(--font-text), sans-serif' }}>New addition</text>
        {/* the three decisions */}
        {[
          [410, 92, 'Ridge and intake vents', 'qh-si-d1'],
          [290, 150, 'Flashed tie-in', 'qh-si-d2'],
          [520, 178, 'Drip edge and rakes', 'qh-si-d3'],
        ].map(([x, y, t, cls], i) => (
          <g key={t} className={`qh-si-d ${cls}`}>
            <circle cx={x} cy={y} r="11" fill="#f0b43c" stroke="#0b1b2e" strokeWidth="2" />
            <path d={`M${x - 5} ${y}l3.5 3.5 6 -7`} stroke="#0b1b2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <text x={[x + 16, x - 18, x - 4][i]} y={[y - 10, y - 18, y + 30][i]} textAnchor={['start', 'end', 'end'][i]} fill="#f0b43c" style={{ font: '700 12px var(--font-text), sans-serif' }}>{t}</text>
          </g>
        ))}
      </svg>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// HOA & Multi-Family hero visual (owner, November 9 2026): "a collection of roofs". A community site plan of six buildings, each tagged repair,
// maintain or replace after the survey; the work moves through them phase by phase (a gold outline), and a board report card sums it up.
// SVG + CSS; reduced motion shows the tagged plan.
export function QhCommunityPlan({ caption, links = [] }) {
  const bldgs = [
    [40, 40, 'A', 'Maintain'], [168, 40, 'B', 'Repair'], [296, 40, 'C', 'Replace'],
    [40, 150, 'D', 'Replace'], [168, 150, 'E', 'Maintain'], [296, 150, 'F', 'Repair'],
  ];
  const tone = { Repair: '#f0b43c', Maintain: '#7cc4ff', Replace: '#ff8a65' };
  // Drawn like the real thing (owner, November 11 2026; same buildings, tags, phase outline and report): the community from above, each
  // building a pitched shingle roof with its ridge, hips and a rooftop unit or vents, throwing a shadow onto the grounds; streets with lane
  // markings, parking stalls with cars, trees and a pool.
  return (
    <div className="qh-cp">
      <svg className="qh-cp-svg" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <pattern id="qhCpShingle" width="12" height="6" patternUnits="userSpaceOnUse">
            <rect width="12" height="6" fill="#59606a" />
            <path d="M0 5.5h12" stroke="rgba(0,0,0,.4)" strokeWidth="1" />
          </pattern>
          <linearGradient id="qhCpRoofL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,.16)" />
            <stop offset="1" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          <linearGradient id="qhCpRoofR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(0,0,0,0)" />
            <stop offset="1" stopColor="rgba(0,0,0,.3)" />
          </linearGradient>
        </defs>
        {/* Grounds: lawn, streets with lane lines, parking, a pool and trees */}
        <rect x="10" y="10" width="416" height="268" rx="8" fill="#2f4a2e" />
        <path d="M24 128H412M152 24V262M280 24V262" stroke="#3d434b" strokeWidth="16" />
        <path d="M24 128H412" stroke="#d9c86b" strokeWidth="1" strokeDasharray="8 8" />
        <path d="M152 24V262M280 24V262" stroke="#d9c86b" strokeWidth="1" strokeDasharray="8 8" />
        <rect x="24" y="238" width="118" height="26" fill="#4a5058" />
        {[30, 52, 74, 96, 118].map((x) => <path key={x} d={`M${x} 238v26`} stroke="#d9d9d9" strokeWidth="1" />)}
        {[[34, 242, '#d8dde3'], [78, 242, '#8b2f2f'], [100, 242, '#2b4a7a']].map(([x, y, c]) => (
          <rect key={x} x={x} y={y} width="14" height="18" rx="3" fill={c} />
        ))}
        <rect x="300" y="240" width="60" height="24" rx="4" fill="#4fb3e6" stroke="#e6f3fa" strokeWidth="2" />
        {[[138, 140], [268, 140], [396, 140], [138, 36], [400, 250], [160, 270]].map(([x, y]) => (
          <g key={x + y}>
            <circle cx={x + 3} cy={y + 3} r="9" fill="rgba(0,0,0,.3)" />
            <circle cx={x} cy={y} r="9" fill="#3f7a35" />
            <circle cx={x - 2} cy={y - 2} r="4" fill="#5a9a48" />
          </g>
        ))}
        {/* The buildings from above */}
        {bldgs.map(([x, y, id, st], i) => (
          <g key={id}>
            <rect x={x + 6} y={y + 6} width="108" height="82" rx="3" fill="rgba(0,0,0,.35)" />
            <rect x={x} y={y} width="108" height="82" rx="3" fill="url(#qhCpShingle)" />
            <rect x={x} y={y} width="108" height="41" rx="3" fill="url(#qhCpRoofL)" />
            <rect x={x} y={y + 41} width="108" height="41" fill="url(#qhCpRoofR)" />
            <path d={`M${x} ${y}l16 41-16 41M${x + 108} ${y}l-16 41 16 41`} fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="1.2" />
            <path d={`M${x + 16} ${y + 41}H${x + 92}`} stroke="#2f343b" strokeWidth="3" />
            <path d={`M${x + 16} ${y + 41}H${x + 92}`} stroke="rgba(255,255,255,.35)" strokeWidth="1" />
            <rect x={x + 70} y={y + 10} width="12" height="10" fill="#8a949f" stroke="rgba(0,0,0,.4)" />
            <circle cx={x + 30} cy={y + 60} r="3" fill="#8a949f" stroke="rgba(0,0,0,.4)" />
            <circle cx={x + 46} cy={y + 60} r="3" fill="#8a949f" stroke="rgba(0,0,0,.4)" />
            <rect x={x} y={y} width="108" height="82" rx="3" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
            <text x={x + 12} y={y + 24} fill="#fff" style={{ font: '800 16px var(--font-text), sans-serif' }}>{id}</text>
            <g className={`qh-cp-tag qh-cp-tag${i + 1}`}>
              <rect x={x + 10} y={y + 52} width="78" height="20" rx="10" fill={tone[st]} />
              <text x={x + 49} y={y + 66} textAnchor="middle" fill="#0b1b2e" style={{ font: '700 11px var(--font-text), sans-serif' }}>{st}</text>
            </g>
          </g>
        ))}
        <rect className="qh-cp-phase" x="290" y="34" width="120" height="94" rx="7" fill="none" stroke="#f0b43c" strokeWidth="3.5" strokeDasharray="8 6" />
        <g transform="translate(428 52)">
          <rect width="122" height="180" rx="10" fill="#fff" />
          <text x="12" y="24" fill="#0b1b2e" style={{ font: '700 11.5px var(--font-text), sans-serif' }}>Board report</text>
          {['Phase 1', 'Phase 2', 'Phase 3'].map((t, i) => (
            <g key={t}>
              <text x="12" y={52 + i * 40} fill="#5d6570" style={{ font: '700 10.5px var(--font-text), sans-serif' }}>{t}</text>
              <rect x="12" y={58 + i * 40} width="98" height="9" rx="4.5" fill="#e8ecf0" />
              <rect className={`qh-cp-bar qh-cp-bar${i + 1}`} x="12" y={58 + i * 40} width={[72, 52, 86][i]} height="9" rx="4.5" fill="#f0b43c" />
            </g>
          ))}
          <text x="12" y="168" fill="#0b1b2e" style={{ font: '700 10.5px var(--font-text), sans-serif' }}>Photos per building</text>
        </g>
      </svg>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Shopping Center hero visual (owner, November 9 2026): a strip center from above on a 12 s loop. The roof over six tenant spaces and the common
// area is surveyed and then replaced one space at a time (a work zone with cones moving along), while each storefront below keeps its "Open"
// sign lit and the parking stays clear. SVG + CSS; reduced motion shows the finished roof.
export function QhCenterPhases({ caption, links = [] }) {
  const n = 6;
  const W = 78;
  // Drawn like the real thing (owner, November 11 2026; same spaces, new-roof fades, work zone, OPEN signs and timing): a strip center from
  // above with a parapet, a granulated roof per tenant space with its rooftop unit and drain, the new white roof fading in one space at a time,
  // storefronts with awnings and glass below, a sidewalk, and the parking lot with stalls, cars and planter islands.
  return (
    <div className="qh-cc">
      <svg className="qh-cc-svg" viewBox="0 0 560 300" aria-hidden="true">
        <defs>
          <filter id="qhCcGrain" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="5" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
          </filter>
          <linearGradient id="qhCcAwning" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b8332f" />
            <stop offset="1" stopColor="#7d1f1c" />
          </linearGradient>
          <linearGradient id="qhCcGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9fd0ff" />
            <stop offset="1" stopColor="#2f5f8f" />
          </linearGradient>
        </defs>
        {/* Parking lot: asphalt, stalls, cars and planters */}
        <rect x="24" y="196" width={W * n + 40} height="80" rx="4" fill="#3d434b" />
        {Array.from({ length: 11 }, (_, i) => (
          <path key={i} d={`M${60 + i * 42} 212V252`} stroke="rgba(255,255,255,.28)" strokeWidth="2" />
        ))}
        {[[66, 216, '#d8dde3'], [150, 216, '#8b2f2f'], [234, 216, '#2b4a7a'], [360, 216, '#c9c2b6'], [444, 216, '#3a3f46']].map(([x, y, c]) => (
          <g key={x}>
            <rect x={x} y={y} width="30" height="34" rx="6" fill={c} />
            <rect x={x + 4} y={y + 6} width="22" height="9" rx="2" fill="rgba(20,30,40,.6)" />
            <rect x={x + 4} y={y + 20} width="22" height="7" rx="2" fill="rgba(20,30,40,.4)" />
          </g>
        ))}
        {[300, 500].map((x) => (
          <g key={x}>
            <rect x={x} y="206" width="26" height="46" rx="6" fill="#2f4a2e" />
            <circle cx={x + 13} cy="229" r="9" fill="#3f7a35" />
            <circle cx={x + 11} cy="227" r="4" fill="#5a9a48" />
          </g>
        ))}
        {/* Sidewalk */}
        <rect x="36" y="190" width={W * n + 16} height="8" fill="#b9b4a8" />
        {/* Each tenant space: the old roof with its unit and drain, the new roof that fades in, the storefront with awning and glass */}
        {Array.from({ length: n }, (_, i) => (
          <g key={i}>
            <rect x={44 + i * W} y="40" width={W} height="110" fill="#5c6168" stroke="#3c4249" strokeWidth="2" />
            <rect x={44 + i * W} y="40" width={W} height="110" filter="url(#qhCcGrain)" opacity="0.35" style={{ mixBlendMode: 'multiply' }} />
            <rect x={44 + i * W + 14} y="56" width="24" height="18" rx="2" fill="#8a949f" stroke="rgba(0,0,0,.4)" />
            <circle cx={44 + i * W + 26} cy="65" r="5" fill="#5b646e" stroke="rgba(255,255,255,.35)" />
            <circle cx={44 + i * W + 58} cy="112" r="5" fill="#2b323a" stroke="#9aa3ad" strokeWidth="1.5" />
            <rect className={`qh-cc-new qh-cc-new${i + 1}`} x={44 + i * W} y="40" width={W} height="110" fill="#eef2f6" stroke="#cfd6dd" strokeWidth="2" />
            <g className={`qh-cc-new qh-cc-new${i + 1}`}>
              <rect x={44 + i * W + 14} y="56" width="24" height="18" rx="2" fill="#aeb6bf" stroke="rgba(0,0,0,.3)" />
              <circle cx={44 + i * W + 58} cy="112" r="5" fill="#2b323a" stroke="#9aa3ad" strokeWidth="1.5" />
              <path d={`M${44 + i * W} 76h${W}M${44 + i * W} 112h${W}`} stroke="rgba(0,0,0,.08)" />
            </g>
            <text x={44 + i * W + W / 2} y="138" textAnchor="middle" fill="rgba(11,27,46,.5)" style={{ font: '700 11px var(--font-text), sans-serif' }}>Space {i + 1}</text>
            <path d={`M${44 + i * W + 4} 150h${W - 8}l-4 8h${-(W - 16)}z`} fill="url(#qhCcAwning)" />
            {[0, 1, 2, 3].map((k) => <path key={k} d={`M${44 + i * W + 12 + k * 16} 150l-2 8`} stroke="rgba(255,255,255,.35)" />)}
            <rect x={44 + i * W + 8} y="160" width={W - 16} height="26" fill="url(#qhCcGlass)" stroke="#e8ecf0" strokeWidth="2" />
            <path d={`M${44 + i * W + W / 2} 160v26`} stroke="#e8ecf0" strokeWidth="2" />
            <path d={`M${44 + i * W + 12} 164l10-2`} stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeLinecap="round" />
            <g className="qh-cc-open">
              <rect x={44 + i * W + W / 2 - 18} y="176" width="36" height="13" rx="6.5" fill="#f0b43c" />
              <text x={44 + i * W + W / 2} y="185.5" textAnchor="middle" fill="#0b1b2e" style={{ font: '800 8.5px var(--font-text), sans-serif', letterSpacing: '.1em' }}>OPEN</text>
            </g>
          </g>
        ))}
        <rect x="44" y="40" width={W * n} height="110" fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="4" />
        <g className="qh-cc-zone">
          <rect x="44" y="40" width={W} height="110" fill="rgba(240,180,60,.18)" stroke="#f0b43c" strokeWidth="3" strokeDasharray="7 5" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${56 + i * 24} 112l7 -16 7 16Z`} fill="#ff8a3c" />
          ))}
        </g>
        <text x="280" y="290" textAnchor="middle" fill="#9fb8d2" style={{ font: '700 12px var(--font-text), sans-serif' }}>Stores open, parking clear</text>
      </svg>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Small drawings of the four building types for the portfolio card (owner, November 11 2026): an apartment building, a retail center with an
// awning, an office tower and a warehouse with roll-up doors, each under a sky.
function PfThumb({ kind }) {
  const sky = <rect width="46" height="34" fill="#6ea7e0" />;
  if (kind === 0) {
    return (
      <svg viewBox="0 0 46 34">{sky}
        <rect x="8" y="6" width="30" height="28" fill="#c9bfae" /><rect x="8" y="6" width="30" height="3" fill="#59606a" />
        {[11, 20, 29].map((y) => [11, 19, 27].map((x) => <rect key={x + '' + y} x={x} y={y} width="6" height="5" fill="#2f5f8f" />))}
        <rect x="20" y="26" width="6" height="8" fill="#4a3a2c" />
      </svg>
    );
  }
  if (kind === 1) {
    return (
      <svg viewBox="0 0 46 34">{sky}
        <rect x="2" y="12" width="42" height="22" fill="#d9d2c4" /><rect x="2" y="12" width="42" height="3" fill="#59606a" />
        <path d="M4 18h38l-2 4H6z" fill="#b8332f" /><rect x="6" y="23" width="34" height="9" fill="#9fd0ff" />
        <rect x="14" y="4" width="18" height="8" fill="#0b1b2e" /><rect x="17" y="6" width="12" height="4" fill="#f0b43c" />
      </svg>
    );
  }
  if (kind === 2) {
    return (
      <svg viewBox="0 0 46 34">{sky}
        <rect x="14" y="2" width="18" height="32" fill="#2f4a64" />
        {[4, 9, 14, 19, 24, 29].map((y) => <rect key={y} x="16" y={y} width="14" height="3" fill="#9fd0ff" opacity=".8" />)}
        <rect x="4" y="20" width="10" height="14" fill="#c9bfae" /><rect x="32" y="16" width="10" height="18" fill="#b9b2a2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 46 34">{sky}
      <path d="M2 14l21-8 21 8v20H2z" fill="#8a949f" /><path d="M2 14l21-8 21 8" fill="none" stroke="#59606a" strokeWidth="2" />
      {[6, 18, 30].map((x) => <rect key={x} x={x} y="20" width="10" height="14" fill="#3d434b" />)}
      {[6, 18, 30].map((x) => [22, 25, 28, 31].map((y) => <path key={x + '' + y} d={`M${x} ${y}h10`} stroke="rgba(255,255,255,.25)" />))}
    </svg>
  );
}

// Property Management hero visual (owner, November 9 2026): "you answer for the roof". A portfolio list of the kinds of buildings managers look
// after (apartments, retail, office, warehouse), each checked off with its photo report on a 10 s loop, then "Sent to the owner" with a paper
// plane. HTML + CSS; reduced motion shows the finished list.
export function QhPortfolio({ caption, links = [] }) {
  const items = [['Apartment building', 'Repair'], ['Retail center', 'Maintain'], ['Office building', 'Monitor'], ['Warehouse', 'Replace']];
  return (
    <div className="qh-pf">
      <div className="qh-pf-card">
        <p className="qh-pf-head">Your buildings</p>
        <ul>
          {items.map(([name, step], i) => (
            <li key={name} className={`qh-pf-row qh-pf-r${i + 1}`}>
              <span className="qh-pf-photo qh-pf-photox" aria-hidden="true"><PfThumb kind={i} /></span>
              <span className="qh-pf-name">
                {name}
                <small>Photo report · Next step: {step}</small>
              </span>
              <span className="qh-pf-check" aria-hidden="true">✓</span>
            </li>
          ))}
        </ul>
        <p className="qh-pf-send">
          <span aria-hidden="true">➤</span> Sent to the owner and the board
        </p>
      </div>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Service Areas hero visual: the service area drawn from its Census outline (mainland only; the counties as shapes), the city pages as pins that
// drop in and each office as a pulsing gold pin, the county names, and the counties as links underneath. Server-rendered SVG, no map library.
export function QhAreaMap({ outline, offices = [], cities = [], links = [], note, bounds, focus, highlight, cityLabels = false, inset }) {
  // inset: { outline, name, offices, cities, href } drawn in a box in the empty top-right corner (Santa Clara County, about 300 miles north:
  // its own scale, labelled, with its office pin), only on the full Southern California view
  // bounds: { w, e, s, n } to zoom in (a county or a city); focus: a county shape's name to highlight; highlight: { name, lat, lng } for the page's
  // own city (a large gold pin with its name); cityLabels: name the other city pins (zoomed views)
  const B = bounds || { w: -118.98, e: -116.95, s: 33.36, n: 34.84 };
  const k = Math.cos((((B.n + B.s) / 2) * Math.PI) / 180);
  const W = 560;
  const H = Math.round((W * (B.n - B.s)) / ((B.e - B.w) * k));
  const x = (lon) => (((lon - B.w) / (B.e - B.w)) * W).toFixed(1);
  const y = (lat) => (((B.n - lat) / (B.n - B.s)) * H).toFixed(1);
  const inside = (lat, lng) => lat > B.s && lat < B.n && lng > B.w && lng < B.e;
  const rings = (g) => (g.type === 'Polygon' ? [g.coordinates[0]] : g.coordinates.map((p) => p[0]));
  const shapes = outline.features.map((f) => ({
    name: f.properties.name,
    d: rings(f.geometry)
      .filter((r) => r.some(([, lat]) => lat > 33.6)) // leave out the Channel Islands
      .map((r) => 'M' + r.map(([lon, lat]) => `${x(lon)} ${y(lat)}`).join('L') + 'Z')
      .join(''),
  }));
  const labels = [
    ['Los Angeles County', -118.33, 34.5],
    ['Orange County', -117.8, 33.74],
    ['Riverside County', -117.22, 33.76],
    ['San Bernardino', -117.45, 34.1],
  ].filter(([, lon, lat]) => !bounds || inside(lat, lon));
  const zoomed = Boolean(bounds);
  return (
    <div className={`qh-area${zoomed ? ' zoomed' : ''}`}>
      <svg className="qh-area-map" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          <clipPath id="qhAreaClip">
            <rect width={W} height={H} rx="10" />
          </clipPath>
        </defs>
        <g clipPath="url(#qhAreaClip)">
          {zoomed && <rect width={W} height={H} className="qh-area-sea" />}
          {shapes.map((sh, i) => (
            <path key={sh.name} d={sh.d} className={`qh-area-county qh-area-c${i}${focus === sh.name ? ' focus' : ''}`} />
          ))}
          {!highlight && labels.map(([t, lon, lat]) => (
            <text key={t} x={x(lon)} y={y(lat)} className="qh-area-label" textAnchor="middle">{t}</text>
          ))}
          {cities.filter((c) => !bounds || inside(c.lat, c.lng)).filter((c) => !highlight || c.slug !== highlight.slug).map((c, i) => (
            <g key={c.slug}>
              <circle cx={x(c.lng)} cy={y(c.lat)} r="4" className="qh-area-city" style={{ animationDelay: `${0.5 + i * 0.06}s` }} />
              {cityLabels && (+x(c.lng) > W - 110
                ? <text x={+x(c.lng) - 8} y={+y(c.lat) + 4} textAnchor="end" className="qh-area-cname">{c.city}</text>
                : <text x={+x(c.lng) + 8} y={+y(c.lat) + 4} className="qh-area-cname">{c.city}</text>)}
            </g>
          ))}
          {offices.filter((o) => !bounds || inside(o.geo.latitude, o.geo.longitude)).map((o) => (
            <g key={o.name} transform={`translate(${x(o.geo.longitude)} ${y(o.geo.latitude)})`}>
              <circle r="9" className="qh-area-ring" />
              <circle r="6.5" className="qh-area-office" />
            </g>
          ))}
          {inset && !bounds && <AreaInset {...inset} W={W} />}
          {highlight && (
            <g transform={`translate(${x(highlight.lng)} ${y(highlight.lat)})`}>
              <circle r="16" className="qh-area-ring" />
              <path d="M0 0c-6-8-10-12-10-17a10 10 0 0 1 20 0c0 5-4 9-10 17z" className="qh-area-hpin" />
              <circle cy="-17" r="3.5" fill="var(--qh-deep)" />
              <text y="-34" textAnchor="middle" className="qh-area-hname">{highlight.name}</text>
            </g>
          )}
        </g>
      </svg>
      <p className="qh-area-key">
        <span><i className="qh-key-office" />QRS office</span>
        <span><i className="qh-key-city" />City guide</span>
      </p>
      {note && <p className="qh-rr-time">{note}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// The inset box of QhAreaMap: a far-away county on its own scale in the top-right corner, its name, its office pin(s) and city pins
function AreaInset({ outline, name, offices = [], cities = [], W }) {
  const ring = outline.features[0].geometry.coordinates[0];
  const lons = ring.map((p) => p[0]);
  const lats = ring.map((p) => p[1]);
  const b = { w: Math.min(...lons), e: Math.max(...lons), s: Math.min(...lats), n: Math.max(...lats) };
  const k = Math.cos((((b.n + b.s) / 2) * Math.PI) / 180);
  const box = { x: W - 176, y: 14, w: 160, h: 150 };
  const pad = 14;
  const top = 30; // room for the name
  const sc = Math.min((box.w - pad * 2) / ((b.e - b.w) * k), (box.h - top - pad) / (b.n - b.s));
  const ox = box.x + (box.w - (b.e - b.w) * k * sc) / 2;
  const oy = box.y + top + (box.h - top - pad - (b.n - b.s) * sc) / 2;
  const x = (lon) => (ox + (lon - b.w) * k * sc).toFixed(1);
  const y = (lat) => (oy + (b.n - lat) * sc).toFixed(1);
  const d = 'M' + ring.map(([lon, lat]) => `${x(lon)} ${y(lat)}`).join('L') + 'Z';
  return (
    <g className="qh-area-inset">
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx="8" className="qh-area-inset-box" />
      <text x={box.x + box.w / 2} y={box.y + 19} textAnchor="middle" className="qh-area-label">{name}</text>
      <path d={d} className="qh-area-county qh-area-inset-county" />
      {cities.map((c) => (
        <circle key={c.slug} cx={x(c.lng)} cy={y(c.lat)} r="4" className="qh-area-city" />
      ))}
      {offices.map((o) => (
        <g key={o.name} transform={`translate(${x(o.geo.longitude)} ${y(o.geo.latitude)})`}>
          <circle r="9" className="qh-area-ring" />
          <circle r="6.5" className="qh-area-office" />
          <text x="13" y="4" className="qh-area-cname">{o.name.replace(/ Office$/, '')}</text>
        </g>
      ))}
    </g>
  );
}

// Projects hero visual: a tilted wall of the project cover photos in three columns drifting up and down at different speeds, each photo a link
// to its project page (the copies that close the loop are hidden from screen readers and the keyboard). Still for reduced motion.
export function QhProjectWall({ projects = [] }) {
  const cols = [0, 1, 2].map((c) => projects.filter((_, i) => i % 3 === c));
  return (
    <div className="qh-wall">
      <div className="qh-wall-tilt">
        {cols.map((col, c) => (
          <div className={`qh-wall-col qh-wall-col${c + 1}`} key={c}>
            <div className="qh-wall-track">
              {[...col, ...col].map((p, i) => {
                const copy = i >= col.length;
                return (
                  <SiteLink
                    className="qh-wall-tile"
                    href={p.path}
                    key={p.path + i}
                    {...(copy && { 'aria-hidden': true, tabIndex: -1 })}
                  >
                    <Image src={p.image} alt={copy ? '' : (p.label || p.title || '').replace(/,.*$/, '').replace(/\s+in\s+.*$/, '')} fill sizes="(min-width: 1081px) 15vw, 30vw" quality={55} />
                    <span className="qh-wall-cap">{(p.label || p.title).replace(/,.*$/, '').replace(/\s+in\s+.*$/, '')}</span>
                  </SiteLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="qh-rr-time">{projects.length} finished roofs, each with its own photos and story</p>
    </div>
  );
}

// Shingle roofing hero visual: a house whose shingle roof cycles through the cool roof colors on the page (data/roofColors.js), with the current
// color's name and the row of swatches, and a link to the shingle color section further down. CSS only; still (the first color) for reduced motion.
export function QhShingleColors({ colors = [], href = '#shingle-colors', label, note }) {
  const n = colors.length;
  const slot = 2.4;
  const pct = (k) => ((k / n) * 100).toFixed(3);
  const keys = colors.map((c, i) => `${pct(i)}%,${(((i + 0.8) / n) * 100).toFixed(3)}%{background-color:${c.hex}}`).join('') + `100%{background-color:${colors[0]?.hex}}`;
  const show = `0%,${(100 / n - 0.6).toFixed(3)}%{opacity:1;transform:none}${(100 / n).toFixed(3)}%,100%{opacity:0;transform:translateY(-6px)}`;
  const dot = `0%,${(100 / n - 0.6).toFixed(3)}%{transform:scale(1.35);box-shadow:0 0 0 2px var(--qh-sun)}${(100 / n).toFixed(3)}%,100%{transform:none;box-shadow:none}`;
  return (
    <div className="qh-colors" style={{ '--qh-cycle': `${n * slot}s` }}>
      <style>{`@keyframes qhRoofColor{${keys}}@keyframes qhColorName{${show}}@keyframes qhColorDot{${dot}}`}</style>
      <div className="qh-col-house" aria-hidden="true">
        {/* The roof's color cycles on the div (qhRoofColor); the shingle courses, chimney, skylight, ridge cap, drip edge and gutter are drawn
            over it (owner, November 11 2026) */}
        <div className="qh-col-roof qh-col-roofx" style={{ backgroundColor: colors[0]?.hex }}>
          <svg viewBox="0 0 560 243" preserveAspectRatio="none">
            <defs>
              <pattern id="qhColTex" width="44" height="14" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="22" height="13" fill="rgba(255,255,255,.06)" />
                <rect x="22" y="0" width="22" height="13" fill="rgba(0,0,0,.08)" />
                <path d="M0 13.5H44" stroke="rgba(0,0,0,.5)" strokeWidth="1.8" />
                <path d="M0 0.6H44" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
                <path d="M11 0V13M33 6V13" stroke="rgba(0,0,0,.3)" strokeWidth="1" />
              </pattern>
              <linearGradient id="qhColShade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="rgba(255,255,255,.18)" />
                <stop offset="1" stopColor="rgba(0,0,0,.28)" />
              </linearGradient>
              <pattern id="qhColBrick" width="14" height="8" patternUnits="userSpaceOnUse">
                <rect width="14" height="8" fill="#7a4a3c" />
                <path d="M0 7.5h14M7 0v4M0 4h14M3.5 4v4M10.5 4v8" stroke="#c9b9a8" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="560" height="243" fill="url(#qhColShade)" />
            <rect width="560" height="243" fill="url(#qhColTex)" />
            <path d="M280 0l280 243" stroke="rgba(0,0,0,.25)" strokeWidth="1" />
            <rect x="386" y="0" width="40" height="110" fill="url(#qhColBrick)" />
            <rect x="382" y="60" width="48" height="6" fill="#c9c2b6" />
            <path d="M380 110l6-6h40l6 6z" fill="var(--qh-sun)" />
            <rect x="150" y="96" width="60" height="44" rx="4" fill="#2f4a64" stroke="#d9d4c8" strokeWidth="3" />
            <rect x="156" y="102" width="48" height="32" rx="3" fill="rgba(160,210,255,.75)" />
            <path d="M160 108c10-6 24-8 38-4" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="2" strokeLinecap="round" />
            <path d="M0 0h560v10H0z" fill="rgba(0,0,0,.22)" />
            <rect x="0" y="234" width="560" height="9" fill="#aeb6bf" />
            <path d="M0 234h560" stroke="rgba(255,255,255,.4)" />
            <path d="M0 240h560" stroke="rgba(0,0,0,.35)" />
          </svg>
        </div>
        <RrWall />
      </div>
      <p className="qh-col-name" aria-hidden="true">
        {colors.map((c, i) => (
          <span key={c.id} style={{ animationDelay: `${i ? -(n - i) * slot : 0}s` }}>{c.name}</span>
        ))}
      </p>
      <ul className="qh-col-dots" aria-hidden="true">
        {colors.map((c, i) => (
          <li key={c.id} style={{ backgroundColor: c.hex, animationDelay: `${i ? -(n - i) * slot : 0}s` }} />
        ))}
      </ul>
      {note && <p className="qh-rr-time">{note}</p>}
      <ul className="qh-leak-links">
        <li>
          <SiteLink href={href}>{label || `See all ${n} colors on a home`}</SiteLink>
        </li>
      </ul>
    </div>
  );
}

// Flat roofing hero visual: a flat roof seen from above. Dashed water lines run along the valleys to the center drain and to a scupper, the laps
// show as seams across the field, and the parapet, HVAC curb and skylight carry gold flashing. The labels are the page's own three highlights.
export function QhDrainPlan({ labels = [], caption, links = [] }) {
  const [slope, laps, flashing] = labels;
  // A flat roof from above, drawn like the real thing (owner, November 11 2026, "more detailed and realistic", same labels, links and
  // motion): a parapet with a coping cap and an inner cant, a white granulated cap sheet in 36-inch rolls with their selvage laps, the field
  // shaded toward the drain, an HVAC unit on a flashed curb with its fan, panel, condensate line and a walk pad, a curb-mounted skylight with a
  // domed lens, two pipe boots, the drain with its dome strainer, the scupper through the parapet with its conductor head and downspout,
  // and the water lines (the animated dashes) running along the crickets to the drain and the scupper.
  return (
    <div className="qh-drain">
      <div className="qh-drain-art">
        <svg viewBox="0 0 560 380" aria-hidden="true">
          <defs>
            <filter id="qhDpGrain" x="0" y="0" width="1" height="1">
              <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="7" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
            </filter>
            <radialGradient id="qhDpField" cx="0.5" cy="0.5" r="0.75">
              <stop offset="0" stopColor="#bfc6cc" />
              <stop offset="0.55" stopColor="#d6dbdf" />
              <stop offset="1" stopColor="#e4e8eb" />
            </radialGradient>
            <linearGradient id="qhDpCoping" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#b9b4a8" />
              <stop offset="1" stopColor="#8d897f" />
            </linearGradient>
            <linearGradient id="qhDpUnit" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#b7bec6" />
              <stop offset="1" stopColor="#7f8891" />
            </linearGradient>
            <radialGradient id="qhDpDome" cx="0.35" cy="0.3" r="0.8">
              <stop offset="0" stopColor="#eaf6ff" stopOpacity="0.95" />
              <stop offset="0.5" stopColor="#8fc6f2" stopOpacity="0.75" />
              <stop offset="1" stopColor="#2f6ea8" stopOpacity="0.85" />
            </radialGradient>
            <radialGradient id="qhDpDrain" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#2b323a" />
              <stop offset="0.7" stopColor="#474f58" />
              <stop offset="1" stopColor="#1f252b" />
            </radialGradient>
            <radialGradient id="qhDpShade" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="rgba(0,0,0,.35)" />
              <stop offset="1" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <clipPath id="qhDpFieldClip"><rect x="38" y="38" width="484" height="304" /></clipPath>
          </defs>

          {/* Parapet: the outer wall face, the coping cap on top, the inner face in shadow and the cant strip at the foot */}
          <rect x="8" y="8" width="544" height="364" rx="5" fill="#6a6358" />
          <rect x="12" y="12" width="536" height="356" rx="4" fill="url(#qhDpCoping)" />
          {[12, 148, 284, 420].map((x) => <path key={x} d={`M${x + 136} 12v12M${x + 136} 356v12`} stroke="rgba(0,0,0,.22)" strokeWidth="1.2" />)}
          {[12, 148, 284].map((y) => <path key={y} d={`M12 ${y + 136}h12M536 ${y + 136}h12`} stroke="rgba(0,0,0,.22)" strokeWidth="1.2" />)}
          <path d="M24 24h512v332H24z" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
          <path d="M24 24h512v332H24z M38 38v304h484V38z" fill="#4c5159" fillRule="evenodd" />
          <path d="M38 38h484v304H38z M44 44v292h472V44z" fill="#3b4047" fillRule="evenodd" />

          {/* Field: the white granulated cap sheet, shaded toward the drain */}
          <rect x="38" y="38" width="484" height="304" fill="url(#qhDpField)" />
          <rect x="38" y="38" width="484" height="304" filter="url(#qhDpGrain)" opacity="0.32" style={{ mixBlendMode: 'multiply' }} />
          <g clipPath="url(#qhDpFieldClip)">
            {/* Roll laps: each 36-inch course, its selvage edge lit above and shadowed below */}
            {[80, 122, 164, 206, 248, 290, 332].map((y) => (
              <g key={y}>
                <path d={`M38 ${y}H522`} stroke="rgba(255,255,255,.55)" strokeWidth="1.4" />
                <path d={`M38 ${y + 1.6}H522`} stroke="rgba(40,50,60,.3)" strokeWidth="2" />
              </g>
            ))}
            {/* End laps, staggered */}
            {[[38, 80, 214], [122, 164, 330], [206, 248, 150], [290, 332, 390]].map(([y1, y2, x]) => (
              <path key={x} d={`M${x} ${y1}V${y2}`} stroke="rgba(40,50,60,.22)" strokeWidth="1.6" />
            ))}
            {/* Crickets: the saddles that steer water to the drain */}
            <path d="M38 38L280 190L522 38M38 342L280 190L522 342" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" />
            <path d="M38 40L280 192L522 40M38 344L280 192L522 344" fill="none" stroke="rgba(40,50,60,.25)" strokeWidth="1.2" />
            {/* Sump around the drain */}
            <ellipse cx="280" cy="190" rx="70" ry="52" fill="url(#qhDpShade)" opacity="0.5" />
            {/* Shadows under the equipment */}
            <ellipse cx="130" cy="106" rx="62" ry="24" fill="url(#qhDpShade)" opacity="0.8" />
            <ellipse cx="428" cy="276" rx="42" ry="30" fill="url(#qhDpShade)" opacity="0.7" />
          </g>

          {/* Walk pad to the unit */}
          <rect x="190" y="88" width="34" height="18" rx="2" fill="#aeb4ba" stroke="rgba(40,50,60,.35)" />
          <rect x="230" y="88" width="34" height="18" rx="2" fill="#aeb4ba" stroke="rgba(40,50,60,.35)" />
          <path d="M194 92h26M194 97h26M194 102h26M234 92h26M234 97h26M234 102h26" stroke="rgba(40,50,60,.25)" strokeWidth="1" />

          {/* HVAC unit on its curb: flashing (gold) up the curb, the cabinet, fan grille, access panel, refrigerant lines and a drip */}
          <rect x="68" y="58" width="112" height="76" rx="3" fill="#8e8a80" />
          <rect x="68" y="58" width="112" height="76" rx="3" fill="none" stroke="var(--qh-sun)" strokeWidth="3" />
          <rect x="74" y="60" width="100" height="66" rx="3" fill="url(#qhDpUnit)" />
          <rect x="74" y="60" width="100" height="10" rx="2" fill="rgba(0,0,0,.18)" />
          <rect x="80" y="74" width="36" height="46" rx="2" fill="#6f7882" stroke="rgba(0,0,0,.3)" />
          <path d="M84 82h28M84 90h28M84 98h28M84 106h28M84 114h28" stroke="rgba(0,0,0,.28)" strokeWidth="1.6" />
          <circle cx="146" cy="96" r="20" fill="#5b646e" stroke="rgba(0,0,0,.35)" />
          <circle cx="146" cy="96" r="16" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
          <path d="M146 80v32M130 96h32M135 85l22 22M157 85l-22 22" stroke="rgba(255,255,255,.55)" strokeWidth="1.5" />
          <circle cx="146" cy="96" r="4" fill="#2b323a" />
          <rect x="120" y="112" width="20" height="8" rx="1" fill="#2f8fe0" opacity="0.8" />
          <path d="M180 92h18c4 0 6 2 6 6v12M180 100h12c4 0 6 2 6 6v4" fill="none" stroke="#9a7c4d" strokeWidth="3" strokeLinecap="round" />
          <path d="M180 92h18c4 0 6 2 6 6v12" fill="none" stroke="#c9a96e" strokeWidth="1" strokeLinecap="round" />
          <rect x="196" y="106" width="6" height="6" fill="#5b646e" />
          <rect x="190" y="114" width="6" height="6" fill="#5b646e" />

          {/* Skylight: a flashed curb and a domed lens with the sky in it */}
          <rect x="392" y="236" width="68" height="68" rx="3" fill="#8e8a80" />
          <rect x="392" y="236" width="68" height="68" rx="3" fill="none" stroke="var(--qh-sun)" strokeWidth="3" />
          <rect x="398" y="242" width="56" height="56" rx="3" fill="#2f4a64" />
          <rect x="402" y="246" width="48" height="48" rx="10" fill="url(#qhDpDome)" />
          <path d="M410 256c8-8 20-10 30-6" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Pipe boots */}
          {[[334, 96], [96, 290]].map(([x, y]) => (
            <g key={x}>
              <circle cx={x} cy={y} r="11" fill="#9f9a90" stroke="var(--qh-sun)" strokeWidth="2" />
              <circle cx={x} cy={y} r="6" fill="#3b4047" />
              <circle cx={x} cy={y} r="3.2" fill="#14181c" />
            </g>
          ))}

          {/* Drain: the clamping ring and the dome strainer */}
          <circle cx="280" cy="190" r="19" fill="#2b323a" />
          <circle cx="280" cy="190" r="17" fill="url(#qhDpDrain)" stroke="#9aa3ad" strokeWidth="1.5" />
          {[0, 30, 60, 90, 120, 150].map((a) => (
            <path key={a} d="M280 176v28" stroke="rgba(255,255,255,.35)" strokeWidth="1.2" transform={`rotate(${a} 280 190)`} />
          ))}
          <circle cx="280" cy="190" r="8" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" />
          <circle cx="280" cy="190" r="3" fill="#0c1013" />

          {/* Scupper through the parapet, with its conductor head and downspout outside the wall */}
          <rect x="520" y="94" width="30" height="30" fill="#2b323a" />
          <rect x="522" y="96" width="26" height="26" fill="#111519" />
          <path d="M522 96h26v26h-26z" fill="none" stroke="var(--qh-sun)" strokeWidth="2" />
          <path d="M550 92h8v34h-8z" fill="#6f7882" />
          <path d="M552 126v246" stroke="#6f7882" strokeWidth="6" strokeLinecap="round" />
          <path d="M552 126v246" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M546 150h12M546 220h12M546 300h12" stroke="#3b4047" strokeWidth="3" />
          {/* Overflow scupper */}
          <rect x="522" y="128" width="26" height="10" fill="#3b4047" />

          {/* Water, along the crickets to the drain and to the scupper (the animated dashes) */}
          {['M70 322L262 204', 'M492 322L298 204', 'M70 58L262 178', 'M448 170C480 140 500 120 526 110'].map((d) => (
            <path key={d} className="qh-drain-flow" d={d} fill="none" stroke="#2f8fe0" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 10" />
          ))}
          <circle className="qh-leak-ring" cx="280" cy="190" r="22" fill="none" stroke="#2f8fe0" strokeWidth="2.5" />
        </svg>
        {slope && <span className="qh-leak-tag qh-drain-t1">{slope}</span>}
        {laps && <span className="qh-leak-tag qh-drain-t2">{laps}</span>}
        {flashing && <span className="qh-leak-tag qh-drain-t3">{flashing}</span>}
      </div>
      {caption && <p className="qh-leak-cap">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Tile roofing hero visual: a clay tile roof seen at an angle. A band of tiles lifts off and settles back in a slow loop, showing the underlayment
// and a flashed valley underneath (the page's point: the tiles often outlast the layers beneath them). Labels and caption from the page.
export function QhTileLift({ labels = [], caption, links = [] }) {
  const [tiles, under, flash] = labels;
  return (
    <div className="qh-tile">
      <div className="qh-tile-stage" aria-hidden="true">
        {/* Drawn like the real thing (owner, November 11 2026; same boxes, classes and lift): the underlayment with its laps and battens, the
            valley metal with gold edges and a flashed vent pipe underneath; each course of barrel tiles with its rounded caps, the shadow each
            tile throws on the next and the pan tiles between, in a few shades of clay */}
        <div className="qh-tile-plane">
          <div className="qh-tile-under qh-tile-underx">
            <svg viewBox="0 0 560 350" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <pattern id="qhTlUnder" width="560" height="32" patternUnits="userSpaceOnUse">
                  <rect width="560" height="32" fill="#2a3542" />
                  <path d="M0 30h560" stroke="#3b4857" strokeWidth="3" />
                  <path d="M0 29h560" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
                  <path d="M0 8h560" stroke="rgba(255,255,255,.07)" strokeWidth="1" strokeDasharray="4 4" />
                </pattern>
              </defs>
              <rect width="560" height="350" fill="url(#qhTlUnder)" />
              {[56, 172, 288].map((y) => (
                <g key={y}>
                  <rect x="0" y={y} width="560" height="9" fill="#9d7143" />
                  <path d={`M0 ${y}h560`} stroke="rgba(255,255,255,.25)" />
                  <path d={`M0 ${y + 9}h560`} stroke="rgba(0,0,0,.4)" />
                </g>
              ))}
              <path d="M90 130h0" />
              <circle cx="150" cy="210" r="16" fill="#8a949f" stroke="var(--qh-sun)" strokeWidth="3" />
              <circle cx="150" cy="210" r="7" fill="#1b2027" />
            </svg>
            <i className="qh-tile-valley" />
          </div>
          {['qh-tile-r1', 'qh-tile-r2', 'qh-tile-r3'].map((cls) => (
            <div className={`qh-tile-row qh-tile-rowx ${cls}`} key={cls}>
              <svg viewBox="0 0 560 117" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id={`qhTlCap-${cls}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#8f3f22" />
                    <stop offset="0.35" stopColor="#e08a5c" />
                    <stop offset="0.7" stopColor="#c9693f" />
                    <stop offset="1" stopColor="#7d3419" />
                  </linearGradient>
                  <linearGradient id={`qhTlPan-${cls}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#6f2e15" />
                    <stop offset="0.5" stopColor="#a84f2e" />
                    <stop offset="1" stopColor="#6f2e15" />
                  </linearGradient>
                  <linearGradient id={`qhTlShade-${cls}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="rgba(0,0,0,.45)" />
                    <stop offset="1" stopColor="rgba(0,0,0,0)" />
                  </linearGradient>
                </defs>
                <rect width="560" height="117" fill={`url(#qhTlPan-${cls})`} />
                {Array.from({ length: 17 }, (_, i) => i * 34).map((x, i) => (
                  <g key={x}>
                    <rect x={x} y="0" width="22" height="117" rx="11" fill={`url(#qhTlCap-${cls})`} opacity={i % 5 === 2 ? 0.88 : 1} />
                    <path d={`M${x + 6} 4v110`} stroke="rgba(255,255,255,.22)" strokeWidth="2" strokeLinecap="round" />
                    <path d={`M${x + 22} 0v117`} stroke="rgba(0,0,0,.35)" strokeWidth="2" />
                  </g>
                ))}
                <rect width="560" height="22" fill={`url(#qhTlShade-${cls})`} />
                <rect y="113" width="560" height="4" fill="rgba(60,20,8,.55)" />
              </svg>
            </div>
          ))}
        </div>
      </div>
      {tiles && <span className="qh-leak-tag qh-tile-t1">{tiles}</span>}
      {under && <span className="qh-leak-tag qh-tile-t2">{under}</span>}
      {flash && <span className="qh-leak-tag qh-tile-t3">{flash}</span>}
      {caption && <p className="qh-leak-cap">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Office building roofing hero visual: an office building in elevation with rooftop HVAC units, a parapet with coping and a roof hatch. A dashed
// water line runs from a curb flashing down into the top-floor suite, where a stained ceiling tile darkens (the page's own opening line).
export function QhOfficeLeak({ labels = [], caption, links = [] }) {
  const [curb, parapet, stain] = labels;
  const floors = [0, 1, 2, 3];
  // Drawn like the real thing (owner, November 11 2026; same water path, stain, ring and tags): a four-story office in a glass and precast
  // facade with spandrels and mullions, a lobby with doors and a canopy, the top-floor suite opened to show its ceiling grid, the roof's
  // parapet with coping and cant, a hatch, two rooftop units with fans on flashed curbs, a pipe boot, and the street with a tree.
  return (
    <div className="qh-office">
      <div className="qh-leak-art">
        <svg viewBox="0 0 560 420" aria-hidden="true">
          <defs>
            <linearGradient id="qhOfGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#bfe0ff" />
              <stop offset="0.5" stopColor="#5f9bd6" />
              <stop offset="1" stopColor="#24507f" />
            </linearGradient>
            <linearGradient id="qhOfWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2f4660" />
              <stop offset="1" stopColor="#1e3147" />
            </linearGradient>
            <linearGradient id="qhOfUnit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#aeb6bf" />
              <stop offset="1" stopColor="#6f7882" />
            </linearGradient>
          </defs>
          <path d="M30 412h500" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
          <rect x="70" y="120" width="420" height="292" fill="url(#qhOfWall)" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
          {floors.map((f) => (
            <g key={f}>
              <rect x="70" y={182 + f * 56} width="420" height="8" fill="#3b4d61" />
              <path d={`M70 ${182 + f * 56}H490`} stroke="rgba(255,255,255,.2)" strokeWidth="1" />
              {[0, 1, 2, 3, 4, 5].map((w) => (
                <g key={w}>
                  <rect x={86 + w * 66} y={134 + f * 56} width="54" height="44" fill="#9aa8b8" />
                  <rect x={88 + w * 66} y={136 + f * 56} width="50" height="40" rx="1" fill={f === 0 && w === 1 ? 'rgba(255,255,255,.16)' : 'url(#qhOfGlass)'} />
                  <path d={`M${113 + w * 66} ${136 + f * 56}v40`} stroke="#9aa8b8" strokeWidth="1.5" />
                  <path d={`M${92 + w * 66} ${142 + f * 56}l10-2`} stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round" />
                </g>
              ))}
            </g>
          ))}
          {/* the lobby: glass doors and a canopy */}
          <rect x="230" y="356" width="100" height="56" fill="#9aa8b8" />
          <rect x="234" y="360" width="44" height="52" fill="url(#qhOfGlass)" />
          <rect x="282" y="360" width="44" height="52" fill="url(#qhOfGlass)" />
          <path d="M274 386h4M282 386h4" stroke="#2b323a" strokeWidth="3" />
          <rect x="218" y="346" width="124" height="8" rx="2" fill="#4c5a6b" />
          <ellipse cx="520" cy="412" rx="20" ry="6" fill="#2f4a2e" />
          <circle cx="520" cy="384" r="22" fill="#3f7a35" />
          <circle cx="514" cy="378" r="10" fill="#5a9a48" />
          <path d="M520 406v-12" stroke="#5a3a26" strokeWidth="4" />
          {/* the top-floor suite, opened up: its ceiling grid and the stained tile */}
          <rect x="150" y="128" width="148" height="54" fill="#e8ecf0" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
          <rect x="150" y="128" width="148" height="12" fill="#f6f6f4" />
          <path d="M150 140H298M187 128V140M224 128V140M261 128V140" stroke="#b9c0c8" strokeWidth="1.5" />
          <rect x="156" y="146" width="36" height="22" rx="2" fill="#5d6570" />
          <rect x="160" y="150" width="28" height="14" fill="#9fd0ff" />
          <rect x="216" y="156" width="60" height="4" fill="#8a949f" />
          <rect x="222" y="160" width="4" height="22" fill="#8a949f" />
          <rect x="264" y="160" width="4" height="22" fill="#8a949f" />
          <rect className="qh-office-stain" x="224" y="128" width="37" height="12" fill="#a8885a" />
          {/* roof: parapet with coping and cant, the hatch, the units on their curbs, a pipe boot */}
          <rect x="62" y="104" width="436" height="16" fill="#3b4d61" />
          <rect x="58" y="98" width="444" height="8" rx="2" fill="#a39b8c" stroke="rgba(0,0,0,.35)" />
          <rect x="70" y="118" width="420" height="4" fill="#d9dee3" />
          <path d="M60 104H500" stroke="var(--qh-sun)" strokeWidth="4" strokeLinecap="round" />
          <rect x="120" y="92" width="34" height="12" fill="#56677a" />
          <rect x="118" y="88" width="38" height="6" rx="1" fill="#8a949f" />
          <rect x="300" y="62" width="96" height="42" rx="3" fill="url(#qhOfUnit)" />
          <rect x="300" y="62" width="96" height="7" rx="2" fill="rgba(0,0,0,.2)" />
          <circle cx="324" cy="86" r="12" fill="#5b646e" stroke="rgba(255,255,255,.35)" />
          <path d="M324 76v20M314 86h20M317 79l14 14M331 79l-14 14" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" />
          <path d="M346 72h40M346 80h40M346 88h40M346 96h40" stroke="rgba(0,0,0,.25)" strokeWidth="3" />
          <rect x="294" y="98" width="108" height="8" fill="#56677a" stroke="var(--qh-sun)" strokeWidth="2.5" />
          <rect x="420" y="78" width="46" height="26" rx="2" fill="url(#qhOfUnit)" />
          <circle cx="443" cy="91" r="8" fill="#5b646e" stroke="rgba(255,255,255,.35)" />
          <path d="M443 84v14M436 91h14" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" />
          <rect x="414" y="100" width="58" height="6" fill="#56677a" stroke="var(--qh-sun)" strokeWidth="2" />
          <rect x="200" y="88" width="6" height="16" fill="#2b323a" />
          <path d="M194 104h18l-3-5h-12z" fill="#9f9a90" stroke="var(--qh-sun)" strokeWidth="1.5" />
          {/* the water's path: in at the curb flashing, across the deck, down into the suite */}
          <path className="qh-leak-path" d="M300 106C290 112 276 116 262 118S246 122 244 128" fill="none" stroke="#7cc4ff" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 8" />
          <circle className="qh-leak-ring" cx="300" cy="104" r="12" fill="none" stroke="var(--qh-sun)" strokeWidth="2.5" />
          <circle cx="300" cy="104" r="4.5" fill="var(--qh-sun)" />
        </svg>
        {curb && <span className="qh-leak-tag qh-office-t1">{curb}</span>}
        {parapet && <span className="qh-leak-tag qh-office-t2">{parapet}</span>}
        {stain && <span className="qh-leak-tag qh-office-t3">{stain}</span>}
      </div>
      {caption && <p className="qh-leak-cap">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Retail store roofing hero visual: a storefront in elevation. A flat roof behind a tile mansard carries a rooftop unit, a skylight and a sign mount;
// a dashed water line runs from the skylight curb along the deck and drips onto an aisle on the sales floor (the page: a leak over one aisle may
// start somewhere else entirely)
export function QhStorefront({ labels = [], caption, links = [] }) {
  const [roof, mansard, aisle] = labels;
  // Drawn like the real thing (owner, November 11 2026; same water path, stain, ring and tags): a stucco storefront with a lit sign, glass
  // doors with push bars, a window onto the sales floor with stocked shelves, a sidewalk, a tile mansard with its courses, and on the roof a
  // unit with its fan on a flashed curb, a curb-mounted skylight and the sign's steel mount.
  return (
    <div className="qh-office">
      <div className="qh-leak-art">
        <svg viewBox="0 0 560 400" aria-hidden="true">
          <defs>
            <pattern id="qhMansard" width="18" height="14" patternUnits="userSpaceOnUse">
              <rect width="18" height="14" fill="#b4552f" />
              <path d="M0 13.5H18" stroke="rgba(60,20,8,.5)" strokeWidth="1.6" />
              <path d="M9 0V13" stroke="rgba(60,20,8,.3)" strokeWidth="1" />
              <path d="M2 2q3-2 5 0" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" />
            </pattern>
            <linearGradient id="qhStoWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d9d2c4" />
              <stop offset="1" stopColor="#b9b1a2" />
            </linearGradient>
            <linearGradient id="qhStoGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#dcefff" />
              <stop offset="0.5" stopColor="#7fb4e6" />
              <stop offset="1" stopColor="#2f5f8f" />
            </linearGradient>
            <linearGradient id="qhStoUnit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#aeb6bf" />
              <stop offset="1" stopColor="#6f7882" />
            </linearGradient>
            <radialGradient id="qhStoDome" cx="0.35" cy="0.3" r="0.8">
              <stop offset="0" stopColor="#eaf6ff" stopOpacity="0.95" />
              <stop offset="1" stopColor="#2f6ea8" stopOpacity="0.85" />
            </radialGradient>
          </defs>
          {/* The roof and what sits on it */}
          <rect x="56" y="112" width="448" height="14" fill="#3b4d61" />
          <rect x="56" y="110" width="448" height="4" fill="#d9dee3" />
          <rect x="314" y="106" width="104" height="7" fill="#56677a" stroke="var(--qh-sun)" strokeWidth="2" />
          <rect x="320" y="70" width="92" height="40" rx="3" fill="url(#qhStoUnit)" />
          <rect x="320" y="70" width="92" height="7" rx="2" fill="rgba(0,0,0,.2)" />
          <circle cx="344" cy="92" r="11" fill="#5b646e" stroke="rgba(255,255,255,.35)" />
          <path d="M344 83v18M335 92h18M338 86l12 12M350 86l-12 12" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" />
          <path d="M364 80h40M364 88h40M364 96h40" stroke="rgba(0,0,0,.25)" strokeWidth="3" />
          <path d="M170 112l12-14h48l12 14z" fill="#8e8a80" stroke="var(--qh-sun)" strokeWidth="2.5" />
          <path d="M184 106l6-6h32l6 6z" fill="url(#qhStoDome)" />
          <path d="M452 112V78M488 112V78" stroke="#56677a" strokeWidth="4" />
          <path d="M446 112h12M482 112h12" stroke="#56677a" strokeWidth="3" />
          <rect x="440" y="52" width="60" height="30" rx="3" fill="#24384f" stroke="rgba(255,255,255,.45)" strokeWidth="1.5" />
          <path d="M450 63h40M450 71h28" stroke="var(--qh-sun)" strokeWidth="3" strokeLinecap="round" />
          {/* The mansard out front */}
          <path d="M40 178L60 126H500L520 178Z" fill="url(#qhMansard)" />
          <path d="M40 178L60 126H500L520 178" fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="1.5" />
          <path d="M60 126H500" stroke="var(--qh-sun)" strokeWidth="3" />
          <path d="M36 178h488" stroke="#8a949f" strokeWidth="4" />
          {/* The store: wall, sign, window onto the sales floor, glass doors, sidewalk */}
          <rect x="52" y="178" width="456" height="200" fill="url(#qhStoWall)" />
          <rect x="52" y="178" width="456" height="4" fill="rgba(0,0,0,.2)" />
          <rect x="190" y="192" width="180" height="30" rx="4" fill="#0b1b2e" stroke="#5d6570" strokeWidth="1.5" />
          <path d="M210 207h96M316 207h32" stroke="var(--qh-sun)" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="280" cy="226" rx="90" ry="8" fill="rgba(240,180,60,.15)" />
          <rect x="72" y="238" width="160" height="134" fill="#e8ecf0" />
          <rect x="76" y="242" width="152" height="126" rx="1" fill="#33475e" />
          <rect x="76" y="242" width="152" height="126" fill="url(#qhStoGlass)" opacity="0.35" />
          {[266, 298, 330].map((y) => (
            <g key={y}>
              <path d={`M86 ${y}H120M182 ${y}H218`} stroke="#8b949e" strokeWidth="5" />
              <path d={`M88 ${y - 9}h8M100 ${y - 11}h6M190 ${y - 9}h10M205 ${y - 10}h8`} stroke="var(--qh-sun)" strokeWidth="6" />
              <path d={`M110 ${y - 10}h6M198 ${y - 8}h4`} stroke="#7cc4ff" strokeWidth="6" />
            </g>
          ))}
          <path d="M82 248l14-3" stroke="rgba(255,255,255,.6)" strokeWidth="2" strokeLinecap="round" />
          <rect x="300" y="238" width="188" height="134" fill="#e8ecf0" />
          <rect x="304" y="242" width="180" height="126" rx="1" fill="url(#qhStoGlass)" />
          <path d="M394 242v126" stroke="#e8ecf0" strokeWidth="2.5" />
          <path d="M310 248l14-3" stroke="rgba(255,255,255,.6)" strokeWidth="2" strokeLinecap="round" />
          <rect x="244" y="214" width="48" height="164" fill="#5d6570" />
          <rect x="248" y="218" width="40" height="160" fill="url(#qhStoGlass)" opacity="0.9" />
          <path d="M252 300h32" stroke="#2b323a" strokeWidth="3" />
          <rect x="24" y="378" width="512" height="10" fill="#b9b4a8" />
          <path d="M24 388h512" stroke="rgba(0,0,0,.3)" />
          <ellipse className="qh-leak-stain" cx="150" cy="320" rx="22" ry="5" fill="rgba(124,196,255,.55)" />
          {/* the water's path: in at the skylight curb, along the deck, down onto the aisle */}
          <path className="qh-leak-path" d="M186 116C176 120 162 122 152 124V186M150 186V304" fill="none" stroke="#7cc4ff" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 8" />
          <circle className="qh-leak-drop" cx="150" cy="300" r="4.5" fill="#7cc4ff" />
          <circle className="qh-leak-ring" cx="186" cy="112" r="12" fill="none" stroke="var(--qh-sun)" strokeWidth="2.5" />
          <circle cx="186" cy="112" r="4.5" fill="var(--qh-sun)" />
        </svg>
        {roof && <span className="qh-leak-tag qh-store-t1">{roof}</span>}
        {mansard && <span className="qh-leak-tag qh-store-t2">{mansard}</span>}
        {aisle && <span className="qh-leak-tag qh-store-t3">{aisle}</span>}
      </div>
      {caption && <p className="qh-leak-cap">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Church roofing hero visual: a church campus in elevation, a steep clay tile sanctuary with a bell tower beside a low-slope fellowship hall. A gold
// survey outline moves from section to section in turn (the page: a church is usually several roofs, and each one ages its own way; every
// section surveyed); a drain marks the hall roof
export function QhChurchCampus({ labels = [], caption, links = [] }) {
  const [tile, valley, hall] = labels;
  // Drawn like the real thing (owner, November 11 2026; same survey outlines and tags): a stone-trimmed sanctuary in stucco with buttresses,
  // arched stained-glass windows, a rose window and arched doors, a steep clay tile gable with its ridge and gold valley, the bell tower with
  // its tile spire, louvered belfry and cross, and the fellowship hall with a coped parapet, a drain and framed windows, on a lawn.
  return (
    <div className="qh-office">
      <div className="qh-leak-art">
        <svg viewBox="0 0 560 400" aria-hidden="true">
          <defs>
            <pattern id="qhChurchTile" width="16" height="12" patternUnits="userSpaceOnUse">
              <rect width="16" height="12" fill="#b4552f" />
              <path d="M0 11.5H16" stroke="rgba(60,20,8,.5)" strokeWidth="1.4" />
              <path d="M8 0V11" stroke="rgba(60,20,8,.3)" strokeWidth="1" />
              <path d="M2 2q3-2 5 0" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.2" />
            </pattern>
            <linearGradient id="qhChWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e3dccc" />
              <stop offset="1" stopColor="#bfb6a4" />
            </linearGradient>
            <linearGradient id="qhChGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7fb4e6" />
              <stop offset="0.5" stopColor="#c9475a" />
              <stop offset="1" stopColor="#f0b43c" />
            </linearGradient>
            <filter id="qhChGrain" x="0" y="0" width="1" height="1">
              <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="15" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer><feFuncA type="linear" slope="0.4" /></feComponentTransfer>
            </filter>
          </defs>
          <path d="M30 378h510" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
          <rect x="30" y="378" width="510" height="14" fill="#2f4a2e" />
          {/* Bell tower */}
          <rect x="72" y="96" width="62" height="282" fill="url(#qhChWall)" stroke="rgba(0,0,0,.25)" strokeWidth="1.5" />
          <rect x="72" y="96" width="62" height="282" filter="url(#qhChGrain)" opacity="0.2" style={{ mixBlendMode: 'multiply' }} />
          <rect x="68" y="160" width="70" height="5" fill="#c9bfae" />
          <rect x="68" y="236" width="70" height="5" fill="#c9bfae" />
          <path d="M66 98L103 54L140 98Z" fill="url(#qhChurchTile)" />
          <path d="M66 98L103 54L140 98" fill="none" stroke="rgba(0,0,0,.4)" strokeWidth="1.5" />
          <path d="M92 124a11 11 0 0 1 22 0v26h-22z" fill="#2b323a" stroke="#c9bfae" strokeWidth="2" />
          <path d="M94 130h18M94 136h18M94 142h18" stroke="#8a949f" strokeWidth="2" />
          <path d="M96 180a7 7 0 0 1 14 0v30h-14z" fill="url(#qhChGlass)" stroke="#c9bfae" strokeWidth="1.5" />
          <path d="M103 30v24M95 38h16" stroke="var(--qh-sun)" strokeWidth="4" strokeLinecap="round" />
          {/* Sanctuary: steep tile gable with its ridge, stucco walls with buttresses, arched windows, the rose window and arched doors */}
          <path className="qh-church-s1" d="M134 172L248 64L362 172Z" fill="url(#qhChurchTile)" />
          <path d="M134 172L248 64L362 172" fill="none" stroke="rgba(0,0,0,.4)" strokeWidth="2" />
          <path d="M242 68l6-5 6 5" fill="none" stroke="#6f351f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M248 64V172" stroke="var(--qh-sun)" strokeWidth="2.5" opacity=".85" />
          <rect x="146" y="172" width="204" height="206" fill="url(#qhChWall)" stroke="rgba(0,0,0,.25)" strokeWidth="1.5" />
          <rect x="146" y="172" width="204" height="206" filter="url(#qhChGrain)" opacity="0.2" style={{ mixBlendMode: 'multiply' }} />
          <path d="M146 172h204" stroke="#8a949f" strokeWidth="4" />
          {[146, 338].map((x) => <path key={x} d={`M${x} 378v-110l12 0v110z`} fill="#c9bfae" stroke="rgba(0,0,0,.25)" />)}
          {[170, 236, 302].map((x) => (
            <g key={x}>
              <path d={`M${x - 3} 247a17 17 0 0 1 34 0v46h-34z`} fill="#c9bfae" />
              <path d={`M${x} 250a14 14 0 0 1 28 0v40h-28z`} fill="url(#qhChGlass)" stroke="#5a3a26" strokeWidth="1.5" />
              <path d={`M${x + 14} 236v54M${x} 268h28`} stroke="#5a3a26" strokeWidth="1.5" />
            </g>
          ))}
          <path d="M222 378v-46a26 26 0 0 1 52 0v46" fill="#c9bfae" />
          <path d="M226 378v-44a22 22 0 0 1 44 0v44" fill="#4a3a2c" stroke="#5a3a26" strokeWidth="1.5" />
          <path d="M248 334v44" stroke="#2b1d14" strokeWidth="2" />
          <circle cx="244" cy="378" r="1.6" fill="#d6c08a" />
          <circle cx="252" cy="378" r="1.6" fill="#d6c08a" />
          <circle cx="248" cy="212" r="21" fill="#c9bfae" />
          <circle cx="248" cy="212" r="18" fill="url(#qhChGlass)" stroke="#5a3a26" strokeWidth="2" />
          {[0, 45, 90, 135].map((a) => <path key={a} d="M248 194v36" stroke="#5a3a26" strokeWidth="1.5" transform={`rotate(${a} 248 212)`} />)}
          {/* Fellowship hall: stucco, framed windows, the low-slope roof with coping and a drain */}
          <rect x="350" y="226" width="174" height="152" fill="url(#qhChWall)" stroke="rgba(0,0,0,.25)" strokeWidth="1.5" />
          <rect x="350" y="226" width="174" height="152" filter="url(#qhChGrain)" opacity="0.2" style={{ mixBlendMode: 'multiply' }} />
          <rect className="qh-church-s3" x="344" y="212" width="186" height="16" fill="#8f99a4" />
          <rect x="342" y="208" width="190" height="6" rx="2" fill="#a39b8c" stroke="rgba(0,0,0,.3)" />
          <path d="M344 212H530" stroke="var(--qh-sun)" strokeWidth="3" />
          <circle cx="440" cy="220" r="5" fill="#2b323a" stroke="#9aa3ad" strokeWidth="1.5" />
          {[368, 418, 468].map((x) => (
            <g key={x}>
              <rect x={x - 3} y="255" width="42" height="50" rx="2" fill="#f3efe6" />
              <rect x={x} y="258" width="36" height="44" rx="1" fill="#7fb4e6" />
              <path d={`M${x + 18} 258v44M${x} 280h36`} stroke="#f3efe6" strokeWidth="2" />
            </g>
          ))}
          <rect x="430" y="330" width="34" height="48" fill="#4a3a2c" stroke="#5a3a26" />
          <ellipse cx="512" cy="378" rx="22" ry="7" fill="#3f7a35" />
          {/* the survey outline moving section to section */}
          <path className="qh-survey-hl qh-hl1" d="M128 176L248 58L368 176Z" />
          <path className="qh-survey-hl qh-hl2" d="M60 102L103 48L146 102Z" />
          <rect className="qh-survey-hl qh-hl3" x="338" y="204" width="198" height="30" rx="3" />
        </svg>
        {tile && <span className="qh-leak-tag qh-church-t1">{tile}</span>}
        {valley && <span className="qh-leak-tag qh-church-t2">{valley}</span>}
        {hall && <span className="qh-leak-tag qh-church-t3">{hall}</span>}
      </div>
      {caption && <p className="qh-leak-cap">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Industrial roofing hero visual: a facility in elevation with a crowded low-slope roof (exhaust stacks venting, ductwork, equipment on supports,
// a walk path and a ponding spot). Gold rings light up each penetration in turn (the page: every penetration counts)
export function QhIndustrialRoof({ labels = [], caption, links = [] }) {
  const [stacks, supports, paths] = labels;
  const rings = [
    [118, 92],
    [176, 92],
    [300, 104],
    [418, 104],
    [470, 104],
  ];
  // Drawn like the real thing (owner, November 11 2026; same stacks, puffs, rings and tags): a tilt-up concrete facility with panel joints,
  // roll-up loading doors with bumpers and dock numbers, framed windows, a coped parapet, the loading yard, and on the roof the stacks with
  // guy wires and rain caps, a duct run on supports, equipment on its stand, walk pads and the ponding spot.
  return (
    <div className="qh-office">
      <div className="qh-leak-art">
        <svg viewBox="20 0 520 300" aria-hidden="true">
          <defs>
            <linearGradient id="qhInWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#b9b8b2" />
              <stop offset="1" stopColor="#8f8e88" />
            </linearGradient>
            <linearGradient id="qhInGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#dcefff" />
              <stop offset="1" stopColor="#2f5f8f" />
            </linearGradient>
          </defs>
          <rect x="24" y="292" width="512" height="8" fill="#3d434b" />
          <path d="M24 296h512" stroke="#d9c86b" strokeWidth="1" strokeDasharray="10 10" />
          <rect x="40" y="112" width="480" height="186" fill="url(#qhInWall)" stroke="rgba(0,0,0,.3)" strokeWidth="1.5" />
          {[160, 280, 400].map((x) => <path key={x} d={`M${x} 112v186`} stroke="rgba(0,0,0,.25)" strokeWidth="2" />)}
          <path d="M40 132h480" stroke="rgba(0,0,0,.15)" strokeWidth="2" />
          <rect x="34" y="104" width="492" height="10" fill="#3b4d61" />
          <rect x="32" y="100" width="496" height="6" rx="2" fill="#a39b8c" stroke="rgba(0,0,0,.3)" />
          <path d="M34 104H526" stroke="var(--qh-sun)" strokeWidth="3" />
          {[70, 170, 270].map((x, i) => (
            <g key={x}>
              <rect x={x - 4} y="210" width="86" height="88" fill="#6f7882" />
              <rect x={x} y="214" width="78" height="84" fill="#9aa3ad" stroke="rgba(0,0,0,.35)" strokeWidth="1.5" />
              {[0, 1, 2, 3, 4].map((k) => (
                <path key={k} d={`M${x} ${226 + k * 14}h78`} stroke="rgba(0,0,0,.25)" strokeWidth="2" />
              ))}
              <rect x={x + 6} y="284" width="10" height="14" fill="#2b323a" />
              <rect x={x + 62} y="284" width="10" height="14" fill="#2b323a" />
              <rect x={x + 30} y="196" width="18" height="12" rx="2" fill="#0b1b2e" />
              <text x={x + 39} y="205.5" textAnchor="middle" fill="#f0b43c" style={{ font: '800 9px var(--font-text), sans-serif' }}>{i + 1}</text>
            </g>
          ))}
          <rect x="376" y="236" width="40" height="62" fill="#4a3a2c" stroke="rgba(0,0,0,.3)" />
          {[380, 440].map((x) => (
            <g key={x}>
              <rect x={x - 3} y="137" width="50" height="46" rx="2" fill="#5d6570" />
              <rect x={x} y="140" width="44" height="40" rx="1" fill="url(#qhInGlass)" />
              <path d={`M${x + 22} 140v40M${x} 160h44`} stroke="#5d6570" strokeWidth="2" />
            </g>
          ))}
          {/* exhaust stacks with venting puffs */}
          {[118, 176].map((x, k) => (
            <g key={x}>
              <path d={`M${x - 7} 104l-16-50M${x + 7} 104l16-50`} stroke="#9aa3ad" strokeWidth="1" />
              <rect x={x - 7} y="34" width="14" height="70" fill="#8b949e" />
              <path d={`M${x - 3} 36v66`} stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
              <path d={`M${x - 12} 34h24l-3-6h-18z`} fill="#6f7882" />
              <rect x={x - 10} y="96" width="20" height="8" rx="1" fill="#6f7882" stroke="var(--qh-sun)" strokeWidth="1.5" />
              <circle className={`qh-puff qh-puff${k + 1}`} cx={x} cy="26" r="9" fill="rgba(255,255,255,.35)" />
            </g>
          ))}
          {/* ductwork run on its supports */}
          <path d="M220 96H360V74" fill="none" stroke="#9aa3ad" strokeWidth="12" strokeLinejoin="round" />
          <path d="M220 92H356" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
          {[240, 280, 320].map((x) => <path key={x} d={`M${x} 90v14`} stroke="rgba(0,0,0,.3)" strokeWidth="2" />)}
          {[250, 300].map((x) => <path key={x} d={`M${x} 102v2`} stroke="#56677a" strokeWidth="6" />)}
          {/* equipment on its stand */}
          <rect x="392" y="62" width="104" height="34" rx="3" fill="#7d8691" />
          <rect x="392" y="62" width="104" height="6" rx="2" fill="rgba(0,0,0,.2)" />
          <path d="M402 76h84M402 84h84" stroke="rgba(0,0,0,.25)" strokeWidth="3" />
          <circle cx="414" cy="80" r="7" fill="#5b646e" stroke="rgba(255,255,255,.35)" />
          <path d="M408 96v8M440 96v8M472 96v8" stroke="#56677a" strokeWidth="5" />
          <path d="M404 104h12M436 104h12M468 104h12" stroke="#56677a" strokeWidth="3" />
          {/* walk path pads and a ponding spot */}
          {[236, 256, 276].map((x) => (
            <rect key={x} x={x} y="100" width="14" height="4" fill="#d9dee3" stroke="rgba(0,0,0,.3)" strokeWidth=".8" />
          ))}
          <ellipse cx="330" cy="104" rx="20" ry="3" fill="rgba(124,196,255,.6)" />
          <path d="M316 103q14-2 28 0" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1" />
          {rings.map(([x, y], k) => (
            <circle key={k} className="qh-pen-ring" style={{ animationDelay: `${k * 1.2}s` }} cx={x} cy={y} r="10" fill="none" stroke="var(--qh-sun)" strokeWidth="2.5" />
          ))}
        </svg>
        {stacks && <span className="qh-leak-tag qh-ind-t1">{stacks}</span>}
        {supports && <span className="qh-leak-tag qh-ind-t2">{supports}</span>}
        {paths && <span className="qh-leak-tag qh-ind-t3">{paths}</span>}
      </div>
      {caption && <p className="qh-leak-cap">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Warehouse roofing hero visual: a large warehouse roof seen from above, slightly tilted, split into numbered sections that light up one after
// another (the page: surveyed in sections), with drains, scuppers, a row of skylights and one ponding area
export function QhWarehouseSections({ labels = [], caption, links = [] }) {
  const [drains, ponding, skylights] = labels;
  const cols = 4;
  const rows = 2;
  const W = 500 / cols;
  const H = 300 / rows;
  return (
    <div className="qh-drain">
      <div className="qh-drain-art">
        <svg viewBox="0 0 560 360" aria-hidden="true">
          {/* Drawn like the real thing (owner, November 11 2026; same sections, numbers, skylights, drains, scupper, pond and hatch): a coped
              parapet with a shadowed inner face, a white granulated cap sheet in courses with staggered end laps, crickets to each drain,
              domed skylights with curbs, strainers on the drains, a scupper with a conductor head and a hatch with its ladder rails */}
          <filter id="qhWhGrain" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="16" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
          </filter>
          <linearGradient id="qhWhCoping" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b9b4a8" />
            <stop offset="1" stopColor="#8d897f" />
          </linearGradient>
          <radialGradient id="qhWhDome" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#eaf6ff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#2f6ea8" stopOpacity="0.85" />
          </radialGradient>
          <rect x="12" y="12" width="536" height="336" rx="5" fill="url(#qhWhCoping)" stroke="rgba(0,0,0,.35)" />
          <path d="M22 22h516v316H22z M30 30v300h500V30z" fill="#4c5159" fillRule="evenodd" />
          <rect x="30" y="30" width="500" height="300" fill="#d4d8dc" />
          <rect x="30" y="30" width="500" height="300" filter="url(#qhWhGrain)" opacity="0.3" style={{ mixBlendMode: 'multiply' }} />
          {[60, 100, 140, 180, 220, 260, 300].map((y) => (
            <g key={y}>
              <path d={`M30 ${y}H530`} stroke="rgba(255,255,255,.6)" strokeWidth="1.2" />
              <path d={`M30 ${y + 1.5}H530`} stroke="rgba(60,70,80,.3)" strokeWidth="1.6" />
            </g>
          ))}
          {[[30, 60, 250], [100, 140, 400], [180, 220, 120], [260, 300, 340]].map(([y1, y2, x]) => (
            <path key={x} d={`M${x} ${y1}V${y2}`} stroke="rgba(60,70,80,.22)" strokeWidth="1.5" />
          ))}
          <path d="M30 30L92 105L30 180M155 30L92 105L155 180M405 30L468 105L530 30M405 180L468 105L530 180M280 180L342 255L405 180M280 330L342 255L405 330" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1" />
          {/* the sections, each lit in turn */}
          {Array.from({ length: cols * rows }, (_, k) => {
            const c = k % cols;
            const r = Math.floor(k / cols);
            return (
              <g key={k}>
                <rect className="qh-sec" style={{ animationDelay: `${k * 0.9}s` }} x={30 + c * W} y={30 + r * H} width={W} height={H} />
                <text x={30 + c * W + 12} y={30 + r * H + 24} className="qh-sec-n">{k + 1}</text>
              </g>
            );
          })}
          {[155, 280, 405].map((x) => (
            <path key={x} d={`M${x} 30V330`} stroke="rgba(40,50,60,.45)" strokeWidth="1.5" strokeDasharray="6 6" />
          ))}
          <path d="M30 180H530" stroke="rgba(40,50,60,.45)" strokeWidth="1.5" strokeDasharray="6 6" />
          {/* skylights down the middle row line */}
          {[80, 205, 330, 455].map((x) => (
            <g key={x}>
              <rect x={x} y="164" width="38" height="32" rx="2" fill="#8e8a80" stroke="var(--qh-sun)" strokeWidth="2.5" />
              <rect x={x + 4} y="168" width="30" height="24" rx="6" fill="url(#qhWhDome)" />
              <path d={`M${x + 8} ${174}c6-4 12-5 20-3`} fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          ))}
          {/* drains and scuppers */}
          {[[92, 105], [342, 255], [468, 105]].map(([x, y]) => (
            <g key={`${x}${y}`}>
              <ellipse cx={x} cy={y} rx="22" ry="16" fill="rgba(0,0,0,.12)" />
              <circle cx={x} cy={y} r="9" fill="#2b323a" stroke="#9aa3ad" strokeWidth="1.5" />
              {[0, 45, 90, 135].map((a) => <path key={a} d={`M${x} ${y - 7}v14`} stroke="rgba(255,255,255,.3)" strokeWidth="1.2" transform={`rotate(${a} ${x} ${y})`} />)}
              <circle cx={x} cy={y} r="2.5" fill="#0c1013" />
            </g>
          ))}
          <rect x="528" y="232" width="18" height="22" fill="#111519" stroke="var(--qh-sun)" strokeWidth="1.5" />
          <path d="M546 229h10v28h-10z" fill="#8a949f" stroke="rgba(0,0,0,.35)" />
          <path d="M551 257v88" stroke="#6f7882" strokeWidth="5" strokeLinecap="round" />
          {/* the ponding area in one section */}
          <ellipse className="qh-pond" cx="232" cy="268" rx="40" ry="16" fill="rgba(47,143,224,.45)" />
          {/* hatch */}
          <rect x="60" y="270" width="26" height="26" fill="#8b949e" stroke="rgba(0,0,0,.3)" strokeWidth="1.5" />
          <rect x="62" y="272" width="22" height="22" fill="none" stroke="rgba(255,255,255,.4)" />
          <path d="M66 296v6M80 296v6" stroke="#f0b43c" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        {drains && <span className="qh-leak-tag qh-wh-t1">{drains}</span>}
        {ponding && <span className="qh-leak-tag qh-wh-t2">{ponding}</span>}
        {skylights && <span className="qh-leak-tag qh-wh-t3">{skylights}</span>}
      </div>
      {caption && <p className="qh-leak-cap">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Shop and small business roofing hero visual: a small shop (roll-up bay door, storefront window, sign) whose roof, seen from slightly above, is a
// patchwork of old repairs with an exhaust fan, a vent stack, a skylight and a scupper; each patch and penetration is circled in turn, the way a
// roofer checks them (the page: a small roof can end up with more repairs than roof)
export function QhShopPatches({ labels = [], caption, links = [] }) {
  const [patches, fans, drains] = labels;
  const checks = [
    [130, 150, 34],
    [250, 138, 26],
    [372, 160, 30],
    [454, 140, 18],
    [196, 176, 22],
  ];
  // Drawn like the real thing (owner, November 11 2026; same rings and tags): the roof seen from slightly above as a granulated cap sheet
  // with patches of different ages, bleed-out and ponding, an exhaust fan with its hood, a pipe boot, a curb skylight and a scupper with a
  // downspout; the shop below in stucco with a lit sign, a roll-up bay door, a storefront window with goods, a glass door and the sidewalk.
  return (
    <div className="qh-office">
      <div className="qh-leak-art">
        <svg viewBox="0 0 560 390" aria-hidden="true">
          <defs>
            <filter id="qhShGrain" x="0" y="0" width="1" height="1">
              <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="17" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
            </filter>
            <linearGradient id="qhShWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d9d2c4" />
              <stop offset="1" stopColor="#b9b1a2" />
            </linearGradient>
            <linearGradient id="qhShGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#dcefff" />
              <stop offset="0.5" stopColor="#7fb4e6" />
              <stop offset="1" stopColor="#2f5f8f" />
            </linearGradient>
            <clipPath id="qhShRoof"><path d="M64 112H496L536 200H24Z" /></clipPath>
          </defs>
          {/* The roof seen from slightly above */}
          <path d="M64 112H496L536 200H24Z" fill="#c4c9ce" />
          <g clipPath="url(#qhShRoof)">
            <rect x="24" y="112" width="512" height="88" filter="url(#qhShGrain)" opacity="0.35" style={{ mixBlendMode: 'multiply' }} />
            {[130, 148, 166, 184].map((y) => <path key={y} d={`M24 ${y}H536`} stroke="rgba(60,70,80,.25)" strokeWidth="1.2" />)}
            <ellipse cx="300" cy="186" rx="40" ry="6" fill="rgba(47,143,224,.4)" />
          </g>
          <path d="M64 112H496L536 200H24Z" fill="none" stroke="var(--qh-sun)" strokeWidth="3" />
          {/* Old patches, each a different age, with bleed-out around them */}
          <path d="M96 134h68l8 30h-82z" fill="rgba(0,0,0,.18)" />
          <path d="M100 136h60l6 26h-70z" fill="#8f979e" />
          <path d="M104 140h52l4 18h-60z" fill="none" stroke="rgba(0,0,0,.25)" strokeDasharray="3 3" />
          <path d="M226 128h46l4 20h-52z" fill="#a8aeb4" />
          <path d="M228 130h42l3 16h-48z" fill="none" stroke="rgba(0,0,0,.2)" />
          <path d="M336 146h74l8 30h-86z" fill="rgba(0,0,0,.2)" />
          <path d="M340 148h66l6 26h-76z" fill="#7d858c" />
          <path d="M344 152h58l4 18h-66z" fill="none" stroke="rgba(0,0,0,.3)" strokeDasharray="4 3" />
          <path d="M176 166h40l4 20h-48z" fill="#9aa1a7" />
          <path d="M290 182h52" stroke="rgba(0,0,0,.25)" strokeWidth="3" />
          <path d="M292 184h48" stroke="#2b2f34" strokeWidth="1" />
          {/* Exhaust fan with its hood, the vent stack with its boot, the curb skylight */}
          <rect x="440" y="134" width="28" height="12" rx="2" fill="#6f7882" stroke="var(--qh-sun)" strokeWidth="1.5" />
          <circle cx="454" cy="134" r="13" fill="#8b949e" stroke="#56677a" strokeWidth="3" />
          <path d="M447 134h14M454 127v14M449 129l10 10M459 129l-10 10" stroke="#56677a" strokeWidth="1.5" />
          <path d="M292 140h24l-3-6h-18z" fill="#9f9a90" stroke="var(--qh-sun)" strokeWidth="1.5" />
          <rect x="300" y="118" width="8" height="18" fill="#7d8691" />
          <path d="M296 118h16l-2-4h-12z" fill="#5d6570" />
          <path d="M420 172l8-10h36l8 10z" fill="#8e8a80" stroke="var(--qh-sun)" strokeWidth="2" />
          <path d="M428 170l6-6h26l6 6z" fill="rgba(160,210,255,.8)" />
          {/* Scupper on the edge, with its downspout */}
          <rect x="530" y="186" width="10" height="16" fill="#111519" stroke="var(--qh-sun)" strokeWidth="1.5" />
          <path d="M540 184h8v20h-8z" fill="#8a949f" stroke="rgba(0,0,0,.35)" />
          <path d="M544 204v172" stroke="#8a949f" strokeWidth="5" strokeLinecap="round" />
          <path d="M540 250h8M540 320h8" stroke="#4c555e" strokeWidth="3" />
          {/* The shop front */}
          <rect x="24" y="200" width="512" height="182" fill="url(#qhShWall)" />
          <rect x="24" y="200" width="512" height="4" fill="rgba(0,0,0,.2)" />
          <rect x="190" y="208" width="180" height="26" rx="3" fill="#0b1b2e" stroke="#5d6570" strokeWidth="1.5" />
          <path d="M210 221h96M316 221h32" stroke="var(--qh-sun)" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="280" cy="238" rx="90" ry="7" fill="rgba(240,180,60,.15)" />
          <rect x="48" y="246" width="172" height="136" fill="#6f7882" />
          <rect x="52" y="250" width="164" height="132" fill="#9aa3ad" stroke="rgba(0,0,0,.35)" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
            <path key={k} d={`M52 ${262 + k * 15}h164`} stroke="rgba(0,0,0,.25)" strokeWidth="2" />
          ))}
          <rect x="130" y="320" width="10" height="6" rx="1" fill="#2b323a" />
          <rect x="296" y="252" width="156" height="88" fill="#e8ecf0" />
          <rect x="300" y="256" width="148" height="80" rx="1" fill="url(#qhShGlass)" />
          <path d="M374 256v80" stroke="#e8ecf0" strokeWidth="2" />
          {[314, 334, 354].map((x) => <rect key={x} x={x} y="300" width="14" height="22" rx="2" fill="#f0b43c" opacity="0.7" />)}
          {[392, 412, 432].map((x) => <rect key={x} x={x} y="304" width="12" height="18" rx="2" fill="#7cc4ff" opacity="0.7" />)}
          <path d="M306 262l14-3" stroke="rgba(255,255,255,.6)" strokeWidth="2" strokeLinecap="round" />
          <rect x="456" y="266" width="56" height="116" fill="#5d6570" />
          <rect x="460" y="270" width="48" height="112" fill="url(#qhShGlass)" opacity="0.9" />
          <path d="M466 330h8" stroke="#2b323a" strokeWidth="3" />
          <rect x="0" y="382" width="560" height="8" fill="#b9b4a8" />
          {checks.map(([x, y, r], k) => (
            <circle key={k} className="qh-pen-ring qh-check-ring" style={{ animationDelay: `${k * 1.2}s` }} cx={x} cy={y} r={r} fill="none" stroke="var(--qh-sun)" strokeWidth="2.5" />
          ))}
        </svg>
        {patches && <span className="qh-leak-tag qh-shop-t1">{patches}</span>}
        {fans && <span className="qh-leak-tag qh-shop-t2">{fans}</span>}
        {drains && <span className="qh-leak-tag qh-shop-t3">{drains}</span>}
      </div>
      {caption && <p className="qh-leak-cap">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Roof financing hero visual: the order the page promises. A written scope card (line items, no prices) comes first; an arrow leads to a 12-month
// calendar whose months tick off one by one (monthly payments), with the two lenders named. No amounts anywhere: the site never shows prices here.
export function QhFinancePath({ items = [], lenders = [], labels = [], caption, links = [] }) {
  const [first, credit] = labels;
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  return (
    <div className="qh-fin">
      <div className="qh-fin-row" aria-hidden="true">
        <div className="qh-fin-doc">
          <b>Written scope &amp; price</b>
          <ul>
            {items.map((it) => (
              <li key={it}>
                <Check />
                {it}
              </li>
            ))}
          </ul>
          <span className="qh-fin-sign">Approved before work</span>
        </div>
        <span className="qh-fin-arrow">→</span>
        <div className="qh-fin-cal">
          <b>Monthly payments</b>
          <ol>
            {months.map((m, k) => (
              <li key={k} style={{ animationDelay: `${0.6 + k * 0.35}s` }}>
                <span>{m}</span>
                <Check />
              </li>
            ))}
          </ol>
          <small>{lenders.join(' or ')}</small>
        </div>
      </div>
      <p className="qh-fin-tags">
        {first && <span className="qh-leak-tag">{first}</span>}
        {credit && <span className="qh-leak-tag qh-fin-t2">{credit}</span>}
      </p>
      {caption && <p className="qh-leak-cap">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Roof maintenance plans hero visual: a year dial. A hand sweeps through the months; the two plan visits are gold arcs (September and October
// before the rains, May and June after them) and the rainy months a soft blue band inside (the page: two visits, timed to the season)
export function QhSeasonDial({ labels = [], caption, links = [] }) {
  const [before, after, report] = labels;
  const C = 180;
  const R = 132;
  const M = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const pt = (month, r) => {
    const a = ((month / 12) * 360 - 90) * (Math.PI / 180);
    return [C + r * Math.cos(a), C + r * Math.sin(a)];
  };
  const arc = (from, to, r) => {
    const [x1, y1] = pt(from, r);
    const [x2, y2] = pt(to, r);
    const large = (to - from + 12) % 12 > 6 ? 1 : 0;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)}A${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  };
  return (
    <div className="qh-dial">
      <div className="qh-dial-art">
        <svg viewBox="0 0 360 360" aria-hidden="true">
          <circle cx={C} cy={C} r={R + 22} fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" />
          <path d={arc(10, 15, R - 34)} fill="none" stroke="rgba(124,196,255,.35)" strokeWidth="18" strokeLinecap="round" />
          <path d={arc(8, 10, R)} fill="none" stroke="var(--qh-sun)" strokeWidth="14" strokeLinecap="round" />
          <path d={arc(4, 6, R)} fill="none" stroke="var(--qh-sun)" strokeWidth="14" strokeLinecap="round" />
          {M.map((m, k) => {
            const [x, y] = pt(k + 0.5, R + 36);
            const [tx, ty] = pt(k, R + 10);
            const [tx2, ty2] = pt(k, R - 10);
            return (
              <g key={k}>
                <path d={`M${tx.toFixed(1)} ${ty.toFixed(1)}L${tx2.toFixed(1)} ${ty2.toFixed(1)}`} stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
                <text x={x} y={y + 4} textAnchor="middle" className="qh-dial-m">{m}</text>
              </g>
            );
          })}
          <g className="qh-dial-hand">
            <path d={`M${C} ${C}L${C} ${C - R + 6}`} stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            <circle cx={C} cy={C - R + 6} r="6" fill="#fff" />
          </g>
          <circle cx={C} cy={C} r="30" fill="#0d3d70" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
          <path d={`M${C - 14} ${C + 4}h28M${C} ${C - 12}l14 12M${C} ${C - 12}l-14 12`} stroke="var(--qh-sun)" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
        {before && <span className="qh-leak-tag qh-dial-t1">{before}</span>}
        {after && <span className="qh-leak-tag qh-dial-t2">{after}</span>}
      </div>
      {report && (
        <p className="qh-fin-tags">
          <span className="qh-leak-tag qh-fin-t2">{report}</span>
        </p>
      )}
      {caption && <p className="qh-leak-cap">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Reviews hero visual: the page's photo with a review being written over it: five stars fill one by one, lines of text appear, then the
// "Post" button lights up; Google and Yelp are the two places to post (the page: pick the office, then Google or Yelp)
export function QhReviewCompose({ image, alt = '', caption, links = [] }) {
  return (
    <div className="qh-compose">
      <div className="qh-compose-photo">{image && <Image src={image} alt={alt} fill sizes="(min-width: 1081px) 40vw, 100vw" quality={65} priority />}</div>
      <div className="qh-compose-card" aria-hidden="true">
        <div className="qh-compose-head">
          <span className="qh-compose-avatar" />
          <span>
            <b>Your review</b>
            <small>Quality Roofing Specialists</small>
          </span>
        </div>
        <div className="qh-compose-stars">
          {[0, 1, 2, 3, 4].map((k) => (
            <span key={k} style={{ animationDelay: `${0.5 + k * 0.25}s` }}>★</span>
          ))}
        </div>
        <span className="qh-compose-line" style={{ animationDelay: '2s' }} />
        <span className="qh-compose-line" style={{ animationDelay: '2.5s' }} />
        <span className="qh-compose-line short" style={{ animationDelay: '3s' }} />
        <span className="qh-compose-post">
          <GoogleG /> Post on Google
        </span>
      </div>
      {caption && <p className="qh-leak-cap">{caption}</p>}
      {links.length > 0 && (
        <ul className="qh-leak-links">
          {links.map((l) => (
            <li key={l.href}>
              <SiteLink href={l.href}>{l.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
const GoogleG = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.8 6C12.4 13.7 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 7l7.2 5.6c4.2-3.9 7.1-9.6 7.1-17.1z" />
    <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.3.8-4.7l-7.8-6C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.8-6z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.2-5.6c-2 1.4-4.6 2.2-8.7 2.2-6.3 0-11.6-4.2-13.5-9.9l-7.8 6C6.6 42.6 14.6 48 24 48z" />
  </svg>
);

// Roofing glossary hero visual: a roof cut-away with numbered parts. Each part lights up in turn while its definition (from the glossary itself)
// shows in the card below, and the card links to the term. CSS only; the first term shows, still, for reduced motion.
// spots: [{ term, def, x, y }] with x, y in the 560 x 330 drawing
export function QhRoofAnatomy({ spots = [], caption }) {
  const n = spots.length;
  const slot = 3.2;
  const show = `0%,${(100 / n - 0.8).toFixed(2)}%{opacity:1;transform:none}${(100 / n).toFixed(2)}%,100%{opacity:0;transform:translateY(6px)}`;
  const glow = `0%,${(100 / n - 0.8).toFixed(2)}%{fill:var(--qh-sun);r:15px}${(100 / n).toFixed(2)}%,100%{fill:#fff;r:11px}`;
  const delay = (i) => `${i ? -(n - i) * slot : 0}s`;
  return (
    <div className="qh-anat" style={{ '--qh-cycle': `${n * slot}s` }}>
      <style>{`@keyframes qhAnatDef{${show}}@keyframes qhAnatDot{${glow}}`}</style>
      <svg viewBox="0 0 560 330" aria-hidden="true">
        {/* house and gable roof, cut away at the left to show the layers */}
        <rect x="90" y="190" width="380" height="130" fill="#24384f" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
        <path d="M60 196L280 52L500 196Z" fill="#5d646b" />
        <path d="M60 196L280 52L500 196" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <path key={k} d={`M${100 + k * 18} ${170 - k * 12}L${470 - k * 18} ${170 - k * 12}`} stroke="rgba(0,0,0,.22)" strokeWidth="1.5" />
        ))}
        {/* cut-away: shingles removed to show the underlayment and the deck */}
        <path d="M60 196L150 137L190 162L118 210Z" fill="#b98b57" />
        <path d="M84 196L156 149L180 164L112 206Z" fill="#2e3a47" />
        {/* valley from a cross gable, chimney with flashing, drip edge */}
        <path d="M330 196L392 130L454 196Z" fill="#6b7480" stroke="rgba(0,0,0,.25)" strokeWidth="1.5" />
        <path d="M330 196L392 130" stroke="#3b4d61" strokeWidth="4" />
        <rect x="214" y="70" width="30" height="52" fill="#5a3d33" />
        <path d="M208 120L214 116V70M244 116l8 6" fill="none" stroke="var(--qh-sun)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M58 197H502" stroke="var(--qh-sun)" strokeWidth="3" />
        {spots.map((sp, i) => (
          <g key={sp.term}>
            <circle className="qh-anat-dot" style={{ animationDelay: delay(i) }} cx={sp.x} cy={sp.y} r="11" />
            <text x={sp.x} y={sp.y + 4.5} textAnchor="middle" className="qh-anat-n">{i + 1}</text>
          </g>
        ))}
      </svg>
      <div className="qh-anat-defs">
        {spots.map((sp, i) => (
          <p key={sp.term} style={{ animationDelay: delay(i) }}>
            <b>
              {i + 1}. {sp.term}
            </b>
            {sp.def}
          </p>
        ))}
      </div>
      {caption && <p className="qh-leak-cap">{caption}</p>}
    </div>
  );
}

// Credentials hero visual: the page's photo with a license card over it. Each fact (CSLB number, licensed since, status, BBB) gets its check
// mark in turn, then a "Verified" stamp lands; the card links to the CSLB website so anyone can check the license themselves
export function QhLicenseCard({ image, alt = '', facts = [], verify, caption, title = 'California contractor license', stamp = 'Verified', position }) {
  return (
    <div className="qh-compose qh-lic">
      <div className="qh-compose-photo">
        {image && <Image src={image} alt={alt} fill sizes="(min-width: 1081px) 40vw, 100vw" quality={65} priority style={position ? { objectPosition: position } : undefined} />}
      </div>
      <div className="qh-compose-card qh-lic-card">
        <b className="qh-lic-title">{title}</b>
        <dl>
          {facts.map((f, i) => (
            <div key={f.label} style={{ animationDelay: `${0.5 + i * 0.45}s` }}>
              <dt>{f.label}</dt>
              <dd>
                {f.value}
                <Check />
              </dd>
            </div>
          ))}
        </dl>
        {stamp && <span className="qh-lic-stamp" aria-hidden="true">{stamp}</span>}
        {verify && (
          <a className="qh-lic-link" href={verify.href} target="_blank" rel="noopener">
            {verify.label}
          </a>
        )}
      </div>
      {caption && <p className="qh-leak-cap">{caption}</p>}
    </div>
  );
}

// Careers hero visual: the page's photo with a "Now hiring" card listing the roles we hire for, each ticked in turn, and a link to email us
export function QhHiringCard({ image, alt = '', position, roles = [], email, caption }) {
  return (
    <div className="qh-compose qh-lic">
      <div className="qh-compose-photo">
        {image && <Image src={image} alt={alt} fill sizes="(min-width: 1081px) 40vw, 100vw" quality={65} priority style={position ? { objectPosition: position } : undefined} />}
      </div>
      <div className="qh-compose-card qh-lic-card">
        <span className="qh-hire-tag">Now hiring</span>
        <b className="qh-lic-title">Roles we hire for</b>
        <dl>
          {roles.map((r, i) => (
            <div key={r} style={{ animationDelay: `${0.5 + i * 0.45}s` }}>
              <dt>{r}</dt>
              <dd>
                <Check />
              </dd>
            </div>
          ))}
        </dl>
        {email && (
          <a className="qh-lic-link" href={email}>
            Email us your info
          </a>
        )}
      </div>
      {caption && <p className="qh-leak-cap">{caption}</p>}
    </div>
  );
}

// Contractors hero visual: a project schedule like a general contractor keeps. Trade bars for framing, roofing, electrical and finish work; the
// roofing bar is gold, fills in on time and is tagged as running under the contractor's brand (the page: roofing handled, white-label available)
export function QhTradeSchedule({ caption, labels = [] }) {
  const trades = [
    ['Framing', 0, 30],
    ['Roofing', 22, 34],
    ['Electrical', 40, 30],
    ['Finish work', 62, 36],
  ];
  const [scope, photos] = labels;
  return (
    <div className="qh-sched">
      <div className="qh-sched-card" aria-hidden="true">
        <div className="qh-sched-head">
          <b>Project schedule</b>
          <span>Weeks 1–8</span>
        </div>
        <div className="qh-sched-grid">
          {trades.map(([t, start, len]) => (
            <div className={`qh-sched-row${t === 'Roofing' ? ' roof' : ''}`} key={t}>
              <span className="qh-sched-name">{t}</span>
              <span className="qh-sched-track">
                <i style={{ left: `${start}%`, width: `${len}%` }} />
              </span>
            </div>
          ))}
        </div>
        <span className="qh-sched-tag">Roofing under your brand</span>
      </div>
      <p className="qh-fin-tags">
        {scope && <span className="qh-leak-tag">{scope}</span>}
        {photos && <span className="qh-leak-tag qh-fin-t2">{photos}</span>}
      </p>
      {caption && <p className="qh-leak-cap">{caption}</p>}
    </div>
  );
}

// Contact hero visual: the page's photo with a "Talk to a roofer" card of real links: call (the phone row rings), email and the estimate form
export function QhContactCard({ image, alt = '', rows = [], caption }) {
  return (
    <div className="qh-compose qh-lic">
      <div className="qh-compose-photo">{image && <Image src={image} alt={alt} fill sizes="(min-width: 1081px) 40vw, 100vw" quality={65} priority />}</div>
      <div className="qh-compose-card qh-lic-card qh-contact-card">
        <b className="qh-lic-title">Talk to a roofer</b>
        <ul>
          {rows.map((r, i) => (
            <li key={r.href} className={i === 0 ? 'ring' : undefined}>
              <a href={r.href}>
                <span className="qh-contact-ico" aria-hidden="true">{r.icon}</span>
                <span>
                  <b>{r.label}</b>
                  <small>{r.value}</small>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {caption && <p className="qh-leak-cap">{caption}</p>}
    </div>
  );
}

// Emergency roof repair hero visual: a house at night in the rain, lightning now and then, and a blue tarp sliding over the damaged part of the
// roof (the page: stop the water now, fix it properly next); labels from the page (after-hours calls, tarps when needed, photos for insurance)
export function QhStormTarp({ labels = [], caption }) {
  const [calls, tarp, photos] = labels;
  // A house at night in the storm, drawn like the real thing (owner, November 11 2026; same tags, caption, rain, flash, bolt and tarp motion):
  // storm clouds, a shingle roof with a ridge cap, gutters and a brick chimney, the damaged patch with lifted shingles over bare deck, the
  // tarp with its folds, grommets, a rope and sandbags, lit windows with frames and a porch light, and the wet ground reflecting them.
  return (
    <div className="qh-storm">
      <div className="qh-leak-art">
        <svg viewBox="0 0 560 380" aria-hidden="true">
          <defs>
            <pattern id="qhStShingle" width="40" height="13" patternUnits="userSpaceOnUse">
              <rect width="40" height="13" fill="#4c555e" />
              <rect x="0" y="0" width="20" height="12" fill="#515a64" />
              <path d="M0 12.5H40" stroke="rgba(0,0,0,.55)" strokeWidth="1.6" />
              <path d="M10 0V12M30 6V12" stroke="rgba(0,0,0,.35)" strokeWidth="1" />
            </pattern>
            <pattern id="qhStBrick" width="14" height="8" patternUnits="userSpaceOnUse">
              <rect width="14" height="8" fill="#5a3a30" />
              <path d="M0 7.5h14M7 0v4M0 4h14M3.5 4v4M10.5 4v8" stroke="#8d7a6c" strokeWidth="1" />
            </pattern>
            <linearGradient id="qhStWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#26364a" />
              <stop offset="1" stopColor="#15243a" />
            </linearGradient>
            <linearGradient id="qhStGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffe9a8" />
              <stop offset="1" stopColor="#f0b43c" />
            </linearGradient>
            <linearGradient id="qhStTarp" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#4a8fe0" />
              <stop offset="0.5" stopColor="#2f73c9" />
              <stop offset="1" stopColor="#1f5496" />
            </linearGradient>
            <radialGradient id="qhStCloud" cx="0.5" cy="0.6" r="0.6">
              <stop offset="0" stopColor="#2b3b50" />
              <stop offset="1" stopColor="#101c2c" />
            </radialGradient>
            <linearGradient id="qhStGround" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0f1d2e" />
              <stop offset="1" stopColor="#060d16" />
            </linearGradient>
          </defs>
          <rect className="qh-storm-flash" x="0" y="0" width="560" height="380" fill="#cfe0f2" />
          {/* Storm clouds */}
          {[[90, 40, 120, 34], [230, 28, 150, 40], [420, 44, 130, 34], [520, 30, 90, 28]].map(([cx, cy, rx, ry]) => (
            <ellipse key={cx} cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#qhStCloud)" />
          ))}
          <path className="qh-storm-bolt" d="M432 0l-26 64h22l-30 70 52-86h-24l22-48z" fill="#fff" />
          {/* Wet ground with the windows' reflections */}
          <rect x="0" y="368" width="560" height="12" fill="url(#qhStGround)" />
          <rect x="146" y="368" width="56" height="12" fill="rgba(240,180,60,.18)" />
          <rect x="358" y="368" width="56" height="12" fill="rgba(240,180,60,.18)" />
          {/* The house: wall, windows with frames and mullions, the door and its porch light */}
          <rect x="110" y="198" width="340" height="170" fill="url(#qhStWall)" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" />
          {[146, 358].map((x) => (
            <g key={x}>
              <rect x={x - 4} y="232" width="64" height="56" rx="2" fill="#c9c2b6" />
              <rect x={x} y="236" width="56" height="48" rx="1" fill="url(#qhStGlow)" />
              <path d={`M${x + 28} 236v48M${x} 260h56`} stroke="#c9c2b6" strokeWidth="2.5" />
              <ellipse cx={x + 28} cy="300" rx="44" ry="14" fill="rgba(240,180,60,.12)" />
            </g>
          ))}
          <rect x="248" y="266" width="64" height="102" rx="2" fill="#c9c2b6" />
          <rect x="252" y="270" width="56" height="98" fill="#2a1d14" />
          <rect x="259" y="278" width="42" height="24" fill="url(#qhStGlow)" opacity="0.85" />
          <circle cx="300" cy="322" r="2" fill="#d6c08a" />
          <rect x="274" y="252" width="12" height="7" rx="2" fill="#2b323a" />
          <ellipse cx="280" cy="262" rx="22" ry="7" fill="rgba(255,236,170,.3)" />
          {/* The roof: deck edge, shingles, ridge cap, gutters, drip edge and the chimney */}
          <path d="M80 206L280 70L480 206Z" fill="url(#qhStShingle)" />
          <path d="M280 70L480 206L80 206Z" fill="rgba(0,0,0,.12)" />
          <path d="M270 76l10-8 10 8" fill="none" stroke="#353b44" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="376" y="96" width="34" height="70" fill="url(#qhStBrick)" />
          <rect x="371" y="92" width="44" height="7" rx="1" fill="#a39b8c" />
          <path d="M376 166l-6-4h46l-6 4z" fill="var(--qh-sun)" />
          <path d="M80 206H480" stroke="var(--qh-sun)" strokeWidth="3" />
          <path d="M72 208h416" stroke="#8a949f" strokeWidth="6" strokeLinecap="round" />
          <path d="M76 211v157M484 211v157" stroke="#8a949f" strokeWidth="4" />
          {/* The damage: lifted and torn shingles over bare deck */}
          <path d="M318 128l40 28-22 20-40-24z" fill="#b98b57" />
          <path d="M322 130l32 22-18 16-32-20z" fill="#8d6b47" />
          <path d="M326 134l8 10M342 148l-6 8M334 130l10 8" stroke="#5a4330" strokeWidth="2" />
          <path d="M296 124l26-6-8 12z" fill="#2a2f35" />
          <path d="M360 160l12 4-10 10z" fill="#2a2f35" />
          {/* The tarp: folds, a highlight, grommets, the rope to the eave and sandbags */}
          <g className="qh-storm-tarp">
            <path d="M300 112L378 160L350 190L276 144Z" fill="url(#qhStTarp)" stroke="#1e4f8e" strokeWidth="2" />
            <path d="M312 120l54 34M292 136l54 34" stroke="rgba(255,255,255,.25)" strokeWidth="1.5" />
            <path d="M304 116l20 12" stroke="rgba(255,255,255,.5)" strokeWidth="2" strokeLinecap="round" />
            {[[302, 114], [376, 158], [352, 188], [278, 142]].map(([x, y]) => (
              <circle key={x + y} cx={x} cy={y} r="2.6" fill="#0f2d55" stroke="#9fc3ea" strokeWidth="1" />
            ))}
            <path d="M352 188l16 16M278 142l-22 42" stroke="#d9c8a0" strokeWidth="1.5" />
            <path d="M360 190q10-2 16 6t-4 10q-12 0-12-16z" fill="#8b7a5a" stroke="rgba(0,0,0,.35)" />
            <path d="M250 184q10-2 16 6t-4 10q-12 0-12-16z" fill="#8b7a5a" stroke="rgba(0,0,0,.35)" />
          </g>
          {/* Rain */}
          <g className="qh-rain">
            {Array.from({ length: 34 }, (_, k) => {
              const x = (k * 61) % 560;
              const y = (k * 37) % 300;
              return <path key={k} d={`M${x} ${y}l-6 18`} stroke="rgba(160,200,240,.55)" strokeWidth="1.6" strokeLinecap="round" />;
            })}
          </g>
        </svg>
        {calls && <span className="qh-leak-tag qh-storm-t1">{calls}</span>}
        {tarp && <span className="qh-leak-tag qh-storm-t2">{tarp}</span>}
        {photos && <span className="qh-leak-tag qh-storm-t3">{photos}</span>}
      </div>
      {caption && <p className="qh-leak-cap">{caption}</p>}
    </div>
  );
}

// Credentials and numbers (the content of the service pages' "Local roofers. Real accountability.")
export function QhAccount({ commercial = false, lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  const points = [
    T('Licensed, bonded and insured California contractor, CSLB #{license}', { license: BUSINESS.license }),
    'Certified with the manufacturers whose systems we install',
    'We pull the permits',
    'A written scope and price before any work',
    '10-year workmanship warranty on installs (call for details)',
  ].map((p, i) => (i ? T(p) : p));
  const stats = [
    [GOOGLE_REVIEWS.count, 'Google reviews from the people we roof for'],
    ['2020', 'Licensed California contractor since'],
    ['12', 'Crews for shingle, tile and flat roofs'],
    ['3', 'Languages: English, Spanish and Tagalog'],
  ].map(([n, l]) => [n, T(l)]);
  return (
    <section className="qh-section qh-account" aria-labelledby="qh-acc-h">
      <div className="qh-wrap">
        <div>
          <p className="qh-kicker">{T('Credentials')}</p>
          <h2 id="qh-acc-h">{T('Local roofers. Real accountability.')}</h2>
          <p className="qh-lede">
            {commercial
              ? 'A roofer surveys your building first, and you get photos and a written scope and price before any work. One company answers for the roof, from the survey to the closeout photos for your files.'
              : T('A roofer looks at your roof first, and you get photos and a written price before anything starts. One family-owned company answers for the roof, from the first visit to the walk across the finished roof with you.')}
          </p>
          <ul className="qh-list">
            {points.map((p) => (
              <li key={p}>
                <Check />
                {p}
              </li>
            ))}
          </ul>
          <SiteLink className="qh-link" href="/credentials/">{T('See our credentials')}</SiteLink>
        </div>
        <div className="qh-stats">
          {stats.map(([n, l]) => (
            <div key={l}>
              <b>{n}</b>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// The written-price offer (home: the free roof evaluation; commercial: the roofer-led roof survey, never called free)
export function QhOffer({ offer = 'home', lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  const o = OFFERS[offer] || OFFERS.home;
  const home = offer !== 'commercial';
  return (
    <section className="qh-section qh-offer" aria-labelledby="qh-off-h">
      <div className="qh-wrap">
        <div>
          <p className="qh-kicker">{T(home ? 'Roof evaluation' : 'Roof survey')}</p>
          <h2 id="qh-off-h">{T(home ? 'A written price, before any work.' : 'A written scope, before any work.')}</h2>
          <p className="qh-lede">{T(home ? 'Start with a free roof evaluation. A roofer tells you what’s worth fixing, and you decide what to hire us for.' : o.text)}</p>
          <ul className="qh-list">
            {o.points.map((p) => (
              <li key={p.title}>
                <Check />
                <span>
                  <b>{T(p.title)}</b> {T(p.text)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="qh-offer-card">
          <small>{T(o.eyebrow)}</small>
          <h3>{T(home ? 'Roof evaluation' : 'Roof survey')}</h3>
          <p className="qh-offer-big">{T(home ? 'Free' : 'Roofer-led')}</p>
          <p className="qh-offer-sub">{T(home ? 'no obligation' : 'written scope and price')}</p>
          <p>{T(home ? o.text : 'Photos you can share with owners and tenants, and a clear next step.')}</p>
          <SiteLink className="qh-btn qh-btn-sun" href="#roof-check">{T(home ? 'Book my free evaluation' : 'Request a roof survey')}</SiteLink>
        </div>
      </div>
    </section>
  );
}

// Residential or commercial (owner, November 6 2026): two large centered buttons, one for each section's main page
export function QhChoice({ lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  const options = [
    {
      href: '/residential-roofing/',
      title: 'Residential',
      text: 'Homes, ADUs, HOAs and multi-family: shingle, tile and flat roofs',
      icon: <path d="M3 11.5L12 4l9 7.5M5.5 9.5V20h13V9.5M10 20v-5.5h4V20" />,
    },
    {
      href: '/commercial-roofing/',
      title: 'Commercial',
      text: 'Offices, retail, warehouses, churches and industrial buildings',
      icon: <path d="M3 21h18M5 21V5h9v16M14 9h5v12M8 8h3M8 11h3M8 14h3M8 17h3M16.5 12h1M16.5 15h1M16.5 18h1" />,
    },
  ];
  return (
    <section className="qh-section qh-choice" aria-labelledby="qh-choice-h">
      <div className="qh-wrap">
        <p className="qh-kicker">{T('Start here')}</p>
        <h2 id="qh-choice-h">{T('What kind of property is the roof on?')}</h2>
        <div className="qh-choice-grid">
          {options.map((o) => (
            <SiteLink className="qh-choice-btn" href={o.href} key={o.href}>
              <span className="qh-choice-ico" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {o.icon}
                </svg>
              </span>
              <span className="qh-choice-copy">
                <b>{T(o.title)}</b>
                <span>{T(o.text)}</span>
              </span>
              <span className="qh-choice-arrow" aria-hidden="true">→</span>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

// The five facts under the hero
export function QhTrust({ lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  const google = TRUST_LOGOS.find((l) => l.id === 'google');
  return (
    <section className="qh-trust" aria-label={T('Why homeowners and clients trust QRS')}>
      <div className="qh-wrap">
        <ul>
          <li>
            <a href={google.href} target="_blank" rel="noopener"><strong>{T('{count} Google reviews', { count: GOOGLE_REVIEWS.count })}</strong></a>
            <span>{T('From homes & businesses')}</span>
          </li>
          <li>
            <a href={BBB.url} target="_blank" rel="noopener"><strong>BBB {BBB.rating}</strong></a>
            <span>{T('Accredited business')}</span>
          </li>
          <li>
            <SiteLink href="/credentials/"><strong>{T('10-year warranty')}</strong></SiteLink>
            <span>{T('On workmanship, call for details')}</span>
          </li>
          <li>
            <strong>{T('Permits handled')}</strong>
            <span>{T('We pull the building permits')}</span>
          </li>
          <li>
            <a href="https://www.cslb.ca.gov/" target="_blank" rel="noopener"><strong>CSLB #{BUSINESS.license}</strong></a>
            <span>{T('Licensed, bonded & insured')}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

// A heading and text beside a three-photo collage. `paragraphs` take [links](/path/) and **bold**; the first is the larger lede
export function QhStory({ id, kicker, heading, headingTag = 'h2', chips, paragraphs = [], images, link, actions }) {
  const H = headingTag;
  return (
    <section className="qh-section qh-story" id={id} aria-labelledby={`${id || 'qh-story'}-h`}>
      <div className="qh-wrap">
        <div className="qh-collage">
          {images.map((img, i) => (
            <Image key={img.src} src={img.src} alt={img.alt} width={i === 0 ? 900 : 600} height={i === 0 ? 900 : 400} sizes={i === 0 ? '(min-width: 861px) 30vw, 60vw' : '(min-width: 861px) 20vw, 40vw'} quality={60} />
          ))}
        </div>
        <div>
          {kicker && <p className="qh-kicker">{kicker}</p>}
          <H id={`${id || 'qh-story'}-h`} className={H === 'h2' ? undefined : 'qh-h2'}>{heading}</H>
          {chips?.length > 0 && (
            <ul className="qh-owned">
              {chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          )}
          {paragraphs.map((p, i) => (
            <p key={p} className={i === 0 ? 'qh-lede' : undefined}>
              <Rich text={p} />
            </p>
          ))}
          {link && <SiteLink className="qh-link" href={link.href}>{link.label}</SiteLink>}
          {actions}
        </div>
      </div>
    </section>
  );
}

// The services list with the photo that swaps on hover. items: [{ title, text, href, image, caption }]; cats: [{ label, href }]
export function QhServices({ id = 'services', kicker, heading, lede, cats = [], items }) {
  return (
    <section className="qh-section qh-svc" id={id} aria-labelledby={`${id}-h`}>
      <div className="qh-wrap">
        <div className="qh-svc-head">
          <div>
            {kicker && <p className="qh-kicker">{kicker}</p>}
            <h2 id={`${id}-h`}>{heading}</h2>
          </div>
          <div>
            {lede && <p className="qh-lede"><Rich text={lede} /></p>}
            {cats.length > 0 && (
              <div className="qh-cats">
                {cats.map((c) => (
                  <SiteLink key={c.href} href={c.href}>{c.label}</SiteLink>
                ))}
              </div>
            )}
          </div>
        </div>
        <QrsHomeServices items={items} />
      </div>
    </section>
  );
}

// A grid of link cards: rows [{ id, title, text, links: [{ label, href }] }]
export function QhFinder({ id = 'find-a-service', kicker, heading, intro, rows }) {
  return (
    <section className="qh-section qh-finder" id={id} aria-labelledby={`${id}-h`}>
      <div className="qh-wrap">
        {kicker && <p className="qh-kicker">{kicker}</p>}
        <h2 id={`${id}-h`}>{heading}</h2>
        {intro && <p className="qh-lede">{intro}</p>}
        <div className="qh-finder-grid">
          {rows.map((r) => (
            <div className="qh-finder-card" id={r.id} key={r.id}>
              <h3>{r.title}</h3>
              <p><Rich text={r.text} /></p>
              <ul>
                {r.links.map((l) => (
                  <li key={l.href}>
                    <SiteLink href={l.href}>{l.label} <span className="arrow" aria-hidden="true">→</span></SiteLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Points with icons in a hairline grid (ReserveReady on the home page, roof conditions on Residential). items: [{ title, text, icon }]
export function QhPoints({ id, kicker, name, heading, paragraphs = [], actions, items }) {
  return (
    <section className="qh-section qh-program" id={id} aria-labelledby={`${id}-h`}>
      <div className="qh-wrap">
        <div>
          {name && <p className="qh-program-name"><Rich text={name} /></p>}
          {kicker && <p className="qh-kicker">{kicker}</p>}
          <h2 id={`${id}-h`}>{heading}</h2>
          {paragraphs.map((p, i) => (
            <p key={p} className={i === 0 ? 'qh-lede' : undefined}>
              <Rich text={p} />
            </p>
          ))}
          {actions}
        </div>
        <div className="qh-feat">
          {items.map((f) => (
            <div key={f.title}>
              {f.icon && (
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{f.icon}</svg>
              )}
              <h3>{f.title}</h3>
              <p><Rich text={f.text} /></p>
              {f.bullets?.length > 0 && (
                <ul className="qh-bullets">
                  {f.bullets.map((b) => (
                    <li key={b}><Rich text={b} /></li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const STEPS = [
  { title: 'A roofer looks first', text: 'A field inspector, lead roofer or estimator on our team inspects your roof, with drone footage of the areas of concern. For homes it’s free.' },
  { title: 'You see what we see', text: 'Photos and plain-English findings, plus a clear next step: repair, monitor, maintain or replace.' },
  { title: 'The price goes in writing', text: 'A written scope and price before any work starts. You decide with the facts in front of you.' },
  { title: 'A clean, backed job', text: 'Permits pulled, landscaping tarped, a nail sweep every day and a 10-year workmanship warranty on installs (call for details).' },
];

export function QhSteps({ heading, steps = STEPS, image, imageAlt = '', kicker, actions, lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  heading = heading || T('No pressure, no mystery pricing, no surprises.');
  kicker = kicker || T('How we work');
  return (
    <section className="qh-section qh-process" aria-labelledby="qh-proc-h">
      <div className="qh-wrap">
        <p className="qh-kicker">{kicker}</p>
        <h2 id="qh-proc-h">{heading}</h2>
        {image && (
          <figure className="qh-steps-photo">
            <Image src={image} alt={imageAlt} fill sizes="(min-width: 1200px) 1100px, 100vw" quality={60} />
          </figure>
        )}
        <ol className="qh-steps">
          {steps.map((s) => (
            <li key={s.title}>
              <h3>{T(s.title)}</h3>
              <p><Rich text={T(s.text)} /></p>
            </li>
          ))}
        </ol>
        {actions === undefined ? (
          <div className="qh-actions">
            <SiteLink className="qh-btn qh-btn-navy" href="#roof-check">{T('Book your free evaluation')}</SiteLink>
            <SiteLink className="qh-link" href="/credentials/">{T('See our credentials')}</SiteLink>
          </div>
        ) : (
          actions
        )}
      </div>
    </section>
  );
}

// City, county and region names, to keep them out of the review shown
const PLACE_NAMES = [...new Set([...ALL_PLACES.map((p) => p.city || p.name), 'Los Angeles', 'Orange County', 'Southern California', 'Inland Empire', 'Encino'])].filter(Boolean);

// The review count and one real review, the one closest to the page's topic
export function QhReviews({ path = '/', heading, lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  heading = heading || T('What people say after the job');
  const google = TRUST_LOGOS.find((l) => l.id === 'google');
  // The hand-picked reviews closest to the page's topic (the home page leads with Samuel's); the rotator adds the live Google reviews in the browser
  const sorted = sortReviewsFor(REVIEWS, path);
  const lead = path === '/' ? REVIEWS.find((r) => /^Samuel/.test(r.name)) : null;
  let initial = (lead ? [lead, ...sorted.filter((r) => r !== lead)] : sorted).map(({ name, text }) => ({ name, text }));
  // Spanish: only the reviews translated for the Spanish page (labelled as translated); live Google reviews stay English, so none are added
  if (lang === 'es') initial = REVIEWS.filter((r) => ES_HOME_REVIEWS[r.name]).map((r) => ({ name: r.name, text: ES_HOME_REVIEWS[r.name], translated: true }));
  return (
    <section className="qh-section qh-reviews" id="reviews" aria-labelledby="qh-rev-h">
      <div className="qh-wrap">
        <div className="qh-score">
          <b>{GOOGLE_REVIEWS.count}</b>
          <span>{T('Google reviews from homes & businesses')}</span>
        </div>
        <div>
          <h2 id="qh-rev-h" className="qh-sr">{heading}</h2>
          <QhReviewRotator initial={initial} placeNames={PLACE_NAMES} lang={lang} />
          <div className="qh-badges">
            <a href={google.href} target="_blank" rel="noopener">{T('Read all reviews on Google')}</a>
            <a href={BBB.url} target="_blank" rel="noopener">{T('BBB accredited, {rating} rating', { rating: BBB.rating })}</a>
            <SiteLink href="/reviews/">{T('More reviews')}</SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}

const projectTag = (p) => (/commercial/.test(p.path) ? 'Commercial' : 'Residential');
const projectName = (p) => (p.label || p.title).replace(/,?\s*\d{5}$/, '').replace(/,\s*[^,]*$/, '');

export function QhProjects({ projects = [], heading, lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  heading = heading || T('Roofs we’ve finished, tear-off to last row.');
  if (!projects.length) return null;
  return (
    <section className="qh-section qh-projects" aria-labelledby="qh-proj-h">
      <div className="qh-wrap">
        <div className="qh-row-head">
          <div>
            <p className="qh-kicker">{T('Featured projects')}</p>
            <h2 id="qh-proj-h">{heading}</h2>
          </div>
          <SiteLink className="qh-link" href="/projects/">{T('See all projects')}</SiteLink>
        </div>
        <div className={'qh-proj-grid' + (projects.length < 3 ? ' few' : projects.length > 3 ? ' four' : '')}>
          {projects.slice(0, 4).map((p) => (
            <SiteLink className="qh-proj" href={p.path} key={p.path}>
              <Image src={p.image} alt={projectName(p)} fill sizes="(min-width: 861px) 55vw, 100vw" quality={60} />
              <span className="qh-cap">
                <span className="qh-tagpill">{T(projectTag(p))}</span>
                <span className="qh-proj-title">{projectName(p)}</span>
              </span>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QhBanner({ heading, text, image = '/images/shingle-roof-care-multi-family.webp', cta, href = '#roof-check', links = true, lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  heading = heading || T('Let us look at your roof and put a plan in writing.');
  cta = cta || T('Request a free evaluation');
  return (
    <section className="qh-banner" aria-labelledby="qh-ban-h">
      <Image src={image} alt="" fill sizes="100vw" quality={60} />
      <div className="qh-wrap">
        <h2 id="qh-ban-h">{heading}</h2>
        <p>{text}</p>
        <div className="qh-actions">
          <SiteLink className="qh-btn qh-btn-sun" href={href}>{cta}</SiteLink>
          {links && (
            <>
              <a className="qh-btn qh-btn-ghost" href={TEL}>{T('Call {phone}', { phone: PHONE })}</a>
              <SiteLink className="qh-link qh-link-light" href="/service-areas/">{T('All service areas')}</SiteLink>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export function QhPosts({ posts = [], kicker, heading, lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  kicker = kicker || T('Roofing articles');
  heading = heading || T('Straight answers from our roofers.');
  if (!posts.length) return null;
  return (
    <section className="qh-section qh-posts-sec" aria-labelledby="qh-ins-h">
      <div className="qh-wrap">
        <div className="qh-row-head">
          <div>
            <p className="qh-kicker">{kicker}</p>
            <h2 id="qh-ins-h">{heading}</h2>
            {lang === 'es' && <p className="qh-lede">{T('Articles in English')}</p>}
          </div>
          <SiteLink className="qh-link" href={BLOG_LINK.href}>{T('See all articles')}</SiteLink>
        </div>
        <div className="qh-posts">
          {posts.map((post) => (
            <SiteLink className="qh-post" href={blogPath(post.slug)} key={post.slug} prefetch={false}>
              {(post.image || post.cardImage) && (
                <span className="qh-post-img">
                  <Image src={post.image || post.cardImage} alt="" fill sizes="(min-width: 861px) 33vw, 120px" quality={60} />
                </span>
              )}
              <time dateTime={post.datePublished}>{articleDate(post.datePublished, lang)}</time>
              <span className="qh-post-title">{placeless(post.title)}</span>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}

// An article's title on these pages' cards, without the place it names (owner, November 6 2026: city names only on the location pages);
// the article itself keeps its title
const placeless = (title) =>
  title
    .replace(/\b(LA|SoCal|Los Angeles|Southern California)\s+(Homeowners|Guide)/g, '$2')
    .replace(/\s+([Ii]n|[Ff]or|[Ss]erving|[Aa]cross)\s+(the\s+)?(Los Angeles|LA|Southern California|SoCal|Orange County)(\s*(&|and)\s*Orange County)?\b/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

// The FAQ beside the site's estimate form (#roof-check / #estimate)
export function QhStart({ faqs = [], heading, formHeading, offer = 'home', finance = true, lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  heading = heading || T('What homeowners ask us most.');
  const home = offer !== 'commercial';
  return (
    <section className="qh-section qh-start" id="roof-check" aria-labelledby="qh-faq-h">
      <div className="qh-wrap">
        <div className="qh-faq">
          <p className="qh-kicker">{T('Questions')}</p>
          <h2 id="qh-faq-h">{heading}</h2>
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>
                <Rich text={f.a} />
              </p>
            </details>
          ))}
          {home && finance && (
          <p className="qh-finance">
            <strong>{T('Financing:')}</strong> {T('for home roof replacements, through Momnt Financing or Service Financing, subject to credit approval.')}{' '}
            <SiteLink href="/roof-financing/">{T('How roof financing works')}</SiteLink>
          </p>
          )}
        </div>
        <div className="qh-form-card" id="estimate">
          <h2>{formHeading || T(home ? 'Book your free roof evaluation.' : 'Request a roof survey.')}</h2>
          <ul className="qh-perks">
            <li><Check />{T('Takes about two minutes')}</li>
            <li><Check />{T('Photos and a plain-English next step')}</li>
            <li><Check />{T(home ? 'Written price before any work' : 'Written scope and price before any work')}</li>
          </ul>
          <EstimateForm />
          {lang !== 'es' && (
          <p className="qh-steps-link">
            Prefer to answer a few questions instead? <SiteLink href={START_PATH} prefetch={false}>Use the step-by-step form</SiteLink>
          </p>
          )}
        </div>
      </div>
    </section>
  );
}

// Residential hub hero visual (owner, November 12 2026: "animated and premium instead of the photo components"; it replaces the fanned photo
// cards, QhRoofFan): a street of three homes at dusk, one per roof type: a gabled home in architectural shingles with a brick chimney, a
// Spanish-style home under a hipped clay tile roof, and a modern home with a parapet and a white flat roof. A drone crosses the street on a
// 12 s loop; as it passes, each roof lights up, its name appears above it and a gold check pops ("one team for every roof"). The three roof
// types stay links to their pages (the chips under the picture). Still, with every check shown, for reduced motion.
// items: [{ title, href }] (the roof types; matched to a house by "shingle", "tile" or "flat" in the address).
export function QhHomeStreet({ items = [], caption = 'Shingle, tile and flat roofs, one team' }) {
  const pick = (word) => items.find((t) => t.href.includes(word));
  const homes = [
    { key: 'shingle', item: pick('shingle'), cx: 106, cy: 150 },
    { key: 'tile', item: pick('tile'), cx: 285, cy: 148 },
    { key: 'flat', item: pick('flat'), cx: 465, cy: 150 },
  ].filter((h) => h.item);
  const name = (t) => t.title.replace(/\s*Roofing$/i, '');
  return (
    <div className="qh-hs">
      <svg className="qh-hs-svg" viewBox="0 0 560 330" aria-hidden="true">
        <defs>
          <linearGradient id="qhHsSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a2444" />
            <stop offset="1" stopColor="#1d4a7d" />
          </linearGradient>
          <pattern id="qhHsShingle" width="34" height="11" patternUnits="userSpaceOnUse">
            <rect width="34" height="11" fill="#4a515b" />
            <rect x="0" y="0" width="17" height="10" fill="#525a65" />
            <path d="M0 10.5H34" stroke="rgba(0,0,0,.55)" strokeWidth="1.4" />
            <path d="M8 0V10M25 5V10" stroke="rgba(0,0,0,.3)" strokeWidth="1" />
          </pattern>
          <linearGradient id="qhHsCap" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8f4629" />
            <stop offset="0.45" stopColor="#d9805a" />
            <stop offset="1" stopColor="#7a3a22" />
          </linearGradient>
          <pattern id="qhHsTile" width="14" height="16" patternUnits="userSpaceOnUse">
            <rect width="14" height="16" fill="#8f4629" />
            <rect x="2" y="-1" width="10" height="15" rx="5" fill="url(#qhHsCap)" />
            <path d="M0 15.2h14" stroke="rgba(60,20,8,.6)" strokeWidth="1.6" />
          </pattern>
          <pattern id="qhHsBrick" width="12" height="7" patternUnits="userSpaceOnUse">
            <rect width="12" height="7" fill="#7a4a3c" />
            <path d="M0 6.5h12M6 0v3.5M0 3.5h12M3 3.5v3.5M9 3.5v3.5" stroke="#c9b9a8" strokeWidth=".9" />
          </pattern>
          <linearGradient id="qhHsWallA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e3dccc" />
            <stop offset="1" stopColor="#bdb4a3" />
          </linearGradient>
          <linearGradient id="qhHsWallB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0e7d6" />
            <stop offset="1" stopColor="#d2c5ac" />
          </linearGradient>
          <linearGradient id="qhHsWallC" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e9ecef" />
            <stop offset="1" stopColor="#b9c0c8" />
          </linearGradient>
          <linearGradient id="qhHsGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe9a8" />
            <stop offset="1" stopColor="#f0b43c" />
          </linearGradient>
          <linearGradient id="qhHsGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dcefff" />
            <stop offset="1" stopColor="#3f78ad" />
          </linearGradient>
        </defs>
        {/* Dusk sky, a few stars, the street */}
        <rect width="560" height="330" rx="12" fill="url(#qhHsSky)" />
        {[[40, 34], [128, 22], [226, 46], [330, 20], [418, 40], [512, 26], [476, 64], [78, 70]].map(([x, y], i) => (
          <circle key={x} className="qh-hs-star" style={{ animationDelay: `${i * 0.7}s` }} cx={x} cy={y} r="1.3" fill="#fff" />
        ))}
        <rect x="0" y="270" width="560" height="60" fill="#12233a" />
        <rect x="0" y="270" width="560" height="10" fill="#b9b4a8" />
        <path d="M0 304h560" stroke="#d9c86b" strokeWidth="1.5" strokeDasharray="16 14" />

        {/* Home 1: architectural shingles on a gable, a brick chimney, gutters */}
        <g>
          <rect x="36" y="190" width="140" height="80" fill="url(#qhHsWallA)" />
          <rect x="36" y="190" width="140" height="4" fill="rgba(0,0,0,.2)" />
          <rect x="146" y="132" width="16" height="42" fill="url(#qhHsBrick)" />
          <rect x="143" y="128" width="22" height="5" rx="1" fill="#a39b8c" />
          <path d="M22 192L106 128L190 192Z" fill="url(#qhHsShingle)" />
          <path d="M106 128L190 192L22 192Z" fill="rgba(0,0,0,.1)" />
          <path d="M98 134l8-6 8 6" fill="none" stroke="#353b44" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 194h176" stroke="#aeb6bf" strokeWidth="4" strokeLinecap="round" />
          <path d="M20 196v74" stroke="#aeb6bf" strokeWidth="3" />
          <rect x="50" y="208" width="40" height="34" rx="2" fill="#f3efe6" />
          <rect x="53" y="211" width="34" height="28" fill="url(#qhHsGlow)" />
          <path d="M70 211v28M53 225h34" stroke="#f3efe6" strokeWidth="2" />
          <rect x="124" y="208" width="40" height="34" rx="2" fill="#f3efe6" />
          <rect x="127" y="211" width="34" height="28" fill="url(#qhHsGlass)" />
          <path d="M144 211v28M127 225h34" stroke="#f3efe6" strokeWidth="2" />
          <rect x="94" y="218" width="26" height="52" rx="2" fill="#4a3a2c" stroke="#f3efe6" strokeWidth="2" />
          <circle cx="115" cy="246" r="1.6" fill="#d6c08a" />
          <path className="qh-hs-lit qh-hs-lit1" d="M22 192L106 128L190 192" fill="none" stroke="#f0b43c" strokeWidth="4" strokeLinejoin="round" />
        </g>

        {/* Home 2: a hipped clay tile roof on stucco, arched windows and door */}
        <g>
          <rect x="214" y="182" width="142" height="88" fill="url(#qhHsWallB)" />
          <rect x="214" y="182" width="142" height="4" fill="rgba(0,0,0,.18)" />
          <path d="M202 184L236 138H334L368 184Z" fill="url(#qhHsTile)" />
          <path d="M236 138H334L368 184H334Z" fill="rgba(0,0,0,.08)" />
          <path d="M234 138h102" stroke="#6f351f" strokeWidth="5" strokeLinecap="round" />
          <path d="M202 184h166" stroke="rgba(60,20,8,.5)" strokeWidth="2" />
          {[232, 318].map((x) => (
            <g key={x}>
              <path d={`M${x - 3} 246v-26a13 13 0 0 1 26 0v26z`} fill="#fff8ea" />
              <path d={`M${x} 244v-24a10 10 0 0 1 20 0v24z`} fill="url(#qhHsGlow)" />
              <path d={`M${x + 10} 210v34`} stroke="#fff8ea" strokeWidth="1.6" />
            </g>
          ))}
          <path d="M270 270v-36a15 15 0 0 1 30 0v36z" fill="#5a3a26" stroke="#fff8ea" strokeWidth="2" />
          <circle cx="294" cy="250" r="1.6" fill="#d6c08a" />
          <path className="qh-hs-lit qh-hs-lit2" d="M202 184L236 138H334L368 184" fill="none" stroke="#f0b43c" strokeWidth="4" strokeLinejoin="round" />
        </g>

        {/* Home 3: a modern home with a coped parapet around a white flat roof, big glass, a lower wing */}
        <g>
          <rect x="392" y="170" width="146" height="100" fill="url(#qhHsWallC)" />
          <rect x="486" y="200" width="60" height="70" fill="#8d6b47" />
          {[206, 214, 222, 230, 238, 246, 254, 262].map((y) => <path key={y} d={`M486 ${y}h60`} stroke="rgba(0,0,0,.18)" />)}
          <rect x="388" y="162" width="154" height="9" rx="2" fill="#a39b8c" stroke="rgba(0,0,0,.3)" />
          <rect x="392" y="158" width="146" height="5" rx="1" fill="#eef2f6" />
          <rect x="482" y="193" width="68" height="8" rx="2" fill="#a39b8c" stroke="rgba(0,0,0,.3)" />
          <rect x="404" y="186" width="70" height="56" rx="2" fill="#5d6570" />
          <rect x="407" y="189" width="64" height="50" fill="url(#qhHsGlow)" />
          <path d="M439 189v50M407 214h64" stroke="#5d6570" strokeWidth="2" />
          <rect x="500" y="216" width="28" height="54" fill="url(#qhHsGlass)" stroke="#5d6570" strokeWidth="2" />
          <rect x="430" y="150" width="22" height="9" rx="1" fill="#8a949f" />
          <path className="qh-hs-lit qh-hs-lit3" d="M388 171V162H542V171" fill="none" stroke="#f0b43c" strokeWidth="4" strokeLinejoin="round" />
        </g>

        {/* Trees and hedges between the homes */}
        {[[196, 250, 14], [378, 252, 13], [10, 256, 10]].map(([x, y, r]) => (
          <g key={x}>
            <path d={`M${x} 270V${y}`} stroke="#5a3a26" strokeWidth="4" />
            <circle cx={x} cy={y - r + 4} r={r} fill="#2f6a3a" />
            <circle cx={x - 4} cy={y - r} r={r * 0.5} fill="#4c8a4a" />
          </g>
        ))}

        {/* The drone and its scan beam */}
        <g className="qh-hs-drone">
          <path className="qh-hs-beam" d="M0 18L-46 92H46Z" fill="rgba(240,180,60,.18)" />
          <path d="M-30 4L30 8M-30 8L30 4" stroke="#aeb6bf" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="-16" y="2" width="32" height="12" rx="5" fill="#dbe7f3" stroke="#8a949f" />
          <rect x="-6" y="14" width="12" height="6" rx="2" fill="#4c555e" />
          <circle cx="0" cy="20" r="4" fill="#1b2027" stroke="#8a949f" />
          <circle cx="0" cy="20" r="1.6" fill="#7cc4ff" />
          <circle cx="-12" cy="8" r="1.6" fill="#ff5a5a" />
          <circle cx="12" cy="8" r="1.6" fill="#5aff7a" />
          <ellipse className="qh-ds-prop" cx="-30" cy="4" rx="12" ry="2.5" fill="#9fb8d2" />
          <ellipse className="qh-ds-prop" cx="30" cy="4" rx="12" ry="2.5" fill="#9fb8d2" />
        </g>

        {/* Each roof's name and its check, as the drone passes */}
        {homes.map((h, i) => (
          <g key={h.key} className={`qh-hs-tag qh-hs-tag${i + 1}`}>
            <rect x={h.cx - 62} y="96" width="124" height="24" rx="12" fill="#fff" />
            <text x={h.cx + 8} y="112.5" textAnchor="middle" fill="#0b1b2e" style={{ font: '700 11.5px var(--font-text), sans-serif' }}>{name(h.item)}</text>
            <circle cx={h.cx - 48} cy="108" r="8" fill="#f0b43c" />
            <path d={`M${h.cx - 52} 108l3 3 5-6`} stroke="#0b1b2e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
      </svg>
      {caption && <p className="qh-rr-time">{caption}</p>}
      {homes.length > 0 && (
        <ul className="qh-leak-links">
          {homes.map((h) => (
            <li key={h.item.href}>
              <SiteLink href={h.item.href}>{h.item.title}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Commercial hub hero visual (owner, November 12 2026; it replaces the framed photo, QhSurveyFrame, on the hub): a commercial building seen
// from above the corner, with a glass storefront, a loading side and a flat roof inside its parapet (courses of white cap sheet, two rooftop
// units on curbs, skylights, a drain, a hatch). On a 12 s loop a gold survey line crosses the roof, three findings are pinned as it passes
// (a drain, a curb flashing, the parapet), and the survey card beside it ticks off its three lines. The building types stay links (the
// chips under the picture). card: { title, text }; chips: [{ label, href }]. Still, with every pin and check shown, for reduced motion.
export function QhRoofSurvey({ chips = [], card = { title: 'Roofer-led roof survey', text: 'Photos, a written scope and price before any work.' }, rows = ['Photos of every finding', 'A written scope', 'The price, before any work'] }) {
  // a point on the roof: u along the front (0 to 1), v toward the back (0 to 1)
  const P = (u, v) => [70 + 330 * u + 90 * v, 150 - 60 * v];
  const pt = (u, v) => P(u, v).join(' ');
  const quad = (u0, v0, u1, v1) => `M${pt(u0, v0)}L${pt(u1, v0)}L${pt(u1, v1)}L${pt(u0, v1)}Z`;
  const unit = (u, v, w = 0.12, d = 0.22, h = 22) => {
    const [x0, y0] = P(u, v);
    const [x1, y1] = P(u + w, v);
    const [x2, y2] = P(u + w, v + d);
    const [x3, y3] = P(u, v + d);
    return (
      <g key={`${u}${v}`}>
        <path d={quad(u - 0.012, v - 0.03, u + w + 0.012, v + d + 0.03)} fill="#8e8a80" stroke="#f0b43c" strokeWidth="1.5" />
        <path d={`M${x0} ${y0}L${x1} ${y1}L${x1} ${y1 - h}L${x0} ${y0 - h}Z`} fill="#8a949f" />
        <path d={`M${x1} ${y1}L${x2} ${y2}L${x2} ${y2 - h}L${x1} ${y1 - h}Z`} fill="#6f7882" />
        <path d={`M${x0} ${y0 - h}L${x1} ${y1 - h}L${x2} ${y2 - h}L${x3} ${y3 - h}Z`} fill="#c4ccd4" />
        <ellipse cx={(x0 + x2) / 2} cy={(y0 + y2) / 2 - h} rx="11" ry="6" fill="#5b646e" stroke="rgba(255,255,255,.4)" />
        <path d={`M${x0 + 6} ${y0 - 6}h${x1 - x0 - 12}M${x0 + 6} ${y0 - 12}h${x1 - x0 - 12}`} stroke="rgba(0,0,0,.3)" strokeWidth="1.5" />
      </g>
    );
  };
  const pins = [P(0.22, 0.5), P(0.6, 0.42), P(0.93, 0.97)];
  return (
    <div className="qh-rs">
      <svg className="qh-rs-svg" viewBox="0 0 560 330" aria-hidden="true">
        <defs>
          <linearGradient id="qhRsFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dcd5c7" />
            <stop offset="1" stopColor="#b7ae9e" />
          </linearGradient>
          <linearGradient id="qhRsSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a9a192" />
            <stop offset="1" stopColor="#8a8375" />
          </linearGradient>
          <linearGradient id="qhRsGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#dcefff" />
            <stop offset="0.5" stopColor="#7fb4e6" />
            <stop offset="1" stopColor="#2f5f8f" />
          </linearGradient>
          <linearGradient id="qhRsRoof" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f2f5f8" />
            <stop offset="1" stopColor="#cfd6dd" />
          </linearGradient>
          <filter id="qhRsGrain" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="21" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
          </filter>
          <clipPath id="qhRsField"><path d={quad(0.02, 0.05, 0.98, 0.95)} /></clipPath>
          <linearGradient id="qhRsBeam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f0b43c" stopOpacity="0" />
            <stop offset="1" stopColor="#f0b43c" stopOpacity=".45" />
          </linearGradient>
        </defs>
        {/* The lot: asphalt, stalls, a sidewalk, the building's shadow */}
        <path d="M20 300h520l-40 26H0z" fill="#12233a" />
        <path d="M30 292h380l90-60h44v68H30z" fill="#27313d" />
        <path d="M70 290h330l90-60v8l-90 60H70z" fill="#b9b4a8" />
        {[110, 160, 210, 260, 310, 360].map((x) => <path key={x} d={`M${x} 300l-14 22`} stroke="rgba(255,255,255,.3)" strokeWidth="2" />)}
        {/* Side wall: a roll-up door, windows, a downspout */}
        <path d="M400 150L490 90V230L400 290Z" fill="url(#qhRsSide)" />
        <path d="M420 252L452 231V190L420 211Z" fill="#6f7882" />
        {[0, 1, 2, 3].map((k) => <path key={k} d={`M420 ${219 + k * 9}L452 ${198 + k * 9}`} stroke="rgba(0,0,0,.3)" strokeWidth="1.5" />)}
        <path d="M462 176L482 163V190L462 203Z" fill="url(#qhRsGlass)" />
        <path d="M494 92v136" stroke="#8a949f" strokeWidth="4" strokeLinecap="round" />
        {/* Front wall: sign band, storefront glass in bays, the entrance and its canopy */}
        <rect x="70" y="150" width="330" height="140" fill="url(#qhRsFront)" />
        <rect x="70" y="150" width="330" height="5" fill="rgba(0,0,0,.2)" />
        <rect x="170" y="166" width="130" height="20" rx="3" fill="#0b1b2e" />
        <path d="M184 176h70M262 176h24" stroke="#f0b43c" strokeWidth="5" strokeLinecap="round" />
        {[84, 152, 268, 336].map((x) => (
          <g key={x}>
            <rect x={x - 3} y="203" width="58" height="72" fill="#e8ecf0" />
            <rect x={x} y="206" width="52" height="66" fill="url(#qhRsGlass)" />
            <path d={`M${x + 26} 206v66M${x} 240h52`} stroke="#e8ecf0" strokeWidth="2" />
            <path d={`M${x + 5} 212l12-3`} stroke="rgba(255,255,255,.7)" strokeWidth="2" strokeLinecap="round" />
          </g>
        ))}
        <rect x="212" y="198" width="48" height="6" rx="2" fill="#4c5a6b" />
        <rect x="216" y="210" width="40" height="80" fill="url(#qhRsGlass)" stroke="#5d6570" strokeWidth="2" />
        <path d="M236 210v80M230 250h4M238 250h4" stroke="#5d6570" strokeWidth="2" />
        {/* Roof: the parapet and its coping, the cap sheet in courses, crickets to the drain */}
        <path d={quad(0, 0, 1, 1)} fill="#a39b8c" stroke="rgba(0,0,0,.35)" />
        <path d={quad(0.02, 0.05, 0.98, 0.95)} fill="url(#qhRsRoof)" />
        <path d={quad(0.02, 0.05, 0.98, 0.95)} filter="url(#qhRsGrain)" opacity="0.28" style={{ mixBlendMode: 'multiply' }} />
        <g clipPath="url(#qhRsField)">
          {[0.2, 0.35, 0.5, 0.65, 0.8].map((v) => (
            <g key={v}>
              <path d={`M${pt(0, v)}L${pt(1, v)}`} stroke="rgba(255,255,255,.7)" strokeWidth="1.2" />
              <path d={`M${pt(0, v - 0.012)}L${pt(1, v - 0.012)}`} stroke="rgba(40,50,60,.28)" strokeWidth="1.4" />
            </g>
          ))}
          <path d={`M${pt(0.02, 0.05)}L${pt(0.22, 0.5)}L${pt(0.02, 0.95)}M${pt(0.42, 0.05)}L${pt(0.22, 0.5)}L${pt(0.42, 0.95)}`} fill="none" stroke="rgba(40,50,60,.16)" />
          <ellipse cx={pins[0][0]} cy={pins[0][1]} rx="34" ry="14" fill="rgba(0,0,0,.1)" />
          {/* The survey line and its trailing glow */}
          <g className="qh-rs-scan">
            <path d={`M${pt(-0.14, 0)}L${pt(0, 0)}L${pt(0, 1)}L${pt(-0.14, 1)}Z`} fill="url(#qhRsBeam)" />
            <path d={`M${pt(0, 0)}L${pt(0, 1)}`} stroke="#f0b43c" strokeWidth="3" />
          </g>
        </g>
        <path d={`M${pt(0, 0)}L${pt(1, 0)}`} stroke="rgba(255,255,255,.5)" strokeWidth="1.2" />
        {/* Skylights, the hatch, the drain */}
        {[[0.72, 0.2], [0.82, 0.2]].map(([u, v]) => (
          <g key={u}>
            <path d={quad(u, v, u + 0.07, v + 0.22)} fill="#8e8a80" stroke="#f0b43c" strokeWidth="1.5" />
            <path d={quad(u + 0.01, v + 0.03, u + 0.06, v + 0.19)} fill="rgba(160,210,255,.85)" />
          </g>
        ))}
        <path d={quad(0.06, 0.68, 0.12, 0.86)} fill="#8a949f" stroke="rgba(0,0,0,.35)" />
        <ellipse cx={pins[0][0]} cy={pins[0][1]} rx="9" ry="5" fill="#2b323a" stroke="#9aa3ad" strokeWidth="1.5" />
        {/* Rooftop units on their flashed curbs */}
        {unit(0.52, 0.3)}
        {unit(0.34, 0.6, 0.1, 0.2, 18)}
        {/* Findings, pinned as the line passes */}
        {pins.map(([x, y], i) => (
          <g key={i} className={`qh-rs-pin qh-rs-pin${i + 1}`}>
            <circle className="qh-leak-ring" cx={x} cy={y - 14} r="12" fill="none" stroke="#f0b43c" strokeWidth="2" />
            <path d={`M${x} ${y}c-7-9-11-13-11-19a11 11 0 0 1 22 0c0 6-4 10-11 19z`} fill="#f0b43c" stroke="#0b1b2e" strokeWidth="1.5" />
            <text x={x} y={y - 15} textAnchor="middle" fill="#0b1b2e" style={{ font: '800 11px var(--font-text), sans-serif' }}>{i + 1}</text>
          </g>
        ))}
        {/* The survey card: its three lines tick off after the pass */}
        <g className="qh-rs-card" transform="translate(338 196)">
          <rect width="208" height="118" rx="10" fill="#fff" />
          <rect width="208" height="30" rx="10" fill="#0b1b2e" />
          <rect y="20" width="208" height="10" fill="#0b1b2e" />
          <text x="14" y="20" fill="#f0b43c" style={{ font: '700 12px var(--font-text), sans-serif' }}>{card.title}</text>
          {rows.map((r, i) => (
            <g key={r} className={`qh-rs-row qh-rs-row${i + 1}`}>
              <circle cx="20" cy={50 + i * 24} r="8" fill="#f0b43c" />
              <path d={`M16 ${50 + i * 24}l3 3 5-6`} stroke="#0b1b2e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <text x="36" y={54 + i * 24} fill="#0b1b2e" style={{ font: '600 11.5px var(--font-text), sans-serif' }}>{r}</text>
            </g>
          ))}
        </g>
      </svg>
      {card.text && <p className="qh-rr-time">{card.text}</p>}
      {chips.length > 0 && (
        <ul className="qh-leak-links">
          {chips.map((c) => (
            <li key={c.href}>
              <SiteLink href={c.href}>{c.label}</SiteLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
