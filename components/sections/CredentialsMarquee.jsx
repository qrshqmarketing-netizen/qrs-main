import Image from 'next/image';
import { CREDENTIALS } from '@/data/credentials';
import './CredentialsMarquee.css';

// Logos display up to 150px wide on phones, 170px on larger screens
const LOGO_SIZES = '(min-width: 621px) 170px, 150px';

// Repeat the credentials enough times that the strip fills the marquee and loops seamlessly at any
// container width, even down to just a couple of real logos.
const TRACK = Array.from({ length: 4 }, () => CREDENTIALS).flat();

// The scrolling "Accreditations & Partnerships" logo strip, on its own so it can sit right under the
// home page's hero stats row (app/page.js) as well as inside WhyQrs.jsx on other pages.
export default function CredentialsMarquee() {
  return (
    <div className="cred-card">
      <h3>Accreditations &amp; Partnerships</h3>
      <div className="cred-marquee">
        <div className="cred-track">
          {TRACK.map((logo, i) => (
            <div className="cred-logo" key={`${logo.src}-${i}`}>
              <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} sizes={LOGO_SIZES} />
            </div>
          ))}
          {/* A second, hidden copy makes the scrolling strip loop seamlessly */}
          {TRACK.map((logo, i) => (
            <div className="cred-logo" aria-hidden="true" key={`${logo.src}-copy-${i}`}>
              <Image src={logo.src} alt="" width={logo.width} height={logo.height} sizes={LOGO_SIZES} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
