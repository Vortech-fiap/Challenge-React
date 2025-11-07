import { Navigate } from 'react-router-dom'
import { getSession } from '../utils/authService'

export default function RequireAuth({ children }){
  const session = getSession()
  if(!session || !session.email) return <Navigate to="/" replace />
  return children
}
