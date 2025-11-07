import React from 'react'

export default function ProfileInfoForm({ form, editing, onChange, onEnableEdit, onSave }){
  return (
    <form className="glass rounded-3xl p-5 md:p-6 shadow-sm lg:col-span-2">
      <h3 className="font-extrabold text-lg text-brand-700 mb-4">Informações Pessoais</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nome</label>
          <input value={form.name} onChange={e=>onChange('name', e.target.value)} disabled={!editing} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:bg-slate-50 disabled:text-slate-500" placeholder="Seu nome completo" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
          <input value={form.user} onChange={e=>onChange('user', e.target.value)} disabled={!editing} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:bg-slate-50 disabled:text-slate-500" placeholder="@usuario" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input value={form.email} disabled readOnly type="email" className="w-full rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 text-slate-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
          <input value={form.phone} onChange={e=>onChange('phone', e.target.value)} disabled={!editing} type="tel" className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:bg-slate-50 disabled:text-slate-500" placeholder="(11) 99999-9999" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Cidade/Estado</label>
          <input value={form.cityState} onChange={e=>onChange('cityState', e.target.value)} disabled={!editing} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:bg-slate-50 disabled:text-slate-500" placeholder="São Paulo - SP" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
          <textarea value={form.bio} onChange={e=>onChange('bio', e.target.value)} disabled={!editing} rows="3" className="w-full rounded-xl border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:bg-slate-50 disabled:text-slate-500" placeholder="Fale um pouco sobre você..."></textarea>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button type="button" onClick={onEnableEdit} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold transition-all shadow hover:shadow-lg hover:-translate-y-0.5">Editar dados da conta</button>
        <button type="button" onClick={onSave} disabled={!editing} className={`rounded-2xl bg-brand-600 text-white px-4 py-2 text-sm font-semibold transition-all shadow hover:shadow-lg hover:-translate-y-0.5 ${editing ? 'hover:bg-brand-700' : 'opacity-60 cursor-not-allowed'}`}>Salvar Alterações</button>
      </div>
    </form>
  )
}
