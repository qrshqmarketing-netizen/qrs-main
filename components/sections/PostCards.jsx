import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { blogPath } from '@/data/catalog';
import './PostCards.css';

const SCENES = ['scene-shingle', 'scene-tile', 'scene-flat', 'scene-repair', 'scene-inspect', 'scene-replace'];
export const postDate = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

// Blog index: a card per post (placeholder art rotates until posts have their own images)
export default function PostCards({ posts = [], heading }) {
  return (
    <section className="post-cards tile-pattern">
      <div className="container">
        {heading && (
          <div className="section-head">
            <h2>{heading}</h2>
          </div>
        )}
        <div className="pc-grid">
          {posts.map((post, i) => (
            <article className="pc-card" key={post.slug}>
              <div className={`pc-media art ${SCENES[i % SCENES.length]}`} aria-hidden="true"></div>
              <time dateTime={post.datePublished}>{postDate(post.datePublished)}</time>
              <h3>
                <SiteLink className="pc-link" href={blogPath(post.slug)}>{post.title}</SiteLink>
              </h3>
              <p>{post.excerpt}</p>
              <span className="pc-more" aria-hidden="true">
                Read the article <ArrowRight />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
