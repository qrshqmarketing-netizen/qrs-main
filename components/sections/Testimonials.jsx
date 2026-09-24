import { GoogleLogo, QrsMark } from '@/components/ui/icons';
import ProcessVideo from './ProcessVideo';
import ReviewSlider from './ReviewSlider';
import './Testimonials.css';

// Process video + Google reviews
export default function Testimonials() {
  return (
    <section className="testimonials" id="reviews">
      <div className="container">
        <div className="vid-grid">
          <div className="vid-copy">
            <div className="vid-mark" aria-hidden="true">
              <svg viewBox="0 0 64 64">
                <QrsMark fill="currentColor" stroke="#fff" />
              </svg>
            </div>
            <h2>Take the Guesswork Out of Roof Repairs</h2>
            <p>
              See the QRS process from start to finish &mdash; from the first roof check to the final walkthrough. With
              us, there's no pressure and no mystery scope, just a clear written price and a commitment to detail-first
              workmanship. We're a local roofing team built to be straightforward and reliable for homeowners across Los
              Angeles and Orange County.
            </p>
          </div>
          <ProcessVideo />
        </div>

        <div className="tst-grid">
          <div className="tst-intro">
            <h2>Don&rsquo;t Take Our Word For It</h2>
            <p>See what homeowners across Los Angeles and Orange County have to say about their experience with QRS.</p>
            <div className="g-badge">
              <GoogleLogo className="g-logo" />
              <div>
                <b>Google Reviews</b>
                <span>5-star reviews from real QRS customers</span>
              </div>
            </div>
          </div>
          <ReviewSlider />
        </div>
      </div>
    </section>
  );
}
