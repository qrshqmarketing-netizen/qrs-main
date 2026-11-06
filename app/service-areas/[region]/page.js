import RegionPage from '@/components/templates/RegionPage';
import { findRegion, REGIONS, regionPath } from '@/data/locations';
import { REGION_PAGES } from '@/data/regionPages';
import { brandedTitle, pageMetadata } from '@/lib/pages';

// One page per region in data/locations.js (e.g. /service-areas/la-county/), with copy from data/regionPages.js
export const dynamicParams = false;
export const generateStaticParams = () => REGIONS.map((r) => ({ region: r.slug }));

export async function generateMetadata({ params }) {
  const { region } = await params;
  const page = REGION_PAGES[region];
  return pageMetadata({ title: brandedTitle(page.metaTitle), description: page.metaDescription, path: regionPath(region) });
}

export default async function RegionRoute({ params }) {
  const { region } = await params;
  return <RegionPage region={findRegion(region)} page={REGION_PAGES[region]} />;
}
