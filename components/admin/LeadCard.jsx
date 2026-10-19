import Link from 'next/link';
import { statusLabel } from '@/lib/adminLeads';
import AdminIcon from './AdminIcons';

// One lead as an AdFlux-style card: the name, tag pills (where it came from, what they need), a line with the status and when it arrived, a short
// excerpt of their message (or the job details), and an outlined "View lead" button across the bottom.
const when = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const days = Math.floor((Date.now() - d.getTime()) / 864e5);
  if (days < 1) return 'Today';
  if (days < 2) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: d.getFullYear() === new Date().getFullYear() ? undefined : 'numeric', timeZone: 'America/Los_Angeles' });
};

export default function LeadCard({ lead }) {
  const about = lead.message?.trim() || [lead.roof_type && `${lead.roof_type} roof`, lead.zip && `ZIP ${lead.zip}`, lead.preferred_date && `asked for ${lead.preferred_date}${lead.preferred_time ? `, ${lead.preferred_time.toLowerCase()}` : ''}`].filter(Boolean).join(' · ');
  return (
    <article className="adm-tile">
      <div className="adm-tile-head">
        <h3>{lead.name || lead.phone || lead.email || 'No name given'}</h3>
        <div className="adm-pills">
          {lead.source && <span className="adm-pill">{lead.source}</span>}
          {lead.service && <span className="adm-pill">{lead.service}</span>}
        </div>
      </div>
      <p className="adm-tile-goal">
        <span className={`adm-status s-${lead.status || 'new'}`}>{statusLabel(lead.status)}</span>
        <span className="adm-tile-when">
          <AdminIcon name="clock" /> {when(lead.created_at)}
        </span>
      </p>
      <p className="adm-tile-text">{about || 'No message.'}</p>
      <p className="adm-tile-contact">
        {lead.phone && (
          <a href={`tel:${lead.phone.replace(/[^\d+]/g, '')}`}>
            <AdminIcon name="phone" /> {lead.phone}
          </a>
        )}
        {lead.email && (
          <a href={`mailto:${lead.email}`}>
            <AdminIcon name="mail" /> {lead.email}
          </a>
        )}
      </p>
      <Link className="adm-btn adm-btn-line adm-btn-block" href={`/admin/leads/${lead.id}/`}>
        View lead
      </Link>
    </article>
  );
}
