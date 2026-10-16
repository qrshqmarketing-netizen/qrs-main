import './Splash.css';

// The opening splash on a first visit to the home page (rules in lib/splash.js, the timing and the hero's entrance in Splash.css). Rendered
// by the home page only and hidden unless the <head> script put `splash-on` on <html>. The name and the place line are drawn by CSS (`content`),
// so the page's text stays the same for search engines; the mark loads only while the splash shows.
export default function Splash() {
  return (
    <div className="splash" aria-hidden="true">
      <div className="splash-in">
        <span className="splash-mark"></span>
        <span className="splash-name"></span>
        <span className="splash-bar">
          <i></i>
        </span>
        <span className="splash-place"></span>
      </div>
    </div>
  );
}
