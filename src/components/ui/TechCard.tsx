"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TechCardProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export default function TechCard({ children, className, label = "DATA_ENTRY" }: TechCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-2xl bg-zinc-900/50 p-1 backdrop-blur-sm border border-white/5 transition-colors duration-500 hover:border-purple-500/30 group"
      >
        {/* Technical Corner Brackets */}
        <div className="absolute inset-0 pointer-events-none z-20">
            {/* Top Left */}
            <motion.div 
                className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-500"
                animate={{ x: isHovered ? -4 : 4, y: isHovered ? -4 : 4, opacity: isHovered ? 1 : 0.3 }}
            />
            {/* Top Right */}
            <motion.div 
                className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500"
                animate={{ x: isHovered ? 4 : -4, y: isHovered ? -4 : 4, opacity: isHovered ? 1 : 0.3 }}
            />
            {/* Bottom Left */}
            <motion.div 
                className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500"
                animate={{ x: isHovered ? -4 : 4, y: isHovered ? 4 : -4, opacity: isHovered ? 1 : 0.3 }}
            />
            {/* Bottom Right */}
            <motion.div 
                className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-500"
                animate={{ x: isHovered ? 4 : -4, y: isHovered ? 4 : -4, opacity: isHovered ? 1 : 0.3 }}
            />
        </div>

        {/* Scan Line Animation */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl z-10 pointer-events-none">
            <motion.div 
                className="w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0"
                animate={isHovered ? { top: ["0%", "100%"], opacity: [0, 0.5, 0] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                style={{ position: 'absolute' }}
            />
        </div>

        {/* HUD Elements */}
        {isHovered && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-4 left-4 z-20"
            >
                <div className="text-[8px] font-mono text-purple-400 leading-none">
                   SYS_ID: {label}<br/>
                   SIG: ACTIVE
                </div>
            </motion.div>
        )}

        {/* Inner Content (The Image) */}
        <div 
            className="relative h-full w-full overflow-hidden rounded-xl bg-black"
            style={{ transform: "translateZ(20px)" }}
        >
            <div className={`transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100 grayscale hover:grayscale-0'}`}>
                {children}
            </div>
            
            {/* High-tech Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_50%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
        </div>
      </motion.div>

      {/* Outer Glow */}
      <motion.div 
        className="absolute -inset-2 bg-purple-600/20 blur-2xl rounded-full -z-10 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </div>
  );
}
