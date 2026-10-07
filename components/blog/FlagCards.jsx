import Rich from '@/components/ui/Rich';
import { splitLead } from './lead';
import './PostVisuals.css';

// A list of warnings (red flags, mistakes to avoid) as cards with a flag mark, the bold lead of each item as its title. Server-rendered.
export default function FlagCards({ items }) {
  return (
    <ul className="fc">
      {items.map((item) => {
        const { lead, rest, inline } = splitLead(item);
        return (
          <li key={item}>
            <span className="fc-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M6 21V4M6 5h11l-2.2 3.6L17 12H6" /></svg>
            </span>
            <div>
              {inline ? (
                <p className="lead-inline">
                  <strong>{lead}</strong> <Rich text={rest} />
                </p>
              ) : (
                <>
                  {lead && <strong>{lead}</strong>}
                  {rest && (
                    <p>
                      <Rich text={rest} />
                    </p>
                  )}
                </>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
