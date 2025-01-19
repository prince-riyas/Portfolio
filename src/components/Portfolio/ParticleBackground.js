import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

// Particle system component
const Particles = () => {
  const particlesRef = useRef();

  // Animation logic for rotating particles
  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += delta * 0.1; // Rotate on X-axis
      particlesRef.current.rotation.y += delta * 0.05; // Rotate on Y-axis
    }
  });

  return (
    <Points ref={particlesRef} positions={random.inSphere(new Float32Array(500), { radius: 1.5 })}>
      <PointMaterial
        transparent
        color="#ffffff" // Black particles
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

// Main ParticleBackground component
const ParticleBackground = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1] }} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
      <Particles />
    </Canvas>
  );
};

export default ParticleBackground;