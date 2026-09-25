import { ServiceHub, serviceHubMetadata } from '@/components/templates/sectionPages';
import { REPLACEMENT_HUB } from '@/data/content';

// Service-first hub: this service across every roof type. Copy: ROOF_REPLACEMENT_HUB in data/services/serviceHubs.js;
// the cards it shows are listed in SERVICE_HUBS (data/catalog.js).
export const metadata = serviceHubMetadata(REPLACEMENT_HUB);

export default function RoofReplacementPage() {
  return <ServiceHub page={REPLACEMENT_HUB} />;
}
