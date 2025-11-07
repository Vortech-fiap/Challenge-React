import { useState } from 'react'
import Layout from '../components/Layout'
import useCountUp from '../hooks/useCountUp'
import StatCard from '../components/ui/StatCard'
import TabBar from '../components/ui/TabBar'
import TeamCard from '../components/ui/TeamCard'
import CrestImg from '../components/ui/CrestImg'
import FeaturedTeam from '../components/ui/FeaturedTeam'

export default function Equipes(){
  const [tab, setTab] = useState('selecoes')
  const totalTimes = useCountUp(156)
  const totalJogadoras = useCountUp(2800)
  const totalSelecoes = useCountUp(32)
  const totalJogosAno = useCountUp(847)

  return (
    <Layout>
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👥</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-800">Equipes</h1>
            <p className="text-sm text-slate-500">Conheça os times e seleções do futebol feminino</p>
          </div>
        </div>

        <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 transition-all hover:-translate-y-0.5">⭐ Times Favoritos</button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Times Cadastrados" value={totalTimes} colorClass="text-brand-700" />
        <StatCard label="Jogadoras Ativas" value={totalJogadoras} colorClass="text-emerald-600" />
        <StatCard label="Seleções" value={totalSelecoes} colorClass="text-brand-700" />
        <StatCard label="Jogos neste Ano" value={totalJogosAno} colorClass="text-emerald-600" />
      </section>

      <TabBar tabs={[{key:'selecoes',label:'Seleções'},{key:'clubes',label:'Clubes'}]} activeKey={tab} onChange={setTab} />

      {tab==='selecoes' && (
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <TeamCard badgeText="🇧🇷" badgeStyle={{background:'linear-gradient(135deg,#7c3aed,#22c55e)'}} title="Brasil" subtitle="Ranking FIFA: #8" description="Atual campeã da Copa América e uma das principais seleções do mundo.">
            <p>💼 <span className="font-medium">Técnico:</span> Pia Sundhage <span className="text-slate-500">• 23 jogadoras</span></p>
            <div>
              🏆 <span className="font-medium">Principais Títulos:</span>
              <ul className="mt-1 ml-5 list-disc text-slate-600">
                <li>Copa América 2022</li>
                <li>Pan-americanos 2023</li>
              </ul>
            </div>
          </TeamCard>

          <TeamCard badgeText="🇦🇷" badgeStyle={{background:'linear-gradient(135deg,#7c3aed,#8b5cf6)'}} title="Argentina" subtitle="Ranking FIFA: #28" description="Rival histórica do Brasil e em crescimento constante.">
            <p>💼 <span className="font-medium">Técnico:</span> Germán Portanova <span className="text-slate-500">• 23 jogadoras</span></p>
            <div>
              🏆 <span className="font-medium">Principais Títulos:</span>
              <ul className="mt-1 ml-5 list-disc text-slate-600">
                <li>Copa América 2006</li>
              </ul>
            </div>
          </TeamCard>

          <TeamCard badgeText="🇺🇸" badgeStyle={{background:'linear-gradient(135deg,#10b981,#34d399)'}} title="Estados Unidos" subtitle="Ranking FIFA: #1" description="Atual campeã mundial e líder do ranking FIFA.">
            <p>💼 <span className="font-medium">Técnico:</span> Vlatko Andonovski <span className="text-slate-500">• 23 jogadoras</span></p>
            <div>
              🏆 <span className="font-medium">Principais Títulos:</span>
              <ul className="mt-1 ml-5 list-disc text-slate-600">
                <li>Copa do Mundo 2019</li>
                <li>Olimpíadas 2021</li>
              </ul>
            </div>
          </TeamCard>
        </section>
      )}

      {tab==='clubes' && (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <TeamCard
            badgeRounded
            badgeNode={<CrestImg team="Corinthians" className="h-12 w-12 object-contain bg-white p-1 rounded-2xl" alt="Escudo Corinthians" />}
            title="Corinthians"
            subtitle="Brasileirão Feminino"
            description="Multicampeão nacional e referência no futebol feminino."
          >
            <p>🏟️ Neo Química Arena</p>
            <p>🏆 Libertadores 2023 • Brasileirão 2023</p>
          </TeamCard>

          <TeamCard
            badgeRounded
            badgeNode={<CrestImg team="Palmeiras" className="h-12 w-12 object-contain bg-white p-1 rounded-2xl" alt="Escudo Palmeiras" />}
            title="Palmeiras"
            subtitle="Brasileirão Feminino"
            description="Elenco forte e participação constante em finais."
          >
            <p>🏟️ Allianz Parque</p>
            <p>🏆 Libertadores 2022</p>
          </TeamCard>

          <TeamCard
            badgeRounded
            badgeNode={<CrestImg team="Santos" className="h-12 w-12 object-contain bg-white p-1 rounded-2xl" alt="Escudo Santos" />}
            title="Santos"
            subtitle="Brasileirão Feminino"
            description="Tradição e revelação de talentos."
          >
            <p>🏟️ Vila Belmiro</p>
            <p>🏆 Bicampeão da Libertadores</p>
          </TeamCard>
        </section>
      )}
      <FeaturedTeam lines={["8ª colocada no ranking mundial","Próximo: Brasil vs Argentina"]} />
    </Layout>
  )
}
