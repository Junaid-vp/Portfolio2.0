"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere args={[1, 24, 24]} scale={2} ref={meshRef}>
        <MeshDistortMaterial
          color="#7000df"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
          metalness={0.6}
        />
      </Sphere>
    </Float>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={2} />
        <AnimatedSphere />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
