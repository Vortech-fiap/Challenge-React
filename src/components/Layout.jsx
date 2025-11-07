import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopbarMobile from './layout/TopbarMobile'
import MobileDrawer from './layout/MobileDrawer'
import Sidebar from './layout/Sidebar'

export default function Layout({ children }){
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  function handleLogout(){
    try { localStorage.removeItem('ff_session'); } catch (e) { void e }
    try { sessionStorage.removeItem('ff_session'); } catch (e) { void e }
    navigate('/', { replace: true });
  }
  return (
    <>
      <TopbarMobile onOpenMenu={()=>setMenuOpen(true)} />

      <MobileDrawer open={menuOpen} onClose={()=>setMenuOpen(false)} onLogout={handleLogout} />

      <div className="max-w-[1400px] mx-auto md:grid md:grid-cols-[260px,1fr] gap-6 px-4 md:px-6 py-5">
        <Sidebar onLogout={handleLogout} />

        <main className="space-y-6">
          {children}
        </main>
      </div>
    </>
  )
}
