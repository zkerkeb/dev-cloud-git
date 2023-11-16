import React, {Suspense, useEffect, useRef} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {OrbitControls, useGLTF} from '@react-three/drei';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

// Ce composant gère le chargement du modèle GLTF.
const Model = ({modelUrl, scale}) => {
  const ref = useRef();
  const {camera} = useThree();
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });
  useEffect(() => {
    camera.position.set(0, 40, 40);
    camera.lookAt(0, 0, 0);
  }, []);
  const {scene} = useGLTF(modelUrl, GLTFLoader);
  return <primitive ref={ref} scale={scale} object={scene} />;
};

const Model3DViewer = ({modelUrl}) => {
  return (
    <div style={{height: '100vh', width: '100vw'}}>
      <Canvas>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Model scale={[0.2, 0.2, 0.2]} modelUrl={modelUrl} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Model3DViewer;
