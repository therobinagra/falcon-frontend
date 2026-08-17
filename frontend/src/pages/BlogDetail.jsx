import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { blogApi } from '../api'
import { articles as fallbackArticles } from '../data/articles'

function renderBody(body) {
  const lines = body.split('\n')
  const blocks = []
  let list = []

  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="my-4 space-y-2">
          {list.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-mist">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )
      list = []
    }
  }

  lines.forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed) {
      flushList()
      return
    }
    if (trimmed.startsWith('## ')) {
      flushList()
      blocks.push(
        <h2
          key={`h-${blocks.length}`}
          className="mt-10 text-xl font-extrabold text-ink sm:text-2xl"
        >
          {trimmed.slice(3)}
        </h2>
      )
    } else if (trimmed.startsWith('- ')) {
      list.push(trimmed.slice(2))
    } else {
      flushList()
      blocks.push(
        <p key={`p-${blocks.length}`} className="mt-4 leading-relaxed text-mist">
          {trimmed}
        </p>
      )
    }
  })
  flushList()

  return blocks
}

function BlogDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    blogApi
      .getBlog(id)
      .then((data) => {
        if (active) setArticle(data && data._id ? data : null)
      })
      .catch(() => {
        if (active) setArticle(fallbackArticles.find((a) => a.id === id) ?? null)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [id])

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-28 sm:px-6">
        <div className="h-96 animate-pulse rounded-[2rem] border border-line bg-surface" />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:px-6">
        <p className="text-6xl">📄</p>
        <h1 className="mt-6 text-3xl font-extrabold text-ink">Article not found</h1>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-accent-dark"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-surface to-white pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-mist transition hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-line bg-white shadow-sm">
          <div className="relative h-72 overflow-hidden sm:h-80">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-7 sm:p-10">
            <div className="flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-accent-soft px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-accent">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-mist">
                <Calendar className="h-3.5 w-3.5 text-accent" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-mist">
                <Clock className="h-3.5 w-3.5 text-accent" />
                {article.readTime}
              </span>
            </div>

            <h1 className="mt-5 text-2xl font-extrabold leading-tight text-ink sm:text-4xl">
              {article.title}
            </h1>

            <div className="mt-8">{renderBody(article.body)}</div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border-2 border-line px-6 py-3 text-sm font-bold text-ink transition hover:border-accent hover:bg-accent hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
