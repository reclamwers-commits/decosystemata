import { useEffect, useRef } from 'react'

const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function InfoPanel({ object, onClose, onPrev, onNext, currentIndex, total }) {
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (object) closeRef.current?.focus()
  }, [object?.id])

  useEffect(() => {
    const onKey = (e) => {
      if (!object) return
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab' || !panelRef.current) return

      const focusable = Array.from(panelRef.current.querySelectorAll(FOCUSABLE))
      if (!focusable.length) { e.preventDefault(); return }

      const first = focusable[0]
      const last  = focusable[focusable.length - 1]
      const inside = panelRef.current.contains(document.activeElement)

      if (e.shiftKey) {
        if (!inside || document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (!inside || document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [object, onClose])

  const paragraphs = object?.description
    ? String(object.description).split(/\n{2,}/)
    : []

  return (
    <>
      <div
        className={`info-backdrop${object ? ' active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        id="info-panel"
        ref={panelRef}
        className={`info-panel${object ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
        {...(!object ? { inert: '' } : {})}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className="info-close"
          aria-label="Zamknij panel"
        >
          ✕
        </button>

        <h2 id="panel-title" className="info-name">
          {object?.name ?? ''}
        </h2>
        <p className="info-short">{object?.shortDesc ?? ''}</p>

        <div className="info-desc">
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        {currentIndex >= 0 && (
          <nav className="info-nav" aria-label="Nawigacja między obiektami">
            <button className="info-nav-btn" onClick={onPrev} aria-label="Poprzedni obiekt">‹</button>
            <span className="info-nav-count">{currentIndex + 1} / {total}</span>
            <button className="info-nav-btn" onClick={onNext} aria-label="Następny obiekt">›</button>
          </nav>
        )}
      </aside>
    </>
  )
}
