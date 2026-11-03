'use client';

import useLang from './useLang';

// A piece of English text in a shared server component (the footer) that shows in Spanish on /es/: <T>Get Pro Advice</T>.
export default function T({ children, vars }) {
  const { tr } = useLang();
  return tr(children, vars);
}
