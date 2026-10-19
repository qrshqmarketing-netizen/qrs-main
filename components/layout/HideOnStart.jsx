'use client';

import { usePathname } from 'next/navigation';
import { isFocusPath } from '@/lib/landing';

// Leaves out what's inside on the focus pages (lib/landing.js: the /start/ request page and the ad landing pages), which keep only the logo,
// the call button, the theme switch and the footer's small print (components/layout/Header.jsx and Footer.jsx).
export default function HideOnStart({ children }) {
  return isFocusPath(usePathname()) ? null : children;
}
