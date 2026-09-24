'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/ui/icons';
import { cityPath, LOCATIONS, SERVICE_RADIUS_MI } from '@/data/locations';
import { PHONE, TEL } from '@/data/site';
import { miles, nominatimSearch, zipPrefixServed } from '@/lib/geo';
import { loadLeaflet, qrsPin } from '@/lib/leaflet';
import './ServiceArea.css';

// Service area map (Leaflet + OpenStreetMap tiles) with a city list and ZIP code lookup.
// City pages pass `focus` (a city slug) to start zoomed in on that city.
export default function ServiceArea({
  heading = 'Locations We Proudly Serve',
  sub = 'Explore the map below to find out if your city is within our Southern California service area',
  focus,
}) {
  const wrapRef = useRef(null);
  const mapEl = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const map = useRef(null); // { L, map, markers, icon, searchPin, active }

  const [active, setActive] = useState(-1);
  const [zip, setZip] = useState('');
  const [msg, setMsg] = useState(null);
  const [offline, setOffline] = useState(false);

  // Highlight a city (only uses refs and setActive, so the map's click handlers can call it)
  const select = (i, fly) => {
    const m = map.current;
    if (!m) return;
    if (m.active > -1) m.markers[m.active].setIcon(m.icon(false));
    m.active = i;
    m.markers[i].setIcon(m.icon(true));
    setActive(i);

    // Keep the selected city visible in the list
    const list = listRef.current, li = itemRefs.current[i];
    const top = li.offsetTop, bottom = top + li.offsetHeight;
    if (top < list.scrollTop || bottom > list.scrollTop + list.clientHeight) list.scrollTo({ top: top - 8, behavior: 'smooth' });

    if (fly) {
      m.map.flyTo(m.markers[i].getLatLng(), 11, { duration: 0.8 });
      m.markers[i].openPopup();
    }
  };

  useEffect(() => {
    let cancelled = false;
    loadLeaflet().then(
      (L) => {
        if (cancelled || !mapEl.current) return;
        const leafletMap = L.map(mapEl.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true })
          .setView([33.9, -118.12], 9);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          referrerPolicy: 'strict-origin-when-cross-origin',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(leafletMap);

        const icon = (isActive) => qrsPin(L, isActive);
        const markers = LOCATIONS.map(({ city, slug, lat, lng }, i) =>
          L.marker([lat, lng], { icon: icon(false), title: 'QRS ' + city, alt: 'QRS ' + city })
            .addTo(leafletMap)
            .bindPopup('<b>QRS ' + city + '</b><a href="' + TEL + '">' + PHONE + '</a><br><a href="#estimate">Get an estimate →</a><br><a href="' + cityPath(slug) + '">' + city + ' roofing →</a>')
            .on('click', () => select(i, false))
        );
        // Fit all pins, or zoom in on this page's city
        leafletMap.fitBounds(L.featureGroup(markers).getBounds().pad(0.25));
        map.current = { L, map: leafletMap, markers, icon, searchPin: null, active: -1 };
        const focusIndex = LOCATIONS.findIndex((l) => l.slug === focus);
        if (focusIndex > -1) {
          leafletMap.setView(markers[focusIndex].getLatLng(), 11);
          select(focusIndex, false);
        }
      },
      () => !cancelled && setOffline(true) // map library didn't load: the list still works
    );

    const onFullscreen = () => setTimeout(() => map.current?.map.invalidateSize(), 150);
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => {
      cancelled = true;
      document.removeEventListener('fullscreenchange', onFullscreen);
      map.current?.map.remove();
      map.current = null;
    };
  }, []);

  // ZIP lookup via OpenStreetMap Nominatim, with an LA/OC ZIP-prefix fallback
  const onSearch = async (e) => {
    e.preventDefault();
    const z = zip.trim();
    if (!/^\d{5}$/.test(z)) {
      setMsg('Please enter a 5-digit ZIP code.');
      return;
    }
    setMsg('Checking ' + z + '…');
    try {
      const m = map.current;
      const hit = await nominatimSearch('postalcode=' + z);
      if (!hit || !m) throw new Error('none');
      const pt = [+hit.lat, +hit.lon];
      let best = 0, bestD = Infinity;
      LOCATIONS.forEach((l, i) => {
        const d = miles(pt, [l.lat, l.lng]);
        if (d < bestD) { bestD = d; best = i; }
      });
      m.searchPin?.remove();
      m.searchPin = m.L.circleMarker(pt, { radius: 8, color: '#fff', weight: 3, fillColor: '#062d57', fillOpacity: 1 }).addTo(m.map);
      const bounds = m.L.latLngBounds([pt, m.markers[best].getLatLng()]);
      if (bestD <= SERVICE_RADIUS_MI) {
        setMsg(<><b>Good news!</b> {z} is in our service area. Nearest: QRS {LOCATIONS[best].city}.</>);
        select(best, false);
        m.map.flyToBounds(bounds.pad(0.6), { duration: 0.8, maxZoom: 12 });
      } else {
        setMsg(<>{z} looks outside our current area. Call <b>{PHONE}</b> and we'll let you know.</>);
        m.map.flyToBounds(bounds.pad(0.3), { duration: 0.8 });
      }
    } catch {
      setMsg(zipPrefixServed(z)
        ? <><b>Good news!</b> {z} is in our Southern California service area.</>
        : <>{z} may be outside our area. Call <b>{PHONE}</b> to confirm.</>);
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else wrapRef.current.requestFullscreen?.();
  };

  return (
    <section className="area" id="service-area">
      <div className="container">
        <h2>{heading}</h2>
        <p className="area-sub">{sub}</p>

        <div className="loc-wrap" id="locWrap" ref={wrapRef}>
          <aside className="loc-panel">
            <div className="loc-search">
              <div className="loc-search-title">
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <circle cx="16" cy="16" r="15" fill="none" stroke="#ffb82e" strokeWidth="1.6" />
                  <path d="M16 7.5a6 6 0 0 0-6 6c0 4.5 6 10.5 6 10.5s6-6 6-10.5a6 6 0 0 0-6-6Z" fill="#ffb82e" />
                  <circle cx="16" cy="13.5" r="2.3" fill="#0f2c55" />
                </svg>
                <span>Find Your Nearest QRS Service Area</span>
              </div>
              <form className="loc-form" id="locForm" noValidate onSubmit={onSearch}>
                <label htmlFor="locZip" className="sr-only">ZIP code</label>
                <input id="locZip" inputMode="numeric" maxLength={5} autoComplete="postal-code" placeholder="Enter Zip Code" value={zip} onChange={(e) => setZip(e.target.value)} />
                <button type="submit" aria-label="Search ZIP code">
                  <ArrowRight />
                </button>
              </form>
              <div className="loc-msg" id="locMsg" role="status" aria-live="polite">{msg}</div>
            </div>

            <ul className="loc-list" id="locList" ref={listRef}>
              {LOCATIONS.map(({ city, slug }, i) => (
                <li
                  className={'loc-item' + (active === i ? ' active' : '')}
                  tabIndex={0}
                  key={city}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  onClick={(e) => !e.target.closest('a') && select(i, true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      select(i, true);
                    }
                  }}
                >
                  <h3>
                    <Link href={cityPath(slug)} prefetch={false}>QRS {city}</Link>
                  </h3>
                  <a className="loc-phone" href={TEL}>{PHONE}</a>
                  <a className="loc-btn" href="#estimate">Get Estimate</a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="loc-map-box">
            <div id="qrsMap" ref={mapEl} role="region" aria-label="Map of the QRS Southern California service area">
              {offline && (
                <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: '#cfdae5', fontSize: '.9rem' }}>Map unavailable offline</div>
              )}
            </div>
            <button className="loc-full" id="locFull" type="button" aria-label="Toggle full screen map" onClick={toggleFullscreen}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
                <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
