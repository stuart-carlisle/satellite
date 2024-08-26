'use client'
import React from 'react'
import { a, useSpring } from '@react-spring/web'
import { useSnapshot } from 'valtio'
import state from '../../state/stateSatellite'

const Loader = () => {
  const snap = useSnapshot(state)
  const progressBarStyles = useSpring({
    transform: `translateY(-50%) scaleX(${snap.progress / 100})`,
  })
  return (
    snap.progress < 100 && (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'black',
          zIndex: 2,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            transform: 'translate(-50%,-50%)',
            left: '50%',
            top: '50%',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 3,
          }}
        >
          <div className='progress'>{`Loading`}</div>
          {/* <div className="progress">{`${progress.toFixed(1)}%`}</div> */}
          <div className='progress-bar'>
            <a.div style={progressBarStyles} className='progress-bar-inner' />
          </div>
        </div>
      </div>
    )
  )
}

export default Loader
