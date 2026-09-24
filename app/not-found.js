import Link from 'next/link';

// Shown for any page that doesn't exist yet (for example the service pages linked in the menus)
export default function NotFound() {
  return (
    <main id="top" className="section not-found">
      <div className="container">
        <div className="eyebrow">Coming soon</div>
        <h1>Page not built yet</h1>
        <p className="lead">This page is on its way. In the meantime, everything you need is on the home page.</p>
        <Link className="btn btn-gold" href="/">
          Back to the home page
        </Link>
      </div>
    </main>
  );
}
