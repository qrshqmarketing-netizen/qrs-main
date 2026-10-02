import { redirect } from 'next/navigation';

// Rain Gutters is hidden for now: out of the menus, sitemap and AI files, and this address sends visitors to the
// residential hub. The page copy is kept in RAIN_GUTTERS (data/services/specialty.js); to bring the page back,
// restore the SinglePage render here and add GUTTERS back to SINGLE_PAGES (data/content.js) and PAGE_INDEX.
export default function RainGuttersPage() {
  redirect('/residential-roofing/');
}
