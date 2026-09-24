import { SectionService, serviceMetadata, serviceParams } from '@/components/templates/sectionPages';
import { TILE } from '@/data/content';

// One page per entry in `services` in data/services/tile.js (other addresses show the 404 page)
export const dynamicParams = false;
export const generateStaticParams = () => serviceParams(TILE);

export async function generateMetadata({ params }) {
  return serviceMetadata(TILE, (await params).service);
}

export default async function TileRoofingServicePage({ params }) {
  return <SectionService section={TILE} slug={(await params).service} />;
}
