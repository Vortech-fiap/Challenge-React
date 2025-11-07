import { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout'
import TabBar from '../components/ui/TabBar'
import { getSession } from '../utils/authService'
import RegistrationForm from '../components/peneiras/RegistrationForm'
import Modal from '../components/ui/Modal'
import { getCampeonatos, addInscricao } from '../utils/campeonatosService'
import PeneiraMetrics from '../components/peneiras/PeneiraMetrics'
import PeneiraFilters from '../components/peneiras/PeneiraFilters'
import PeneiraCard from '../components/peneiras/PeneiraCard'
import MyInscriptions from '../components/peneiras/MyInscriptions'

export default function Peneiras(){
  const [tab, setTab] = useState('disponiveis')
  const session = useMemo(()=> getSession(), [])
  const storageKey = session?.email ? `ff_peneira_${session.email}` : null
  const [drafts, setDrafts] = useState([])
  const [activeStep, setActiveStep] = useState('dados')
  const [regContext, setRegContext] = useState(null)
  const [termsOpen, setTermsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState([])
  const steps = [
    { key: 'dados', label: 'Dados' },
    { key: 'esporte', label: 'Esportivos' },
    { key: 'docs', label: 'Documentos' },
    { key: 'confirma', label: 'Confirmação' },
  ]
  const [reg, setReg] = useState(null)
  const cards = useMemo(() => {
    const hoje = new Date()
    const camps = (getCampeonatos() || []).filter(c => {
      const ini = new Date(c.inicio)
      return ini >= hoje && c.status !== 'cancelado' && c.status !== 'encerrado'
    })
    return camps.map(c => ({
      id: c.id,
      title: c.nome,
      details: `${c.local} • ${c.inicio} — ${c.fim} • Vagas: ${c.vagas || 'N/A'} • ${c.taxa ? `Taxa: R$ ${c.taxa}` : 'Gratuito'}`,
      city: c.local || '',
      category: c.categoria || 'Sub-17',
      gender: 'Feminino',
    }))
  }, [])

  const slug = (s) => (s||'').normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase()
  const activeSlugs = useMemo(()=> new Set(filters.map(slug)), [filters])
  const filteredCards = useMemo(()=>{
    return cards.filter(c => {
      if(activeSlugs.size){
        const tags = [c.city, c.category].map(slug)
        const matchChip = tags.some(t => activeSlugs.has(t))
        if(!matchChip) return false
      }
      if(search.trim()){
        const q = slug(search)
        const hay = [c.title, c.details, c.city, c.category].map(slug).join(' ')
        if(!hay.includes(q)) return false
      }
      return true
    })
  }, [cards, activeSlugs, search])

  function toggleFilter(label){
    setFilters(prev => prev.includes(label) ? prev.filter(f=>f!==label) : [...prev, label])
  }

  useEffect(()=>{
    if(!storageKey) return
    try{
      const arr = JSON.parse(localStorage.getItem(storageKey) || '[]')
      setDrafts(Array.isArray(arr) ? arr : [])
    }catch{ setDrafts([]) }
  }, [storageKey])

  useEffect(()=>{
    if(!storageKey || !reg) return
    try{
      setDrafts(prev => {
        const copy = [...prev]
        const i = copy.findIndex(d => d.id === reg.id)
        if(i >= 0) copy[i] = reg
        else copy.unshift(reg)
        localStorage.setItem(storageKey, JSON.stringify(copy))
        return copy
      })
    }catch(e){ void e }
  }, [reg, storageKey])

  function openRegistration({ id, title }){
    if(!storageKey) return
    const existing = drafts.find(d => d.eventId === id && d.status !== 'enviada')
    const draft = existing || {
      id: `${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
      eventId: id,
      title,
      status: 'rascunho',
      step: 'dados',
      updatedAt: Date.now(),
      data: {
        dados: { nome: session?.name || '', email: session?.email || '', nascimento: '', telefone: '' },
        docs: { rg: '', cpf: '', comprovante: '' },
        esporte: { posicao: '', perna: '', clubeAtual: '' },
      }
    }
    setReg(draft)
    setActiveStep(draft.step || 'dados')
    setRegContext('availables')
  }

  function removeDraft(id){
    if(!storageKey) return
    setDrafts(prev => {
      const copy = prev.filter(d => d.id !== id)
      localStorage.setItem(storageKey, JSON.stringify(copy))
      return copy
    })
  }

  function finalizeRegistration(){
    if(!storageKey || !reg) return
    const submitted = { ...reg, status: 'enviada', step: 'confirma', updatedAt: Date.now() }
    try {
      const nome = submitted?.data?.dados?.nome || session?.name || ''
      const email = submitted?.data?.dados?.email || session?.email || ''
      const dados = {
        ...submitted?.data?.dados,
        telefone: submitted?.data?.dados?.telefone ?? submitted?.data?.dados?.fone,
        cidade: submitted?.data?.dados?.cidade ?? submitted?.data?.dados?.local,
      }
      const esporte = {
        ...submitted?.data?.esporte,
        perna: submitted?.data?.esporte?.perna ?? submitted?.data?.esporte?.pe,
        clubeAtual: submitted?.data?.esporte?.clubeAtual ?? submitted?.data?.esporte?.clube,
      }
      const docs = { ...submitted?.data?.docs }
      addInscricao(submitted.eventId, { nome, email, campos: { dados, esporte, docs } })
  } catch(e){ void e }
    setReg(submitted)
    setDrafts(prev => {
      const copy = prev.map(d => d.id === submitted.id ? submitted : d)
      localStorage.setItem(storageKey, JSON.stringify(copy))
      return copy
    })
    setTab('minhas')
  }

  return (
    <>
    <Layout>
      <div className="flex items-start gap-3">
        <span className="text-2xl">📝</span>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-800">Peneiras</h1>
          <p className="text-sm text-slate-500">Inscreva-se para avaliações abertas de clubes e seleções</p>
        </div>
      </div>

      <PeneiraMetrics />

      <TabBar tabs={[{key:'disponiveis',label:'Disponíveis'},{key:'minhas',label:'Minhas inscrições'}]} activeKey={tab} onChange={setTab} />

      {tab==='disponiveis' && (
        <section className="space-y-5">
          <PeneiraFilters search={search} filters={filters} onSearch={setSearch} onToggleFilter={toggleFilter} onClear={()=>{ setSearch(''); setFilters([]) }} />

          {filteredCards.length === 0 && (
            <p className="text-sm text-slate-500">Nenhuma peneira disponível no momento.</p>
          )}
          {filteredCards.map(c => (
            <PeneiraCard
              key={c.id}
              id={c.id}
              badge1={<span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${c.category==='Sub-20' ? 'bg-amber-100 text-amber-700' : c.category==='Sub-15' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>{c.category}</span>}
              badge2={<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700">{c.gender}</span>}
              title={c.title}
              details={c.details}
              onApply={openRegistration}
            />
          ))}

          {reg && regContext==='availables' && (
            <RegistrationForm
              reg={reg}
              steps={steps}
              activeStep={activeStep}
              setActiveStep={(k)=>{ setActiveStep(k); setReg(r => ({ ...r, step: k })); }}
              onUpdate={(section, patch)=> setReg(r => {
                let mapped = { ...patch }
                if(section === 'dados'){
                  if('fone' in patch) mapped = { ...mapped, telefone: patch.fone }
                  if('local' in patch) mapped = { ...mapped, cidade: patch.local }
                }
                if(section === 'esporte'){
                  if('pe' in patch) mapped = { ...mapped, perna: patch.pe }
                  if('clube' in patch) mapped = { ...mapped, clubeAtual: patch.clube }
                }
                return ({
                  ...r,
                  data: {
                    ...r.data,
                    [section]: { ...r.data?.[section], ...patch, ...mapped },
                  },
                  step: activeStep,
                  updatedAt: Date.now()
                })
              })}
              onPrev={()=> setActiveStep(prev => steps[Math.max(0, steps.findIndex(s=>s.key===prev)-1)].key)}
              onNext={()=> setActiveStep(prev => steps[Math.min(steps.length-1, steps.findIndex(s=>s.key===prev)+1)].key)}
              onSaveDraft={()=>{
                if(!storageKey || !reg) return
                const updated = { ...reg, updatedAt: Date.now() }
                setReg(updated)
                setDrafts(prev => {
                  const exists = prev.some(d=>d.id===updated.id)
                  const copy = exists ? prev.map(d=>d.id===updated.id?updated:d) : [updated, ...prev]
                  localStorage.setItem(storageKey, JSON.stringify(copy))
                  return copy
                })
              }}
              onFinish={finalizeRegistration}
              onClose={()=> setReg(null)}
              onOpenTerms={()=> setTermsOpen(true)}
            />
          )}
        </section>
      )}

      {tab==='minhas' && (
        <MyInscriptions
          drafts={drafts}
          reg={reg}
          regContext={regContext}
          onOpen={(d)=>{ setReg(d); setActiveStep(d.step || 'dados'); setRegContext('drafts'); }}
          onRemoveDraft={removeDraft}
          renderForm={()=>(
            <RegistrationForm
              reg={reg}
              steps={steps}
              activeStep={activeStep}
              setActiveStep={(k)=>{ setActiveStep(k); setReg(r => ({ ...r, step: k })); }}
              onUpdate={(section, patch)=> setReg(r => {
                let mapped = { ...patch }
                if(section === 'dados'){
                  if('fone' in patch) mapped = { ...mapped, telefone: patch.fone }
                  if('local' in patch) mapped = { ...mapped, cidade: patch.local }
                }
                if(section === 'esporte'){
                  if('pe' in patch) mapped = { ...mapped, perna: patch.pe }
                  if('clube' in patch) mapped = { ...mapped, clubeAtual: patch.clube }
                }
                return ({
                  ...r,
                  data: {
                    ...r.data,
                    [section]: { ...r.data?.[section], ...patch, ...mapped },
                  },
                  step: activeStep,
                  updatedAt: Date.now()
                })
              })}
              onPrev={()=> setActiveStep(prev => steps[Math.max(0, steps.findIndex(s=>s.key===prev)-1)].key)}
              onNext={()=> setActiveStep(prev => steps[Math.min(steps.length-1, steps.findIndex(s=>s.key===prev)+1)].key)}
              onSaveDraft={()=>{
                if(!storageKey || !reg) return
                const updated = { ...reg, updatedAt: Date.now() }
                setReg(updated)
                setDrafts(prev => {
                  const exists = prev.some(x=>x.id===updated.id)
                  const copy = exists ? prev.map(x=>x.id===updated.id?updated:x) : [updated, ...prev]
                  localStorage.setItem(storageKey, JSON.stringify(copy))
                  return copy
                })
              }}
              onFinish={finalizeRegistration}
              onClose={()=> setReg(null)}
              onOpenTerms={()=> setTermsOpen(true)}
            />
          )}
        />
      )}
      
    </Layout>
    <Modal
      open={termsOpen}
      onClose={()=>setTermsOpen(false)}
      title="Termos de Inscrição"
      size="md"
      hideCloseIcon={false}
    >
      <div className="space-y-3 text-sm text-slate-700">
        <p>Ao se inscrever em uma peneira, você declara que:</p>
        <ul className="list-disc pl-5">
          <li>Forneceu informações verdadeiras e atualizadas.</li>
          <li>Está apta/o para atividades físicas ou apresenta atestado médico válido.</li>
          <li>Autoriza o tratamento dos dados para fins de avaliação esportiva.</li>
          <li>Está ciente de que este é um protótipo e não envolve cobrança real.</li>
        </ul>
        <p>Em ambiente de produção, termos completos e política de privacidade seriam disponibilizados aqui para leitura detalhada.</p>
      </div>
    </Modal>
    </>
  )
}
