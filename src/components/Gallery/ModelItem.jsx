import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3, MathUtils } from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function ModelItem({
  file,
  position, scale, rotation = [0, 0, 0], rotationSpeed,
  isSelected, isHovered, isFocused, dimmed,
  isCarouselActive = false,
  carouselScale = 4.0,
  heroPosition = [0, 0, 0],
  selectedScale = 5.0,
  onSelect, onHover, onUnhover,
}) {
  const groupRef = useRef()
  const innerRef = useRef()
  const { scene } = useGLTF(file)
  const reduced = useReducedMotion()

  const rotX = useRef(rotation[0])
  const rotY = useRef(rotation[1])
  const dragRef = useRef({ active: false, prevX: 0, prevY: 0, hasMoved: false })

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) child.raycast = () => {}
    })
    if (typeof window === 'undefined' || window.innerWidth >= 600) return
    // Mobile: free GPU memory on unmount — JS cache stays so no re-download on back-nav
    return () => {
      scene.traverse((child) => {
        if (!child.isMesh) return
        child.geometry?.dispose()
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach((mat) => {
          if (!mat) return
          for (const val of Object.values(mat)) {
            if (val?.isTexture) val.dispose()
          }
          mat.dispose()
        })
      })
    }
  }, [scene])

  const { displayScale, centerOffset, hitboxSize } = useMemo(() => {
    const box = new Box3().setFromObject(scene)
    const size = new Vector3()
    const center = new Vector3()
    box.getSize(size)
    box.getCenter(center)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    return {
      displayScale: scale / maxDim,
      centerOffset: [-center.x, -center.y, -center.z],
      hitboxSize: maxDim * 1.35,
    }
  }, [scene, scale])

  // Set initial position/scale on mount only (not driven by JSX prop to avoid R3F re-setting it each render)
  useEffect(() => {
    if (!groupRef.current) return
    groupRef.current.position.set(position[0], position[1], position[2])
    groupRef.current.scale.setScalar(displayScale)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((_, delta) => {
    if (!groupRef.current || !innerRef.current) return

    const targetScale = isSelected       ? displayScale * selectedScale
                      : isCarouselActive ? displayScale * carouselScale
                      : dimmed           ? displayScale * 0.23
                      : isHovered        ? displayScale * 1.6
                      : displayScale

    const tp = isSelected ? heroPosition : position

    if (reduced) {
      groupRef.current.scale.setScalar(targetScale)
      groupRef.current.position.set(tp[0], tp[1], tp[2])
    } else {
      const s = MathUtils.lerp(groupRef.current.scale.x, targetScale, 1 - Math.exp(-12 * delta))
      groupRef.current.scale.setScalar(s)
      groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, tp[0], 1 - Math.exp(-6 * delta))
      groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, tp[1], 1 - Math.exp(-6 * delta))
      groupRef.current.position.z = MathUtils.lerp(groupRef.current.position.z, tp[2], 1 - Math.exp(-6 * delta))
    }

    if (!dragRef.current.active && !isHovered && !isFocused) {
      rotY.current += delta * rotationSpeed
    }

    innerRef.current.rotation.x = rotX.current
    innerRef.current.rotation.y = rotY.current
    innerRef.current.rotation.z = rotation[2]
  })

  const handlePointerDown = (e) => {
    e.stopPropagation()
    dragRef.current = { active: true, prevX: e.clientX, prevY: e.clientY, hasMoved: false, dist: 0 }

    const handleMove = (ev) => {
      const dx = ev.clientX - dragRef.current.prevX
      const dy = ev.clientY - dragRef.current.prevY
      dragRef.current.dist += Math.sqrt(dx * dx + dy * dy)
      if (dragRef.current.dist > 10) dragRef.current.hasMoved = true
      rotY.current += dx * 0.012
      rotX.current += dy * 0.012
      dragRef.current.prevX = ev.clientX
      dragRef.current.prevY = ev.clientY
    }

    const handleUp = () => {
      dragRef.current.active = false
      if (!dragRef.current.hasMoved) onSelect()
      onUnhover()
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
  }

  return (
    // No position prop here — position set by useEffect on mount and lerped in useFrame
    <group ref={groupRef}>
      <group ref={innerRef} position={centerOffset}>
        <primitive object={scene} />
        <mesh
          onPointerOver={(e) => { e.stopPropagation(); onHover() }}
          onPointerOut={(e) => { e.stopPropagation(); if (!dragRef.current.active) onUnhover() }}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={[hitboxSize, hitboxSize, hitboxSize]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  )
}
