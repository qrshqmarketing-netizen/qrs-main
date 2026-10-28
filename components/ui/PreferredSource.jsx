import { PREFERRED_SOURCE_URL } from '@/data/site';
import './PreferredSource.css';

// A small pill that opens Google's preferred-sources page for this site in a new tab (owner, October 28 2026).
// Used where people read: articles, the blog index, the Roofing FAQ and the glossary.
export default function PreferredSource({ className = '' }) {
  return (
    <p className={`pref-source ${className}`.trim()}>
      <a href={PREFERRED_SOURCE_URL} target="_blank" rel="noopener noreferrer">
        <span className="pref-star" aria-hidden="true">★</span>
        Add QRS as a preferred source on Google
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </p>
  );
}
