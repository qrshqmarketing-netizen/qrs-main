import Image from 'next/image';
import SiteLink from '@/components/ui/SiteLink';
import './FinalCta.css';

// Closing call to action above the footer, over the QRS truck photo. Pages can change the words and the button.
export default function FinalCta({
  heading = 'Detail-First Roofing',
  text = 'At QRS, there’s no pressure, no mystery scope and no surprises — ever. Start with a roofer-led roof check today!',
  cta = { label: 'Get Pro Advice', href: '#roof-check' },
}) {
  return (
    <section className="final">
      <div className="container">
        <div className="final-pin" aria-hidden="true">
          <svg viewBox="0 0 34 40">
            <path d="M17 1C8.7 1 2 7.6 2 15.8 2 27 17 39 17 39s15-12 15-23.2C32 7.6 25.3 1 17 1Z" fill="#fff" />
            <circle cx="17" cy="15.5" r="5.5" fill="#bb9f5e" />
          </svg>
        </div>
        <h2>{heading}</h2>
        <p>{text}</p>
        <SiteLink className="btn btn-gold" href={cta.href}>{cta.label}</SiteLink>
      </div>
      {/* 4K photo (full-size original: assets/originals/qrs-truck.jpg); Next.js serves a smaller copy sized to each screen */}
      <Image
        className="cta-scene"
        src="/images/qrs-truck-4k.webp"
        width={3840}
        height={1955}
        sizes="100vw"
        alt="Quality Roofing Specialists truck parked on a residential street in front of homes"
      />
    </section>
  );
}
