// The filters on the blog index (components/sections/BlogBrowser.jsx). Each one matches a post by its `topics` in data/blog/posts.js,
// so a new post lands under the right filters by itself. A filter with no posts is not shown.
const any = (...wanted) => (topics) => wanted.some((topic) => topics.includes(topic));

// Who the article is for
export const AUDIENCE_FILTERS = [
  { key: 'residential', label: 'Residential', matches: (topics) => !topics.includes('commercial') },
  { key: 'commercial', label: 'Commercial', matches: any('commercial', 'tpo') },
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
