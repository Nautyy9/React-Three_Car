import { CubeCamera, Environment, Grid, OrbitControls, PerspectiveCamera, Ring } from '@react-three/drei'
// import { PerspectiveCamera } from '@react-three/drei/core'
import { Canvas } from '@react-three/fiber'
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import React, { Suspense} from 'react'
import { Texture } from 'three'
import { Boxes } from './Boxes'
import Car from './Car'
import { FloatingGrid } from './FloatingGrid'
import Ground from './Ground'
import  Rings  from './Rings'
import { BlendFunction } from "postprocessing";

const  CallCamera :any =(texture : Texture) :  React.ReactNode =>(
  <>
    <Environment map={texture}/>
    <Car/>
  </>
)
// type sugmai = React.ReactNode & ReturnType<typeof CallCamera>


function ShowCar() {
  return (
    <>
    <OrbitControls target={[0,0.35,0]} maxPolarAngle={Math.PI/2}/>
    <PerspectiveCamera makeDefault fov={50} position={[3,2,5]}/>
    {/*?  let color = new Color(0,0,0) & attach is attaching this color to scene background  */}
    <color args={[0,0,0]} attach="background"></color>
    {/* placed at the center of the screen , it is being updated on every key frame, this element remove the child which is included in it from the render element i.e,*
      A THREE.CubeCamera that returns its texture as a render-prop. It makes children invisible while rendering to the internal buffer so that they are not included in the reflection. 
  */}
    <CubeCamera resolution={256}  frames={Infinity}>
      {CallCamera}
    </CubeCamera>
    
    {/* let spotLigth = new SpotLight()
    spotLight.intensity = 1.5 
    spotLight.position.set(...)
    */}

    <spotLight 
    color={[1,0.25, 0.7]}
    intensity={1.5}
    angle={0.6}
    penumbra={0.5}
    position={[5,5,0]}
    castShadow
    shadow-bias={-0.0001}
    ></spotLight>
    {/* <axesHelper/> */}
    <spotLight 
    color={[0.14,0.5, 1]}
    intensity={2}
    angle={0.6}
    penumbra={0.5}
    position={[-5,5,0]}
    castShadow
    shadow-bias={-0.0001}
    ></spotLight>

    <Ground/>
    <FloatingGrid />
    <Boxes />
    <Rings/>


    <EffectComposer>
        {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.5} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>
    </>
  )
}


function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <ShowCar/>
      </Canvas>
    </Suspense>
  )
}

export default App