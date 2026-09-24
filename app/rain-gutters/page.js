import { singleMetadata, SinglePage } from '@/components/templates/sectionPages';
import { GUTTERS } from '@/data/content';

// Content: RAIN_GUTTERS in data/services/specialty.js
export const metadata = singleMetadata(GUTTERS);

export default function RainGuttersPage() {
  return <SinglePage single={GUTTERS} />;
}
