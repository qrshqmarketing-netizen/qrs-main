import { REVIEW_DESTINATIONS } from '@/data/pages/reviews';
import ReviewLink from './ReviewLink';
import './ReviewDestinations.css';

export default function ReviewDestinations() {
  return (
    <section className="review-destinations section tile-pattern" id="leave-a-review" aria-labelledby="review-destinations-title">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Choose your location</span>
          <h2 id="review-destinations-title">Where Was Your Project?</h2>
          <p>Select the office that helped with your roofing project, then choose Google or Yelp.</p>
        </div>
        <div className="review-destinations-grid">
          {REVIEW_DESTINATIONS.map(({ location, label, detail, links }) => (
            <article className="review-destination-card" key={location}>
              <h3>{label || location}</h3>
              <p>{detail ? `Leave a review for the team at this office, ${detail}.` : `Leave a review for our ${location} team.`}</p>
              <div className="review-destination-actions">
                {links.map(({ id, platform }) => (
                  <ReviewLink key={id} location={location} platform={platform} destination={id} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
