import { singleMetadata, SinglePage } from '@/components/templates/sectionPages';
import { INSPECTION } from '@/data/content';

// Content: ROOF_INSPECTION in data/services/programs.js (one page for shingle, tile and flat roof inspections)
export const metadata = singleMetadata(INSPECTION);

export default function RoofInspectionPage() {
  return <SinglePage single={INSPECTION} />;
}
