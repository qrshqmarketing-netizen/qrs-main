import Breadcrumbs from '@/components/sections/Breadcrumbs';
import JsonLd from '@/components/ui/JsonLd';
import Rich from '@/components/ui/Rich';
import { HOME } from '@/data/catalog';
import { pageJsonLd } from '@/lib/structuredData';
import './LegalPage.css';

// Privacy policy and terms pages: a plain, readable document. Content shape: data/pages/legal.js
export default function LegalPage({ page, path }) {
  const crumbs = [HOME, { label: page.title, href: path }];
  return (
    <main id="top">
      <JsonLd data={pageJsonLd({ path, title: page.metaTitle, description: page.metaDescription, crumbs })} />
      <section className="legal">
        <div className="container legal-inner">
          <Breadcrumbs items={crumbs} />
          <h1>{page.title}</h1>
          <p className="legal-updated">Last updated {page.updated}</p>
          <p className="legal-intro">
            <Rich text={page.intro} />
          </p>
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
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
              {(section.after || []).map((p) => (
                <p key={p}>
                  <Rich text={p} />
                </p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
