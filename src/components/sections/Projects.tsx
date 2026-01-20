"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "E-COMMERCE APP",
    category: "Full Stack React",
    description: "A modern shopping platform with UseContext state management, cart functionality, and seamless checkout flow.",
    color: "#7000df",
    image: "https://junaid-portfolio-devvv.vercel.app/Screenshot%202025-12-26%20at%204.26.32%E2%80%AFPM.jpeg",
    link: "https://miraggiolife.vercel.app/"
  },
  {
    id: 2,
    title: "NEO CALC",
    category: "React Application",
    description: "Advanced calculator with memory functions and theme switching, built with React & Tailwind.",
    color: "#00bac5",
    image: "https://junaid-portfolio-devvv.vercel.app/Image%2010-12-25%20at%207.26%E2%80%AFPM.jpeg",
    link: "https://neocalc-calculator.vercel.app/"
  },
  {
    id: 3,
    title: "MAKEMYTRIP CLONE",
    category: "UI Engineering",
    description: "Pixel-perfect clone of the travel booking interface using advanced CSS and responsive design patterns.",
    color: "#ff0080",
    image: "https://junaid-portfolio-devvv.vercel.app/Screenshot%202025-09-03%20at%209.18.03%E2%80%AFPM.png",
    link: "#"
  },
  {
    id: 4,
    title: "LEGACY PORTFOLIO",
    category: "Web Design",
    description: "My previous personal website showcasing early frontend skills with Bootstrap and HTML5.",
    color: "#ffffff",
    image: "https://junaid-portfolio-devvv.vercel.app/C7F29AA3-3C67-4A26-BB9F-DB10158FCD6C_1_201_a.jpeg",
    link: "https://junaid-vp.github.io/Portfolio-Project/"
  },
  {
    id: 5,
    title: "ClASSIC PORTFOLIO ",
    category: "Next.js",
    description: "This project is a modern personal portfolio website built using Next.js, TypeScript, Tailwind CSS, and HTML, with a strong focus on understanding Next.js routing, error handling, loading states, and page-level metadata.",
    color: "#ff8c00",
    image: "https://media.licdn.com/dms/image/v2/D5622AQEXGY70Zqwwqw/feedshare-shrink_800/B56ZtttxsNGwAg-/0/1767072276412?e=1770249600&v=beta&t=nxbIaK_Vz9BihIve-w-J9Z_wACcR1eP0uwyYIST1sDY",
    link: "https://lnkd.in/gJp38vXj"
  }
];

export default function Projects() {
  const targetRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Bridge: Horizontal wheel/trackpad swipes drive vertical scroll (which drives the horizontal animation)
  useEffect(() => {
    const section = targetRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      // Only intercept when horizontal scroll is dominant
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 5) {
        e.preventDefault();
        window.scrollBy({ top: e.deltaX, behavior: "auto" });
      }
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section id="projects" ref={targetRef} className="relative md:h-[300vh] min-h-screen bg-transparent">
      
      {/* MOBILE VIEW (Vertical Stack) */}
      <div className="flex flex-col gap-8 py-16 px-4 md:hidden">
            <div className="flex flex-col justify-center text-center mb-6">
                <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-tight">
                    SELECTED <br />
                    <span className="text-purple-500">WORKS</span>
                </h2>
                <p className="text-muted-foreground mt-4 text-base sm:text-lg">
                    A collection of projects showcasing<br/> React, Redux, and modern UI.
                </p>
            </div>
            
            {projects.map((project) => (
                <a 
                    key={project.id} 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-[250px] sm:h-[300px] w-full overflow-hidden rounded-xl bg-card shrink-0 border border-muted"
                >
                    <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        unoptimized
                        className="object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center justify-between mb-2">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-900/30 px-2 py-1 rounded-sm backdrop-blur-sm border border-purple-500/30">
                                 {project.category}
                             </span>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 uppercase leading-none tracking-tight">{project.title}</h3>
                        <p className="text-xs text-gray-300 line-clamp-2">{project.description}</p>
                    </div>
                </a>
            ))}
      </div>

      {/* DESKTOP VIEW (Horizontal Scroll) */}
      <div className="hidden md:sticky md:top-0 md:flex md:h-screen md:items-center md:overflow-hidden">
        <motion.div style={{ x }} className="flex gap-12 pl-24 items-center w-max">
            <div className="flex flex-col justify-center min-w-[300px] text-left">
                <h2 className="text-6xl font-black text-foreground leading-tight">
                    SELECTED <br />
                    <span className="text-purple-500">WORKS</span>
                </h2>
                <p className="text-muted-foreground mt-4 text-xl">
                    A collection of projects showcasing<br/> React, Redux, and modern UI.
                </p>
            </div>

          {projects.map((project) => (
            <a 
                key={project.id} 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-[350px] w-[500px] overflow-hidden rounded-xl bg-card shrink-0 border border-muted hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-50"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-900/30 px-3 py-1 rounded-sm backdrop-blur-sm border border-purple-500/30">
                        {project.category}
                    </span>
                 </div>
                 <h3 className="text-4xl font-black text-white mb-3 uppercase leading-none tracking-tight">{project.title}</h3>
                 <p className="text-sm text-gray-300 line-clamp-2 max-w-[90%] group-hover:text-white transition-colors">{project.description}</p>
                 
                 {project.link !== "#" && (
                    <div className="mt-6 flex items-center gap-2 text-white font-bold tracking-widest uppercase text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="border-b border-purple-500 pb-0.5">Explore Project</span> 
                        <span>→</span>
                    </div>
                 )}
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
