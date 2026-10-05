import ReviewSlider from './ReviewSlider';

// The Google review slider on its own, as the first section after the hero (home page and sub pages) or after the stats bar
// (city pages). `office`: a location or city slug to show that office's reviews (data/places.js); omitted = any office.
export default function ReviewStrip({ office }) {
  return (
    <section className="section">
      <div className="container">
        <div className="tst-standalone">
          <ReviewSlider office={office} />
        </div>
      </div>
    </section>
  );
}
