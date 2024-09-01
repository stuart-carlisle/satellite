import { useSnapshot } from 'valtio'
import { useThree, useFrame } from '@react-three/fiber'
import state from '@/state/stateSatellite'
import * as THREE from 'three'

const Dolly = () => {
  const { camera } = useThree()
  const snap = useSnapshot(state)
  const microBitPosition = new THREE.Vector3(0, 0, -3)
  const brainPosition = new THREE.Vector3(-0, 5, -4)
  const gamePosition = new THREE.Vector3(-0.5, 0.8, 9)
  //update camera positions when going through items
  useFrame(() => {
    if (snap.infoPage === 1) {
      camera.position.lerp(microBitPosition, 0.05)
      camera.lookAt(0, 0, 0)
      camera.updateProjectionMatrix()
    }
    if (snap.infoPage === 2) {
      camera.position.lerp(brainPosition, 0.06)
      camera.lookAt(0, 0, -1)
      camera.updateProjectionMatrix()
    }
    if (snap.infoPage === 3) {
      camera.position.lerp(gamePosition, 0.06)
      camera.lookAt(0, 0, 0)
      camera.updateProjectionMatrix()
    }
  })
}

export default Dolly
