'use client'

import React, { Suspense, useEffect, useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  PositionalAudio,
  Float,
  Text,
  PerspectiveCamera,
  FlyControls,
  useGLTF,
  Environment,
  useAnimations,
  useProgress,
  Stars,
  Html,
  useTexture,
} from '@react-three/drei'
import * as THREE from 'three'
import { a, config, useSpring } from '@react-spring/three'
import { EffectComposer, Bloom, DepthOfField, Vignette, Glitch, Scanline } from '@react-three/postprocessing'
import { KernelSize, GlitchMode } from 'postprocessing'
import useSound from 'use-sound'
import { useSnapshot } from 'valtio'

import state from '@/state/stateSatellite'
import Loading from '@/components/satellite/Loading'
import SoundButton from '@/components/satellite/SoundButton'
import LaunchButton from '@/components/satellite/LaunchButton'
import { useKeyDown } from '@/hooks/useKeyDown'
import Cards from '@/components/satellite/Cards'
import PicturesButton from '@/components/satellite/PicturesButton'
import Arrow from '@/components/satellite/Arrow'

const AnimatedText = a(Text)

const Dolly = () => {
  const { camera } = useThree()
  const snap = useSnapshot(state)
  //zoom position when doing highlighted actions
  const microBitPosition = new THREE.Vector3(0, 0, -3)
  const brainPosition = new THREE.Vector3(-0, 5, -4)
  const gamePosition = new THREE.Vector3(-0.5, 0.8, 9)
  //update camera positions when doing zoom animations

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

const Effects = () => {
  return (
    <EffectComposer multisampling={0}>
      <Glitch
        delay={[6, 10]} // min and max glitch delay
        duration={[0.6, 1.0]} // min and max glitch duration
        strength={[0.3, 0.8]} // min and max glitch strength
        mode={GlitchMode.SPORADIC} // glitch mode
        active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
        ratio={0.95} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
      />
      <Bloom
        intensity={0.3} // The bloom intensity.
        kernelSize={KernelSize.HUGE} // blur kernel size
        luminanceThreshold={0.1} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0} // smoothness of the luminance threshold. Range is [0, 1]
      />
      <Bloom
        intensity={0.4} // The bloom intensity.
        kernelSize={3} // blur kernel size
        luminanceThreshold={0.7} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0.4} // smoothness of the luminance threshold. Range is [0, 1]
      />
      <DepthOfField
        focusDistance={0.1} // where to focus
        focalLength={0.84} // focal length
        bokehScale={2} // bokeh size
      />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
      <Scanline density={2} />
    </EffectComposer>
  )
}

const FixedAudio = () => {
  const snap = useSnapshot(state)
  const [play] = useSound('https://res.cloudinary.com/drixmykpt/video/upload/v1724619600/spacestation/warpsound.mp3', {
    volume: 1,
  })
  const [playTransition] = useSound(
    'https://res.cloudinary.com/drixmykpt/video/upload/v1724619630/spacestation/warpsound2.mp3',
    { volume: 0.5 },
  )
  const [playDown] = useSound(
    'https://res.cloudinary.com/drixmykpt/video/upload/v1724619653/spacestation/warpsound3.mp3',
    { volume: 0.7 },
  )
  const [playStars, { stop }] = useSound(
    'https://res.cloudinary.com/drixmykpt/video/upload/v1724619536/spacestation/starsaudio.mp3',
    { loop: true },
  )

  useEffect(() => {
    snap.startAnimation && snap.sound && play()
  }, [snap.startAnimation])

  useEffect(() => {
    if (snap.stars && snap.sound) {
      playStars()
      return
    }
    stop()
  }, [snap.stars, snap.sound])

  useEffect(() => {
    snap.startAnimation && snap.infoPage != null && snap.sound && playTransition() //transition noise from one to the next imfo
    if (snap.fly && snap.infoPage === null && snap.sound) {
      playDown() //down noise when going into fly mode
    }
    setTimeout(() => {
      if (snap.startAnimation && !snap.fly && snap.sound && snap.infoPage === null) playTransition() //noise at the end of the intro animation
    }, 5000)
  }, [snap.startAnimation, snap.infoPage, snap.fly])
  return null
}

const SpaceStation = () => {
  const { nodes, animations } = useGLTF(
    'https://res.cloudinary.com/drixmykpt/image/upload/v1724617742/spacestation/comp/satellite.glb',
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

const Loader = () => {
  const { progress } = useProgress()
  state.progress = progress
  return null
}

const Doors = () => {
  const snap = useSnapshot(state)
  const group = useRef()
  const { animations, nodes, scene } = useGLTF(
    'https://res.cloudinary.com/drixmykpt/image/upload/v1724617734/spacestation/comp/doors.glb',
  )
  const { actions } = useAnimations(animations, scene)
  const pointLightOne = useRef()
  const pointLightTwo = useRef()
  const pointLightThree = useRef()

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
    pointLightThree.current.position.y = 4 * (-Math.sin(clock.elapsedTime + 0.8) + 0.5) - 6
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
        <pointLight ref={pointLightOne} color={'yellow'} intensity={100} position={[0, -2.8, -35]} />
        <pointLight ref={pointLightTwo} color={'hotpink'} intensity={100} position={[0, -5, -35]} />
        <pointLight ref={pointLightThree} color={'#428de3'} intensity={100} position={[0, 0, -35]} />
        {/* <pointLight color={'white'} intensity={0} position={[0, 0, -35]} /> */}
        <ambientLight color={'white'} intensity={2} />
      </group>
    </Float>
  )
}

const Audio = () => {
  const snap = useSnapshot(state)
  const microAudio = useRef()
  const brainAudio = useRef()
  const gameAudio = useRef()
  const launchCompletionAudio = useRef()
  const startAudio = useRef()

  useEffect(() => {
    if (snap.fly && snap.sound && snap.infoPage !== 3) {
      gameAudio.current && gameAudio.current.pause()
      return
    }
    if (snap.infoPage === 3 && snap.sound) {
      gameAudio.current && gameAudio.current.play()
    }
  }, [snap.fly, snap.infoPage])

  return (
    snap.sound && (
      <group>
        <group position={[0.516, -1.7, -31.89]}>
          <PositionalAudio
            ref={startAudio}
            url='https://res.cloudinary.com/drixmykpt/video/upload/v1724573439/spacestation/startaudio.mp3'
            distance={0.1}
            autoplay
            loop
          />
        </group>
        {
          <group position={[0, 0, -3]}>
            <PositionalAudio
              ref={microAudio}
              url='https://res.cloudinary.com/drixmykpt/video/upload/v1724573411/spacestation/microbitaudio.mp3'
              distance={0.1}
              autoplay
              loop
            />
          </group>
        }
        {
          <group position={[-0, 5, -4]}>
            <PositionalAudio
              ref={brainAudio}
              url='https://res.cloudinary.com/drixmykpt/video/upload/v1724573351/spacestation/brainaudio.mp3'
              autoplay
              distance={0.1}
              loop
            />
          </group>
        }
        {
          <group position={[-0.5, 0.8, 9]}>
            <PositionalAudio
              ref={gameAudio}
              url='https://res.cloudinary.com/drixmykpt/video/upload/v1724573387/spacestation/gameaudio.mp3'
              autoplay
              distance={0.2}
              loop
            />
          </group>
        }
        {
          <group position={[4.81, 16.15, -8.23]}>
            <PositionalAudio
              url={'https://res.cloudinary.com/drixmykpt/video/upload/v1724573397/spacestation/launchaudio.mp3'}
              ref={launchCompletionAudio}
              distance={0.2}
              autoplay
              loop
            />
          </group>
        }
      </group>
    )
  )
}

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

export default function App() {
  return (
    <>
      <Canvas legacy={true}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <CameraRig />
          <Stars speed={2} />
          <Environment
            background={true}
            files={'https://res.cloudinary.com/drixmykpt/image/upload/v1724618272/spacestation/space.jpg'}
          />
          <SpaceStation />
          <Doors />
          <MenuObjects />
          <RotatingLogo />
          <Effects />
          <Loader />
          <Dolly />
          <Audio />
        </Suspense>
      </Canvas>
      <PicturesButton />
      <FixedAudio />
      <Loading />
      <SoundButton />
      <LaunchButton />
      <Arrow />
    </>
  )
}

// useGLTF.preload('https://res.cloudinary.com/drixmykpt/image/upload/v1724617742/spacestation/comp/satellite.glb')
// useGLTF.preload('https://res.cloudinary.com/drixmykpt/image/upload/v1724617732/spacestation/comp/camera.glb')
// useGLTF.preload('https://res.cloudinary.com/drixmykpt/image/upload/v1724617734/spacestation/comp/doors.glb')
// useGLTF.preload('https://res.cloudinary.com/drixmykpt/image/upload/v1724617745/spacestation/comp/rotatinglogo.glb')
// useGLTF.preload('https://res.cloudinary.com/drixmykpt/image/upload/v1724617730/spacestation/comp/brain.glb')
