"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "E-COMMERCE APP",
    category: "Full Stack React",
    description: "A Modern Full-Stack E-Commerce Platform Built with React, Node.js, Express, and MongoDB",
    color: "#7000df",
    image: "/Project/1770225374529.jpeg",
    link: "https://feather-mound.vercel.app/"
  },
  {
    id: 2,
    title: "NEO CALC",
    category: "React Application",
    description: "Advanced calculator with memory functions and theme switching, built with React & Tailwind.",
    color: "#00bac5",
    image: "/Project/Image 10-12-25 at 7.26 PM.jpeg",
    link: "https://neocalc-calculator.vercel.app/"
  },
  {
    id: 3,
    title: "MAKEMYTRIP CLONE",
    category: "UI Engineering",
    description: "Pixel-perfect clone of the travel booking interface using advanced CSS and responsive design patterns.",
    color: "#ff0080",
    image: "/Project/Screenshot 2025-09-19 at 7.00.42 PM.png",
    link: "#"
  },
  {
    id: 4,
    title: "LEGACY PORTFOLIO",
    category: "Web Design",
    description: "My previous personal website showcasing early frontend skills with Bootstrap and HTML5.",
    color: "#ffffff",
    image: "/Project/C7F29AA3-3C67-4A26-BB9F-DB10158FCD6C_1_105_c.jpeg",
    link: "https://junaid-vp.github.io/Portfolio-Project/"
  },
  {
    id: 5,
    title: "ClASSIC PORTFOLIO ",
    category: "Next.js",
    description: "This project is a modern personal portfolio website built using Next.js, TypeScript, Tailwind CSS, and HTML, with a strong focus on understanding Next.js routing, error handling, loading states, and page-level metadata.",
    color: "#ff8c00",
    image: "/Project/1767072276553.jpeg",
    link: "https://junaid-portfolio-devvv.vercel.app/"
  }
];

export default function Projects() {
  const targetRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const x = useTransform(smoothProgress, [0, 1], ["1%", "-95%"]);

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
            
            {projects.map((project) => {
                const isLink = project.link && project.link !== "#";
                const CardWrapper = isLink ? 'a' : 'div';
                
                return (
                    <CardWrapper 
                        key={project.id} 
                        {...(isLink ? {
                            href: project.link,
                            target: "_blank",
                            rel: "noopener noreferrer"
                        } : {})}
                        className={`group relative h-[250px] sm:h-[300px] w-full overflow-hidden rounded-xl bg-card shrink-0 border border-muted ${isLink ? 'cursor-pointer' : 'cursor-default'}`}
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
                    </CardWrapper>
                );
            })}
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

          {projects.map((project) => {
            const isLink = project.link && project.link !== "#";
            const CardWrapper = isLink ? 'a' : 'div';

            return (
                <CardWrapper 
                    key={project.id} 
                    {...(isLink ? {
                        href: project.link,
                        target: "_blank",
                        rel: "noopener noreferrer"
                    } : {})}
                    className={`group relative h-[350px] w-[500px] overflow-hidden rounded-xl bg-card shrink-0 border border-muted transition-all duration-300 ${isLink ? 'hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer' : 'cursor-default'}`}
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
                     
                     {isLink && (
                        <div className="mt-6 flex items-center gap-2 text-white font-bold tracking-widest uppercase text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="border-b border-purple-500 pb-0.5">Explore Project</span> 
                            <span>→</span>
                        </div>
                     )}
                  </div>
                </CardWrapper>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
