import React from 'react'

export default function NewsCard({ imageUrl, category, timeAgo, title, summary, href }){
  return (
    <article className="news-card rounded-3xl overflow-hidden border border-purple-100 bg-white/80 backdrop-blur hover:shadow-card transition-all hover:-translate-y-0.5">
      <div className={`img-ph h-36 w-full grid place-items-center bg-center bg-cover bg-no-repeat`} style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="p-4">
        <div className="text-xs text-slate-500 mb-1"><span className="font-semibold">{category}</span> • {timeAgo}</div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-slate-600 mt-1">{summary}</p>
        {href && (
          <a className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline" href={href} target="_blank" rel="noopener noreferrer">Ler</a>
        )}
      </div>
    </article>
  )
}
