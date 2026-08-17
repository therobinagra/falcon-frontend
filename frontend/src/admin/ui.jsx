import { X } from 'lucide-react'

export function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl border border-line bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-mist">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  )
}

export function Input({ label, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-bold text-ink">{label}</span>}
      <input
        {...props}
        className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-mist/60 focus:border-accent/60 focus:bg-white"
      />
    </label>
  )
}

export function Select({ label, children, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-bold text-ink">{label}</span>}
      <select
        {...props}
        className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none transition focus:border-accent/60 focus:bg-white"
      >
        {children}
      </select>
    </label>
  )
}

export function Textarea({ label, ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-sm font-bold text-ink">{label}</span>}
      <textarea
        {...props}
        className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-mist/60 focus:border-accent/60 focus:bg-white"
      />
    </label>
  )
}

export function Btn({ children, variant = 'primary', className = '', ...props }) {
  const styles = {
    primary:
      'bg-accent text-white hover:bg-accent-dark shadow-md shadow-accent/20',
    soft: 'bg-accent-soft text-accent hover:bg-accent hover:text-white',
    outline: 'border border-line bg-white text-ink hover:border-accent/50 hover:text-accent',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export function Badge({ children, tone = 'accent' }) {
  const tones = {
    accent: 'bg-accent-soft text-accent',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    red: 'bg-red-50 text-red-600',
    blue: 'bg-sky-50 text-sky-700',
    slate: 'bg-slate-100 text-slate-600',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function Modal({ open, title, onClose, children }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-ink/50 p-4 py-10 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-white shadow-lux"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h3 className="text-lg font-bold text-ink">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-mist transition hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export function EmptyState({ icon = '📦', title, sub }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-line bg-surface py-16 text-center">
      <span className="text-4xl">{icon}</span>
      <p className="font-bold text-ink">{title}</p>
      {sub && <p className="text-sm text-mist">{sub}</p>}
    </div>
  )
}

export function Th({ children }) {
  return (
    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-mist">
      {children}
    </th>
  )
}

export function Td({ children }) {
  return <td className="whitespace-nowrap px-4 py-3 text-sm text-ink">{children}</td>
}
