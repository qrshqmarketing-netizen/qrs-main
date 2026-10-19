import LandingPage from '@/components/landing/LandingPage';
import { LANDING_PAGES, pickVariant } from '@/data/pages/landing';
import { pageMetadata } from '@/lib/pages';

// /el-nino-roof-check/: the El Niño landing page, where the El Niño pop-up, the home page's El Niño pieces and El Niño ads lead. Since October 19
// 2026 it uses the paid-ad landing template (components/landing/LandingPage.jsx, copy in data/pages/landing.js under 'el-nino'): the storm photo,
// the message-matched headline and the request form in the hero, then proof, steps, reviews, recent work, FAQs and a closing call. The visit's
// utm tags travel with the lead (LandingTracker). A campaign page, so it stays out of search results, the sitemap and the AI files.
const page = LANDING_PAGES['el-nino'];

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path, noindex: true });

export default async function ElNinoPage({ searchParams }) {
  return <LandingPage page={page} variant={pickVariant(page, await searchParams)} />;
}
