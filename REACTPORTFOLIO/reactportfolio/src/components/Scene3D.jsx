import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { TorusKnot, Torus } from '@react-three/drei'
import { Suspense } from 'react'

function RotatingTorusKnot({ mousePosition, scrollY }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1
      meshRef.current.rotation.y += delta * 0.15

      meshRef.current.rotation.x += (mousePosition.y * 0.5 - meshRef.current.rotation.x) * 0.03
      meshRef.current.rotation.y += (mousePosition.x * 0.5 - meshRef.current.rotation.y) * 0.03

      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3
    }
  })

  return (
    <TorusKnot ref={meshRef} args={[1.8, 0.4, 128, 16]}>
      <meshBasicMaterial
        color="#e8a020"
        wireframe
        opacity={0.5}
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
      meshRef.current.position.x = Math.cos(time * 0.4) * 3.5
      meshRef.current.position.y = Math.sin(time * 0.6) * 2.5
      meshRef.current.position.z = Math.sin(time * 0.4) * 2

      meshRef.current.rotation.x = time * 0.5
      meshRef.current.rotation.y = time * 0.3

      meshRef.current.position.x += mousePosition.x * 0.4
      meshRef.current.position.y += mousePosition.y * 0.4
    }
  })

  return (
    <Torus ref={meshRef} args={[0.6, 0.15, 16, 32]}>
      <meshBasicMaterial
        color="#e8a020"
        wireframe
        opacity={0.4}
        transparent
      />
    </Torus>
  )
}

function Scene3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: '20%',
      right: '5%',
      width: '600px',
      height: '600px',
      pointerEvents: 'none',
      opacity: 0.35,
      zIndex: 0,
      transform: `translateY(${scrollY * 0.3}px)`
    }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <RotatingTorusKnot mousePosition={mousePosition} scrollY={scrollY} />
          <OrbitingRing mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene3D
