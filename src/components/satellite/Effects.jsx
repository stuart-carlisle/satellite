import { EffectComposer, Bloom, DepthOfField, Vignette, Glitch, Scanline } from '@react-three/postprocessing'
import { KernelSize, GlitchMode } from 'postprocessing'

const Effects = () => {
  return (
    <EffectComposer multisampling={0}>
      <Glitch
        delay={[6, 10]} // min and max glitch delay
        duration={[0.6, 1.0]} // min and max glitch duration
        strength={[0.3, 0.8]} // min and max glitch strength
        mode={GlitchMode.SPORADIC} // glitch mode
        active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
        ratio={0.95} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
      />
      <Bloom
        intensity={0.2} // The bloom intensity.
        kernelSize={KernelSize.HUGE} // blur kernel size
        luminanceThreshold={0.2} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0.3} // smoothness of the luminance threshold. Range is [0, 1]
      />
      {/* <Bloom
        intensity={0.05} // The bloom intensity.
        kernelSize={5} // blur kernel size
        luminanceThreshold={0.2} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0.4} // smoothness of the luminance threshold. Range is [0, 1]
      /> */}
      <DepthOfField
        focusDistance={0.1} // where to focus
        focalLength={0.84} // focal length
        bokehScale={2} // bokeh size
      />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
      <Scanline density={2} />
    </EffectComposer>
  )
}

export default Effects
