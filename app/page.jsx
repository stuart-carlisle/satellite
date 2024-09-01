'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import Loading from '@/components/satellite/Loading'
import SoundButton from '@/components/satellite/SoundButton'
import LaunchButton from '@/components/satellite/LaunchButton'
import PicturesButton from '@/components/satellite/PicturesButton'
import Arrow from '@/components/satellite/Arrow'
import Audio from '@/components/satellite/Audio'
import CameraRig from '@/components/satellite/CameraRig'
import Dolly from '@/components/satellite/Dolly'
import Doors from '@/components/satellite/Doors'
import Effects from '@/components/satellite/Effects'
import FixedAudio from '@/components/satellite/FixedAudio'
import Loader from '@/components/satellite/Loader'
import MenuObjects from '@/components/satellite/MenuObjects'
import RotatingLogo from '@/components/satellite/RotatingLogo'
import SpaceStation from '@/components/satellite/SpaceStation'

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
