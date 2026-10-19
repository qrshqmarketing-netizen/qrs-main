'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { CloseIcon, PhoneIcon } from '@/components/ui/icons';
import Mark from '@/components/ui/Mark';
import { PROMO_NAME } from '@/data/promo';
import { PHONE, TEL } from '@/data/site';
import { local } from '@/lib/storage';
import { trackEvent } from '@/lib/tracking';
import HeroVideo from './HeroVideo';
import PromoRain from './PromoRain';
import './SeasonPromo.css';

const PHOTO = '/images/season-promo-storm-over-los-angeles.webp';

// The El Niño offer card (copy in data/promo.js), used three ways:
//   variant="modal"   the popup (SeasonPromo.jsx puts it in a dialog over a dark overlay; the photo is the card's CSS background)
//   variant="inline"  the section on the home page, above the request card (PromoSection.jsx)
//   variant="landing" a full-width hero: the home page's hero (the eyebrow is the page's H1 there: `eyebrowTag="h1"`) and the El Niño landing page's top,
//                     where `aside` (the quick request form) sits beside the copy in two columns and the heading is the H1. Without `cta` only the call link shows.
// `track` names the piece for Google Analytics (promo_view when it is shown, promo_click and promo_call when its buttons are used) and
// is the utm_medium of the button's address (promoLandingHref in data/promo.js). Clicking the main button also means the visitor has
// taken the offer, so the popup never comes back. `exit` is the "before you go" wording (smaller heading, "No thanks" under the button).
// `video` ([{ src, type }]): a muted looping background video over the photo (the home hero), loaded after the page; the photo stays as the fallback.
// `photo`: a different background photo (the home hero uses the drone video's first frame, so the poster and the video match).
// `note`: a short line in the top-left corner (the home hero: "Licensed since 2020"); it comes last in the markup so the splash's staggered rise keeps its order.
// Only simple values go in from a server component: strings, and `points` (a list of short lines under the button).
export default function PromoCard({
  variant = 'modal', as: Tag = 'div', track, eyebrow, eyebrowTag: Eyebrow = 'div', heading, headingTag: Heading = 'p', headingId, text, cta, exit = false, rain = true,
  points, note, aside, video, photo = PHOTO, className, onClaim, onClose, onSkip, closeRef,
}) {
  const root = useRef(null);
  // track={false}: the card is used for something that isn't the El Niño offer (the home hero): no promo events, and its button doesn't count as taking the offer
  const event = (name, extra = {}) => track !== false && trackEvent(name, { promo_name: PROMO_NAME, promo_variant: track || variant, ...extra });

  // Shown: a popup counts when it opens, the other pieces when 40% of them has scrolled into view
  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    if (variant === 'modal' || !('IntersectionObserver' in window)) {
      event('promo_view');
      return undefined;
    }
    const watcher = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      event('promo_view');
      watcher.disconnect();
    }, { threshold: 0.4 });
    watcher.observe(el);
    return () => watcher.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, track]);

  const claim = (e) => {
    if (track !== false) local.set('promoClaimed', '1');
    event('promo_click', { cta: 'primary' });
    onClaim?.(e);
  };

  const dialog = variant === 'modal' && { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': headingId, onClick: (e) => e.stopPropagation() };

  return (
    <Tag className={`promo promo-${variant}` + (aside ? ' promo-split' : '') + (className ? ` ${className}` : '')} ref={root} {...dialog}>
      {variant !== 'modal' && (
        <Image className="promo-photo" src={photo} alt="" fill sizes="100vw" {...(variant === 'landing' && { preload: true, fetchPriority: 'high' })} />
      )}
      {video && <HeroVideo sources={video} className="promo-video" />}
      {rain && <PromoRain rich={variant === 'landing'} />}
      {onClose && (
        <button className="promo-close" type="button" aria-label="Close" onClick={onClose} ref={closeRef}>
          <CloseIcon />
        </button>
      )}
      <div className="promo-copy">
        <Eyebrow className="promo-eyebrow">{eyebrow}</Eyebrow>
        <Heading className={'promo-title' + (exit ? ' promo-title-exit' : '')} id={headingId}>
          <Mark text={heading} animate />
        </Heading>
        <p className="promo-text">{text}</p>
        <div className="promo-actions">
          {cta && (
            <a className="btn btn-gold" href={cta.href} onClick={claim}>
              {cta.label}
              {variant !== 'modal' && <span className="arrow">→</span>}
            </a>
          )}
          {onSkip ? (
            <button className="promo-skip" type="button" onClick={onSkip}>
              No thanks
            </button>
          ) : (
            <a className="promo-call" href={TEL} onClick={() => event('promo_call')}>
              <PhoneIcon /> {PHONE}
            </a>
          )}
        </div>
        {points?.length > 0 && (
          <ul className="promo-points">
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}
        {note && <p className="promo-note">{note}</p>}
      </div>
      {aside && <div className="promo-aside">{aside}</div>}
    </Tag>
  );
}
