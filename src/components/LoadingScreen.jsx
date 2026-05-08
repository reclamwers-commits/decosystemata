import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'

export default function LoadingScreen() {
  const { progress, active } = useProgress()
  const [visible, setVisible] = useState(true)

  // Hide once progress reaches 100 — don't rely on `active` race
  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setVisible(false), 800)
      return () => clearTimeout(t)
    }
  }, [progress])

  if (!visible) return null

  const pct = Math.round(progress)

  return (
    <div className="loading-screen">
      <p className="loading-title" aria-hidden="true">Decosystemata Crastini</p>
      <div
        className="loading-track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Ładowanie: ${pct}%`}
      >
        <div className="loading-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="loading-pct">{pct}%</p>
    </div>
  )
}
