import { Truck, ShieldCheck, BadgePercent, CreditCard, Star, Lock } from 'lucide-react'

const items = [
  { icon: Truck, text: 'Free Delivery Across India' },
  { icon: ShieldCheck, text: '100% Discreet Packaging' },
  { icon: BadgePercent, text: 'Up to 40% Off Every Day' },
  { icon: CreditCard, text: 'Cash on Delivery Available' },
  { icon: Star, text: 'Rated 4.9/5 by 50,000+ Men' },
  { icon: Lock, text: 'Secure & Private Checkout' },
]

function Marquee() {
  const strip = [...items, ...items]

  return (
    <div className="relative mt-20 overflow-hidden border-y border-accent/20 bg-accent py-4">
      <div
        className="flex w-max items-center gap-12 pr-12"
        style={{ animation: 'marquee 28s linear infinite' }}
      >
        {strip.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-3 text-sm font-bold uppercase tracking-widest text-white">
            <item.icon className="h-5 w-5 text-amber-200" />
            {item.text}
            <span className="ml-8 text-amber-200/70">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
