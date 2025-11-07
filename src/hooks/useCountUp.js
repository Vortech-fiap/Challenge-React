import { useEffect, useState } from 'react'

export default function useCountUp(target, durationMs = 900){
  const [val, setVal] = useState(0)
  useEffect(()=>{
    const n = Number(target) || 0
    const start = performance.now()
    let raf
    function tick(now){
      const p = Math.min(1, (now - start) / durationMs)
      setVal(Math.round(n * p))
      if(p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return ()=> cancelAnimationFrame(raf)
  },[target, durationMs])
  return val
}
