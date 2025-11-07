export default function FeaturedTeam({ badgeText='BR', title='Seleção Brasileira', lines=[], ctaLabel='Seguir Time', onCta }){
  return (
    <section className="rounded-3xl p-6 text-brand-900 shadow-card hover:shadow-xl transition-all hover:-translate-y-0.5" style={{background:'linear-gradient(120deg,#f3e8ff 0%,#ede9fe 40%,#e9fdf5 100%)'}}>
      <div className="flex items-center gap-2 mb-3">
        <span>📣⭐</span>
        <h3 className="text-lg font-extrabold text-brand-700">Time em Destaque</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr,auto] items-center">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl grid place-items-center text-white font-bold shadow" style={{background:'linear-gradient(135deg,#7c3aed,#22c55e)'}}>{badgeText}</div>
          <div>
            <p className="font-semibold">{title}</p>
            {lines.map((l,idx)=> <p key={idx} className="text-sm text-slate-600">{l}</p>)}
          </div>
        </div>
        <button onClick={onCta} className="justify-self-end rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white px-5 py-2 font-semibold hover:from-brand-700 hover:to-brand-600 transition-all shadow hover:shadow-lg hover:-translate-y-0.5">{ctaLabel}</button>
      </div>
    </section>
  )
}