import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'

const SpaceStation = () => {
  const { nodes, animations } = useGLTF(
    'spacestationwharton-transformed.glb'//'https://res.cloudinary.com/drixmykpt/image/upload/v1724617742/spacestation/comp/satellite.glb',
  )
  const { actions } = useAnimations(animations, nodes['Sketchfab_Scene'])
  const group = useRef()
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
    <>
      <primitive ref={group} object={nodes['Sketchfab_Scene']} position={[0, -1, 0]} />
    </>
  )
}

export default SpaceStation
