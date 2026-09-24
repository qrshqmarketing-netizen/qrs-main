'use client';

import { useEffect, useRef, useState } from 'react';
import { LOCATIONS, PHONE, SERVICE_RADIUS_MI, TEL } from '@/data/site';
import { ArrowRight } from './Icons';

const PIN_SVG =
  '<svg viewBox="0 0 34 44" aria-hidden="true"><path d="M17 1C8.2 1 1 8 1 16.7 1 28.5 17 43 17 43s16-14.5 16-26.3C33 8 25.8 1 17 1Z" fill="#ffb82e" stroke="#062d57" stroke-width="2"/><g transform="translate(6.5 5.5) scale(.33)"><path d="M32 7c-9 2-16 9-18 18 4-3 8-4 12-4-6 6-9 13-7 21 4-4 8-6 13-7v15h6V35c5 1 9 3 13 7 2-8-1-15-7-21 4 0 8 1 12 4C48 16 41 9 32 7Z" fill="#062d57"/></g></svg>';

const miles = (a, b) => {
  const R = 3958.8, r = (x) => (x * Math.PI) / 180;
  const dLat = r(b[0] - a[0]), dLng = r(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a[0])) * Math.cos(r(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
// LA County (900–918, 935) and Orange County (926–928) ZIP prefixes — fallback if lookup fails
const prefixServed = (z) => { const p = +z.slice(0, 3); return (p >= 900 && p <= 918) || p === 935 || (p >= 926 && p <= 928); };

export default function ServiceArea() {
  const wrapRef = useRef(null);
  const mapEl = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const mapRef = useRef(null);
  const LRef = useRef(null);
  const markersRef = useRef([]);
  const searchPinRef = useRef(null);
  const activeRef = useRef(-1);

  const [active, setActive] = useState(-1);
  const [zip, setZip] = useState('');
  const [msg, setMsg] = useState(null);

  const icon = (isActive) =>
    LRef.current.divIcon({ className: 'qrs-pin' + (isActive ? ' active' : ''), html: PIN_SVG, iconSize: [34, 44], iconAnchor: [17, 43], popupAnchor: [0, -38] });

  const select = (i, fly) => {
    const markers = markersRef.current;
    if (!markers.length) return;
    if (activeRef.current > -1) markers[activeRef.current].setIcon(icon(false));
    activeRef.current = i;
    markers[i].setIcon(icon(true));
    setActive(i);

    const list = listRef.current, li = itemRefs.current[i];
    if (list && li) {
      const top = li.offsetTop, bottom = top + li.offsetHeight;
      if (top < list.scrollTop || bottom > list.scrollTop + list.clientHeight) list.scrollTo({ top: top - 8, behavior: 'smooth' });
    }
    if (fly) {
      mapRef.current.flyTo(markers[i].getLatLng(), 11, { duration: 0.8 });
      markers[i].openPopup();
    }
  };

  // Init Leaflet (client-only)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !mapEl.current || mapRef.current) return;
      LRef.current = L;

      const map = L.map(mapEl.current, { scrollWheelZoom: false }).setView([33.9, -118.12], 9);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        referrerPolicy: 'strict-origin-when-cross-origin',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      mapRef.current = map;

      markersRef.current = LOCATIONS.map(([city, lat, lng], i) =>
        L.marker([lat, lng], { icon: icon(false), title: 'QRS ' + city, alt: 'QRS ' + city })
          .addTo(map)
          .bindPopup(`<b>QRS ${city}</b><a href="${TEL}">${PHONE}</a><br><a href="#estimate">Get an estimate →</a>`)
          .on('click', () => select(i, false))
      );
      map.fitBounds(L.featureGroup(markersRef.current).getBounds().pad(0.25));
    })();

    const onFs = () => setTimeout(() => mapRef.current && mapRef.current.invalidateSize(), 150);
    document.addEventListener('fullscreenchange', onFs);
    return () => {
      cancelled = true;
      document.removeEventListener('fullscreenchange', onFs);
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
      markersRef.current = [];
      activeRef.current = -1;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = async (e) => {
    e.preventDefault();
    const z = zip.trim();
    if (!/^\d{5}$/.test(z)) { setMsg({ text: 'Please enter a 5-digit ZIP code.' }); return; }
    setMsg({ text: `Checking ${z}…` });
    const L = LRef.current, map = mapRef.current;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&postalcode=${z}`);
      const data = await res.json();
      if (!data.length || !L || !map) throw new Error('none');
      const pt = [+data[0].lat, +data[0].lon];
      let best = 0, bestD = Infinity;
      LOCATIONS.forEach((l, i) => { const d = miles(pt, [l[1], l[2]]); if (d < bestD) { bestD = d; best = i; } });
      if (searchPinRef.current) searchPinRef.current.remove();
      searchPinRef.current = L.circleMarker(pt, { radius: 8, color: '#fff', weight: 3, fillColor: '#062d57', fillOpacity: 1 }).addTo(map);
      const bounds = L.latLngBounds([pt, markersRef.current[best].getLatLng()]);
      if (bestD <= SERVICE_RADIUS_MI) {
        setMsg({ good: true, text: `${z} is in our service area. Nearest: QRS ${LOCATIONS[best][0]}.` });
        select(best, false);
        map.flyToBounds(bounds.pad(0.6), { duration: 0.8, maxZoom: 12 });
      } else {
        setMsg({ text: `${z} looks outside our current area. Call `, phone: true, after: ' and we’ll let you know.' });
        map.flyToBounds(bounds.pad(0.3), { duration: 0.8 });
      }
    } catch {
      setMsg(prefixServed(z)
        ? { good: true, text: `${z} is in the LA / Orange County area we serve.` }
        : { text: `${z} may be outside our area. Call `, phone: true, after: ' to confirm.' });
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (wrapRef.current?.requestFullscreen) wrapRef.current.requestFullscreen();
  };

  return (
    <section className="area" id="service-area">
      <div className="container">
        <h2>Locations We Proudly Serve</h2>
        <p className="area-sub">Explore the map below to find out if your city is within our Southern California service area</p>

        <div className="loc-wrap" ref={wrapRef}>
          <aside className="loc-panel">
            <div className="loc-search">
              <div className="loc-search-title">
                <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="none" stroke="#ffb82e" strokeWidth="1.6" /><path d="M16 7.5a6 6 0 0 0-6 6c0 4.5 6 10.5 6 10.5s6-6 6-10.5a6 6 0 0 0-6-6Z" fill="#ffb82e" /><circle cx="16" cy="13.5" r="2.3" fill="#0f2c55" /></svg>
                <span>Find Your Nearest QRS Service Area</span>
              </div>
              <form className="loc-form" onSubmit={onSearch} noValidate>
                <label htmlFor="locZip" style={{ position: 'absolute', left: '-9999px' }}>ZIP code</label>
                <input id="locZip" inputMode="numeric" maxLength={5} autoComplete="postal-code" placeholder="Enter Zip Code" value={zip} onChange={(e) => setZip(e.target.value)} />
                <button type="submit" aria-label="Search ZIP code"><ArrowRight strokeWidth={2.4} /></button>
              </form>
              <div className="loc-msg" role="status" aria-live="polite">
                {msg && (
                  <>
                    {msg.good && <b>Good news! </b>}
                    {msg.text}
                    {msg.phone && <b>{PHONE}</b>}
                    {msg.after}
                  </>
                )}
              </div>
            </div>

            <ul className="loc-list" ref={listRef}>
              {LOCATIONS.map(([city], i) => (
                <li
                  key={city}
                  ref={(el) => (itemRefs.current[i] = el)}
                  className={`loc-item${active === i ? ' active' : ''}`}
                  tabIndex={0}
                  onClick={(e) => { if (!e.target.closest('a')) select(i, true); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i, true); } }}
                >
                  <h3>QRS {city}</h3>
                  <a className="loc-phone" href={TEL}>{PHONE}</a>
                  <a className="loc-btn" href="#estimate">Get Estimate</a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="loc-map-box">
            <div id="qrsMap" ref={mapEl} role="region" aria-label="Map of the QRS Southern California service area"></div>
            <button className="loc-full" type="button" aria-label="Toggle full screen map" onClick={toggleFullscreen}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
