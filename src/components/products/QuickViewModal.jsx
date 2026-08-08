import { X, ShoppingCart, Star, Check } from 'lucide-react'
import { useCart } from '../../context/cartContext'
import { productIcon, formatINR } from '../../utils'

function QuickViewModal({ product, onClose }) {
  const { addItem } = useCart()

  if (!product) return null
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
    >
      <div
        className="grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-lux md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 bg-surface md:h-auto">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${product.gradient}`}>
              <span className="text-8xl drop-shadow-xl">{productIcon(product.name)}</span>
            </div>
          )}
        </div>
        <div className="p-7">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              {product.category}
            </span>
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-mist transition hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <h3 className="mt-3 text-2xl font-bold text-ink">{product.name}</h3>
          <p className="mt-1 text-mist">{product.tagline}</p>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-star">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-current' : 'opacity-30'}`} />
              ))}
            </div>
            <span className="text-sm font-semibold text-ink">{product.rating}</span>
            <span className="text-sm text-mist">({product.reviews.toLocaleString('en-IN')} reviews)</span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <p className="text-3xl font-extrabold text-ink">{formatINR(product.price)}</p>
            <p className="text-lg text-mist line-through">{formatINR(product.mrp)}</p>
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold text-accent">
              {discount}% OFF
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-mist">{product.description}</p>

          <ul className="mt-4 space-y-2 text-sm text-mist">
            {['Doctor reviewed formula', 'Free & discreet delivery', 'COD available'].map((li) => (
              <li key={li} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Check className="h-3 w-3" />
                </span>
                {li}
              </li>
            ))}
          </ul>

          <button
            onClick={() => addItem(product)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-sm font-bold text-white shadow-xl shadow-accent/25 transition hover:bg-accent-dark"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart — {formatINR(product.price)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal
