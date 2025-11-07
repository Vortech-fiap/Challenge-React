import { useState } from 'react'
import Layout from '../components/Layout'
import TabBar from '../components/ui/TabBar'
import CrestImg from '../components/ui/CrestImg'

export default function Jogos(){
  const [tab, setTab] = useState('hoje')

  const games = [
    {
      id: 1,
      day: 'hoje',
      status: 'agendado',
      comp: 'Brasileirão Feminino',
      time: '15:00',
      a: { team: 'Palmeiras', place: 'Allianz Parque' },
      b: { team: 'São Paulo' },
    },
    {
      id: 2,
      day: 'hoje',
      status: 'ao-vivo',
      comp: 'AO VIVO',
      score: '3 – 2',
      minute: "87'",
      a: { team: 'Flamengo', place: 'Maracanã' },
      b: { team: 'Corinthians' },
    },
  ]

  const visible = games.filter(g => tab === 'hoje' ? g.day==='hoje' : tab==='amanha' ? g.day==='amanha' : g.status!=='agendado')

  return (
    <Layout>
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚽</span>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-800">Jogos</h1>
            <p className="text-sm text-slate-500">Acompanhe todos os jogos do futebol feminino</p>
          </div>
        </div>

        <button className="w-full sm:w-auto inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 transition-all hover:-translate-y-0.5">
          <span>🗓️</span> Calendário Completo
        </button>
      </div>

      <TabBar tabs={[{key:'hoje',label:'Hoje'},{key:'amanha',label:'Amanhã'},{key:'resultados',label:'Resultados'}]} activeKey={tab} onChange={setTab} />

      <section className="space-y-5">
        {visible.map(g => (
          g.status==='agendado' ? (
            <article key={g.id} className="group rounded-3xl border border-brand-100 bg-white/80 backdrop-blur p-4 sm:p-5 shadow-sm hover:shadow-card transition-all hover:-translate-y-0.5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">{g.comp}</span>
                <div className="flex items-center gap-1 text-xs text-slate-500"><span>🕒</span><span>{g.time}</span></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                <div className="flex items-center gap-4 justify-center sm:justify-start text-center sm:text-left">
                  <CrestImg team={g.a.team} className="h-12 w-12 object-contain bg-white p-1" alt={`Escudo ${g.a.team}`} />
                  <div>
                    <p className="text-sm font-semibold">{g.a.team}</p>
                    {g.a.place && (<p className="text-xs text-slate-500 flex items-center gap-1 justify-center sm:justify-start">📍 {g.a.place}</p>)}
                  </div>
                </div>

                <div className="text-center">
                  <span className="inline-block rounded-full bg-gradient-to-r from-brand-100 to-emerald-100 text-brand-700 px-3 py-1 text-xs font-semibold">VS</span>
                </div>

                <div className="flex items-center gap-4 justify-center sm:justify-end text-center sm:text-right">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{g.b.team}</p>
                  </div>
                  <CrestImg team={g.b.team} className="h-12 w-12 object-contain bg-white p-1" alt={`Escudo ${g.b.team}`} />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="w-full sm:w-auto rounded-xl bg-white border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 transition-all">Lembrete</button>
              </div>
            </article>
          ) : (
            <article key={g.id} className="relative overflow-hidden group rounded-3xl border border-purple-100 bg-white/80 backdrop-blur p-4 sm:p-5 shadow-sm hover:shadow-card transition-all hover:-translate-y-0.5">
              <div className="pointer-events-none absolute inset-0 opacity-60">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-brand-100 blur-3xl animate-pulseSoft" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 mb-2 relative">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">AO VIVO</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 relative">
                <div className="flex items-center gap-4 justify-center sm:justify-start text-center sm:text-left">
                  <CrestImg team={g.a.team} className="h-12 w-12 object-contain bg-white p-1" alt={`Escudo ${g.a.team}`} />
                  <div>
                    <p className="text-sm font-semibold">{g.a.team}</p>
                    {g.a.place && (<p className="text-xs text-slate-500 flex items-center gap-1 justify-center sm:justify-start">📍 {g.a.place}</p>)}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-rose-500 select-none">{g.score}</div>
                  <div className="text-[11px] text-rose-500 font-semibold -mt-1">{g.minute}</div>
                </div>

                <div className="flex items-center gap-4 justify-center sm:justify-end text-center sm:text-right">
                  <div className="text-right">
                    <p className="text-sm font-semibold">{g.b.team}</p>
                  </div>
                  <CrestImg team={g.b.team} className="h-12 w-12 object-contain bg-white p-1" alt={`Escudo ${g.b.team}`} />
                </div>
              </div>

              <div className="mt-4 flex justify-end relative">
                <button className="w-full sm:w-auto rounded-2xl bg-brand-600 text-white px-4 py-2 text-sm font-semibold hover:bg-brand-700 transition-all shadow hover:shadow-lg hover:-translate-y-0.5">Assistir</button>
              </div>
            </article>
          )
        ))}
        <article className="rounded-3xl p-5 sm:p-6 text-brand-900 shadow-card hover:shadow-xl transition-all hover:-translate-y-0.5" style={{background:'linear-gradient(120deg,#f3e8ff 0%,#ede9fe 40%,#e9fdf5 100%)'}}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📣🔥</span>
            <h3 className="text-lg font-extrabold text-brand-700">Jogo em Destaque</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr,auto] items-center">
            <div>
              <p className="font-semibold">Brasil vs Argentina</p>
              <p className="text-sm text-slate-600">Final da Copa América Feminina</p>
              <p className="text-sm text-slate-600">Domingo, 20:00 • Estádio Nacional</p>
            </div>
            <button className="w-full md:w-auto justify-self-stretch md:justify-self-end rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white px-5 py-2 font-semibold hover:from-brand-700 hover:to-brand-600 transition-all shadow hover:shadow-lg hover:-translate-y-0.5">Assistir ao Vivo</button>
          </div>
        </article>
      </section>
    </Layout>
  )
}
