import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Organizador(){
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('/organizador/dashboard', { replace: true });
  }, [navigate]);
  return null;
}
