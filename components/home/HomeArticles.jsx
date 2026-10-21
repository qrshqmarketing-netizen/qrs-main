import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { BLOG_LINK, blogPath } from '@/data/catalog';
import { articleDate } from '@/lib/articles';
import HomeRail from './HomeRail';

// The newest articles as a sideways row of quiet cards (digitalocean.com's "Resources"): the heading and a "View all" button at the left, the
// arrows at the right; each card is a small picture, the date, the title and a "Read the article" line. posts: latestArticles() (lib/articles.js).
export default function HomeArticles({ posts = [], heading = 'Roofing articles' }) {
  if (!posts.length) return null;
  return (
    <section className="hc-section hc-articles" aria-labelledby="hc-articles-title">
      <div className="hc-wrap">
        <div className="hc-rail-head">
          <h2 id="hc-articles-title">{heading}</h2>
          <SiteLink className="hc-pill" href={BLOG_LINK.href}>
            View all
          </SiteLink>
          <HomeRail label="articles">
            {posts.map((post) => (
              <li className="hc-post" key={post.slug}>
                <p className="hc-post-top">
                  {(post.image || post.cardImage) && (
                    <span className="hc-post-thumb">
                      <Image src={post.image || post.cardImage} alt="" fill sizes="56px" quality={60} loading="lazy" />
                    </span>
                  )}
                  <time dateTime={post.datePublished}>{articleDate(post.datePublished)}</time>
                </p>
                <h3>
                  <SiteLink className="hc-stretch" href={blogPath(post.slug)} prefetch={false}>
                    {post.title}
                  </SiteLink>
                </h3>
                <span className="hc-more" aria-hidden="true">
                  Read the article <ArrowRight />
                </span>
              </li>
            ))}
          </HomeRail>
        </div>
      </div>
    </section>
  );
}
