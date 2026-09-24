'use client';

import { useEffect, useState } from 'react';
import ArrowButton from '@/components/ui/ArrowButton';
import { GoogleLogo, Star } from '@/components/ui/icons';
import { GOOGLE_REVIEWS } from '@/data/reviews';
import { SHOW_REVIEW_EVENT } from '@/lib/events';

const withLineBreaks = (text) => text.split('\n').flatMap((line, i) => (i ? [<br key={i} />, line] : [line]));

// One Google review at a time, with prev/next arrows (styles in Testimonials.css)
export default function ReviewSlider() {
  const [index, setIndex] = useState(0);
  const count = GOOGLE_REVIEWS.length;
  const move = (step) => setIndex((i) => (i + step + count) % count);

  // The review pop-up can jump the slider to the review it was showing
  useEffect(() => {
    const onShow = (e) => setIndex(e.detail);
    window.addEventListener(SHOW_REVIEW_EVENT, onShow);
    return () => window.removeEventListener(SHOW_REVIEW_EVENT, onShow);
  }, []);

  return (
    <div className="tst-slider" id="tstSlider" aria-roledescription="carousel" aria-label="Google reviews">
      <div aria-live="polite">
        {GOOGLE_REVIEWS.map((review, i) => (
          <figure className={'tst-slide' + (i === index ? ' active' : '')} aria-roledescription="slide" aria-label={`${i + 1} of ${count}`} key={review.url}>
            <div className="g-stars" role="img" aria-label="Rated 5 out of 5 stars on Google">
              <Star /><Star /><Star /><Star /><Star />
            </div>
            <blockquote>{withLineBreaks(review.text)}</blockquote>
            <figcaption className="tst-by">
              <span className="tst-avatar" style={{ background: review.color }} aria-hidden="true">{review.name[0]}</span>
              <span className="tst-who">
                <a className="tst-name" href={review.url} target="_blank" rel="noopener">{review.name}</a>
                <span className="tst-date">
                  {review.date} &middot; <GoogleLogo className="g-logo-sm" /> Google
                </span>
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
