import Layout from '../components/Layout'
import { getCampeonatos, computeCampeonatoStats } from '../utils/campeonatosService'
import { getTodasJogadoras } from '../utils/jogadorasService'

function StatCard({ icon, label, value, color }){
  return (
    <div className={`glass rounded-2xl p-4 shadow-card border-l-4 ${color}`}>
      <div className="flex items-center gap-3">
        <i className={`ri-${icon} text-xl`} aria-hidden="true"></i>
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="text-2xl font-extrabold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default function OrganizerDashboard(){
  const stats = computeCampeonatoStats();
  const campeonatos = getCampeonatos();
  const inscricoesTotal = campeonatos.reduce((sum, c) => sum + (c.inscricoes?.length || 0), 0)
  const jogadorasUnicas = getTodasJogadoras().length

  return (
    <Layout>
      <div className="flex items-start gap-3">
        <span className="text-2xl">📊</span>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-800">Dashboard do Organizador</h1>
          <p className="text-sm text-slate-500">Acompanhe números gerais da plataforma e de seus campeonatos.</p>
        </div>
      </div>

      <section className="grid md:grid-cols-3 gap-4">
        <StatCard icon="user-3-line" label="Jogadoras (inscrições)" value={inscricoesTotal} color="border-brand-300" />
        <StatCard icon="user-4-line" label="Jogadoras únicas" value={jogadorasUnicas} color="border-emerald-300" />
        <StatCard icon="trophy-line" label="Campeonatos ativos" value={stats.ativos} color="border-emerald-300" />
        <StatCard icon="calendar-2-line" label="Acontecendo agora" value={stats.acontecendo} color="border-indigo-300" />
        <StatCard icon="calendar-event-line" label="Próximos (planejados)" value={stats.futuros} color="border-sky-300" />
        <StatCard icon="close-circle-line" label="Cancelados" value={stats.cancelados} color="border-rose-300" />
        <StatCard icon="checkbox-circle-line" label="Encerrados" value={stats.encerrados} color="border-slate-300" />
      </section>

      <section className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Campeonatos</h2>
          <a href="/organizador/campeonatos/novo" className="rounded-xl bg-brand-600 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-700">Novo campeonato</a>
        </div>
        {campeonatos.length === 0 ? (
          <p className="text-sm text-slate-500">Nenhum campeonato cadastrado ainda.</p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2 pr-3">Nome</th>
                  <th className="py-2 pr-3">Período</th>
                  <th className="py-2 pr-3">Local</th>
                  <th className="py-2 pr-3">Vagas</th>
                  <th className="py-2 pr-3">Premiação</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2 pr-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {campeonatos.map(c => (
                  <tr key={c.id} className="border-t border-slate-200">
                    <td className="py-2 pr-3 font-medium">{c.nome}</td>
                    <td className="py-2 pr-3">{c.inicio} — {c.fim}</td>
                    <td className="py-2 pr-3">{c.local}</td>
                    <td className="py-2 pr-3">{c.vagas}</td>
                    <td className="py-2 pr-3">{c.premio || '-'}</td>
                    <td className="py-2 pr-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        c.status === 'ativo' ? 'bg-emerald-100 text-emerald-700' :
                        c.status === 'planejado' ? 'bg-sky-100 text-sky-700' :
                        c.status === 'encerrado' ? 'bg-slate-100 text-slate-700' :
                        c.status === 'cancelado' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                      }`}>{c.status}</span>
                    </td>
                    <td className="py-2 pr-3">
                      <div className="flex gap-2">
                        <a href={`/organizador/campeonatos/${c.id}/editar`} className="text-xs px-2 py-1 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300">Editar</a>
                        <a href={`/organizador/campeonatos/gestao`} className="text-xs px-2 py-1 rounded-lg bg-brand-100 text-brand-700 hover:bg-brand-200">Gestão</a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Layout>
  )
}
