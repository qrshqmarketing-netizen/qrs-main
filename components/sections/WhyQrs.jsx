import SiteLink from '@/components/ui/SiteLink';
import './WhyQrs.css';

export default function WhyQrs({ heading = 'Why Choose QRS', cta = { label: 'Learn More About Us', href: '/about-us/' } }) {
  return (
    <section className="why" id="why">
      <div className="why-roof" aria-hidden="true"></div>
      <div className="container">
        <h2>{heading}</h2>
        {cta && <SiteLink className="btn btn-gold" href={cta.href}>{cta.label}</SiteLink>}
      </div>
    </section>
  );
}
