import { singleMetadata, SinglePage } from '@/components/templates/sectionPages';
import { FINANCING } from '@/data/content';
import { PHONE, TEL } from '@/data/site';

// Content: ROOF_FINANCING in data/services/programs.js. The first button opens the Instant Quote (example payments).
export const metadata = singleMetadata(FINANCING);

export default function FinancingPage() {
  return (
    <SinglePage
      single={FINANCING}
      actions={[
        { label: 'See Example Payments', drawer: true, style: 'gold' },
        { label: `Call ${PHONE}`, href: TEL, style: 'line' },
      ]}
    />
  );
}
