import { useState } from 'react'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const ok = onLogin(username.trim(), password)
    if (!ok) setError('Ungültige Anmeldedaten')
    else setError('')
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="text-amber-500 text-3xl font-bold tracking-widest uppercase">Agrolohn</div>
          <div className="text-zinc-400 text-sm mt-1 tracking-wide">Fahrerdisposition</div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-800 rounded-xl p-6 space-y-4 border border-zinc-700"
        >
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-1.5">
              Benutzername
            </label>
            <input
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError('') }}
              className="w-full bg-zinc-700 text-white px-3 py-2.5 rounded-lg border border-zinc-600
                focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-zinc-500"
              placeholder="dispo oder fahrer"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-1.5">
              Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              className="w-full bg-zinc-700 text-white px-3 py-2.5 rounded-lg border border-zinc-600
                focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-zinc-500"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2.5
              rounded-lg transition-colors mt-2"
          >
            Anmelden
          </button>
        </form>

        <div className="mt-4 bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-xs text-zinc-400">
          <div className="font-semibold text-zinc-300 mb-2 uppercase tracking-widest text-[10px]">
            Demo-Zugänge
          </div>
          <div className="flex justify-between">
            <span>Disponent:</span>
            <span className="text-amber-400 font-mono">dispo / demo</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Fahrer:</span>
            <span className="text-amber-400 font-mono">fahrer / demo</span>
          </div>
        </div>
      </div>
    </div>
  )
}
