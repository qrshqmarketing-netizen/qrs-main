// The filters on the blog index (components/sections/BlogBrowser.jsx). Each one matches a post by its `topics` in data/blog/posts.js,
// so a new post lands under the right filters by itself. A filter with no posts is not shown.
const any = (...wanted) => (topics) => wanted.some((topic) => topics.includes(topic));

// Who the article is for (owner, November 24 2026: every article is categorized Residential, Commercial or both). An article is
// Commercial when its topics include 'commercial' or 'tpo', and Residential when they don't. Articles written for both audiences are listed
// here by slug (kept in code, not in the article's topics, so the live copies in Supabase need no revision or sync): they show under both
// filters and are labelled "Residential & Commercial". Add a slug here when a new article is for both.
export const BOTH_AUDIENCES = new Set([
  'roofing-permits-los-angeles', // LADBS and city permits for homes and commercial reroofs
  'torch-down-roofing-app-vs-sbs', // torch-down on homes (the residential torch down page) and commercial roofs
  'cool-roof-southern-california', // cool roof rules for homes and nonresidential reroofs
  'how-to-choose-a-roofing-firm-near-me', // has a section for HOA and commercial properties
]);

const isCommercial = (topics = []) => topics.includes('commercial') || topics.includes('tpo');
// The audience keys of a post ({ slug, topics }): ['residential'], ['commercial'] or both
export const audiencesOf = (post) => {
  if (BOTH_AUDIENCES.has(post.slug)) return ['residential', 'commercial'];
  return isCommercial(post.topics) ? ['commercial'] : ['residential'];
};
const AUDIENCE_LABELS = { residential: 'Residential', commercial: 'Commercial' };
// The category shown on blog cards and above the article title: "Residential", "Commercial" or "Residential & Commercial"
export const categoryOf = (post) => {
  const keys = audiencesOf(post);
  return { keys, label: keys.map((k) => AUDIENCE_LABELS[k]).join(' & '), href: `/blog/${keys.length === 1 ? `?audience=${keys[0]}` : ''}` };
};

export const AUDIENCE_FILTERS = [
  { key: 'residential', label: 'Residential', matches: (post) => audiencesOf(post).includes('residential') },
  { key: 'commercial', label: 'Commercial', matches: (post) => audiencesOf(post).includes('commercial') },
];

// What it covers
export const TOPIC_FILTERS = [
  { key: 'leaks-repair', label: 'Leaks & Repair', matches: any('leak', 'repair') },
  { key: 'storm', label: 'Storm & Emergency', matches: any('storm', 'emergency') },
  { key: 'insurance', label: 'Insurance', matches: any('insurance') },
  { key: 'maintenance', label: 'Maintenance & Inspection', matches: any('maintenance', 'inspection') },
  { key: 'replacement', label: 'Replacement & Restoration', matches: any('replacement', 'restoration') },
  { key: 'tile', label: 'Tile', matches: any('tile', 'underlayment') },
  { key: 'flat', label: 'Flat Roofs', matches: any('flat') },
  { key: 'shingle', label: 'Shingle', matches: any('shingle') },
  { key: 'wood', label: 'Wood', matches: any('wood') },
  { key: 'metal', label: 'Metal', matches: any('metal') },
];
