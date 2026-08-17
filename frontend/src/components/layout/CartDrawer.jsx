import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cartContext'
import { productIcon, formatINR } from '../../utils'

function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal, totalItems, clearCart } =
    useCart()
  const navigate = useNavigate()

  const goToCheckout = () => {
    setIsOpen(false)
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-line bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h3 className="text-lg font-bold text-ink">
                Your Cart <span className="text-accent">({totalItems})</span>
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-mist transition hover:border-accent/50 hover:text-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft text-4xl">
                  🛒
                </span>
                <p className="font-bold text-ink">Your cart is empty</p>
                <p className="text-sm text-mist">Add some products to get started.</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-dark"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  {items.map((item) => (
                    <div key={item._id} className="flex gap-4 rounded-2xl border border-line bg-surface p-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="h-20 w-20 shrink-0 rounded-xl object-cover"
                        />
                      ) : (
                        <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-3xl`}>
                          {productIcon(item.name)}
                        </div>
                      )}
                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-bold leading-snug text-ink">{item.name}</p>
                        <p className="mt-1 text-sm font-extrabold text-ink">
                          {formatINR(item.price)}
                          <span className="ml-1.5 text-xs font-normal text-mist line-through">
                            {formatINR(item.mrp)}
                          </span>
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-3 rounded-full border border-line px-2 py-1">
                            <button
                              onClick={() => updateQty(item._id, item.qty - 1)}
                              aria-label="Decrease quantity"
                              className="text-mist hover:text-accent"
                            >
                              −
                            </button>
                            <span className="w-5 text-center text-sm font-bold text-ink">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item._id, item.qty + 1)}
                              aria-label="Increase quantity"
                              className="text-mist hover:text-accent"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="text-xs font-semibold text-mist transition hover:text-accent"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={clearCart}
                    className="mx-auto block text-xs font-semibold text-mist underline transition hover:text-accent"
                  >
                    Clear cart
                  </button>
                </div>

                <div className="border-t border-line px-6 py-5">
                  <div className="flex justify-between text-sm text-mist">
                    <span>Subtotal</span>
                    <span className="font-bold text-ink">{formatINR(subtotal)}</span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-mist">
                    <span>Shipping</span>
                    <span className="font-bold text-accent">FREE</span>
                  </div>
                  <div className="mt-4 flex justify-between border-t border-line pt-4 text-lg">
                    <span className="font-bold text-ink">Total</span>
                    <span className="text-xl font-extrabold text-accent">
                      {formatINR(subtotal)}
                    </span>
                  </div>
                  <button
                    onClick={goToCheckout}
                    className="mt-5 w-full rounded-2xl bg-accent py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-accent/25 transition hover:bg-accent-dark"
                  >
                    Checkout — {formatINR(subtotal)}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer
