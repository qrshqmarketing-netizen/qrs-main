import Hero from '@/components/sections/Hero';
import HeroLatestPost from '@/components/sections/HeroLatestPost';
import IndexNote from '@/components/sections/IndexNote';
import BlogBrowser from '@/components/sections/BlogBrowser';
import { postDate } from '@/components/sections/PostCards';
import JsonLd from '@/components/ui/JsonLd';
import { BLOG_LINK, blogPath, HOME } from '@/data/catalog';
import { getBlogPosts, getLatestPost, getPublishedPosts } from '@/lib/postsStore';
import { BLOG_PAGE as page } from '@/data/pages/blog';
import { heroOutcome } from '@/data/heroOutcomes';
import { pageMetadata } from '@/lib/pages';
import { pageJsonLd } from '@/lib/structuredData';

// Kept out of search results until there's a published post
export async function generateMetadata() {
  const published = await getPublishedPosts();
  return pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: BLOG_LINK.href, noindex: published.length === 0 });
}

const CRUMBS = [HOME, BLOG_LINK];
// Blog index: the hero and every published article (lib/postsStore.js), newest first, and nothing else (the articles carry the
// estimate form and calls to action). The newest post with a picture also sits beside the hero heading; its card joins the list
// below when a filter is on (components/sections/BlogBrowser.jsx).
export default async function BlogPage() {
  const [posts, published, latest] = await Promise.all([getBlogPosts(), getPublishedPosts(), getLatestPost()]);
  const schema = pageJsonLd({
    path: BLOG_LINK.href,
    title: page.metaTitle,
    description: page.metaDescription,
    type: 'CollectionPage',
    crumbs: CRUMBS,
    parts: published.map((p) => ({ label: p.title, href: blogPath(p.slug) })),
  });
  const featured = latest?.image ? latest : null;
  const cards = posts.map((post, i) => ({
    slug: post.slug,
    href: blogPath(post.slug),
    title: post.title,
    excerpt: post.excerpt,
    datePublished: post.datePublished,
    dateLabel: postDate(post.datePublished),
    picture: post.image || post.cardImage || null,
    scene: i,
    topics: post.topics || [],
    featured: post.slug === featured?.slug,
  }));
  return (
    <main id="top">
      <JsonLd data={schema} />
      <Hero
        crumbs={CRUMBS}
        eyebrow="Roofing Blog"
        title={page.hero.heading}
        outcome={heroOutcome('/blog/')}
        intro={page.hero.intro}
        {...(featured && { aside: <HeroLatestPost post={featured} /> })}
      />
      <BlogBrowser posts={cards} heading={published.length ? 'Browse Articles' : 'Coming Soon'} />
      <IndexNote note={page.note} />
    </main>
  );
}
