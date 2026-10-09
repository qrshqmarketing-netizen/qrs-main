// A hand-drawn gold underline, drawn inside a <u> (components/ui/Mark.jsx and the home hero's headline). Three loose pen strokes, so two
// underlined words never look stamped from the same mold. Plain SVG, no script: the styles are in app/globals.css (`.hand-line`). With
// `animate` the line draws itself from left to right once the page has loaded (heroes); without it the line is simply there (section headings).
const STROKES = [
  { main: 'M4 9 C 38 4.5, 82 11, 124 6.5 S 184 4.8, 197 8.2', second: 'M26 12.2 C 70 10, 120 13, 168 10.6' },
  { main: 'M3 7.5 C 46 11.5, 96 3.5, 146 8.5 S 190 6.5, 197 5.6', second: 'M20 12 C 62 13.2, 110 9.8, 156 12.4' },
  { main: 'M5 8 C 30 5.5, 70 10.5, 108 7 S 170 9.5, 196 6', second: 'M32 12.4 C 80 10.4, 126 12.8, 176 9.8' },
];

export default function HandUnderline({ variant = 0, animate = false }) {
  const s = STROKES[variant % STROKES.length];
  return (
    <svg className={'hand-line' + (animate ? ' hand-draw' : '')} viewBox="0 0 200 15" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path className="hl-main" d={s.main} pathLength="1" />
      <path className="hl-second" d={s.second} pathLength="1" />
    </svg>
  );
}
