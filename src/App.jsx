import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import Inicio from './pages/Inicio'
import RequireAuth from './components/RequireAuth'
import RequireCommon from './components/RequireCommon'
import RequireOrganizer from './components/RequireOrganizer'
import Equipes from './pages/Equipes'
import Noticias from './pages/Noticias'
import Jogos from './pages/Jogos'
import Classificacao from './pages/Classificacao'
import Perfil from './pages/Perfil'
import Peneiras from './pages/Peneiras'
import Organizador from './pages/Organizador'
import OrganizerDashboard from './pages/OrganizerDashboard'
import CampeonatoNovo from './pages/CampeonatoNovo'
import CampeonatoEditar from './pages/CampeonatoEditar'
import CampeonatoGestao from './pages/CampeonatoGestao'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage/>} />
        <Route path="/inicio" element={<RequireCommon><Inicio/></RequireCommon>} />
        <Route path="/equipes" element={<RequireCommon><Equipes/></RequireCommon>} />
        <Route path="/noticias" element={<RequireCommon><Noticias/></RequireCommon>} />
        <Route path="/jogos" element={<RequireCommon><Jogos/></RequireCommon>} />
        <Route path="/classificacao" element={<RequireCommon><Classificacao/></RequireCommon>} />
        <Route path="/perfil" element={<RequireCommon><Perfil/></RequireCommon>} />
        <Route path="/peneiras" element={<RequireCommon><Peneiras/></RequireCommon>} />
        <Route path="/organizador" element={<RequireOrganizer><Organizador/></RequireOrganizer>} />
        <Route path="/organizador/dashboard" element={<RequireOrganizer><OrganizerDashboard/></RequireOrganizer>} />
        <Route path="/organizador/campeonatos/novo" element={<RequireOrganizer><CampeonatoNovo/></RequireOrganizer>} />
        <Route path="/organizador/campeonatos/:id/editar" element={<RequireOrganizer><CampeonatoEditar/></RequireOrganizer>} />
        <Route path="/organizador/campeonatos/gestao" element={<RequireOrganizer><CampeonatoGestao/></RequireOrganizer>} />
      </Routes>
    </BrowserRouter>
  )
}
