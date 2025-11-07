import { useState } from 'react'
import Layout from '../components/Layout'
import useCountUp from '../hooks/useCountUp'
import StatCard from '../components/ui/StatCard'
import TabBar from '../components/ui/TabBar'
import StandingsRow from '../components/ui/StandingsRow'
import CrestImg from '../components/ui/CrestImg'

export default function Classificacao(){
  const gols = useCountUp(187)
  const media = '3.2'
  const vitoriasSeguidas = useCountUp(5)
  const aproveitamento = useCountUp(68)
  const [tab, setTab] = useState('brasileirao')

  return (
    <Layout>
      <div className="flex items-start gap-3">
        <span className="text-2xl">📊</span>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-800">Classificação</h1>
          <p className="text-sm text-slate-500">Acompanhe as tabelas dos principais campeonatos</p>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Gols Marcados" value={gols} colorClass="text-brand-700" />
        <StatCard label="Média/Jogo" value={media} colorClass="text-emerald-600" />
        <StatCard label="Vitórias Seguidas" value={vitoriasSeguidas} colorClass="text-brand-700" />
        <StatCard label="Aproveitamento" value={`${aproveitamento}%`} colorClass="text-emerald-600" />
      </section>

      <TabBar tabs={[{key:'brasileirao',label:'Brasileirão'},{key:'libertadores',label:'Libertadores'},{key:'ranking',label:'Ranking FIFA'}]} activeKey={tab} onChange={setTab} />

      {tab==='brasileirao' && (
        <section className="rounded-3xl border border-brand-100 bg-white/80 backdrop-blur p-4 sm:p-5 space-y-3">
          <h2 className="text-lg md:text-xl font-extrabold text-brand-700 flex items-center gap-2">
            <i className="ri-trophy-line text-lg shrink-0" aria-hidden="true"></i> Brasileirão Feminino 2024
          </h2>

          <div className="space-y-3">
            <StandingsRow
              rank={1}
              team="Flamengo"
              crown
              highlight
              form={['V','V','V','V','V']}
              played={5} won={5} draw={0} lost={0} goalsFor={15} goalsAgainst={2} gd={13} points={15}
              badgeNode={<CrestImg team="Flamengo" className="h-6 w-6 object-contain" alt="Escudo Flamengo" />}
            />
            <StandingsRow
              rank={2}
              team="Palmeiras"
              form={['V','V','E','V']}
              played={4} won={3} draw={1} lost={0} goalsFor={12} goalsAgainst={3} gd={9} points={13}
              badgeNode={<CrestImg team="Palmeiras" className="h-6 w-6 object-contain" alt="Escudo Palmeiras" />}
            />
            <StandingsRow
              rank={3}
              team="Corinthians"
              form={['V','D','D','V','V']}
              played={5} won={3} draw={0} lost={2} goalsFor={10} goalsAgainst={5} gd={5} points={12}
              badgeNode={<CrestImg team="Corinthians" className="h-6 w-6 object-contain" alt="Escudo Corinthians" />}
            />
            <StandingsRow
              rank={4}
              team="Santos"
              form={['E','V','V','D']}
              played={4} won={2} draw={1} lost={1} goalsFor={8} goalsAgainst={6} gd={2} points={10}
              badgeNode={<CrestImg team="Santos" className="h-6 w-6 object-contain" alt="Escudo Santos" />}
            />
            <StandingsRow
              rank={5}
              team="São Paulo"
              form={['V','E','E','D','V']}
              played={5} won={2} draw={2} lost={1} goalsFor={7} goalsAgainst={6} gd={1} points={8}
              badgeNode={<CrestImg team="São Paulo" className="h-6 w-6 object-contain" alt="Escudo São Paulo" />}
            />
          </div>

          <div className="mt-5 rounded-2xl border border-dashed border-brand-100 p-3 text-xs text-slate-600 flex flex-wrap gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>Classificação direta</span>
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>Pré-eliminatórias</span>
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>Rebaixamento</span>
            <span className="inline-flex items-center gap-2 text-slate-500">J: Jogos</span>
            <span className="inline-flex items-center gap-2 text-slate-500">V: Vitórias</span>
            <span className="inline-flex items-center gap-2 text-slate-500">E: Empates</span>
            <span className="inline-flex items-center gap-2 text-slate-500">D: Derrotas</span>
            <span className="inline-flex items-center gap-2 text-slate-500">SG: Saldo de Gols</span>
          </div>
        </section>
      )}

      {tab==='libertadores' && (
        <section className="rounded-3xl border border-brand-100 bg-white/80 backdrop-blur p-5">
          <h2 className="text-lg md:text-xl font-extrabold text-brand-700">🏆 Libertadores Feminina</h2>
          <p className="text-sm text-slate-600 mt-2">Tabela em construção. Use esta seção para listar grupos, chaves e fases eliminatórias.</p>
        </section>
      )}

      {tab==='ranking' && (
        <section className="rounded-3xl border border-brand-100 bg-white/80 backdrop-blur p-5">
          <h2 className="text-lg md:text-xl font-extrabold text-brand-700">🌍 Ranking FIFA Seleções</h2>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 list-decimal pl-5">
            <li>Estados Unidos</li>
            <li>Alemanha</li>
            <li>Suécia</li>
            <li>Inglaterra</li>
            <li>Brasil</li>
          </ol>
        </section>
      )}
    </Layout>
  )
}
