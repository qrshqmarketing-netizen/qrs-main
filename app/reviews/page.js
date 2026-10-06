import Hero from '@/components/sections/Hero';
import IndexNote from '@/components/sections/IndexNote';
import ReviewDestinations from '@/components/sections/ReviewDestinations';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, REVIEWS_LINK } from '@/data/catalog';
import { REVIEWS_PAGE as page } from '@/data/pages/reviews';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: REVIEWS_LINK.href });

const CRUMBS = [HOME, REVIEWS_LINK];
const schema = pageJsonLd({ path: REVIEWS_LINK.href, title: page.metaTitle, description: page.metaDescription, crumbs: CRUMBS });

// A simple hub for leaving a review by location and platform.
export default function ReviewsPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero crumbs={CRUMBS} eyebrow="Reviews" title={page.hero.heading} outcome={heroOutcome('/reviews/')} intro={page.hero.intro} image={page.hero.image} imageAlt={page.hero.imageAlt} actions={[]} />
      <ReviewDestinations />
      <IndexNote note={page.note} />
    </main>
  );
}
