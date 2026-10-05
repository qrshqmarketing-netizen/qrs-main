'use client';

import { usePathname } from 'next/navigation';
import { START_PATH } from '@/data/start';

// Leaves out what's inside on the /start/ request page, which keeps only the logo, the call button, the theme switch and
// the footer's small print (components/layout/Header.jsx and Footer.jsx).
export default function HideOnStart({ children }) {
  return usePathname() === START_PATH ? null : children;
}
