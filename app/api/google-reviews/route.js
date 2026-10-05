// /api/google-reviews/: live Google reviews for the testimonials slider (components/sections/ReviewSlider.jsx).
// One Places API request per call, never cached (Google doesn't allow storing reviews), so it's limited per visitor and
// the slider only asks once the section scrolls into view. ?office=<location or city slug> picks that location's reviews.
// Any problem answers with an empty list, and the slider then shows the hand-picked reviews in data/reviews.js.
import { choosePlace, placeReviews } from '@/lib/placesReviews';
import { rateLimited } from '@/lib/leads';

export const dynamic = 'force-dynamic';

const answer = (body) => Response.json(body, { headers: { 'Cache-Control': 'no-store' } });

export async function GET(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  if (rateLimited(`reviews:${ip}`)) return answer({ place: '', reviews: [] });

  const place = choosePlace(new URL(request.url).searchParams.get('office') || '');
  if (!place) return answer({ place: '', reviews: [] });
  try {
    return answer(await placeReviews(place));
  } catch (err) {
    console.error('[reviews] Places API failed:', String(err?.message || err));
    return answer({ place: '', reviews: [] });
  }
}
