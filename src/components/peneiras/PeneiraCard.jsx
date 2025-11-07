import React from 'react'

export default function PeneiraCard({ id, badge1, badge2, title, details, onApply }){
  return (
    <article className="peneira-card rounded-3xl border border-brand-100 bg-white/80 backdrop-blur p-5 hover:shadow-card transition-all hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            {badge1}
            {badge2}
          </div>
          <h3 className="mt-1 text-lg font-extrabold text-brand-800">{title}</h3>
          <p className="text-sm text-slate-600">{details}</p>
        </div>
        <button onClick={()=>onApply?.({ id, title })} className="inscrever rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white px-4 py-2 text-sm font-semibold hover:from-brand-700 hover:to-brand-600 transition-all shadow">Inscrever-se</button>
      </div>
    </article>
  )
}
