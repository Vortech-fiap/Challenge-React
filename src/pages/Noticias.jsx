import { useState } from 'react'
import Layout from '../components/Layout'
import Chip from '../components/ui/Chip'
import NewsCard from '../components/ui/NewsCard'

export default function Noticias(){
  const [tag, setTag] = useState(null)

  const cards = [
    {
      imageUrl: '/assets/imgs/ACD30119-CCA4-48D8-90D6-72BE3AB2CB46.png',
      category: 'Transferências',
      timeAgo: '4h atrás',
      title: 'Corinthians anuncia renovação com atacante Gabi Zanotti',
      summary: 'Jogadora estende vínculo e fala sobre novos objetivos para a temporada.',
      href: 'https://www.meutimao.com.br/noticias-do-corinthians/516274/gabi-zanotti-comenta-possivel-renovacao-com-o-corinthians-e-comemora-mais-um-titulo-ao-lado-da-fiel',
      tags: ['transferencias','corinthians']
    },
    {
      imageUrl: '/assets/imgs/88BCF8B9-B48A-46DC-9949-36D5FE08F757.png',
      category: 'Mundial',
      timeAgo: '6h atrás',
      title: 'Copa do Mundo de 2026 terá mais vagas para o futebol feminino',
      summary: 'Mudança visa ampliar representatividade de seleções no torneio.',
      href: 'https://www.olympics.com/pt/noticias/copa-do-mundo-futebol-feminino-selecoes-2031',
      tags: ['copa','mundial','selecao']
    },
    {
      imageUrl: '/assets/imgs/C6DA19BD-75CA-409F-A8B5-D46F6DA02F0B.png',
      category: 'Nacional',
      timeAgo: '8h atrás',
      title: 'Brasileirão Feminino bate recorde de público na temporada',
      summary: 'Média de torcedores cresceu 35% em relação ao ano passado.',
      href: 'https://www.cnnbrasil.com.br/esportes/futebol/final-do-brasileirao-feminino-tem-maior-publico-de-futebol-do-fim-de-semana',
      tags: ['brasileirao','publico']
    },
    {
      imageUrl: '/assets/imgs/B0C56CA1-4DE5-4939-83B8-759ADBE62614.png',
      category: 'Entrevista',
      timeAgo: '10h atrás',
      title: 'Marta comenta marca histórica e projeta novos desafios',
      summary: 'Camisa 10 fala sobre legado e próximos passos na carreira.',
      href: 'https://www.olimpiadatododia.com.br/futebol/379355-marta-faz-golaco-e-se-torna-a-7a-maior-artilheira-da-historia',
      tags: ['marta','selecao']
    },
    {
      imageUrl: '/assets/imgs/B10596F3-8E4A-4A41-B7AF-06A924369CC0.png',
      category: 'Mercado',
      timeAgo: '12h atrás',
      title: 'Debinha pode retornar ao Brasil na próxima janela',
      summary: 'Clubes sondam atacante após grande temporada no exterior.',
      href: 'https://copaamerica.com/pt/noticias/marta-debinha-retornos-brasil-amistosos-japao-2025',
      tags: ['debinha','transferencias']
    },
    {
      imageUrl: '/assets/imgs/D12506B8-BB62-46BE-9D47-7A92A482CB23.png',
      category: 'Análise',
      timeAgo: '14h atrás',
      title: 'Corinthians mantém 100% e lidera com folga',
      summary: 'Time mostra equilíbrio entre defesa sólida e ataque eficiente.',
      href: 'https://www.meutimao.com.br/noticias-do-corinthians/510882/corinthians-mantem-ampla-vantagem-no-ranking-de-publico-pagante-do-brasileirao-feminino',
      tags: ['corinthians','brasileirao']
    },
  ]

  const filtered = tag ? cards.filter(c=>c.tags.includes(tag)) : cards

  return (
    <Layout>
      <div className="flex items-start gap-3">
        <span className="text-2xl">🗞️</span>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-800">Notícias</h1>
          <p className="text-sm text-slate-500">Fique por dentro do que rola no futebol feminino</p>
        </div>
      </div>

      <section className="rounded-3xl border border-brand-100 bg-white/80 backdrop-blur p-5 md:p-6 shadow-sm hover:shadow-card transition-all">
        <div className="grid gap-6 md:grid-cols-[1.2fr,.9fr] items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700">Internacional</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">Destaque</span>
            </div>

            <h2 className="text-xl md:text-2xl font-extrabold text-brand-700 leading-snug">Marta faz história e se torna a maior artilheira da Seleção</h2>
            <p className="mt-2 text-sm text-slate-600 max-w-prose">Com 23 gols marcados, a rainha do futebol supera recorde histórico e emociona torcedores em todo o país.</p>

            <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
              <span>⏱️ 2h atrás</span>
              <span>👁️ 12.4k</span>
              <span>❤️ 856</span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white px-4 py-2 text-sm font-semibold hover:from-brand-700 hover:to-brand-600 transition-all shadow hover:shadow-lg hover:-translate-y-0.5">Ler Matéria Completa</button>
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50 transition-all">🔗</button>
            </div>
          </div>

          <div className="relative">
              <div className="img-ph w-full h-48 md:h-56 rounded-2xl bg-center bg-cover bg-no-repeat animate-float" style={{ backgroundImage: "url('/assets/imgs/828EBEF2-C0B5-47C9-947F-5AE0029D1EF2.png')" }} />
          </div>
        </div>
      </section>

      <section className="rounded-3xl p-5 shadow-sm border border-brand-100" style={{background:'linear-gradient(120deg,#f3e8ff 0%,#f8f7ff 40%,#e9fdf5 100%)'}}>
        <div className="flex items-center gap-2 mb-3">
          <span>📈🔥</span>
          <h3 className="font-extrabold text-brand-700">Trending</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip className="bg-emerald-100 text-emerald-700" onClick={()=>setTag('marta')}>#Marta</Chip>
          <Chip className="bg-emerald-100 text-emerald-700" onClick={()=>setTag('copa')}>#Copa do Mundo</Chip>
          <Chip className="bg-emerald-100 text-emerald-700" onClick={()=>setTag('brasileirao')}>#Brasileirão Feminino</Chip>
          <Chip className="bg-emerald-100 text-emerald-700" onClick={()=>setTag('corinthians')}>#Corinthians</Chip>
          <Chip className="bg-emerald-100 text-emerald-700" onClick={()=>setTag('debinha')}>#Debinha</Chip>
          <Chip className="bg-emerald-100 text-emerald-700" onClick={()=>setTag('selecao')}>#Seleção Brasileira</Chip>
          <Chip className="border border-emerald-300 bg-white hover:bg-emerald-50" onClick={()=>setTag(null)}>Limpar filtro</Chip>
        </div>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c,i)=> (
          <NewsCard key={i} {...c} />
        ))}
      </section>
    </Layout>
  )
}
