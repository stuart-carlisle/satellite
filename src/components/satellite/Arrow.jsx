'use client'
import { useSnapshot } from 'valtio'
import state from '@/state/stateSatellite'
import styles from './Arrow.module.scss'

const Arrow = () => {
  const snap = useSnapshot(state)
  const onClick = () => {
    if (snap.infoPage === null) {
      state.fly = false
      state.instructions = false
      state.infoPage = 1
      state.stars = false
      state.picturesBrain = false
      state.picturesMicro = false
      state.picturesGame = false
      return
    }
    if (snap.infoPage < 3) {
      state.fly = false
      state.instructions = false
      state.infoPage++
      state.stars = false
      state.picturesBrain = false
      state.picturesMicro = false
      state.picturesGame = false
      return
    }
    if (snap.infoPage === 3) {
      state.infoPage = null
      state.instructions = true
      state.fly = true
      state.stars = true
      state.picturesBrain = false
      state.picturesMicro = false
      state.picturesGame = false
      return
    }
  }
  return (
    snap.startAnimation && (
      <div id='right-arrow' className={styles.arrowOuterContainer} style={{ right: 0 }}>
        <div className={styles.arrowInnerContainer}>
          <svg
            className={styles.arrowSvg}
            onClick={onClick}
            width={32}
            viewBox='0 0 68 119'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              className={styles.arrowPath2}
              filter={'url(#bevel3)'}
              d='M3.57538 68.6527C8.17689 72.8048 52.8773 114.324 55.5068 116.59C58.1362 118.854 61.7518 119.233 64.7099 116.59C67.6679 113.948 67.9965 109.418 66.3533 106.399C64.7099 103.378 22.5074 64.1233 21.3241 62.9908C20.1409 61.8585 19.0233 60.7262 19.0233 59.2163C19.0233 57.7064 20.1409 56.5741 21.3243 55.4418C22.5074 54.3093 64.7099 15.0537 66.3533 12.0341C67.9967 9.01443 67.6679 4.48505 64.7099 1.84284C61.7518 -0.799377 58.1364 -0.421945 55.5068 1.84284C52.8775 4.10743 8.50585 45.2504 3.57558 49.78C-1.3547 54.3093 -1.02613 64.5007 3.57538 68.6527Z'
              fill='#fff'
            />
            <path
              className={styles.arrowPath}
              filter={'url(#bevel3)'}
              d='M3.57538 68.6527C8.17689 72.8048 52.8773 114.324 55.5068 116.59C58.1362 118.854 61.7518 119.233 64.7099 116.59C67.6679 113.948 67.9965 109.418 66.3533 106.399C64.7099 103.378 22.5074 64.1233 21.3241 62.9908C20.1409 61.8585 19.0233 60.7262 19.0233 59.2163C19.0233 57.7064 20.1409 56.5741 21.3243 55.4418C22.5074 54.3093 64.7099 15.0537 66.3533 12.0341C67.9967 9.01443 67.6679 4.48505 64.7099 1.84284C61.7518 -0.799377 58.1364 -0.421945 55.5068 1.84284C52.8775 4.10743 8.50585 45.2504 3.57558 49.78C-1.3547 54.3093 -1.02613 64.5007 3.57538 68.6527Z'
              fill='#fff'
            />
          </svg>
        </div>
      </div>
    )
  )
}
export default Arrow
