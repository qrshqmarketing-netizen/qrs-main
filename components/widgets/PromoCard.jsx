'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { CloseIcon, PhoneIcon } from '@/components/ui/icons';
import { PROMO_NAME } from '@/data/promo';
import { PHONE, TEL } from '@/data/site';
import { local } from '@/lib/storage';
import { trackEvent } from '@/lib/tracking';
import PromoRain from './PromoRain';
import './SeasonPromo.css';

const PHOTO = '/images/season-promo-storm-over-los-angeles.webp';

// The El Niño offer card (copy in data/promo.js), used three ways:
//   variant="modal"   the popup (SeasonPromo.jsx puts it in a dialog over a dark overlay; the photo is the card's CSS background)
//   variant="inline"  the section on the home page, above the request card (PromoSection.jsx)
//   variant="landing" the full-width top of the El Niño landing page (app/el-nino-roof-check/page.js); `as="section"`, the heading is the H1
// `track` names the piece for Google Analytics (promo_view when it is shown, promo_click and promo_call when its buttons are used) and
// is the utm_medium of the button's address (promoLandingHref in data/promo.js). Clicking the main button also means the visitor has
// taken the offer, so the popup never comes back. `exit` is the "before you go" wording (smaller heading, "No thanks" under the button).
// Only simple values go in from a server component: strings, and `points` (a list of short lines under the button).
export default function PromoCard({
  variant = 'modal', as: Tag = 'div', track, eyebrow, heading, headingTag: Heading = 'p', headingId, text, cta, exit = false, rain = true,
  points, onClaim, onClose, onSkip, closeRef,
}) {
  const root = useRef(null);
  const event = (name, extra = {}) => trackEvent(name, { promo_name: PROMO_NAME, promo_variant: track || variant, ...extra });

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

  const claim = () => {
    local.set('promoClaimed', '1');
    event('promo_click', { cta: 'primary' });
    onClaim?.();
  };

  const dialog = variant === 'modal' && { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': headingId, onClick: (e) => e.stopPropagation() };

  return (
    <Tag className={`promo promo-${variant}`} ref={root} {...dialog}>
      {variant !== 'modal' && (
        <Image className="promo-photo" src={PHOTO} alt="" fill sizes="100vw" {...(variant === 'landing' && { preload: true, fetchPriority: 'high' })} />
      )}
      {rain && <PromoRain rich={variant === 'landing'} />}
      {onClose && (
        <button className="promo-close" type="button" aria-label="Close" onClick={onClose} ref={closeRef}>
          <CloseIcon />
        </button>
      )}
      <div className="promo-eyebrow">{eyebrow}</div>
      <Heading className={'promo-title' + (exit ? ' promo-title-exit' : '')} id={headingId}>
        {heading}
      </Heading>
      <p className="promo-text">{text}</p>
      <div className="promo-actions">
        <a className="btn btn-gold" href={cta.href} onClick={claim}>
          {cta.label}
          {variant !== 'modal' && <span className="arrow">→</span>}
        </a>
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
    </Tag>
  );
}
