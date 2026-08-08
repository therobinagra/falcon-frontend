import { useState } from 'react'
import { Plus, MessageCircle, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import FadeIn from '../ui/FadeIn'

const FAQS = [
  {
    q: 'Is my order packaged discreetly?',
    a: 'Yes, 100%. Your order ships in a plain, unmarked box with no brand name or product details on the outside. The invoice mentions a neutral brand, so nobody can guess what is inside.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Most metro cities get delivery in 24–48 hours, and the rest of India within 3–5 business days. Orders above ₹499 ship free.',
  },
  {
    q: 'Are your products safe and genuine?',
    a: 'Every product is sourced directly from licensed manufacturers, is 100% authentic, and we follow strict quality checks. You also get a free doctor consultation on every order.',
  },
  {
    q: 'Do I need a prescription to order?',
    a: 'No. You can order without a prescription. However, our in-house doctors review your order and may follow up if any product needs a quick check-in for your safety.',
  },
  {
    q: 'How do I use delay spray or gel?',
    a: 'Apply 2–3 sprays (or a pea-sized amount of gel) 10–15 minutes before intimacy and gently rub it in. Wait for it to dry for the best effect. Start with less and adjust as needed.',
  },
  {
    q: 'Can I return or exchange a product?',
    a: 'For hygiene reasons, opened or used intimacy products cannot be returned. If your order arrives damaged or with the wrong items, reach out within 48 hours and we will replace it free of cost.',
  },
  {
    q: 'Is COD available?',
    a: 'Yes, Cash on Delivery is available across India on orders up to ₹5,000. UPI, cards and net banking are also supported at checkout.',
  },
  {
    q: 'Is my personal information private?',
    a: 'Absolutely. Your details are encrypted and never shared with anyone. No promotional SMS or email, and nothing is ever printed on the package that reveals your order.',
  },
]

function FaqSection() {
  const [open, setOpen] = useState(0)

  const helpCards = [
    { icon: MessageCircle, title: 'Chat with us', desc: 'Live support, 9 AM – 11 PM' },
    { icon: Truck, title: 'Free delivery', desc: 'On all orders above ₹499' },
    { icon: ShieldCheck, title: 'Discreet packaging', desc: 'Plain, unmarked box always' },
    { icon: RotateCcw, title: 'Easy replacements', desc: 'Damaged items replaced free' },
  ]

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          <div className="space-y-4">
            {FAQS.slice(0, 4).map((faq, i) => (
              <FadeIn key={faq.q} delay={0.05 * i}>
                <FaqItem
                  faq={faq}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? -1 : i)}
                />
              </FadeIn>
            ))}
          </div>

          <div className="space-y-4">
            {FAQS.slice(4).map((faq, i) => (
              <FadeIn key={faq.q} delay={0.05 * i}>
                <FaqItem
                  faq={faq}
                  isOpen={open === i + 4}
                  onToggle={() => setOpen(open === i + 4 ? -1 : i + 4)}
                />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.1}>
            <div className="rounded-[2rem] bg-gradient-to-br from-accent to-amber-700 p-8 text-white lg:sticky lg:top-28">
              <h3 className="text-2xl font-extrabold">Still have questions?</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Our support team is always happy to help — real humans, fast replies.
              </p>
              <div className="mt-6 space-y-3">
                {helpCards.map((card) => (
                  <div
                    key={card.title}
                    className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20">
                      <card.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold">{card.title}</p>
                      <p className="text-xs text-white/75">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition duration-300 ${
        isOpen ? 'border-accent bg-accent-soft/60 shadow-md' : 'border-line bg-white hover:border-accent/40'
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className={`font-bold leading-snug ${isOpen ? 'text-accent' : 'text-ink'}`}>{faq.q}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition duration-300 ${
            isOpen ? 'rotate-45 bg-accent text-white' : 'bg-surface text-accent'
          }`}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-mist">{faq.a}</p>
        </div>
      </div>
    </div>
  )
}

export default FaqSection
