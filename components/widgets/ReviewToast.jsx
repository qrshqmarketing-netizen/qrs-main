'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CloseIcon, GoogleLogo } from '@/components/ui/icons';
import { GOOGLE_REVIEWS } from '@/data/reviews';
import { SHOW_REVIEW_EVENT } from '@/lib/events';
import { session } from '@/lib/storage';
import './ReviewToast.css';

const SHOW_MS = 7000, GAP_MS = 9000, FIRST_MS = 6000;
const REVIEWS = GOOGLE_REVIEWS.map((r) => ({ ...r, text: r.text.replace(/\s+/g, ' ').trim() }));

// Rotates the Google reviews in the bottom-left corner. Closing it hides it for the rest of the visit.
export default function ReviewToast() {
  const [shown, setShown] = useState(null); // index of the review in the toast
  const [visible, setVisible] = useState(false);
  const loop = useRef({ next: 0, timer: null, hovering: false, reviewsOnScreen: false, stopped: false });
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const s = loop.current;
    if (session.get('rvToastOff') || !REVIEWS.length) return;
    s.stopped = false;

    const cycle = () => {
      clearTimeout(s.timer);
      if (s.stopped) return;
      // Wait while the reviews section is on screen, the phone menu is open or the cookie notice is up (same corner)
      const busy = ['menu-open', 'cookie-open'].some((c) => document.body.classList.contains(c));
      if (s.reviewsOnScreen || busy) {
        s.timer = setTimeout(cycle, 2000);
        return;
      }
      setShown(s.next);
      setVisible(true);
      s.timer = setTimeout(function out() {
        if (s.hovering) {
          s.timer = setTimeout(out, 1000);
          return;
        }
        setVisible(false);
        s.next = (s.next + 1) % REVIEWS.length;
        s.timer = setTimeout(cycle, GAP_MS);
      }, SHOW_MS);
    };

    s.timer = setTimeout(cycle, FIRST_MS);
    return () => {
      s.stopped = true;
      clearTimeout(s.timer);
    };
  }, []);

  // Don't show the toast while the reviews themselves are on screen (re-checked on every page)
  useEffect(() => {
    const s = loop.current;
    s.reviewsOnScreen = false;
    const reviews = document.getElementById('reviews');
    if (!reviews || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        s.reviewsOnScreen = entry.isIntersecting;
        if (s.reviewsOnScreen) setVisible(false);
      },
      { threshold: 0.2 }
    );
    observer.observe(reviews);
    return () => observer.disconnect();
  }, [pathname]);

  const hover = (on) => () => {
    loop.current.hovering = on;
  };

  const close = (e) => {
    e.stopPropagation();
    loop.current.stopped = true;
    clearTimeout(loop.current.timer);
    setVisible(false);
    session.set('rvToastOff', '1');
  };

  // Jump to this review in the reviews section (on the home page if this page has none)
  const openReview = () => {
    setVisible(false);
    const reviews = document.getElementById('reviews');
    if (!reviews) {
      router.push('/#reviews');
      return;
    }
    window.dispatchEvent(new CustomEvent(SHOW_REVIEW_EVENT, { detail: shown }));
    reviews.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const review = shown === null ? null : REVIEWS[shown];

  return (
    <div
      className={'rv-toast' + (visible ? ' show' : '')}
      id="rvToast"
      role="status"
      aria-live="polite"
      aria-label={review ? `${review.name} left a 5-star Google review` : undefined}
      onMouseEnter={hover(true)}
      onMouseLeave={hover(false)}
      onFocus={hover(true)}
      onBlur={hover(false)}
    >
      <button className="rv-open" type="button" aria-label="Read this review" onClick={openReview}>
        <span className="rv-avatar" aria-hidden="true" style={review ? { background: review.color } : undefined}>
          {review?.name[0]}
        </span>
        <span className="rv-body">
          <span className="rv-top">
            <span className="rv-name">{review?.name}</span>
            <GoogleLogo className="rv-g" />
          </span>
          <span className="rv-stars" aria-hidden="true">★★★★★</span>
          <span className="rv-text">{review && `“${review.text}”`}</span>
          <span className="rv-meta">
            <span className="rv-date">{review?.date}</span> &middot; Google review
          </span>
        </span>
      </button>
      <button className="rv-close" type="button" aria-label="Hide reviews" onClick={close}>
        <CloseIcon />
      </button>
    </div>
  );
}
