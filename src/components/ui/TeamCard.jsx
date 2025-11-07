import React, { useState } from 'react'

export default function TeamCard({ badgeText, badgeRounded=false, badgeStyle, badgeImgSrc, badgeAlt, badgeNode, title, subtitle, description, children }){
  const [imgError, setImgError] = useState(false)
  const showImage = !!badgeImgSrc && !imgError
  return (
    <article className="team-card rounded-3xl border border-brand-100 bg-white/80 backdrop-blur p-5">
      <div className="flex items-start gap-4">
        <div className={`${badgeRounded?'rounded-2xl':''} h-12 w-12 grid place-items-center text-white font-bold shadow ${showImage || badgeNode ? '' : 'bg-brand-600'}`} style={badgeStyle}>
          {badgeNode ? (
            badgeNode
          ) : showImage ? (
            <img
              src={badgeImgSrc}
              alt={badgeAlt || title}
              className={`${badgeRounded?'rounded-2xl':''} h-full w-full object-contain bg-white p-1`}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            badgeText
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-extrabold text-brand-700 leading-tight">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          {description && <p className="text-sm text-slate-600 mt-2">{description}</p>}
          {children && (<div className="mt-3 text-sm text-slate-700 space-y-1.5">{children}</div>)}
        </div>
      </div>
    </article>
  )
}