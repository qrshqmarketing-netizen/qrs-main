// Step drawings (gold comes from CSS `color`)
export const STEP_ICONS = {
  'roof-check': (
    <>
      <rect x="10" y="10" width="34" height="46" rx="4" fill="currentColor" />
      <rect x="20" y="5" width="14" height="9" rx="2.5" fill="currentColor" stroke="#fff" strokeWidth="2.5" />
      <path d="M18 25h18M18 32h14M18 39h9" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="44" cy="43" r="9.5" fill="#fff" stroke="currentColor" strokeWidth="4.5" />
      <path d="M51 50l6.5 6.5" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
    </>
  ),
  quote: (
    <>
      <path d="M13 6h28l11 11v41H13z" fill="currentColor" />
      <path d="M41 6v11h11" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M29 22.5c-1-1.7-2.8-2.5-5-2.5-3 0-5 1.6-5 3.9 0 5.3 10.4 3.1 10.4 8.6 0 2.4-2.2 4-5.3 4-2.4 0-4.4-1-5.4-2.8M24.2 17v3M24.2 36.5v3" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M34 25h11M34 32h11M20 46h25" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  install: (
    <>
      <circle cx="28" cy="28" r="20" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="7.85 7.85" />
      <circle cx="28" cy="28" r="17" fill="currentColor" />
      <path d="M21 35l9-9M29 21a5.5 5.5 0 1 0 6.5 6.5l-3-.5-1.5-1.5-.5-3z" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="46" cy="46" r="12" fill="currentColor" stroke="#fff" strokeWidth="3" />
      <path d="M40.5 46l4 4 7-8" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  walkthrough: (
    <>
      <path d="M23 38l-7 19 8-3.5 4.5 7L34 45M41 38l7 19-8-3.5-4.5 7L30 45" fill="currentColor" />
      <circle cx="32" cy="26" r="20" fill="currentColor" />
      <circle cx="32" cy="26" r="14" fill="none" stroke="#fff" strokeWidth="2.5" />
      <path d="M25.5 26.5l4.5 4.5 8.5-9.5" fill="none" stroke="#fff" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};
