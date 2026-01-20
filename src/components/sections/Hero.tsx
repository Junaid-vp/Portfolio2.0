"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import DecryptedText from "@/components/ui/DecryptedText";
import DotGrid from "@/components/ui/DotGrid";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent text-foreground">
      {/* Overlay Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center justify-center text-center px-2 sm:px-4">
        <div className="mb-4">
             <DecryptedText 
                text="HI, I'M JUNAID" 
                className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter block" 
                delay={3.8} 
             />
             <div className="text-xl sm:text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 block mt-2">
                 <DecryptedText 
                    text="SOFTWARE ENGINEER" 
                    className=""
                    delay={4.4}
                 />
             </div>
        </div>

        <motion.p 
          className="text-xs sm:text-sm md:text-xl text-muted-foreground max-w-2xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Building modern, user-friendly web applications with the MERN Stack.
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-foreground/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 sm:h-3 bg-foreground rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
