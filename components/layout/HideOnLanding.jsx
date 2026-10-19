'use client';

import { usePathname } from 'next/navigation';
import { isLandingPath } from '@/lib/landing';

// Leaves out what's inside on the ad landing pages (lib/landing.js), so nothing there pulls a visitor away from the form: the chat bubble
// (app/layout.js). Not mounting it at all is safer than having the widget render nothing, since its effects expect its own elements.
export default function HideOnLanding({ children }) {
  return isLandingPath(usePathname()) ? null : children;
}
