import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  Truck,
} from 'lucide-react'
import { shiprocketApi } from '../api'
import { useCart } from '../context/cartContext'
import { formatINR } from '../utils'

const ORDER_KEY = 'falcon-order'

function OrderSuccess() {
  const { clearCart } = useCart()
  const navigate = useNavigate()
  const [placed, setPlaced] = useState(null)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      let stored = null
      try {
        stored = JSON.parse(sessionStorage.getItem(ORDER_KEY)) || null
      } catch {
        stored = null
      }

      let order = stored?.order || null
      if (!order) {
        navigate('/', { replace: true })
        return
      }

      if (order.paymentStatus !== 'Paid') {
        try {
          const updated = await shiprocketApi.confirmPayment(order._id)
          order = updated || order
        } catch {
          // Payment may still be processing — show the saved order either way.
        }
      }

      if (!cancelled) {
        setPlaced(order)
      }
      clearCart()
      sessionStorage.removeItem(ORDER_KEY)
    }

    run()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!placed) {
    return <div className="min-h-screen bg-surface" />
  }

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
            {placed.paymentStatus !== 'Paid' && (
              <p className="mt-2 rounded-xl bg-white/15 px-4 py-2 text-xs font-semibold text-white/90">
                Payment is still being confirmed. You can check your order status anytime on the
                Track Order page.
              </p>
            )}
          </div>

          <div className="space-y-4 p-7 text-left">
            <div className="rounded-2xl border border-dashed border-accent/40 bg-accent-soft/60 px-5 py-4 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Order ID</p>
              <p className="mt-1 break-all font-mono text-sm font-bold text-ink">#{placed._id}</p>
              <button
                onClick={() => navigator.clipboard?.writeText(placed._id)}
                className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-accent/40 px-3 py-1 text-xs font-bold text-accent transition hover:bg-accent hover:text-white"
              >
                <Copy className="h-3.5 w-3.5" /> Copy ID
              </button>
            </div>
            <p className="rounded-xl bg-surface px-4 py-3 text-center text-xs text-mist">
              Save this ID — or just use your phone number on the Track Order page to find your
              order anytime.
            </p>

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

export default OrderSuccess