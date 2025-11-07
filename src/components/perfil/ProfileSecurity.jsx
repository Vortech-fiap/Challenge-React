import React from 'react'

export default function ProfileSecurity({ sec, secMsg, onChange, onUpdatePassword }){
  return (
    <form className="glass rounded-3xl p-5 md:p-6 shadow-sm">
      <h3 className="font-extrabold text-lg text-brand-700 mb-4">Segurança</h3>
      <label className="block text-sm font-medium text-slate-700 mb-1">Senha Atual</label>
      <input value={sec.current} onChange={e=>onChange({current:e.target.value})} type="password" className="w-full rounded-xl border border-slate-200 px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-brand-300" />
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nova Senha</label>
          <input value={sec.next} onChange={e=>onChange({next:e.target.value})} type="password" className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar Nova</label>
          <input value={sec.next2} onChange={e=>onChange({next2:e.target.value})} type="password" className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300" />
        </div>
      </div>
      {secMsg.msg && (
        <p className={`mt-3 text-sm ${secMsg.type==='error'?'text-rose-600':'text-emerald-600'}`}>{secMsg.msg}</p>
      )}
      <div className="mt-4 flex items-center gap-3">
        <button type="button" onClick={onUpdatePassword} className="rounded-2xl bg-brand-600 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-700 transition-all shadow hover:shadow-lg hover:-translate-y-0.5">Atualizar Segurança</button>
      </div>
    </form>
  )
}
