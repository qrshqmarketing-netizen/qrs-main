import { REVIEW_DESTINATIONS } from '@/data/pages/reviews';
import ReviewLink from './ReviewLink';
import ReviewSites from './ReviewSites';
import './ReviewDestinations.css';

export default function ReviewDestinations() {
  return (
    <section className="review-destinations section tile-pattern" aria-labelledby="review-destinations-title">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Choose your location</span>
          <h2 id="review-destinations-title">Where Was Your Project?</h2>
          <p>Select the office that helped with your roofing project, then choose Google or Yelp.</p>
        </div>
        <div className="review-destinations-grid">
          {REVIEW_DESTINATIONS.map(({ location, links }) => (
            <article className="review-destination-card" key={location}>
              <h3>{location}</h3>
              <p>Leave a review for our {location} team.</p>
              <div className="review-destination-actions">
                {links.map(({ id, platform }) => (
                  <ReviewLink key={id} location={location} platform={platform} destination={id} />
                ))}
              </div>
            </article>
          ))}
        </div>
        <ReviewSites />
      </div>
    </section>
  );
}
