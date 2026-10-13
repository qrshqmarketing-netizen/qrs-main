'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { GoogleLogo, Star } from '@/components/ui/icons';
import { GOOGLE_REVIEWS } from '@/data/reviews';
import { SHOW_REVIEW_EVENT } from '@/lib/events';
import { getLiveReviews } from '@/lib/liveReviews';
import { sortReviewsFor } from '@/lib/reviewTopics';
import { Avatar, COLORS, withLineBreaks } from './ReviewSlider';
import './Testimonials.css';
import './ReviewMarquee.css';

const LONG = 230; // characters: a longer review is clamped with a "Read more" button
const CARD_PX = 360; // a card and its gap, for working out how many copies fill a wide screen

// "Client stories", adapted from fluid.glass: the Google reviews as cards in two rows drifting in opposite directions (one row when there are few),
// pausing on hover, on keyboard focus and while a card is opened. Same data and rules as the review slider (ReviewSlider.jsx): the hand-picked
// reviews first, the live 5-star reviews swapped in when they arrive (with Google's credits and links), closest to the page's topic first
// (`places`: the area's names, so reviews naming them lead). Never shows how many reviews there are. Reduced motion: the rows stand still and
// scroll sideways by hand. The copies that make the loop seamless are hidden from screen readers and the keyboard (`inert`).
export default function ReviewMarquee({ office = '', places = [], label = 'Client stories', heading = 'In their own words', text = 'Reviews from the people we roof for, on Google.' }) {
  const [live, setLive] = useState(null);
  const [opened, setOpened] = useState(null); // the review shown in full
  const [lit, setLit] = useState(null); // the review the bottom-left pop-up pointed to
  const root = useRef(null);
  const pathname = usePathname();
  const placeKey = places.join('|');
  const reviews = useMemo(
    () => sortReviewsFor(live ? live.reviews : GOOGLE_REVIEWS, pathname, placeKey ? placeKey.split('|') : []),
    [live, pathname, placeKey]
  );
  const rows = reviews.length >= 6 ? [reviews.filter((_, i) => i % 2 === 0), reviews.filter((_, i) => i % 2 === 1)] : [reviews];

  // Live reviews: asked for once, when the section is about to come into view
  useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    let cancelled = false;
    const load = async () => {
      const data = await getLiveReviews(office);
      if (!cancelled && data) setLive(data);
    };
    if (!('IntersectionObserver' in window)) {
      load();
      return () => {
        cancelled = true;
      };
    }
    const watcher = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        watcher.disconnect();
        load();
      }
    }, { rootMargin: '300px' });
    watcher.observe(el);
    return () => {
      cancelled = true;
      watcher.disconnect();
    };
  }, [office]);

  // The pop-up's "read it" link: the rows stop and that review's card lights up for a few seconds
  useEffect(() => {
    let timer;
    const onShow = (e) => {
      setLit(e.detail?.name || null);
      clearTimeout(timer);
      timer = setTimeout(() => setLit(null), 6000);
    };
    window.addEventListener(SHOW_REVIEW_EVENT, onShow);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(SHOW_REVIEW_EVENT, onShow);
    };
  }, []);

  // hidden: a repeat that only fills the loop (kept out of screen readers and the keyboard)
  const card = (review, i, hidden, n) => {
    const key = review.name + i;
    const open = opened === key;
    return (
      <li className={'rmq-card' + (open ? ' open' : '') + (lit === review.name ? ' lit' : '')} key={n} {...(hidden ? { 'aria-hidden': 'true', inert: true } : {})}>
        <div className="g-stars" role="img" aria-label="Rated 5 out of 5 stars on Google">
          <Star /><Star /><Star /><Star /><Star />
        </div>
        <blockquote>{withLineBreaks(review.text)}</blockquote>
        {review.text.length > LONG && (
          <button className="rmq-more" type="button" aria-expanded={open} onClick={() => setOpened(open ? null : key)}>
            {open ? 'Show less' : 'Read more'}
          </button>
        )}
        <div className="rmq-by">
          <Avatar name={review.name} photoUrl={review.photoUrl} color={review.color || COLORS[i % COLORS.length]} />
          <span className="tst-who">
            {live ? (
              review.profileUrl ? <a className="tst-name" href={review.profileUrl} target="_blank" rel="noopener">{review.name}</a> : <span className="tst-name">{review.name}</span>
            ) : (
              <a className="tst-name" href={review.url} target="_blank" rel="noopener">{review.name}</a>
            )}
            <span className="tst-date">
              {review.date} &middot; <GoogleLogo className="g-logo-sm" /> {live ? 'Google Maps' : 'Google'}
            </span>
            {live && (review.reviewUrl || review.reportUrl) && (
              <span className="tst-links">
                {review.reviewUrl && <a href={review.reviewUrl} target="_blank" rel="noopener">View on Google Maps</a>}
                {review.reportUrl && <a href={review.reportUrl} target="_blank" rel="noopener">Report</a>}
              </span>
            )}
          </span>
        </div>
      </li>
    );
  };

  return (
    <section className={'rmq' + (lit ? ' has-lit' : '')} id="reviews" ref={root} aria-label="Google reviews" data-no-reveal="">
      <div className="container rmq-head">
        <p className="rmq-label">{label}</p>
        <h2>{heading}</h2>
        <p className="rmq-sub">
          <GoogleLogo className="g-logo-sm" /> {text}
        </p>
      </div>
      <div className="rmq-rows">
        {rows.map((row, r) => {
          // Enough copies of the row that one set is wider than a big screen, so the loop never shows a gap
          const repeat = Math.max(1, Math.ceil(2400 / (row.length * CARD_PX)));
          const set = Array.from({ length: repeat }, () => row).flat();
          return (
            <div className={'rmq-row' + (r % 2 ? ' rmq-back' : '')} style={{ '--dur': `${row.length * repeat * 7}s` }} key={r}>
              <div className="rmq-track">
                {[0, 1].map((copy) => (
                  <ul className="rmq-set" key={copy} {...(copy ? { 'aria-hidden': 'true', inert: true } : {})}>
                    {set.map((review, i) => card(review, i % row.length, !copy && i >= row.length, i))}
                  </ul>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
