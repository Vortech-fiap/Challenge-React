import React from 'react'

export default function DangerZone({ onDelete }){
  return (
    <div className="rounded-3xl p-5 border border-rose-100 bg-rose-50/40">
      <h4 className="font-bold text-rose-700 mb-2">Zona de Risco</h4>
      <p className="text-sm text-rose-700/90">Excluir conta é irreversível.</p>
      <button onClick={onDelete} className="mt-3 rounded-2xl bg-rose-400 text-white px-4 py-2 text-sm font-semibold">Excluir minha conta</button>
    </div>
  )
}
