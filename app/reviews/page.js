import { QhHero, QhReviewCompose, QhReviews } from '@/components/home/QrsSections';
import IndexNote from '@/components/sections/IndexNote';
import ReviewDestinations from '@/components/sections/ReviewDestinations';
import RoofCheck from '@/components/sections/RoofCheck';
import TrustLogos from '@/components/sections/TrustLogos';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, REVIEWS_LINK } from '@/data/catalog';
import { heroOutcome } from '@/data/heroOutcomes';
import { REVIEWS_PAGE as page } from '@/data/pages/reviews';
import { GOOGLE_REVIEWS } from '@/data/site';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: REVIEWS_LINK.href });

const CRUMBS = [HOME, REVIEWS_LINK];
const schema = pageJsonLd({ path: REVIEWS_LINK.href, title: page.metaTitle, description: page.metaDescription, crumbs: CRUMBS });

// The reviews page (content in data/pages/reviews.js), in the new home page's theme (owner, November 6 2026; components/home/QrsSections.jsx,
// QrsHome.css): the hero with the page's photo and a review being written over it (QhReviewCompose), then the Google, BBB and Yelp logos, the
// rotating reviews (QhReviews: hand-picked first, live Google reviews added in the browser), the office picker with Google and Yelp links (offices
// labelled by street and phone, no city names), how a review helps, and the request form.
export default function ReviewsPage() {
  return (
    <main id="top" className="qh">
      <JsonLd data={schema} />
      <QhHero
        crumbs={CRUMBS}
        title={page.hero.heading}
        outcome={heroOutcome('/reviews/')}
        text={page.hero.intro}
        checks={['Google or Yelp', 'Pick the office you worked with', `${GOOGLE_REVIEWS.count} Google reviews so far`]}
        actions={[
          { label: 'Leave a review', href: '#leave-a-review', style: 'gold' },
          { label: 'Read reviews', href: '#reviews', style: 'line' },
        ]}
        visual={<QhReviewCompose image={page.hero.image} alt={page.hero.imageAlt} caption="A few sentences about your roof help the next homeowner decide." />}
      />
      <TrustLogos />
      <QhReviews path={REVIEWS_LINK.href} />
      <ReviewDestinations />
      <IndexNote note={page.note} />
      <RoofCheck tone="white" />
    </main>
  );
}
