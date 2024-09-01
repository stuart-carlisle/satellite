import React, { useState } from 'react'
import { useSprings, a, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
import { useSnapshot } from 'valtio'
import state from '@/state/stateSatellite'
import useSound from 'use-sound'

import styles from './Cards.module.scss'

const microCards = [
  'https://res.cloudinary.com/drixmykpt/image/upload/v1724874617/spacestation/menuImages/Micro1.jpg',
  'https://res.cloudinary.com/drixmykpt/image/upload/v1724874617/spacestation/menuImages/Micro2.jpg',
  'https://res.cloudinary.com/drixmykpt/image/upload/v1724874618/spacestation/menuImages/Micro3.jpg',
  'https://res.cloudinary.com/drixmykpt/image/upload/v1724874619/spacestation/menuImages/Micro4.jpg',
  'https://res.cloudinary.com/drixmykpt/image/upload/v1724874620/spacestation/menuImages/Micro5.jpg',
]

const brainCards = [
  'https://res.cloudinary.com/drixmykpt/image/upload/v1724874613/spacestation/menuImages/Brain2.jpg',
  'https://res.cloudinary.com/drixmykpt/image/upload/v1724874613/spacestation/menuImages/Brain3.jpg',
  'https://res.cloudinary.com/drixmykpt/image/upload/v1724874614/spacestation/menuImages/Brain4.jpg',
  'https://res.cloudinary.com/drixmykpt/image/upload/v1724874620/spacestation/menuImages/Brain1.jpg',
]

const gameCards = [
  'https://res.cloudinary.com/drixmykpt/image/upload/v1724874615/spacestation/menuImages/Games2.jpg',
  'https://res.cloudinary.com/drixmykpt/image/upload/v1724874615/spacestation/menuImages/Games3.jpg',
  'https://res.cloudinary.com/drixmykpt/image/upload/v1724874614/spacestation/menuImages/Games1.jpg',
  'https://res.cloudinary.com/drixmykpt/image/upload/v1724874617/spacestation/menuImages/Games4.jpg',
]

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => {
  return {
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  }
}
const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

function Deck() {
  const snap = useSnapshot(state)
  const [playSwipe] = useSound('https://res.cloudinary.com/drixmykpt/video/upload/v1724862694/spacestation/swipe.mp3', {
    volume: 1.5,
  })
  const cards = snap.infoPage === 1 ? microCards : snap.infoPage === 2 ? brainCards : gameCards
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }))
  // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    if (!down && trigger) {
      gone.add(index)
      setTimeout(() => {
        snap.sound && snap.firstSound && playSwipe()
      }, 100)
    } // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    api.start((i) => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      }
    })
    if (!down && gone.size === cards.length)
      //if all gone reset
      setTimeout(() => {
        gone.clear()
        state.picturesMicro = false
        state.picturesGame = false
        state.picturesBrain = false
        //api.start((i) => to(i))
      }, 600)
  })
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        <a.div className={styles.deck} key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <a.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${cards[i]})`,
            }}
          />
        </a.div>
      ))}
    </>
  )
}

export default function App() {
  const snap = useSnapshot(state)
  const [play] = useSound('https://res.cloudinary.com/drixmykpt/video/upload/v1725179800/spacestation/cards.mp3', {
    volume: 0.3,
  })
  if (snap.picturesMicro || snap.picturesBrain || snap.picturesGame) {
    setTimeout(() => {
      snap.sound && snap.firstSound && play()
    }, 100)
  }
  return (
    (snap.picturesMicro || snap.picturesBrain || snap.picturesGame) && (
      <div className={styles.container}>
        <Deck />
      </div>
    )
  )
}
