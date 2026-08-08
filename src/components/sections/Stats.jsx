import Counter from '../ui/Counter'
import FadeIn from '../ui/FadeIn'

const stats = [
  { to: 100, suffix: 'K+', label: 'Happy Customers' },
  { to: 500, suffix: '+', label: 'Certified Doctors' },
  { to: 4.9, suffix: '★', label: 'Average Rating', decimals: 1 },
  { to: 99, suffix: '%', label: 'Privacy Guaranteed' },
]

function Stats() {
  return (
    <section className="mx-auto mt-24 max-w-7xl px-4 sm:mt-28 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-line bg-white p-8 shadow-lux lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="bg-gradient-to-br from-accent to-amber-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
                <Counter to={stat.to} suffix={stat.suffix} decimals={stat.decimals || 0} />
              </p>
              <p className="mt-2 text-sm font-medium text-mist">{stat.label}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  )
}

export default Stats
