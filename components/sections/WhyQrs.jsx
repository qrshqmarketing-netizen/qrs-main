import SiteLink from '@/components/ui/SiteLink';
import CredentialsMarquee from './CredentialsMarquee';
import './WhyQrs.css';

// showCredentials: false on the home page, where the scrolling logo strip sits higher up the page
// (right under the hero stats row) instead of inside this section — see app/page.js.
export default function WhyQrs({ heading = 'Why Choose QRS', cta = { label: 'Learn More About Us', href: '/about-us/' }, showCredentials = true }) {
  return (
    <section className="why" id="why">
      <div className="why-roof" aria-hidden="true"></div>
      <div className="container">
        <h2>{heading}</h2>
        {showCredentials && <CredentialsMarquee />}
        {cta && <SiteLink className="btn btn-gold" href={cta.href}>{cta.label}</SiteLink>}
      </div>
    </section>
  );
}
