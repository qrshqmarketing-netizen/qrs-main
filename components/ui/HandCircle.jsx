// A loose, hand-drawn gold circle around a word (the home page's card headings). A pen loop that overshoots where it started, never a perfect
// ellipse. Plain SVG; it is drawn when it scrolls into view (components/ui/ScrollDraw.jsx, every page).
// Styles: `.hand-circle` in app/globals.css.
const LOOPS = [
  'M62 5 C 28 3, 5 14, 7 27 C 9 41, 42 47, 70 46 C 102 45, 118 34, 113 21 C 109 9, 82 3, 50 7',
  'M58 4 C 90 2, 116 13, 113 26 C 110 41, 76 48, 46 46 C 16 44, 3 32, 8 19 C 13 8, 40 3, 72 6',
];

export function HandCircle({ variant = 0 }) {
  return (
    <svg className="hand-circle" viewBox="0 0 120 50" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={LOOPS[variant % LOOPS.length]} pathLength="1" />
    </svg>
  );
}

// The word with its circle: <CircledWord>91344</CircledWord>
export default function CircledWord({ children, variant = 0 }) {
  return (
    <span className="hand-circled">
      {children}
      <HandCircle variant={variant} />
    </span>
  );
}
