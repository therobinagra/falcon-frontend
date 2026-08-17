import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import FadeIn from '../ui/FadeIn'

function CTABanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-accent via-amber-700 to-orange-800 px-6 py-16 text-center text-white shadow-2xl shadow-accent/30 sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-amber-300/20 blur-2xl" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Limited Time Offer
            </span>

            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Ready to feel your best? <br className="hidden sm:block" />
              Start today with 40% off
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base text-amber-50/90 sm:text-lg">
              Doctor-approved performance and wellness solutions — delivered discreetly to your
              door. Free shipping on every order.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#shop"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-wide text-accent shadow-xl transition hover:bg-amber-50"
              >
                Shop Now
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-8 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-accent"
              >
                Contact Us
              </Link>
            </div>

            <p className="mt-6 text-xs text-amber-50/80">
              Free &amp; discreet delivery · COD available · 100% secure payments
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

export default CTABanner
