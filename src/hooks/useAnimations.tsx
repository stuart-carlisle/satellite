import * as React from 'react'
import { Object3D, AnimationClip, AnimationAction, AnimationMixer } from 'three'
import { useFrame } from '@react-three/fiber'

type Api = {
  ref: React.MutableRefObject<Object3D | undefined | null>
  clips: AnimationClip[]
  mixer: AnimationMixer
  names: string[]
  actions: {
    [key: string]: AnimationAction
  }
}

export function useAnimations(clips: AnimationClip[], root?: React.MutableRefObject<Object3D | undefined | null>) {
  const ref = React.useRef<Object3D>()
  const actualRef = root ? root : ref
  const [mixer] = React.useState(() => new AnimationMixer(undefined as unknown as Object3D))
  const api: Api = React.useMemo(
    () => ({
      ref: actualRef,
      clips,
      actions: clips.reduce((prev, clip) => ({ ...prev, [clip.name]: null }), {}),
      names: clips.map((clip) => clip.name),
      mixer,
    }),
    [clips, mixer, actualRef],
  )
  useFrame((state, delta) => mixer.update(delta))
  React.useEffect(() => {
    const currentRoot = actualRef.current
    if (currentRoot) {
      clips.forEach((clip) => (api.actions[clip.name] = mixer.clipAction(clip, currentRoot)))
    }
    return () =>
      Object.values(api.actions).forEach((action) => {
        if (currentRoot) {
          mixer.uncacheAction(action as unknown as AnimationClip, currentRoot)
        }
      })
  }, [api, clips, mixer, root, actualRef])
  return api
}
