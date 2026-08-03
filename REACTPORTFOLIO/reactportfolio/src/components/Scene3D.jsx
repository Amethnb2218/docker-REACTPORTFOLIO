import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron } from '@react-three/drei'
import { Suspense } from 'react'

function RotatingIcosahedron() {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <Icosahedron ref={meshRef} args={[1.2, 1]}>
      <meshBasicMaterial
        color="#c87941"
        wireframe
        opacity={0.3}
        transparent
      />
    </Icosahedron>
  )
}

function Scene3D() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: '10%',
      width: '400px',
      height: '400px',
      pointerEvents: 'none',
      opacity: 0.6,
      zIndex: 0
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <RotatingIcosahedron />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene3D
