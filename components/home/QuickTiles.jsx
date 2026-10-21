import SiteLink from '@/components/ui/SiteLink';
import HomeHead from './HomeHead';
import './HomeNav.css';

// Four big tiles straight under the hero (after publicstorage.com's storage-type tiles: an illustration with an accent circle and a short
// name, nothing else): the four things most visitors come for, one tap each. The pictures are drawn here as small SVGs in the site's tokens
// (ink lines, paper fills, a gold circle), so they follow the dark theme. tiles: { href, title, line, art } (art: a key of ART).
const ART = {
  repair: (
    <>
      <circle className="qt-sun" cx="134" cy="44" r="22" />
      <path className="qt-fill" d="M28 76 100 26l72 50v4H28z" />
      <path className="qt-line" d="M22 80 100 24l78 56M44 64v58h112V64" />
      <path className="qt-thin" d="M48 66h104M62 56h76M76 46h48" />
      <path className="qt-wash" d="M84 122V96h32v26" />
      <path className="qt-line" d="M84 122V96h32v26M30 122h140" />
      {/* a lifted shingle, being fixed */}
      <path className="qt-gold" d="m122 50 18-6 4 10-18 6z" />
      <path className="qt-line" d="m122 50 18-6 4 10-18 6z" />
      <path className="qt-line" d="m150 30 12-12M156 36l12-12M146 26l16 16" />
    </>
  ),
  replace: (
    <>
      <circle className="qt-sun" cx="62" cy="40" r="22" />
      <path className="qt-fill" d="M28 80 100 30l72 50z" />
      <path className="qt-line" d="M22 84 100 28l78 56M44 70v52h112V70" />
      {/* new layers going on: deck, gold underlayment, shingles on the left half */}
      <path className="qt-gold-soft" d="M100 36 164 80H100z" />
      <path className="qt-thin" d="M114 46v34M128 56v24M142 66v14" />
      <path className="qt-line" d="M100 30v50" />
      <path className="qt-thin" d="M44 68h56M58 58h42M72 48h28M86 38h14" />
      <path className="qt-line" d="M30 122h140M70 122V96h24v26M116 96h22v14h-22z" />
    </>
  ),
  inspect: (
    <>
      <circle className="qt-sun" cx="100" cy="30" r="20" />
      {/* the drone */}
      <path className="qt-line" d="M78 30h44M84 24v6M116 24v6M78 22h12M110 22h12" />
      <rect className="qt-wash qt-line" x="90" y="28" width="20" height="10" rx="3" />
      {/* its scan cone onto the roof */}
      <path className="qt-scan" d="M100 40 58 92h84z" />
      <path className="qt-fill" d="M36 100 100 64l64 36z" />
      <path className="qt-line" d="M28 104 100 62l72 42M46 94v30h108V94" />
      <path className="qt-gold" d="M92 84h16v8H92z" />
      <path className="qt-line qt-dash" d="M58 92h84" />
      <path className="qt-line" d="M30 124h140" />
    </>
  ),
  commercial: (
    <>
      <circle className="qt-sun" cx="150" cy="40" r="20" />
      <path className="qt-fill" d="M22 64h156v58H22z" />
      <path className="qt-line" d="M22 64h156v58H22zM18 64h164" />
      {/* rooftop units and a vent */}
      <path className="qt-wash" d="M44 46h34v18H44z" />
      <path className="qt-line" d="M44 46h34v18H44zM50 52h22M50 58h22" />
      <path className="qt-gold" d="M110 52h22v12h-22z" />
      <path className="qt-line" d="M110 52h22v12h-22zM150 64V50h8v14" />
      <path className="qt-thin" d="M36 82h24v12H36zM74 82h24v12H74zM112 82h24v12h-24zM150 82h16v12h-16z" />
      <path className="qt-line" d="M88 122v-20h24v20M14 122h172" />
    </>
  ),
};

// `text`: with it the heading shows above the tiles (city and county pages); without it the heading is for screen readers only (the home page)
export default function QuickTiles({ heading, text, tiles }) {
  return (
    <section className={'qt' + (text ? ' qt-headed' : '')} aria-labelledby="qt-title">
      {text ? (
        <HomeHead id="qt-title" heading={heading} text={text} />
      ) : (
        <h2 id="qt-title" className="sr-only">
          {heading}
        </h2>
      )}
      <ul className="qt-list">
        {tiles.map((t) => (
          <li className="qt-tile" key={t.href}>
            <svg className="qt-art" viewBox="0 0 200 140" aria-hidden="true" focusable="false">
              {ART[t.art]}
            </svg>
            <h3>
              <SiteLink className="qt-link" href={t.href}>
                {t.title}
              </SiteLink>
            </h3>
            <p>{t.line}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
