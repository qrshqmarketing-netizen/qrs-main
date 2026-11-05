// The home page's roofing systems list (StudioServices) and hero video, shared by the English home page (app/page.js) and the Spanish one
// (app/es/page.js, which translates the titles and lines through data/i18n/es.js).
export const HOME_PRODUCTS = [
  { title: '*TotalShield* Shingle Systems', text: 'Complete shingle replacements and new installations, built from the deck up.', href: '/residential-roofing/shingle-roofing/replacement/', scene: 'scene-shingle', image: '/images/shingle-roof-completed-drone-view.webp' },
  { title: '*FlatGuard* Flat Roofing', text: 'Flat roof systems planned around drainage, seams and lasting protection.', href: '/residential-roofing/flat-roofing/replacement/', scene: 'scene-flat', image: '/images/flat-roof-torch-down-drone-view-services.webp' },
  { title: '*LeakRescue* Roof Repairs', text: 'Leaks traced to the source and repaired with clear photos and a written scope.', href: '/roof-repair/', scene: 'scene-repair', image: '/images/shingle-roof-repair-ridge-finish.webp' },
  { title: '*RoofScan 360* Inspections', text: 'A roofer-led inspection with photos, plain-English findings and a clear next step.', href: '/roof-inspection/', scene: 'scene-inspect', image: '/images/roofscan-360-roofer-tablet-chimney-flashing-v2.webp' },
  { title: '*SecondLife* Tile Reset', text: 'Keep sound roof tiles while replacing the worn underlayment below.', href: '/residential-roofing/tile-roofing/lift-and-relay/', scene: 'scene-tile', image: '/images/tile-lift-off-and-reset-drone-view.webp' },
  { title: '*RoofRevive* Roof Tune-Ups', text: 'One focused visit to fix a short list of small issues before they turn into leaks, with photos.', href: '/roof-maintenance-plans/#tune-up', scene: 'scene-repair', image: '/images/how-we-work-roofer-tablet-report.webp' },
  { title: '*RoofCare Plan*', text: 'Scheduled roof care with seasonal visits and a photo report each time.', href: '/roof-maintenance-plans/', scene: 'scene-inspect', image: '/images/shingle-roof-inspection-overhead.webp' },
  { title: '*ReserveReady* HOA Roofing', text: 'Roof inspections, clear scopes and planning support for community boards.', href: '/residential-roofing/hoa-multi-family/', scene: 'scene-hoa', image: '/images/shingle-roof-care-multi-family.webp' },
];

// The home hero's background video: an edit of the owner's drone footage (five QRS jobs), WebM first, H.264 MP4 for Safari; its first frame is
// the first paint and the fallback (PromoCard `video` and `photo`, HeroVideo.jsx).
export const HOME_HERO_VIDEO = [
  { src: '/videos/home-hero-drone.webm', type: 'video/webm' },
  { src: '/videos/home-hero-drone-h264.mp4', type: 'video/mp4' },
];
export const HOME_HERO_POSTER = '/images/home-hero-drone-poster.webp';
