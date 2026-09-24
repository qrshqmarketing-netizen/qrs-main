import BrandLogo from '@/components/ui/BrandLogo';
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from '@/components/ui/icons';
import { FOOTER } from '@/data/navigation';
import { BUSINESS, SOCIAL } from '@/data/site';
import CopyrightYear from './CopyrightYear';
import './Footer.css';

const links = (list) => list.map((link) => <a href={link.href} key={link.label}>{link.label}</a>);

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
              <a href={SOCIAL.facebook} aria-label="Facebook"><FacebookIcon /></a>
              <a href={SOCIAL.instagram} aria-label="Instagram"><InstagramIcon /></a>
              <a href={SOCIAL.linkedin} aria-label="LinkedIn"><LinkedInIcon /></a>
              <a href={SOCIAL.youtube} aria-label="YouTube"><YouTubeIcon /></a>
            </div>
          </div>
        </div>
        <div className="ft-copy">
          <span>
            Copyright &copy; <CopyrightYear builtYear={new Date().getFullYear()} /> {BUSINESS.name}, All Rights Reserved
          </span>
          <span>Lifetime Workmanship Warranty</span>
        </div>
      </div>
    </footer>
  );
}
