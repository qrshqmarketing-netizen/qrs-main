import { singleMetadata, SinglePage } from '@/components/templates/sectionPages';
import { VENTILATION } from '@/data/content';

// Content: ATTIC_VENTILATION in data/services/specialty.js
export const metadata = singleMetadata(VENTILATION);

export default function AtticVentilationPage() {
  return <SinglePage single={VENTILATION} />;
}
