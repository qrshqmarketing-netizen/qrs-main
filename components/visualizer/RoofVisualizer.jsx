'use client';

import { useEffect, useRef, useState } from 'react';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { AERIAL_ENABLED, VISUALIZER_BRANDS, VISUALIZER_COPY } from '@/data/roofVisualizer';
import { paintAerial, prepareAerial } from './aerial';
import BeforeAfter from './BeforeAfter';
import VisualizerGate, { clearPass, postAerial, postVisualizer, savedPass } from './VisualizerGate';
import './Visualizer.css';

const MAX_SIDE = 1600;

// A phone photo can be 5 MB or more: shrink it in the browser to a 1600 px JPEG (about 0.5-1.5 MB) before it is sent
function shrink(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.86));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('We couldn’t open that photo. Please try a JPEG or PNG.'));
    };
    img.src = url;
  });
}

const STEPS = ['Looking at your roof…', 'Choosing the right shingle scale…', 'Applying the new color…', 'Matching your light and shadows…', 'Almost there…'];

// The tool: the gate first (name and email), then photo → manufacturer → swatch → the picture with a before/after slider and a button to book.
export default function RoofVisualizer() {
  const [token, setToken] = useState(null); // null: not read yet, '': no pass
  const [photo, setPhoto] = useState('');
  const [brandId, setBrandId] = useState(VISUALIZER_BRANDS[0].id);
  const [colorId, setColorId] = useState('');
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [mode, setMode] = useState(AERIAL_ENABLED ? 'address' : 'photo'); // 'address': the roof seen from above, found from the address; 'photo': the visitor's own photo
  const [address, setAddress] = useState('');
  const [aerial, setAerial] = useState(null); // { prep, before, label, date } once the address was found
  const [painted, setPainted] = useState('');
  const resultRef = useRef(null);

  useEffect(() => setToken(savedPass()), []);
  useEffect(() => {
    if (!busy) return undefined;
    const t = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 5000);
    return () => clearInterval(t);
  }, [busy]);

  const brand = VISUALIZER_BRANDS.find((b) => b.id === brandId);
  const color = brand.colors.find((c) => c.id === colorId);

  // From an address, a new color is painted in the browser at once
  useEffect(() => {
    if (aerial && color) setPainted(paintAerial(aerial.prep, color.hex));
    else setPainted('');
  }, [aerial, color]);

  async function pick(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError('');
    setResult(null);
    try {
      setPhoto(await shrink(file));
    } catch (err) {
      setError(err.message);
    }
  }

  async function findRoof(e) {
    e?.preventDefault();
    if (busy || address.trim().length < 6) return;
    setBusy(true);
    setStep(0);
    setError('');
    setAerial(null);
    try {
      const res = await postAerial({ action: 'aerial', token, address });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        clearPass();
        setToken('');
        return;
      }
      if (!res.ok || !data.before) throw new Error(data.message || 'We couldn’t find that roof. Please try again, or upload a photo instead.');
      const prep = await prepareAerial(data.before, data.mask);
      setAerial({ prep, before: prep.before, label: data.label, date: data.imageryDate });
      if (typeof window.gtag === 'function') window.gtag('event', 'visualizer_address');
    } catch (err) {
      setError(err.message || 'We couldn’t open the picture. Please try again, or upload a photo instead.');
    } finally {
      setBusy(false);
    }
  }

  async function render() {
    if (!photo || !color || busy) return;
    setBusy(true);
    setStep(0);
    setError('');
    try {
      const res = await postVisualizer({ action: 'render', token, image: photo, brand: brand.id, color: color.id });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        clearPass();
        setToken('');
        return;
      }
      if (!res.ok || !data.image) throw new Error(data.message || 'We couldn’t make that preview. Please try again.');
      setResult({ image: data.image, brand: data.brand, line: data.line, generic: data.generic, color: data.color });
      if (typeof window.gtag === 'function') window.gtag('event', 'visualizer_render', { brand: data.brand, color: data.color });
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (token === null) return <div className="viz viz-loading" aria-busy="true" />;
  if (!token) return <div className="viz"><VisualizerGate onDone={setToken} /></div>;

  const fromAddress = mode === 'address';
  const colorStep = VISUALIZER_BRANDS.length > 1 ? 3 : 2;
  const resultTitle = (generic, brandName, line, colorName) => (generic ? `${colorName} roof` : `${brandName} ${line} in ${colorName}`);

  return (
    <div className="viz">
      <ol className="viz-steps">
        <li className="viz-step">
          <h3><span>1</span> Your roof</h3>
          {AERIAL_ENABLED && (
            <div className="viz-tabs" role="tablist" aria-label="How to show your roof">
              <button type="button" role="tab" aria-selected={fromAddress} className={fromAddress ? 'on' : ''} onClick={() => { setMode('address'); setError(''); setResult(null); }}>Use my address</button>
              <button type="button" role="tab" aria-selected={!fromAddress} className={!fromAddress ? 'on' : ''} onClick={() => { setMode('photo'); setError(''); }}>Upload a photo</button>
            </div>
          )}

          {fromAddress ? (
            <form className="viz-address" onSubmit={findRoof}>
              <p className="viz-hint">Enter your street address and we’ll pull up the sharpest aerial picture of your roof that’s available.</p>
              <div className="viz-address-row">
                <input name="address" autoComplete="street-address" inputMode="text" placeholder="123 Main St, Los Angeles, CA" value={address} onChange={(e) => setAddress(e.target.value)} aria-label="Your address" />
                <button className="btn btn-gold" type="submit" disabled={busy || address.trim().length < 6}>
                  {busy ? 'Finding…' : <>Find my roof <ArrowRight /></>}
                </button>
              </div>
              {busy && <p className="viz-hint">Finding your roof from above. This takes about 10 seconds.</p>}
              {aerial && (
                <p className="viz-hint viz-found">
                  Found: {aerial.label}{aerial.date ? ` · imagery from ${aerial.date}` : ''}. Not your roof? Check the address and search again, or <button type="button" className="viz-link" onClick={() => setMode('photo')}>upload a photo</button>.
                </p>
              )}
            </form>
          ) : (
            <>
              {photo ? (
                <div className="viz-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo} alt="Your photo of the roof" />
                </div>
              ) : (
                <p className="viz-hint">Stand back so the whole roof is in the picture, in daylight. A photo from the street works well.</p>
              )}
              <div className="viz-photo-actions">
                <label className="btn btn-gold viz-file">
                  {photo ? 'Use a different photo' : 'Take or upload a photo'}
                  <input type="file" accept="image/*" onChange={pick} />
                </label>
              </div>
            </>
          )}
        </li>

        {VISUALIZER_BRANDS.length > 1 && (
        <li className="viz-step">
          <h3><span>2</span> Manufacturer</h3>
          <div className="viz-brands" role="radiogroup" aria-label="Manufacturer">
            {VISUALIZER_BRANDS.map((b) => (
              <button type="button" key={b.id} role="radio" aria-checked={b.id === brandId} className={b.id === brandId ? 'on' : ''} onClick={() => { setBrandId(b.id); setColorId(''); }}>
                <b>{b.name}</b>
                <small>{b.line}</small>
              </button>
            ))}
          </div>
        </li>
        )}

        <li className="viz-step">
          <h3><span>{colorStep}</span> {VISUALIZER_BRANDS.length > 1 ? 'Swatch color' : 'Roof color'}</h3>
          <div className="viz-swatches" role="radiogroup" aria-label={brand.generic ? 'Roof colors' : `${brand.name} ${brand.line} colors`}>
            {brand.colors.map((c) => (
              <button type="button" key={c.id} role="radio" aria-checked={c.id === colorId} className={c.id === colorId ? 'on' : ''} onClick={() => setColorId(c.id)}>
                <i style={c.swatch ? { backgroundImage: `url(${c.swatch})` } : { background: c.hex }} />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </li>
      </ol>

      {error && <p className="viz-error" role="alert">{error}</p>}

      {fromAddress ? (
        <>
          {!aerial && <p className="viz-hint center">Find your roof above, then pick a color.</p>}
          {aerial && !color && <p className="viz-hint center">Pick a color to see it on your roof.</p>}
          {aerial && color && painted && (
            <div className="viz-result" ref={resultRef}>
              <h3>{resultTitle(brand.generic, brand.name, brand.line, color.name)}</h3>
              <BeforeAfter before={aerial.before} after={painted} alt={`${color.name} roof`} />
              <p className="viz-fine">Aerial imagery © Google. {VISUALIZER_COPY.disclaimer}</p>
              <div className="viz-cta">
                <SiteLink className="btn btn-gold" href="/start/?need=replacement">Book a free roof evaluation <ArrowRight /></SiteLink>
                <a className="btn btn-line" href={painted} download={`roof-preview-${color.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}>Save this picture</a>
              </div>
            </div>
          )}
          {!(aerial && color) && <p className="viz-fine">{VISUALIZER_COPY.disclaimer}</p>}
        </>
      ) : (
        <>
          <button className="btn btn-gold viz-go" type="button" onClick={render} disabled={!photo || !color || busy}>
            {busy ? STEPS[step] : <>Show my new roof <ArrowRight /></>}
          </button>
          {!photo || !color ? <p className="viz-hint center">{!photo ? 'Add a photo' : 'Pick a color'} to continue.</p> : null}
          {busy && <p className="viz-hint center">This takes about 20 to 40 seconds.</p>}

          {result && (
            <div className="viz-result" ref={resultRef}>
              <h3>{resultTitle(result.generic, result.brand, result.line, result.color)}</h3>
              <BeforeAfter before={photo} after={result.image} alt={result.generic ? `${result.color} roof` : `${result.brand} ${result.color}`} />
              <p className="viz-fine">{VISUALIZER_COPY.disclaimer}</p>
              <div className="viz-cta">
                <SiteLink className="btn btn-gold" href="/start/?need=replacement">Book a free roof evaluation <ArrowRight /></SiteLink>
                <a className="btn btn-line" href={result.image} download={`roof-preview-${result.color.toLowerCase().replace(/\s+/g, '-')}.png`}>Save this picture</a>
              </div>
            </div>
          )}
          {!result && <p className="viz-fine">{VISUALIZER_COPY.disclaimer}</p>}
        </>
      )}
    </div>
  );
}
