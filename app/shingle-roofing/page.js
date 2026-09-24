import { hubMetadata, SectionHub } from '@/components/templates/sectionPages';
import { SHINGLE } from '@/data/content';

// Hub page for this section. Content: the `hub` object in data/services/shingle.js
export const metadata = hubMetadata(SHINGLE);

export default function ShingleRoofingPage() {
  return <SectionHub section={SHINGLE} />;
}
