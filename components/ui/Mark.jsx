// Heading text with underlined words: __word__ inside a heading becomes <u>word</u> (a gold underline, drawn in globals.css).
// Use it only on a heading's own text in a component; text that also goes into page titles, structured data or the AI files must not
// carry the marks (lib/richText.js plainText and toMarkdown drop them anyway).
// animate: the underline draws itself (heroes); otherwise it is a still hand-drawn line (section headings). See components/ui/HandUnderline.jsx.
import HandUnderline from './HandUnderline';

const MARK = /__([^_]+)__/g;

// auto: a heading with no marks of its own gets its last word underlined (a word of 4 letters or more; plain text only), so every section heading carries the pen line.
const LAST_WORD = /^([\s\S]*?)([A-Za-z][A-Za-z'’-]{3,})([^A-Za-z]*)$/;

function autoMark(text, animate) {
  if (/[*\[\]_]/.test(text)) return text;
  const m = LAST_WORD.exec(text);
  if (!m) return text;
  return [m[1], <u key="a">{m[2]}<HandUnderline variant={0} animate={animate} /></u>, m[3]];
}

export default function Mark({ text, animate = false, auto = false }) {
  if (typeof text === 'string' && auto && !text.includes('__')) return autoMark(text, animate);
  if (typeof text !== 'string' || !text.includes('__')) return text;
  const out = [];
  let last = 0;
  let n = 0;
  for (const m of text.matchAll(MARK)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<u key={n}>{m[1]}<HandUnderline variant={n++} animate={animate} /></u>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
