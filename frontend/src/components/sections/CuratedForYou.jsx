import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ShieldCheck, HeartHandshake, Truck } from 'lucide-react'
import { getProducts } from '../../api'
import { formatINR } from '../../utils'
import FadeIn from '../ui/FadeIn'

function CuratedForYou() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts('Condoms & Lubes')
      .then((data) => setProducts(data.slice(0, 4)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const perks = [
    { icon: ShieldCheck, label: '100% Safe & Trusted' },
    { icon: HeartHandshake, label: 'Discreet Packaging' },
    { icon: Truck, label: 'Free Delivery Over ₹499' },
  ]

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
          <FadeIn>
            <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Explore India&apos;s best Condoms &amp; Lubes
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Link
              to="/products?category=Condoms%20%26%20Lubes"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-accent bg-white px-6 py-3 text-sm font-bold text-accent transition hover:bg-accent hover:text-white"
            >
              View All
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </FadeIn>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          {perks.map((perk) => (
            <span key={perk.label} className="flex items-center gap-2 text-sm font-semibold text-mist">
              <perk.icon className="h-4 w-4 text-accent" />
              {perk.label}
            </span>
          ))}
        </div>

        {loading ? (
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-[2rem] border border-line bg-surface sm:h-80" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product, i) => (
              <FadeIn key={product._id} delay={0.08 * i}>
                <Link
                  to="/products?category=Condoms%20%26%20Lubes"
                  className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-[2rem] border border-line shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lux sm:h-80"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent transition duration-300 group-hover:from-ink/85" />

                  <div className="relative p-5 sm:p-6">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-accent backdrop-blur">
                      <span className="text-star">★</span> {product.rating}
                    </span>
                    <h3 className="mt-3 text-base font-extrabold leading-tight text-white sm:text-lg">
                      {product.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm font-bold text-white">
                        {formatINR(product.price)}{' '}
                        <span className="text-xs font-medium text-white/60 line-through">
                          {formatINR(product.mrp)}
                        </span>
                      </p>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-accent transition duration-300 group-hover:bg-accent group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CuratedForYou
