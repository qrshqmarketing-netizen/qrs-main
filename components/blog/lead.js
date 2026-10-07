// "**Title:** the rest" / "**Title.** the rest" -> { lead: 'Title', rest: 'the rest', inline: false } (the lead is a title and the rest is its text);
// "**Title** the rest" (no colon or full stop) -> { lead: 'Title', rest: 'the rest', inline: true } (one sentence with a bold start);
// text with no bold start -> { lead: '', rest: text }
export function splitLead(text) {
  const m = /^\*\*(.+?)\*\*([:.]?)\s*(.*)$/s.exec(text);
  if (!m) return { lead: '', rest: text, inline: false };
  const inner = m[1].replace(/[:.]$/, '');
  const hadStop = Boolean(m[2]) || inner !== m[1];
  return { lead: inner, rest: m[3], inline: !hadStop && m[3].length > 0 };
}
