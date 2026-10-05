// /api/google-reviews/: live Google reviews for the testimonials slider (components/sections/ReviewSlider.jsx).
// One Places API request per call, never cached (Google doesn't allow storing reviews), so it's limited per visitor and
// the slider only asks once the section scrolls into view. ?office=<location or city slug> picks that location's reviews;
// otherwise a random location's, and the next one's when it has none.
// Any problem answers with an empty list, and the slider then shows the hand-picked reviews in data/reviews.js.
import { placeOrder, placeReviews } from '@/lib/placesReviews';
import { rateLimited } from '@/lib/leads';

export const dynamic = 'force-dynamic';

const MAX_REQUESTS = 2; // Google requests per call (each one is billed)

const answer = (body) => Response.json(body, { headers: { 'Cache-Control': 'no-store' } });

export async function GET(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  if (rateLimited(`reviews:${ip}`)) return answer({ place: '', reviews: [] });

  // Usually one Google request; a second only when the first location has no 5-star reviews yet
  try {
    for (const place of placeOrder(new URL(request.url).searchParams.get('office') || '').slice(0, MAX_REQUESTS)) {
      const found = await placeReviews(place);
      if (found.reviews.length) return answer(found);
    }
  } catch (err) {
    console.error('[reviews] Places API failed:', String(err?.message || err));
  }
  return answer({ place: '', reviews: [] });
}
