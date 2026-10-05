// Google reviews for the testimonials slider, from the Places API (New). Server side only: GOOGLE_PLACES_KEY is a private
// key. Google doesn't allow storing reviews, so nothing here is cached; callers fetch once per visit that needs them.
import { GOOGLE_PLACES, MAX_LIVE_REVIEWS, MIN_REVIEW_STARS } from '@/data/places';

// Place Details (New): https://developers.google.com/maps/documentation/places/web-service/place-details
const ENDPOINT = 'https://places.googleapis.com/v1/places/';
const FIELDS = 'reviews,googleMapsUri';

const clip = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const link = (v) => (typeof v === 'string' && /^https:\/\//.test(v) ? v.slice(0, 600) : '');

// Turns a Place Details response into the reviews the slider shows: written reviews of at least MIN_REVIEW_STARS stars,
// in the order Google returned them (its "most relevant" order), with everything Google asks us to credit.
export function pickReviews(payload) {
  const list = Array.isArray(payload?.reviews) ? payload.reviews : [];
  return list
    .filter((r) => Number(r?.rating) >= MIN_REVIEW_STARS && clip(r?.text?.text, 2000))
    .slice(0, MAX_LIVE_REVIEWS)
    .map((r) => ({
      name: clip(r.authorAttribution?.displayName, 80) || 'Google user',
      profileUrl: link(r.authorAttribution?.uri),
      photoUrl: link(r.authorAttribution?.photoUri),
      date: clip(r.relativePublishTimeDescription, 40),
      text: clip(r.text.text, 2000),
      reviewUrl: link(r.googleMapsUri),
      reportUrl: link(r.flagContentUri),
    }));
}

// One location's live reviews: { place, reviews }. Returns an empty list when Google has nothing or isn't set up.
export async function placeReviews(place) {
  const key = (process.env.GOOGLE_PLACES_KEY || '').trim();
  if (!key || !place?.placeId) return { place: place?.name || '', reviews: [] };
  const res = await fetch(`${ENDPOINT}${encodeURIComponent(place.placeId)}?languageCode=en`, {
    headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': FIELDS },
    cache: 'no-store',
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`Places ${res.status}`);
  return { place: place.name, reviews: pickReviews(await res.json()) };
}

// The location to ask about: the one for `slug` (a location slug or its city page's slug) when it's set up, otherwise a
// random one that is, so the slider shows each location's reviews over time. null when none is set up.
export function choosePlace(slug) {
  const ready = GOOGLE_PLACES.filter((p) => p.placeId);
  if (!ready.length) return null;
  return ready.find((p) => p.slug === slug || p.citySlug === slug) || ready[Math.floor(Math.random() * ready.length)];
}
