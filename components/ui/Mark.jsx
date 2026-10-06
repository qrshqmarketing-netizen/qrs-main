// Heading text with underlined words: __word__ inside a heading becomes <u>word</u> (a gold underline, drawn in globals.css).
// Use it only on a heading's own text in a component; text that also goes into page titles, structured data or the AI files must not
// carry the marks (lib/richText.js plainText and toMarkdown drop them anyway).
const MARK = /__([^_]+)__/g;

export default function Mark({ text }) {
  if (typeof text !== 'string' || !text.includes('__')) return text;
  const out = [];
  let last = 0;
  let n = 0;
  for (const m of text.matchAll(MARK)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<u key={n++}>{m[1]}</u>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
