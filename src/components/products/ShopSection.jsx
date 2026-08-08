import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getProducts } from '../../api'
import ProductCard from './ProductCard'
import QuickViewModal from './QuickViewModal'

function CircleItem({ circle, active, onSelect }) {
  const isActive = active === circle.name

  return (
    <button
      onClick={() => onSelect(circle.name)}
      className="flex w-24 shrink-0 flex-col items-center gap-2.5 sm:w-28"
      aria-label={`Filter by ${circle.name}`}
    >
      <span
        className={`relative h-20 w-20 overflow-hidden rounded-full border-2 bg-surface shadow-lg transition sm:h-24 sm:w-24 ${
          isActive
            ? 'scale-105 border-accent ring-4 ring-accent/20'
            : 'border-line hover:scale-105 hover:border-accent/50'
        }`}
      >
        {circle.image ? (
          <img
            src={circle.image}
            alt={circle.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-4xl">🧴</span>
        )}
      </span>
      <span
        className={`text-center text-xs font-bold leading-tight sm:text-sm ${
          isActive ? 'text-accent' : 'text-mist'
        }`}
      >
        {circle.name}
      </span>
    </button>
  )
}

function ShopSection() {
  const [allProducts, setAllProducts] = useState([])
  const [active, setActive] = useState('All Products')
  const [loading, setLoading] = useState(true)
  const [quickView, setQuickView] = useState(null)
  const trackRef = useRef(null)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const category = searchParams.get('category')
    if (category && category !== 'All Products') setActive(category)
  }, [searchParams])

  useEffect(() => {
    getProducts()
      .then(setAllProducts)
      .catch(() => setAllProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const circles = useMemo(() => {
    const byCategory = {}
    allProducts.forEach((p) => {
      if (!byCategory[p.category]) byCategory[p.category] = p.image
    })
    const bestseller =
      allProducts.find((p) => p.badge)?.image || allProducts[0]?.image || ''
    const allImage = allProducts[0]?.image || ''

    return [
      { name: 'All Products', image: allImage },
      { name: 'Bestsellers', image: bestseller },
      ...Object.entries(byCategory).map(([name, image]) => ({ name, image })),
    ]
  }, [allProducts])

  const products = useMemo(() => {
    if (active === 'All Products') return allProducts
    if (active === 'Bestsellers') return allProducts.filter((p) => p.badge)
    return allProducts.filter((p) => p.category === active)
  }, [active, allProducts])

  const scrollBy = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' })
  }

  return (
    <section id="shop" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-accent">
          Shop the range
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Tap a product to explore
        </h2>
      </div>

      <div className="relative mt-8">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll categories left"
          className="absolute -left-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-lg transition hover:border-accent hover:text-accent md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div ref={trackRef} className="flex gap-5 overflow-x-auto px-1 py-3 sm:gap-7 md:mx-14">
          {circles.map((circle) => (
            <CircleItem key={circle.name} circle={circle} active={active} onSelect={setActive} />
          ))}
        </div>

        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll categories right"
          className="absolute -right-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-lg transition hover:border-accent hover:text-accent md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {loading ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-3xl border border-line bg-surface" />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onQuickView={setQuickView} />
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <p className="mt-10 text-center text-mist">No products found.</p>
      )}

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </section>
  )
}

export default ShopSection
