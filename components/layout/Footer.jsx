import BbbBadge from '@/components/ui/BbbBadge';
import PreferredSource from '@/components/ui/PreferredSource';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import T from '@/components/ui/T';
import BrandLogo from '@/components/ui/BrandLogo';
import { FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from '@/components/ui/icons';
import CookieSettingsLink from '@/components/ui/CookieSettingsLink';
import SiteLink from '@/components/ui/SiteLink';
import { FOOTER } from '@/data/navigation';
import { BUSINESS, FOOTER_HOURS, OFFICES, PHONE, SOCIAL, TEL } from '@/data/site';
import CopyrightYear from './CopyrightYear';
import FooterWord from './FooterWord';
import HideOnStart from './HideOnStart';
import './Footer.css';

const links = (list) =>
  list.map((link) => (
    <SiteLink href={link.href} prefetch={false} key={link.label}>
      <T>{link.label}</T>
    </SiteLink>
  ));

// The studio-style footer with the large QUALITY word (restored November 10 2026, owner; the email, BBB seal and preferred source button kept from the later card footer).
// The studio-style footer: solid primary navy (owner, October 28 2026: the neighborhood photo is gone), the phone number large with the three offices beside it, the logo and link
// columns under a hairline, and the small print last. The request page (/start/) keeps only the small print (HideOnStart).
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <HideOnStart>
          <div className="ft-top">
            <div className="ft-call">
              <p className="ft-label"><T>Talk to a roofer</T></p>
              <a className="ft-phone" href={TEL}>{PHONE}</a>
              <br />
              <a className="ft-email" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
              <dl className="ft-hours">
                {FOOTER_HOURS.map(([day, time]) => (
                  <div key={day}>
                    <dt><T>{day}</T></dt>
                    <dd><T>{time}</T></dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="ft-offices">
              {OFFICES.map((office) => (
                <address key={office.name}>
                  <b><T>{office.name}</T></b>
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

          <NewsletterSignup />

          <div className="ft-grid">
            <div className="ft-col ft-brand">
              <BrandLogo variant="dark" />
              <div className="ft-social">
                {SOCIAL.facebook && <a href={SOCIAL.facebook} aria-label="Facebook"><FacebookIcon /></a>}
                {SOCIAL.instagram && <a href={SOCIAL.instagram} aria-label="Instagram"><InstagramIcon /></a>}
                {SOCIAL.linkedin && <a href={SOCIAL.linkedin} aria-label="LinkedIn"><LinkedInIcon /></a>}
                {SOCIAL.youtube && <a href={SOCIAL.youtube} aria-label="YouTube"><YouTubeIcon /></a>}
              </div>
              <BbbBadge width={200} className="ft-bbb" />
              <PreferredSource className="ft-pref" />
            </div>
            {FOOTER.columns.map((col) => (
              <nav className="ft-col" aria-label={col.title} key={col.title}>
                <h3><T>{col.title}</T></h3>
                {links(col.links)}
              </nav>
            ))}
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
        <HideOnStart>
          {/* The brand word, large, across the bottom: each letter slides up when it scrolls into view */}
          <FooterWord />
        </HideOnStart>
      </div>
    </footer>
  );
}
