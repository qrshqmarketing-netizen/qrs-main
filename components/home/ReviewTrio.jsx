import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight, GoogleLogo, Star } from '@/components/ui/icons';
import { GOOGLE_REVIEWS as REVIEWS } from '@/data/reviews';
import { GOOGLE_REVIEWS } from '@/data/site';
import { sortReviewsFor } from '@/lib/reviewTopics';
import HomeHead from './HomeHead';
import './HomeNav.css';

// Three reviews side by side (after publicstorage.com's "Ask them." testimonials: a face, a name and a short quote each), in place of the
// two-row review wall on the sub pages. The hand-picked Google reviews (data/reviews.js), closest to the page's topic first (`path`, and
// `places` on city pages: reviews naming them lead), each cut to its first sentences with a link to the full review on Google.
const MAX = 190; // characters of a quote before it is cut at a word

const shorten = (text) => {
  const flat = text.replace(/\s*\n+\s*/g, ' ').trim();
  if (flat.length <= MAX) return flat;
  const sentences = flat.match(/[^.!?]+[.!?]+/g) || [];
  let out = '';
  for (const s of sentences) {
    if ((out + s).length > MAX) break;
    out += s;
  }
  return out.trim() || flat.slice(0, flat.lastIndexOf(' ', MAX)) + '…';
};

export default function ReviewTrio({ path = '/', places = [], heading = 'What people say after the __job__' }) {
  const reviews = sortReviewsFor(REVIEWS, path, places).slice(0, 3);
  return (
    <section className="hc-section rt" aria-labelledby="rt-title">
      <div className="hc-wrap">
        <HomeHead id="rt-title" heading={heading} text={`${GOOGLE_REVIEWS.count} reviews from the people we roof for, on Google.`} />
        <ul className="rt-list">
          {reviews.map((r) => (
            <li className="rt-item" key={r.name}>
              <span className="rt-avatar" style={{ background: r.color }} aria-hidden="true">
                {r.name[0]}
              </span>
              <p className="rt-name">{r.name}</p>
              <p className="rt-stars" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} />
                ))}
              </p>
              <blockquote className="rt-quote">
                <p>&ldquo;{shorten(r.text)}&rdquo;</p>
              </blockquote>
              <a className="rt-source" href={r.url} target="_blank" rel="noopener noreferrer">
                <GoogleLogo /> Read it on Google
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
