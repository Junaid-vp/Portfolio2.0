"use client";

import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
        // Use lenis scroll if possible, or native smooth scroll
        element.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-muted" : "bg-transparent"
        )}
      >
        <Link href="/" className="text-2xl font-bold tracking-tighter hover:text-purple-400 transition-colors">
          JUNAID<span className="text-purple-500">.</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:scale-105 transition-all"
            >
              {item.name}
            </a>
          ))}

        </div>

        {/* Mobile Toggle */}
        <button 
            className="md:hidden text-foreground relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
            <div className="space-y-2">
                <span className={clsx("block w-8 h-0.5 bg-foreground transition-transform", mobileMenuOpen && "rotate-45 translate-y-2.5")}></span>
                <span className={clsx("block w-8 h-0.5 bg-foreground transition-opacity", mobileMenuOpen && "opacity-0")}></span>
                <span className={clsx("block w-8 h-0.5 bg-foreground transition-transform", mobileMenuOpen && "-rotate-45 -translate-y-2.5")}></span>
            </div>
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
            >
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => scrollToSection(e, item.href)}
                        className="text-3xl font-bold text-foreground hover:text-purple-500 transition-colors"
                    >
                        {item.name}
                    </a>
                ))}

            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
