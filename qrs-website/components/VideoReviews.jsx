'use client';

import { useState } from 'react';
import { REVIEWS, VIDEO_EMBED } from '@/data/site';
import { ArrowLeft, ArrowRight } from './Icons';

export default function VideoReviews() {
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const show = (n) => setIndex((n + REVIEWS.length) % REVIEWS.length);

  return (
    <section className="testimonials" id="reviews">
      <div className="container">
        <div className="vid-grid">
          <div className="vid-copy">
            <div className="vid-mark" aria-hidden="true">
              <svg viewBox="0 0 64 64"><path d="M32 7c-9 2-16 9-18 18 4-3 8-4 12-4-6 6-9 13-7 21 4-4 8-6 13-7v15h6V35c5 1 9 3 13 7 2-8-1-15-7-21 4 0 8 1 12 4C48 16 41 9 32 7Z" fill="currentColor" /><path d="M23 22h18M20 29h24M23 37h18" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></svg>
            </div>
            <h2>Take the Guesswork Out of Roof Repairs</h2>
            <p>See the QRS process from start to finish &mdash; from the first roof check to the final walkthrough. With us, there&rsquo;s no pressure and no mystery scope, just a clear written price and a commitment to detail-first workmanship. We&rsquo;re a local roofing team built to be straightforward and reliable for homeowners across Los Angeles and Orange County.</p>
          </div>

          {/* Set VIDEO_EMBED in data/site.js. Optional poster: add <img src="/images/poster.jpg" alt="" /> inside the button. */}
          {playing && VIDEO_EMBED ? (
            <div className="vid-frame" style={{ cursor: 'default' }}>
              <iframe
                src={`${VIDEO_EMBED}${VIDEO_EMBED.includes('?') ? '&' : '?'}autoplay=1`}
                title="QRS process video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <button className="vid-frame" type="button" aria-label="Play the QRS process video" onClick={() => VIDEO_EMBED && setPlaying(true)}>
              <span className="vid-play" aria-hidden="true"></span>
              <span className="vid-tag">QRS process video</span>
            </button>
          )}
        </div>

        <div className="tst-grid">
          <div className="tst-intro">
            <h2>Don&rsquo;t Take Our Word For It</h2>
            <p>See what homeowners across Los Angeles and Orange County have to say about their experience with QRS.</p>
          </div>

          <div className="tst-slider" aria-roledescription="carousel" aria-label="Customer reviews">
            <div aria-live="polite">
              {REVIEWS.map((r, i) => (
                <figure key={i} className={`tst-slide${i === index ? ' active' : ''}`} aria-roledescription="slide" aria-label={`${i + 1} of ${REVIEWS.length}`}>
                  <blockquote>{r.quote}</blockquote>
                  <figcaption className="tst-name">{r.name}<span className="tst-date">{r.date}</span></figcaption>
                </figure>
              ))}
            </div>
            <div className="tst-arrows">
              <button className="svc-arrow" type="button" aria-label="Previous review" onClick={() => show(index - 1)}><ArrowLeft /></button>
              <button className="svc-arrow" type="button" aria-label="Next review" onClick={() => show(index + 1)}><ArrowRight /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
