import Image from 'next/image';
import Link from 'next/link';
import { blogPath } from '@/data/catalog';
import './HeroLatestPost.css';

// The newest article's thumbnail, linked to the article, for the blog index hero (Hero's `aside`).
// Thumbnails carry the article title in the picture, so it sits beside the hero heading instead of behind it.
export default function HeroLatestPost({ post }) {
  return (
    <aside className="hlp" aria-label="Latest article">
      <span className="hlp-label">Latest article</span>
      <Link className="hlp-card" href={blogPath(post.slug)} aria-label={`Read: ${post.title}`}>
        <Image src={post.image} alt={post.imageAlt || ''} width={1536} height={1024} sizes="(min-width: 901px) 520px, 100vw" preload />
      </Link>
    </aside>
  );
}
