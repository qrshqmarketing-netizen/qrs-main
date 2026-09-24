export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="ft-grid">
          <nav className="ft-col ft-big" aria-label="Main">
            <a href="#top">Home</a>
            <a href="#why">About QRS</a>
            <a href="#roof-check">Start a Roof Check</a>
            <a href="#guarantee">Our Guarantee</a>
            <a href="#reviews">Reviews</a>
            <a href="#">Privacy Policy</a>
          </nav>
          <nav className="ft-col ft-big" aria-label="Services and locations">
            <a href="#services">Roofing Services</a>
            <a href="#service-area">Service Area</a>
          </nav>
          <div className="ft-col ft-small">
            <h4>Roof Types</h4>
            <a href="#services">Tile</a>
            <a href="#services">Shingle</a>
            <a href="#services">Flat</a>
            <a href="#services">Tile Lift &amp; Relay</a>
          </div>
          <div className="ft-col ft-small">
            <h4>Get In Touch</h4>
            <a href="#process">How It Works</a>
            <a href="tel:+13103401643">(310) 340-1643</a>
            <a href="#service-area">LA + Orange County</a>
          </div>
          <div className="ft-col ft-brand">
            <a className="brand" href="#top" aria-label="Quality Roofing Specialists home">
              <span className="brand-mark">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path d="M32 7c-9 2-16 9-18 18 4-3 8-4 12-4-6 6-9 13-7 21 4-4 8-6 13-7v15h6V35c5 1 9 3 13 7 2-8-1-15-7-21 4 0 8 1 12 4C48 16 41 9 32 7Z" fill="#062d57" />
              <path d="M23 22h18M20 29h24M23 37h18" stroke="#ffb82e" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand-name">Quality Roofing Specialists<small>DETAIL-FIRST ROOFING</small></span>
            </a>
            {/* Add your real profile URLs */}
            <div className="ft-social">
              <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z" /></svg></a>
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg></a>
              <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.5 9h3.2v11H4.5zM6.1 3.8a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zM10 9h3v1.5c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.2 2.3 4.2 5.3v6H17.3v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20H10z" /></svg></a>
              <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z" /></svg></a>
            </div>
          </div>
        </div>
        <div className="ft-copy">
          <span>Copyright &copy; {new Date().getFullYear()} Quality Roofing Specialists, All Rights Reserved</span>
          <span>Lifetime Workmanship Warranty</span>
        </div>
      </div>
    </footer>
  );
}
