import { Navigate } from 'react-router-dom'
import { getSession } from '../utils/authService'
export default function RequireCommon({ children }){
  const session = getSession()
  if(!session || !session.email) return <Navigate to="/" replace />
  if(session.role === 'organizador') return <Navigate to="/organizador" replace />
  return children
}
