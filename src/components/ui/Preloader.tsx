"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Massive counter animation
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment for "hacking" feel
        return Math.min(prev + Math.floor(Math.random() * 5) + 1, 100);
      });
    }, 50);

    // Complete loading after ~2.5 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black text-white overflow-hidden cursor-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            {/* Background Grid (subtle) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

            {/* Massive Counter */}
            <div className="relative z-10 flex flex-col items-center">
                <motion.h1 
                    className="text-[12rem] md:text-[20rem] font-black leading-none tracking-tighter tabular-nums"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {count}%
                </motion.h1>
                
                {/* Glitchy Text */}
                <motion.div 
                    className="mt-8 text-xl md:text-3xl font-bold tracking-[0.5em] uppercase text-purple-500 animate-pulse"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Initializing System...
                </motion.div>
                
                {/* Loader Bar */}
                <div className="w-[300px] h-1 bg-white/20 mt-8 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-purple-600 shadow-[0_0_20px_#a855f7]"
                        style={{ width: `${count}%` }}
                    />
                </div>
            </div>
            
            {/* Decorative Corners */}
            <div className="absolute top-8 left-8 text-xs font-mono text-gray-500">
                SYSTEM: ONLINE<br/>
                SECURE CHECK: PASS
            </div>
            <div className="absolute bottom-8 right-8 text-xs font-mono text-gray-500 text-right">
                ID: 8XK-99<br/>
                VERSION 2.0
            </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
