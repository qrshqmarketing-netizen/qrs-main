import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import './PostCards.css';

const SCENES = ['scene-shingle', 'scene-tile', 'scene-flat', 'scene-repair', 'scene-inspect', 'scene-replace'];
export const postDate = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

// One blog index card: its thumbnail (placeholder art for a post without one), date, title and excerpt. `hidden` keeps the card in the
// page's HTML but out of sight (the filters and pages in BlogBrowser.jsx), so every article stays a link on the page.
// post: { slug, href, title, excerpt, datePublished, dateLabel, picture, scene }
export function PostCard({ post, hidden = false }) {
  return (
    <article className="pc-card" hidden={hidden}>
      {post.picture ? (
        <div className="pc-media">
          <Image src={post.picture} alt="" fill sizes="(min-width: 901px) 360px, (min-width: 621px) 50vw, 100vw" />
        </div>
      ) : (
        <div className={`pc-media art ${SCENES[post.scene % SCENES.length]}`} aria-hidden="true"></div>
      )}
      <time dateTime={post.datePublished}>{post.dateLabel}</time>
      <h3>
        <SiteLink className="pc-link" href={post.href}>{post.title}</SiteLink>
      </h3>
      <p>{post.excerpt}</p>
      <span className="pc-more" aria-hidden="true">
        Read the article <ArrowRight />
      </span>
    </article>
  );
}
