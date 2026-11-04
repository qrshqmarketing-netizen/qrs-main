import BbbBadge from '@/components/ui/BbbBadge';
import PreferredSource from '@/components/ui/PreferredSource';
import BrandLogo from '@/components/ui/BrandLogo';
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from '@/components/ui/icons';
import CookieSettingsLink from '@/components/ui/CookieSettingsLink';
import SiteLink from '@/components/ui/SiteLink';
import T from '@/components/ui/T';
import { FOOTER } from '@/data/navigation';
import { BUSINESS, OFFICES, PHONE, SOCIAL, TEL } from '@/data/site';
import { hoursText } from '@/lib/hours';
import CopyrightYear from './CopyrightYear';
import HideOnStart from './HideOnStart';
import './Footer.css';

const links = (list) =>
  list.map((link) => (
    <SiteLink href={link.href} prefetch={false} key={link.label}>
      <T>{link.label}</T>
    </SiteLink>
  ));

// The footer (owner, October 29 2026, after the owner's reference homepage): a compact near-black card with a gutter around it, sitting on
// the page's closing gradient (deep navy into gold, Footer.css). Inside: the brand column (logo, the hero's line, the phone and hours, the two
// asks, social icons), the Company, Services and Service Areas columns, the three offices, then the small print. The large QUALITY word is
// gone (FooterWord.jsx is unused). The request page (/start/) keeps only the small print (HideOnStart).
// On the Spanish home page (/es/) the words show in Spanish through <T> (data/i18n/es.js).
export default function Footer() {
  const columns = FOOTER.columns.filter((col) => col.title !== 'Contact'); // the phone and the two asks are in the brand column
  return (
    <footer>
      <div className="ft-card">
        <HideOnStart>
          <div className="ft-grid">
            <div className="ft-col ft-brand">
              <BrandLogo variant="dark" tagline />
              <p className="ft-line"><T>Roofs built right, from the deck up.</T></p>
              <a className="ft-phone" href={TEL}>{PHONE}</a>
              <p className="ft-hours"><T>{hoursText(BUSINESS.hours)}</T>.</p>
              <div className="ft-asks">
                <SiteLink className="btn btn-gold" href="#roof-check" prefetch={false}><T>Get Pro Advice</T></SiteLink>
                <SiteLink className="btn btn-outline" href="/contact-us/" prefetch={false}><T>Contact us</T></SiteLink>
              </div>
              <div className="ft-social">
                {SOCIAL.facebook && <a href={SOCIAL.facebook} aria-label="Facebook"><FacebookIcon /></a>}
                {SOCIAL.instagram && <a href={SOCIAL.instagram} aria-label="Instagram"><InstagramIcon /></a>}
                {SOCIAL.linkedin && <a href={SOCIAL.linkedin} aria-label="LinkedIn"><LinkedInIcon /></a>}
                {SOCIAL.youtube && <a href={SOCIAL.youtube} aria-label="YouTube"><YouTubeIcon /></a>}
              </div>
              <BbbBadge width={200} className="ft-bbb" />
              <PreferredSource className="ft-pref" />
            </div>
            {columns.map((col) => (
              <nav className="ft-col" aria-label={col.title} key={col.title}>
                <h3><T>{col.title}</T></h3>
                {links(col.links)}
              </nav>
            ))}
            <div className="ft-col ft-offices">
              <h3><T>Offices</T></h3>
              {OFFICES.map((office) => (
                <address key={office.name}>
                  <b><T>{office.name.replace(/ Office$/, '')}</T></b>
                  {office.address.street}
                  <br />
                  {office.address.city}, {office.address.region} {office.address.postalCode}
                  {office.phone && (
                    <>
                      <br />
                      <a href={office.tel}>{office.phone}</a>
                    </>
                  )}
                </address>
              ))}
            </div>
          </div>
        </HideOnStart>
        <div className="ft-copy">
          <span>
            <T>Copyright</T> &copy; <CopyrightYear builtYear={new Date().getFullYear()} /> {BUSINESS.legalName}, <T>All Rights Reserved</T>
          </span>
          <span className="ft-license">CSLB Lic # {BUSINESS.license}</span>
          {FOOTER.legal.map((link) => (
            <span key={link.href}>
              <SiteLink href={link.href} prefetch={false} {...(link.newTab && { target: '_blank', rel: 'noopener' })}>
                <T>{link.label}</T>
              </SiteLink>
            </span>
          ))}
          <span>
            <CookieSettingsLink className="ft-cookie" />
          </span>
        </div>
      </div>
    </footer>
  );
}
