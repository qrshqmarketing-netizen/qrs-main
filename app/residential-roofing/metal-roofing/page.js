import { redirect } from 'next/navigation';

// Metal roofing is hidden for now (owner, November 2 2026): out of the menus, sitemap and AI files (SECTIONS in data/content.js), and this
// address sends visitors to the residential hub (also a temporary redirect in next.config.mjs, TEMPORARY_REDIRECTS). The copy stays in
// data/services/metal.js; to bring the pages back, restore the SectionHub render here (git history), put METAL back in SECTIONS,
// GROUPS.metal in RESIDENTIAL_TYPES and the menus, and remove the redirects.
export default function MetalRoofingPage() {
  redirect('/residential-roofing/');
}
