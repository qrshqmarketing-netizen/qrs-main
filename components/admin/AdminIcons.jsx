// The dashboard's line icons (one stroke style, 24px grid, drawn in currentColor): <AdminIcon name="leads" />
const PATHS = {
  dashboard: <><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M8 16v-4M12 16V8M16 16v-6" /></>,
  leads: <><circle cx="9" cy="8" r="3.5" /><path d="M3 19.5c.6-3.3 3-5 6-5s5.4 1.7 6 5" /><path d="M15.5 4.8a3.5 3.5 0 0 1 0 6.4M17.5 14.8c1.8.7 3 2.3 3.4 4.7" /></>,
  articles: <><path d="M6 3.5h8.5L19 8v12.5H6z" /><path d="M14 3.5V8h5M9 12h7M9 16h7" /></>,
  content: <><path d="M4 6h16M4 12h10M4 18h7" /><path d="m15.5 18.5 5-5-2-2-5 5-.5 2.5z" /></>,
  team: <><rect x="4" y="4" width="16" height="16" rx="3" /><circle cx="12" cy="10" r="3" /><path d="M7 18c.8-2.2 2.7-3.5 5-3.5s4.2 1.3 5 3.5" /></>,
  site: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5z" /></>,
  logout: <><path d="M10 4.5H6a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 6 19.5h4" /><path d="m15 8 4 4-4 4M19 12H9.5" /></>,
  search: <><circle cx="11" cy="11" r="6" /><path d="m20 20-4.5-4.5" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  panel: <><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" /><path d="M9 4.5v15" /></>,
  chevron: <path d="m9 6 6 6-6 6" />,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>,
  phone: <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" />,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  kanban: <><rect x="3.5" y="4" width="5" height="16" rx="1.5" /><rect x="9.5" y="4" width="5" height="11" rx="1.5" /><rect x="15.5" y="4" width="5" height="7" rx="1.5" /></>,
  list: <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />,
  cards: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  edit: <><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13.5 6.5 4 4" /></>,
  trash: <><path d="M4.5 7h15M10 11v6M14 11v6" /><path d="M6 7l1 12.5a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5L18 7M9 7V4.5h6V7" /></>,
  grip: <path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01" strokeWidth="2.6" />,
  user: <><circle cx="12" cy="8.5" r="4" /><path d="M4.5 20c1-3.6 3.9-5.5 7.5-5.5s6.5 1.9 7.5 5.5" /></>,
};

export default function AdminIcon({ name, className = 'adm-ico' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
