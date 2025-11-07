import Layout from '../components/Layout'
import HeroBanner from '../components/ui/HeroBanner'
import MatchRow from '../components/ui/MatchRow'
import NewsItem from '../components/ui/NewsItem'

export default function Inicio(){
  return (
    <Layout>
      <HeroBanner
        badge="Destaque do Dia"
        title="Brasil goleia Chile por 4–0"
        subtitle="Marta marca duas vezes e lidera vitória histórica da Seleção."
        ctaLabel="Ver Detalhes"
        gradient="linear-gradient(110deg,#7c3aed 0%,#8b5cf6 35%,#22c55e 100%)"
      />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="glass rounded-2xl p-5 shadow-card hover:shadow-xl transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-2 mb-4"><span>⏰</span><h2 className="font-extrabold text-lg">Próximos Jogos</h2></div>
          <ul className="space-y-3">
            <MatchRow title="Palmeiras vs São Paulo" time="15:00" comp="Brasileirão" when="Hoje"/>
            <MatchRow title="Flamengo vs Corinthians" time="17:30" comp="Copa do Brasil" when="Amanhã"/>
            <MatchRow title="Brasil vs França" time="20:00" comp="Amistoso" when="Sex 19/09"/>
          </ul>
        </div>
        <div className="glass rounded-2xl p-5 shadow-card hover:shadow-xl transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-2 mb-4"><span>📈</span><h2 className="font-extrabold text-lg">Últimas Notícias</h2></div>
          <div className="space-y-4">
            <NewsItem tag="Internacional" tagColor="brand" timeAgo="2h atrás" title="Marta brilha na vitória do Brasil" summary="A rainha do futebol marca dois gols na goleada sobre o Chile." />
            <NewsItem tag="Nacional" tagColor="neutral" timeAgo="4h atrás" title="Corinthians lidera o Brasileirão" summary="Time paulista mantém 100% após 5 rodadas." />
            <NewsItem tag="Transferências" tagColor="emerald" timeAgo="6h atrás" title="Renovação de Debinha agita o futebol" summary="Atacante pode voltar ao Brasil após passagem nos EUA." showDivider={false} />
          </div>
        </div>
        <div className="glass rounded-2xl p-5 shadow-card hover:shadow-xl transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-2 mb-4"><span>⭐</span><h2 className="font-extrabold text-lg">Resultados Recentes</h2></div>
          <ul className="space-y-3">
            <li className="rounded-xl p-3 bg-purple-50 border border-purple-100 hover:bg-purple-100/70 transition-all">
              <div className="flex items-center justify-between text-sm"><p className="font-medium">Grêmio</p><span className="text-base font-extrabold text-brand-700">2 – 1</span></div>
              <div className="flex items-center justify-between text-xs text-slate-500"><span>Internacional</span><span>Ontem</span></div>
            </li>
            <li className="rounded-xl p-3 bg-purple-50 border border-purple-100 hover:bg-purple-100/70 transition-all">
              <div className="flex items-center justify-between text-sm"><p className="font-medium">Santos</p><span className="text-base font-extrabold text-brand-700">0 – 3</span></div>
              <div className="flex items-center justify-between text-xs text-slate-500"><span>Palmeiras</span><span>Seg 11/03</span></div>
            </li>
          </ul>
          <button className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 transition-all hover:-translate-y-0.5">Ver Todos os Resultados</button>
        </div>
      </section>
    </Layout>
  )
}
