import HandUnderline from '@/components/ui/HandUnderline';
import Rich from '@/components/ui/Rich';
import QuoteTrigger from '@/components/ui/QuoteTrigger';
import SiteLink from '@/components/ui/SiteLink';
import { PhoneIcon } from '@/components/ui/icons';
import { INSTANT_QUOTE_ENABLED } from '@/data/instantQuote';
import { heroUnderline } from '@/data/heroOutcomes';
import { HERO_ANNOTATIONS, PHONE, TEL } from '@/data/site';
import Breadcrumbs from './Breadcrumbs';
import HeroParallax from './HeroParallax';
import ProofBar from './ProofBar';
import './Hero.css';

const DEFAULT_ACTIONS = [
  { label: 'Get Pro Advice', href: '#roof-check', style: 'gold' },
  { label: `Call ${PHONE}`, href: TEL, style: 'line' },
];

// Full-bleed photo hero, used site-wide. `crumbs` (the breadcrumb trail) takes the place of the small eyebrow line above the headline; `eyebrow`
// shows only on a page without crumbs. `outcome` (data/heroOutcomes.js) is the dream-outcome line shown in gold under the headline, inside
// the same H1, so the H1 holds both the keyword and the result the visitor wants. `h1` picks which line is the page's H1 for search engines:
// the big headline ('title', the default) or the small keyword line above it ('eyebrow', home page only).
// actions: [{ label, href, style: 'gold' | 'plum' | 'line' }]; an action with `drawer: true` opens the
// Instant Quote drawer instead of navigating. When `image` is omitted, a CSS-only dark navy/gold
// background is used instead of a photo (Hero.css .hero-fallback). On phones a "Get an Instant Quote" button
// (QuoteTrigger) follows the actions, unless one of them already opens the drawer. `slides` ([{ src, alt }], the first is
// also `image`) turns the photo into a slider that rotates every 7 seconds (HeroSlides.jsx). Pass `mobileImage` (e.g. a portrait
// crop of the same scene) to show a different photo below 621px instead of a cropped `image`. Below 621px a hero
// with a photo stacks: the photo on its own band, then the copy below it (Hero.css .hero-stack). `stats` adds the proof-point strip directly
// under the hero (ProofBar `strip`). `aside` puts something (a picture) beside the copy
// from 901px, below it on phones (the blog index shows its latest article this way). Under the buttons, a row of check marks names the decisive facts
// (`annotations`, default HERO_ANNOTATIONS in data/site.js: the commercial set on commercial and partner pages; false hides it). `underline` (default: the page's entry in HERO_UNDERLINES,
// data/heroOutcomes.js) is the word in the headline that gets the hand-drawn animated underline.
// The headline, with one word or phrase underlined by hand (it draws itself). `phrase` must appear in the text; otherwise the headline is shown as it is.
function HeadlineText({ title, phrase }) {
  const at = typeof title === 'string' && phrase ? title.indexOf(phrase) : -1;
  if (at < 0) return <Rich text={title} registeredMark />;
  const after = title.slice(at + phrase.length);
  return (
    <>
      {at > 0 && <Rich text={title.slice(0, at)} registeredMark />}
      <u>{phrase}<HandUnderline animate /></u>
      {after && <Rich text={after} registeredMark />}
    </>
  );
}

export default function Hero({
  crumbs,
  eyebrow = 'Roof Repair & Replacement in Southern California',
  title = (
    <>
      Roofing built with <span>precision.</span>
    </>
  ),
  intro,
  image,
  slides,
  mobileImage,
  imageAlt = '',
  imagePosition,
  label = 'QRS Southern California roofing',
  h1 = 'title',
  outcome,
  align = 'center',
  underline,
  stats = false,
  aside,
  actions: allActions = DEFAULT_ACTIONS,
  annotations,
  breath = true,
  className,
}) {
  // Buttons that open the Instant Quote are left out while it's switched off (INSTANT_QUOTE_ENABLED in data/instantQuote.js)
  const actions = INSTANT_QUOTE_ENABLED ? allActions : allActions?.filter((a) => !a.drawer);
  // The decisive facts under the buttons (data/site.js HERO_ANNOTATIONS): commercial and partner pages get their own set; `annotations={false}` turns them off
  const path = crumbs?.at(-1)?.href || '';
  const skip = /^\/(careers|blog)\//.test(path); // job and article pages: the roofing facts don't belong there
  const notes = annotations === false || skip || !actions?.length ? [] : annotations || HERO_ANNOTATIONS[/^\/(commercial-roofing|contractors)\//.test(path) ? 'commercial' : 'home'];
  // The intro's closing "Start with / Book a free roof evaluation." is left out when the facts row already says it (the keyword stays in the first sentence)
  const lead = notes.some((n) => /free roof evaluation/i.test(n)) ? intro?.replace(/\s*(Start with|Book) a free roof evaluation\.\s*$/, '') : intro;
  const Eyebrow = h1 === 'eyebrow' ? 'h1' : 'div';
  const Title = h1 === 'eyebrow' ? 'p' : 'h1';
  return (
    <>
      <section className={'hero hero-photo' + (image ? '' : ' hero-fallback') + (image || mobileImage ? ' hero-stack' : '') + (className ? ` ${className}` : '')} aria-label={label}>
        <HeroParallax image={image} mobileImage={mobileImage} imageAlt={imageAlt} imagePosition={imagePosition} slides={slides} />
        <div className="hero-glow" aria-hidden="true"></div>
        {/* A slow "breathing" light over the photo: three soft color glows that drift, swell and fade (CSS: .hero-breath in Hero.css); breath={false} leaves it out (the blog index) */}
        {breath && <div className="hero-breath" aria-hidden="true"><i></i><i></i><i></i></div>}
        <div className={'container hero-inner on-dark' + (align === 'left' ? ' hero-left' : '') + (aside ? ' hero-has-aside' : '') + (className ? ` ${className}` : '')}>
          <div className="hero-copy">
            {/* The breadcrumb trail takes the eyebrow's place (Home › Roof Repair). Only a page with no trail (the home page, the thank-you page) shows an eyebrow line. */}
            {crumbs ? <Breadcrumbs items={crumbs} /> : eyebrow && <Eyebrow className="eyebrow">{eyebrow}</Eyebrow>}
            <Title className="hero-title">
              <HeadlineText title={title} phrase={underline ?? (crumbs?.length ? heroUnderline(crumbs.at(-1).href) : undefined)} />
              {outcome && (
                <>
                  <span className="sr-only"> — </span>
                  <span className="hero-outcome"><Rich text={outcome} /></span>
                </>
              )}
            </Title>
            {lead && (
              <p className="hero-sub">
                <Rich text={lead} />
              </p>
            )}
            {actions?.length > 0 && (
              <div className="hero-actions">
                {actions.map((a) =>
                  a.drawer ? (
                    <button className={`btn btn-${a.style || 'gold'}`} type="button" data-rm-open="" key={a.label}>
                      {a.label}
                      {a.style !== 'line' && <span className="arrow">→</span>}
                    </button>
                  ) : (
                    <SiteLink className={`btn btn-${a.style || 'gold'}`} href={a.href} key={a.href}>
                      {a.href.startsWith('tel:') && a.style === 'plum' && <PhoneIcon />}
                      {a.label}
                      {a.style !== 'line' && !a.href.startsWith('tel:') && <span className="arrow">→</span>}
                    </SiteLink>
                  )
                )}
                {!actions.some((a) => a.drawer) && <QuoteTrigger />}
              </div>
            )}
            {notes.length > 0 && (
              <ul className="hero-notes" aria-label="What you get">
                {notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            )}
          </div>
          {aside}
        </div>
      </section>
      {stats && <ProofBar strip />}
    </>
  );
}
