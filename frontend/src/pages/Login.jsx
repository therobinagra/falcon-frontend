import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Flame, Eye, EyeOff, Lock, Mail, User as UserIcon, Phone, LogIn } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const inputCls =
  'w-full rounded-xl border border-line bg-surface py-3 pl-11 pr-11 text-sm font-medium text-ink outline-none transition placeholder:text-mist/60 focus:border-accent/60 focus:bg-white'

function Field({ icon: Icon, ...props }) {
  const [show, setShow] = useState(false)
  const isPassword = props.type === 'password'
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-mist" />
      <input {...props} type={isPassword && show ? 'text' : props.type} className={inputCls} />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-mist transition hover:text-accent"
        >
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}
    </div>
  )
}

function Login() {
  const { user, isAdmin, loading, login, register } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      navigate(isAdmin ? '/admin' : '/products', { replace: true })
    }
  }, [loading, user, isAdmin, navigate])

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email.trim() || !form.password) {
      setError('Please fill in email and password.')
      return
    }
    if (mode === 'register' && !form.name.trim()) {
      setError('Please enter your name.')
      return
    }
    setBusy(true)
    try {
      const data =
        mode === 'login'
          ? await login(form.email.trim(), form.password)
          : await register({
              name: form.name.trim(),
              email: form.email.trim(),
              phone: form.phone.trim(),
              password: form.password,
            })
      navigate(data.role === 'admin' ? '/admin' : '/products', { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-surface px-4 py-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <Link to="/" className="flex items-center gap-2" aria-label="FalconCare home">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/25">
              <Flame className="h-6 w-6" />
            </span>
            <span className="text-2xl font-extrabold tracking-tight text-ink">
              Falcon<span className="text-accent">Care</span>
            </span>
          </Link>
          <p className="text-sm font-medium text-mist">
            {mode === 'login'
              ? 'Welcome back! Login to your account.'
              : 'Create an account to start shopping.'}
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-lux">
          <div className="flex border-b border-line">
            {[
              { key: 'login', label: 'Login' },
              { key: 'register', label: 'Register' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setMode(tab.key)
                  setError('')
                }}
                className={`flex-1 py-3.5 text-sm font-bold transition ${
                  mode === tab.key
                    ? 'bg-accent text-white'
                    : 'text-mist hover:bg-accent-soft hover:text-accent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4 p-7">
            {mode === 'register' && (
              <Field
                icon={UserIcon}
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                autoComplete="name"
              />
            )}
            <Field
              icon={Mail}
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              autoComplete="email"
              required
            />
            {mode === 'register' && (
              <Field
                icon={Phone}
                type="tel"
                placeholder="Phone number (optional)"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                autoComplete="tel"
              />
            )}
            <Field
              icon={Lock}
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => set('password', e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              required
            />

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-accent/20 transition hover:bg-accent-dark disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" />
              {busy ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
            </button>

            <p className="text-center text-xs text-mist">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login')
                  setError('')
                }}
                className="font-bold text-accent hover:underline"
              >
                {mode === 'login' ? 'Register here' : 'Login here'}
              </button>
            </p>
          </form>
        </div>


      </div>
    </div>
  )
}

export default Login
