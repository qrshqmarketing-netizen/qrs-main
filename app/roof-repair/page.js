import { ServiceHub, serviceHubMetadata } from '@/components/templates/sectionPages';
import { REPAIR_ACTIONS } from '@/components/templates/shared';
import { REPAIR_HUB } from '@/data/content';

// Service-first hub: this service across every roof type. Copy: ROOF_REPAIR_HUB in data/services/serviceHubs.js;
// the cards it shows are listed in SERVICE_HUBS (data/catalog.js). The hero adds a red "Leaking now? Call" button.
export const metadata = serviceHubMetadata(REPAIR_HUB);

export default function RoofRepairPage() {
  return <ServiceHub page={REPAIR_HUB} actions={REPAIR_ACTIONS} />;
}
