"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current || !followerRef.current) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference hidden md:block">
      {/* Center Dot */}
      <div
        ref={cursorRef}
        className="absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />
      {/* Crosshair Lines */}
      <div
        ref={followerRef}
        className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white transform -translate-y-1/2 scale-x-50 opacity-50 transition-transform duration-300" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white transform -translate-x-1/2 scale-y-50 opacity-50 transition-transform duration-300" />
        <div className="absolute inset-0 border border-white/30 rounded-full scale-75" />
      </div>
    </div>
  );
}
