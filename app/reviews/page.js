import FinalCta from '@/components/sections/FinalCta';
import Guarantee from '@/components/sections/Guarantee';
import PageHero from '@/components/sections/PageHero';
import ReviewGrid from '@/components/sections/ReviewGrid';
import RoofCheck from '@/components/sections/RoofCheck';
import WhyQrs from '@/components/sections/WhyQrs';
import JsonLd from '@/components/ui/JsonLd';
import { HOME, REVIEWS_LINK } from '@/data/catalog';
import { REVIEWS_PAGE as page } from '@/data/pages/reviews';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: REVIEWS_LINK.href });

const CRUMBS = [HOME, REVIEWS_LINK];
const schema = pageJsonLd({ path: REVIEWS_LINK.href, title: page.metaTitle, description: page.metaDescription, crumbs: CRUMBS });

// Reviews page: every Google review (data/reviews.js), accreditations and the guarantee
export default function ReviewsPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="Reviews"
        title={page.hero.heading}
        intro={page.hero.intro}
        card={{ kicker: 'What customers mention', scene: 'scene-shingle', highlights: ['Clear, plain-English explanations', 'Crews that show up on time', 'Spotless clean-up after the job'] }}
      />
      <ReviewGrid />
      <WhyQrs heading="Why Homeowners Choose QRS" />
      <Guarantee />
      <RoofCheck />
      <FinalCta />
    </main>
  );
}
