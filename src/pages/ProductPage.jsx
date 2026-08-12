import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
} from 'lucide-react'
import { getProducts } from '../api'
import { useCart } from '../context/cartContext'
import { formatINR } from '../utils'
import ProductCard from '../components/products/ProductCard'
import QuickViewModal from '../components/products/QuickViewModal'
import FadeIn from '../components/ui/FadeIn'

function ProductPage() {
  const { id } = useParams()
  const { addItem, wishlist, toggleWishlist } = useCart()
  const [product, setProduct] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [quickView, setQuickView] = useState(null)

  useEffect(() => {
    getProducts()
      .then((data) => {
        setAllProducts(data)
        setProduct(data.find((p) => p._id === id) ?? null)
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    setQty(1)
  }, [id])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="h-96 animate-pulse rounded-[2rem] border border-line bg-surface" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
        <p className="text-6xl">🧴</p>
        <h1 className="mt-6 text-3xl font-extrabold text-ink">Product not found</h1>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-accent-dark"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>
      </div>
    )
  }

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100)
  const wished = wishlist.includes(product._id)
  const related = product.related?.length
    ? product.related
        .map((slug) => allProducts.find((p) => p.slug === slug))
        .filter(Boolean)
    : allProducts
        .filter((p) => p.category === product.category && p._id !== product._id)
        .slice(0, 4)

  const perks = [
    { icon: Truck, label: 'Free delivery over ₹499' },
    { icon: ShieldCheck, label: '100% genuine products' },
    { icon: RotateCcw, label: 'Free doctor consultation' },
  ]

  return (
    <div className="bg-gradient-to-b from-surface to-white py-16 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 text-sm text-mist">
          <Link to="/" className="transition hover:text-accent">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/products" className="transition hover:text-accent">Products</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-semibold text-ink">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <div className="group relative overflow-hidden rounded-[2rem] border border-line bg-white shadow-sm">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-96 w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[520px]"
                />
              ) : (
                <div className={`flex h-96 w-full items-center justify-center bg-gradient-to-br ${product.gradient} sm:h-[520px]`}>
                  <span className="text-8xl">🧴</span>
                </div>
              )}
              {product.badge && (
                <span className="absolute left-6 top-6 rounded-full bg-accent px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-md">
                  {product.badge}
                </span>
              )}
              <button
                onClick={() => toggleWishlist(product._id)}
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border shadow-md transition ${
                  wished
                    ? 'border-accent bg-accent text-white'
                    : 'border-line bg-white/95 text-mist hover:text-accent'
                }`}
              >
                <Heart className={`h-5 w-5 ${wished ? 'fill-current' : ''}`} />
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-accent">
                {product.category}
              </span>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 text-lg font-semibold text-mist">{product.tagline}</p>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-star">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-current' : 'opacity-30'}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-ink">{product.rating}</span>
                <span className="text-sm text-mist">
                  ({product.reviews.toLocaleString('en-IN')} reviews)
                </span>
              </div>

              <div className="mt-6 flex items-end gap-3">
                <p className="text-4xl font-extrabold text-ink">{formatINR(product.price)}</p>
                <p className="pb-1 text-xl text-mist line-through">{formatINR(product.mrp)}</p>
                <span className="mb-1 rounded-full bg-red-50 px-3 py-1 text-xs font-extrabold text-red-600">
                  {discount}% OFF
                </span>
              </div>

              <p className="mt-6 leading-relaxed text-mist">{product.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-line bg-white px-4 py-2 text-xs font-bold text-ink">
                  ✓ Discreet packaging
                </span>
                <span className="rounded-full border border-line bg-white px-4 py-2 text-xs font-bold text-ink">
                  ✓ Genuine products
                </span>
                <span className="rounded-full border border-line bg-white px-4 py-2 text-xs font-bold text-ink">
                  ✓ Free doctor consult
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-full border-2 border-line bg-white">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-12 w-12 items-center justify-center text-ink transition hover:text-accent"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-lg font-extrabold text-ink">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="flex h-12 w-12 items-center justify-center text-ink transition hover:text-accent"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => addItem(product, qty)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold text-white shadow-lg shadow-accent/25 transition hover:bg-accent-dark sm:flex-none"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart — {formatINR(product.price * qty)}
                </button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {perks.map((perk) => (
                  <div key={perk.label} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <perk.icon className="h-5 w-5" />
                    </span>
                    <p className="text-xs font-bold leading-snug text-ink">{perk.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <FadeIn className="flex flex-col gap-2">
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                You may also like
              </h2>
              <p className="text-mist">More from the {product.category} range.</p>
            </FadeIn>
            <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {related.map((p, i) => (
                <FadeIn key={p._id} delay={0.06 * i}>
                  <ProductCard product={p} onQuickView={setQuickView} />
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  )
}

export default ProductPage
