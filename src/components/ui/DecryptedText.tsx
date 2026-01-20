"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

interface DecryptedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function DecryptedText({ text, className, delay = 0 }: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  
  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2; // Speed of decoding involves this increment
    }, 40); // Speed of character shuffle

    const startTimeout = setTimeout(() => {
        // Just to handle visual delay if needed, currently controlled by inView
    }, delay * 1000);

    return () => {
        clearInterval(interval);
        clearTimeout(startTimeout);
    };
  }, [isInView, text, delay]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.1, delay }}
    >
      {displayText || text}
    </motion.span>
  );
}
