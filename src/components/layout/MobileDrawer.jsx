import { NavLink } from 'react-router-dom'
import { getSession } from '../../utils/authService'

export default function MobileDrawer({ open, onClose, onLogout }){
  const session = getSession()
  const isOrg = session?.role === 'organizador'
  return (
    <div className={`${open ? '' : 'pointer-events-none'} md:hidden fixed inset-0 z-50`} aria-hidden={!open}>
      <button className={`absolute inset-0 bg-slate-900/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} aria-label="Fechar menu"></button>
      <aside className={`absolute left-0 top-0 h-full w-72 max-w-[85%] bg-white/90 backdrop-blur border-r border-slate-200 shadow-xl transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`} role="dialog" aria-modal="true">
        <div className="p-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center text-white font-extrabold"><img src="/assets/imgs/logo.png" alt=""/></div>
            <strong className="text-slate-900">Liga das Campeãs</strong>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-lg" aria-label="Fechar">✕</button>
        </div>

        <nav className="p-3 space-y-1.5">
          {!isOrg && (
            <>
              <NavLink to="/inicio" onClick={onClose} className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`} end>
                <i className="ri-home-5-line text-lg shrink-0" aria-hidden="true"></i> <span>Início</span>
              </NavLink>
              <NavLink to="/jogos" onClick={onClose} className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
                <i className="ri-gamepad-line text-lg shrink-0" aria-hidden="true"></i> <span>Jogos</span>
              </NavLink>
              <NavLink to="/noticias" onClick={onClose} className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
                <i className="ri-newspaper-line text-lg shrink-0" aria-hidden="true"></i> <span>Notícias</span>
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">3</span>
              </NavLink>
              <NavLink to="/equipes" onClick={onClose} className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
                <i className="ri-team-line text-lg shrink-0" aria-hidden="true"></i> <span>Equipes</span>
              </NavLink>
              <NavLink to="/classificacao" onClick={onClose} className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
                <i className="ri-trophy-line text-lg shrink-0" aria-hidden="true"></i> <span>Classificação</span>
              </NavLink>
              <NavLink to="/perfil" onClick={onClose} className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
                <i className="ri-user-3-line text-lg shrink-0" aria-hidden="true"></i> <span>Meu Perfil</span>
              </NavLink>
              <NavLink to="/peneiras" onClick={onClose} className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
                <i className="ri-clipboard-line text-lg shrink-0" aria-hidden="true"></i> <span>Peneiras</span>
              </NavLink>
            </>
          )}
          {isOrg && (
            <>
              <NavLink to="/organizador/dashboard" onClick={onClose} className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
                <i className="ri-dashboard-line text-lg shrink-0" aria-hidden="true"></i> <span>Dashboard</span>
              </NavLink>
              <NavLink to="/organizador/campeonatos/novo" onClick={onClose} className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
                <i className="ri-add-circle-line text-lg shrink-0" aria-hidden="true"></i> <span>Novo Campeonato</span>
              </NavLink>
              <NavLink to="/organizador/campeonatos/gestao" onClick={onClose} className={({isActive})=>`nav-link flex items-center gap-3 px-3 py-2 text-sm ${isActive?'active text-white':'text-slate-700'}`}>
                <i className="ri-settings-3-line text-lg shrink-0" aria-hidden="true"></i> <span>Gestão</span>
              </NavLink>
            </>
          )}

          <button onClick={()=>{ onClose(); onLogout(); }} className="mt-4 w-full rounded-2xl bg-white border border-rose-300 text-rose-600 font-semibold px-4 py-2 hover:bg-rose-50 transition inline-flex items-center justify-center gap-2">
            <i className="ri-logout-box-r-line text-lg" aria-hidden="true"></i> <span> Sair</span>
          </button>
        </nav>
      </aside>
    </div>
  )
}
