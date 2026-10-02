import Image from 'next/image';
import Breadcrumbs from '@/components/sections/Breadcrumbs';
import FinalCta from '@/components/sections/FinalCta';
import RelatedLinks from '@/components/sections/RelatedLinks';
import RoofCheck from '@/components/sections/RoofCheck';
import { postDate } from '@/components/sections/PostCards';
import JsonLd from '@/components/ui/JsonLd';
import Rich from '@/components/ui/Rich';
import { headingId } from '@/data/blog/posts';
import { BLOG_LINK, blogPath, HOME } from '@/data/catalog';
import { relatedLinks } from '@/data/content';
import { pageJsonLd } from '@/lib/structuredData';
import './BlogPost.css';

const FAQ_HEADING = 'Frequently Asked Questions';

// One block of a post section (the block types are listed in data/blog/posts.js)
function Block({ block }) {
  if (typeof block === 'string') {
    return (
      <p>
        <Rich text={block} />
      </p>
    );
  }
  if (block.h3) return <h3>{block.h3}</h3>;
  if (block.note) {
    return (
      <p className="post-note">
        <Rich text={block.note} />
      </p>
    );
  }
  if (block.list || block.checklist) {
    return (
      <ul className={block.checklist ? 'post-checklist' : undefined}>
        {(block.list || block.checklist).map((item) => (
          <li key={item}>
            <Rich text={item} />
          </li>
        ))}
      </ul>
    );
  }
  if (block.steps) {
    return (
      <ol className="post-steps">
        {block.steps.map((step) => (
          <li key={step}>
            <Rich text={step} />
          </li>
        ))}
      </ol>
    );
  }
  if (block.table) {
    return (
      <div className="post-table" role="region" aria-label={block.table.head.join(', ')} tabIndex={0}>
        <table>
          <thead>
            <tr>
              {block.table.head.map((cell) => (
                <th scope="col" key={cell}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.table.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th scope="row" key={cell}><Rich text={cell} /></th>
                  ) : (
                    <td key={cell}><Rich text={cell} /></td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
}

function PostSection({ section, id }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id}>{section.heading}</h2>
      {section.blocks.map((block, i) => (
        <Block block={block} key={i} />
      ))}
    </section>
  );
}

// One blog post (/blog/<slug>/): thumbnail, byline, intro, table of contents, sections, FAQs and a closing section.
// Content shape: data/blog/posts.js
export default function BlogPost({ post }) {
  const path = blogPath(post.slug);
  const crumbs = [HOME, BLOG_LINK, { label: post.title, href: path }];
  const faqs = post.faqs || [];
  const schema = pageJsonLd({
    path,
    title: post.metaTitle,
    description: post.metaDescription,
    crumbs,
    faqs,
    image: post.image,
    article: { headline: post.title, datePublished: post.datePublished, dateModified: post.dateModified, author: post.author },
  });
  const toc = [...post.sections.map((s) => ({ id: headingId(s.heading), label: s.heading })), ...(faqs.length ? [{ id: headingId(FAQ_HEADING), label: FAQ_HEADING }] : [])];
  return (
    <main id="top">
      <JsonLd data={schema} />
      <article className="post">
        <div className="container post-inner">
          <Breadcrumbs items={crumbs} />
          <div className="eyebrow">Roofing Blog</div>
          <h1>{post.title}</h1>
          <p className="post-meta">
            {post.author && (
              <>
                By <span className="post-author">{post.author}</span>, Quality Roofing Specialists ·{' '}
              </>
            )}
            <time dateTime={post.datePublished}>{postDate(post.datePublished)}</time>
            {post.dateModified && post.dateModified !== post.datePublished && (
              <>
                {' '}· Updated <time dateTime={post.dateModified}>{postDate(post.dateModified)}</time>
              </>
            )}
          </p>
          {post.image && (
            <figure className="post-image">
              <Image src={post.image} alt={post.imageAlt || ''} width={1536} height={1024} sizes="(min-width: 840px) 760px, calc(100vw - 32px)" preload />
            </figure>
          )}
          {(post.intro || []).map((p) => (
            <p className="post-intro" key={p}>
              <Rich text={p} />
            </p>
          ))}
          {toc.length > 2 && (
            <nav className="post-toc" aria-labelledby="post-toc-title">
              <h2 id="post-toc-title">Table of Contents</h2>
              <ol>
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {post.sections.map((section) => (
            <PostSection section={section} id={headingId(section.heading)} key={section.heading} />
          ))}
          {faqs.length > 0 && (
            <section className="post-faqs" aria-labelledby={headingId(FAQ_HEADING)}>
              <h2 id={headingId(FAQ_HEADING)}>{FAQ_HEADING}</h2>
              {faqs.map((faq) => (
                <div className="post-faq" key={faq.q}>
                  <h3>{faq.q}</h3>
                  <p>
                    <Rich text={faq.a} />
                  </p>
                </div>
              ))}
            </section>
          )}
          {post.closing && <PostSection section={post.closing} id={headingId(post.closing.heading)} />}
        </div>
      </article>
      <RelatedLinks heading="Related services" links={relatedLinks(post.related)} />
      <RoofCheck />
      <FinalCta
        heading="Have a Question About Your Roof?"
        text="An article only goes so far. A roofer, not a salesperson, can look at your roof and give you a clear next step with a written scope and price."
      />
    </main>
  );
}
