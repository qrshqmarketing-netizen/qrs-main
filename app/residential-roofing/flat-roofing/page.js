import { hubMetadata, SectionHub } from '@/components/templates/sectionPages';
import { FLAT } from '@/data/content';

// Hub page for this section. Content: the `hub` object in data/services/flat.js
export const metadata = hubMetadata(FLAT);

export default function FlatRoofingPage() {
  return <SectionHub section={FLAT} />;
}
