import { singleMetadata, SinglePage } from '@/components/templates/sectionPages';
import { HOA } from '@/data/content';

// Content: HOA_MULTI_FAMILY in data/services/specialty.js
export const metadata = singleMetadata(HOA);

export default function HoaMultiFamilyPage() {
  return <SinglePage single={HOA} />;
}
