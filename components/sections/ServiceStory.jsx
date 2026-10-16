import Image from 'next/image';
import Mark from '@/components/ui/Mark';
import Rich from '@/components/ui/Rich';
import './ServiceStory.css';

// A service page told the home page's way (owner, October 16 2026): one statement about this kind of work, one short paragraph, then
// "How we …" as a few principles with two-beat headings, each saying one thing once (it replaces the page's overview, process steps and
// "Why choose QRS", which used to repeat the same facts). Studio look: small label at the left, the content at the right, the process photo
// beside the principles from 901px. Data: `story` on the page (data/services/*.js):
//   { label, lead, text, heading, principles: [{ title, text, bullets? }], image?, imageAlt? }  (lead and heading take __word__ for the gold underline;
//   image overrides the page's usual process photo; false shows none, e.g. metal pages, which have no metal photos yet)
export default function ServiceStory({ story, image, imageAlt }) {
  return (
    <>
      <section className="st-section sv-lead">
        <div className="container sv-split">
          <p className="sv-label">{story.label}</p>
          <div>
            <p className="sv-statement"><Mark text={story.lead} /></p>
            {story.text && (
              <p className="sv-text">
                <Rich text={story.text} />
              </p>
            )}
          </div>
        </div>
      </section>
      <section className="st-section sv-how" aria-labelledby="sv-how-heading">
        <div className="container">
          <div className="sv-split sv-head">
            <p className="sv-label">How we work</p>
            <h2 id="sv-how-heading"><Mark text={story.heading} /></h2>
          </div>
          <div className={'sv-body' + (image ? ' has-photo' : '')}>
            <ol className="sv-list">
              {story.principles.map((p, i) => (
                <li key={p.title}>
                  <span className="sv-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>
                      <Rich text={p.text} />
                    </p>
                    {p.bullets?.length > 0 && (
                      <ul className="sv-bullets">
                        {p.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            {image && (
              <div className="sv-photo">
                <span className="sv-photo-in">
                  <Image src={image} alt={imageAlt || ''} fill sizes="(min-width: 901px) 38vw, 100vw" quality={70} />
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
