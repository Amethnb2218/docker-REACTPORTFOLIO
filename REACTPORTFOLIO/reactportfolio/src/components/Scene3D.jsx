import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron, Sphere } from '@react-three/drei'
import { Suspense } from 'react'

function RotatingIcosahedron({ mousePosition }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15
      meshRef.current.rotation.y += delta * 0.2

      meshRef.current.rotation.x += (mousePosition.y * 0.3 - meshRef.current.rotation.x) * 0.05
      meshRef.current.rotation.y += (mousePosition.x * 0.3 - meshRef.current.rotation.y) * 0.05
    }
  })

  return (
    <Icosahedron ref={meshRef} args={[1.2, 1]}>
      <meshBasicMaterial
        color="#faae2b"
        wireframe
        opacity={0.35}
        transparent
      />
    </Icosahedron>
  )
}

function OrbitingSphere({ mousePosition }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.position.x = Math.cos(time * 0.5) * 2.5
      meshRef.current.position.y = Math.sin(time * 0.7) * 2
      meshRef.current.position.z = Math.sin(time * 0.5) * 1.5

      meshRef.current.position.x += mousePosition.x * 0.3
      meshRef.current.position.y += mousePosition.y * 0.3
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.15, 16, 16]}>
      <meshBasicMaterial
        color="#faae2b"
        opacity={0.5}
        transparent
      />
    </Sphere>
  )
}

function Scene3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: '10%',
      width: '400px',
      height: '400px',
      pointerEvents: 'none',
      opacity: 0.25,
      zIndex: 0
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <RotatingIcosahedron mousePosition={mousePosition} />
          <OrbitingSphere mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene3D
