import Hero from '@/components/sections/Hero';
import IndexNote from '@/components/sections/IndexNote';
import AreaLinks from '@/components/home/AreaLinks';
import ReviewTrio from '@/components/home/ReviewTrio';
import '@/components/home/HomeClean.css';
import '@/components/home/CleanPages.css';
import { AREA_LINKS } from '@/data/nearYou';
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
    <main id="top" className="clean-page">
      <JsonLd data={schema} />
      <Hero crumbs={CRUMBS} eyebrow="Reviews" title={page.hero.heading} outcome={heroOutcome('/reviews/')} intro={page.hero.intro} image={page.hero.image} imageAlt={page.hero.imageAlt} actions={[]} />
      <ReviewDestinations />
      {/* Clean format like the other sub pages (owner, October 22 2026): three of the reviews themselves (live from Google when they load) under
          the leave-a-review links, then the request form and the area links */}
      <ReviewTrio path="/reviews/" heading="What people say after the __job__" />
      <IndexNote note={page.note} />
      <RoofCheck tone="white" />
      <AreaLinks {...AREA_LINKS} />
    </main>
  );
}
