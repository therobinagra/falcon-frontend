import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import FadeIn from '../components/ui/FadeIn'
import { blogApi } from '../api'
import { articles as fallbackArticles } from '../data/articles'

function Blog() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    blogApi
      .getBlogs()
      .then((data) => {
        setArticles(Array.isArray(data) && data.length > 0 ? data : fallbackArticles)
      })
      .catch(() => setArticles(fallbackArticles))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-white pb-6 pt-32 sm:pt-36">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-amber-200/40 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="max-w-2xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Wellness advice from our experts
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-[1.75rem] border border-line bg-surface" />
            ))}
          {!loading && articles.length === 0 && (
            <p className="col-span-full py-16 text-center text-sm text-mist">No blog posts yet.</p>
          )}
          {articles.map((article, i) => (
            <FadeIn key={article._id || article.id} delay={0.06 * i}>
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
                  <p className="mt-3 text-sm leading-relaxed text-mist/80 line-clamp-3">
                    {article.body}
                  </p>

                  <Link
                    to={`/blog/${article._id || article.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent transition group-hover:gap-3"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  )
}

export default Blog
