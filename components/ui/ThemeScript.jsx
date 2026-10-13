'use client';

// Restores the visitor's theme (light/dark, localStorage `qrs-theme`, or ?theme=dark as a preview) before the page paints. The server sends it as a
// normal inline script in <head>, so it runs before the first paint, as before. When React builds the head again in the browser (a client re-render
// of the root layout in development), it would warn "Encountered a script tag while rendering React component": there the copy is marked
// `text/plain`, a data block React doesn't warn about and the browser never runs (the theme is already set by then). suppressHydrationWarning
// covers the different `type` while hydrating.
const CODE =
  "try{const saved=localStorage.getItem('qrs-theme');const requested=new URLSearchParams(location.search).get('theme');if((saved||requested)==='dark')document.documentElement.dataset.theme='dark';else document.documentElement.removeAttribute('data-theme')}catch{if(/[?&]theme=dark(&|$)/.test(location.search))document.documentElement.dataset.theme='dark'}";

export default function ThemeScript() {
  return <script suppressHydrationWarning type={typeof window === 'undefined' ? undefined : 'text/plain'} dangerouslySetInnerHTML={{ __html: CODE }} />;
}
