export default function TabBar({ tabs, activeKey, onChange }){
  return (
    <div
      className="grid text-center rounded-2xl border border-brand-100 overflow-hidden"
      style={{ gridTemplateColumns: `repeat(${tabs.length || 2}, minmax(0, 1fr))` }}
    >
      {tabs.map(t => (
        <button key={t.key} onClick={() => onChange(t.key)} className={`px-4 py-2 text-sm ${activeKey===t.key ? 'font-semibold bg-white text-brand-700' : 'font-medium text-slate-600 hover:bg-brand-50'}`}>
          {t.label}
        </button>
      ))}
    </div>
  )
}