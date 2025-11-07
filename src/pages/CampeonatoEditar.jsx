import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { getCampeonatoById, updateCampeonato } from '../utils/campeonatosService'
import ChampionshipForm from '../components/campeonatos/ChampionshipForm'

function isEditingLocked(c){
  const now = new Date();
  const ini = new Date(c.inicio);
  const fim = new Date(c.fim);
  return ini <= now && fim >= now;
}

export default function CampeonatoEditar(){
  const { id } = useParams();
  const navigate = useNavigate();
  const camp = useMemo(()=> getCampeonatoById(id), [id]);
  const locked = camp ? isEditingLocked(camp) : false;
  const [form, setForm] = useState(()=> camp || {});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const steps = useMemo(()=>[
    { key: 'basicos', label: 'Básicos' },
    { key: 'inscricoes', label: 'Inscrições' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'confirma', label: 'Confirmação' }
  ], [])
  const [activeStep, setActiveStep] = useState('basicos')

  if(!camp){
    return (
      <Layout>
        <div className="glass rounded-2xl p-5 text-sm text-rose-600">Campeonato não encontrado.</div>
      </Layout>
    )
  }

  function handleSubmit(){
    if(locked) return;
    setError(null);
    if(!form.nome || !form.local || !form.inicio || !form.fim){
      setError('Preencha nome, local e datas.');
      return;
    }
    if(new Date(form.inicio) > new Date(form.fim)){
      setError('Data de início não pode ser posterior à data de fim.');
      return;
    }
    setSaving(true);
    try {
      updateCampeonato(camp.id, { ...form });
      navigate('/organizador/dashboard');
    } catch { setError('Falha ao salvar.'); }
    finally { setSaving(false); }
  }

  return (
    <Layout>
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">✏️</span>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-800">Editar Campeonato</h1>
          {locked ? (
            <p className="text-sm text-amber-600">Edição bloqueada enquanto o campeonato está acontecendo.</p>
          ) : (
            <p className="text-sm text-slate-500">Atualize os dados do campeonato.</p>
          )}
        </div>
      </div>
      {error && <div className="px-3 py-2 mb-3 rounded-xl bg-rose-100 text-rose-700 text-sm">{error}</div>}
      <ChampionshipForm
        title="Edição"
        model={form}
        locked={locked}
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        onUpdate={(patch)=> setForm(f => ({ ...f, ...patch }))}
        onPrev={()=> setActiveStep(prev => steps[Math.max(0, steps.findIndex(s=>s.key===prev)-1)].key)}
        onNext={()=> setActiveStep(prev => steps[Math.min(steps.length-1, steps.findIndex(s=>s.key===prev)+1)].key)}
        onCancel={()=> navigate('/organizador/dashboard')}
        onSubmit={handleSubmit}
        submitLabel={saving ? 'Salvando...' : 'Salvar alterações'}
      />
    </Layout>
  )
}
