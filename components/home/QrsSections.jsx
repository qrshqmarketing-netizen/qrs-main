import Image from 'next/image';
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
export function QhHero({ crumbs, where, title, outcome, text, checks = [], cta, actions, visual, badges = false, layers = ['Shingle, tile or flat roof', 'New underlayment', 'Deck, inspected and secured'], lang = 'en' }) {
  const T = (x, v) => th(lang, x, v);
  cta = cta || T('Book a free roof evaluation');
  return (
    <section className="qh-hero" aria-labelledby="qh-h1">
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
          <h1 id="qh-h1">{title}</h1>
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
        {visual || (
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
      {badges && <QhBrandRow />}
    </section>
  );
}

// The manufacturer logos from the Credentials page, along the bottom of a sub page's hero (white tiles on the dark blue)
function QhBrandRow() {
  const logos = CREDENTIALS_PUBLIC ? CREDENTIALS_PAGE.manufacturers.items.filter((m) => m.logo) : [];
  if (!logos.length) return null;
  return (
    <div className="qh-wrap qh-brands">
      <p>Certified with the manufacturers we install</p>
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
export function QhRoofFan({ items }) {
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
      <span className="qh-fan-cap">Shingle, tile and flat roofs, one team</span>
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
  return (
    <div className="qh-leak">
      <div className="qh-leak-art">
        <svg viewBox="0 0 560 400" aria-hidden="true">
          <defs>
            <linearGradient id="qhLeakRoof" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6b7480" />
              <stop offset="1" stopColor="#47505b" />
            </linearGradient>
            <pattern id="qhLeakCourses" width="40" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
              <path d="M0 15.5H40M20 0V16" stroke="rgba(0,0,0,.28)" strokeWidth="1.2" />
            </pattern>
          </defs>
          {/* walls and ceiling */}
          <path d="M70 210V380H490V210" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
          <path d="M70 262H490" stroke="rgba(255,255,255,.55)" strokeWidth="3" />
          {/* attic rafters */}
          {[150, 210, 350, 410].map((x) => (
            <path key={x} d={`M${x} ${x < 280 ? 210 - (x - 40) * 0.58 + 8 : 210 - (520 - x) * 0.58 + 8}V262`} stroke="rgba(255,255,255,.14)" strokeWidth="2" />
          ))}
          {/* deck and roof covering */}
          <path d="M28 216L280 70L532 216" fill="none" stroke="#b98b57" strokeWidth="9" strokeLinejoin="round" />
          <path d="M20 206L280 56L540 206L532 216L280 70L28 216Z" fill="url(#qhLeakRoof)" />
          <path d="M20 206L280 56L540 206L532 216L280 70L28 216Z" fill="url(#qhLeakCourses)" />
          {/* chimney with its flashing */}
          <path d="M372 132V64H414V152" fill="#5a3d33" stroke="rgba(0,0,0,.3)" strokeWidth="1.5" />
          <path d="M362 128L372 122V64M414 152L426 156" fill="none" stroke="var(--qh-sun)" strokeWidth="4" strokeLinecap="round" />
          {/* the water's path: in at the flashing, along the underside of the deck, down to the ceiling */}
          <path className="qh-leak-path" d="M366 136C356 146 340 156 322 166S262 196 238 206C226 211 222 222 222 236V258" fill="none" stroke="#7cc4ff" strokeWidth="3" strokeLinecap="round" strokeDasharray="7 9" />
          <circle className="qh-leak-drop" cx="222" cy="250" r="5" fill="#7cc4ff" />
          {/* the stain on the ceiling */}
          <ellipse className="qh-leak-stain" cx="222" cy="270" rx="34" ry="8" fill="rgba(124,196,255,.45)" />
          {/* the source */}
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

// Roof Replacement hero visual: one gable roof shown in the four stages of a replacement, left to right (the worn roof, torn off to the deck,
// new underlayment and flashings, the new roof), revealed in turn with a gold work line sweeping across; the stages, the page's own
// "3 to 5 days" and the replacement pages as links underneath
const REROOF_STEPS = ['Old roof', 'Tear-off to the deck', 'Underlayment & flashings', 'New roof'];
export function QhReroof({ links = [] }) {
  return (
    <div className="qh-reroof">
      <div className="qh-rr-house" aria-hidden="true">
        <div className="qh-rr-roof">
          {REROOF_STEPS.map((step, i) => (
            <span className={`qh-rr-s qh-rr-s${i + 1}`} key={step} />
          ))}
          <i className="qh-rr-line" />
        </div>
        <div className="qh-rr-wall">
          <b />
          <b />
          <b />
        </div>
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
          <pattern id="qhScDeck" width="96" height="27" patternUnits="userSpaceOnUse">
            <rect width="96" height="27" fill="#c39663" />
            <path d="M0 26.5h96M48 0v27" stroke="#9d7143" strokeWidth="1.5" />
          </pattern>
          {[0, 22].map((dx) => (
            <pattern key={dx} id={`qhScTabs${dx}`} width="44" height={h} patternUnits="userSpaceOnUse" patternTransform={`translate(${dx} ${top})`}>
              <rect width="44" height={h} fill="#414852" />
              <path d={`M0 ${h - 1}h44M22 0v${h}`} stroke="#2b3038" strokeWidth="2" />
              <rect x="3" y="4" width="16" height="3" fill="rgba(255,255,255,.06)" />
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
          <rect className="qh-sc-l qh-sc-under" x="0" y="0" width="560" height="300" fill="#26313d" clipPath="url(#qhScUnder)" />
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
          <rect className="qh-sc-l qh-sc-ridge" x="0" y={top - 2} width="560" height="12" fill="#5d6570" />
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
        </defs>
        <g clipPath="url(#qhSfClip)">
          <rect width="560" height="300" fill="#262b32" />
          {Array.from({ length: rows }, (_, r) =>
            Array.from({ length: cols }, (_, c) => {
              if (r === tr && c === tc) return null;
              const x = x0(r) + c * W;
              const shade = ['#4a515b', '#434a53', '#4e5560', '#454c56'][(r * 3 + c) % 4];
              return (
                <g key={`${r}-${c}`} className={r === tr - 1 && Math.abs(x0(r) + c * W + W / 2 - (tx + W / 2)) < W ? 'qh-sf-above' : undefined}>
                  <rect x={x + 1} y={r * H + 1} width={W - 2} height={H - 2} rx="2" fill={shade} />
                  <rect x={x + 6} y={r * H + 8} width={W - 22} height="3" fill="rgba(255,255,255,.05)" />
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
            <rect x={tx + 6} y={ty + 8} width={W - 22} height="3" fill="rgba(255,255,255,.08)" />
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
  return (
    <div className="qh-fr">
      <svg className="qh-fr-svg" viewBox="0 0 560 270" aria-hidden="true">
        {/* the building under the roof */}
        <rect x="64" y="172" width="432" height="98" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
        {[110, 210, 310, 410].map((x) => (
          <rect key={x} x={x} y="196" width="44" height="40" rx="2" fill="rgba(124,196,255,.12)" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
        ))}
        {/* deck, with one damaged run that gets replaced */}
        <rect x="64" y="160" width="432" height="12" fill="#c39663" />
        <path d="M64 166h432M150 160v12M240 160v12M330 160v12M420 160v12" stroke="#9d7143" strokeWidth="1.5" />
        <rect className="qh-fr-bad" x="240" y="160" width="90" height="12" fill="#5d4630" />
        <rect className="qh-fr-l qh-fr-newdeck" x="240" y="160" width="90" height="12" fill="#d8ab74" />
        {/* the old roof: flat, with a pond and blisters */}
        <g className="qh-fr-old">
          <rect x="64" y="148" width="432" height="12" fill="#34383e" />
          <ellipse cx="270" cy="149" rx="70" ry="4" fill="#5aa4e6" opacity=".85" />
          {[130, 160, 380, 420].map((x) => (
            <ellipse key={x} cx={x} cy="148" rx="9" ry="4" fill="#41464d" />
          ))}
        </g>
        {/* the new roof: a base sheet and a white cap sheet sloping toward the scupper */}
        <path className="qh-fr-l qh-fr-base" d="M64 138L496 152V160H64Z" fill="#59606a" />
        <path className="qh-fr-l qh-fr-cap" d="M64 134L496 148L496 153L64 139Z" fill="#eef2f6" />
        {/* parapets, the scupper and the downspout */}
        <rect x="40" y="96" width="24" height="76" fill="#3b4652" stroke="rgba(255,255,255,.45)" strokeWidth="2" />
        <path d="M496 96h24v76h-24V160M496 96v44" fill="#3b4652" stroke="rgba(255,255,255,.45)" strokeWidth="2" />
        <rect x="496" y="140" width="24" height="12" fill="#0d1a29" />
        <path d="M520 146h10v120" stroke="rgba(255,255,255,.55)" strokeWidth="6" fill="none" strokeLinejoin="round" />
        {/* a rooftop unit on its curb, flashed with the parapets */}
        <g className="qh-fr-l qh-fr-unit">
          <rect x="330" y="132" width="64" height="10" fill="#59606a" />
          <rect x="336" y="104" width="52" height="28" rx="3" fill="#8a949f" stroke="rgba(255,255,255,.5)" strokeWidth="1.5" />
          <path d="M344 112h36M344 118h36M344 124h36" stroke="#5d6570" strokeWidth="2" />
        </g>
        <path className="qh-fr-l qh-fr-flash" d="M328 141V133M396 143V133" stroke="#f0b43c" strokeWidth="4" strokeLinecap="round" />
        <path className="qh-fr-l qh-fr-flash" d="M64 104V136M496 104V138" stroke="#f0b43c" strokeWidth="5" strokeLinecap="round" />
        {/* water on the finished roof */}
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
        {/* the room: walls, ceiling and a window */}
        <rect x="64" y="132" width="432" height="128" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
        <rect x="380" y="170" width="70" height="56" rx="2" fill="rgba(124,196,255,.12)" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
        <path d="M64 142h432" stroke="rgba(255,255,255,.25)" strokeWidth="2" />
        {/* deck and membrane, parapets */}
        <rect x="64" y="112" width="432" height="20" fill="#c39663" />
        <rect x="64" y="104" width="432" height="8" fill="#3d434b" />
        <rect x="40" y="70" width="24" height="62" fill="#3b4652" stroke="rgba(255,255,255,.45)" strokeWidth="2" />
        <rect x="496" y="70" width="24" height="62" fill="#3b4652" stroke="rgba(255,255,255,.45)" strokeWidth="2" />
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

// Service Areas hero visual: the service area drawn from its Census outline (mainland only; the counties as shapes), the city pages as pins that
// drop in and each office as a pulsing gold pin, the county names, and the counties as links underneath. Server-rendered SVG, no map library.
export function QhAreaMap({ outline, offices = [], cities = [], links = [], note, bounds, focus, highlight, cityLabels = false }) {
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
        <div className="qh-col-roof" style={{ backgroundColor: colors[0]?.hex }} />
        <div className="qh-rr-wall">
          <b />
          <b />
          <b />
        </div>
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
  return (
    <div className="qh-drain">
      <div className="qh-drain-art">
        <svg viewBox="0 0 560 380" aria-hidden="true">
          <rect x="14" y="14" width="532" height="352" rx="4" fill="#5d6773" />
          <rect x="30" y="30" width="500" height="320" fill="#c9ced3" />
          {[70, 110, 150, 190, 230, 270, 310].map((y) => (
            <path key={y} d={`M30 ${y}H530`} stroke="rgba(60,70,80,.28)" strokeWidth="1.5" />
          ))}
          <path d="M30 30L280 190L530 30M30 350L280 190L530 350" fill="none" stroke="rgba(60,70,80,.35)" strokeWidth="2" />
          <rect x="14" y="14" width="532" height="352" rx="4" fill="none" stroke="var(--qh-sun)" strokeWidth="3" />
          <rect x="74" y="64" width="96" height="64" rx="3" fill="#8b949e" stroke="var(--qh-sun)" strokeWidth="3" />
          <path d="M86 76h72M86 88h72M86 100h72M86 112h72" stroke="rgba(0,0,0,.25)" strokeWidth="3" />
          <rect x="392" y="236" width="62" height="62" rx="3" fill="rgba(124,196,255,.55)" stroke="var(--qh-sun)" strokeWidth="3" />
          <circle cx="280" cy="190" r="13" fill="#3b444e" stroke="#fff" strokeWidth="2" />
          <path d="M273 190h14M280 183v14" stroke="#9aa3ad" strokeWidth="2" />
          <rect x="530" y="96" width="16" height="28" fill="#3b444e" />
          <path d="M546 110h14" stroke="#7cc4ff" strokeWidth="4" strokeLinecap="round" />
          {['M60 330L262 202', 'M500 330L298 202', 'M60 50L262 178', 'M470 160C500 140 515 124 530 112'].map((d) => (
            <path key={d} className="qh-drain-flow" d={d} fill="none" stroke="#2f8fe0" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 10" />
          ))}
          <circle className="qh-leak-ring" cx="280" cy="190" r="16" fill="none" stroke="#2f8fe0" strokeWidth="2.5" />
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
        <div className="qh-tile-plane">
          <div className="qh-tile-under">
            <i className="qh-tile-valley" />
          </div>
          <div className="qh-tile-row qh-tile-r1" />
          <div className="qh-tile-row qh-tile-r2" />
          <div className="qh-tile-row qh-tile-r3" />
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
  return (
    <div className="qh-office">
      <div className="qh-leak-art">
        <svg viewBox="0 0 560 420" aria-hidden="true">
          <rect x="70" y="120" width="420" height="292" fill="#24384f" stroke="rgba(255,255,255,.35)" strokeWidth="2" />
          {floors.map((f) => (
            <g key={f}>
              <path d={`M70 ${190 + f * 56}H490`} stroke="rgba(255,255,255,.18)" strokeWidth="2" />
              {[0, 1, 2, 3, 4, 5].map((w) => (
                <rect key={w} x={88 + w * 66} y={136 + f * 56} width="50" height="40" rx="2" fill={f === 0 && w === 1 ? 'rgba(255,255,255,.16)' : 'rgba(124,196,255,.18)'} />
              ))}
            </g>
          ))}
          {/* the top-floor suite, opened up: its ceiling and the stained tile */}
          <rect x="150" y="128" width="148" height="54" fill="#33475e" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
          <path d="M150 140H298M187 128V140M224 128V140M261 128V140" stroke="rgba(255,255,255,.35)" strokeWidth="1.2" />
          <rect className="qh-office-stain" x="224" y="128" width="37" height="12" fill="#a8885a" />
          {/* roof: parapet and coping, hatch, HVAC units on curbs */}
          <rect x="62" y="104" width="436" height="16" fill="#3b4d61" />
          <path d="M60 104H500" stroke="var(--qh-sun)" strokeWidth="4" strokeLinecap="round" />
          <rect x="120" y="92" width="34" height="12" fill="#56677a" />
          <rect x="300" y="62" width="96" height="42" rx="3" fill="#8b949e" />
          <path d="M310 72h76M310 82h76M310 92h76" stroke="rgba(0,0,0,.25)" strokeWidth="3" />
          <rect x="294" y="98" width="108" height="8" fill="#56677a" stroke="var(--qh-sun)" strokeWidth="2.5" />
          <rect x="420" y="78" width="46" height="26" rx="2" fill="#7d8691" />
          <circle cx="443" cy="91" r="8" fill="none" stroke="rgba(0,0,0,.3)" strokeWidth="2" />
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
  return (
    <div className="qh-office">
      <div className="qh-leak-art">
        <svg viewBox="0 0 560 400" aria-hidden="true">
          <defs>
            <pattern id="qhMansard" width="18" height="14" patternUnits="userSpaceOnUse">
              <rect width="18" height="14" fill="#b4552f" />
              <path d="M0 13.5H18M9 0V14" stroke="rgba(60,20,8,.45)" strokeWidth="1.5" />
              <rect width="9" height="13" fill="rgba(255,255,255,.08)" />
            </pattern>
          </defs>
          {/* flat roof deck and what sits on it */}
          <rect x="56" y="112" width="448" height="14" fill="#3b4d61" />
          <rect x="320" y="70" width="92" height="40" rx="3" fill="#8b949e" />
          <path d="M330 80h72M330 90h72M330 100h72" stroke="rgba(0,0,0,.25)" strokeWidth="3" />
          <rect x="314" y="106" width="104" height="7" fill="#56677a" stroke="var(--qh-sun)" strokeWidth="2" />
          <path d="M170 112l12-14h48l12 14z" fill="rgba(124,196,255,.55)" stroke="var(--qh-sun)" strokeWidth="2.5" />
          <path d="M452 112V78M488 112V78" stroke="#56677a" strokeWidth="4" />
          <rect x="440" y="52" width="60" height="30" rx="3" fill="#24384f" stroke="rgba(255,255,255,.45)" strokeWidth="1.5" />
          <path d="M450 63h40M450 71h28" stroke="var(--qh-sun)" strokeWidth="3" strokeLinecap="round" />
          {/* the mansard out front */}
          <path d="M40 178L60 126H500L520 178Z" fill="url(#qhMansard)" />
          <path d="M60 126H500" stroke="var(--qh-sun)" strokeWidth="3" />
          {/* the store: walls, door, windows onto the sales floor with shelves */}
          <rect x="52" y="178" width="456" height="200" fill="#24384f" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
          <rect x="76" y="198" width="152" height="130" rx="2" fill="#33475e" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
          <rect x="304" y="198" width="180" height="130" rx="2" fill="rgba(124,196,255,.18)" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
          <rect x="248" y="218" width="40" height="160" fill="rgba(124,196,255,.22)" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
          {[226, 258, 290].map((y) => (
            <g key={y}>
              <path d={`M86 ${y}H120M182 ${y}H218`} stroke="#8b949e" strokeWidth="5" />
              <path d={`M88 ${y - 9}h8M100 ${y - 11}h6M190 ${y - 9}h10M205 ${y - 10}h8`} stroke="var(--qh-sun)" strokeWidth="6" />
            </g>
          ))}
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
  return (
    <div className="qh-office">
      <div className="qh-leak-art">
        <svg viewBox="0 0 560 400" aria-hidden="true">
          <defs>
            <pattern id="qhChurchTile" width="16" height="12" patternUnits="userSpaceOnUse">
              <rect width="16" height="12" fill="#b4552f" />
              <path d="M0 11.5H16M8 0V12" stroke="rgba(60,20,8,.45)" strokeWidth="1.4" />
              <rect width="8" height="11" fill="rgba(255,255,255,.08)" />
            </pattern>
          </defs>
          {/* bell tower */}
          <rect x="72" y="96" width="62" height="282" fill="#2c4058" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
          <path d="M66 98L103 54L140 98Z" fill="url(#qhChurchTile)" />
          <path d="M92 124a11 11 0 0 1 22 0v26h-22z" fill="rgba(124,196,255,.22)" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
          <path d="M103 30v24M95 38h16" stroke="var(--qh-sun)" strokeWidth="4" strokeLinecap="round" />
          {/* sanctuary: steep tile gable, walls, arched windows, doors */}
          <path className="qh-church-s1" d="M134 172L248 64L362 172Z" fill="url(#qhChurchTile)" />
          <path d="M248 64V172" stroke="var(--qh-sun)" strokeWidth="2.5" opacity=".85" />
          <rect x="146" y="172" width="204" height="206" fill="#24384f" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
          {[170, 236, 302].map((x) => (
            <path key={x} d={`M${x} 250a14 14 0 0 1 28 0v40h-28z`} fill="rgba(124,196,255,.22)" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
          ))}
          <path d="M226 378v-44a22 22 0 0 1 44 0v44" fill="#33475e" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
          <circle cx="248" cy="212" r="18" fill="rgba(240,180,60,.25)" stroke="var(--qh-sun)" strokeWidth="2" />
          {/* fellowship hall: low-slope roof with a drain and parapet */}
          <rect x="350" y="226" width="174" height="152" fill="#2c4058" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
          <rect className="qh-church-s3" x="344" y="212" width="186" height="16" fill="#8f99a4" />
          <path d="M344 212H530" stroke="var(--qh-sun)" strokeWidth="3" />
          <circle cx="440" cy="220" r="4" fill="#3b444e" stroke="#7cc4ff" strokeWidth="1.5" />
          {[368, 418, 468].map((x) => (
            <rect key={x} x={x} y="258" width="36" height="44" rx="2" fill="rgba(124,196,255,.18)" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
          ))}
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
  return (
    <div className="qh-office">
      <div className="qh-leak-art">
        <svg viewBox="20 0 520 300" aria-hidden="true">
          {/* building with a sawtooth-free low-slope roof and loading doors */}
          <rect x="40" y="112" width="480" height="186" fill="#24384f" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
          <rect x="34" y="104" width="492" height="10" fill="#3b4d61" />
          <path d="M34 104H526" stroke="var(--qh-sun)" strokeWidth="3" />
          {[70, 170, 270].map((x) => (
            <g key={x}>
              <rect x={x} y="214" width="78" height="84" fill="#33475e" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
              {[0, 1, 2, 3, 4].map((k) => (
                <path key={k} d={`M${x} ${226 + k * 14}h78`} stroke="rgba(255,255,255,.12)" strokeWidth="2" />
              ))}
            </g>
          ))}
          {[380, 440].map((x) => (
            <rect key={x} x={x} y="140" width="44" height="40" rx="2" fill="rgba(124,196,255,.18)" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
          ))}
          {/* exhaust stacks with venting puffs */}
          {[118, 176].map((x, k) => (
            <g key={x}>
              <rect x={x - 7} y="34" width="14" height="70" fill="#8b949e" />
              <circle className={`qh-puff qh-puff${k + 1}`} cx={x} cy="26" r="9" fill="rgba(255,255,255,.35)" />
            </g>
          ))}
          {/* ductwork run */}
          <path d="M220 96H360V74" fill="none" stroke="#9aa3ad" strokeWidth="12" strokeLinejoin="round" />
          {/* equipment on supports */}
          <rect x="392" y="62" width="104" height="34" rx="3" fill="#7d8691" />
          <path d="M402 72h84M402 82h84" stroke="rgba(0,0,0,.25)" strokeWidth="3" />
          <path d="M408 96v8M440 96v8M472 96v8" stroke="#56677a" strokeWidth="5" />
          {/* walk path pads and a ponding spot */}
          {[236, 256, 276].map((x) => (
            <rect key={x} x={x} y="100" width="14" height="4" fill="#d9dee3" />
          ))}
          <ellipse cx="330" cy="104" rx="20" ry="3" fill="rgba(124,196,255,.6)" />
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
          <rect x="18" y="18" width="524" height="324" rx="4" fill="#5d6773" />
          <rect x="30" y="30" width="500" height="300" fill="#d4d8dc" />
          {[60, 100, 140, 180, 220, 260, 300].map((y) => (
            <path key={y} d={`M30 ${y}H530`} stroke="rgba(60,70,80,.18)" strokeWidth="1.2" />
          ))}
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
            <rect key={x} x={x} y="164" width="38" height="32" rx="2" fill="rgba(124,196,255,.6)" stroke="var(--qh-sun)" strokeWidth="2.5" />
          ))}
          {/* drains and scuppers */}
          {[[92, 105], [342, 255], [468, 105]].map(([x, y]) => (
            <g key={`${x}${y}`}>
              <circle cx={x} cy={y} r="8" fill="#3b444e" stroke="#fff" strokeWidth="1.5" />
              <path d={`M${x - 5} ${y}h10M${x} ${y - 5}v10`} stroke="#9aa3ad" strokeWidth="1.5" />
            </g>
          ))}
          <rect x="530" y="232" width="12" height="22" fill="#3b444e" />
          <path d="M542 243h14" stroke="#7cc4ff" strokeWidth="4" strokeLinecap="round" />
          {/* the ponding area in one section */}
          <ellipse className="qh-pond" cx="232" cy="268" rx="40" ry="16" fill="rgba(47,143,224,.45)" />
          {/* hatch */}
          <rect x="60" y="270" width="26" height="26" fill="#8b949e" stroke="rgba(0,0,0,.3)" strokeWidth="1.5" />
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
  return (
    <div className="qh-office">
      <div className="qh-leak-art">
        <svg viewBox="0 0 560 390" aria-hidden="true">
          {/* the roof seen from slightly above */}
          <path d="M64 112H496L536 200H24Z" fill="#c4c9ce" />
          <path d="M64 112H496L536 200H24Z" fill="none" stroke="var(--qh-sun)" strokeWidth="3" />
          {/* old patches, each a different age */}
          <path d="M100 136h60l6 26h-70z" fill="#8f979e" />
          <path d="M226 128h46l4 20h-52z" fill="#a8aeb4" />
          <path d="M340 148h66l6 26h-76z" fill="#7d858c" />
          <path d="M176 166h40l4 20h-48z" fill="#9aa1a7" />
          <path d="M290 182h52" stroke="rgba(0,0,0,.25)" strokeWidth="3" />
          {/* exhaust fan, vent stack, skylight */}
          <circle cx="454" cy="140" r="12" fill="#8b949e" stroke="#56677a" strokeWidth="3" />
          <path d="M447 140h14M454 133v14" stroke="#56677a" strokeWidth="2" />
          <rect x="300" y="122" width="8" height="18" fill="#7d8691" />
          <path d="M420 172l8-10h36l8 10z" fill="rgba(124,196,255,.6)" stroke="var(--qh-sun)" strokeWidth="2" />
          {/* scupper on the edge */}
          <rect x="530" y="186" width="10" height="16" fill="#3b444e" />
          <path d="M540 196h12" stroke="#7cc4ff" strokeWidth="4" strokeLinecap="round" />
          {/* the shop front */}
          <rect x="24" y="200" width="512" height="182" fill="#24384f" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
          <rect x="190" y="208" width="180" height="26" rx="3" fill="#33475e" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
          <path d="M210 221h96M316 221h32" stroke="var(--qh-sun)" strokeWidth="5" strokeLinecap="round" />
          <rect x="52" y="250" width="164" height="132" fill="#33475e" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
            <path key={k} d={`M52 ${262 + k * 15}h164`} stroke="rgba(255,255,255,.14)" strokeWidth="2" />
          ))}
          <rect x="300" y="256" width="148" height="80" rx="2" fill="rgba(124,196,255,.2)" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
          <rect x="460" y="270" width="48" height="112" fill="#33475e" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
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
  return (
    <div className="qh-storm">
      <div className="qh-leak-art">
        <svg viewBox="0 0 560 380" aria-hidden="true">
          <rect className="qh-storm-flash" x="0" y="0" width="560" height="380" fill="#cfe0f2" />
          <path className="qh-storm-bolt" d="M432 0l-26 64h22l-30 70 52-86h-24l22-48z" fill="#fff" />
          <rect x="110" y="198" width="340" height="170" fill="#1c2e44" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
          <rect x="146" y="236" width="56" height="48" rx="2" fill="rgba(240,180,60,.55)" />
          <rect x="358" y="236" width="56" height="48" rx="2" fill="rgba(240,180,60,.55)" />
          <rect x="252" y="270" width="56" height="98" fill="#2a3f58" />
          <path d="M80 206L280 70L480 206Z" fill="#4c555e" />
          {[0, 1, 2, 3, 4].map((k) => (
            <path key={k} d={`M${118 + k * 14} ${180 - k * 10}L${442 - k * 14} ${180 - k * 10}`} stroke="rgba(0,0,0,.25)" strokeWidth="1.5" />
          ))}
          {/* the damaged area and the tarp that covers it */}
          <path d="M318 128l40 28-22 20-40-24z" fill="#2a2f35" />
          <path d="M326 134l8 10M342 148l-6 8" stroke="#b98b57" strokeWidth="2.5" />
          <path className="qh-storm-tarp" d="M300 112L378 160L350 190L276 144Z" fill="#2f73c9" stroke="#1e4f8e" strokeWidth="2" />
          <path d="M80 206H480" stroke="var(--qh-sun)" strokeWidth="3" />
          {/* rain */}
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
export function QhAccount({ commercial = false }) {
  const points = [
    `Licensed, bonded and insured California contractor, CSLB #${BUSINESS.license}`,
    'Certified with the manufacturers whose systems we install',
    'We pull the permits',
    'A written scope and price before any work',
    '10-year workmanship warranty on installs (call for details)',
  ];
  const stats = [
    [GOOGLE_REVIEWS.count, 'Google reviews from the people we roof for'],
    ['2020', 'Licensed California contractor since'],
    ['12', 'Crews for shingle, tile and flat roofs'],
    ['3', 'Languages: English, Spanish and Tagalog'],
  ];
  return (
    <section className="qh-section qh-account" aria-labelledby="qh-acc-h">
      <div className="qh-wrap">
        <div>
          <p className="qh-kicker">Credentials</p>
          <h2 id="qh-acc-h">Local roofers. Real accountability.</h2>
          <p className="qh-lede">
            {commercial
              ? 'A roofer surveys your building first, and you get photos and a written scope and price before any work. One company answers for the roof, from the survey to the closeout photos for your files.'
              : 'A roofer looks at your roof first, and you get photos and a written price before anything starts. One family-owned company answers for the roof, from the first visit to the walk across the finished roof with you.'}
          </p>
          <ul className="qh-list">
            {points.map((p) => (
              <li key={p}>
                <Check />
                {p}
              </li>
            ))}
          </ul>
          <SiteLink className="qh-link" href="/credentials/">See our credentials</SiteLink>
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
export function QhOffer({ offer = 'home' }) {
  const o = OFFERS[offer] || OFFERS.home;
  const home = offer !== 'commercial';
  return (
    <section className="qh-section qh-offer" aria-labelledby="qh-off-h">
      <div className="qh-wrap">
        <div>
          <p className="qh-kicker">{home ? 'Roof evaluation' : 'Roof survey'}</p>
          <h2 id="qh-off-h">{home ? 'A written price, before any work.' : 'A written scope, before any work.'}</h2>
          <p className="qh-lede">{home ? 'Start with a free roof evaluation. A roofer tells you what’s worth fixing, and you decide what to hire us for.' : o.text}</p>
          <ul className="qh-list">
            {o.points.map((p) => (
              <li key={p.title}>
                <Check />
                <span>
                  <b>{p.title}</b> {p.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="qh-offer-card">
          <small>{o.eyebrow}</small>
          <h3>{home ? 'Roof evaluation' : 'Roof survey'}</h3>
          <p className="qh-offer-big">{home ? 'Free' : 'Roofer-led'}</p>
          <p className="qh-offer-sub">{home ? 'no obligation' : 'written scope and price'}</p>
          <p>{home ? o.text : 'Photos you can share with owners and tenants, and a clear next step.'}</p>
          <SiteLink className="qh-btn qh-btn-sun" href="#roof-check">{home ? 'Book my free evaluation' : 'Request a roof survey'}</SiteLink>
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
