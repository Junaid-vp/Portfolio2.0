"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 origin-left"
        style={{ scaleX }}
      />
      
      {/* Subtle depth indicator on the side */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 py-4 px-1 border-r border-white/10">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/20"
            style={{
              backgroundColor: useSpring(useScroll().scrollYProgress, { stiffness: 100, damping: 30 }).get() * 5 > i ? "rgba(168, 85, 247, 0.8)" : "rgba(255, 255, 255, 0.1)"
            }}
          />
        ))}
      </div>
    </div>
  );
}
