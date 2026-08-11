import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  User as UserIcon,
} from 'lucide-react'
import { useCart } from '../context/cartContext'
import { useAuth } from '../context/AuthContext'
import { orderApi } from '../api'
import { productIcon, formatINR } from '../utils'

const inputCls =
  'w-full rounded-xl border border-line bg-surface py-3 pl-11 pr-4 text-sm font-medium text-ink outline-none transition placeholder:text-mist/60 focus:border-accent/60 focus:bg-white'

function Field({ icon: Icon, label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-mist">
        {label}
      </span>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-mist" />
        <input {...props} className={inputCls} />
      </div>
    </label>
  )
}

const FREE_SHIPPING_OVER = 499
const SHIPPING_FEE = 49

function SummaryItem({ item }) {
  return (
    <div className="flex items-center gap-3">
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-14 w-14 shrink-0 rounded-xl object-cover"
        />
      ) : (
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient || 'from-amber-700 to-orange-600'} text-2xl`}>
          {productIcon(item.name)}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-ink">{item.name}</p>
        <p className="text-xs text-mist">
          {item.qty} × {formatINR(item.price)}
        </p>
      </div>
      <p className="text-sm font-extrabold text-ink">{formatINR(item.price * item.qty)}</p>
    </div>
  )
}

function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [placed, setPlaced] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    line: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'COD',
  })

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const shippingPrice = subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE
  const totalPrice = subtotal + shippingPrice

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your full name.'
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      return 'Please enter a valid email address.'
    if (!form.phone.trim() || form.phone.trim().length < 10)
      return 'Please enter a valid 10-digit phone number.'
    if (!form.line.trim()) return 'Please enter your address.'
    if (!form.city.trim()) return 'Please enter your city.'
    if (!form.state.trim()) return 'Please enter your state.'
    if (!/^\d{6}$/.test(form.pincode.trim())) return 'Please enter a valid 6-digit pincode.'
    return ''
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    setError('')
    const problem = validate()
    if (problem) {
      setError(problem)
      return
    }

    setBusy(true)
    try {
      const order = await orderApi.createOrder({
        customer: {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
        },
        address: {
          line: form.line.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          pincode: form.pincode.trim(),
        },
        items: items.map((item) => ({ product: item._id, qty: item.qty })),
        paymentMethod: form.paymentMethod,
      })
      setPlaced(order)
      clearCart()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  if (placed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-lg"
        >
          <div className="overflow-hidden rounded-3xl border border-line bg-white text-center shadow-lux">
            <div className="bg-accent px-6 py-10 text-white">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                <CheckCircle2 className="h-10 w-10" />
              </span>
              <h1 className="mt-5 text-2xl font-extrabold">Order Placed!</h1>
              <p className="mt-1 text-sm font-medium text-white/90">
                Thank you {placed.customer?.name}. Your order is confirmed.
              </p>
            </div>

            <div className="space-y-4 p-7 text-left">
              <div className="rounded-2xl border border-dashed border-accent/40 bg-accent-soft/60 px-5 py-4 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">Order ID</p>
                <p className="mt-1 break-all font-mono text-sm font-bold text-ink">#{placed._id}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-mist">
                  <span>Items total</span>
                  <span className="font-semibold text-ink">{formatINR(placed.itemsPrice)}</span>
                </div>
                <div className="flex justify-between text-mist">
                  <span>Shipping</span>
                  <span className="font-semibold text-ink">
                    {placed.shippingPrice === 0 ? 'FREE' : formatINR(placed.shippingPrice)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-line pt-3 text-base font-extrabold text-ink">
                  <span>Total paid</span>
                  <span className="text-accent">{formatINR(placed.totalPrice)}</span>
                </div>
                <div className="flex justify-between text-mist">
                  <span>Payment method</span>
                  <span className="font-bold text-ink">{placed.paymentMethod}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Link
                  to="/track-order"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-accent px-4 py-3.5 text-sm font-bold text-accent transition hover:bg-accent hover:text-white"
                >
                  <Truck className="h-4 w-4" /> Track your order
                </Link>
                <Link
                  to="/products"
                  className="flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-accent/20 transition hover:bg-accent-dark"
                >
                  Continue shopping <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-3.5 text-sm font-bold text-ink transition hover:border-accent/50 hover:text-accent"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to home
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 py-24 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-accent-soft text-5xl">🛒</span>
        <h1 className="mt-6 text-2xl font-extrabold text-ink">Your cart is empty</h1>
        <p className="mt-2 max-w-sm text-sm text-mist">
          Add some products to your cart before heading to checkout.
        </p>
        <Link
          to="/products"
          className="mt-6 flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-dark"
        >
          Browse products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  const paymentOptions = [
    { key: 'COD', label: 'Cash on Delivery', sub: 'Pay when your order arrives', icon: Banknote },
    { key: 'Online', label: 'UPI / Card', sub: 'Pay securely online now', icon: CreditCard },
  ]

  return (
    <div className="bg-surface px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-mist transition hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">Checkout</h1>
        <p className="mt-1 text-sm text-mist">Complete your details to place the order.</p>

        <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">
            <section className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
                  <UserIcon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-ink">Contact details</h2>
                  <p className="text-xs text-mist">Where should we confirm your order?</p>
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field icon={UserIcon} label="Full name" type="text" placeholder="Your name" value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
                <Field icon={Phone} label="Phone" type="tel" placeholder="10-digit mobile number" value={form.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" />
                <div className="sm:col-span-2">
                  <Field icon={Mail} label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-ink">Delivery address</h2>
                  <p className="text-xs text-mist">We deliver across India.</p>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                <Field icon={MapPin} label="Address" type="text" placeholder="House no, street, area, landmark" value={form.line} onChange={(e) => set('line', e.target.value)} autoComplete="street-address" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field icon={MapPin} label="City" type="text" placeholder="City" value={form.city} onChange={(e) => set('city', e.target.value)} autoComplete="address-level2" />
                  <Field icon={MapPin} label="State" type="text" placeholder="State" value={form.state} onChange={(e) => set('state', e.target.value)} autoComplete="address-level1" />
                </div>
                <Field icon={MapPin} label="Pincode" type="text" inputMode="numeric" maxLength={6} placeholder="6-digit pincode" value={form.pincode} onChange={(e) => set('pincode', e.target.value.replace(/\D/g, ''))} autoComplete="postal-code" />
              </div>
            </section>

            <section className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-ink">Payment method</h2>
                  <p className="text-xs text-mist">Choose how you want to pay.</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {paymentOptions.map((opt) => {
                  const Icon = opt.icon
                  const active = form.paymentMethod === opt.key
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => set('paymentMethod', opt.key)}
                      className={`flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${
                        active ? 'border-accent bg-accent-soft/60' : 'border-line bg-surface hover:border-accent/40'
                      }`}
                    >
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${active ? 'bg-accent text-white' : 'bg-white text-mist border border-line'}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className={`block text-sm font-bold ${active ? 'text-accent' : 'text-ink'}`}>
                          {opt.label}
                        </span>
                        <span className="mt-0.5 block text-xs text-mist">{opt.sub}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
              {form.paymentMethod === 'Online' && (
                <p className="mt-4 flex items-start gap-2 rounded-xl bg-accent-soft/60 px-4 py-3 text-xs font-semibold text-accent">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0" />
                  Online payment is simulated in this demo. No money will be deducted.
                </p>
              )}
            </section>
          </div>

          <aside className="lg:col-span-2">
            <div className="sticky top-24 rounded-3xl border border-line bg-white p-6 shadow-lux sm:p-7">
              <h2 className="text-lg font-bold text-ink">Order summary</h2>
              <div className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
                {items.map((item) => (
                  <SummaryItem key={item._id} item={item} />
                ))}
              </div>

              <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
                <div className="flex justify-between text-mist">
                  <span>Items subtotal</span>
                  <span className="font-semibold text-ink">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-mist">
                  <span>Shipping</span>
                  {shippingPrice === 0 ? (
                    <span className="font-bold text-accent">FREE</span>
                  ) : (
                    <span className="font-semibold text-ink">{formatINR(shippingPrice)}</span>
                  )}
                </div>
                {shippingPrice !== 0 && (
                  <p className="flex items-start gap-1.5 text-xs font-semibold text-mist">
                    <Truck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    Add {formatINR(FREE_SHIPPING_OVER - subtotal)} more for FREE shipping.
                  </p>
                )}
                <div className="flex justify-between border-t border-line pt-3 text-lg font-extrabold text-ink">
                  <span>Total</span>
                  <span className="text-accent">{formatINR(totalPrice)}</span>
                </div>
              </div>

              {error && (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-accent/25 transition hover:bg-accent-dark disabled:opacity-60"
              >
                <Lock className="h-4 w-4" />
                {busy ? 'Placing order...' : `Place order — ${formatINR(totalPrice)}`}
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-mist">
                <ShieldCheck className="h-4 w-4 text-accent" />
                100% secure checkout · Discreet packaging
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  )
}

export default Checkout
