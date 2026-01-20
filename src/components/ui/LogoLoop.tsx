"use client";

import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.15, // Ultra-fast response for premium feel
  MIN_COPIES: 3
};

const cx = (...parts: (string | boolean | undefined)[]) => parts.filter(Boolean).join(' ');

const useResizeObserver = (callback: () => void, elements: React.RefObject<HTMLElement | null>[], dependencies: any[]) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => observers.forEach(observer => observer?.disconnect());
  }, [callback, ...elements, ...dependencies]);
};

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLElement | null>, 
  targetVelocity: number, 
  seqWidth: number, 
  isPaused: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || seqWidth <= 0) return;

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const target = isPaused ? 0 : targetVelocity;
      velocityRef.current += (target - velocityRef.current) * (1 - Math.exp(-delta / ANIMATION_CONFIG.SMOOTH_TAU));

      offsetRef.current += velocityRef.current * delta;
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;

      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
    };
  }, [targetVelocity, seqWidth, isPaused, trackRef]);
};

interface LogoItem {
  src?: string;
  title?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  logoHeight?: number;
  gap?: number;
}

export const LogoLoop = memo(({ logos, speed = 80, logoHeight = 40, gap = 60 }: LogoLoopProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Helper to extract color from simpleicons URL (e.g. /html5/E34F26)
  const getIconColor = (src: string | undefined) => {
    if (!src) return '#a855f7';
    const match = src.match(/\/([A-Fa-f0-9]{6})$/);
    return match ? `#${match[1]}` : '#a855f7';
  };

  const updateDimensions = useCallback(() => {
    if (seqRef.current) {
      setSeqWidth(seqRef.current.offsetWidth);
    }
  }, []);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos.length]);
  useAnimationLoop(trackRef, speed, seqWidth, isHovered);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden group py-12 md:py-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredIdx(null);
      }}
    >
      {/* Cinematic Masking */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black via-black/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black via-black/90 to-transparent z-20 pointer-events-none" />

      {/* Main Animation Track */}
      <div ref={trackRef} className="flex flex-row w-max will-change-transform translate-z-0">
        {[0, 1, 2].map((i) => (
          <ul
            key={i}
            ref={i === 0 ? seqRef : undefined}
            className="flex items-center"
            style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
          >
            {logos.map((logo, idx) => {
              const accentColor = getIconColor(logo.src);
              return (
                <li 
                  key={`${i}-${idx}`}
                  className="relative flex-none"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <motion.div
                    animate={{ 
                      scale: hoveredIdx === idx ? 1.25 : 1,
                      backgroundColor: hoveredIdx === idx ? `${accentColor}10` : 'rgba(255,255,255,0.03)',
                      borderColor: hoveredIdx === idx ? `${accentColor}50` : 'rgba(255,255,255,0.05)',
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className="relative p-6 rounded-2xl border backdrop-blur-md transition-all duration-300"
                  >
                    {/* Background Shine Effect */}
                    <AnimatePresence>
                      {hoveredIdx === idx && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 rounded-[inherit] overflow-hidden"
                        >
                          <motion.div 
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.img 
                      src={logo.src} 
                      alt={logo.title}
                      animate={{ 
                        filter: hoveredIdx === idx ? `drop-shadow(0 0 15px ${accentColor}80) brightness(1.2)` : 'grayscale(1) brightness(0.6)'
                      }}
                      className="block object-contain"
                      style={{ height: `${logoHeight}px`, width: 'auto' }}
                      draggable={false}
                    />

                    {/* Technical Meta HUD */}
                    <AnimatePresence>
                      {hoveredIdx === idx && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5, y: -20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.5, y: -10 }}
                          className="absolute -top-12 left-1/2 -translate-x-1/2 z-30"
                        >
                          <div className="flex flex-col items-center">
                             <div 
                               className="px-4 py-1.5 rounded-sm text-[10px] font-black font-mono uppercase tracking-[0.2em] shadow-2xl relative border"
                               style={{ 
                                 backgroundColor: accentColor, 
                                 color: '#fff',
                                 borderColor: 'rgba(255,255,255,0.2)'
                               }}
                             >
                               {logo.title}
                               <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" style={{ backgroundColor: accentColor }} />
                             </div>
                             <div className="mt-2 text-[8px] font-mono text-zinc-500 tracking-tighter">ENGINE_SYNC: OK</div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* High-Tech Frame Brackets */}
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/20 rounded-tl-[1px]" />
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-white/20 rounded-tr-[1px]" />
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-white/20 rounded-bl-[1px]" />
                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/20 rounded-br-[1px]" />
                  </motion.div>

                  {/* Reflection Underneath */}
                  <div 
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-4 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: `${accentColor}40`, filter: 'blur(20px)' }}
                  />
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;
