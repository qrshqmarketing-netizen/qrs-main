'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@/components/ui/icons';
import { miles, nominatimSearch } from '@/lib/geo';
import { loadLeaflet, qrsPin } from '@/lib/leaflet';
import './ServiceArea.css'; // same map shell as the service area map (.area, .loc-*)
import './ProjectMap.css';

// A visitor farther than this from every project (by IP location) keeps the overview of all pins
const NEARBY_MI = 100;

// The project closest to a [lat, lng] point: { index, distance } (miles)
function nearestProject(projects, point) {
  let index = 0, distance = Infinity;
  projects.forEach((p, i) => {
    const d = miles(point, p.geo);
    if (d < distance) { distance = d; index = i; }
  });
  return { index, distance };
}

// Map of finished projects (Leaflet + OpenStreetMap tiles) with a project list and ZIP code lookup, on /projects/.
// projects: [{ title, path, place, geo: [lat, lng], image }] (PROJECT_PAGES in data/pages/projects.js).
// On load it zooms to the project closest to the visitor's approximate IP location; a ZIP code search does the same
// for that ZIP. Each pin and list item links to the project's page.
export default function ProjectMap({ projects, heading, sub }) {
  const wrapRef = useRef(null);
  const mapEl = useRef(null);
  const map = useRef(null); // { L, map, markers, searchPin, active }

  const [active, setActive] = useState(-1);
  const [zip, setZip] = useState('');
  const [msg, setMsg] = useState(null);
  const [offline, setOffline] = useState(false);

  // Highlight a project (only uses refs and setActive, so the map's click handlers can call it)
  const select = (i, fly) => {
    const m = map.current;
    if (!m) return;
    if (m.active > -1) m.markers[m.active].setIcon(qrsPin(m.L, false));
    m.active = i;
    m.markers[i].setIcon(qrsPin(m.L, true));
    setActive(i);
    if (fly) {
      m.map.flyTo(projects[i].geo, 12, { duration: 0.8 });
      m.markers[i].openPopup();
    }
  };

  useEffect(() => {
    let cancelled = false;
    const mobileLayout = window.matchMedia('(max-width: 900px)').matches;
    loadLeaflet().then(
      (L) => {
        if (cancelled || !mapEl.current) return;
        const leafletMap = L.map(mapEl.current, {
          dragging: !mobileLayout,
          touchZoom: !mobileLayout,
          doubleClickZoom: !mobileLayout,
          boxZoom: !mobileLayout,
          keyboard: !mobileLayout,
          scrollWheelZoom: false,
        });
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          referrerPolicy: 'strict-origin-when-cross-origin',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(leafletMap);

        const markers = projects.map((p, i) =>
          L.marker(p.geo, { icon: qrsPin(L, false), title: p.title, alt: p.title })
            .addTo(leafletMap)
            .bindPopup('<b>' + p.title + '</b>' + p.place + '<br><a href="' + p.path + '">View project →</a>')
            .on('click', () => select(i, false))
        );
        leafletMap.fitBounds(L.featureGroup(markers).getBounds().pad(0.3), { maxZoom: 12 });
        map.current = { L, map: leafletMap, markers, searchPin: null, active: -1 };

        // Start on the project closest to the visitor, unless they've already picked one or searched a ZIP code
        fetch('/api/location/')
          .then((res) => res.json())
          .then(({ lat, lng }) => {
            const m = map.current;
            if (cancelled || !m || lat == null || m.active > -1) return;
            const { index, distance } = nearestProject(projects, [lat, lng]);
            if (distance > NEARBY_MI) return;
            m.map.setView(projects[index].geo, 12);
            select(index, false);
            setMsg((current) => current || <>The closest project to you: <b>{projects[index].title}</b>.</>);
          })
          .catch(() => {}); // no location: keep the overview of every project
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

  // ZIP lookup via OpenStreetMap Nominatim: show that ZIP and the project closest to it
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
      const { index, distance } = nearestProject(projects, pt);
      m.searchPin?.remove();
      m.searchPin = m.L.circleMarker(pt, { radius: 8, color: '#fff', weight: 3, fillColor: '#062d57', fillOpacity: 1 }).addTo(m.map);
      select(index, false);
      m.map.flyToBounds(m.L.latLngBounds([pt, projects[index].geo]).pad(0.5), { duration: 0.8, maxZoom: 12 });
      const away = distance < 1 ? 'less than a mile away' : `about ${Math.round(distance)} mile${Math.round(distance) === 1 ? '' : 's'} away`;
      setMsg(<>Closest to {z}: <b>{projects[index].title}</b>, {away}.</>);
    } catch {
      setMsg(<>We couldn&rsquo;t find {z}. Check the ZIP code and try again.</>);
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else wrapRef.current.requestFullscreen?.();
  };

  return (
    <section className="area proj-area" id="project-map">
      <div className="container">
        <h2>{heading}</h2>
        <p className="area-sub">{sub}</p>

        <div className="loc-wrap" ref={wrapRef}>
          <aside className="loc-panel">
            <div className="loc-search">
              <div className="loc-search-title">
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <circle cx="16" cy="16" r="15" fill="none" stroke="#d4b572" strokeWidth="1.6" />
                  <path d="M16 7.5a6 6 0 0 0-6 6c0 4.5 6 10.5 6 10.5s6-6 6-10.5a6 6 0 0 0-6-6Z" fill="#d4b572" />
                  <circle cx="16" cy="13.5" r="2.3" fill="#0f2c55" />
                </svg>
                <span>Find the Project Closest to You</span>
              </div>
              <form className="loc-form" noValidate onSubmit={onSearch}>
                <label htmlFor="projZip" className="sr-only">ZIP code</label>
                <input id="projZip" inputMode="numeric" maxLength={5} autoComplete="postal-code" placeholder="Enter Zip Code" value={zip} onChange={(e) => setZip(e.target.value)} />
                <button type="submit" aria-label="Search ZIP code">
                  <ArrowRight />
                </button>
              </form>
              <div className="loc-msg" role="status" aria-live="polite">{msg}</div>
            </div>

            <ul className="loc-list">
              {projects.map((p, i) => (
                <li
                  className={'loc-item proj-item' + (active === i ? ' active' : '')}
                  tabIndex={0}
                  key={p.path}
                  onClick={(e) => !e.target.closest('a') && select(i, true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      select(i, true);
                    }
                  }}
                >
                  <Image className="proj-thumb" src={p.image} alt="" width={84} height={64} sizes="84px" />
                  <div>
                    <span className="proj-place">{p.place}</span>
                    <h3>
                      <Link href={p.path} prefetch={false}>{p.title}</Link>
                    </h3>
                    <Link className="proj-link" href={p.path} prefetch={false} tabIndex={-1} aria-hidden="true">
                      View project <span className="arrow">→</span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          <div className="loc-map-box">
            <div className="proj-map" ref={mapEl} role="region" aria-label="Map of QRS roofing projects">
              {offline && (
                <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: '#cfdae5', fontSize: '.9rem' }}>Map unavailable offline</div>
              )}
            </div>
            <button className="loc-full" type="button" aria-label="Toggle full screen map" onClick={toggleFullscreen}>
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
