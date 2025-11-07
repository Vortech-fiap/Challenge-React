import { NavLink } from 'react-router-dom'
import { getSession } from '../../utils/authService'

export default function Sidebar({ onLogout }){
  const session = getSession()
  const isOrg = session?.role === 'organizador'
  return (
    <aside className="md:sticky md:top-4 md:self-start bg-white/80 backdrop-blur border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm hidden md:block">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-extrabold"><img src="/assets/imgs/logo.png" alt=""/></div>
        <div>
          <p className="text-slate-900 font-bold leading-tight">Liga das Campeãs</p>
          <p className="text-xs text-slate-500 -mt-0.5">Futebol Feminino</p>
        </div>
      </div>

      <nav className="space-y-1.5">
        {!isOrg && (
          <>
            <NavLink to="/inicio" className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`} end>
              <i className="ri-home-5-line text-lg shrink-0" aria-hidden="true"></i> <span>Início</span>
            </NavLink>
            <NavLink to="/jogos" className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
              <i className="ri-gamepad-line text-lg shrink-0" aria-hidden="true"></i> <span>Jogos</span>
            </NavLink>
            <NavLink to="/noticias" className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
              <i className="ri-newspaper-line text-lg shrink-0" aria-hidden="true"></i> <span>Notícias</span>
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">3</span>
            </NavLink>
            <NavLink to="/equipes" className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
              <i className="ri-team-line text-lg shrink-0" aria-hidden="true"></i> <span>Equipes</span>
            </NavLink>
            <NavLink to="/classificacao" className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
              <i className="ri-trophy-line text-lg shrink-0" aria-hidden="true"></i> <span>Classificação</span>
            </NavLink>
            <NavLink to="/perfil" className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
              <i className="ri-user-3-line text-lg shrink-0" aria-hidden="true"></i> <span>Meu Perfil</span>
            </NavLink>
            <NavLink to="/peneiras" className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
              <i className="ri-clipboard-line text-lg shrink-0" aria-hidden="true"></i> <span>Peneiras</span>
            </NavLink>
          </>
        )}
        {isOrg && (
          <>
            <NavLink to="/organizador/dashboard" className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
              <i className="ri-dashboard-line text-lg shrink-0" aria-hidden="true"></i> <span>Dashboard</span>
            </NavLink>
            <NavLink to="/organizador/campeonatos/novo" className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
              <i className="ri-add-circle-line text-lg shrink-0" aria-hidden="true"></i> <span>Novo Campeonato</span>
            </NavLink>
            <NavLink to="/organizador/campeonatos/gestao" className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
              <i className="ri-settings-3-line text-lg shrink-0" aria-hidden="true"></i> <span>Gestão</span>
            </NavLink>
          </>
        )}

        <button onClick={onLogout} className="mt-6 w-full rounded-2xl bg-white border border-rose-300 text-rose-600 font-semibold px-4 py-2 hover:bg-rose-50 transition inline-flex items-center justify-center gap-2">
          <i className="ri-logout-box-r-line text-lg" aria-hidden="true"></i> <span> Sair</span>
        </button>
      </nav>

      <div className="mt-6 glass rounded-2xl p-4 shadow-card">
        <p className="text-xs font-semibold text-brand-700 mb-1">🎯 Jogo Destaque</p>
        <p className="text-sm font-medium">Brasil x Argentina</p>
        <p className="text-xs text-slate-500">Hoje às 16:00</p>
      </div>
    </aside>
  )
}
