import { useSnapshot } from 'valtio'
import { PositionalAudio } from '@react-three/drei'
import state from '@/state/stateSatellite'
import { useEffect, useRef } from 'react'

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

export default Audio
