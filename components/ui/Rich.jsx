import { RICH_TOKEN } from '@/lib/richText';
import SiteLink from './SiteLink';

// Text from the data/ files can contain simple Markdown:
//   [words](/tile-roofing/)  → a link      **words** → bold

export function renderRich(text, keyPrefix = 'r') {
  if (typeof text !== 'string') return text;
  const out = [];
  let last = 0;
  let n = 0;
  for (const m of text.matchAll(RICH_TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${keyPrefix}${n++}`;
    out.push(
      m[1] !== undefined ? (
        <SiteLink className="text-link" href={m[2]} key={key}>{renderRich(m[1], `${key}-`)}</SiteLink>
      ) : (
        <strong key={key}>{m[3]}</strong>
      )
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Rich({ text }) {
  return renderRich(text);
}
