import { useState } from 'react'
import { HITOS } from './data'

const ROUTE_LABEL = {
  tercer: { label: '3er Viaje', color: 'text-amber-400', dot: 'bg-amber-400' },
  roma: { label: 'Viaje a Roma', color: 'text-sky-400', dot: 'bg-sky-400' },
}



export default function Timeline({ selectedId, onSelect }) {
  const [expanded, setExpanded] = useState(null)

  function handleClick(id) {
    const next = expanded === id ? null : id
    setExpanded(next)
    onSelect(id)
  }

  return (
    <div className="flex flex-col gap-0 relative">
      {/* Vertical line */}
      <div className="absolute left-[19px] top-4 bottom-4 w-px bg-slate-700 z-0" />

      {HITOS.map((h, i) => {
        const route = ROUTE_LABEL[h.ruta]
        const isSelected = selectedId === h.id
        const isExpanded = expanded === h.id

        return (
          <div key={h.id} className="relative z-10 mb-1">
            {/* Row */}
            <button
              onClick={() => handleClick(h.id)}
              className={`w-full flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200
                ${isSelected
                  ? 'bg-slate-700/80 shadow-lg shadow-black/30'
                  : 'hover:bg-slate-800/60'
                }`}
            >
              {/* Dot */}
              <div className="flex-shrink-0 mt-1 relative">
                <div
                  className={`w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center text-[9px] font-bold text-slate-900
                    ${route.dot}`}
                >
                  {i + 1}
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${route.color}`}>
                    {route.label}
                  </span>
                  <span className="text-[10px] text-slate-500">{h.pasaje}</span>
                </div>
                <p className="text-sm font-semibold text-slate-100 mt-0.5 truncate">{h.ciudad}</p>
                <p className="text-xs text-slate-400 mt-0.5">{h.viaje}</p>
              </div>

              {/* Chevron */}
              <span className={`text-slate-500 text-xs mt-1 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {/* Expanded detail */}
            {isExpanded && (
              <div className="slide-down mx-3 mb-2 rounded-xl bg-slate-800/70 border border-slate-700/50 overflow-hidden">
                {/* Summary */}
                <div className="p-4 border-b border-slate-700/50">
                  <p className="text-xs text-slate-300 leading-relaxed">{h.resumen}</p>
                </div>

                {/* Retos */}
                <div className="px-4 py-3 border-b border-slate-700/50 bg-red-950/20">
                  <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-1">⚠ Retos</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{h.retos}</p>
                </div>

                {/* Team notes */}
                <div className="p-4 flex flex-col gap-2">
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Reflexiones</p>
                  {h.notas.map((nota, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-amber-400 mt-1 flex-shrink-0">•</span>
                      <p className="text-xs text-slate-400 leading-relaxed">{nota}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
