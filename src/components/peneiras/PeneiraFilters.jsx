import React from 'react'

export default function PeneiraFilters({ search, filters, onSearch, onToggleFilter, onClear }){
  const candidates = ['São Paulo','Rio de Janeiro','Sub-17','Sub-20']
  return (
    <div className="glass rounded-2xl p-4">
      <div className="grid gap-3 md:grid-cols-[1fr,auto,auto,auto] items-center">
        <input value={search} onChange={e=>onSearch(e.target.value)} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="Buscar por clube, cidade ou categoria…" />
        <div className="flex flex-wrap gap-2">
          {candidates.map(lbl => {
            const active = filters.includes(lbl)
            return (
              <button key={lbl} onClick={()=>onToggleFilter(lbl)} className={`px-3 py-1.5 rounded-full text-sm border ${active ? 'border-brand-300 bg-brand-50 text-brand-700' : 'border-emerald-300 bg-white text-slate-700'}`}>
                {lbl}
              </button>
            )
          })}
        </div>
        <button onClick={onClear} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50">Limpar</button>
      </div>
    </div>
  )
}
