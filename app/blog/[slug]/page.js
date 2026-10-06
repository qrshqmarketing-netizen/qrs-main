import { notFound } from 'next/navigation';
import BlogPost from '@/components/templates/BlogPost';
import { blogPath } from '@/data/catalog';
import { getBlogPosts, getPost } from '@/lib/postsStore';
import { pageMetadata } from '@/lib/pages';

// One page per published article (lib/postsStore.js: Supabase, with data/blog/posts.js as the fallback). An article added in the dashboard
// after the site was built gets its page the first time someone visits it; other addresses show the 404 page.
export const dynamicParams = true;
export const generateStaticParams = async () => (await getBlogPosts()).map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }) {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: blogPath(post.slug),
    noindex: post.noindex,
    ...(post.image && { image: { url: post.image, width: 1536, height: 1024, alt: post.imageAlt } }),
    article: { publishedTime: post.datePublished, modifiedTime: post.dateModified, author: post.author },
  });
}

export default async function BlogPostPage({ params }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  return <BlogPost post={post} />;
}
