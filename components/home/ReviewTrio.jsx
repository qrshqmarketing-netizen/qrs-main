'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight, GoogleLogo, Star } from '@/components/ui/icons';
import { Avatar, COLORS } from '@/components/sections/ReviewSlider';
import { GOOGLE_REVIEWS as REVIEWS } from '@/data/reviews';
import { GOOGLE_REVIEWS } from '@/data/site';
import { getLiveReviews, officeForPath } from '@/lib/liveReviews';
import { sortReviewsFor } from '@/lib/reviewTopics';
import HomeHead from './HomeHead';
import './HomeClean.css';
import './HomeNav.css';

// Three reviews side by side (after publicstorage.com's "Ask them." testimonials: a face, a name and a short quote each), in place of the
// two-row review wall on the sub pages. Picked for the page (owner, October 22 2026: "dynamic with the page topic"): the page first shows
// the hand-picked Google reviews (data/reviews.js) closest to its topic (`path`, and `places` on city pages, whose names count most);
// when the section nears the screen it asks for the live Google reviews once (lib/liveReviews.js, the same single, uncached request the
// review wall made; a city page asks for its own office's), puts them with the hand-picked ones and shows the three closest to the topic,
// a live one first when they tie. Live reviews carry Google's credits (the reviewer's photo and profile link, "View on Google Maps").
// The whole review is in the page; long ones are cut to a few lines on screen (CSS), never shortened in the text.
const withColors = (list) => list.map((r, i) => ({ ...r, color: r.color || COLORS[i % COLORS.length] }));

export default function ReviewTrio({ path, places = [], heading = 'What people say after the __job__' }) {
  const pathname = usePathname() || '/';
  const page = path || pathname;
  const root = useRef(null);
  const [live, setLive] = useState(null);
  const placeKey = places.join('|');

  useEffect(() => {
    const el = root.current;
    let cancelled = false;
    const load = async () => {
      const data = await getLiveReviews(officeForPath(page));
      if (!cancelled && data) setLive(data.reviews.map((r) => ({ ...r, live: true })));
    };
    if (!el || !('IntersectionObserver' in window)) {
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
    }, { rootMargin: '600px' });
    watcher.observe(el);
    return () => {
      cancelled = true;
      watcher.disconnect();
    };
  }, [page]);

  const reviews = useMemo(() => {
    const names = new Set((live || []).map((r) => r.name.toLowerCase()));
    const pool = [...withColors(live || []), ...REVIEWS.filter((r) => !names.has(r.name.toLowerCase()))];
    return sortReviewsFor(pool, page, placeKey ? placeKey.split('|') : []).slice(0, 3);
  }, [live, page, placeKey]);

  return (
    <section className="hc-section rt" aria-labelledby="rt-title" ref={root}>
      <div className="hc-wrap">
        <HomeHead id="rt-title" heading={heading} text={`${GOOGLE_REVIEWS.count} reviews from the people we roof for, on Google.`} />
        <ul className="rt-list">
          {reviews.map((r) => (
            <li className="rt-item" key={r.name}>
              <Avatar name={r.name} photoUrl={r.photoUrl} color={r.color} />
              {r.live && r.profileUrl ? (
                <a className="rt-name" href={r.profileUrl} target="_blank" rel="noopener">
                  {r.name}
                </a>
              ) : (
                <p className="rt-name">{r.name}</p>
              )}
              <p className="rt-stars" role="img" aria-label="Rated 5 out of 5 stars on Google">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} />
                ))}
              </p>
              <blockquote className="rt-quote">
                <p>&ldquo;{r.text.replace(/\s*\n+\s*/g, ' ').trim()}&rdquo;</p>
              </blockquote>
              <a className="rt-source" href={(r.live ? r.reviewUrl || r.profileUrl : r.url) || 'https://www.google.com/maps'} target="_blank" rel="noopener">
                <GoogleLogo /> {r.live ? 'View on Google Maps' : 'Read it on Google'}
                {r.date && <span className="rt-date"> · {r.date}</span>}
              </a>
            </li>
          ))}
        </ul>
        <p className="hc-center">
          <SiteLink className="hc-pill" href="/reviews/">
            Read more reviews <ArrowRight />
          </SiteLink>
        </p>
      </div>
    </section>
  );
}
