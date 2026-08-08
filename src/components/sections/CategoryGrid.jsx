import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { getProducts } from '../../api'
import FadeIn from '../ui/FadeIn'

function CategoryGrid() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
      .then((data) => {
        const map = {}
        data.forEach((p) => {
          if (!map[p.category]) {
            map[p.category] = { name: p.category, image: p.image, count: 0 }
          }
          map[p.category].count += 1
        })
        setCategories(Object.values(map))
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="bg-gradient-to-b from-white to-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            THE BOLD LINEUP
          </h2>
        </FadeIn>

        {loading ? (
          <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-[2rem] border border-line bg-white sm:h-80" />
            ))}
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((cat, i) => (
              <FadeIn key={cat.name} delay={0.08 * i}>
                <Link
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-[2rem] border border-line shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lux sm:h-80"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />

                  <div className="relative p-6">
                    <h3 className="text-xl font-extrabold leading-tight text-white sm:text-2xl">
                      {cat.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm font-medium text-white/80">{cat.count} products</p>
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

export default CategoryGrid
