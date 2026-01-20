"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Mouse Position Motion Values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring Physics for "World Class" Smoothness
  const springConfig = { stiffness: 450, damping: 30, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovered(!!isClickable);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer Ring - Follows with elastic spring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-500/50 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 64 : 32,
          height: isHovered ? 64 : 32,
        }}
        animate={{
          scale: isActive ? 0.8 : 1,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Trailing Glow */}
        <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>

      {/* Inner Dot - Fast tracking */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 4 : 1,
          backgroundColor: isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,1)",
        }}
      />

      {/* Crosshair/HUD elements for Antigravity feel */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
         <AnimatePresence>
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="relative w-16 h-16 flex items-center justify-center"
                >
                    <div className="absolute top-0 left-0 w-2 h-[1px] bg-purple-500" />
                    <div className="absolute top-0 left-0 w-[1px] h-2 bg-purple-500" />
                    
                    <div className="absolute top-0 right-0 w-2 h-[1px] bg-purple-500" />
                    <div className="absolute top-0 right-0 w-[1px] h-2 bg-purple-500" />
                    
                    <div className="absolute bottom-0 left-0 w-2 h-[1px] bg-purple-500" />
                    <div className="absolute bottom-0 left-0 w-[1px] h-2 bg-purple-500" />
                    
                    <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-purple-500" />
                    <div className="absolute bottom-0 right-0 w-[1px] h-2 bg-purple-500" />
                    
                    <span className="text-[8px] font-mono text-purple-400 absolute -top-4 tracking-tighter">LOCKED</span>
                </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
    </>
  );
}
