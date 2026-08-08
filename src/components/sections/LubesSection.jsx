import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../api'
import { formatINR } from '../../utils'
import FadeIn from '../ui/FadeIn'

const FLAVOURS = [
  { match: 'strawberry', emoji: '🍓' },
  { match: 'cherry', emoji: '🍒' },
  { match: 'mango', emoji: '🥭' },
  { match: 'silky', emoji: '💧' },
]

function flavourOf(name) {
  return FLAVOURS.find((f) => name.toLowerCase().includes(f.match)) ?? FLAVOURS[3]
}

function LubesSection() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts('Condoms & Lubes')
      .then((data) => setProducts(data.filter((p) => /lubricant|lube/i.test(p.name)).slice(0, 4)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            LUBES — 4 flavours
          </h2>
        </FadeIn>

        {loading ? (
          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-[2rem] border border-line bg-white sm:h-80" />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-5 md:grid-cols-4">
            {products.map((product, i) => {
              const flavour = flavourOf(product.name)
              return (
                <FadeIn key={product._id} delay={0.08 * i}>
                  <Link
                    to={`/product/${product._id}`}
                    className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-[2rem] border border-line shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lux sm:h-80"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent transition duration-300 group-hover:from-ink/85" />

                    <span className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-2xl shadow-md ring-1 ring-black/5">
                      {flavour.emoji}
                    </span>
                    {product.badge && (
                      <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-white shadow-md">
                        {product.badge}
                      </span>
                    )}

                    <div className="relative p-5 sm:p-6">
                      <h3 className="text-base font-extrabold leading-tight text-white sm:text-lg">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm font-bold text-white">
                        {formatINR(product.price)}{' '}
                        <span className="text-xs font-medium text-white/60 line-through">
                          {formatINR(product.mrp)}
                        </span>
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default LubesSection
