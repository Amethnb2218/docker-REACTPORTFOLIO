import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Torus, TorusKnot, Sphere, Box, Icosahedron } from '@react-three/drei'
import { Suspense } from 'react'

function MainShape({ mousePosition }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.y = time * 0.1 + mousePosition.x * 0.2
      meshRef.current.rotation.x = Math.sin(time * 0.05) * 0.2 + mousePosition.y * 0.15
      meshRef.current.position.y = Math.sin(time * 0.2) * 0.3
    }
  })

  return (
    <TorusKnot ref={meshRef} args={[2.5, 0.6, 200, 32]}>
      <meshBasicMaterial
        color="#e8a020"
        wireframe
        opacity={0.35}
        transparent
      />
    </TorusKnot>
  )
}

function OrbitingRing({ mousePosition }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.position.x = Math.cos(time * 0.5) * 4
      meshRef.current.position.y = Math.sin(time * 0.3) * 2
      meshRef.current.position.z = Math.sin(time * 0.5) * 2 - 3

      meshRef.current.rotation.x = time * 0.4
      meshRef.current.rotation.y = time * 0.3

      meshRef.current.position.x += mousePosition.x * 0.5
      meshRef.current.position.y += mousePosition.y * 0.5
    }
  })

  return (
    <Torus ref={meshRef} args={[0.8, 0.15, 16, 32]}>
      <meshBasicMaterial
        color="#e8a020"
        wireframe
        opacity={0.3}
        transparent
      />
    </Torus>
  )
}

function FloatingShape({ position, type, delay }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() + delay
      meshRef.current.position.y = position[1] + Math.sin(time * 0.4) * 0.5
      meshRef.current.rotation.x = time * 0.2
      meshRef.current.rotation.y = time * 0.3
    }
  })

  const Component = type === 'sphere' ? Sphere : Box

  return (
    <Component ref={meshRef} position={position} args={type === 'sphere' ? [0.15, 16, 16] : [0.25, 0.25, 0.25]}>
      <meshBasicMaterial
        color="#e8a020"
        wireframe
        opacity={0.15}
        transparent
      />
    </Component>
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
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const floatingShapes = [
    { position: [-3, 1, -2], type: 'sphere', delay: 0 },
    { position: [3, -1, -1], type: 'box', delay: 2 },
    { position: [-2, -2, -3], type: 'sphere', delay: 4 },
    { position: [4, 2, -2], type: 'box', delay: 1 },
    { position: [0, 3, -4], type: 'sphere', delay: 3 }
  ]

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: -1,
      opacity: 0.4
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />
          <pointLight position={[0, 0, 5]} intensity={0.5} color="#e8a020" />

          <MainShape mousePosition={mousePosition} />
          <OrbitingRing mousePosition={mousePosition} />

          {floatingShapes.map((shape, i) => (
            <FloatingShape key={i} {...shape} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene3D
