import { cleanPageId, cleanToken } from '@/lib/facebook';
import './FacebookFeed.css';

// "Latest from our Facebook" (owner, November 2 2026): the 3 newest posts of an office's Facebook Page, on that office's city page
// (Woodland Hills and Vernon, see FACEBOOK_FEEDS in LocationPage.jsx). A server component: the Page token is used here, on the server, and
// never reaches the browser (nothing below is a client component and the token is not rendered). The Graph API answer is cached for an hour
// (Facebook's picture links expire), so the city page refreshes at most hourly. Any failure, or a Page with no posts, hides the section.
const GRAPH = process.env.FACEBOOK_GRAPH_BASE || 'https://graph.facebook.com/v26.0'; // the override is only for testing against a stand-in
const EXCERPT = 150;

async function latestPosts(rawId, rawToken) {
  const pageId = cleanPageId(rawId);
  const token = cleanToken(rawToken);
  if (!pageId || !token) return [];
  const url = `${GRAPH}/${encodeURIComponent(pageId)}/posts?fields=message,full_picture,permalink_url,created_time&limit=3&access_token=${encodeURIComponent(token)}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600, tags: ['facebook'] } });
    if (!res.ok) return [];
    const data = await res.json();
    return (Array.isArray(data?.data) ? data.data : []).filter((p) => p?.permalink_url && (p.message || p.full_picture));
  } catch {
    return []; // never log the URL: it holds the token
  }
}

const excerpt = (text = '') => {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= EXCERPT) return t;
  const cut = t.slice(0, EXCERPT);
  return `${cut.slice(0, cut.lastIndexOf(' ') > 100 ? cut.lastIndexOf(' ') : EXCERPT).trim()}…`;
};
const date = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/Los_Angeles' });

// The Facebook "f" logo (Facebook's own mark, in its blue), so each card reads as a Facebook post
const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="12" fill="#1877F2" />
    <path fill="#fff" d="M15.12 15.47 15.65 12h-3.33V9.75c0-.95.47-1.88 1.96-1.88h1.51V4.92s-1.37-.23-2.68-.23c-2.74 0-4.53 1.66-4.53 4.66V12H5.53v3.47h3.05V24a12.1 12.1 0 0 0 3.74 0v-8.53h2.8Z" />
  </svg>
);

export default async function FacebookFeed({ pageId: rawId, token, place }) {
  const pageId = cleanPageId(rawId);
  const posts = await latestPosts(rawId, token);
  if (!posts.length) return null;
  return (
    <section className="lc-section fb-feed" aria-labelledby="fb-feed-title">
      <div className="lc-wrap">
        <p className="fb-kicker lc-center">On social</p>
        <h2 id="fb-feed-title" className="lc-center">The latest from our Facebook.</h2>
        <p className="lc-center lc-lead">Project photos, finished roofs and team moments from our {place} office, straight from our feed.</p>
        <ul className="fb-cards">
          {posts.map((p) => (
            <li key={p.permalink_url}>
              <a className="fb-card" href={p.permalink_url} target="_blank" rel="noopener noreferrer">
                <span className="fb-badge"><FacebookIcon className="fb-icon" /> Facebook</span>
                {p.full_picture ? (
                  // A plain img: Facebook's picture links are signed and change, so they don't go through the image optimizer
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.full_picture} alt={p.message ? excerpt(p.message) : `A post from our ${place} office on Facebook`} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                ) : (
                  <span className="fb-noimg" aria-hidden="true">f</span>
                )}
                <span className="fb-body">
                  <time dateTime={p.created_time}>{date(p.created_time)}</time>
                  {p.message && <span className="fb-text">{excerpt(p.message)}</span>}
                  <span className="fb-more">
                    View on Facebook <span aria-hidden="true">→</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="lc-center">
          <a className="btn btn-dark fb-follow" href={`https://www.facebook.com/${encodeURIComponent(pageId)}`} target="_blank" rel="noopener noreferrer">
            <FacebookIcon className="fb-icon" /> Follow us on Facebook
          </a>
        </p>
      </div>
    </section>
  );
}
