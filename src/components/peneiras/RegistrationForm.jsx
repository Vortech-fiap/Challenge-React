import { useState } from 'react'
import TabBar from '../../components/ui/TabBar'

export default function RegistrationForm({
  reg,
  steps,
  activeStep,
  setActiveStep,
  onUpdate,
  onPrev,
  onNext,
  onSaveDraft,
  onFinish,
  onClose,
  onOpenTerms,
}){
  const [attemptedSubmit, setAttemptedSubmit] = useState(false)
  if(!reg) return null;
  const docsOk = !!reg.data?.docs?.termos && !!reg.data?.docs?.autorizo
  return (
    <section className="mt-4 rounded-3xl border border-brand-100 bg-white/80 backdrop-blur p-5 md:p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg md:text-xl font-extrabold text-brand-800">Inscrição — {reg.title}</h3>
        {onClose && (
          <button onClick={onClose} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold hover:bg-slate-50">Fechar</button>
        )}
      </div>

      <div className="mt-4">
        <TabBar tabs={steps} activeKey={activeStep} onChange={setActiveStep} />
      </div>

      {activeStep==='dados' && (
        <div className="grid gap-3 md:grid-cols-2 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo</label>
            <input value={reg.data?.dados?.nome||''} onChange={e=>onUpdate('dados',{ nome: e.target.value })} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input value={reg.data?.dados?.email||''} onChange={e=>onUpdate('dados',{ email: e.target.value })} type="email" className="w-full rounded-xl border border-slate-200 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
            <input value={(reg.data?.dados?.fone ?? reg.data?.dados?.telefone) || ''} onChange={e=>onUpdate('dados',{ fone: e.target.value })} type="tel" className="w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="(11) 99999-9999" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Idade</label>
              <input value={reg.data?.dados?.idade||''} onChange={e=>onUpdate('dados',{ idade: e.target.value })} type="number" min="10" max="45" className="w-full rounded-xl border border-slate-200 px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Altura (cm)</label>
              <input value={reg.data?.dados?.altura||''} onChange={e=>onUpdate('dados',{ altura: e.target.value })} type="number" min="120" max="210" className="w-full rounded-xl border border-slate-200 px-3 py-2" />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Cidade/Estado</label>
            <input value={(reg.data?.dados?.local ?? reg.data?.dados?.cidade) || ''} onChange={e=>onUpdate('dados',{ local: e.target.value })} type="text" className="w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="São Paulo - SP" />
          </div>

          {(() => {
            const idade = parseInt(reg.data?.dados?.idade, 10)
            const mostrar = !isNaN(idade) && idade < 18
            return mostrar ? (
              <div className="md:col-span-2 mt-2">
                <h4 className="font-semibold text-slate-700 mb-2">Responsável legal</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  <input value={reg.data?.dados?.resp_nome||''} onChange={e=>onUpdate('dados',{ resp_nome: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2" placeholder="Nome do responsável" />
                  <input value={reg.data?.dados?.resp_fone||''} onChange={e=>onUpdate('dados',{ resp_fone: e.target.value })} className="rounded-xl border border-slate-200 px-3 py-2" placeholder="Telefone do responsável" />
                </div>
              </div>
            ) : null
          })()}
        </div>
      )}

      {activeStep==='esporte' && (
        <div className="grid gap-3 md:grid-cols-2 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Posição principal</label>
            <select value={reg.data?.esporte?.posicao || ''} onChange={e=>onUpdate('esporte',{ posicao: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2">
              <option value="">Selecione</option>
              <option>Goleira</option>
              <option>Zagueira</option>
              <option>Lateral</option>
              <option>Volante</option>
              <option>Meia</option>
              <option>Atacante</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pé dominante</label>
            <select value={(reg.data?.esporte?.pe ?? reg.data?.esporte?.perna) || ''} onChange={e=>onUpdate('esporte',{ pe: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2">
              <option value="">Selecione</option>
              <option>Direito</option>
              <option>Esquerdo</option>
              <option>Ambidestro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Clube atual (se houver)</label>
            <input value={(reg.data?.esporte?.clube ?? reg.data?.esporte?.clubeAtual) || ''} onChange={e=>onUpdate('esporte',{ clube: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="—" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Disponibilidade</label>
            <select value={reg.data?.esporte?.turno || ''} onChange={e=>onUpdate('esporte',{ turno: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2">
              <option value="">Selecione</option>
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noite</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Links de vídeos/portfólio</label>
            <input value={reg.data?.esporte?.links || ''} onChange={e=>onUpdate('esporte',{ links: e.target.value })} className="w-full rounded-xl border border-slate-200 px-3 py-2" placeholder="YouTube, Instagram…" />
          </div>
        </div>
      )}

      {activeStep==='docs' && (
        <div className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Documento de identidade</label>
              <input onChange={e=>onUpdate('docs',{ docName: e.target.files?.[0]?.name || '' })} type="file" accept="image/*,application/pdf" className="w-full rounded-xl border border-slate-200 px-3 py-2 bg-white" />
              <p className="text-xs text-slate-500 mt-1">RG/CPF ou passaporte (foto/scan). {reg.data?.docs?.docName ? `Selecionado: ${reg.data.docs.docName}` : ''}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Atestado médico</label>
              <input onChange={e=>onUpdate('docs',{ medicoName: e.target.files?.[0]?.name || '' })} type="file" accept="image/*,application/pdf" className="w-full rounded-xl border border-slate-200 px-3 py-2 bg-white" />
              <p className="text-xs text-slate-500 mt-1">Emitido nos últimos 12 meses. {reg.data?.docs?.medicoName ? `Selecionado: ${reg.data.docs.medicoName}` : ''}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <label className="flex items-start gap-2">
              <input checked={!!reg.data?.docs?.termos} onChange={e=>onUpdate('docs',{ termos: e.target.checked })} type="checkbox" className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
              <span>Li e aceito os <button type="button" onClick={onOpenTerms} className="text-brand-700 font-semibold hover:underline">Termos de Inscrição</button>.</span>
            </label>
            <label className="flex items-start gap-2">
              <input checked={!!reg.data?.docs?.autorizo} onChange={e=>onUpdate('docs',{ autorizo: e.target.checked })} type="checkbox" className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
              <span>Autorizo o uso de imagem para fins de avaliação técnica.</span>
            </label>
            {!docsOk && attemptedSubmit && (
              <p className="text-rose-700">Para continuar, aceite os Termos de Inscrição e a autorização de uso de imagem.</p>
            )}
          </div>
        </div>
      )}

      {activeStep==='confirma' && (
        <div className="mt-4 space-y-2 text-sm">
          <p>Revise suas informações antes de enviar. Você poderá voltar para editar se necessário.</p>
          <div className="rounded-2xl border border-dashed border-brand-100 p-4">
            <ul className="list-disc pl-5">
              <li><strong>Nome:</strong> {reg.data?.dados?.nome || '-'}</li>
              <li><strong>Email:</strong> {reg.data?.dados?.email || '-'}</li>
              <li><strong>Telefone:</strong> {(reg.data?.dados?.fone ?? reg.data?.dados?.telefone) || '-'}</li>
              <li><strong>Idade:</strong> {reg.data?.dados?.idade || '-'}</li>
              <li><strong>Altura:</strong> {reg.data?.dados?.altura || '-'}</li>
              <li><strong>Cidade/Estado:</strong> {(reg.data?.dados?.local ?? reg.data?.dados?.cidade) || '-'}</li>
              {(() => { const i = parseInt(reg.data?.dados?.idade,10); return !isNaN(i) && i<18 ? (<li><strong>Responsável:</strong> {reg.data?.dados?.resp_nome || '-'} ({reg.data?.dados?.resp_fone || '-'})</li>) : null })()}
              <li><strong>Posição:</strong> {reg.data?.esporte?.posicao || '-'}</li>
              <li><strong>Pé dominante:</strong> {(reg.data?.esporte?.pe ?? reg.data?.esporte?.perna) || '-'}</li>
              <li><strong>Clube atual:</strong> {(reg.data?.esporte?.clube ?? reg.data?.esporte?.clubeAtual) || '-'}</li>
              <li><strong>Disponibilidade:</strong> {reg.data?.esporte?.turno || '-'}</li>
              <li><strong>Links:</strong> {reg.data?.esporte?.links || '-'}</li>
              <li><strong>Documento:</strong> {reg.data?.docs?.docName || '-'}</li>
              <li><strong>Atestado médico:</strong> {reg.data?.docs?.medicoName || '-'}</li>
              <li><strong>Termos:</strong> {reg.data?.docs?.termos ? 'Aceito' : 'Não aceito'}</li>
              <li><strong>Uso de imagem:</strong> {reg.data?.docs?.autorizo ? 'Autorizado' : 'Não autorizado'}</li>
            </ul>
          </div>
          <p className="text-xs text-slate-500">* Este é um protótipo. Em produção, os arquivos são enviados ao servidor e a confirmação chega por email.</p>
          {reg.status==='enviada' && (
            <p className="text-emerald-700">Inscrição enviada. Você pode revisar em Minhas inscrições.</p>
          )}
        </div>
      )}

      <div className="mt-5 flex items-center gap-2">
        <button onClick={onPrev} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50">Voltar</button>
        <button onClick={onSaveDraft} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50">Salvar rascunho</button>
        <div className="ml-auto" />
        {activeStep!=='confirma' && (
          <button onClick={onNext} className="rounded-xl bg-brand-600 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-700">Próximo</button>
        )}
        {activeStep==='confirma' && (
          <button
            onClick={()=>{
              if(docsOk){
                onFinish()
              } else {
                setAttemptedSubmit(true)
                setActiveStep('docs')
              }
            }}
            className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white px-5 py-2 text-sm font-semibold hover:from-brand-700 hover:to-brand-600 shadow"
          >
            Enviar inscrição
          </button>
        )}
      </div>
    </section>
  )
}
