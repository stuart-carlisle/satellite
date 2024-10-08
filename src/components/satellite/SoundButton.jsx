'use client'
import React from 'react'
import { useSpring, a } from '@react-spring/web'
import { useSnapshot } from 'valtio'
import state from '@/state/stateSatellite'
import styles from './SoundButton.module.scss'

const SoundButton = () => {
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
    transform: `scale(${snap.firstSound && snap.sound ? 0.85 : 0.9})`,
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
  return (
    <div className={styles.toggle}>
      <div
        onClick={() => {
          state.sound = !snap.sound
          state.firstSound = true
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
              {snap.sound && snap.firstSound ? (
                <svg
                  className={styles.right}
                  width='40'
                  height='40'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M7.46968 1.05085C7.64122 1.13475 7.75 1.30904 7.75 1.5V13.5C7.75 13.691 7.64122 13.8653 7.46968 13.9492C7.29813 14.0331 7.09377 14.0119 6.94303 13.8947L3.2213 11H1.5C0.671571 11 0 10.3284 0 9.5V5.5C0 4.67158 0.671573 4 1.5 4H3.2213L6.94303 1.10533C7.09377 0.988085 7.29813 0.966945 7.46968 1.05085ZM6.75 2.52232L3.69983 4.89468C3.61206 4.96294 3.50405 5 3.39286 5H1.5C1.22386 5 1 5.22386 1 5.5V9.5C1 9.77615 1.22386 10 1.5 10H3.39286C3.50405 10 3.61206 10.0371 3.69983 10.1053L6.75 12.4777V2.52232ZM10.2784 3.84804C10.4623 3.72567 10.7106 3.77557 10.833 3.95949C12.2558 6.09798 12.2558 8.90199 10.833 11.0405C10.7106 11.2244 10.4623 11.2743 10.2784 11.1519C10.0944 11.0296 10.0445 10.7813 10.1669 10.5973C11.4111 8.72728 11.4111 6.27269 10.1669 4.40264C10.0445 4.21871 10.0944 3.97041 10.2784 3.84804ZM12.6785 1.43044C12.5356 1.2619 12.2832 1.24104 12.1147 1.38386C11.9462 1.52667 11.9253 1.77908 12.0681 1.94762C14.7773 5.14488 14.7773 9.85513 12.0681 13.0524C11.9253 13.2209 11.9462 13.4733 12.1147 13.6161C12.2832 13.759 12.5356 13.7381 12.6785 13.5696C15.6406 10.0739 15.6406 4.92612 12.6785 1.43044Z'
                    fill='#967435'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    strokeWidth={4}
                  ></path>
                </svg>
              ) : (
                <svg
                  className={styles.left}
                  width='40'
                  height='40'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M7.72361 1.05279C7.893 1.13749 8 1.31062 8 1.5V13.5C8 13.6894 7.893 13.8625 7.72361 13.9472C7.55421 14.0319 7.35151 14.0136 7.2 13.9L3.33333 11H1.5C0.671573 11 0 10.3284 0 9.5V5.5C0 4.67158 0.671573 4 1.5 4H3.33333L7.2 1.1C7.35151 0.986371 7.55421 0.968093 7.72361 1.05279ZM7 2.5L3.8 4.9C3.71345 4.96491 3.60819 5 3.5 5H1.5C1.22386 5 1 5.22386 1 5.5V9.5C1 9.77614 1.22386 10 1.5 10H3.5C3.60819 10 3.71345 10.0351 3.8 10.1L7 12.5V2.5ZM14.8536 5.14645C15.0488 5.34171 15.0488 5.65829 14.8536 5.85355L13.2071 7.5L14.8536 9.14645C15.0488 9.34171 15.0488 9.65829 14.8536 9.85355C14.6583 10.0488 14.3417 10.0488 14.1464 9.85355L12.5 8.20711L10.8536 9.85355C10.6583 10.0488 10.3417 10.0488 10.1464 9.85355C9.95118 9.65829 9.95118 9.34171 10.1464 9.14645L11.7929 7.5L10.1464 5.85355C9.95118 5.65829 9.95118 5.34171 10.1464 5.14645C10.3417 4.95118 10.6583 4.95118 10.8536 5.14645L12.5 6.79289L14.1464 5.14645C14.3417 4.95118 14.6583 4.95118 14.8536 5.14645Z'
                    fill='#967435'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    strokeWidth={4}
                  ></path>
                </svg>
              )}
            </div>
          </a.div>
        </a.div>
      </div>
    </div>
  )
}

export { SoundButton as default }
