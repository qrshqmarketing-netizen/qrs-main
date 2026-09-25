import BrandLogo from '@/components/ui/BrandLogo';
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from '@/components/ui/icons';
import SiteLink from '@/components/ui/SiteLink';
import { FOOTER } from '@/data/navigation';
import { BUSINESS, SOCIAL } from '@/data/site';
import CopyrightYear from './CopyrightYear';
import './Footer.css';

const links = (list) =>
  list.map((link) => (
    <SiteLink href={link.href} prefetch={false} key={link.label}>
      {link.label}
    </SiteLink>
  ));

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="ft-grid">
          <nav className="ft-col ft-big" aria-label="Main">
            {links(FOOTER.main)}
          </nav>
          <nav className="ft-col ft-big" aria-label="Services and locations">
            {links(FOOTER.services)}
          </nav>
          <div className="ft-col ft-small">
            <h4>{FOOTER.roofTypes.title}</h4>
            {links(FOOTER.roofTypes.links)}
          </div>
          <div className="ft-col ft-small">
            <h4>{FOOTER.contact.title}</h4>
            {links(FOOTER.contact.links)}
          </div>
          <div className="ft-col ft-brand">
            <BrandLogo />
            <div className="ft-social">
              {SOCIAL.facebook && <a href={SOCIAL.facebook} aria-label="Facebook"><FacebookIcon /></a>}
              {SOCIAL.instagram && <a href={SOCIAL.instagram} aria-label="Instagram"><InstagramIcon /></a>}
              {SOCIAL.linkedin && <a href={SOCIAL.linkedin} aria-label="LinkedIn"><LinkedInIcon /></a>}
              {SOCIAL.youtube && <a href={SOCIAL.youtube} aria-label="YouTube"><YouTubeIcon /></a>}
            </div>
          </div>
        </div>
        <div className="ft-copy">
          <span>
            Copyright &copy; <CopyrightYear builtYear={new Date().getFullYear()} /> {BUSINESS.name}, All Rights Reserved
          </span>
          <span>Lifetime Workmanship Warranty</span>
          <span>CSLB Lic # {BUSINESS.license}</span>
          {FOOTER.legal.map((link) => (
            <span key={link.href}>
              <SiteLink href={link.href} prefetch={false}>{link.label}</SiteLink>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
