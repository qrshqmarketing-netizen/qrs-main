import { ServiceHub, serviceHubMetadata } from '@/components/templates/sectionPages';
import { TUNE_UP_HUB } from '@/data/content';

export const metadata = serviceHubMetadata(TUNE_UP_HUB);

export default function RoofTuneUpsPage() {
  return <ServiceHub page={TUNE_UP_HUB} />;
}
