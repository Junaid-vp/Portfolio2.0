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
        {!isHovered && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
            >
                <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="w-12 h-12 rounded-full border border-purple-500/50 flex items-center justify-center bg-purple-500/10 backdrop-blur-sm">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                            <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0 0 12 2z"/>
                            <path d="M12 6v6"/>
                            <path d="M12 16v.01"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                    </div>
                    <span className="text-[10px] font-mono text-purple-400 tracking-[0.2em] font-bold uppercase drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                        Touch to Reveal
                    </span>
                </motion.div>
            </motion.div>
        )}

        {!isHovered && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-4 right-4 z-20"
            >
                <div className="text-[8px] font-mono text-purple-500/60 uppercase tracking-tighter">
                   Status: Locked_Data
                </div>
            </motion.div>
        )}

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
            <div className={`transition-all duration-700 ${isHovered ? 'scale-110 blur-0 grayscale-0' : 'scale-100 grayscale-[0.85] blur-[1px] opacity-70'}`}>
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
