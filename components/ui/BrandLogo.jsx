import { BUSINESS } from '@/data/site';
import { QrsMark } from './icons';
import './BrandLogo.css';

// Logo mark + business name, used in the header and footer
export default function BrandLogo() {
  return (
    <a className="brand" href="#top" aria-label={`${BUSINESS.name} home`}>
      <span className="brand-mark">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <QrsMark />
        </svg>
      </span>
      <span className="brand-name">
        {BUSINESS.name}
        <small>{BUSINESS.tagline}</small>
      </span>
    </a>
  );
}
