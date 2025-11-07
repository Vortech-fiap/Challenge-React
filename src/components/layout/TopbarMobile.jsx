export default function TopbarMobile({ onOpenMenu }){
  return (
    <header className="md:hidden sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl flex items-center justify-center text-white font-extrabold"><img src="/assets/imgs/logo.png" alt=""/></div>
          <strong className="text-slate-900">Liga das Campeãs</strong>
        </div>
        <div className="w-8"></div>
        <button id="btnMenu" onClick={onOpenMenu} className="p-2 hover:bg-slate-50 rounded-lg" aria-label="Abrir menu">☰</button>
      </div>
    </header>
  )
}