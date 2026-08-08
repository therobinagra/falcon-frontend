import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { getProducts } from '../../api'
import FadeIn from '../ui/FadeIn'

function DateNightKits() {
  const [kits, setKits] = useState([])
  const [loading, setLoading] = useState(true)
  const trackRef = useRef(null)

  useEffect(() => {
    getProducts('Date Night Kits')
      .then(setKits)
      .catch(() => setKits([]))
      .finally(() => setLoading(false))
  }, [])

  const scroll = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-card]')
    const amount = (card?.clientWidth ?? 320) + 24
    track.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent-soft via-white to-surface py-24">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-amber-200/40 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Plan the perfect date night
          </h2>
        </FadeIn>

        {loading ? (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-[420px] animate-pulse rounded-[2rem] border border-line bg-white" />
            ))}
          </div>
        ) : (
          <div className="relative mt-14">
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll kits left"
              className="absolute left-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-accent shadow-lux transition hover:bg-accent hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={() => scroll(1)}
              aria-label="Scroll kits right"
              className="absolute right-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-accent shadow-lux transition hover:bg-accent hover:text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div
              ref={trackRef}
              className="flex snap-x gap-6 overflow-x-auto scroll-smooth px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {kits.map((kit, i) => (
                <FadeIn key={kit._id} delay={0.06 * i}>
                  <Link
                    data-card
                    to={`/product/${kit._id}`}
                    className="group relative block h-[300px] w-[280px] shrink-0 snap-start overflow-hidden rounded-[2rem] border border-line shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lux sm:h-[380px] sm:w-[320px]"
                    aria-label={`View ${kit.name}`}
                  >
                    <img
                      src={kit.image}
                      alt={kit.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

                    <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-accent shadow-md backdrop-blur">
                      {kit.badge || 'Date Night Kit'}
                    </span>

                    <span className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
                      <span className="truncate text-lg font-extrabold text-white drop-shadow">
                        {kit.name}
                      </span>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-accent shadow-lg transition duration-300 group-hover:bg-accent group-hover:text-white">
                        <ArrowRight className="h-5 w-5" />
                      </span>
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default DateNightKits
