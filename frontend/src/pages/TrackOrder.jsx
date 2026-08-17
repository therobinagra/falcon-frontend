import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  PackageSearch,
  CheckCircle2,
  Package,
  Truck,
  Home,
  XCircle,
  Loader2,
  MapPin,
  ShoppingBag,
  Wallet,
} from 'lucide-react'
import { orderApi } from '../api'
import { formatINR, productIcon } from '../utils'

const STEPS = [
  { key: 'Placed', label: 'Order Placed', sub: 'We received your order', icon: CheckCircle2 },
  { key: 'Confirmed', label: 'Confirmed', sub: 'Your order is confirmed', icon: Package },
  { key: 'Shipped', label: 'Shipped', sub: 'Your order is on the way', icon: Truck },
  { key: 'Delivered', label: 'Delivered', sub: 'Delivered to your address', icon: Home },
]

export const orderStatusTone = {
  Placed: 'blue',
  Confirmed: 'amber',
  Shipped: 'accent',
  Delivered: 'green',
  Cancelled: 'red',
}

export function StatusBadge({ status }) {
  const tone = orderStatusTone[status] || 'slate'
  const styles = {
    blue: 'bg-blue-100 text-blue-700',
    amber: 'bg-amber-100 text-amber-700',
    accent: 'bg-accent-soft text-accent',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    slate: 'bg-slate-100 text-slate-600',
  }
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles[tone]}`}>{status}</span>
  )
}

export function Timeline({ status }) {
  if (status === 'Cancelled') {
    return (
      <div className="flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
          <XCircle className="h-6 w-6" />
        </span>
        <div>
          <p className="font-extrabold text-red-600">Order Cancelled</p>
          <p className="text-sm text-red-500">
            This order was cancelled. Contact support if you have any questions.
          </p>
        </div>
      </div>
    )
  }

  const current = STEPS.findIndex((s) => s.key === status)
  const activeCount = current >= 0 ? current + 1 : 0

  return (
    <div className="grid gap-2 sm:grid-cols-4">
      {STEPS.map((step, i) => {
        const done = i < activeCount
        const currentStep = i === current
        return (
          <div key={step.key} className="relative">
            {i < STEPS.length - 1 && (
              <span
                className={`absolute left-12 top-6 hidden h-0.5 sm:block ${
                  i < activeCount - 1 ? 'bg-accent' : 'bg-line'
                }`}
                style={{ right: 0 }}
              />
            )}
            <div
              className={`relative flex items-start gap-4 rounded-2xl border p-4 sm:flex-col sm:items-center sm:gap-3 sm:text-center ${
                done
                  ? 'border-accent/30 bg-accent-soft'
                  : 'border-line bg-surface/50'
              } ${currentStep ? 'ring-2 ring-accent/40' : ''}`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
                  done ? 'bg-accent text-white shadow-md shadow-accent/30' : 'bg-surface text-mist'
                }`}
              >
                <step.icon className="h-5 w-5" />
              </span>
              <div className="sm:mt-1">
                <p className={`text-sm font-extrabold ${done ? 'text-accent' : 'text-mist'}`}>
                  {step.label}
                </p>
                <p className="mt-0.5 text-xs text-mist">{step.sub}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TrackOrder() {
  const [orderId, setOrderId] = useState('')
  const [phone, setPhone] = useState('')
  const [order, setOrder] = useState(null)
  const [orders, setOrders] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!phone.trim()) return
    setLoading(true)
    setError('')
    setOrder(null)
    setOrders(null)
    try {
      const data = await orderApi.trackOrder(orderId.trim() || '', phone.trim())
      if (Array.isArray(data)) setOrders(data)
      else setOrder(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setOrder(null)
    setOrders(null)
    setOrderId('')
    setPhone('')
    setError('')
  }

  const viewOrder = (o) => {
    setOrders(null)
    setOrder(o)
  }

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
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-black uppercase tracking-widest text-accent">
              <PackageSearch className="h-4 w-4" />
              Order Tracking
            </span>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Track Your Order
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-mist">
              Enter your phone number to find your orders — add the order ID if you have it saved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10"
          >
            {orders && orders.length > 0 && (
              <div className="rounded-3xl border border-line bg-white p-6 shadow-lux sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-extrabold text-ink">Your recent orders</p>
                    <p className="mt-1 text-sm text-mist">
                      We found {orders.length} order{orders.length > 1 ? 's' : ''} for this phone
                      number.
                    </p>
                  </div>
                  <button
                    onClick={reset}
                    className="rounded-full border border-line px-4 py-2 text-xs font-bold text-mist transition hover:border-accent/50 hover:text-accent"
                  >
                    New search
                  </button>
                </div>

                <div className="mt-6 space-y-3">
                  {orders.map((o) => (
                    <button
                      key={o._id}
                      onClick={() => viewOrder(o)}
                      className="flex w-full flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-4 text-left transition hover:border-accent/40 hover:bg-accent-soft/50"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                        <ShoppingBag className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-extrabold text-ink">
                          Order #{o._id?.slice(-6).toUpperCase()}
                        </p>
                        <p className="mt-0.5 text-xs text-mist">
                          {new Date(o.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}{' '}
                          · {o.items?.length} item(s) · {formatINR(o.totalPrice)}
                        </p>
                      </div>
                      <StatusBadge status={o.status} />
                      <span className="text-xs font-bold text-accent">View →</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {order ? (
              <div className="rounded-3xl border border-line bg-white p-6 shadow-lux sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-mist">
                      Order #{order._id?.slice(-6).toUpperCase()}
                    </p>
                    <p className="mt-1 text-sm text-mist">
                      Placed on{' '}
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={reset}
                    className="rounded-full border border-line px-4 py-2 text-xs font-bold text-mist transition hover:border-accent/50 hover:text-accent"
                  >
                    Track another order
                  </button>
                </div>

                <div className="mt-6">
                  <Timeline status={order.status} />
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-3">
                  <div className="rounded-2xl bg-surface p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-mist">
                      <ShoppingBag className="mr-1 inline h-4 w-4" />
                      Items
                    </p>
                    <div className="mt-3 space-y-3">
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-lg">
                            {productIcon(item.name)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-ink">{item.name}</p>
                            <p className="text-xs text-mist">
                              Qty {item.qty} × {formatINR(item.price)}
                            </p>
                          </div>
                          <p className="text-sm font-extrabold text-ink">
                            {formatINR(item.qty * item.price)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-surface p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-mist">
                      <MapPin className="mr-1 inline h-4 w-4" />
                      Delivery Address
                    </p>
                    <p className="mt-3 text-sm font-bold text-ink">{order.customer?.name}</p>
                    <p className="mt-1 text-sm text-mist">{order.address?.line}</p>
                    <p className="text-sm text-mist">
                      {order.address?.city}, {order.address?.state} — {order.address?.pincode}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-surface p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-mist">
                      <Wallet className="mr-1 inline h-4 w-4" />
                      Payment Summary
                    </p>
                    <div className="mt-3 space-y-1.5 text-sm">
                      <div className="flex justify-between text-mist">
                        <span>Items total</span>
                        <span className="font-semibold text-ink">{formatINR(order.itemsPrice)}</span>
                      </div>
                      <div className="flex justify-between text-mist">
                        <span>Shipping</span>
                        <span className="font-semibold text-ink">
                          {order.shippingPrice === 0 ? 'Free' : formatINR(order.shippingPrice)}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1 text-base font-extrabold text-ink">
                        <span>Total</span>
                        <span>{formatINR(order.totalPrice)}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent">
                        {order.paymentMethod}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          order.paymentStatus === 'Paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : !orders && (
              <form
                onSubmit={submit}
                className="rounded-3xl border border-line bg-white p-6 shadow-lux sm:p-8"
              >
                {error && (
                  <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
                    {error}
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                  <div>
                    <label htmlFor="orderId" className="mb-1.5 block text-sm font-bold text-ink">
                      Order ID <span className="font-normal text-mist">(optional)</span>
                    </label>
                    <input
                      id="orderId"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="Leave blank to search by phone"
                      className="w-full rounded-2xl border border-line bg-surface px-5 py-3.5 text-sm text-ink outline-none transition placeholder:text-mist/60 focus:border-accent/60 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-bold text-ink">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      required
                      className="w-full rounded-2xl border border-line bg-surface px-5 py-3.5 text-sm text-ink outline-none transition placeholder:text-mist/60 focus:border-accent/60 focus:bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-7 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-accent/25 transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                    {loading ? 'Searching...' : 'Track Order'}
                  </button>
                </div>

                <p className="mt-5 text-xs text-mist">
                  Just enter your phone number to see your recent orders. Adding the order ID
                  (shown on the checkout confirmation screen) opens that order directly.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default TrackOrder
