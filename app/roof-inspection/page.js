import { ServiceHub, serviceHubMetadata } from '@/components/templates/sectionPages';
import { INSPECTION_HUB } from '@/data/content';

// Service-first hub: this service across every roof type. Copy: ROOF_INSPECTION_HUB in data/services/serviceHubs.js;
// the cards it shows are listed in SERVICE_HUBS (data/catalog.js).
export const metadata = serviceHubMetadata(INSPECTION_HUB);

export default function RoofInspectionPage() {
  return <ServiceHub page={INSPECTION_HUB} />;
}
