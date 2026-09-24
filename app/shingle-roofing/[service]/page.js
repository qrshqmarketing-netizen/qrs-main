import { SectionService, serviceMetadata, serviceParams } from '@/components/templates/sectionPages';
import { SHINGLE } from '@/data/content';

// One page per entry in `services` in data/services/shingle.js (other addresses show the 404 page)
export const dynamicParams = false;
export const generateStaticParams = () => serviceParams(SHINGLE);

export async function generateMetadata({ params }) {
  return serviceMetadata(SHINGLE, (await params).service);
}

export default async function ShingleRoofingServicePage({ params }) {
  return <SectionService section={SHINGLE} slug={(await params).service} />;
}
