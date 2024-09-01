import { useSnapshot } from 'valtio'
import { a, useSpring, config } from '@react-spring/three'
import { useTexture } from '@react-three/drei'
import { useKeyDown } from '@/hooks/useKeyDown'
import state from '@/state/stateSatellite'

const FlightInstructions = () => {
  const snap = useSnapshot(state)
  const [colorMap, normalMap] = useTexture([
    'https://res.cloudinary.com/drixmykpt/image/upload/v1724862862/spacestation/controls.png',
    'https://res.cloudinary.com/drixmykpt/image/upload/v1724862858/spacestation/normalmap.png',
  ])
  const instructionProps = useSpring({
    opacity: snap.instructions ? 1 : 0,
    position: snap.instructions ? [-0.7, 0, 4] : [-0.7, 3, 4],
    config: config.molasses,
  })

  const onKey = () => {
    if (snap.fly) {
      state.instructions = false
    }
  }

  useKeyDown(() => {
    onKey()
  }, ['w', 'a', 's', 'd'])

  return (
    <a.mesh position={instructionProps.position} rotation={[-Math.PI / 8, 0, 0]}>
      <a.planeGeometry args={[1.8, 0.9]} />
      <a.meshStandardMaterial
        normalScale={2}
        map={colorMap}
        normalMap={normalMap}
        transparent
        depthWrite
        opacity={instructionProps.opacity}
      />
    </a.mesh>
  )
}

export default FlightInstructions
