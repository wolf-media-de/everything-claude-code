import { JUNE_WEEKS, DAY_LABELS, MONTH_LABEL } from '../data/demoData.js'

// Map each day number (1–30) to its weekday column index (0=Mo … 6=So)
const dayToCol = {}
JUNE_WEEKS.forEach(week => {
  week.forEach((day, colIdx) => {
    if (day > 0) dayToCol[day] = colIdx
  })
})

const DAYS = Array.from({ length: 30 }, (_, i) => i + 1)

export default function DispoView({ drivers, availability, currentUser, onLogout, onExport }) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900">
      {/* Navbar */}
      <nav className="border-b border-zinc-700 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-amber-500 font-bold tracking-widest text-sm uppercase">Agrolohn</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300 text-sm">Disposition</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-zinc-400 text-sm hidden sm:block">{currentUser.label}</span>
          <button
            onClick={onLogout}
            className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
          >
            Abmelden
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar – desktop only */}
        <aside className="hidden lg:flex flex-col w-60 bg-zinc-800 border-r border-zinc-700 p-4 gap-3 flex-shrink-0">
          <h2 className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1">Fahrer</h2>
          {drivers.map(driver => (
            <div key={driver.id} className="bg-zinc-700 rounded-lg p-3 border border-zinc-600">
              <div className="font-medium text-zinc-100 text-sm">{driver.name}</div>
              <div className="flex items-center justify-between mt-2">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wide
                    ${driver.typ === 'Teilzeit'
                      ? 'bg-amber-900 text-amber-300'
                      : 'bg-green-900 text-green-300'}`}
                >
                  {driver.typ}
                </span>
                <span className="text-zinc-400 text-xs">
                  {availability[driver.id]?.size ?? 0} Tage
                </span>
              </div>
            </div>
          ))}
        </aside>

        {/* Main area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Action bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-700 flex-shrink-0">
            <h1 className="text-zinc-100 font-semibold text-sm sm:text-base">
              {MONTH_LABEL} – Monatsübersicht
            </h1>
            <button
              onClick={onExport}
              className="bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold
                px-4 py-1.5 rounded-lg transition-colors"
            >
              Plan exportieren
            </button>
          </div>

          {/* Scrollable table */}
          <div className="flex-1 overflow-auto p-4">
            <div className="overflow-x-auto rounded-lg border border-zinc-700">
              <table className="border-collapse text-xs" style={{ minWidth: '700px' }}>
                <thead>
                  {/* Weekday row */}
                  <tr className="bg-zinc-800">
                    <th className="sticky left-0 z-10 bg-zinc-800 border-r border-zinc-700
                      px-3 py-2 text-left text-zinc-400 font-medium"
                      style={{ minWidth: '140px' }}
                    >
                      Fahrer
                    </th>
                    {DAYS.map(day => (
                      <th
                        key={`wd-${day}`}
                        className={`px-0 py-2 text-center border-l border-zinc-700 font-normal
                          ${dayToCol[day] >= 5 ? 'text-amber-400' : 'text-zinc-500'}`}
                        style={{ width: '28px', minWidth: '28px' }}
                      >
                        {DAY_LABELS[dayToCol[day]]}
                      </th>
                    ))}
                  </tr>
                  {/* Day number row */}
                  <tr className="bg-zinc-800 border-b-2 border-zinc-600">
                    <th className="sticky left-0 z-10 bg-zinc-800 border-r border-zinc-700 px-3 py-1" />
                    {DAYS.map(day => (
                      <th
                        key={`d-${day}`}
                        className={`px-0 py-1 text-center border-l border-zinc-700 font-semibold
                          ${dayToCol[day] >= 5 ? 'text-amber-300' : 'text-zinc-200'}`}
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((driver, rowIdx) => {
                    const rowBg = rowIdx % 2 === 0 ? 'bg-zinc-800' : 'bg-zinc-900'
                    return (
                      <tr key={driver.id} className={rowBg}>
                        <td
                          className={`sticky left-0 z-10 border-r border-zinc-700 px-3 py-2
                            font-medium text-zinc-200 whitespace-nowrap ${rowBg}`}
                        >
                          <div>{driver.name}</div>
                          <div
                            className={`text-[10px] mt-0.5
                              ${driver.typ === 'Teilzeit' ? 'text-amber-400' : 'text-green-400'}`}
                          >
                            {driver.typ}
                          </div>
                        </td>
                        {DAYS.map(day => {
                          const hasShift = availability[driver.id]?.has(day)
                          const isWeekend = dayToCol[day] >= 5
                          return (
                            <td
                              key={day}
                              className={`border-l border-zinc-700 text-center
                                ${
                                  hasShift
                                    ? 'bg-emerald-800'
                                    : isWeekend
                                      ? 'bg-zinc-700/60'
                                      : rowBg
                                }`}
                              style={{ height: '36px', width: '28px' }}
                            >
                              {hasShift && (
                                <div className="w-2 h-2 bg-emerald-400 rounded-full mx-auto" />
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile: driver cards below table */}
            <div className="lg:hidden mt-4 space-y-2">
              {drivers.map(driver => (
                <div
                  key={driver.id}
                  className="bg-zinc-800 rounded-lg p-3 border border-zinc-700
                    flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-zinc-100 text-sm">{driver.name}</div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase
                        tracking-wide mt-1 inline-block
                        ${driver.typ === 'Teilzeit'
                          ? 'bg-amber-900 text-amber-300'
                          : 'bg-green-900 text-green-300'}`}
                    >
                      {driver.typ}
                    </span>
                  </div>
                  <div className="text-zinc-400 text-sm">
                    {availability[driver.id]?.size ?? 0} Schichten
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
