import { Suspense, useState, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import ModelItem from './ModelItem'
import { objects } from '../../data/objects'

useGLTF.setDecoderPath('/draco/')

// Mobile gets smaller -mobile.glb (512px textures, WebP compressed)
const toMobileFile = (file) => file.replace('-opt.glb', '-mobile.glb')

if (typeof window !== 'undefined') {
  if (window.innerWidth >= 600) {
    objects.forEach((obj) => useGLTF.preload(obj.file))
  } else {
    // Mobile: only preload first model → LoadingScreen resolves fast
    useGLTF.preload(toMobileFile(objects[0].file))
  }
}

const REEL_SPACING = 5.0

export default function Scene({ selected, hovered, focused, onSelect, onHover, mobileActiveIndex = 0, onMobileNav }) {
  const { size } = useThree()
  const mobile = size.width < 600

  // Mobile: prime HTTP cache for neighbours via fetch() — no GPU memory consumed,
  // just browser disk cache so next useGLTF load skips the network entirely
  useEffect(() => {
    if (!mobile) return
    const N = objects.length
    const prime = (idx) => fetch(toMobileFile(objects[idx].file)).catch(() => {})
    prime((mobileActiveIndex + 1) % N)
    prime((mobileActiveIndex - 1 + N) % N)
  }, [mobileActiveIndex, mobile])

  // Desktop: staggered load
  const [renderLimit, setRenderLimit] = useState(() => (size.width < 600 ? 1 : objects.length))
  useEffect(() => {
    if (mobile || renderLimit >= objects.length) return
    const timer = setTimeout(() => setRenderLimit((n) => Math.min(n + 2, objects.length)), 1200)
    return () => clearTimeout(timer)
  }, [mobile, renderLimit])

  // ─── MOBILE: only active model in GPU — 1 model instead of 3 ─────────────
  if (mobile) {
    const activeObj = objects[mobileActiveIndex]
    const isSelectedObj = selected === activeObj.id

    return (
      <>
        <ambientLight intensity={0.85} />
        <directionalLight position={[5, 8, 4]} intensity={1.2} color="#fff8f0" />

        {/* key forces unmount→remount on nav; startTransition keeps old model visible until ready */}
        <Suspense key={activeObj.id} fallback={null}>
          <ModelItem
            {...activeObj}
            file={toMobileFile(activeObj.file)}
            position={[0, 0, 0]}
            heroPosition={[0, 3.6, 0]}
            isCarouselActive={!isSelectedObj}
            isSelected={isSelectedObj}
            isHovered={hovered === activeObj.id}
            isFocused={focused === activeObj.id}
            dimmed={false}
            carouselScale={3.2}
            selectedScale={2.0}
            onSelect={() => onSelect(isSelectedObj ? null : activeObj.id)}
            onHover={() => onHover(activeObj.id)}
            onUnhover={() => onHover(null)}
          />
        </Suspense>
      </>
    )
  }

  // ─── DESKTOP: scattered layout ─────────────────────────────────────────────
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 8, 4]} intensity={1.2} color="#fff8f0" />
      <directionalLight position={[-5, 2, -4]} intensity={0.5} color="#c9a35c" />
      <directionalLight position={[0, -5, 3]} intensity={0.2} color="#9ab5b8" />

      {objects.slice(0, renderLimit).map((obj) => (
        <Suspense key={obj.id} fallback={null}>
          <ModelItem
            {...obj}
            position={obj.position}
            heroPosition={[0, 0, 0]}
            selectedScale={5.0}
            isSelected={selected === obj.id}
            isHovered={hovered === obj.id}
            isFocused={focused === obj.id}
            dimmed={!!selected && selected !== '__project__' && selected !== obj.id}
            onSelect={() => onSelect(selected === obj.id ? null : obj.id)}
            onHover={() => onHover(obj.id)}
            onUnhover={() => onHover(null)}
          />
        </Suspense>
      ))}
    </>
  )
}
