import Hero from '@/components/sections/Hero';
import IndexNote from '@/components/sections/IndexNote';
import PostCards from '@/components/sections/PostCards';
import JsonLd from '@/components/ui/JsonLd';
import { BLOG_LINK, blogPath, HOME } from '@/data/catalog';
import { BLOG_POSTS, LATEST_POST, PUBLISHED_POSTS } from '@/data/blog/posts';
import { BLOG_PAGE as page } from '@/data/pages/blog';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

// Kept out of search results until there's a published post (data/blog/posts.js)
export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: BLOG_LINK.href, noindex: PUBLISHED_POSTS.length === 0 });

const CRUMBS = [HOME, BLOG_LINK];
const schema = pageJsonLd({
  path: BLOG_LINK.href,
  title: page.metaTitle,
  description: page.metaDescription,
  type: 'CollectionPage',
  crumbs: CRUMBS,
  parts: PUBLISHED_POSTS.map((p) => ({ label: p.title, href: blogPath(p.slug) })),
});

// Blog index: the hero and every post in data/blog/posts.js, newest first, and nothing else (the posts carry the
// estimate form and calls to action). The newest post's thumbnail is the hero background.
export default function BlogPage() {
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        crumbs={CRUMBS}
        eyebrow="Roofing Blog"
        title={page.hero.heading}
        intro={page.hero.intro}
        {...(LATEST_POST?.image && { image: LATEST_POST.heroImage || LATEST_POST.image, imageAlt: LATEST_POST.imageAlt, imagePosition: 'center 30%' })}
      />
      <PostCards posts={BLOG_POSTS} heading={PUBLISHED_POSTS.length ? 'Latest Articles' : 'Coming Soon'} />
      <IndexNote note={page.note} />
    </main>
  );
}
