import { singleMetadata, SinglePage } from '@/components/templates/sectionPages';
import { FINANCING } from '@/data/content';
import { INSTANT_QUOTE_ENABLED } from '@/data/instantQuote';
import { PHONE, TEL } from '@/data/site';

// Content: ROOF_FINANCING in data/services/programs.js. The first button opens the Instant Quote (example payments); while
// the Instant Quote is switched off (INSTANT_QUOTE_ENABLED in data/instantQuote.js) it goes to the estimate form instead.
export const metadata = singleMetadata(FINANCING);

export default function RoofFinancingPage() {
  return (
    <SinglePage
      single={FINANCING}
      actions={[
        INSTANT_QUOTE_ENABLED ? { label: 'See Example Payments', drawer: true, style: 'gold' } : { label: 'Get Pro Advice', href: '#roof-check', style: 'gold' },
        { label: `Call ${PHONE}`, href: TEL, style: 'line' },
      ]}
    />
  );
}
