import { singleMetadata, SinglePage } from '@/components/templates/sectionPages';
import { MAINTENANCE_PLANS } from '@/data/content';

// Content: ROOF_MAINTENANCE_PLANS in data/services/programs.js
export const metadata = singleMetadata(MAINTENANCE_PLANS);

export default function RoofMaintenancePlansPage() {
  return <SinglePage single={MAINTENANCE_PLANS} />;
}
