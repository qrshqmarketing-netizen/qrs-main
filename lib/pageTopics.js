// What each part of the site is about, from a page's address. Shared by the articles shown on a page (lib/articles.js) and the order of the
// reviews on it (lib/reviewTopics.js), so a page's articles and reviews follow the same topics. Safe to import anywhere (no data, no server code).

// What each part of the site is about, most important first (the words match `topics` on the posts in data/blog/posts.js).
// The first pattern that matches a page address wins; endings like /repair/ add a topic.
const PAGE_TOPICS = [
  [/^\/el-nino/, ['storm', 'leak', 'inspection', 'emergency', 'maintenance']],
  [/^\/residential-roofing\/tile-roofing\/lift-and-relay/, ['tile', 'underlayment', 'restoration', 'repair', 'leak']],
  [/^\/residential-roofing\/tile-roofing/, ['tile', 'underlayment', 'leak']],
  [/^\/residential-roofing\/shingle-roofing/, ['shingle', 'leak', 'storm']],
  [/^\/residential-roofing\/flat-roofing/, ['flat', 'leak', 'restoration']],
  [/^\/residential-roofing\/metal-roofing/, ['metal', 'leak']],
  [/^\/residential-roofing\/attic-ventilation/, ['maintenance', 'shingle', 'inspection']],
  [/^\/residential-roofing\/hoa/, ['maintenance', 'insurance', 'replacement']],
  [/^\/residential-roofing\/?$/, ['replacement', 'repair', 'maintenance', 'tile', 'shingle']],
  [/^\/commercial-roofing\/tpo-roofing/, ['tpo', 'commercial', 'flat', 'replacement']],
  [/^\/commercial-roofing/, ['commercial', 'leak', 'maintenance', 'flat']],
  [/^\/roof-repair\/emergency/, ['emergency', 'storm', 'leak', 'insurance', 'repair']],
  [/^\/roof-repair/, ['repair', 'leak', 'emergency', 'storm']],
  [/^\/roof-replacement/, ['replacement', 'restoration', 'insurance']],
  [/^\/roof-inspection/, ['inspection', 'maintenance', 'leak', 'storm']],
  [/^\/roof-maintenance/, ['maintenance', 'inspection', 'storm']],
  [/^\/roof-financing/, ['replacement', 'restoration']],
  [/^\/service-areas/, ['storm', 'maintenance', 'repair', 'leak']],
];
const ENDING_TOPICS = [
  [/\/repair\/$/, ['repair', 'leak']],
  [/\/replacement\/$/, ['replacement', 'restoration']],
  [/\/installation\/$/, ['replacement']],
  [/\/maintenance\/$/, ['maintenance', 'inspection']],
];

export const topicsFor = (path) => {
  const base = PAGE_TOPICS.find(([pattern]) => pattern.test(path))?.[1] || [];
  const extra = ENDING_TOPICS.filter(([pattern]) => pattern.test(path)).flatMap(([, t]) => t);
  const commercial = path.startsWith('/commercial-roofing') ? ['commercial'] : []; // commercial pages show commercial articles first
  return [...new Set([...commercial, ...extra, ...base])];
};
