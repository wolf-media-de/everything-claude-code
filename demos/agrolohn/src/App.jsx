import { useState } from 'react'
import { DRIVERS, INITIAL_AVAILABILITY } from './data/demoData.js'
import Login from './components/Login.jsx'
import DispoView from './components/DispoView.jsx'
import FahrerView from './components/FahrerView.jsx'

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [availability, setAvailability] = useState(INITIAL_AVAILABILITY)
  const [toast, setToast] = useState(null)

  function handleLogin(username, password) {
    if (username === 'dispo' && password === 'demo') {
      setCurrentUser({ role: 'dispo', label: 'Dispatcher' })
      return true
    }
    if (username === 'fahrer' && password === 'demo') {
      setCurrentUser({ role: 'fahrer', label: 'Klaus Müller' })
      return true
    }
    return false
  }

  function handleLogout() {
    setCurrentUser(null)
    setToast(null)
  }

  function showToast(message) {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-700 text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium">
          {toast}
        </div>
      )}
      {!currentUser && <Login onLogin={handleLogin} />}
      {currentUser?.role === 'dispo' && (
        <DispoView
          drivers={DRIVERS}
          availability={availability}
          currentUser={currentUser}
          onLogout={handleLogout}
          onExport={() => showToast('Plan erfolgreich exportiert! (Demo)')}
        />
      )}
      {currentUser?.role === 'fahrer' && (
        <FahrerView
          currentUser={currentUser}
          availability={availability}
          setAvailability={setAvailability}
          onLogout={handleLogout}
          onSaved={() => showToast('Verfügbarkeit gespeichert!')}
        />
      )}
    </div>
  )
}
