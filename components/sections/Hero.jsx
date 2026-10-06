import Rich from '@/components/ui/Rich';
import QuoteTrigger from '@/components/ui/QuoteTrigger';
import SiteLink from '@/components/ui/SiteLink';
import { PhoneIcon } from '@/components/ui/icons';
import { INSTANT_QUOTE_ENABLED } from '@/data/instantQuote';
import { PHONE, TEL } from '@/data/site';
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
// from 901px, below it on phones (the blog index shows its latest article this way).
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
  align = 'left',
  stats = false,
  aside,
  actions: allActions = DEFAULT_ACTIONS,
  className,
}) {
  // Buttons that open the Instant Quote are left out while it's switched off (INSTANT_QUOTE_ENABLED in data/instantQuote.js)
  const actions = INSTANT_QUOTE_ENABLED ? allActions : allActions?.filter((a) => !a.drawer);
  const Eyebrow = h1 === 'eyebrow' ? 'h1' : 'div';
  const Title = h1 === 'eyebrow' ? 'p' : 'h1';
  return (
    <>
      <section className={'hero hero-photo' + (image ? '' : ' hero-fallback') + (image || mobileImage ? ' hero-stack' : '') + (className ? ` ${className}` : '')} aria-label={label}>
        <HeroParallax image={image} mobileImage={mobileImage} imageAlt={imageAlt} imagePosition={imagePosition} slides={slides} />
        <div className="hero-glow" aria-hidden="true"></div>
        <div className={'container hero-inner on-dark' + (align === 'left' ? ' hero-left' : '') + (aside ? ' hero-has-aside' : '') + (className ? ` ${className}` : '')}>
          <div className="hero-copy">
            {/* The breadcrumb trail takes the eyebrow's place (Home › Roof Repair). Only a page with no trail (the home page, the thank-you page) shows an eyebrow line. */}
            {crumbs ? <Breadcrumbs items={crumbs} /> : eyebrow && <Eyebrow className="eyebrow">{eyebrow}</Eyebrow>}
            <Title className="hero-title">
              <Rich text={title} registeredMark />
              {outcome && (
                <>
                  <span className="sr-only"> — </span>
                  <span className="hero-outcome"><Rich text={outcome} /></span>
                </>
              )}
            </Title>
            {intro && (
              <p className="hero-sub">
                <Rich text={intro} />
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
          </div>
          {aside}
        </div>
      </section>
      {stats && <ProofBar strip />}
    </>
  );
}
