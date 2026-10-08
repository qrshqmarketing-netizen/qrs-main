import { Star } from '@/components/ui/icons';
import { MIN_BADGE_RATING, REVIEW_SITES } from '@/data/reviewSites';
import './ReviewSites.css';

// A row under the Google reviews that links to the business's reviews on other sites (Yelp), with the star rating and the number of reviews. Only sites
// rated MIN_BADGE_RATING or higher are shown (data/reviewSites.js); with none, nothing is drawn.
export default function ReviewSites() {
  const sites = REVIEW_SITES.filter((s) => s.rating >= MIN_BADGE_RATING);
  if (!sites.length) return null;
  return (
    <ul className="rs-row" aria-label="Our reviews on other sites">
      {sites.map((s) => (
        <li key={s.name}>
          <a className="rs-badge" href={s.url} target="_blank" rel="noopener">
            <span className="rs-site">{s.name}</span>
            <span className="rs-stars" role="img" aria-label={`Rated ${s.rating.toFixed(1)} out of 5 stars on ${s.name}`}>
              <Star /><Star /><Star /><Star /><Star />
            </span>
            <span className="rs-text">
              <b>{s.rating.toFixed(1)}</b> from {s.count} reviews
            </span>
            <span className="rs-go">Read our {s.name} reviews →</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
