import { notFound } from 'next/navigation';
import LandingPage from '@/components/landing/LandingPage';
import { LANDING_PAGES, pickVariant } from '@/data/pages/landing';
import { pageMetadata } from '@/lib/pages';

// /lp/residential/ and /lp/commercial/: the paid-ad landing pages (data/pages/landing.js, components/landing/LandingPage.jsx). The headline and the
// form's service follow the ad's utm tags (pickVariant), read on the server so the right headline is in the first paint. Out of search results,
// the sitemap and the AI files.
const NAMES = ['residential', 'commercial'];

export const dynamicParams = false;
export const generateStaticParams = () => NAMES.map((name) => ({ name }));

export async function generateMetadata({ params }) {
  const page = LANDING_PAGES[(await params).name];
  if (!page) return {};
  return pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path, noindex: true });
}

export default async function AdLandingPage({ params, searchParams }) {
  const { name } = await params;
  if (!NAMES.includes(name)) notFound();
  const page = LANDING_PAGES[name];
  return <LandingPage page={page} variant={pickVariant(page, await searchParams)} />;
}
