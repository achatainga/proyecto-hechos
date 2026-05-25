import { useState } from 'react'
import Timeline from './Timeline'
import MapView from './MapView'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 bg-slate-900/80 backdrop-blur border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-amber-400 text-lg">✦</span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400/80">
                Teología Bíblica · Hechos 18–28
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 leading-tight">
              El Tercer Viaje de Pablo
              <span className="text-slate-400 font-normal"> y su camino a Roma</span>
            </h1>
          </div>

        </div>
      </header>

      {/* Footer */}
      <footer className="flex-shrink-0 bg-slate-900/80 border-t border-slate-800 px-6 py-2 text-center">
        <p className="text-[11px] text-slate-500">
          &copy; {new Date().getFullYear()} Alejandro Chataing &mdash;{' '}
          <a href="mailto:a.chataing.a@gmail.com" className="text-amber-400/70 hover:text-amber-400 transition-colors">
            a.chataing.a@gmail.com
          </a>
        </p>
      </footer>

      {/* Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden" style={{ minHeight: 0 }}>
        {/* Timeline column */}
        <aside className="lg:w-[40%] flex flex-col bg-slate-900/50 border-r border-slate-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800 flex-shrink-0">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Línea de Tiempo · {9} hitos
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-3">
            <Timeline selectedId={selectedId} onSelect={setSelectedId} />
          </div>
        </aside>

        {/* Map column */}
        <main className="flex-1 p-3 lg:p-4 flex flex-col" style={{ minHeight: '400px' }}>
          <MapView selectedId={selectedId} />
        </main>
      </div>
    </div>
  )
}
