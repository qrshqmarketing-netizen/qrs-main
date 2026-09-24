'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { CloseIcon } from '@/components/ui/icons';
import { FINANCE, FINANCING_URL, LEAD_ENDPOINT, PRICING } from '@/data/instantQuote';
import { PHONE, TEL } from '@/data/site';
import { loadLeaflet } from '@/lib/leaflet';
import { buildingInsights, DEMO, fmt, geocode, money, monthly, myLocation, priceFor, styleOf, summarize } from '@/lib/roofQuote';
import { local } from '@/lib/storage';
import './InstantQuote.css';

const STEPS = ['Address', 'Your roof', 'Contact', 'Estimate'];
const PITCHES = [
  { value: 'Flat', note: '0–1/12', path: 'M4 11h36M4 16h36' },
  { value: 'Low', note: '2–3/12', path: 'M3 19 22 12l19 7Z' },
  { value: 'Conventional', note: '4–8/12', path: 'M5 21 22 7l17 14Z' },
  { value: 'Steep', note: '9+/12', path: 'M9 22 22 2l13 20Z' },
];
const PITCH_VALUES = PITCHES.map((p) => p.value);
const ROOF_TYPES = ['Tile', 'Shingle', 'Flat', 'Metal', 'Not sure'];
const MATERIALS = Object.keys(PRICING);
const STORIES = ['1 story', '2 stories', '3+ stories'];
const ERRORS = {
  addr: { msg: "We couldn't find that address. Try adding the city or ZIP code.", canSkip: true },
  geo: { msg: "We couldn't get your location. Type the address instead.", canSkip: false },
  roof: { msg: "Google doesn't have roof data for this address yet.", canSkip: true },
  api: { msg: 'Something went wrong while measuring.', canSkip: true },
};
const LONGEST_TERM = Math.max(...FINANCE.terms);

// Multi-select choices: adds or removes `value`, keeping the list in `order`.
// `alone` is a choice that can't be combined with others ("Not sure").
function toggle(list, value, order, alone) {
  const next = list.includes(value) ? list.filter((v) => v !== value) : value === alone ? [value] : [...list.filter((v) => v !== alone), value];
  return order.filter((v) => next.includes(v));
}

// "Instant Quote" tab on the right edge: address → roof measurement → contact → price range + financing.
// Prices and settings live in data/instantQuote.js; the measuring logic in lib/roofQuote.js.
export default function InstantQuote() {
  const [open, setOpen] = useState(false);
  const [peek, setPeek] = useState(false); // first-visit preview slide-out
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [roof, setRoof] = useState(null); // measured roof, or null when entered by hand
  const [address, setAddress] = useState('');
  const [sqft, setSqft] = useState({ value: 1800, max: 6000, step: 10 });
  const [pitches, setPitches] = useState([]); // several allowed, e.g. a conventional roof with a flat section
  const [roofTypes, setRoofTypes] = useState(['Not sure']);
  const [stories, setStories] = useState('');
  const [quote, setQuote] = useState(null);
  const [term, setTerm] = useState(FINANCE.defaultTerm);

  const drawerRef = useRef(null);
  const tabRef = useRef(null);
  const bodyRef = useRef(null);
  const addrRef = useRef(null);
  const closeRef = useRef(null);
  const contactRef = useRef(null);
  const mapEl = useRef(null);
  const map = useRef(null); // { map, layer }
  const busyRef = useRef(false);
  const stepRef = useRef(step); // latest values for timers
  const openRef = useRef(open);

  useEffect(() => {
    stepRef.current = step;
    openRef.current = open;
  }, [step, open]);

  function openDrawer() {
    setOpen(true);
    setTimeout(() => {
      (stepRef.current === 1 ? addrRef : closeRef).current.focus({ preventScroll: true });
      map.current?.map.invalidateSize();
    }, 330);
  }

  function closeDrawer() {
    setOpen(false);
    tabRef.current.focus({ preventScroll: true });
  }

  useEffect(() => {
    document.body.classList.toggle('rm-lock', open);
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [step]);

  // Any element with a data-rm-open attribute opens the drawer (handy for extra buttons)
  useEffect(() => {
    const onClick = (e) => {
      if (e.target.closest('[data-rm-open]')) {
        e.preventDefault();
        openDrawer();
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // On a visitor's first page load, slide the drawer out briefly so they see what the tab does.
  // Touching the drawer during the preview keeps it open.
  useEffect(() => {
    if (local.get('rmPeekSeen')) return;
    const drawer = drawerRef.current;
    let t1, t2;
    const keep = () => {
      setPeek(false);
      openDrawer();
    };
    const start = () => {
      t1 = setTimeout(() => {
        local.set('rmPeekSeen', '1');
        if (openRef.current) return;
        setPeek(true);
        drawer.addEventListener('pointerdown', keep, { once: true });
        t2 = setTimeout(() => {
          drawer.removeEventListener('pointerdown', keep);
          setPeek(false);
        }, 2200);
      }, 800);
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      window.removeEventListener('load', start);
      drawer.removeEventListener('pointerdown', keep);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // ----- Step 1 → 2 -----
  // Step 2 works two ways: pre-filled from the Solar API, or entered by hand when there's no roof data
  function applyRoof(r) {
    setRoof(r);
    setPitches(r ? [styleOf(r.rise)] : []);
    if (r) {
      setSqft({ value: r.sqft, max: Math.max(6000, Math.ceil((r.sqft * 1.5) / 50) * 50), step: 1 });
      if (styleOf(r.rise) === 'Flat') setRoofTypes(['Flat']);
    } else {
      setSqft({ value: 1800, max: 6000, step: 10 });
    }
    setStep(2);
  }

  async function measure(getPoint) {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setError(null);
    try {
      const pt = await getPoint();
      applyRoof(summarize(await buildingInsights(pt.lat, pt.lng), pt.label));
    } catch (e) {
      setError(ERRORS[e] || ERRORS.api);
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }

  const onAddress = (e) => {
    e.preventDefault();
    const q = address.trim();
    if (q) measure(() => geocode(q));
  };

  // Satellite view with each measured roof section outlined
  useEffect(() => {
    if (step !== 2 || !roof) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      const L = await loadLeaflet().catch(() => null);
      if (cancelled || !L || !mapEl.current) return;
      if (!map.current) {
        const m = L.map(mapEl.current, { scrollWheelZoom: false, maxZoom: 21 });
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          maxNativeZoom: 19,
          maxZoom: 21,
          attribution: 'Imagery &copy; Esri',
        }).addTo(m);
        map.current = { map: m, layer: L.layerGroup().addTo(m) };
      }
      const { map: m, layer } = map.current;
      m.invalidateSize();
      layer.clearLayers();
      const ll = (p) => [p.latitude, p.longitude];
      roof.facets.forEach((f) => {
        if (!f.box) return;
        L.rectangle([ll(f.box.sw), ll(f.box.ne)], { color: f.color, weight: 2, fillOpacity: 0.22 })
          .bindTooltip(f.facing + ': ' + fmt(f.sqft) + ' sq ft')
          .addTo(layer);
      });
      if (roof.box) m.fitBounds([ll(roof.box.sw), ll(roof.box.ne)], { padding: [20, 20], maxZoom: 20 });
      else m.setView(ll(roof.center), 20);
    }, 20);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [step, roof]);

  useEffect(
    () => () => {
      map.current?.map.remove();
      map.current = null;
    },
    []
  );

  // ----- Step 3 → estimate -----
  const onContact = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    // The estimate starts with what's on the roof now. "Not sure" is priced as shingle (or flat, if every pitch picked is flat).
    const current = roofTypes.filter((t) => PRICING[t]);
    const flatOnly = pitches.length > 0 && pitches.every((p) => p === 'Flat');
    const q = {
      name: f.get('name'),
      phone: f.get('phone'),
      email: f.get('email'),
      address: roof ? roof.label : address,
      roofTypes,
      sqft: sqft.value,
      pitches,
      stories,
      materials: current.length ? current : [flatOnly ? 'Flat' : 'Shingle'],
      measured: roof ? { sqft: roof.sqft, pitch: roof.rise + '/12', sections: roof.facets.length } : null,
    };
    // Sent to the lead endpoint: one estimate per material, with the example monthly payment
    q.termYears = term;
    q.estimates = q.materials.map((material) => {
      const est = priceFor(q, material);
      return { material, low: est.low, high: est.high, monthly: Math.round(monthly((est.low + est.high) / 2, term)) };
    });
    setQuote(q);
    if (LEAD_ENDPOINT) {
      fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(q) }).catch(() => {});
    }
    setStep(4);
  };

  const startOver = () => {
    flushSync(() => {
      setAddress('');
      setStories('');
      setRoofTypes(['Not sure']);
      setRoof(null);
      setStep(1);
    });
    contactRef.current.reset();
    addrRef.current.focus();
  };

  // Focus stays inside the drawer while it's open; Escape closes it
  const onDrawerKeyDown = (e) => {
    if (e.key === 'Escape') return closeDrawer();
    if (e.key !== 'Tab') return;
    const focusable = [...drawerRef.current.querySelectorAll('button,input,a[href],summary')].filter(
      (el) => !el.disabled && el.offsetParent && !(el.type === 'radio' && !el.checked)
    );
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const manual = !roof;
  // Step 4: one price range per material being compared, plus the overall range across them
  const ests = quote ? quote.materials.map((material) => ({ material, ...priceFor(quote, material) })) : [];
  const low = ests.length ? Math.min(...ests.map((e) => e.low)) : 0;
  const high = ests.length ? Math.max(...ests.map((e) => e.high)) : 0;
  const payments = ests.map((e) => monthly((e.low + e.high) / 2, term));
  const priceMeta = quote
    ? [fmt(quote.sqft) + ' sq ft', quote.pitches.length ? quote.pitches.join(' + ').toLowerCase() + ' pitch' : '', quote.stories].filter(Boolean).join(' · ')
    : '';
  const measuredNote = roof
    ? (DEMO
        ? 'Demo data: add a Google API key for real measurements. '
        : 'Estimated from Google satellite imagery' + (roof.date ? ' (' + roof.date + ')' : '') + '. ') + 'We confirm every measurement on site.'
    : '';

  return (
    <div className={'rm' + (open ? ' open' : '') + (peek ? ' peek' : '') + (manual ? ' rm-manual' : '')} id="rm" data-step={step}>
      <button className="rm-tab" type="button" id="rmTab" ref={tabRef} aria-controls="rmDrawer" aria-expanded={open} onClick={openDrawer}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 11 12 4l9 7" />
          <path d="M5 10v10h14V10" />
          <path d="M9 20v-5h6v5" />
        </svg>
        <span>Instant Quote</span>
      </button>
      <div className="rm-shade" id="rmShade" onClick={closeDrawer}></div>

      <aside className="rm-drawer" id="rmDrawer" ref={drawerRef} role="dialog" aria-modal="true" aria-labelledby="rmTitle" inert={!open && !peek} onKeyDown={onDrawerKeyDown}>
        <header className="rm-head">
          <div>
            <span>Free roof measurement · 30 seconds</span>
            <b id="rmTitle">Instant Quote</b>
          </div>
          <button className="rm-x" type="button" id="rmClose" ref={closeRef} aria-label="Close instant quote" onClick={closeDrawer}>
            <CloseIcon />
          </button>
        </header>
        <ol className="rm-steps" aria-label="Progress">
          {STEPS.map((label, i) => (
            <li className={i < step ? 'on' : undefined} key={label}>{label}</li>
          ))}
        </ol>

        <div className="rm-body" id="rmBody" ref={bodyRef}>
          {/* Step 1: address */}
          <section data-panel="1" hidden={step !== 1}>
            <span className="rm-demo" id="rmDemo" hidden={!DEMO}>Demo mode</span>
            <h3>Where's the roof?</h3>
            <p>We measure it from satellite imagery. No ladder, no visit needed yet.</p>
            <form id="rmAddrForm" onSubmit={onAddress}>
              <div className="field">
                <label htmlFor="rmAddr">Property address</label>
                <input id="rmAddr" name="address" ref={addrRef} autoComplete="street-address" placeholder="123 Main St, Los Angeles, CA" required value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <button className="btn btn-gold" type="submit" id="rmGo" disabled={busy}>
                {busy ? <><span className="rm-spin" aria-hidden="true"></span> Measuring…</> : 'Measure my roof'}
              </button>
            </form>
            <button className="rm-link" type="button" id="rmGeo" onClick={() => measure(myLocation)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
              </svg>
              I'm at the property now: use my location
            </button>
            <p className="rm-err" id="rmErr" role="alert" hidden={!error}>
              {error?.msg}
              {error?.canSkip && (
                <button type="button" onClick={() => applyRoof(null)}>Enter roof details yourself →</button>
              )}
            </p>
          </section>

          {/* Step 2: measurements */}
          <section data-panel="2" hidden={step !== 2}>
            <div className="rm-map rm-measured" id="rmMap" ref={mapEl} role="img" aria-label="Satellite view of the roof with measured sections outlined"></div>
            <p className="rm-addr rm-measured" id="rmAddrOut">{roof?.label}</p>
            <h3 className="rm-manual-only" id="rmManualTitle" hidden={!manual}>Tell us about your roof</h3>
            <p className="rm-manual-only" hidden={!manual}>An approximation is fine. We confirm every detail on site.</p>
            <div className="rm-stats">
              <div className="rm-stat big">
                <span id="rmAreaLabel">{manual ? 'Your estimate' : 'Total roof area · measured'}</span>
                <b id="rmArea">{fmt(sqft.value)} sq ft</b>
                <small id="rmSquares">About {Math.max(1, Math.round(sqft.value / 100))} roofing squares</small>
              </div>
            </div>
            <div className="field rm-range">
              <label htmlFor="rmSqft">
                Roof size <output id="rmSqftOut" htmlFor="rmSqft">{fmt(sqft.value)} sq ft</output>
              </label>
              <input type="range" id="rmSqft" min="500" max={sqft.max} step={sqft.step} value={sqft.value} onChange={(e) => setSqft((s) => ({ ...s, value: Number(e.target.value) }))} />
              <small id="rmSqftHint">{manual ? 'Not sure? A typical LA home roof is 1,500–2,500 sq ft.' : 'Drag to adjust if it looks off.'}</small>
            </div>
            <fieldset className="rm-pitch">
              <legend>
                Roof pitch <small id="rmPitchNote">{roof ? `Measured ${roof.rise}/12 · pick all that apply` : 'Pick all that apply'}</small>
              </legend>
              <div>
                {PITCHES.map((p, i) => (
                  <Fragment key={p.value}>
                    <input type="checkbox" name="rmPitch" id={`rmP${i + 1}`} value={p.value} checked={pitches.includes(p.value)} onChange={() => setPitches((list) => toggle(list, p.value, PITCH_VALUES))} />
                    <label htmlFor={`rmP${i + 1}`}>
                      <svg viewBox="0 0 44 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                        <path d={p.path} />
                      </svg>
                      {p.value}
                      <small>{p.note}</small>
                    </label>
                  </Fragment>
                ))}
              </div>
            </fieldset>
            <div className="field rm-stories">
              <label htmlFor="rmStories">Number of stories</label>
              <select id="rmStories" value={stories} onChange={(e) => setStories(e.target.value)}>
                <option value="">Choose…</option>
                {STORIES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <details className="rm-facets rm-measured">
              <summary id="rmFacetSum">{roof ? `See all ${roof.facets.length} roof sections` : 'See each section'}</summary>
              <ul id="rmList">
                {roof?.facets.map((f, i) => (
                  <li key={i}>
                    <i style={{ background: f.color }}></i>
                    {f.facing + ' · ' + f.rise + '/12'}
                    <em>{fmt(f.sqft)} sq ft</em>
                  </li>
                ))}
              </ul>
            </details>
            <fieldset className="rm-types">
              <legend>
                What's on the roof now? <small>Pick all that apply</small>
              </legend>
              <div>
                {ROOF_TYPES.map((type, i) => (
                  <Fragment key={type}>
                    <input
                      type="checkbox"
                      name="rmType"
                      id={`rmT${i + 1}`}
                      value={type}
                      checked={roofTypes.includes(type)}
                      onChange={() => setRoofTypes((list) => {
                        const next = toggle(list, type, ROOF_TYPES, 'Not sure');
                        return next.length ? next : ['Not sure'];
                      })}
                    />
                    <label htmlFor={`rmT${i + 1}`}>{type}</label>
                  </Fragment>
                ))}
              </div>
            </fieldset>
            <p id="rmNote">{measuredNote}</p>
            <div className="rm-actions">
              <button className="rm-back" type="button" onClick={() => setStep(1)}>Back</button>
              <button className="btn btn-gold" type="button" onClick={() => setStep(3)}>Looks right</button>
            </div>
          </section>

          {/* Step 3: contact */}
          <section data-panel="3" hidden={step !== 3}>
            <h3>Where should we send your estimate?</h3>
            <p>Your price range and monthly payment options are on the next screen.</p>
            <form id="rmContact" ref={contactRef} onSubmit={onContact}>
              <div className="field">
                <label htmlFor="rmName">Name</label>
                <input id="rmName" name="name" autoComplete="name" required placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="rmPhone">Phone</label>
                <input id="rmPhone" name="phone" type="tel" autoComplete="tel" required placeholder="(310) 555-0123" />
              </div>
              <div className="field">
                <label htmlFor="rmEmail">
                  Email <span className="rm-optional">(optional)</span>
                </label>
                <input id="rmEmail" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
              </div>
              <div className="rm-actions">
                <button className="rm-back" type="button" onClick={() => setStep(2)}>Back</button>
                <button className="btn btn-gold" type="submit">See my estimate</button>
              </div>
              <p className="form-note">By sending, you agree QRS may call or text you about your project. No spam, ever.</p>
            </form>
          </section>

          {/* Step 4: cost summary + financing */}
          <section data-panel="4" hidden={step !== 4} className="rm-quote">
            <span className="rm-kicker">✓ Estimate ready</span>
            <h3 id="rmDoneTitle">
              {quote ? `Thanks, ${String(quote.name).trim().split(' ')[0]}! Here's your estimate` : "Here's your estimate"}
            </h3>

            <div className="rm-price" aria-live="polite">
              <span id="rmPriceLabel">{ests.length === 1 ? ests[0].label : ests.length ? 'Roof replacement: ' + quote.materials.join(', ') : 'Roof replacement'}</span>
              <b id="rmPrice">{ests.length ? money(low) + ' – ' + money(high) : '—'}</b>
              {ests.length > 1 && (
                <dl className="rm-compare">
                  {ests.map((e) => (
                    <div key={e.material}>
                      <dt>{e.material}</dt>
                      <dd>{money(e.low)} – {money(e.high)}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <small id="rmPriceMeta">{priceMeta}</small>
            </div>

            <fieldset className="rm-types">
              <legend>
                Compare materials <small>Pick one or more</small>
              </legend>
              <div id="rmMats">
                {quote && MATERIALS.map((material, i) => (
                  <Fragment key={material}>
                    <input
                      type="checkbox"
                      name="rmMat"
                      id={`rmMat${i}`}
                      value={material}
                      checked={quote.materials.includes(material)}
                      onChange={() => setQuote((q) => {
                        const next = toggle(q.materials, material, MATERIALS);
                        return next.length ? { ...q, materials: next } : q; // always compare at least one
                      })}
                    />
                    <label htmlFor={`rmMat${i}`}>{material}</label>
                  </Fragment>
                ))}
              </div>
            </fieldset>

            <div className="rm-fin">
              <div className="rm-fin-head">
                <b>Financing</b>
                <span>
                  As low as <strong id="rmFinLow">{ests.length ? money(monthly(low, LONGEST_TERM)) + '/mo' : '—'}</strong>
                </span>
              </div>
              <fieldset className="rm-types rm-terms">
                <legend>Loan term</legend>
                <div id="rmTerms">
                  {FINANCE.terms.map((years, i) => (
                    <Fragment key={years}>
                      <input type="radio" name="rmTermPick" id={`rmTermPick${i}`} value={String(years)} checked={term === years} onChange={() => setTerm(years)} />
                      <label htmlFor={`rmTermPick${i}`}>{years} years</label>
                    </Fragment>
                  ))}
                </div>
              </fieldset>
              <div className="rm-fin-row">
                <span>Est. monthly payment</span>
                <b id="rmMonthly" className={payments.length > 1 ? 'rm-range-pay' : undefined}>
                  {ests.length ? (
                    <>
                      {money(Math.min(...payments))}
                      {payments.length > 1 && ' – ' + money(Math.max(...payments))}
                      <small>/mo</small>
                    </>
                  ) : '—'}
                </b>
              </div>
              <p id="rmFinNote">
                {ests.length > 0 &&
                  `Example ${ests.length > 1 ? 'payments on the middle of each material’s range' : 'payment on the middle of your range'}, ${term} years at ${FINANCE.apr}% APR. For illustration only, not an offer of credit. Subject to credit approval.`}
              </p>
              <a className="btn btn-dark" id="rmFinBtn" href={FINANCING_URL || TEL} {...(FINANCING_URL ? { target: '_blank', rel: 'noopener' } : {})}>
                Check my financing options
              </a>
            </div>

            <p>A ballpark from your answers, not a final quote. Your exact price comes after a free on-site inspection.</p>
            <a className="btn btn-gold" href={TEL}>Book my free inspection · {PHONE}</a>
            <button className="rm-link" type="button" id="rmAgain" onClick={startOver}>Start over with another roof</button>
          </section>
        </div>
      </aside>
    </div>
  );
}
