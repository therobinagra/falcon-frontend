import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Flame, Lock, Mail, LogIn, Eye, EyeOff, ShieldAlert } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function AdminLogin() {
  const { user, isAdmin, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (user && isAdmin) return <Navigate to="/admin" replace />

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const data = await login(form.email.trim(), form.password)
      if (data.role === 'admin') {
        navigate('/admin', { replace: true })
      } else {
        setError('This account is not an admin. Please use an admin account.')
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  const field =
    'w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition placeholder:text-mist/60 focus:border-accent/60 focus:bg-white'

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-surface to-white p-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-line bg-white p-8 shadow-lux">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/25">
              <Flame className="h-7 w-7" />
            </span>
            <h1 className="mt-5 text-2xl font-extrabold text-ink">Admin Login</h1>
            <p className="mt-1 text-sm text-mist">
              Sign in to manage FalconCare storefront
            </p>
          </div>

          {error && (
            <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={submit} className="mt-6 space-y-4" autoComplete="off">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-ink">Email Address</span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  autoComplete="off"
                  className={`${field} pl-11`}
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-ink">Password</span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
                <input
                  type={show ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className={`${field} pl-11 pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-mist transition hover:text-accent"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-accent/25 transition hover:bg-accent-dark disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" />
              {busy ? 'Signing in...' : 'Sign in to Dashboard'}
            </button>
          </form>


        </div>

        <p className="mt-6 text-center text-sm text-mist">
          Back to{' '}
          <Link to="/" className="font-bold text-accent hover:underline">
            FalconCare store
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
