"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TrackballControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";

const SKILLS = [
  { name: "HTML", icon: "html5/E34F26" },
  { name: "JavaScript", icon: "javascript/F7DF1E" },
  { name: "React", icon: "react/61DAFB" },
  { name: "Redux", icon: "redux/764ABC" },
  { name: "TypeScript", icon: "typescript/3178C6" },
  { name: "Next.js", icon: "nextdotjs/white" },
  { name: "Tailwind CSS", icon: "tailwindcss/06B6D4" },
  { name: "Bootstrap", icon: "bootstrap/7611F7" },
  { name: "Node.js", icon: "nodedotjs/339933" },
  { name: "Express.js", icon: "express/white" },
  { name: "MongoDB", icon: "mongodb/47A248" },
  { name: "Git", icon: "git/F05032" },
  { name: "Postman", icon: "postman/FF6C37" },
  { name: "Axios", icon: "axios/5A29E4" },
];

function Word({ children, icon, position }: { children: string; icon: string; position: THREE.Vector3 }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Group>(null);
  
  // Individual floating animation
  useFrame((state) => {
    if (ref.current) {
        // Add a unique offset based on position to make them float out of sync
        const time = state.clock.getElapsedTime();
        const offset = position.x + position.y; 
        ref.current.position.y = position.y + Math.sin(time + offset) * 0.5;
    }
  });

  return (
    <group ref={ref} position={position}>
        <Html center distanceFactor={12} zIndexRange={[100, 0]}>
        <div 
            className={`
                flex flex-col items-center justify-center gap-1 md:gap-2 cursor-pointer transition-transform duration-300 select-none
                ${hovered ? 'scale-125 z-50' : ''}
            `}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img 
                src={`https://cdn.simpleicons.org/${icon}`} 
                alt={children}
                className={`w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 object-contain filter drop-shadow-lg`}
            />
            <span className={`text-[10px] sm:text-sm md:text-lg font-bold tracking-wide ${hovered ? 'scale-105 text-white' : 'text-zinc-400'} transition-colors`}>
                {children}
            </span>
        </div>
        </Html>
    </group>
  );
}

function Cloud({ radius = 20 }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Global auto-rotation of the sphere
  useFrame((state, delta) => {
    if (groupRef.current) {
        groupRef.current.rotation.y += delta * 0.1; // Slow rotation
        groupRef.current.rotation.x += delta * 0.05;
    }
  });

  const randomWords = useMemo(() => {
      const temp = [];
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      for (let i = 0; i < SKILLS.length; ++i) {
          const theta = 2 * Math.PI * i / goldenRatio;
          const phi = Math.acos(1 - 2 * (i + 0.5) / SKILLS.length);
          const x = Math.cos(theta) * Math.sin(phi);
          const y = Math.sin(theta) * Math.sin(phi);
          const z = Math.cos(phi);
          temp.push({ pos: new THREE.Vector3(x, y, z).multiplyScalar(radius), word: SKILLS[i].name, icon: SKILLS[i].icon });
      }
      return temp;
  }, [radius]);


  return (
    <group ref={groupRef}> 
      {randomWords.map(({ pos, word, icon }, index) => (
        <Word key={index} position={pos} icon={icon}>{word}</Word>
      ))}
    </group>
  );
}

export default function SkillSphere() {
  const [mounted, setMounted] = useState(false);
  const [radius, setRadius] = useState(20);
  const [cameraZ, setCameraZ] = useState(35);

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) { // Mobile
        setRadius(15);
        setCameraZ(38);
      } else if (width < 768) { // Tablet
        setRadius(16);
        setCameraZ(35);
      } else { // Desktop
        setRadius(20);
        setCameraZ(35);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div className="h-[400px] sm:h-[450px] md:h-[600px] w-full cursor-move relative z-10">
      <Canvas 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, cameraZ], fov: 50 }}
        gl={{ powerPreference: "high-performance", antialias: false }}
      >

        <Float rotationIntensity={0} floatIntensity={0} speed={0}> {/* Disabled Float wrapper as we do custom anim */}
            <Cloud radius={radius} /> 
        </Float>
        <TrackballControls noZoom rotateSpeed={2} />
      </Canvas>
    </div>
  );
}
