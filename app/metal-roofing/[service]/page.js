import { SectionService, serviceMetadata, serviceParams } from '@/components/templates/sectionPages';
import { METAL } from '@/data/content';

// One page per entry in `services` in data/services/metal.js (other addresses show the 404 page)
export const dynamicParams = false;
export const generateStaticParams = () => serviceParams(METAL);

export async function generateMetadata({ params }) {
  return serviceMetadata(METAL, (await params).service);
}

export default async function MetalRoofingServicePage({ params }) {
  return <SectionService section={METAL} slug={(await params).service} />;
}
