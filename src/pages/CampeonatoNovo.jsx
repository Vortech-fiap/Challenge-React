import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { addCampeonato } from '../utils/campeonatosService'
import ChampionshipForm from '../components/campeonatos/ChampionshipForm'

export default function CampeonatoNovo(){
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    local: '',
    inicio: '',
    fim: '',
    categoria: 'Sub-17',
    publicoAlvo: '',
    vagas: '',
    premio: '',
    taxa: '',
    descricao: '',
    status: 'planejado'
  });
  const steps = useMemo(()=>[
    { key: 'basicos', label: 'Básicos' },
    { key: 'inscricoes', label: 'Inscrições' },
    { key: 'descricao', label: 'Descrição' },
    { key: 'confirma', label: 'Confirmação' }
  ], [])
  const [activeStep, setActiveStep] = useState('basicos')
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  function handleCreate(){
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
      addCampeonato({ ...form });
      navigate('/organizador/dashboard');
    } catch{
      setError('Falha ao salvar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Layout>
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">🏆</span>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-800">Novo Campeonato</h1>
          <p className="text-sm text-slate-500">Cadastre detalhes do campeonato em etapas, no mesmo estilo das Peneiras.</p>
        </div>
      </div>
      {error && <div className="px-3 py-2 mb-3 rounded-xl bg-rose-100 text-rose-700 text-sm">{error}</div>}
      <ChampionshipForm
        title="Cadastro"
        model={form}
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        onUpdate={(patch)=> setForm(f => ({ ...f, ...patch }))}
        onPrev={()=> setActiveStep(prev => steps[Math.max(0, steps.findIndex(s=>s.key===prev)-1)].key)}
        onNext={()=> setActiveStep(prev => steps[Math.min(steps.length-1, steps.findIndex(s=>s.key===prev)+1)].key)}
        onCancel={()=> navigate('/organizador/dashboard')}
        onSubmit={handleCreate}
        submitLabel={saving ? 'Salvando...' : 'Criar campeonato'}
      />
    </Layout>
  )
}
