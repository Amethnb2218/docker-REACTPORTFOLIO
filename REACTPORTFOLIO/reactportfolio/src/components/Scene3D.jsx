import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Torus, Sphere, Box } from '@react-three/drei'
import { Suspense } from 'react'

function Text3DHero({ mousePosition }) {
  const textRef = useRef()

  useFrame((state) => {
    if (textRef.current) {
      const time = state.clock.getElapsedTime()
      textRef.current.rotation.y = Math.sin(time * 0.15) * 0.05 + mousePosition.x * 0.15
      textRef.current.rotation.x = Math.cos(time * 0.15) * 0.03 + mousePosition.y * 0.1
      textRef.current.position.y = Math.sin(time * 0.3) * 0.1
    }
  })

  return (
    <Text
      ref={textRef}
      position={[0, 0, 0]}
      fontSize={1.2}
      maxWidth={12}
      lineHeight={1}
      letterSpacing={-0.05}
      textAlign="center"
      font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.03}
      outlineColor="#e8a020"
    >
      Mouhamed Sall
      <meshStandardMaterial
        color="#00362e"
        emissive="#00362e"
        emissiveIntensity={0.1}
        metalness={0.3}
        roughness={0.4}
      />
    </Text>
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
      position: 'relative',
      width: '100%',
      height: '60vh',
      minHeight: '400px',
      pointerEvents: 'none',
      margin: '0 auto',
      maxWidth: '1400px'
    }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />
          <pointLight position={[0, 0, 5]} intensity={0.5} color="#e8a020" />

          <Text3DHero mousePosition={mousePosition} />
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
