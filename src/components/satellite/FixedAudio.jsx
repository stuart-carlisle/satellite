import { useSnapshot } from 'valtio'
import state from '@/state/stateSatellite'
import useSound from 'use-sound'
import { useEffect } from 'react'

const FixedAudio = () => {
  const snap = useSnapshot(state)
  const [play] = useSound('https://res.cloudinary.com/drixmykpt/video/upload/v1724619600/spacestation/warpsound.mp3', {
    volume: 1.5,
  })
  const [playExplosion] = useSound(
    'https://res.cloudinary.com/drixmykpt/video/upload/v1725177478/spacestation/explosion.mp3',
    {
      volume: 1,
    },
  )
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
    if (snap.startAnimation && snap.sound && snap.firstSound) {
      play()
    }
  }, [snap.startAnimation])

  useEffect(() => {
    if (snap.fire && snap.sound && snap.firstSound) {
      playExplosion()
    }
  }, [snap.fire])

  useEffect(() => {
    if (snap.stars && snap.sound && snap.firstSound) {
      playStars()
      return
    }
    stop()
  }, [snap.stars, snap.sound])

  useEffect(() => {
    snap.startAnimation && snap.infoPage != null && snap.sound && snap.firstSound && playTransition() //transition noise from one to the next imfo
    if (snap.fly && snap.infoPage === null && snap.sound && snap.firstSound) {
      playDown() //down noise when going into fly mode
    }
    if (snap.startAnimation && !snap.fly && snap.sound && snap.firstSound && snap.infoPage === null) {
      setTimeout(() => {
        playTransition() //noise at the end of the intro animation
      }, 5000)
    }
  }, [snap.startAnimation, snap.infoPage, snap.fly])
  return null
}

export default FixedAudio
