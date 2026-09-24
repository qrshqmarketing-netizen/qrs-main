import { hubMetadata, SectionHub } from '@/components/templates/sectionPages';
import { METAL } from '@/data/content';

// Hub page for this section. Content: the `hub` object in data/services/metal.js
export const metadata = hubMetadata(METAL);

export default function MetalRoofingPage() {
  return <SectionHub section={METAL} />;
}
