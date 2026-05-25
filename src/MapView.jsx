import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { HITOS, RUTA_TERCER_VIAJE, RUTA_ROMA } from './data'

const ROUTE_COLORS = {
  tercer: '#f59e0b',
  roma: '#38bdf8',
}

function makeIcon(hito, isSelected) {
  const color = hito.ruta === 'tercer' ? '#f59e0b' : '#38bdf8'
  const size = isSelected ? 18 : 13
  const pulse = isSelected
    ? `<span style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.35;animation:pulse-ring 1.4s ease-out infinite;"></span>`
    : ''
  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:${size}px;height:${size}px;">
      ${pulse}
      <div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 0 8px ${color}88;"></div>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  })
}

function popupHTML(h) {
  return `
    <div style="min-width:220px;max-width:280px;padding:4px 2px;">
      <p style="font-size:11px;color:#94a3b8;margin:0 0 2px;">${h.viaje}</p>
      <h3 style="font-size:15px;font-weight:700;margin:0 0 4px;color:#f1f5f9;">${h.ciudad}</h3>
      <p style="font-size:11px;color:#f59e0b;margin:0 0 8px;font-weight:600;">${h.pasaje}</p>
      <p style="font-size:12px;color:#cbd5e1;line-height:1.5;margin:0 0 8px;">${h.resumen}</p>
      <div style="background:#0f172a;border-radius:8px;padding:8px;">
        <p style="font-size:11px;color:#f87171;font-weight:600;margin:0 0 2px;">⚠ Retos</p>
        <p style="font-size:11px;color:#94a3b8;margin:0;">${h.retos}</p>
      </div>
    </div>`
}

export default function MapView({ selectedId }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef({})

  // Init map once
  useEffect(() => {
    if (mapRef.current) return
    const map = L.map(containerRef.current, {
      center: [37, 22],
      zoom: 5,
      zoomControl: true,
    })
    L.tileLayer(
      'https://api.maptiler.com/maps/streets-v2-dark/{z}/{x}/{y}.png?key=yG83EI3I05kw7h5RszYs&language=es',
      {
        attribution: '\u00a9 <a href="https://www.maptiler.com">MapTiler</a> \u00a9 <a href="https://www.openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 20,
        language: 'es',
      }
    ).addTo(map)

    // Polylines
    L.polyline(RUTA_TERCER_VIAJE, {
      color: ROUTE_COLORS.tercer,
      weight: 3,
      opacity: 0.85,
      dashArray: '6 4',
    }).addTo(map)
    L.polyline(RUTA_ROMA, {
      color: ROUTE_COLORS.roma,
      weight: 3,
      opacity: 0.85,
      dashArray: '6 4',
    }).addTo(map)

    // Legend
    const legend = L.control({ position: 'bottomleft' })
    legend.onAdd = () => {
      const div = L.DomUtil.create('div')
      div.innerHTML = `
        <div style="background:#1e293b;border:1px solid #334155;border-radius:10px;padding:10px 14px;font-size:12px;color:#e2e8f0;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <div style="width:24px;height:3px;background:#f59e0b;border-radius:2px;"></div>
            <span>3er Viaje Misionero</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:24px;height:3px;background:#38bdf8;border-radius:2px;"></div>
            <span>Viaje a Roma</span>
          </div>
        </div>`
      return div
    }
    legend.addTo(map)

    // Markers
    HITOS.forEach((h) => {
      const marker = L.marker(h.coordenadas, { icon: makeIcon(h, false) })
        .addTo(map)
        .bindPopup(popupHTML(h), { maxWidth: 300 })
      markersRef.current[h.id] = marker
    })

    mapRef.current = map
  }, [])

  // React to selection
  useEffect(() => {
    if (!mapRef.current || !selectedId) return
    const map = mapRef.current

    HITOS.forEach((h) => {
      const m = markersRef.current[h.id]
      if (!m) return
      m.setIcon(makeIcon(h, h.id === selectedId))
    })

    const hito = HITOS.find((h) => h.id === selectedId)
    if (hito) {
      map.flyTo(hito.coordenadas, 7, { duration: 1.2 })
      setTimeout(() => markersRef.current[selectedId]?.openPopup(), 1300)
    }
  }, [selectedId])

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-xl overflow-hidden"
      style={{ minHeight: '400px' }}
    />
  )
}
