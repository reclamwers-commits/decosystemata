import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'

function SpinningModel({ file }) {
  const { scene } = useGLTF(file)
  const groupRef = useRef()

  // Clone scene so it doesn't conflict with the gallery's primitive
  const cloned = useMemo(() => scene.clone(true), [scene])

  const { scale, offset } = useMemo(() => {
    const box = new Box3().setFromObject(cloned)
    const size = new Vector3()
    const center = new Vector3()
    box.getSize(size)
    box.getCenter(center)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    return {
      scale: 1.7 / maxDim,
      offset: [-center.x, -center.y, -center.z],
    }
  }, [cloned])

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.55
  })

  return (
    <group ref={groupRef} scale={scale}>
      <group position={offset}>
        <primitive object={cloned} />
      </group>
    </group>
  )
}

export default function ModelPreview({ file }) {
  return (
    <div className="info-preview" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 4]} intensity={1.3} color="#fff8f0" />
        <directionalLight position={[-5, 2, -4]} intensity={0.55} color="#c9a35c" />
        <directionalLight position={[0, -4, 3]} intensity={0.2} color="#9ab5b8" />
        <Suspense fallback={null}>
          <SpinningModel file={file} />
        </Suspense>
      </Canvas>
    </div>
  )
}
