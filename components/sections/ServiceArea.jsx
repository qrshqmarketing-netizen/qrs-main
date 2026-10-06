'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/ui/icons';
import { cityPath, citiesIn, LOCATIONS, REGIONS, SERVICE_RADIUS_MI } from '@/data/locations';
import { PHONE } from '@/data/site';
import { miles, nominatimSearch, pointInGeoJson, zipPrefixServed } from '@/lib/geo';
import { loadLeaflet } from '@/lib/leaflet';
import './ServiceArea.css';
import Mark from '@/components/ui/Mark';

// The QRS location closest to a [lat, lng] point: { location, distance } (miles)
function nearestLocation(point) {
  let location = LOCATIONS[0], distance = Infinity;
  LOCATIONS.forEach((l) => {
    const d = miles(point, [l.lat, l.lng]);
    if (d < distance) { distance = d; location = l; }
  });
  return { location, distance };
}

// Service area map: a ZIP code check, the Los Angeles and Orange County borders plus the Inland Empire (western Riverside County
// and the southwest corner of San Bernardino County, from Pomona to Riverside, Corona and Temecula) outlined on an OpenStreetMap
// map (data/serviceAreaOutline.js), and a link to every city page that exists (the Inland Empire has none yet). The map library, its tiles and the outline load only
// when the map is about to scroll into view. Mobile keeps the map still so it never traps a page swipe.
export default function ServiceArea({
  hideCities = false, // true: the city links under the map are never shown, not even after a ZIP search (home page); they stay in the page's HTML
  heading = 'Locations We Proudly __Serve__',
  sub = 'The outlined area is where we work: Los Angeles County, Orange County, and the Inland Empire from Pomona to Riverside, Corona and Temecula. Enter your ZIP code to confirm we cover you.',
}) {
  const wrapRef = useRef(null);
  const mapEl = useRef(null);
  const map = useRef(null); // { L, map, zipPin }

  const [zip, setZip] = useState('');
  const [msg, setMsg] = useState(null);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let cancelled = false, watcher;
    const mobileLayout = window.matchMedia('(max-width: 900px)').matches;
    const begin = async () => {
      try {
        const [L, { SERVICE_AREA_OUTLINE, SERVICE_AREA_BOUNDS }] = await Promise.all([loadLeaflet(), import('@/data/serviceAreaOutline')]);
        if (cancelled || !mapEl.current) return;
        const leafletMap = L.map(mapEl.current, {
          dragging: !mobileLayout,
          touchZoom: !mobileLayout,
          doubleClickZoom: !mobileLayout,
          boxZoom: !mobileLayout,
          keyboard: !mobileLayout,
          scrollWheelZoom: false,
          zoomControl: true,
          attributionControl: true,
        });
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          referrerPolicy: 'strict-origin-when-cross-origin',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(leafletMap);
        L.geoJSON(SERVICE_AREA_OUTLINE, {
          interactive: false,
          style: { color: '#062d57', weight: 3, opacity: 0.9, fillColor: '#d4b572', fillOpacity: 0.22 },
        }).addTo(leafletMap);
        leafletMap.fitBounds(SERVICE_AREA_BOUNDS);
        map.current = { L, map: leafletMap, zipPin: null };
      } catch {
        if (!cancelled) setOffline(true); // map library didn't load: the ZIP check and the city links still work
      }
    };

    // The map library and its tiles are fetched only once the map is about to scroll into view
    const wrap = wrapRef.current;
    if (wrap && 'IntersectionObserver' in window) {
      watcher = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          watcher.disconnect();
          begin();
        }
      }, { rootMargin: '400px' });
      watcher.observe(wrap);
    } else {
      begin();
    }

    const onFullscreen = () => setTimeout(() => map.current?.map.invalidateSize(), 150);
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => {
      cancelled = true;
      watcher?.disconnect();
      document.removeEventListener('fullscreenchange', onFullscreen);
      map.current?.map.remove();
      map.current = null;
    };
  }, []);

  // ZIP lookup via OpenStreetMap Nominatim, with an LA/OC ZIP-prefix fallback. Three answers: within SERVICE_RADIUS_MI of one of
  // our cities ("in our service area"), inside the outlined counties but farther out (call to confirm), or outside the outline.
  const onSearch = async (e) => {
    e.preventDefault();
    const z = zip.trim();
    if (!/^\d{5}$/.test(z)) {
      setMsg('Please enter a 5-digit ZIP code.');
      return;
    }
    setMsg('Checking ' + z + '…');
    try {
      const hit = await nominatimSearch('postalcode=' + z);
      if (!hit) throw new Error('none');
      const pt = [+hit.lat, +hit.lon];
      const { location, distance } = nearestLocation(pt);
      const inArea = distance <= SERVICE_RADIUS_MI;
      const { SERVICE_AREA_OUTLINE } = await import('@/data/serviceAreaOutline');
      const insideOutline = inArea || pointInGeoJson(pt, SERVICE_AREA_OUTLINE);
      const m = map.current;
      if (m) {
        m.zipPin?.remove();
        m.zipPin = m.L.circleMarker(pt, { radius: 8, color: '#fff', weight: 3, fillColor: '#062d57', fillOpacity: 1 }).addTo(m.map);
        m.map.flyToBounds(m.L.latLngBounds([pt, [location.lat, location.lng]]).pad(inArea ? 0.6 : 0.3), { duration: 0.8, maxZoom: 12 });
      }
      setMsg(inArea
        ? <><b>Good news!</b> {z} is in our service area. Nearest: <Link href={cityPath(location.slug)} prefetch={false}>QRS {location.city}</Link>.</>
        : insideOutline
          ? <><b>Good news!</b> {z} is inside the area we serve, a longer drive from our nearest city. Call <b>{PHONE}</b> to confirm scheduling.</>
          : <>{z} looks outside our current area. Call <b>{PHONE}</b> and we&rsquo;ll let you know.</>);
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
        <h2><Mark text={heading} /></h2>
        <p className="area-sub">{sub}</p>

        <div className="sa-wrap" id="locWrap" ref={wrapRef}>
          <div className="loc-search">
            <div className="loc-search-title">
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <circle cx="16" cy="16" r="15" fill="none" stroke="#d4b572" strokeWidth="1.6" />
                <path d="M16 7.5a6 6 0 0 0-6 6c0 4.5 6 10.5 6 10.5s6-6 6-10.5a6 6 0 0 0-6-6Z" fill="#d4b572" />
                <circle cx="16" cy="13.5" r="2.3" fill="#0f2c55" />
              </svg>
              <span>Find Your Nearest QRS Service Area</span>
            </div>
            <div className="sa-zip">
              <form className="loc-form" id="locForm" noValidate onSubmit={onSearch}>
                <label htmlFor="locZip" className="sr-only">ZIP code</label>
                <input id="locZip" inputMode="numeric" maxLength={5} autoComplete="postal-code" placeholder="Enter Zip Code" value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))} />
                <button type="submit" aria-label="Search ZIP code">
                  <ArrowRight />
                </button>
              </form>
              <div className="loc-msg" id="locMsg" role="status" aria-live="polite">{msg}</div>
            </div>
          </div>

          <div className="loc-map-box">
            <div id="qrsMap" ref={mapEl} role="region" aria-label="Map outlining the Los Angeles County, Orange County and Inland Empire area QRS serves">
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

        {/* Still in the page's HTML when hidden, so the links stay crawlable; a ZIP search never shows them */}
        <nav className="sa-cities" aria-label="Cities we serve" hidden={hideCities}>
          {REGIONS.map((region) => (
            <div key={region.slug}>
              <h3>{region.name}</h3>
              <ul>
                {citiesIn(region.slug).map(({ city, slug }) => (
                  <li key={slug}>
                    <Link href={cityPath(slug)} prefetch={false}>{city} roofing</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
