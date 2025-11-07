import React from 'react'

export default function PeneiraMetrics(){
  const items = [
    { label: 'Vagas abertas', value: '124', color: 'text-brand-700' },
    { label: 'Cidades', value: '18', color: 'text-emerald-600' },
    { label: 'Datas próximas', value: '7', color: 'text-brand-700' },
    { label: 'Taxa média', value: 'R$ 30', color: 'text-emerald-600' }
  ]
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => (
        <div key={i} className="glass rounded-2xl p-5 text-center hover:shadow-card transition-all">
          <p className="text-xs uppercase tracking-wide text-slate-500">{it.label}</p>
          <div className={`text-3xl font-extrabold ${it.color}`}>{it.value}</div>
        </div>
      ))}
    </section>
  )
}
