import { Heart, Eye, Star, ShoppingCart } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cartContext'
import { productIcon, formatINR } from '../../utils'

function discountPercent(price, mrp) {
  return Math.round(((mrp - price) / mrp) * 100)
}

function ProductCard({ product, onQuickView }) {
  const { addItem, wishlist, toggleWishlist } = useCart()
  const navigate = useNavigate()
  const discount = discountPercent(product.price, product.mrp)
  const wished = wishlist.includes(product._id)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lux">
      <div className="relative h-48 overflow-hidden bg-surface">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${product.gradient}`}>
            <span className="text-5xl">{productIcon(product.name)}</span>
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-white shadow-md">
          {discount}% OFF
        </span>

        <button
          onClick={() => toggleWishlist(product._id)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border shadow-md transition ${
            wished
              ? 'border-accent bg-accent text-white'
              : 'border-line bg-white/90 text-mist hover:text-accent'
          }`}
        >
          <Heart className={`h-4 w-4 ${wished ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={() => onQuickView(product)}
          aria-label="Quick view"
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-3 items-center gap-2 rounded-full border border-line bg-white/95 px-5 py-2.5 text-xs font-bold text-ink opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:border-accent hover:text-accent"
        >
          <Eye className="h-4 w-4" /> Quick View
        </button>

        <button
          onClick={() => navigate(`/product/${product._id}`)}
          aria-label="View product details"
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/95 text-mist opacity-100 shadow-lg transition duration-300 hover:border-accent hover:bg-accent hover:text-white"
          title="View details"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
          {product.category}
        </span>
        <Link to={`/product/${product._id}`}>
          <h3 className="mt-2 text-lg font-bold leading-snug text-ink transition group-hover:text-accent">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-star">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? 'fill-current' : 'opacity-30'}`} />
            ))}
          </div>
          <span className="text-xs font-semibold text-ink">{product.rating}</span>
          <span className="text-xs text-mist">({product.reviews.toLocaleString('en-IN')})</span>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
          <div>
            <p className="text-xl font-extrabold text-ink">{formatINR(product.price)}</p>
            <p className="text-sm text-mist line-through">{formatINR(product.mrp)}</p>
          </div>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-accent/20 transition hover:bg-accent-dark"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
