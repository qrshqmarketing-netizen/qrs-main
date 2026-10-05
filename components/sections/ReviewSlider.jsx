'use client';

import { useEffect, useRef, useState } from 'react';
import ArrowButton from '@/components/ui/ArrowButton';
import { GoogleLogo, Star } from '@/components/ui/icons';
import { GOOGLE_REVIEWS } from '@/data/reviews';
import { SHOW_REVIEW_EVENT } from '@/lib/events';
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
// reviews in data/reviews.js; once the slider scrolls into view it asks /api/google-reviews/ for live 5-star reviews
// (data/places.js) and swaps them in when Google has some. `office`: a location or city slug to show that location's reviews.
export default function ReviewSlider({ office = '' }) {
  const [index, setIndex] = useState(0);
  const [live, setLive] = useState(null); // { place, reviews } once Google answered with reviews
  const root = useRef(null);
  const reviews = live ? live.reviews : GOOGLE_REVIEWS;
  const count = reviews.length;
  const move = (step) => setIndex((i) => (i + step + count) % count);

  // The review pop-up can jump the slider to the review it was showing (it only knows the hand-picked ones)
  useEffect(() => {
    if (live) return;
    const onShow = (e) => setIndex(e.detail);
    window.addEventListener(SHOW_REVIEW_EVENT, onShow);
    return () => window.removeEventListener(SHOW_REVIEW_EVENT, onShow);
  }, [live]);

  // Live reviews: asked for once, when the slider is about to come into view
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/api/google-reviews/' + (office ? `?office=${encodeURIComponent(office)}` : ''));
        const data = await res.json();
        if (!cancelled && data.reviews?.length) {
          setLive(data);
          setIndex(0);
        }
      } catch {
        // keep the hand-picked reviews
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
    <div>
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
      {live && <p className="tst-notice">Showing 5-star reviews of our {live.place} location on Google Maps, in the order Google ranks them.</p>}
    </div>
  );
}
