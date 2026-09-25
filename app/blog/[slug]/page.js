import BlogPost from '@/components/templates/BlogPost';
import { blogPath } from '@/data/catalog';
import { BLOG_POSTS } from '@/data/blog/posts';
import { pageMetadata } from '@/lib/pages';

// One page per post in data/blog/posts.js (other addresses show the 404 page)
export const dynamicParams = false;
export const generateStaticParams = () => BLOG_POSTS.map((p) => ({ slug: p.slug }));

const findPost = (slug) => BLOG_POSTS.find((p) => p.slug === slug);

export async function generateMetadata({ params }) {
  const post = findPost((await params).slug);
  return pageMetadata({ title: post.metaTitle, description: post.metaDescription, path: blogPath(post.slug) });
}

export default async function BlogPostPage({ params }) {
  return <BlogPost post={findPost((await params).slug)} />;
}
