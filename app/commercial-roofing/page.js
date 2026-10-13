import { hubMetadata, SectionHub } from '@/components/templates/sectionPages';
import RoofScene3D from '@/components/widgets/roof3d/RoofScene3D';
import { COMMERCIAL } from '@/data/content';

// Hub page for this section. Content: the `hub` object in data/services/commercial.js. The hero's background is a 3D flat-roof commercial
// building (three.js, commercialScene.js) that reacts to the mouse, in place of the photo.
export const metadata = hubMetadata(COMMERCIAL);

export default function CommercialRoofingPage() {
  return <SectionHub section={COMMERCIAL} backdrop={<RoofScene3D scene="commercial" />} />;
}
