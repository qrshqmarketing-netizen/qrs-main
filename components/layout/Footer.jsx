import Image from 'next/image';
import BrandLogo from '@/components/ui/BrandLogo';
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from '@/components/ui/icons';
import SiteLink from '@/components/ui/SiteLink';
import { FOOTER } from '@/data/navigation';
import { BUSINESS, OFFICES, PHONE, SOCIAL, TEL } from '@/data/site';
import { hoursText } from '@/lib/hours';
import CopyrightYear from './CopyrightYear';
import HideOnStart from './HideOnStart';
import './Footer.css';

const links = (list) =>
  list.map((link) => (
    <SiteLink href={link.href} prefetch={false} key={link.label}>
      {link.label}
    </SiteLink>
  ));

// The studio-style footer: a neighborhood photo under a deep navy shade, the phone number large with the three offices beside it, the logo and link
// columns under a hairline, and the small print last. The request page (/start/) keeps only the small print (HideOnStart).
export default function Footer() {
  return (
    <footer>
      <Image className="ft-photo" src="/images/home-hero-shingle-neighborhood-drone-view.webp" alt="" fill sizes="100vw" quality={55} loading="lazy" />
      <div className="ft-shade" aria-hidden="true"></div>
      <div className="container">
        <HideOnStart>
          <div className="ft-top">
            <div className="ft-call">
              <p className="ft-label">Talk to a roofer</p>
              <a className="ft-phone" href={TEL}>{PHONE}</a>
              <p className="ft-hours">{hoursText(BUSINESS.hours)}. One number reaches all three offices.</p>
            </div>
            <div className="ft-offices">
              {OFFICES.map((office) => (
                <address key={office.name}>
                  <b>{office.name}</b>
                  {office.address.street}
                  <br />
                  {office.address.city}, {office.address.region} {office.address.postalCode}
                </address>
              ))}
            </div>
          </div>

          <div className="ft-grid">
            <div className="ft-col ft-brand">
              <BrandLogo variant="dark" />
              <div className="ft-social">
                {SOCIAL.facebook && <a href={SOCIAL.facebook} aria-label="Facebook"><FacebookIcon /></a>}
                {SOCIAL.instagram && <a href={SOCIAL.instagram} aria-label="Instagram"><InstagramIcon /></a>}
                {SOCIAL.linkedin && <a href={SOCIAL.linkedin} aria-label="LinkedIn"><LinkedInIcon /></a>}
                {SOCIAL.youtube && <a href={SOCIAL.youtube} aria-label="YouTube"><YouTubeIcon /></a>}
              </div>
            </div>
            {FOOTER.columns.map((col) => (
              <nav className="ft-col" aria-label={col.title} key={col.title}>
                <h3>{col.title}</h3>
                {links(col.links)}
              </nav>
            ))}
          </div>
        </HideOnStart>
        <div className="ft-copy">
          <span>
            Copyright &copy; <CopyrightYear builtYear={new Date().getFullYear()} /> {BUSINESS.name}, All Rights Reserved
          </span>
          <span>CSLB Lic # {BUSINESS.license}</span>
          {FOOTER.legal.map((link) => (
            <span key={link.href}>
              <SiteLink href={link.href} prefetch={false} {...(link.newTab && { target: '_blank', rel: 'noopener' })}>
                {link.label}
              </SiteLink>
            </span>
          ))}
        </div>
        <HideOnStart>
          {/* The company name as a quiet row across the bottom: an SVG, so it always spans the full width exactly */}
          <div className="ft-name" aria-hidden="true">
            <svg viewBox="0 0 1000 60" preserveAspectRatio="xMidYMid meet">
              <text x="0" y="47" textLength="1000" lengthAdjust="spacingAndGlyphs">QUALITY ROOFING SPECIALISTS</text>
            </svg>
          </div>
        </HideOnStart>
      </div>
    </footer>
  );
}
