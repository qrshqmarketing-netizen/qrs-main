'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import ArrowButton from '@/components/ui/ArrowButton';
import { GoogleLogo, Star } from '@/components/ui/icons';
import { GOOGLE_REVIEWS } from '@/data/reviews';
import { SHOW_REVIEW_EVENT } from '@/lib/events';
import { getLiveReviews } from '@/lib/liveReviews';
import { sortReviewsFor } from '@/lib/reviewTopics';
import './Testimonials.css';

const withLineBreaks = (text) => text.split('\n').flatMap((line, i) => (i ? [<br key={i} />, line] : [line]));
const COLORS = ['#1a73e8', '#188038', '#c5221f', '#b35900', '#7b1fa2', '#00796b'];

// A live reviewer's Google profile photo, or their first initial when there's no photo (or it doesn't load)
function Avatar({ name, photoUrl, color }) {
  const [broken, setBroken] = useState(false);
  return (
    <span className="tst-avatar" style={{ background: color }} aria-hidden="true">
      {photoUrl && !broken ? (
        <img className="tst-photo" src={photoUrl} alt="" width="46" height="46" loading="lazy" referrerPolicy="no-referrer" onError={() => setBroken(true)} />
      ) : (
        name[0]
      )}
    </span>
  );
}

// One Google review at a time, with prev/next arrows (styles in Testimonials.css). It starts with the hand-picked
// reviews in data/reviews.js; once the slider scrolls into view (or the pop-up sends someone here) it gets the live 5-star
// reviews (lib/liveReviews.js, data/places.js) and swaps them in when Google has some. `office`: a location or city slug. The reviews are shown
// closest to the page's topic first (lib/reviewTopics.js); `places` (a city page's city and neighborhoods) put the reviews that name them first.
export default function ReviewSlider({ office = '', places = [] }) {
  const [index, setIndex] = useState(0);
  const [live, setLive] = useState(null); // { place, reviews } once Google answered with reviews
  const root = useRef(null);
  const pathname = usePathname();
  const placeKey = places.join('|');
  const placeList = useMemo(() => (placeKey ? placeKey.split('|') : []), [placeKey]);
  const reviews = useMemo(() => sortReviewsFor(live ? live.reviews : GOOGLE_REVIEWS, pathname, placeList), [live, pathname, placeList]);
  const count = reviews.length;
  const move = (step) => setIndex((i) => (i + step + count) % count);

  // The review pop-up can jump the slider to the review it was showing: both use the same list, live or hand-picked
  useEffect(() => {
    let cancelled = false;
    const onShow = async (e) => {
      const data = await getLiveReviews(office);
      if (cancelled) return;
      if (data) setLive(data);
      // the pop-up names the review it was showing; find it in this page's order
      const at = sortReviewsFor(data ? data.reviews : GOOGLE_REVIEWS, pathname, placeList).findIndex((r) => r.name === e.detail?.name);
      setIndex(at > -1 ? at : 0);
    };
    window.addEventListener(SHOW_REVIEW_EVENT, onShow);
    return () => {
      cancelled = true;
      window.removeEventListener(SHOW_REVIEW_EVENT, onShow);
    };
  }, [office, pathname, placeList]);

  // Live reviews: asked for once, when the slider is about to come into view
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let cancelled = false;
    const load = async () => {
      const data = await getLiveReviews(office);
      if (!cancelled && data) {
        setLive(data);
        setIndex(0);
      }
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

  return (
    <div className="tst-slider" id="tstSlider" ref={root} aria-roledescription="carousel" aria-label="Google reviews">
      <div aria-live="polite">
        {reviews.map((review, i) => (
          <figure className={'tst-slide' + (i === index ? ' active' : '')} aria-roledescription="slide" aria-label={`${i + 1} of ${count}`} key={review.name + i}>
            <div className="g-stars" role="img" aria-label="Rated 5 out of 5 stars on Google">
              <Star /><Star /><Star /><Star /><Star />
            </div>
            <blockquote>{withLineBreaks(review.text)}</blockquote>
            <figcaption className="tst-by">
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
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="tst-arrows">
        <ArrowButton direction="prev" id="tstPrev" aria-label="Previous review" onClick={() => move(-1)} />
        <ArrowButton direction="next" id="tstNext" aria-label="Next review" onClick={() => move(1)} />
      </div>
    </div>
  );
}
