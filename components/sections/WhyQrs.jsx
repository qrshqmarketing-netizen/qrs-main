import SiteLink from '@/components/ui/SiteLink';
import './WhyQrs.css';
import Mark from '@/components/ui/Mark';
import AuroraBackground from './AuroraBackground';

export default function WhyQrs({ heading = 'Why Choose __QRS__', cta = { label: 'Learn More About Us', href: '/about-us/' } }) {
  return (
    <section className="why" id="why">
      <AuroraBackground />
      <div className="container">
        <h2><Mark text={heading} /></h2>
        {cta && <SiteLink className="btn btn-gold" href={cta.href}>{cta.label}</SiteLink>}
      </div>
    </section>
  );
}
