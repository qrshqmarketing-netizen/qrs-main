// Live Google reviews for the browser (the testimonials slider and the bottom-left review pop-up share this). One request to
// /api/google-reviews/ per page load and office, kept only in memory so the slider and the pop-up show the same reviews in the
// same order; nothing is stored (Google's rules don't allow storing reviews). Resolves to { place, reviews } or null when
// there are none, so callers fall back to the hand-picked reviews in data/reviews.js.

const asked = new Map(); // office slug ('' = any) -> Promise

export function getLiveReviews(office = '') {
  if (!asked.has(office)) {
    asked.set(
      office,
      fetch('/api/google-reviews/' + (office ? `?office=${encodeURIComponent(office)}` : ''))
        .then((res) => res.json())
        .then((data) => (data?.reviews?.length ? data : null))
        .catch(() => null)
    );
  }
  return asked.get(office);
}
