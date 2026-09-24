import { QRS_LEAF_PATH } from '@/components/ui/icons';
import Rich from '@/components/ui/Rich';
import './Guarantee.css';

const POINTS = ['Written scope & price before work starts', 'Photo-documented roof check', 'Final walkthrough with you'];

export default function Guarantee() {
  return (
    <section className="gtee" id="guarantee">
      <div className="container gtee-grid">
        <div className="gtee-art">
          <div className="gtee-card">
            <svg className="gtee-seal" viewBox="0 0 200 200" role="img" aria-label="Lifetime workmanship warranty seal">
              <defs>
                <path id="sealArc" d="M100 100m-70 0a70 70 0 1 1 140 0a70 70 0 1 1-140 0" />
              </defs>
              <circle cx="100" cy="100" r="96" fill="#bb9f5e" />
              <circle cx="100" cy="100" r="84" fill="none" stroke="#062d57" strokeWidth="2" strokeDasharray="3 5" />
              <circle cx="100" cy="100" r="56" fill="#062d57" />
              <text fontSize="13" fontWeight="900" fill="#062d57" letterSpacing="1">
                <textPath href="#sealArc" textLength="430" lengthAdjust="spacing">LIFETIME WORKMANSHIP WARRANTY • QRS •</textPath>
              </text>
              <path d="M78 101l15 15 30-32" fill="none" stroke="#bb9f5e" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <ul className="gtee-points">
              {POINTS.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
        </div>

        <div className="gtee-copy">
          <div className="gtee-title">
            <svg className="gtee-badge" viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path id="gteeCircle" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
              </defs>
              <text fontSize="11.5" fontWeight="800" fill="#062d57" textLength="272" lengthAdjust="spacing">
                <textPath href="#gteeCircle" textLength="272" lengthAdjust="spacing">THE QRS GUARANTEE • THE QRS GUARANTEE •</textPath>
              </text>
              <g transform="translate(37 37) scale(.72)">
                <path d={QRS_LEAF_PATH} fill="#bb9f5e" />
                <path d="M23 22h18M20 29h24M23 37h18" stroke="#062d57" strokeWidth="3" strokeLinecap="round" />
              </g>
            </svg>
            <h2>
              The QRS
              <br />
              Guarantee
            </h2>
          </div>
          <p>
            At Quality Roofing Specialists, doing the job right is the whole point. Every roof we install is backed by our
            lifetime workmanship warranty, and every project starts with a clear written scope &mdash; so you know exactly
            what you&rsquo;re getting before any work begins.
          </p>
          <p>
            <Rich text="Whether you need a [roof replacement](/residential-roofing/#roof-replacement), a [roof repair](/residential-roofing/#roof-repairs) or a tile lift & relay, we stand behind every project. We walk the finished roof with you, go over your warranty in plain English and follow through after the install. With QRS, your new roof isn’t just finished — it’s done right." />
          </p>
        </div>
      </div>
    </section>
  );
}
