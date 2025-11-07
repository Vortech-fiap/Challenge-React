export default function AuthHero(){
  return (
    <section className="hidden md:block">
      <div className="inline-flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl grid place-items-center text-white font-extrabold shadow">
          <img src="/assets/imgs/logo.png" alt=""/>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-brand-800">Liga das Campeãs</h1>
          <p className="text-slate-500 text-sm -mt-1">Futebol Feminino • Tudo em um só lugar</p>
        </div>
      </div>

      <div className="mt-8 glass rounded-3xl p-6 shadow-card">
        <h2 className="text-xl font-extrabold text-brand-700">Bem-vinda(o) 👋</h2>
        <p className="text-slate-600 mt-2">Acompanhe jogos, notícias, tabelas e suas equipes favoritas com uma conta gratuita.</p>

        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>✅ Personalize times favoritos</li>
          <li>✅ Receba alertas de partidas</li>
          <li>✅ Salve notícias e estatísticas</li>
        </ul>
      </div>
    </section>
  )
}
