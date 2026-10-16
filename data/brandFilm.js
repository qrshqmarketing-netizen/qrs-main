// The brand film on the home page, "QRS in a minute" (components/studio/StudioFilm.jsx; made in scripts/brand-film/). One place for its
// facts, so the section, the home page's VideoObject structured data (lib/structuredData.js) and the AI files (lib/pageIndex.js) agree.
// Re-render or re-encode it and update `uploadDate` (and `duration` if the length changes).
export const BRAND_FILM = {
  name: 'QRS in a minute',
  heading: 'From the first look to the last __nail__.',
  description:
    'A one-minute film about how QRS works: a roofer looks at your roof first, with drone footage and photos of the problem; everything, from the scope to the price, is in writing before any work starts; you say yes when you are ready; the site is kept clean with the landscaping tarped, permits pulled and nails swept every day; and the work is backed by our 10-year workmanship warranty (call for details). It ends with recent projects across Los Angeles and Orange County.',
  sources: [
    { src: '/videos/qrs-film.webm', type: 'video/webm' },
    { src: '/videos/qrs-film-h264.mp4', type: 'video/mp4' },
  ],
  contentUrl: '/videos/qrs-film-h264.mp4',
  poster: '/images/qrs-film-poster.webp',
  uploadDate: '2026-10-16',
  duration: 'PT1M2S',
  length: '1:02',
};
