import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import runDefaultSeed from './seed/defaultSeed'

if(typeof window !== 'undefined'){
  try { runDefaultSeed() } catch(e){ void e }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
