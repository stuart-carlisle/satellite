import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'

const RotatingLogo = () => {
  const rotatingLogo = useRef()
  const { animations, scene } = useGLTF(
    'https://res.cloudinary.com/drixmykpt/image/upload/v1724617745/spacestation/comp/rotatinglogo.glb',
  )
  const { actions } = useAnimations(animations, scene)
  useEffect(() => {
    const actionsArray = Object.values(actions)
    actionsArray.forEach((action) => {
      action.reset().fadeIn(0.5).play()
    })
    return () => {
      actionsArray.forEach((action) => {
        action.reset().fadeOut(0.5).play()
      })
    }
  }, [actions])
  return (
    <group position={[-0.1, -0.3, -0.6]}>
      <primitive ref={rotatingLogo} object={scene} />
    </group>
  )
}

export default RotatingLogo
