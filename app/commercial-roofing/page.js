import { hubMetadata, SectionHub } from '@/components/templates/sectionPages';
import { COMMERCIAL } from '@/data/content';

// Hub page for this section. Content: the `hub` object in data/services/commercial.js
export const metadata = hubMetadata(COMMERCIAL);

export default function CommercialRoofingPage() {
  return <SectionHub section={COMMERCIAL} />;
}
