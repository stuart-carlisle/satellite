import { useSnapshot } from 'valtio'
import { useGLTF, Html, Text } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import state from '@/state/stateSatellite'
import { useRef } from 'react'
import FlightInstructions from './FlightInstructions'
import Cards from './Cards'

const AnimatedText = a(Text)

const deg = (angleInDegrees) => {
  return angleInDegrees * (Math.PI / 180)
}

const MenuObjects = () => {
  const snap = useSnapshot(state)
  const micro = useRef()
  const brain = useRef()
  const games = useRef()
  const { nodes } = useGLTF('https://res.cloudinary.com/drixmykpt/image/upload/v1724617730/spacestation/comp/brain.glb')
  const microProps = useSpring({
    opacity: snap.infoPage === 1 ? 1 : 0,
    position: snap.infoPage === 1 ? [0.25, 0, -2] : [0.25, -6, 0],
  })
  const brainProps = useSpring({
    opacity: snap.infoPage === 2 ? 1 : 0,
    position: snap.infoPage === 2 ? [0, 3, -2.1] : [-0.4, 15, -2.1],
  })
  const gamesProps = useSpring({
    opacity: snap.infoPage === 3 ? 1 : 0,
    position: snap.infoPage === 3 ? [0.3, 0.6, 6] : [0.3, 0.6, 3],
  })
  useFrame(() => {
    brain.current.rotation.y += 0.05
    micro.current.rotation.y += 0.05
    games.current.rotation.y += 0.05
  })
  return (
    <>
      <a.group position={microProps.position} scale={[0.35, 0.35, 0.35]}>
        <group ref={micro} position={[0, 0, -0.2]}>
          {nodes.Microbit.children.map((child, i) => {
            return (
              <a.mesh rotation={[deg(30), deg(-180), 0]} key={i + 'micro'} geometry={child.geometry}>
                <a.meshStandardMaterial {...child.material} transparent depthWrite opacity={microProps.opacity} />
              </a.mesh>
            )
          })}
        </group>
        <AnimatedText
          color={'#000'}
          fontSize={0.19}
          maxWidth={2}
          lineHeight={1.2}
          letterSpacing={0.03}
          textAlign={'center'}
          font='https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff'
          anchorX='center'
          anchorY='middle'
          outlineWidth={'2%'}
          outlineColor='#ffffff'
          rotation={[0, deg(160), 0]}
          position={[-1.5, 0, 0.6]}
          fillOpacity={microProps.opacity}
          outlineOpacity={microProps.opacity}
        >
          {
            'Microcontrollers like the BBC Microbit, Crumbleboard or Arduino can be used to make real world devices and games'
          }
          <a.meshBasicMaterial attach='material' color={'black'} opacity={microProps.opacity} depthWrite transparent />
        </AnimatedText>
        {snap.infoPage === 1 && (
          <Html>
            <Cards />
          </Html>
        )}
      </a.group>
      <a.group position={gamesProps.position}>
        <FlightInstructions />
        <group ref={games} position={[0, 0, 0.4]}>
          <a.mesh geometry={nodes.Mario.geometry}>
            <a.meshStandardMaterial {...nodes.Mario.material} transparent depthWrite opacity={gamesProps.opacity} />
          </a.mesh>
        </group>
        <AnimatedText
          color={'#000'}
          fontSize={0.15}
          maxWidth={1.5}
          lineHeight={1.2}
          letterSpacing={0.03}
          textAlign={'center'}
          font='https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff'
          anchorX='center'
          anchorY='middle'
          outlineWidth={'2%'}
          outlineColor='#ffffff'
          rotation={[0, deg(20), 0]}
          position={[-1.3, 0, 0.3]}
        >
          {'We are going to use Scratch to make some 2d games and other text based languages to make 3d games'}
          <a.meshBasicMaterial attach='material' color={'black'} opacity={gamesProps.opacity} depthWrite transparent />
        </AnimatedText>
        {snap.infoPage === 3 && (
          <Html>
            <Cards />
          </Html>
        )}
      </a.group>
      <a.group scale={[0.57, 0.57, 0.57]} rotation={[deg(60), deg(10), deg(-10)]} position={brainProps.position}>
        <a.mesh ref={brain} geometry={nodes.Brain.geometry} position={[0.3, 0, 0]}>
          <a.meshStandardMaterial {...nodes.Brain.material} transparent depthWrite opacity={brainProps.opacity} />
        </a.mesh>
        <group>
          <AnimatedText
            color={'#000'}
            fontSize={0.2}
            maxWidth={2.5}
            lineHeight={1.2}
            letterSpacing={0.03}
            textAlign={'center'}
            font='https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff'
            anchorX='center'
            anchorY='middle'
            outlineWidth={'2%'}
            outlineColor='#ffffff'
            rotation={[0, Math.PI, 0]}
            position={[0, -1.5, 0]}
          >
            {
              'Machine Learning - using AI in projects, things like recognising faces and gestures through a webcam and responding accordingly'
            }
            <a.meshBasicMaterial
              attach='material'
              color={'black'}
              opacity={brainProps.opacity}
              depthWrite
              transparent
            />
          </AnimatedText>
          {snap.infoPage === 2 && (
            <Html>
              <Cards />
            </Html>
          )}
        </group>
      </a.group>
    </>
  )
}

export default MenuObjects
