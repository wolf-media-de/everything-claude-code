import { JUNE_WEEKS, DAY_LABELS } from '../data/demoData.js'

export default function MonthCalendar({ selectedDays, onToggle }) {
  return (
    <div>
      {/* Weekday header */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_LABELS.map(label => (
          <div
            key={label}
            className={`text-center text-[11px] font-semibold py-1
              ${label === 'Sa' || label === 'So' ? 'text-amber-400' : 'text-zinc-400'}`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {JUNE_WEEKS.flat().map((day, idx) => {
          if (day === 0) {
            return <div key={`pad-${idx}`} className="aspect-square" />
          }
          const isSelected = selectedDays.has(day)
          const isWeekend = (idx % 7) >= 5
          return (
            <button
              key={day}
              type="button"
              onClick={() => onToggle(day)}
              className={`aspect-square rounded-lg text-sm font-medium transition-all active:scale-95
                ${
                  isSelected
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 ring-offset-1 ring-offset-zinc-800'
                    : isWeekend
                      ? 'bg-zinc-700 text-amber-300 hover:bg-zinc-600'
                      : 'bg-zinc-700 text-zinc-200 hover:bg-zinc-600'
                }`}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-3 text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
          Verfügbar
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-zinc-700 inline-block" />
          Nicht eingetragen
        </span>
      </div>
    </div>
  )
}
