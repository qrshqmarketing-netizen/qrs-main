import PlusField from './PlusField';

// A slim divider band (after getaethr.ai): a row of "+" clusters, a slow strip of words split by crosshair marks, another row of clusters,
// with hairlines above and below. Decorative (the words are the services the page already links to). words: plain strings. Without words it is
// just the two rows of marks.
export default function WordBand({ words = [], seed = 3, className = '' }) {
  return (
    <div className={`hd-band ${className}`} aria-hidden="true" data-no-reveal="">
      <PlusField seed={seed} className="hd-band-plus" />
      {words.length > 0 && (
        <div className="hd-words">
          {[0, 1].map((copy) => (
            <ul key={copy}>
              {words.map((w) => (
                <li key={w}>
                  <span>{w}</span>
                  <i className="hd-cross" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}
      {words.length > 0 && <PlusField seed={seed + 11} className="hd-band-plus" />}
    </div>
  );
}
