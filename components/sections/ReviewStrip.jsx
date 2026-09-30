import ReviewSlider from './ReviewSlider';

// The Google review slider on its own, as the first section after the hero (home page and sub pages)
export default function ReviewStrip() {
  return (
    <section className="section">
      <div className="container">
        <div className="tst-standalone">
          <ReviewSlider />
        </div>
      </div>
    </section>
  );
}
