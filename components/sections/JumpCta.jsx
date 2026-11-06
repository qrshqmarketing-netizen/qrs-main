import SiteLink from '@/components/ui/SiteLink';
import { PhoneIcon } from '@/components/ui/icons';
import { PHONE, TEL } from '@/data/site';
import './JumpCta.css';

// A jump-to-form button between sections (owner, November 6 2026: "add more jumpto CTAs"): the gold button goes to the estimate form at the
// bottom of the page (#roof-check → #estimate through SiteLink), with the phone beside it. `label`: the button's words; `align`: 'left' (inside a
// left-aligned section) or 'center'.
export default function JumpCta({ label = 'Get Pro Advice', align = 'left', className = '' }) {
  return (
    <div className={`jump-cta jump-cta-${align} ${className}`.trim()}>
      <SiteLink className="btn btn-gold" href="#roof-check">
        {label} <span className="arrow">→</span>
      </SiteLink>
      <a className="jump-cta-call" href={TEL}>
        <PhoneIcon /> or call {PHONE}
      </a>
    </div>
  );
}
