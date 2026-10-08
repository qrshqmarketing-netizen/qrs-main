import { GoogleLogo, Star } from '@/components/ui/icons';
import { GOOGLE_REVIEWS } from '@/data/reviews';
import './ReviewGrid.css';

// Every Google review (data/reviews.js) as a card, with a link to the review on Google
export default function ReviewGrid({ heading = 'What Homeowners Say', reviews = GOOGLE_REVIEWS }) {
  return (
    <section className="review-grid tile-pattern" id="reviews">
      <div className="container">
        <div className="section-head">
          <h2>{heading}</h2>
        </div>
        <div className="rg-grid">
          {reviews.map((review) => (
            <figure className="rg-card" key={review.name}>
              <div className="rg-stars" role="img" aria-label="Rated 5 out of 5 stars on Google">
                <Star /><Star /><Star /><Star /><Star />
              </div>
              <blockquote>
                {review.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </blockquote>
              <figcaption>
                <span className="rg-avatar" style={{ background: review.color }} aria-hidden="true">{review.name[0]}</span>
                <span className="rg-who">
                  <a href={review.url} target="_blank" rel="noopener">{review.name}</a>
                  <span>
                    {review.date} &middot; <GoogleLogo className="rg-g" /> Google
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
