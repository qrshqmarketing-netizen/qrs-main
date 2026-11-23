import Image from 'next/image';
import Link from 'next/link';
import { blogPath } from '@/data/catalog';
import { titleOverPicture } from '@/data/blog/thumbnails';
import './HeroLatestPost.css';

// The newest article's thumbnail, linked to the article, for the blog index hero (Hero's `aside`).
// A thumbnail with the title in the picture shows as it is; a plain photo gets the title written over it (data/blog/thumbnails.js).
export default function HeroLatestPost({ post }) {
  return (
    <aside className="hlp" aria-label="Latest article">
      <span className="hlp-label">Latest article</span>
      <Link className="hlp-card" href={blogPath(post.slug)} aria-label={`Read: ${post.title}`}>
        <Image src={post.image} alt={post.imageAlt || ''} width={1536} height={1024} sizes="(min-width: 901px) 520px, 100vw" preload />
        {titleOverPicture(post.image) && (
          <span className="hlp-title" aria-hidden="true">
            {post.title}
          </span>
        )}
      </Link>
    </aside>
  );
}
