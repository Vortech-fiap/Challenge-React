import { useState } from 'react'
import TabBar from '../ui/TabBar'

export default function ChampionshipForm({
  title,
  model,
  steps,
  activeStep,
  setActiveStep,
  locked = false,
  onUpdate,
  onPrev,
  onNext,
  onCancel,
  onSubmit,
  submitLabel = 'Salvar'
}){
  const [attempted, setAttempted] = useState(false)
  const requiredOk = !!model?.nome && !!model?.local && !!model?.inicio && !!model?.fim

  return (
    <section className="mt-4 rounded-3xl border border-brand-100 bg-white/80 backdrop-blur p-5 md:p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-extrabold text-brand-800">{title}</h3>
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold hover:bg-slate-50">Cancelar</button>
        )}
      </div>

      <div className="mt-4">
        <TabBar tabs={steps} activeKey={activeStep} onChange={setActiveStep} />
      </div>

      {activeStep==='basicos' && (
        <div className="grid gap-3 md:grid-cols-2 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome do campeonato *</label>
            <input value={model?.nome||''} onChange={e=>onUpdate({ nome: e.target.value })} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2" required disabled={locked} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Local (cidade/estado) *</label>
            <input value={model?.local||''} onChange={e=>onUpdate({ local: e.target.value })} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2" required disabled={locked} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Início *</label>
            <input value={model?.inicio||''} onChange={e=>onUpdate({ inicio: e.target.value })} type="date" className="w-full rounded-xl border border-slate-200 px-3 py-2" required disabled={locked} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Fim *</label>
            <input value={model?.fim||''} onChange={e=>onUpdate({ fim: e.target.value })} type="date" className="w-full rounded-xl border border-slate-200 px-3 py-2" required disabled={locked} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
            <select value={model?.categoria||'Sub-17'} onChange={e=>onUpdate({ categoria: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" disabled={locked}>
              <option>Sub-13</option>
              <option>Sub-15</option>
              <option>Sub-17</option>
              <option>Sub-20</option>
              <option>Adulto</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Público alvo</label>
            <input value={model?.publicoAlvo||''} onChange={e=>onUpdate({ publicoAlvo: e.target.value })} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="Ex: Jogadoras Sub-17 da região" disabled={locked} />
          </div>
        </div>
      )}

      {activeStep==='inscricoes' && (
        <div className="grid gap-3 md:grid-cols-2 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Vagas</label>
            <input value={model?.vagas||''} onChange={e=>onUpdate({ vagas: e.target.value })} type="number" min="0" className="w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="Ex: 8" disabled={locked} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Taxa de inscrição (R$)</label>
            <input value={model?.taxa||''} onChange={e=>onUpdate({ taxa: e.target.value })} type="number" min="0" className="w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="0" disabled={locked} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Premiação</label>
            <input value={model?.premio||''} onChange={e=>onUpdate({ premio: e.target.value })} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="Ex: Medalhas e troféu" disabled={locked} />
          </div>
        </div>
      )}

      {activeStep==='descricao' && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">Descrição / Regulamento</label>
          <textarea value={model?.descricao||''} onChange={e=>onUpdate({ descricao: e.target.value })} className="w-full rounded-2xl border border-slate-200 px-3 py-2 min-h-[160px]" placeholder="Detalhes, regulamento resumido, formato, etc." disabled={locked} />
        </div>
      )}

      {activeStep==='confirma' && (
        <div className="mt-4 space-y-2 text-sm">
          <p>Revise antes de confirmar.</p>
          <div className="rounded-2xl border border-dashed border-brand-100 p-4">
            <ul className="list-disc pl-5">
              <li><strong>Nome:</strong> {model?.nome || '-'}</li>
              <li><strong>Local:</strong> {model?.local || '-'}</li>
              <li><strong>Período:</strong> {model?.inicio || '-'} — {model?.fim || '-'}</li>
              <li><strong>Categoria:</strong> {model?.categoria || '-'}</li>
              <li><strong>Público alvo:</strong> {model?.publicoAlvo || '-'}</li>
              <li><strong>Vagas:</strong> {model?.vagas || '-'}</li>
              <li><strong>Taxa:</strong> {model?.taxa || 0}</li>
              <li><strong>Premiação:</strong> {model?.premio || '-'}</li>
              <li><strong>Status:</strong> {model?.status || 'planejado'}</li>
            </ul>
          </div>
          {!requiredOk && attempted && (
            <p className="text-rose-700">Preencha os campos obrigatórios: Nome, Local e Datas.</p>
          )}
        </div>
      )}

      <div className="mt-5 flex items-center gap-2">
        <button type="button" onClick={onPrev} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50">Voltar</button>
        <div className="ml-auto" />
        {activeStep!=='confirma' && (
          <button type="button" onClick={onNext} className="rounded-xl bg-brand-600 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-700">Próximo</button>
        )}
        {activeStep==='confirma' && (
          <button type="button" onClick={()=>{ if(requiredOk){ onSubmit?.(); } else { setAttempted(true); setActiveStep('basicos'); } }} className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white px-5 py-2 text-sm font-semibold hover:from-brand-700 hover:to-brand-600 shadow">{submitLabel}</button>
        )}
      </div>
    </section>
  )
}
