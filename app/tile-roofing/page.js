import { hubMetadata, SectionHub } from '@/components/templates/sectionPages';
import { TILE } from '@/data/content';

// Hub page for this section. Content: the `hub` object in data/services/tile.js
export const metadata = hubMetadata(TILE);

export default function TileRoofingPage() {
  return <SectionHub section={TILE} />;
}
