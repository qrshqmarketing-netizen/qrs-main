import { ServiceHub, serviceHubMetadata } from '@/components/templates/sectionPages';
import { REPLACEMENT_HUB } from '@/data/content';
import RoofScene3D from '@/components/widgets/roof3d/RoofScene3D';

// Service-first hub: this service across every roof type. Copy: ROOF_REPLACEMENT_HUB in data/services/serviceHubs.js;
// the cards it shows are listed in SERVICE_HUBS (data/catalog.js). The hero's background is a 3D courtyard home with a new shingle roof
// (three.js, replacementScene.js) where hovering the roof sweeps the old shingles into the new ones, in place of the photo.
export const metadata = serviceHubMetadata(REPLACEMENT_HUB);

export default function RoofReplacementPage() {
  return <ServiceHub page={REPLACEMENT_HUB} backdrop={<RoofScene3D scene="replacement" />} />;
}
