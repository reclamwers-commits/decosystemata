import { useState, useRef, useCallback, useEffect, startTransition } from 'react'
import SkipLink from './components/SkipLink'
import Gallery from './components/Gallery/Gallery'
import InfoPanel from './components/InfoPanel'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Footer from './components/Footer'
import { objects } from './data/objects'

const N = objects.length

const PROJECT_INFO = {
  id: '__project__',
  name: 'Decosystemata Crastini',
  shortDesc: 'Spekulatywny bestiariusz hybrydowych organizmów',
  description: 'Cyfrowy katalog hybrydowych organizmów powstałych jako spekulatywna odpowiedź na kryzys bioróżnorodności oraz zawłaszczanie natury przez człowieka.\n\nProjekt przyjmuje formę internetowego bestiariusza prezentującego organizmy będące efektem praktyk kontroli nad naturą, takich jak modyfikacja życia, estetyzacja, selekcja i technologiczne podporządkowanie środowiska ludzkim potrzebom.',
}

export default function App() {
  const [selected, setSelected]             = useState(null)
  const [hovered, setHovered]               = useState(null)
  const [focused, setFocused]               = useState(null)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)

  const isProject   = selected === '__project__'
  const currentIndex = (!selected || isProject) ? -1 : objects.findIndex((o) => o.id === selected)
  const selectedObj  = isProject ? PROJECT_INFO : (currentIndex >= 0 ? objects[currentIndex] : null)

  const triggerRef         = useRef(null)
  const mobileActiveIdxRef = useRef(0)
  const galleryRef         = useRef(null)

  // Keep ref in sync (needed for stable touchEnd closure)
  useEffect(() => { mobileActiveIdxRef.current = mobileActiveIndex }, [mobileActiveIndex])

  // When InfoPanel prev/next navigates, sync carousel index
  useEffect(() => {
    if (currentIndex >= 0) setMobileActiveIndex(currentIndex)
  }, [currentIndex])

  const handleMobileNav = useCallback((index) => {
    startTransition(() => {
      setMobileActiveIndex(index)
      setSelected(null)
    })
  }, [])

  // Native pointer events (capture phase) — reliable on all mobile browsers
  // Bypasses R3F's synthetic event system entirely
  useEffect(() => {
    const section = galleryRef.current
    if (!section) return

    let startX = 0, startY = 0

    const onDown = (e) => {
      if (e.pointerType !== 'touch') return
      startX = e.clientX
      startY = e.clientY
    }

    const onUp = (e) => {
      if (e.pointerType !== 'touch') return
      if (e.target.closest?.('button, a')) return
      const dx  = e.clientX - startX
      const dy  = e.clientY - startY
      const len = Math.sqrt(dx * dx + dy * dy)

      if (Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx) * 1.4) {
        startTransition(() => {
          setSelected(null)
          setMobileActiveIndex((p) => dy < 0 ? (p + 1) % N : (p - 1 + N) % N)
        })
      } else if (len < 15) {
        const id = objects[mobileActiveIdxRef.current].id
        setSelected((p) => (p === id ? null : id))
      }
    }

    section.addEventListener('pointerdown', onDown, { capture: true })
    section.addEventListener('pointerup',   onUp,   { capture: true })
    return () => {
      section.removeEventListener('pointerdown', onDown, { capture: true })
      section.removeEventListener('pointerup',   onUp,   { capture: true })
    }
  }, [])

  const handleClose = useCallback(() => {
    setSelected(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const handlePrev = useCallback(() => {
    if (currentIndex < 0) return
    setSelected(objects[(currentIndex - 1 + objects.length) % objects.length].id)
  }, [currentIndex])

  const handleNext = useCallback(() => {
    if (currentIndex < 0) return
    setSelected(objects[(currentIndex + 1) % objects.length].id)
  }, [currentIndex])

  // Cursor tooltip
  const tooltipRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = tooltipRef.current
    if (!el) return
    el.style.left = `${e.clientX + 20}px`
    el.style.top  = `${e.clientY - 20}px`
  }, [])

  const activeId  = hovered ?? focused
  const activeObj = activeId ? objects.find((o) => o.id === activeId) : null

  useEffect(() => {
    const el = tooltipRef.current
    if (!el) return
    el.classList.toggle('visible', !!activeObj && !selected)
  }, [activeObj, selected])

  return (
    <>
      <SkipLink />
      <LoadingScreen />
      <CustomCursor hovered={!!hovered || !!selected} />

      <div
        ref={tooltipRef}
        className="cursor-tooltip"
        aria-hidden="true"
        role="presentation"
      >
        <span className="ct-name">{activeObj?.name ?? ''}</span>
        <span className="ct-desc">{activeObj?.shortDesc ?? ''}</span>
      </div>

      <main id="main-content" onMouseMove={handleMouseMove}>
        <section
          ref={galleryRef}
          className={`gallery-section${selected && selected !== '__project__' ? ' has-selection' : ''}`}
          aria-label="Galeria obiektów 3D — Decosystemata Crastini"
        >
          <nav
            className="sr-only"
            aria-label="Obiekty w galerii — nawigacja klawiaturą"
          >
            <ul role="list">
              {objects.map((obj) => (
                <li key={obj.id} role="listitem">
                  <button
                    aria-pressed={selected === obj.id}
                    aria-label={`${obj.name}: ${obj.shortDesc}. ${
                      selected === obj.id ? 'Zamknij opis.' : 'Naciśnij Enter, aby otworzyć pełny opis.'
                    }`}
                    onFocus={() => setFocused(obj.id)}
                    onBlur={() => setFocused(null)}
                    onClick={(e) => {
                      triggerRef.current = e.currentTarget
                      setSelected((prev) => (prev === obj.id ? null : obj.id))
                    }}
                  >
                    {obj.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <Gallery
            selected={selected}
            hovered={hovered}
            focused={focused}
            onSelect={setSelected}
            onHover={setHovered}
            mobileActiveIndex={mobileActiveIndex}
            onMobileNav={handleMobileNav}
          />

          <h1
            className="gallery-title"
            aria-hidden={selected && selected !== '__project__' ? 'true' : undefined}
          >
            <button
              className="gallery-title-btn"
              aria-expanded={isProject}
              aria-controls="info-panel"
              onClick={(e) => {
                triggerRef.current = e.currentTarget
                setSelected((prev) => prev === '__project__' ? null : '__project__')
              }}
            >
              Decosystemata Crastini
            </button>
          </h1>

          {/* ── Mobile carousel nav — hidden on desktop via CSS ── */}
          <div className="carousel-nav" aria-label="Nawigacja obiektami">
            <div className="carousel-row">
              <button
                className="carousel-arrow"
                onClick={() => handleMobileNav((mobileActiveIndex - 1 + N) % N)}
                aria-label="Poprzedni obiekt"
              >‹</button>
              <button
                className="carousel-name-btn"
                onClick={() => setSelected(objects[mobileActiveIndex].id)}
                aria-label={`${objects[mobileActiveIndex].name} — pokaż opis`}
              >
                <span className="carousel-model-name" aria-live="polite">
                  {objects[mobileActiveIndex].name}
                </span>
                <span className="carousel-name-hint" aria-hidden="true">kliknij po opis</span>
              </button>
              <button
                className="carousel-arrow"
                onClick={() => handleMobileNav((mobileActiveIndex + 1) % N)}
                aria-label="Następny obiekt"
              >›</button>
            </div>
            <div className="carousel-dots">
              {objects.map((obj, i) => (
                <button
                  key={obj.id}
                  className={`carousel-dot${i === mobileActiveIndex ? ' active' : ''}`}
                  onClick={() => handleMobileNav(i)}
                  aria-label={obj.name}
                  aria-pressed={i === mobileActiveIndex}
                />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <InfoPanel
        object={selectedObj}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={currentIndex}
        total={objects.length}
      />
    </>
  )
}
