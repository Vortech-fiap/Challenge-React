import { useEffect, useRef } from 'react'

export default function Modal({ open, onClose, title, children, size = 'md', footer, hideCloseIcon = false }){
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e){ if(e.key === 'Escape') onClose?.(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const maxW = size === 'lg' ? 'max-w-3xl' : size === 'sm' ? 'max-w-sm' : 'max-w-xl';

  function handleOverlayClick(e){
    if (e.target === overlayRef.current) onClose?.();
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/60"
      aria-modal="true"
      role="dialog"
      aria-label={title}
    >
      <div className={`glass w-full ${maxW} rounded-2xl p-5 animate-pop relative`}>
        {!hideCloseIcon && (
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
          >
            ✖
          </button>
        )}
        {title && <h3 className="font-bold text-brand-700 pr-8">{title}</h3>}
        <div className="mt-3 text-sm text-slate-700 max-h-[70vh] overflow-auto pr-1">
          {children}
        </div>
        {footer !== undefined ? (
          <div className="mt-4 flex justify-end gap-2">
            {footer}
          </div>
        ) : (
          <div className="mt-4 flex justify-end">
            <button onClick={onClose} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold hover:bg-slate-50 transition">Fechar</button>
          </div>
        )}
      </div>
    </div>
  )
}
