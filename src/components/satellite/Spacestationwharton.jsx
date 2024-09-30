/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 spacestationwharton.glb --transform 
Files: spacestationwharton.glb [120.96MB] > C:\Users\stuar\Desktop\Files\r3f\Satellite\public\spacestationwharton-transformed.glb [6.04MB] (95%)
*/

import React, { useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

const SpaceStation = (props) => {
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('https://res.cloudinary.com/drixmykpt/image/upload/v1727725891/spacestation/comp/satellite2.glb')
  const { actions } = useAnimations(animations, group)
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
    <group ref={group} {...props} dispose={null} position={[0,-0.5,0]}>
      <group name="Scene">
        <group name="GLTF_SceneRootNode" rotation={[-0.46, -0.06, 0.214]} scale={2.701}>
          <group name="SpaceStation001_low_1">
            <mesh name="Object_6" geometry={nodes.Object_6.geometry} material={materials.spacestation_smalllights} />
          </group>
          <group name="SpaceStation002_low_2">
            <mesh name="Object_8" geometry={nodes.Object_8.geometry} material={materials.spacestation_main2} />
          </group>
          <group name="SpaceStation003_low_3">
            <mesh name="Object_10" geometry={nodes.Object_10.geometry} material={materials.spacestation_main2} />
          </group>
          <group name="SpaceStation004_low_4">
            <mesh name="Object_12" geometry={nodes.Object_12.geometry} material={materials['spacestation_main.001']} />
          </group>
          <group name="SpaceStation005_low_5">
            <mesh name="Object_14" geometry={nodes.Object_14.geometry} material={materials['spacestation_main.001']} />
          </group>
          <group name="SpaceStation006_low_6" rotation={[Math.PI, -0.545, Math.PI]}>
            <mesh name="Object_16" geometry={nodes.Object_16.geometry} material={materials['spacestation_main.001']} />
          </group>
          <group name="SpaceStation007_low_7">
            <mesh name="Object_18" geometry={nodes.Object_18.geometry} material={materials['spacestation_main.001']} />
          </group>
          <group name="SpaceStation_low_0">
            <mesh name="Object_4" geometry={nodes.Object_4.geometry} material={materials.spacestation_main2} />
          </group>
        </group>
        <mesh name="Circle" geometry={nodes.Circle.geometry} material={materials['spacestation_main.001']} position={[0.31, -0.675, 0.489]} rotation={[-0.48, 0.115, 0.226]} scale={1.116} />
      </group>
    </group>
  )
}

export default SpaceStation

//useGLTF.preload('https://res.cloudinary.com/drixmykpt/image/upload/v1727725891/spacestation/comp/satellite2.glb')



