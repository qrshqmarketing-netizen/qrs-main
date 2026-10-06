// Which reviews lead on which page. The review slider and the bottom-left review pop-up show every review, but put the ones closest to the
// page's topic first (a tile roofing page starts with the tile reviews, a repair page with the leak and repair ones, a city page with the
// reviews that name that city or its neighborhoods). A page with no matching review keeps the usual order. Safe to import anywhere.
import { topicsFor } from '@/lib/pageTopics';

// What a review is about, found from its words. The names are the same topics the pages use (lib/pageTopics.js). A review can list its own
// `topics` in data/reviews.js instead (for a review the words don't describe well).
const WORDS = [
  ['tile', /\btiles?\b|\bclay\b|\bmission\b|\bbarrel\b/i],
  ['shingle', /shingles?/i],
  ['flat', /flat[ -]roof|\bflat\b|torch[ -]?down|bitumen|membrane|parapet|scupper|low[ -]slope/i],
  ['tpo', /\btpo\b/i],
  ['metal', /\bmetal\b|standing[ -]seam/i],
  ['leak', /leak|drip|water (?:damage|stain|came|coming|got|intrusion)|ceiling|moisture|flashing|chimney|attic/i],
  ['repair', /repair|\bfix(?:ed|es|ing)?\b|patch/i],
  ['replacement', /replac|re-?roof|new roof|tear[ -]?off|full roof/i],
  ['restoration', /restor/i],
  ['underlayment', /underlayment|\bfelt\b|decking/i],
  ['inspection', /inspect|evaluat|drone|estimate/i],
  ['maintenance', /maintenance|maintain|tune[ -]?up|annual/i],
  ['storm', /storm|\brain(?:y|ed|s)?\b|\bwind/i],
  ['emergency', /emergency|urgent|same[ -]day|asap|tarp/i],
  ['insurance', /insurance|claim|adjuster/i],
  ['commercial', /commercial|property manager|tenant|warehouse|office building|retail|church|apartment|multi-?family|\bHOA\b|business/i],
];

export const reviewTopics = (review) => {
  if (review.topics?.length) return review.topics;
  const text = review.text || '';
  return WORDS.filter(([, pattern]) => pattern.test(text)).map(([topic]) => topic);
};

const escape = (word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// The reviews for a page, in the order to show them: closest to the page's topic first, then the rest in their usual order.
// path: the page's address; places: words that tie a review to a place (a city page passes its city and neighborhoods).
// A topic scores more the earlier it comes in the page's list; naming a place scores most; a tie keeps the usual order.
export function sortReviewsFor(reviews, path = '', places = []) {
  const topics = topicsFor(path);
  const placePattern = places.length ? new RegExp(`\\b(?:${places.map(escape).join('|')})\\b`, 'i') : null;
  const scored = reviews.map((review, order) => {
    let score = placePattern?.test(review.text || '') ? 20 : 0;
    reviewTopics(review).forEach((topic) => {
      const at = topics.indexOf(topic);
      if (at > -1) score += topics.length - at;
    });
    return { review, score, order };
  });
  // A commercial page leads with a review only when one is about commercial work (the fallback topics there, like leaks, are mostly home reviews)
  if (topics.includes('commercial') && !reviews.some((r) => reviewTopics(r).includes('commercial'))) return reviews;
  if (scored.every((x) => x.score === 0)) return reviews;
  return scored.sort((a, b) => b.score - a.score || a.order - b.order).map((x) => x.review);
}
