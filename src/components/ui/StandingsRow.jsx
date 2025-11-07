import React from 'react'

function FormBadge({ type }){
  const map = {
    V: 'bg-emerald-100 text-emerald-700',
    E: 'bg-amber-100 text-amber-700',
    D: 'bg-rose-100 text-rose-700',
  }
  return <span className={`form-badge ${map[type]||''}`}>{type}</span>
}

export default function StandingsRow({ rank, team, crown=false, form=[], played, won, draw, lost, goalsFor, goalsAgainst, gd, points, highlight=false, badgeNode }){
  return (
    <div className="row-hover rounded-2xl border border-purple-100 p-3 sm:p-4 grid gap-3 grid-cols-1 md:[grid-template-columns:42px_1fr_auto]">
      <div className="flex items-center gap-3 md:block">
        <div className={`h-8 w-8 rounded-full grid place-items-center ${highlight ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'} font-bold`}>{rank}</div>
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {badgeNode && (
            <span className="inline-flex items-center justify-center h-6 w-6 rounded bg-white ring-1 ring-slate-200 overflow-hidden">
              {badgeNode}
            </span>
          )}
          <span className="text-brand-800 font-extrabold truncate">{team}</span>
          {crown && <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">👑</span>}
          <div className="ml-1 flex gap-1">
            {form.map((f,i)=> <FormBadge key={i} type={f} />)}
          </div>
        </div>
      </div>

      <div className="text-right text-[11px] sm:text-sm text-slate-600 md:order-none order-last">
        <div className="grid grid-cols-5 gap-2 sm:gap-3 items-baseline">
          <div><span className="font-bold text-slate-900">{played}</span><div className="text-[10px]">J</div></div>
          <div><span className="font-bold text-slate-900">{won}</span><div className="text-[10px]">V</div></div>
          <div><span className="font-bold text-slate-900">{draw}</span><div className="text-[10px]">E</div></div>
          <div><span className="font-bold text-slate-900">{lost}</span><div className="text-[10px]">D</div></div>
          <div>
            <div className="text-[11px] sm:text-xs"><span className="font-semibold">{goalsFor}:{goalsAgainst}</span> <span className="text-slate-500">Gols</span></div>
            <div className="text-[11px] sm:text-xs"><span className={`font-semibold ${gd>=0?'text-emerald-600':'text-rose-600'}`}>{gd>=0?`+${gd}`:gd}</span> <span className="text-slate-500">SG</span></div>
          </div>
        </div>
      </div>

      <div className="md:justify-self-end">
        <span className="inline-flex items-center rounded-full bg-brand-600 text-white text-xs font-bold px-3 py-1.5">{points} pts</span>
      </div>
    </div>
  )
}
