"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";

interface ResumeButtonProps {
  className?: string;
  variant?: "hero" | "nav";
}

export default function ResumeButton({ className, variant = "hero" }: ResumeButtonProps) {
  const isHero = variant === "hero";

  return (
    <motion.a
      href="/MOHAMMED-JUNAID.VP-MERN-RESUME.pdf"
      download="MOHAMMED-JUNAID.VP-MERN-RESUME.pdf"
      initial={isHero ? { opacity: 0, y: 20 } : { opacity: 0, scale: 0.8 }}
      animate={isHero ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay: isHero ? 0.8 : 0, duration: 0.5 }}
      className={`
        relative group flex items-center justify-center gap-3 overflow-hidden
        ${isHero ? 
          "px-8 py-4 bg-white text-black text-sm md:text-base font-black uppercase tracking-[0.2em] rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(168,85,247,0.4)]" : 
          "px-4 py-2 bg-purple-600/10 border border-purple-500/30 text-xs font-bold text-white uppercase tracking-widest rounded-xl backdrop-blur-md"
        }
        transition-all duration-500
        ${className}
      `}
    >
      {/* Glitch/Energy Background for Hero version */}
      {isHero && (
        <>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          />
          <motion.div 
            animate={{ 
              x: ["-100%", "100%"] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-0 left-0 w-1/3 h-full bg-white/20 skew-x-12 z-0"
          />
        </>
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
        {isHero ? <FileText className="w-5 h-5" /> : <Download className="w-4 h-4" />}
        {isHero ? "Download Resume" : "CV"}
      </span>

      {/* Massive Glow for Hero */}
      {isHero && (
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
      )}
    </motion.a>
  );
}
