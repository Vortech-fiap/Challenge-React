export default function HeroBanner({ badge, title, subtitle, ctaLabel, onCta, gradient }){
  return (
    <section className="relative overflow-hidden rounded-3xl p-6 md:p-10 shadow-card text-white" style={{background: gradient}}>
      <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-2xl animate-blob"></div>
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-60 w-60 rounded-full bg-white/10 blur-2xl animate-blob"></div>

      {badge && <div className="flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur">⭐ <span>{badge}</span></div>}
      {title && <h1 className="mt-3 md:mt-4 text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight">{title}</h1>}
      {subtitle && <p className="mt-2 md:mt-3 text-sm md:text-base text-white/90 max-w-3xl">{subtitle}</p>}
      {ctaLabel && (
        <div className="mt-5">
          <button onClick={onCta} className="group inline-flex items-center gap-2 rounded-2xl bg-white/90 text-brand-700 px-4 py-2 font-semibold hover:bg-white transition-all shadow hover:shadow-lg hover:-translate-y-0.5">{ctaLabel} <span className="transition-transform group-hover:translate-x-1">→</span></button>
        </div>
      )}
    </section>
  )
}