import { useSnapshot } from 'valtio'
import { useAnimations, useGLTF, Float } from '@react-three/drei'
import state from '@/state/stateSatellite'
import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const Doors = () => {
  const snap = useSnapshot(state)
  const group = useRef()
  const { animations, nodes, scene } = useGLTF(
    'https://res.cloudinary.com/drixmykpt/image/upload/v1725178038/spacestation/comp/doors2.glb',
  )
  const { actions } = useAnimations(animations, scene)
  const pointLightOne = useRef()
  const pointLightTwo = useRef()
  const pointLightThree = useRef()
  const regex = /\W*((\\?)Text_cell(\\?))\W*/

  useMemo(() => {
    scene.children.forEach((child) => {
      if (regex.test(child.name)) {
        if (child.material) {
          child.material.emissive = new THREE.Color('white')
          child.material.emissiveIntensity = 0.3
        }
      }
    })
  }, [scene.children])

  const explode = () => {
    const actionsArray = Object.values(actions)
    actionsArray.forEach((action) => {
      action.clampWhenFinished = true
      action.reset().setLoop(THREE.LoopOnce).play()
    })
  }
  useFrame(({ clock }) => {
    pointLightOne.current.position.x = 8 * (Math.sin(clock.elapsedTime) - 0.5) + 3.7
    pointLightTwo.current.position.x = 6 * (-Math.sin(clock.elapsedTime + 0.4) + 0.5) - 3
    pointLightThree.current.position.y = 4 * (-Math.sin(clock.elapsedTime + 0.8) + 0.5) - 5
  })

  useEffect(() => {
    if (snap.fire) {
      explode()
      setTimeout(() => {
        state.startAnimation = true
      }, 1000)
    }
  }, [snap.fire])

  useMemo(() => {
    scene.children
      .filter((object) => {
        return object.name.includes('Door')
      })
      .forEach((object) => {
        object.children[0].material.metalness = 1
        object.children[1].material.metalness = 1
      })
  }, [scene])
  useMemo(() => {
    if (snap.fire) {
      setTimeout(() => {
        scene.children.forEach((object) => {
          if (object.material || object.name.includes('Door')) {
            object.visible = false
          }
        })
      }, 7000)
    }
  }, [snap.fire])
  useMemo(() => {
    if (scene) {
      state.mounted = true
      state.sound = true
    }
  }, [scene])
  return (
    <Float floatIntensity={2} floatingRange={[-0.05, 0.05]} rotationIntensity={0.1}>
      <group ref={group}>
        <primitive object={scene} />
        <mesh geometry={nodes.Tree.geometry} position={nodes.Tree.position} rotation={nodes.Tree.rotation}>
          <meshBasicMaterial color={'#e342d8'} />
        </mesh>
        <pointLight ref={pointLightOne} color={'yellow'} intensity={100} position={[0, -2.2, -35]} />
        <pointLight ref={pointLightTwo} color={'hotpink'} intensity={100} position={[0, -0, -35]} />
        <pointLight ref={pointLightThree} color={'#428de3'} intensity={100} position={[0, 0, -35]} />
        <ambientLight color={'white'} intensity={2} />
      </group>
    </Float>
  )
}

export default Doors
