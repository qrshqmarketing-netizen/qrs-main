import PromoCard from '@/components/widgets/PromoCard';
import { SEASON_PROMO as promo, promoLandingHref } from '@/data/promo';

// The El Niño offer as a section: the same card as the popup (components/widgets/PromoCard.jsx), shown on the home page above the request card and the closing
// call to action. Its button opens the El Niño landing page tagged utm_medium=home-section (data/promo.js). Hidden when the promo is switched
// off (SEASON_PROMO.active).
export default function PromoSection() {
  if (!promo.active) return null;
  return (
    <section className="promo-band" aria-label={promo.eyebrow}>
      <div className="container">
        <PromoCard
          variant="inline"
          track="home-section"
          eyebrow={promo.eyebrow}
          heading={promo.heading}
          headingTag="h2"
          text={promo.text}
          cta={{ label: promo.cta.label, href: promoLandingHref('home-section') }}
          rain={promo.rain}
        />
      </div>
    </section>
  );
}
