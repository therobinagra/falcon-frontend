import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import FadeIn from '../ui/FadeIn'
import { articles } from '../../data/articles'

function Articles() {
  const featured = articles.slice(0, 3)

  return (
    <section id="articles" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <FadeIn>
          <h2 className="max-w-xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Learn from our wellness experts
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-line px-6 py-3 text-sm font-bold text-ink transition hover:border-accent hover:bg-accent hover:text-white"
          >
            View all articles
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </div>

      <div className="mt-12 grid gap-7 md:grid-cols-3">
        {featured.map((article, i) => (
          <FadeIn key={article.id} delay={0.08 * i}>
            <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lux">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-accent shadow-md backdrop-blur">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="flex items-center gap-4 text-xs text-mist">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-accent" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    {article.readTime}
                  </span>
                </p>

                <h3 className="mt-3 text-lg font-bold leading-snug text-ink transition group-hover:text-accent">
                  {article.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist">{article.desc}</p>

                <Link
                  to="/blog"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
                </Link>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

export default Articles
