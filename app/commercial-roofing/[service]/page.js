import { SectionService, serviceMetadata, serviceParams } from '@/components/templates/sectionPages';
import { COMMERCIAL } from '@/data/content';

// One page per entry in `services` in data/services/commercial.js (other addresses show the 404 page)
export const dynamicParams = false;
export const generateStaticParams = () => serviceParams(COMMERCIAL);

export async function generateMetadata({ params }) {
  return serviceMetadata(COMMERCIAL, (await params).service);
}

export default async function CommercialRoofingServicePage({ params }) {
  return <SectionService section={COMMERCIAL} slug={(await params).service} />;
}
