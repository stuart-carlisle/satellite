import { useProgress } from '@react-three/drei'
import state from '@/state/stateSatellite'

const Loader = () => {
  const { progress } = useProgress()
  state.progress = progress
  return null
}

export default Loader
