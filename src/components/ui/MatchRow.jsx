export default function MatchRow({ title, time, comp, when }){
  return (
    <li className="rounded-xl bg-brand-50/60 border border-brand-100 p-3 hover:bg-brand-100/60 transition-all">
      <div className="flex items-center justify-between text-sm"><p className="font-semibold">{title}</p><span className="font-bold text-brand-700">{time}</span></div>
      <div className="flex items-center justify-between text-xs text-slate-500"><span>{comp}</span><span>{when}</span></div>
    </li>
  )
}