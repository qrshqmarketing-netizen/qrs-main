import Rich from '@/components/ui/Rich';
import HomeHead from './HomeHead';
import './HomeNav.css';

// Several feature bands as cards in one row (October 21 2026, after publicstorage.com: less on each page): each band's heading, its points as a
// short list and its last paragraph (the next step, with its links; the first one only said the points again), in place of one full-width band per section (/roof-inspection/: shingle, tile, flat).
// sections: [{ id?, heading, paragraphs, points: [{ title, text }] }] (id: the card's anchor, as the band had)
export default function BandCards({ heading = 'What we __check__', text, sections }) {
  return (
    <section className="hc-section bc" aria-labelledby="bc-title">
      <div className="hc-wrap">
        <HomeHead id="bc-title" heading={heading} text={text} />
        <ul className="hc-cards bc-cards">
          {sections.map((s) => (
            <li className="hc-card" key={s.heading} id={s.id}>
              <div className="hc-card-body">
                <h3>{s.heading}</h3>
                <ul className="bc-points">
                  {s.points.map((p) => (
                    <li key={p.title}>
                      <b>{p.title}</b>
                      <span>
                        <Rich text={p.text} />
                      </span>
                    </li>
                  ))}
                </ul>
                {s.paragraphs?.length > 0 && (
                  <p className="bc-next">
                    <Rich text={s.paragraphs.at(-1)} />
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
