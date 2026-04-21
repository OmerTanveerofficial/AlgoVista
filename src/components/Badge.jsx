const TONE = {
  neutral: 'bg-white/5 text-white/70 border-white/10',
  primary: 'bg-primary/15 text-primary-light border-primary/30',
  accent:  'bg-accent/15 text-accent-light border-accent/30',
  ok:      'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  warn:    'bg-amber-500/15 text-amber-300 border-amber-500/30',
  danger:  'bg-rose-500/15 text-rose-300 border-rose-500/30',
}

export default function Badge({ tone = 'neutral', children, className = '' }) {
  const palette = TONE[tone] || TONE.neutral
  return (
    <span
      className={`inline-flex items-center px-2 h-5 rounded-full text-[10px] font-medium tracking-wide uppercase border ${palette} ${className}`}
    >
      {children}
    </span>
  )
}
