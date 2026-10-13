import { ServiceHub, serviceHubMetadata } from '@/components/templates/sectionPages';
import { REPAIR_ACTIONS } from '@/components/templates/shared';
import { REPAIR_HUB } from '@/data/content';
import RoofScene3D from '@/components/widgets/roof3d/RoofScene3D';

// Service-first hub: this service across every roof type. Copy: ROOF_REPAIR_HUB in data/services/serviceHubs.js;
// the cards it shows are listed in SERVICE_HUBS (data/catalog.js). The hero adds a red "Leaking now? Call" button; its background is a 3D
// shingle roof mid-job (three.js, repairScene.js) where hovering the roof lays the last courses, in place of the photo.
export const metadata = serviceHubMetadata(REPAIR_HUB);

export default function RoofRepairPage() {
  return <ServiceHub page={REPAIR_HUB} actions={REPAIR_ACTIONS} backdrop={<RoofScene3D scene="repair" />} />;
}
