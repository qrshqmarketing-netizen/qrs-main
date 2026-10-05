import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { BLOG_LINK, blogPath } from '@/data/catalog';
import { articleDate } from '@/lib/articles';
import './LatestArticles.css';

const SCENES = ['scene-shingle', 'scene-tile', 'scene-flat', 'scene-repair', 'scene-inspect', 'scene-replace']; // art for a post without a picture yet

// A row of roofing blog article cards: the picture, the date, the title and a "Read the article" link. posts: from lib/articles.js
// (latestArticles for the home page, articlesFor(path) for a service or city page).
export default function LatestArticles({ posts = [], heading = 'Latest Roofing Articles' }) {
  if (!posts.length) return null;
  return (
    <section className="articles" aria-labelledby="articles-title">
      <div className="container">
        <h2 id="articles-title">{heading}</h2>
        <div className="art-grid">
          {posts.map((post, i) => (
            <article className="art-card" key={post.slug}>
              {post.image || post.cardImage ? (
                <div className="art-media">
                  <Image src={post.image || post.cardImage} alt="" fill sizes="(min-width: 901px) 360px, (min-width: 621px) 50vw, 100vw" quality={60} />
                </div>
              ) : (
                <div className={`art-media art ${SCENES[i % SCENES.length]}`} aria-hidden="true"></div>
              )}
              <div className="art-body">
                <time dateTime={post.datePublished}>{articleDate(post.datePublished)}</time>
                <h3>
                  <SiteLink className="art-link" href={blogPath(post.slug)} prefetch={false}>{post.title}</SiteLink>
                </h3>
                <span className="art-more" aria-hidden="true">
                  Read the article <ArrowRight />
                </span>
              </div>
            </article>
          ))}
        </div>
        <p className="art-all">
          <SiteLink href={BLOG_LINK.href}>See all roofing articles</SiteLink>
        </p>
      </div>
    </section>
  );
}
