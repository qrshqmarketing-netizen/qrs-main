import Rich from '@/components/ui/Rich';
import './PostVisuals.css';

// A table whose rows are things to compare (wood, shingle, tile) as cards: the row's name on top, then each other column as a labelled line.
// Server-rendered. head: ['Roof covering', 'Look', 'Fire resistance', 'Upkeep']; rows from the article's table.
export default function RowCards({ head, rows }) {
  return (
    <div className="rc">
      {rows.map((row) => (
        <div className="rc-card" key={row[0]}>
          <p className="rc-name">{row[0]}</p>
          <dl>
            {head.slice(1).map((label, i) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  <Rich text={row[i + 1]} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
