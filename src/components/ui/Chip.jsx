import React from 'react'

export default function Chip({ children, className = '', onClick, type='button' }){
  return (
    <button type={type} onClick={onClick} className={`chip px-3 py-1.5 rounded-full text-sm ${className}`}>
      {children}
    </button>
  )
}
