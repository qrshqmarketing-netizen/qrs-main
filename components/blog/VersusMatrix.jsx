import Rich from '@/components/ui/Rich';
import './PostVisuals.css';

// A two-way comparison table as side-by-side cards: the row's label, then the two options next to each other (stacked under each other on a
// phone), each option in its own color. Server-rendered and still a table to assistive technology (ARIA table roles).
// head: ['Compare', 'TPO', 'Modified bitumen']; rows: [['Seams', 'Welded with hot air', 'Overlapped and bonded'], ...]
export default function VersusMatrix({ head, rows }) {
  const [, a, b] = head;
  return (
    <div className="vs" role="table" aria-label={head.join(', ')}>
      <div className="vs-head" role="row">
        <span role="columnheader" className="vs-corner">{head[0]}</span>
        <span role="columnheader" className="vs-a">{a}</span>
        <span role="columnheader" className="vs-b">{b}</span>
      </div>
      {rows.map((row) => (
        <div className="vs-row" role="row" key={row[0]}>
          <span role="rowheader" className="vs-label">{row[0]}</span>
          <div role="cell" className="vs-a"><span className="vs-who" aria-hidden="true">{a}</span><Rich text={row[1]} /></div>
          <div role="cell" className="vs-b"><span className="vs-who" aria-hidden="true">{b}</span><Rich text={row[2]} /></div>
        </div>
      ))}
    </div>
  );
}
