import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function CustomCursor({ hovered }) {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const reduced = useReducedMotion()
  const rafRef = useRef(null)

  useEffect(() => {
    if ('ontouchstart' in window) {
      setIsTouch(true)
      return
    }

    let px = -200, py = -200

    const onMove = (e) => {
      px = e.clientX
      py = e.clientY
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setPos({ x: px, y: py })
          setVisible(true)
          rafRef.current = null
        })
      }
    }
    const onLeave = () => setVisible(false)

    document.body.classList.add('custom-cursor-active')
    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (isTouch || reduced) return null

  const size = hovered ? 56 : 42

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: size,
        height: size,
        backgroundImage: 'url(/images/kursor.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        transform: 'translate(-6px, -4px)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: 'width 0.18s ease, height 0.18s ease',
        willChange: 'left, top',
      }}
    />
  )
}
