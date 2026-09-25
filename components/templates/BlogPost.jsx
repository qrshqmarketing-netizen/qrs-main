import Breadcrumbs from '@/components/sections/Breadcrumbs';
import FinalCta from '@/components/sections/FinalCta';
import RelatedLinks from '@/components/sections/RelatedLinks';
import RoofCheck from '@/components/sections/RoofCheck';
import { postDate } from '@/components/sections/PostCards';
import JsonLd from '@/components/ui/JsonLd';
import Rich from '@/components/ui/Rich';
import { BLOG_LINK, blogPath, HOME } from '@/data/catalog';
import { relatedLinks } from '@/data/content';
import { pageJsonLd } from '@/lib/structuredData';
import './BlogPost.css';

// One blog post (/blog/<slug>/). Content shape: data/blog/posts.js
export default function BlogPost({ post }) {
  const path = blogPath(post.slug);
  const crumbs = [HOME, BLOG_LINK, { label: post.title, href: path }];
  const schema = pageJsonLd({
    path,
    title: post.metaTitle,
    description: post.metaDescription,
    crumbs,
    article: { headline: post.title, datePublished: post.datePublished, dateModified: post.dateModified },
  });
  return (
    <main id="top">
      <JsonLd data={schema} />
      <article className="post">
        <div className="container post-inner">
          <Breadcrumbs items={crumbs} />
          <div className="eyebrow">Roofing Blog</div>
          <h1>{post.title}</h1>
          <p className="post-meta">
            <time dateTime={post.datePublished}>{postDate(post.datePublished)}</time> · Quality Roofing Specialists
          </p>
          {post.sections.map((section, i) => (
            <section key={section.heading || i}>
              {section.heading && <h2>{section.heading}</h2>}
              {(section.paragraphs || []).map((p) => (
                <p key={p}>
                  <Rich text={p} />
                </p>
              ))}
              {section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>
                      <Rich text={item} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
      <RelatedLinks heading="Related services" links={relatedLinks(post.related)} />
      <RoofCheck />
      <FinalCta />
    </main>
  );
}
