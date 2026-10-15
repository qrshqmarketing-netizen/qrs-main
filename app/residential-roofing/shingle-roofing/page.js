import RoofColors from '@/components/roofColors/RoofColors';
import { hubMetadata, SectionHub } from '@/components/templates/sectionPages';
import { SHINGLE } from '@/data/content';
import { SHOW_ROOF_COLORS } from '@/data/roofColors';

// Hub page for this section. Content: the `hub` object in data/services/shingle.js
export const metadata = hubMetadata(SHINGLE);

export default function ShingleRoofingPage() {
  // The shingle colors (moved here from the home page, owner, October 15 2026)
  return <SectionHub section={SHINGLE} extra={SHOW_ROOF_COLORS && <RoofColors />} />;
}
