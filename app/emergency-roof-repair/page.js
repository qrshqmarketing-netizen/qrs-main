import { singleMetadata, SinglePage } from '@/components/templates/sectionPages';
import { EMERGENCY_ACTIONS, EMERGENCY_CTA } from '@/components/templates/shared';
import { EMERGENCY } from '@/data/content';

// Content: EMERGENCY_ROOF_REPAIR in data/services/programs.js. Calling comes first here: red call buttons in the
// hero and the closing call to action.
export const metadata = singleMetadata(EMERGENCY);

export default function EmergencyRoofRepairPage() {
  return <SinglePage single={EMERGENCY} actions={EMERGENCY_ACTIONS} finalCta={EMERGENCY_CTA} />;
}
