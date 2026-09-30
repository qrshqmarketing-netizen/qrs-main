import Image from 'next/image';
import Rich from '@/components/ui/Rich';
import QuoteTrigger from '@/components/ui/QuoteTrigger';
import SiteLink from '@/components/ui/SiteLink';
import { PhoneIcon } from '@/components/ui/icons';
import { PHONE, TEL } from '@/data/site';
import Breadcrumbs from './Breadcrumbs';
import ProofBar from './ProofBar';
import './Hero.css';

const DEFAULT_ACTIONS = [
  { label: 'Get Pro Advice', href: '#roof-check', style: 'gold' },
  { label: `Call ${PHONE}`, href: TEL, style: 'line' },
];

// Full-bleed photo hero, used site-wide. `h1` picks which line is the page's H1 for search engines:
// the big headline ('title', the default) or the small keyword line above it ('eyebrow', home page only).
// actions: [{ label, href, style: 'gold' | 'plum' | 'line' }]; an action with `drawer: true` opens the
// Instant Quote drawer instead of navigating. When `image` is omitted, a CSS-only dark navy/gold
// background is used instead of a photo (Hero.css .hero-fallback). On phones a "Get an Instant Quote" button
// (QuoteTrigger) follows the actions, unless one of them already opens the drawer. Pass `mobileImage` (e.g. a portrait
// crop of the same scene) to show a different photo below 621px instead of a cropped `image`. `stats` nests the
// proof-bar stats in the hero (home page only; sub pages place <ProofBar /> below their intro section).
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
  mobileImage,
  imageAlt = '',
  imagePosition,
  label = 'QRS Southern California roofing',
  h1 = 'title',
  align = 'left',
  stats = false,
  actions = DEFAULT_ACTIONS,
  className,
}) {
  const Eyebrow = h1 === 'eyebrow' ? 'h1' : 'div';
  const Title = h1 === 'eyebrow' ? 'p' : 'h1';
  return (
    <>
      <section className={'hero hero-photo' + (image ? '' : ' hero-fallback') + (className ? ` ${className}` : '')} aria-label={label}>
        {image && (
          <div className={'hero-roof-texture' + (mobileImage ? ' hero-roof-texture-desktop' : '')} aria-hidden="true">
            <Image src={image} alt={imageAlt} fill preload sizes="100vw" style={imagePosition ? { objectPosition: imagePosition } : undefined} />
          </div>
        )}
        {mobileImage && (
          <div className="hero-roof-texture hero-roof-texture-mobile" aria-hidden="true">
            <Image src={mobileImage} alt={imageAlt} fill preload sizes="100vw" />
          </div>
        )}
        <div className="hero-glow" aria-hidden="true"></div>
        <div className={'container hero-inner on-dark' + (align === 'left' ? ' hero-left' : '') + (className ? ` ${className}` : '')}>
          <div className="hero-copy">
            {eyebrow && <Eyebrow className="eyebrow">{eyebrow}</Eyebrow>}
            <Title className="hero-title">{title}</Title>
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
          {stats && <ProofBar onDark />}
        </div>
      </section>
      {crumbs && (
        <div className="crumb-bar">
          <div className="container">
            <Breadcrumbs items={crumbs} />
          </div>
        </div>
      )}
    </>
  );
}
