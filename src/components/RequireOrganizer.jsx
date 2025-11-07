import { Navigate } from 'react-router-dom'
import { getSession } from '../utils/authService'

export default function RequireOrganizer({ children }){
  const session = getSession()
  if(!session || !session.email) return <Navigate to="/" replace />
  if(session.role !== 'organizador') return <Navigate to="/inicio" replace />
  return children
}
