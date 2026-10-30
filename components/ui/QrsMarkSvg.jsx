// The QRS roof mark as SVG (owner, October 29 2026): traced from the gold mark (public/images/logo/qrs-mark-gold.webp) in three shapes: the
// chimney and the two roofs. It fills with currentColor, so the parent's color sets it (the file version, qrs-mark-gold.svg beside the webp, is gold).
// `parts` numbers the three shapes (data-wm 0-2) for the home hero's randomized entrance (components/home/WordmarkScript.jsx).
export default function QrsMarkSvg({ className, title, parts = false }) {
  const wm = (i) => (parts ? { 'data-wm': i } : {});
  return (
    <svg className={className} viewBox="0 0 700 368" xmlns="http://www.w3.org/2000/svg" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <polygon {...wm(0)} fill="currentColor" points="55,100 158,100 158,130 55,248" />
      <polygon {...wm(1)} fill="currentColor" points="0,368 318,4 412,112 398,129 352,77 105,368" />
      <polygon {...wm(2)} fill="currentColor" points="248,368 560,4 698,160 668,162 598,76 352,368" />
    </svg>
  );
}
