import FinalCta from '@/components/sections/FinalCta';
import PageHero from '@/components/sections/PageHero';
import PostCards from '@/components/sections/PostCards';
import RoofCheck from '@/components/sections/RoofCheck';
import JsonLd from '@/components/ui/JsonLd';
import { BLOG_LINK, blogPath, HOME } from '@/data/catalog';
import { BLOG_POSTS } from '@/data/blog/posts';
import { BLOG_PAGE as page } from '@/data/pages/blog';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: BLOG_LINK.href });

const CRUMBS = [HOME, BLOG_LINK];
const schema = pageJsonLd({
  path: BLOG_LINK.href,
  title: page.metaTitle,
  description: page.metaDescription,
  type: 'CollectionPage',
  crumbs: CRUMBS,
  parts: BLOG_POSTS.map((p) => ({ label: p.title, href: blogPath(p.slug) })),
});

// Blog index: every post in data/blog/posts.js, newest first
export default function BlogPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="Roofing Blog"
        title={page.hero.heading}
        intro={page.hero.intro}
        card={{ kicker: 'Popular topics', scene: 'scene-inspect', highlights: ['Storm damage and leaks', 'Repair vs. replacement', 'Keeping a roof in good shape'] }}
      />
      <PostCards posts={BLOG_POSTS} heading="Latest Articles" />
      <RoofCheck tone="white" />
      <FinalCta />
    </main>
  );
}
