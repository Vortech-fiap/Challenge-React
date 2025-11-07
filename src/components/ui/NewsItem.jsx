export default function NewsItem({ tag, tagColor='brand', timeAgo, title, summary, showDivider=true }){
  const tagClass = tagColor==='brand' ? 'bg-brand-100 text-brand-700' : tagColor==='emerald' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
  return (
    <article className="group">
      <div className="flex items-center gap-2 text-[11px]"><span className={`px-2 py-0.5 rounded-full font-semibold ${tagClass}`}>{tag}</span><span className="text-slate-500">{timeAgo}</span></div>
      <h3 className="mt-1 font-semibold group-hover:underline cursor-pointer">{title}</h3>
      <p className="text-sm text-slate-600">{summary}</p>
      {showDivider && <hr className="my-3 border-white/60" />}
    </article>
  )
}