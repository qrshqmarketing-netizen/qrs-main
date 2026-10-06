import ReviewSlider from './ReviewSlider';

// The Google review slider on its own, as the first section after the hero (home page and sub pages) or after the stats bar
// (city pages). `office`: a location or city slug to show that office's reviews (data/places.js); omitted = any office. `places`: a city's name
// and neighborhoods, so the reviews that mention them come first.
export default function ReviewStrip({ office, places }) {
  return (
    <section className="section">
      <div className="container">
        <div className="tst-standalone">
          <ReviewSlider office={office} places={places} />
        </div>
      </div>
    </section>
  );
}
