import { singleMetadata, SinglePage } from '@/components/templates/sectionPages';
import { COOL } from '@/data/content';

// Content: COOL_ROOFING in data/services/specialty.js
export const metadata = singleMetadata(COOL);

export default function CoolRoofingPage() {
  return <SinglePage single={COOL} />;
}
