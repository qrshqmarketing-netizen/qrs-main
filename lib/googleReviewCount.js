// The weekly Google review count (owner, November 2 2026): the total of the three office listings' review counts (GOOGLE_PLACES in
// data/places.js), read from the Places API, written into GOOGLE_REVIEWS in data/site.js with a commit through the GitHub API, which makes
// Vercel deploy the site with the new number everywhere it shows (proof strip, logo row, stats, landing pages, copy). The site itself never
// stores Google's data: the number lives in the code, as it did when it was typed in by hand.
// Run on Mondays by the daily cron (app/api/posts/scheduled/route.js) and on demand by POST /api/google-reviews/count/ (x-leads-diagnostic).
// Needs GOOGLE_PLACES_KEY (already set for the live reviews) and GITHUB_TOKEN (a fine-grained token with Contents: read and write on the
// repository). The repository is VERCEL_GIT_REPO_OWNER/VERCEL_GIT_REPO_SLUG (Vercel's system variables), else GITHUB_REPO, else the default.
import { GOOGLE_PLACES } from '@/data/places';

const PLACES = 'https://places.googleapis.com/v1/places/';
const DEFAULT_REPO = 'qrshqmarketing-netizen/qrs-main';
const FILE = 'data/site.js';
const LINE = /export const GOOGLE_REVIEWS = \{ count: (\d+), asOf: '(\d{4}-\d{2}-\d{2})' \};/;

const pacificDay = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Los_Angeles' });

// Each listing's review count and the total; a listing that can't be read makes the whole count fail (never publish a partial total)
export async function liveReviewTotal() {
  const key = (process.env.GOOGLE_PLACES_KEY || '').trim();
  if (!key) throw new Error('GOOGLE_PLACES_KEY is not set');
  const places = await Promise.all(
    GOOGLE_PLACES.map(async (p) => {
      const res = await fetch(`${PLACES}${encodeURIComponent(p.placeId)}`, {
        headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'userRatingCount' },
        cache: 'no-store',
      });
      if (!res.ok) throw new Error(`${p.name}: Places API ${res.status}`);
      const data = await res.json();
      if (!Number.isInteger(data?.userRatingCount)) throw new Error(`${p.name}: no review count`);
      return { name: p.name, count: data.userRatingCount };
    }),
  );
  return { places, total: places.reduce((sum, p) => sum + p.count, 0) };
}

const repoName = () =>
  process.env.VERCEL_GIT_REPO_OWNER && process.env.VERCEL_GIT_REPO_SLUG
    ? `${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`
    : (process.env.GITHUB_REPO || DEFAULT_REPO).trim();

// Reads the live total and, when it differs from the number in data/site.js on main, commits the new number. `dryRun` only reports.
export async function updateReviewCount({ dryRun = false } = {}) {
  const live = await liveReviewTotal();
  const token = (process.env.GITHUB_TOKEN || '').trim();
  const repo = repoName();
  if (!token) return { ...live, updated: false, reason: 'GITHUB_TOKEN is not set, so the number could not be written' };
  const api = `https://api.github.com/repos/${repo}/contents/${FILE}`;
  const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'qrs-review-count' };
  const current = await fetch(`${api}?ref=main`, { headers, cache: 'no-store' });
  if (!current.ok) throw new Error(`GitHub read ${current.status}`);
  const { content, sha } = await current.json();
  const text = Buffer.from(content, 'base64').toString('utf8');
  const m = text.match(LINE);
  if (!m) throw new Error('GOOGLE_REVIEWS line not found in data/site.js');
  const before = Number(m[1]);
  if (before === live.total) return { ...live, before, updated: false, reason: 'unchanged' };
  if (live.total < before * 0.8) return { ...live, before, updated: false, reason: 'the total dropped by more than 20%: left as it is, check the listings' };
  if (dryRun) return { ...live, before, updated: false, reason: 'dry run' };
  const next = text.replace(LINE, `export const GOOGLE_REVIEWS = { count: ${live.total}, asOf: '${pacificDay()}' };`);
  const put = await fetch(api, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: `Google review count ${before} → ${live.total} (${live.places.map((p) => `${p.name} ${p.count}`).join(', ')})`,
      content: Buffer.from(next, 'utf8').toString('base64'),
      sha,
      branch: 'main',
    }),
  });
  if (!put.ok) throw new Error(`GitHub write ${put.status}`);
  return { ...live, before, updated: true };
}
