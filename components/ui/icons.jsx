// Shared SVG icons. Decorative icons are hidden from screen readers.

// The QRS roof/leaf mark
export const QRS_LEAF_PATH =
  'M32 7c-9 2-16 9-18 18 4-3 8-4 12-4-6 6-9 13-7 21 4-4 8-6 13-7v15h6V35c5 1 9 3 13 7 2-8-1-15-7-21 4 0 8 1 12 4C48 16 41 9 32 7Z';

// Mark with its three roof lines. Place inside <svg viewBox="0 0 64 64">.
export function QrsMark({ fill = '#062d57', stroke = '#ffb82e' }) {
  return (
    <>
      <path d={QRS_LEAF_PATH} fill={fill} />
      <path d="M23 22h18M20 29h24M23 37h18" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

const lineIcon = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function ArrowRight({ strokeWidth = 2.4, ...props }) {
  return (
    <svg {...lineIcon} strokeWidth={strokeWidth} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft({ strokeWidth = 2, ...props }) {
  return (
    <svg {...lineIcon} strokeWidth={strokeWidth} {...props}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

// Dropdown caret in the header menus
export function Caret() {
  return (
    <svg className="nav-caret" {...lineIcon} strokeWidth="2.6">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function CloseIcon({ strokeWidth = 2.6, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function GoogleLogo(props) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

// Review star (color comes from CSS)
export function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5l2.94 6.1 6.7.9-4.9 4.64 1.22 6.63L12 17.6l-5.96 3.17 1.22-6.63-4.9-4.64 6.7-.9z" />
    </svg>
  );
}

// ----- Social -----
export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.5 9h3.2v11H4.5zM6.1 3.8a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zM10 9h3v1.5c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.2 2.3 4.2 5.3v6H17.3v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20H10z" />
    </svg>
  );
}

export function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z" />
    </svg>
  );
}
