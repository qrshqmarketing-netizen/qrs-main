import Image from 'next/image';
import { CREDENTIALS } from '@/data/credentials';
import './WhyQrs.css';

// Logos display up to 150px wide on phones, 170px on larger screens
const LOGO_SIZES = '(min-width: 621px) 170px, 150px';

export default function WhyQrs() {
  return (
    <section className="why" id="why">
      <div className="why-roof" aria-hidden="true"></div>
      <div className="container">
        <h2>Why Choose QRS</h2>
        <div className="cred-card">
          <h3>Accreditations &amp; Partnerships</h3>
          <div className="cred-marquee">
            <div className="cred-track">
              {CREDENTIALS.map((logo) => (
                <div className="cred-logo" key={logo.src}>
                  <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} sizes={LOGO_SIZES} />
                </div>
              ))}
              {/* A second, hidden copy makes the scrolling strip loop seamlessly */}
              {CREDENTIALS.map((logo) => (
                <div className="cred-logo" aria-hidden="true" key={`${logo.src}-copy`}>
                  <Image src={logo.src} alt="" width={logo.width} height={logo.height} sizes={LOGO_SIZES} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <a className="btn btn-gold" href="#reviews">Learn More About Us</a>
      </div>
    </section>
  );
}
