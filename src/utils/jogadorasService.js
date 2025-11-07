import { getCampeonatos } from './campeonatosService'
import { getUsers } from './authService'

function lc(s){ return (s||'').toLowerCase() }

function getProfile(email){
  try { return JSON.parse(localStorage.getItem(`ff_profile_${email}`) || '{}') } catch (e) { void e; return {} }
}

export function getTodasJogadoras(){
  const map = new Map()

  const camps = getCampeonatos()
  for(const c of camps){
    const ins = c.inscricoes || []
    for(const i of ins){
      const email = lc(i.atletaEmail || i.campos?.dados?.email)
      if(!email) continue
      const base = map.get(email) || { email, nome: i.atletaNome || i.campos?.dados?.nome || '', origem: 'inscricao', dados: {}, esporte: {}, docs: {}, campeonatos: [], criadoEm: i.criadoEm }
      const dados = i.campos?.dados || {}
      const esporte = i.campos?.esporte || {}
      const docs = i.campos?.docs || {}
      const campeonatos = Array.isArray(base.campeonatos) ? base.campeonatos : []
      if(!campeonatos.includes(c.id)) campeonatos.push(c.id)
      map.set(email, { ...base, nome: base.nome || i.atletaNome || dados.nome || '', dados: { ...base.dados, ...dados }, esporte: { ...base.esporte, ...esporte }, docs: { ...base.docs, ...docs }, campeonatos })
    }
  }

  const users = getUsers()
  for(const u of users){
    const role = u.role || 'comum'
    if(role !== 'comum') continue
    const email = lc(u.email)
    if(!email) continue
    if(!map.has(email)){
      const prof = getProfile(u.email)
      map.set(email, {
        email,
        nome: u.name || u.user || '',
        origem: 'usuario',
        dados: { email: u.email, telefone: prof.phone || '', cidade: prof.cityState || '' },
        esporte: {},
        docs: {},
        campeonatos: []
      })
    }
  }

  return Array.from(map.values())
}

export function getTotalJogadorasUnicas(){
  return getTodasJogadoras().length
}
