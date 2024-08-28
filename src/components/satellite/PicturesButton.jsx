'use client'
import React from 'react'
import { useSpring, a } from '@react-spring/web'
import { useSnapshot } from 'valtio'
import state from '@/state/stateSatellite'
import styles from './SoundButton.module.scss'

const PicturesButton = () => {
  const snap = useSnapshot(state)
  const stylesButton = useSpring({
    left: '50%',
    top: '50%',
    position: 'absolute',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: '#967435 2px solid',
    background: '#222',
    transform: `scale(${snap.picturesButtonPressed ? 0.85 : 0.9})`,
    transformOrigin: `center`,
    boxShadow: 'inset 0px 3px 2px 1px rgba(255,255,255,0.5)',
    margin: '-30px 0 0 -30px',
    config: { bounce: true, mass: 1, tension: 100, friction: 20, velocity: 0.1 },
  })
  const stylesSlider = useSpring({
    position: 'relative',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: '#222',
    boxShadow: `inset 0px 0px 3px 1px rgba(0,0,0,0.5)`,
    border: '#967435 2px solid',
    config: { bounce: true, mass: 4, tension: 400, friction: 50 },
  })
  const onClick = () => {
    state.picturesButtonPressed = true
    setTimeout(() => {
      state.picturesButtonPressed = false
    }, 500)
    if (snap.infoPage === 1) {
      state.picturesMicro = !snap.picturesMicro
      return
    }
    if (snap.infoPage === 2) {
      state.picturesBrain = !snap.picturesBrain
      return
    }
    if (snap.infoPage === 3) {
      state.picturesGame = !snap.picturesGame
      return
    }
  }
  return (
    snap.infoPage != null && (
      <div className={styles.toggle} style={{ bottom: 'calc(100vh - 20px)', transform: 'translate(0,100%)' }}>
        <div onClick={onClick} className={styles.container} style={{ color: '#fff' }}>
          <a.div style={stylesSlider} className={styles.slider}>
            <a.div style={stylesButton}>
              <div
                style={{
                  position: 'relative',
                  height: '54px',
                  width: '54px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
                }}
              >
                <svg
                  className={styles.right}
                  width='40'
                  height='40'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M2 3C1.44772 3 1 3.44772 1 4V11C1 11.5523 1.44772 12 2 12H13C13.5523 12 14 11.5523 14 11V4C14 3.44772 13.5523 3 13 3H2ZM0 4C0 2.89543 0.895431 2 2 2H13C14.1046 2 15 2.89543 15 4V11C15 12.1046 14.1046 13 13 13H2C0.895431 13 0 12.1046 0 11V4ZM2 4.25C2 4.11193 2.11193 4 2.25 4H4.75C4.88807 4 5 4.11193 5 4.25V5.75454C5 5.89261 4.88807 6.00454 4.75 6.00454H2.25C2.11193 6.00454 2 5.89261 2 5.75454V4.25ZM12.101 7.58421C12.101 9.02073 10.9365 10.1853 9.49998 10.1853C8.06346 10.1853 6.89893 9.02073 6.89893 7.58421C6.89893 6.14769 8.06346 4.98315 9.49998 4.98315C10.9365 4.98315 12.101 6.14769 12.101 7.58421ZM13.101 7.58421C13.101 9.57302 11.4888 11.1853 9.49998 11.1853C7.51117 11.1853 5.89893 9.57302 5.89893 7.58421C5.89893 5.5954 7.51117 3.98315 9.49998 3.98315C11.4888 3.98315 13.101 5.5954 13.101 7.58421Z'
                    fill='#967435'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    strokeWidth={4}
                  ></path>
                </svg>
              </div>
            </a.div>
          </a.div>
        </div>
      </div>
    )
  )
}

export default PicturesButton
