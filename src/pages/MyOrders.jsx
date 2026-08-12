import { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, ShoppingBag, MapPin, Wallet, ArrowRight, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { orderApi } from '../api'
import { formatINR, productIcon } from '../utils'
import { Timeline, StatusBadge } from './TrackOrder'

function MyOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    const load = async () => {
      try {
        const data = await orderApi.getMyOrders()
        if (!cancelled) setOrders(Array.isArray(data) ? data : [])
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [user])

  if (!user) return <Navigate to="/login" replace />

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white pb-20 pt-32 sm:pt-36">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-amber-200/40 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-black uppercase tracking-widest text-accent">
              <Package className="h-4 w-4" />
              My Orders
            </span>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Your Orders
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-mist">
              All orders placed from your account, with live status updates.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10"
          >
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-32 animate-pulse rounded-3xl bg-surface" />
                ))}
              </div>
            ) : error ? (
              <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-5 text-sm font-semibold text-red-600">
                {error}
              </div>
            ) : orders.length === 0 ? (
              <div className="rounded-3xl border border-line bg-white p-10 text-center shadow-lux">
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft text-4xl">
                  🧾
                </span>
                <h2 className="mt-5 text-xl font-extrabold text-ink">No orders yet</h2>
                <p className="mx-auto mt-2 max-w-sm text-sm text-mist">
                  When you place an order while logged in, it will show up here with live status.
                </p>
                <Link
                  to="/products"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-accent/20 transition hover:bg-accent-dark"
                >
                  Start shopping <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-5">
                {orders.map((order) => {
                  const isOpen = openId === order._id
                  return (
                    <div
                      key={order._id}
                      className="overflow-hidden rounded-3xl border border-line bg-white shadow-lux"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface/50 px-6 py-4">
                        <div>
                          <p className="text-sm font-extrabold text-ink">
                            Order #{order._id?.slice(-6).toUpperCase()}
                          </p>
                          <p className="mt-0.5 text-xs text-mist">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}{' '}
                            · {formatINR(order.totalPrice)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge status={order.status} />
                          <button
                            onClick={() => setOpenId(isOpen ? null : order._id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-mist transition hover:border-accent/50 hover:text-accent"
                            aria-label={isOpen ? 'Collapse' : 'Expand'}
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="px-6 py-5">
                        <Timeline status={order.status} />

                        {isOpen && (
                          <div className="mt-6 grid gap-5 lg:grid-cols-3">
                            <div className="rounded-2xl bg-surface p-5">
                              <p className="text-xs font-bold uppercase tracking-widest text-mist">
                                <ShoppingBag className="mr-1 inline h-4 w-4" /> Items
                              </p>
                              <div className="mt-3 space-y-3">
                                {order.items?.map((item, i) => (
                                  <div key={i} className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-lg">
                                      {productIcon(item.name)}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-bold text-ink">
                                        {item.name}
                                      </p>
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
                                <MapPin className="mr-1 inline h-4 w-4" /> Delivery Address
                              </p>
                              <p className="mt-3 text-sm font-bold text-ink">{order.customer?.name}</p>
                              <p className="mt-1 text-sm text-mist">{order.address?.line}</p>
                              <p className="text-sm text-mist">
                                {order.address?.city}, {order.address?.state} —{' '}
                                {order.address?.pincode}
                              </p>
                            </div>

                            <div className="rounded-2xl bg-surface p-5">
                              <p className="text-xs font-bold uppercase tracking-widest text-mist">
                                <Wallet className="mr-1 inline h-4 w-4" /> Payment Summary
                              </p>
                              <div className="mt-3 space-y-1.5 text-sm">
                                <div className="flex justify-between text-mist">
                                  <span>Items total</span>
                                  <span className="font-semibold text-ink">
                                    {formatINR(order.itemsPrice)}
                                  </span>
                                </div>
                                <div className="flex justify-between text-mist">
                                  <span>Shipping</span>
                                  <span className="font-semibold text-ink">
                                    {order.shippingPrice === 0
                                      ? 'Free'
                                      : formatINR(order.shippingPrice)}
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
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default MyOrders
