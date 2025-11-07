import useCountUp from '../../hooks/useCountUp'

export default function StatCard({ label, value, colorClass='text-brand-700', animated=true, duration=900 }){
  const v = useCountUp(value, duration)
  const display = animated ? v : value
  return (
    <div className="glass rounded-2xl p-5 text-center shadow-sm hover:shadow-card transition-all">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <div className={`text-3xl font-extrabold mt-1 ${colorClass}`}>{display}</div>
    </div>
  )
}