import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const banners = [
  {
    image: '/images/banner1.jpg',
    eyebrow: 'India\u2019s Premium Men\u2019s Wellness Brand',
    title: 'Last longer. Feel stronger.',
    sub: 'Doctor-verified solutions for performance, stamina and confidence. Discreetly delivered.',
    cta: 'Shop Products',
    link: '#shop',
  },
  {
    image: '/images/banner2.jpg',
    eyebrow: 'Clinically Dosed Capsules & Oils',
    title: 'Build real stamina, naturally.',
    sub: 'Ashwagandha, Shilajit and more — backed by science and trusted by 1,00,000+ men.',
    cta: 'Explore Range',
    link: '#shop',
  },
  {
    image: '/images/banner3.jpg',
    eyebrow: '100% Private & Discreet',
    title: 'Confidence, delivered to your door.',
    sub: 'Plain packaging, free fast delivery and 24/7 support. Shop with total privacy.',
    cta: 'Shop Now',
    link: '#shop',
  },
]

const AUTOPLAY_MS = 5000

function HeroSection() {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => setIndex((i) => (i + 1) % banners.length), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + banners.length) % banners.length), [])

  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [next])

  const banner = banners[index]

  return (
    <section id="home" className="relative h-[620px] overflow-hidden bg-ink sm:h-[680px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/20" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/70 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-white backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              {banner.eyebrow}
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {banner.title}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{banner.sub}</p>

            <a
              href={banner.link}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-amber-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-amber-600/30 transition hover:bg-amber-500"
            >
              {banner.cta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={prev}
        aria-label="Previous banner"
        className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/25 sm:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next banner"
        className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/25 sm:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <a
        href="https://wa.me/919412870756"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="absolute bottom-8 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-600/30 transition hover:scale-110 hover:shadow-green-600/50 sm:right-10"
      >
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {banners.map((b, i) => (
          <button
            key={b.image}
            onClick={() => setIndex(i)}
            aria-label={`Go to banner ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? 'w-9 bg-amber-400' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
