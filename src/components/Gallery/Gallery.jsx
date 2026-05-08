import { Suspense, useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import Scene from './Scene'

const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 600

// Adjusts camera for portrait mobile — runs inside Canvas so useThree is available
function CameraRig() {
  const { camera, size } = useThree()

  useEffect(() => {
    const mobile = size.width < 600
    if (mobile) {
      camera.position.set(0, 0.2, 4)   // closer = larger objects
      camera.fov = 100                  // wider fov = all objects fit horizontally
    } else {
      camera.position.set(0, 0.35, 8)
      camera.fov = 50
    }
    camera.updateProjectionMatrix()
  }, [size.width, camera])

  return null
}

export default function Gallery({ selected, hovered, focused, onSelect, onHover, mobileActiveIndex, onMobileNav }) {
  const [contextLost, setContextLost] = useState(false)

  if (contextLost) {
    return (
      <div className="canvas-wrapper canvas-lost" aria-live="assertive">
        <p>Wystąpił błąd graficzny.</p>
        <button onClick={() => window.location.reload()}>Odśwież stronę</button>
      </div>
    )
  }

  return (
    <div className="canvas-wrapper" aria-hidden="true">
      <Canvas
        dpr={isMobileDevice ? 1 : [1, 1.5]}
        camera={{ position: [0, 0.35, 8], fov: 50, near: 0.1, far: 60 }}
        gl={{
          antialias: false,
          powerPreference: isMobileDevice ? 'low-power' : 'default',
          alpha: true,
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault()
            setContextLost(true)
          })
        }}
      >
        <CameraRig />
        <Suspense fallback={null}>
          <Scene
            selected={selected}
            hovered={hovered}
            focused={focused}
            onSelect={onSelect}
            onHover={onHover}
            mobileActiveIndex={mobileActiveIndex}
            onMobileNav={onMobileNav}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
