"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&";

function GlitchText({ text, className, isMounted }: { text: string; className?: string; isMounted: boolean }) {
  const letters = text.split("");
  
  return (
    <div className={`flex overflow-hidden ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: i * 0.1,
            ease: [0.33, 1, 0.68, 1],
          }}
          className="inline-block relative"
        >
          {letter}
          {isMounted && (
            <motion.span
                className="absolute inset-0 text-purple-500 opacity-0"
                animate={{
                opacity: [0, 0.7, 0],
                x: [0, -2, 2, 0],
                }}
                transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: Math.random() * 5 + 2,
                }}
            >
                {letter}
            </motion.span>
          )}
        </motion.span>
      ))}
    </div>
  );
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Smooth counter animation
    const interval = setInterval(() => {
      setCount((prev: number) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Slightly slower increment for better stability on mobile
        return Math.min(prev + Math.floor(Math.random() * 6) + 1, 100);
      });
    }, 50);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Safe data lines generation
  const dataLines = useMemo(() => {
    if (typeof window === "undefined") return [];
    return Array.from({ length: 10 }, () => 
      Array.from({ length: 30 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
    );
  }, [isMounted]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-white overflow-hidden pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
            {/* Background Data Stream - Client Only */}
            {isMounted && (
                <div className="absolute inset-0 opacity-[0.03] font-mono text-[10px] leading-none pointer-events-none select-none flex flex-col gap-4 p-4 overflow-hidden">
                    {dataLines.map((line, i) => (
                        <motion.div
                            key={i}
                            animate={{ x: i % 2 === 0 ? ["-10%", "10%"] : ["10%", "-10%"] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="whitespace-nowrap"
                        >
                            {line.repeat(5)}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Scanning Line */}
            {isMounted && (
                <motion.div 
                    className="absolute inset-x-0 h-[2px] bg-purple-500/20 z-20 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
            )}

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center">
                <GlitchText 
                    text="JUNAID" 
                    isMounted={isMounted}
                    className="text-3xl md:text-5xl font-black tracking-[0.4em] mb-6 text-white/40" 
                />

                <div className="relative">
                    <motion.h1 
                        className="text-[6rem] md:text-[12rem] font-black leading-none tracking-tighter tabular-nums text-white"
                        animate={isMounted ? {
                            textShadow: count % 10 === 0 ? "4px 0px 0px rgba(168,85,247,0.5), -4px 0px 0px rgba(6,182,212,0.5)" : "0px 0px 0px rgba(0,0,0,0)"
                        } : {}}
                    >
                        {count}
                    </motion.h1>
                    <motion.span 
                        className="absolute -right-6 md:-right-12 bottom-6 md:bottom-12 text-2xl md:text-4xl font-black text-purple-600"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    >
                        %
                    </motion.span>
                </div>
                
                <div className="mt-8 md:mt-12 flex flex-col items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-4">
                        <motion.div 
                            className="w-2 h-2 rounded-full bg-purple-500"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="text-[10px] md:text-sm font-mono tracking-[0.3em] uppercase text-white/60">
                            {count < 30 ? "System Handshake..." : count < 70 ? "Loading Core..." : "Ready to Launch"}
                        </span>
                    </div>

                    {/* Minimalist Progress Bar */}
                    <div className="w-[150px] md:w-[400px] h-[1px] bg-white/10 relative overflow-hidden">
                        <motion.div 
                            className="absolute inset-y-0 left-0 bg-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${count}%` }}
                        />
                    </div>
                </div>
            </div>
            
            {/* Corner Interface Elements */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 flex flex-col gap-1">
                <div className="w-8 md:w-12 h-[1px] bg-purple-500/50" />
                <div className="text-[8px] md:text-[10px] font-mono text-white/20 tracking-tight select-none">STATUS: ONLINE</div>
                <div className="text-[8px] md:text-[10px] font-mono text-white/20 tracking-tight select-none">ENCRYPTION: AES-256</div>
            </div>

            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex flex-col items-end gap-1 text-right">
                <div className="text-[8px] md:text-[10px] font-mono text-white/20 tracking-tight leading-relaxed select-none">
                    © 2026 JUNAID_VP<br/>
                    DESIGNED IN KERALA
                </div>
                <div className="w-8 md:w-12 h-[1px] bg-white/10 mt-1" />
            </div>

            {/* Grid Accents */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
