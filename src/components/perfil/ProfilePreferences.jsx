import React, { useState } from 'react'
import Chip from '../ui/Chip'

export default function ProfilePreferences({ form, editing, onChangeFavorites, onToggleNotif, onSave }) {
  const [newFav, setNewFav] = useState('')

  function addFavorite(){
    if(!newFav.trim()) return
    let tag = newFav.trim().replace(/\s+/g,'')
    if(!tag.startsWith('#')) tag = '#' + tag
    const exists = form.favorites.some(f => f.toLowerCase() === tag.toLowerCase())
    if(exists){ setNewFav(''); return }
    onChangeFavorites([...form.favorites, tag])
    setNewFav('')
  }
  function removeFavorite(tag){
    onChangeFavorites(form.favorites.filter(f => f.toLowerCase() !== tag.toLowerCase()))
  }

  return (
    <form className="glass rounded-3xl p-5 md:p-6 shadow-sm">
      <h3 className="font-extrabold text-lg text-brand-700 mb-4">Preferências</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Notificações</label>
          <label className="flex items-center gap-3 text-sm"><input checked={form.notifEmail} onChange={e=>onToggleNotif('notifEmail', e.target.checked)} disabled={!editing} type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 disabled:opacity-60" /> Email</label>
          <label className="flex items-center gap-3 text-sm"><input checked={form.notifPush} onChange={e=>onToggleNotif('notifPush', e.target.checked)} disabled={!editing} type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 disabled:opacity-60" /> Push</label>
          <label className="flex items-center gap-3 text-sm"><input checked={form.notifNewsletter} onChange={e=>onToggleNotif('notifNewsletter', e.target.checked)} disabled={!editing} type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 disabled:opacity-60" /> Newsletter semanal</label>
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Times Favoritos</label>
        <div className="flex flex-wrap gap-2">
          {form.favorites.map((tag, idx) => (
            editing ? (
              <div
                key={idx}
                className="group inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 hover:bg-rose-100 hover:text-rose-700 transition"
                title={tag}
              >
                <span>{tag}</span>
                <button
                  type="button"
                  aria-label={`Remover ${tag}`}
                  onClick={()=>removeFavorite(tag)}
                  className="opacity-0 group-hover:opacity-100 text-rose-600 hover:text-rose-700 -mr-0.5 ml-0.5 leading-none"
                >
                  ×
                </button>
              </div>
            ) : (
              <Chip key={idx} className="bg-purple-100 text-purple-700">{tag}</Chip>
            )
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="text"
            value={newFav}
            onChange={e=>setNewFav(e.target.value)}
            disabled={!editing}
            className="w-full max-w-xs rounded-xl border border-slate-200 px-3 py-2 disabled:bg-slate-50 disabled:text-slate-500"
            placeholder="ex: Santos"
          />
          <button type="button" onClick={addFavorite} disabled={!editing || !newFav.trim()} className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${editing && newFav.trim() ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-slate-200 text-slate-500 cursor-not-allowed'}`}>Adicionar</button>
        </div>
      </div>
      <div className="mt-4">
        <button type="button" onClick={onSave} disabled={!editing} className={`rounded-2xl bg-brand-600 text-white px-4 py-2 text-sm font-semibold transition-all shadow hover:shadow-lg hover:-translate-y-0.5 ${editing ? 'hover:bg-brand-700' : 'opacity-60 cursor-not-allowed'}`}>Salvar Preferências</button>
      </div>
    </form>
  )
}
