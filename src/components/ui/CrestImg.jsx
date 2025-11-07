import React, { useEffect, useState } from 'react'

const API = 'https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t='
const cache = new Map()

const strip = (s) => (s||'')
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu,'')
  .toLowerCase()
  .trim()

const aliases = {
  'sao paulo': [ 'Sao Paulo', 'São Paulo', 'Sao Paulo FC', 'São Paulo FC', 'Sao Paulo Futebol Clube' ],
  'palmeiras': [ 'Palmeiras', 'SE Palmeiras', 'Sociedade Esportiva Palmeiras' ],
  'corinthians': [ 'Corinthians', 'Corinthians Paulista', 'SC Corinthians Paulista', 'Sport Club Corinthians Paulista' ],
  'flamengo': [ 'Flamengo', 'CR Flamengo', 'Clube de Regatas do Flamengo' ],
}

async function fetchBadge(teamName){
  const key = strip(teamName)
  if(cache.has(key)) return cache.get(key)

  const candidates = [
    teamName,
    ...(aliases[key] || []),
    teamName?.normalize('NFD').replace(/\p{Diacritic}/gu,'')
  ].filter(Boolean)

  const task = (async ()=>{
    for(const qRaw of [...new Set(candidates)]){
      try{
        const res = await fetch(API + encodeURIComponent(qRaw))
        if(!res.ok) continue
        const json = await res.json()
        const teams = json?.teams || []
        if(!teams.length) continue

        const filtered = teams.filter(t =>
          (!t.strSport || strip(t.strSport) === 'soccer') &&
          (!t.strCountry || strip(t.strCountry) === 'brazil')
        )

        const best =
          filtered.find(t => strip(t.strTeam) === strip(teamName)) ||
          filtered[0] ||
          teams.find(t => strip(t.strTeam) === strip(teamName)) ||
          teams[0]

        if(best) return best.strBadge || best.strTeamBadge || best.strLogo || ''
      }catch(e){ void e }
    }
    return ''
  })()
  cache.set(key, task)
  return task
}

export default function CrestImg({ team, alt, className='' }){
  const [src, setSrc] = useState('')
  useEffect(()=>{
    let alive = true
    if(!team) return
    fetchBadge(team).then(u=>{ if(alive) setSrc(u||'') })
    return ()=>{ alive = false }
  }, [team])
  if(!src) return <div className={`${className} bg-white`} aria-label={alt||team}></div>
  return <img src={src} alt={alt||`Escudo ${team}`} className={className} loading="lazy" />
}
