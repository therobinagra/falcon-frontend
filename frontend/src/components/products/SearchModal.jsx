import { useEffect, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { getProducts } from '../../api'
import { productIcon, formatINR } from '../../utils'

function SearchModal({ open, onClose, onAdd }) {
  const [query, setQuery] = useState('')
  const [all, setAll] = useState([])

  useEffect(() => {
    getProducts().then(setAll).catch(() => {})
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKey)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return all.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tagline || '').toLowerCase().includes(q)
    )
  }, [query, all])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/50 p-4 pt-24 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-lux"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <Search className="h-5 w-5 text-mist" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories..."
            className="w-full bg-transparent text-base text-ink outline-none placeholder:text-mist"
            aria-label="Search products"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-mist transition hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <p className="px-2 py-10 text-center text-sm text-mist">
              Type to search for products, categories and more.
            </p>
          ) : results.length === 0 ? (
            <p className="px-2 py-10 text-center text-sm text-mist">
              No products found for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            <ul className="space-y-2">
              {results.map((product) => (
                <li key={product._id}>
                  <div className="flex items-center gap-4 rounded-2xl border border-line p-3 transition hover:border-accent/40 hover:bg-surface">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-14 w-14 shrink-0 rounded-xl object-cover"
                      />
                    ) : (
                      <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${product.gradient} text-2xl`}>
                        {productIcon(product.name)}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-ink">{product.name}</p>
                      <p className="text-xs text-mist">{product.category}</p>
                    </div>
                    <p className="text-sm font-extrabold text-accent">{formatINR(product.price)}</p>
                    <button
                      onClick={() => {
                        onAdd(product)
                        onClose()
                      }}
                      className="shrink-0 rounded-full bg-accent px-4 py-2 text-xs font-bold text-white transition hover:bg-accent-dark"
                    >
                      Add
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal
