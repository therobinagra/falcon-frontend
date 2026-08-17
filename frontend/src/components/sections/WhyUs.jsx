import { Truck, ShieldCheck, Package, Headphones, Lock, Award } from 'lucide-react'
import FadeIn from '../ui/FadeIn'

const features = [
  {
    icon: Truck,
    title: 'Fast & Free Delivery',
    desc: 'Dispatched within 24 hours, delivered free across India in plain packaging.',
    color: 'from-amber-500 to-orange-400',
    bg: 'bg-amber-50',
  },
  {
    icon: ShieldCheck,
    title: 'Doctor Approved',
    desc: 'Every formula is reviewed and certified by qualified medical professionals.',
    color: 'from-sky-500 to-indigo-400',
    bg: 'bg-sky-50',
  },
  {
    icon: Package,
    title: '100% Discreet',
    desc: 'Plain, unbranded boxes with zero hints about the contents. Your secret stays safe.',
    color: 'from-violet-500 to-fuchsia-400',
    bg: 'bg-violet-50',
  },
  {
    icon: Headphones,
    title: '24/7 Care Team',
    desc: 'A dedicated support team available around the clock for any concern.',
    color: 'from-amber-500 to-orange-400',
    bg: 'bg-amber-50',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    desc: 'Encrypted transactions with COD, UPI and card options for total peace of mind.',
    color: 'from-rose-500 to-pink-400',
    bg: 'bg-rose-50',
  },
  {
    icon: Award,
    title: 'Lab Tested Quality',
    desc: 'GMP-certified manufacturing with third-party lab testing on every batch.',
    color: 'from-teal-500 to-cyan-400',
    bg: 'bg-teal-50',
  },
]

function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden bg-gradient-to-b from-white via-surface to-white py-24">
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-amber-200/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-sky-200/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Built on trust, backed by science
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={0.06 * i}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-lux">
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent to-amber-500 transition duration-300 group-hover:scale-x-100" />
                <div className="flex items-start justify-between">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <feature.icon className="h-7 w-7" />
                  </span>
                  <span className="text-4xl font-black leading-none text-line/70 transition group-hover:text-accent/15">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-ink">{feature.title}</h3>
                <p className="mt-2.5 leading-relaxed text-mist">{feature.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
