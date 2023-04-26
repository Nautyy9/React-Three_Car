import React, { useEffect } from 'react'
import {useLoader, useFrame} from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {  Mesh } from 'three'

function Car() {
    const gltf = useLoader(GLTFLoader, "model/scene.gltf")
    
    useEffect(() =>{
        const model  = gltf.scene

        model.scale.set(0.005,0.005,0.005);
        model.position.set(0,-0.035,0);
        // ? traverse reference all the children of the car model i.e, wheel window etc  , now we are referencing every mesh(i.e, wheel, window etc) with instanceof
        gltf.scene.traverse((object) =>{
            if(object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20
            }
        })
    },[gltf])
    
    useFrame((state, delta) =>{
      let t = state.clock.getElapsedTime();
      const group =  gltf.scene.getObjectByName('RootNode')!
      group.children[0].rotation.x = t*2
      group.children[2].rotation.x = t*2
      group.children[4].rotation.x = t*2
      group.children[6].rotation.x = t*2


    })
  return (
    // ? the gltf file is not created declaratively by R3F  so we've to inject it in the scene graph with the <primitive> jsx element
    // * primitive element is used to create something outside the R3F and then inject it into the scene graph , also the primitive element is disposed of automatically we've to manually dispose it
    <primitive object={gltf.scene}/>
  )
}

export default Car