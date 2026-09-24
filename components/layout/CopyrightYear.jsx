'use client';

import { useEffect, useState } from 'react';

// The year is filled in when the site is built, then refreshed in the visitor's browser,
// so the copyright stays current even if the site isn't rebuilt for a while.
export default function CopyrightYear({ builtYear }) {
  const [year, setYear] = useState(builtYear);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return year;
}
