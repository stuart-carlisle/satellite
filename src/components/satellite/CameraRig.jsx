import { useSnapshot } from 'valtio'
import { useAnimations, useGLTF, FlyControls, PerspectiveCamera } from '@react-three/drei'
import state from '@/state/stateSatellite'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'

const CameraRig = () => {
  const group = useRef()
  const snap = useSnapshot(state)
  const { animations, nodes } = useGLTF(
    'https://res.cloudinary.com/drixmykpt/image/upload/v1724617732/spacestation/comp/camera.glb',
  )
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (snap.fire) {
      actions['CameraAction.002'].clampWhenFinished = true
      actions['CameraAction.002'].reset().setLoop(THREE.LoopOnce).play()
    }
  }, [snap.fire])

  return (
    <group name='Camera'>
      <PerspectiveCamera
        name='Camera'
        ref={group}
        makeDefault
        fov={40}
        position={nodes.Camera.position}
        rotation={nodes.Camera.rotation}
      />
      {snap.fly && <FlyControls movementSpeed={3} rollSpeed={Math.PI / 8} autoForward={false} dragToLook={true} />}
    </group>
  )
}

export default CameraRig
