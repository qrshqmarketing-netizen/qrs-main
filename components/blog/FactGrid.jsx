import Rich from '@/components/ui/Rich';
import { splitLead } from './lead';
import './PostVisuals.css';

// A list of "**Lead:** the rest" items as a grid of cards (the lead is the card's title): cost factors, how often to inspect, what a storm does.
// `numbered` puts the item number in a gold badge. Server-rendered.
export default function FactGrid({ items, numbered = false }) {
  return (
    <ul className="fg">
      {items.map((item, i) => {
        const { lead, rest, inline } = splitLead(item);
        return (
          <li key={item}>
            {numbered && <span className="fg-n" aria-hidden="true">{i + 1}</span>}
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
