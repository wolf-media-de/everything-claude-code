import { useState } from 'react'
import { SCHICHT_PLAN, MONTH_LABEL } from '../data/demoData.js'
import MonthCalendar from './MonthCalendar.jsx'

export default function FahrerView({ currentUser, availability, setAvailability, onLogout, onSaved }) {
  const [pendingDays, setPendingDays] = useState(new Set(availability.klaus))

  function toggleDay(day) {
    setPendingDays(prev => {
      const next = new Set(prev)
      if (next.has(day)) next.delete(day)
      else next.add(day)
      return next
    })
  }

  function handleSave() {
    setAvailability(prev => ({ ...prev, klaus: new Set(pendingDays) }))
    onSaved()
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900">
      {/* Navbar */}
      <nav className="border-b border-zinc-700 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-amber-500 font-bold tracking-widest text-sm uppercase">Agrolohn</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300 text-sm">Meine Verfügbarkeit</span>
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

      <div className="flex-1 p-4 max-w-2xl mx-auto w-full">
        {/* Availability section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-zinc-100 font-semibold">{MONTH_LABEL} – Meine Verfügbarkeit</h2>
            <span className="text-zinc-400 text-sm">{pendingDays.size} Tage</span>
          </div>
          <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-4">
            <MonthCalendar selectedDays={pendingDays} onToggle={toggleDay} />
          </div>
          <button
            onClick={handleSave}
            className="mt-3 w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold
              py-2.5 rounded-lg transition-colors"
          >
            Verfügbarkeit speichern
          </button>
        </section>

        {/* Current shift plan */}
        <section>
          <h2 className="text-zinc-100 font-semibold mb-3">Aktueller Schichtplan</h2>
          <div className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden">
            <div className="grid grid-cols-3 text-[10px] font-semibold text-zinc-400
              uppercase tracking-widest px-4 py-2 border-b border-zinc-700 bg-zinc-900">
              <span>Fahrer</span>
              <span>Tage</span>
              <span>Schicht</span>
            </div>
            {SCHICHT_PLAN.map((entry, idx) => (
              <div
                key={entry.name}
                className={`grid grid-cols-3 px-4 py-3 text-sm items-start
                  ${idx < SCHICHT_PLAN.length - 1 ? 'border-b border-zinc-700' : ''}
                  ${entry.name === currentUser.label ? 'bg-zinc-700/50' : ''}`}
              >
                <span className="text-zinc-100 font-medium text-xs">{entry.name}</span>
                <span className="text-zinc-300 text-xs">{entry.tage}</span>
                <span className="text-zinc-400 text-xs">{entry.schicht}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
