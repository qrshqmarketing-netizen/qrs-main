import Rich from '@/components/ui/Rich';
import './PostVisuals.css';

// The pros or the cons of something as a grid of cards, each with a check (pros) or caution (cons) mark. Server-rendered; the card titles are the
// article's own h3 subheadings. items: [{ n?, title, body: [paragraph, ...] }]; tone: 'pro' | 'con' | 'info' (neutral, numbered or with a magnifier).
export default function ProCards({ items, tone = 'pro' }) {
  return (
    <div className={`pcc pcc-${tone}`}>
      {items.map((item) => (
        <div className="pcc-card" key={item.title}>
          <span className="pcc-icon" aria-hidden="true">
            {tone === 'info' ? (
              item.n ? <b>{item.n}</b> : <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6" /><path d="M16 16l4.5 4.5" /></svg>
            ) : tone === 'pro' ? (
              <svg viewBox="0 0 24 24"><path d="M5 12.5l4.2 4.2L19 7" /></svg>
            ) : (
              <svg viewBox="0 0 24 24"><path d="M12 8v5M12 16.6v.1" /><path d="M10.3 4.4L3.4 16.5a2 2 0 0 0 1.7 3h13.8a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0z" /></svg>
            )}
          </span>
          <div>
            <h3>{item.title}</h3>
            {item.body.map((text) => (
              <p key={text}>
                <Rich text={text} />
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
