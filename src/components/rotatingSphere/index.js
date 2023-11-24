import {Canvas, useFrame, useLoader} from '@react-three/fiber';
import React, {useEffect, useRef} from 'react';
import {TextureLoader} from 'three';
import earth_texture from '../../assets/3d/earth_texture.jpeg';

const RotatingSphere = () => {
  const ref = useRef();
  const texture = useLoader(TextureLoader, earth_texture); // Remplacez par le chemin de votre texture

  useFrame(() => {
    if (ref.current) {
      // ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    console.log('ref.current', ref.current);
    // ref.current.rotation.x += 0.6;
  }, []);

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[6, 128, 128]} />
      <meshStandardMaterial map={texture} roughness={0.5} metalness={0.5} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas
      style={{
        width: '100%',
        height: 300,
      }}
      camera={{
        position: [0, 0, 10],
      }}>
      <ambientLight intensity={4} />
      <pointLight position={[10, 10, 10]} />
      <RotatingSphere />
    </Canvas>
  );
};

export default Scene;
