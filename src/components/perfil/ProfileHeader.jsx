import React from 'react'

export default function ProfileHeader({ name, user, editing, onSave, onExport }) {
  return (
    <section className="relative overflow-hidden rounded-3xl p-6 md:p-8 text-white shadow-card" style={{background:'linear-gradient(110deg,#7c3aed 0%,#8b5cf6 35%,#22c55e 100%)'}}>
      <div className="pointer-events-none absolute -top-8 -right-8 h-44 w-44 rounded-full bg-white/15 blur-2xl animate-float" />
      <div className="grid gap-6 md:grid-cols-[auto,1fr,auto] items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U S')}&background=7c3aed&color=fff&bold=true`} className="h-20 w-20 md:h-24 md:w-24 rounded-2xl ring-4 ring-white/40 object-cover" alt="Avatar" />
            <button className="absolute -bottom-2 -right-2 rounded-xl bg-white/90 text-slate-700 text-xs px-2 py-1 shadow hover:bg-white">Editar</button>
          </div>
          <div>
            <h2 className="text-xl font-extrabold leading-tight">{name || 'Usuário'}</h2>
            <p className="text-sm text-white/90">@{(user || 'usuario')}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur">Pro • desde 2024</span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur">Perfil ativo</span>
        </div>
        <div className="flex gap-2 justify-self-end">
          <button onClick={onSave} disabled={!editing} className={`rounded-2xl bg-white text-brand-700 px-4 py-2 text-sm font-semibold transition-all shadow hover:shadow-lg hover:-translate-y-0.5 ${editing ? 'hover:bg-white/90' : 'opacity-60 cursor-not-allowed'}`}>Salvar</button>
          <button onClick={onExport} className="rounded-2xl border border-white/60 bg-transparent text-white px-4 py-2 text-sm font-semibold hover:bg-white/10 transition-all">Exportar Dados</button>
        </div>
      </div>
    </section>
  )
}
