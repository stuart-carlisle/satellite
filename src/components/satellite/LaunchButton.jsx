'use client'
import React from 'react'
import { useSpring, a } from '@react-spring/web'
import { useSnapshot } from 'valtio'
import state from '@/state/stateSatellite'
import styles from './SoundButton.module.scss'

const ModeToggle = () => {
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
    transform: `scale(${snap.fire ? 0.85 : 0.9})`,
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

  return snap.startAnimation ? null : (
    <div className={styles.toggleTwo} style={{ visibility: snap.mounted ? 'visible' : 'hidden' }}>
      <div
        onClick={() => {
          state.fire = true
        }}
        className={styles.container}
        style={{ color: '#fff' }}
      >
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
              <div
                style={{
                  filter: `drop-shadow(1px 1px 3px rgba(255,255,255,0.5))`,
                  fontSize: '11px',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                  color: '#967435',
                }}
              >
                LAUNCH
              </div>
            </div>
          </a.div>
        </a.div>
      </div>
    </div>
  )
}

export { ModeToggle as default }
