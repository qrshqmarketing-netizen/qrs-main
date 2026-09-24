import { SectionService, serviceMetadata, serviceParams } from '@/components/templates/sectionPages';
import { FLAT } from '@/data/content';

// One page per entry in `services` in data/services/flat.js (other addresses show the 404 page)
export const dynamicParams = false;
export const generateStaticParams = () => serviceParams(FLAT);

export async function generateMetadata({ params }) {
  return serviceMetadata(FLAT, (await params).service);
}

export default async function FlatRoofingServicePage({ params }) {
  return <SectionService section={FLAT} slug={(await params).service} />;
}
