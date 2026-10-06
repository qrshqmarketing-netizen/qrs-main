'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CloseIcon, GoogleLogo } from '@/components/ui/icons';
import { GOOGLE_REVIEWS } from '@/data/reviews';
import { COOKIE_OK_EVENT, COOKIE_OK_KEY, SHOW_REVIEW_EVENT } from '@/lib/events';
import { getLiveReviews, officeForPath } from '@/lib/liveReviews';
import { sortReviewsFor } from '@/lib/reviewTopics';
import { local, session } from '@/lib/storage';
import './ReviewToast.css';

const SHOW_MS = 7000, GAP_MS = 9000, FIRST_MS = 6000, LIVE_WAIT_MS = 2500;
const COLORS = ['#1a73e8', '#188038', '#c5221f', '#b35900', '#7b1fa2', '#00796b'];
const oneLine = (text) => text.replace(/\s+/g, ' ').trim();
// The hand-picked reviews (data/reviews.js); the live Google reviews replace them when Google has some (lib/liveReviews.js)
const REVIEWS = GOOGLE_REVIEWS.map((r) => ({ ...r, text: oneLine(r.text) }));
const fromLive = (r, i) => ({ name: r.name, text: oneLine(r.text), photoUrl: r.photoUrl, color: COLORS[i % COLORS.length] });

// Compact toast in the bottom-left corner that rotates the Google reviews (name, stars and a one-line quote): the live 5-star
// reviews when Google has some, otherwise the hand-picked ones, the ones closest to the page's topic first (lib/reviewTopics.js). Closing it hides
// it for the rest of the visit.
export default function ReviewToast() {
  const [shown, setShown] = useState(null); // index of the review in the toast
  const [visible, setVisible] = useState(false);
  const loop = useRef({ next: 0, timer: null, hovering: false, reviewsOnScreen: false, stopped: false });
  const base = useRef(REVIEWS); // the reviews in their usual order (the live ones once Google has answered)
  const list = useRef(REVIEWS); // the reviews this toast rotates through, in this page's order
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const s = loop.current;
    if (session.get('rvToastOff') || !REVIEWS.length) return;
    s.stopped = false;

    const cycle = () => {
      clearTimeout(s.timer);
      if (s.stopped) return;
      // Wait while the reviews section is on screen, the phone menu is open or the season promo is up
      if (s.reviewsOnScreen || ['menu-open', 'promo-open'].some((c) => document.body.classList.contains(c))) {
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
        s.next = (s.next + 1) % list.current.length;
        s.timer = setTimeout(cycle, GAP_MS);
      }, SHOW_MS);
    };

    // First visit: nothing until the visitor accepts the cookie notice, then the usual first delay. Before the first review the
    // live reviews are fetched (shared with the slider, one request per page load); if Google is slow or has none, the
    // hand-picked ones are used.
    const start = () => {
      s.timer = setTimeout(async () => {
        const live = await Promise.race([getLiveReviews(officeForPath(window.location.pathname)), new Promise((resolve) => setTimeout(() => resolve(null), LIVE_WAIT_MS))]);
        if (s.stopped) return;
        if (live) {
          base.current = live.reviews.map(fromLive);
          list.current = sortReviewsFor(base.current, window.location.pathname);
        }
        cycle();
      }, FIRST_MS);
    };
    if (local.get(COOKIE_OK_KEY)) start();
    else window.addEventListener(COOKIE_OK_EVENT, start, { once: true });
    return () => {
      s.stopped = true;
      clearTimeout(s.timer);
      window.removeEventListener(COOKIE_OK_EVENT, start);
    };
  }, []);

  // Each page starts with the reviews closest to its topic: re-ordered on the first page and whenever the visitor moves to another one
  useEffect(() => {
    list.current = sortReviewsFor(base.current, pathname);
    loop.current.next = 0;
    setVisible(false);
    setShown(null);
  }, [pathname]);

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
    window.dispatchEvent(new CustomEvent(SHOW_REVIEW_EVENT, { detail: { name: list.current[shown]?.name } }));
    reviews.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const review = shown === null ? null : list.current[shown];

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
          {review?.photoUrl && <img className="rv-photo" key={shown} src={review.photoUrl} alt="" width="30" height="30" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
        </span>
        <span className="rv-body">
          <span className="rv-top">
            <span className="rv-name">{review?.name}</span>
            <span className="rv-stars" aria-hidden="true">★★★★★</span>
            <GoogleLogo className="rv-g" />
          </span>
          <span className="rv-text">{review && `“${review.text}”`}</span>
        </span>
      </button>
      <button className="rv-close" type="button" aria-label="Hide reviews" onClick={close}>
        <CloseIcon />
      </button>
    </div>
  );
}
