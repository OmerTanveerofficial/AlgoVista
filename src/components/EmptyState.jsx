export default function EmptyState({ title, hint, action }) {
  return (
    <div className="px-6 py-16 text-center border border-white/10 rounded-2xl bg-white/[0.02]">
      {title && <p className="text-white/80 text-sm">{title}</p>}
      {hint && <p className="text-white/40 text-xs mt-1">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
