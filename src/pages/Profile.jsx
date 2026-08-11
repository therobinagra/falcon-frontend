import { Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, ShieldCheck, Package, ArrowRight, User as UserIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Profile() {
  const { user, isAdmin } = useAuth()

  if (!user) return <Navigate to="/login" replace />

  const details = [
    { icon: Mail, label: 'Email', value: user.email || '—' },
    { icon: Phone, label: 'Phone', value: user.phone || 'Not provided' },
    { icon: ShieldCheck, label: 'Account type', value: isAdmin ? 'Administrator' : 'Customer' },
  ]

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white pb-20 pt-32 sm:pt-36">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-amber-200/40 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">My Profile</h1>
            <p className="mt-3 text-mist">Your FalconCare account details.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10"
          >
            <div className="rounded-3xl border border-line bg-white p-6 shadow-lux sm:p-8">
              <div className="flex items-center gap-5">
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-accent text-3xl font-black text-white shadow-lg shadow-accent/25">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-xl font-extrabold text-ink">{user.name}</h2>
                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-bold ${
                      isAdmin ? 'bg-accent-soft text-accent' : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {isAdmin ? 'Administrator' : 'Customer'}
                  </span>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {details.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-surface p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <p className="mt-3 text-xs font-bold uppercase tracking-widest text-mist">
                      {item.label}
                    </p>
                    <p className="mt-1 break-words text-sm font-bold text-ink">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
                <Link
                  to="/track-order"
                  className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-accent/20 transition hover:bg-accent-dark"
                >
                  <Package className="h-4 w-4" /> My Orders
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-accent px-6 py-3.5 text-sm font-bold text-accent transition hover:bg-accent hover:text-white"
                  >
                    <UserIcon className="h-4 w-4" /> Go to Dashboard
                  </Link>
                )}
                <Link
                  to="/products"
                  className="flex items-center justify-center gap-2 rounded-xl border border-line px-6 py-3.5 text-sm font-bold text-ink transition hover:border-accent/50 hover:text-accent"
                >
                  Continue shopping <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Profile
