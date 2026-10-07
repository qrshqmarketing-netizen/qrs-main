import Rich from '@/components/ui/Rich';
import './PostVisuals.css';

// A vertical timeline of numbered items: the steps of a process or the numbered signs of a list. Server-rendered, no script.
// items: [{ n?, title, body: [paragraph, ...] }]. Titles of steps ("Stay safe. Stay off the roof...") are split at the first full stop;
// `heading` makes each title a real <h3> (the article's own subheadings) instead of bold text.
export default function Timeline({ items, heading = false }) {
  const Title = heading ? 'h3' : 'p';
  // Items that are only a sentence or a question (no text under them) are shown as a plain sentence, not as a heading-style title
  const plain = items.every((item) => item.body.length === 0);
  return (
    <ol className={'tl' + (plain ? ' tl-plain' : '')}>
      {items.map((item, i) => (
        <li className="tl-item" key={item.title + i}>
          <span className="tl-n" aria-hidden="true">{item.n ?? i + 1}</span>
          <div className="tl-card">
            <Title className="tl-title"><Rich text={item.title} /></Title>
            {item.body.map((text) => (
              <p className="tl-text" key={text}>
                <Rich text={text} />
              </p>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
