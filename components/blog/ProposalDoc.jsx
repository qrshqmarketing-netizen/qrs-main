import Rich from '@/components/ui/Rich';
import './PostVisuals.css';

// What a good proposal includes, drawn as the proposal itself: a paper page with a title bar, and each part as a numbered, ruled section with what it
// should say. Server-rendered. head: ['Part of the proposal', 'What it should say']; rows from the article's table.
export default function ProposalDoc({ head, rows }) {
  return (
    <div className="pd" role="group" aria-label={head.join(', ')}>
      <div className="pd-bar" aria-hidden="true">
        <span>Proposal</span>
        <i /><i /><i />
      </div>
      <ol className="pd-list">
        {rows.map((row, i) => (
          <li key={row[0]}>
            <span className="pd-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <p className="pd-part">{row[0]}</p>
              <p className="pd-say"><Rich text={row[1]} /></p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
