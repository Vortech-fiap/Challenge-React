import React from 'react'

export default function MyInscriptions({ drafts, reg, regContext, onOpen, onRemoveDraft, renderForm }){
  return (
    <section className="space-y-3">
      {drafts.length === 0 && (
        <p className="text-sm text-slate-500">Você ainda não realizou nenhuma inscrição.</p>
      )}
      {drafts.map(d => (
        <div key={d.id} className="space-y-2">
          <div className="glass rounded-2xl p-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-600">{d.title}</p>
              <p className="text-xs text-slate-500">Status: <span className={d.status==='enviada' ? 'text-emerald-600' : 'text-amber-600'}>{d.status}</span></p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={()=>onOpen(d)} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold hover:bg-slate-50">{d.status==='enviada' ? 'Ver' : 'Continuar'}</button>
              {d.status!=='enviada' && (
                <button onClick={()=>onRemoveDraft(d.id)} className="rounded-xl bg-rose-50 text-rose-700 px-3 py-1.5 text-sm font-semibold hover:bg-rose-100">Excluir rascunho</button>
              )}
            </div>
          </div>
          {reg && regContext==='drafts' && reg.id===d.id && (
            <div className="mt-2">
              {renderForm(d)}
            </div>
          )}
        </div>
      ))}
    </section>
  )
}
