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
          {FOOTER.columns.map((col) => (
            <nav className="ft-col" aria-label={col.title} key={col.title}>
              <h4>{col.title}</h4>
              {links(col.links)}
            </nav>
          ))}
          <div className="ft-col ft-brand">
            <BrandLogo variant="dark" />
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
