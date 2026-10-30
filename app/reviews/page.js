import { AbrHero } from '@/components/about/AboutRemote';
import IndexNote from '@/components/sections/IndexNote';
import ReviewDestinations from '@/components/sections/ReviewDestinations';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, REVIEWS_LINK } from '@/data/catalog';
import { REVIEWS_PAGE as page } from '@/data/pages/reviews';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';
import RoofCheck from '@/components/sections/RoofCheck';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: REVIEWS_LINK.href });

const CRUMBS = [HOME, REVIEWS_LINK];
const schema = pageJsonLd({ path: REVIEWS_LINK.href, title: page.metaTitle, description: page.metaDescription, crumbs: CRUMBS });

// A simple hub for leaving a review by location and platform.
export default function ReviewsPage() {
  return (
    <main id="top" className="abr">
      <JsonLd data={schema} />
      <AbrHero crumbs={CRUMBS} path="/reviews/" title={page.hero.heading} outcome={heroOutcome('/reviews/')} intro={page.hero.intro} media={{ image: page.hero.image, alt: page.hero.imageAlt }} actions={[]} />
      <div className="abr-keep">
        <ReviewDestinations />
        <IndexNote note={page.note} />
        <RoofCheck tone="white" />
      </div>
    </main>
  );
}
