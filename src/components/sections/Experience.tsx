"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import TextReveal from "@/components/ui/TextReveal";

const TIMELINE_DATA = [
  {
    id: 1,
    role: "Frontend Developer Intern",
    org: "Bridgeon",
    period: "Present",
    desc: "Gaining hands-on experience in software development, contributing to real-world projects and building scalable applications.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTJ8WAJH9h3_f2VjFPs9v3OCqPKsDcJZ0ph0I7mjeTfhFasImB9qffJvu9yUmvKxb4tCk&usqp=CAU",
    type: "work"
  },
  {
    id: 2,
    role: "Bachelor of Computer Applications (BCA)",
    org: "Manipal University",
    period: "Pursuing",
    desc: "Pursuing degree in Computer Applications with focus on programming, software development, and web development.",
    logo: "https://i.pinimg.com/736x/38/be/19/38be19f681177a7ff4148de54df36e2c.jpg",
    type: "edu"
  },
  {
    id: 3,
    role: "Higher Secondary (Bio Science)",
    org: "CBHSS School",
    period: "Completed",
    desc: "Completed higher secondary education in Bio Science. Realized my passion for technology and programming during this time.",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUB0SSd8FNghofXV-QXCxel-UEbJa9jLnSgg&s",
    type: "edu"
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scrollHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="min-h-screen bg-transparent text-foreground py-12 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
            <TextReveal className="text-3xl sm:text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                MY JOURNEY
            </TextReveal>
        </div>

        <div className="relative max-w-5xl mx-auto">
            {/* Center Static Line */}
            <div className="absolute left-3 sm:left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-foreground/20" />
            
            {/* Animated Scroll Line */}
            <motion.div 
                style={{ height: scrollHeight }}
                className="absolute left-3 sm:left-4 md:left-1/2 top-0 w-[4px] -ml-[1px] bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] rounded-full z-0" 
            />

            {TIMELINE_DATA.map((item, index) => (
                <div 
                    key={item.id}
                    className={`relative flex items-center gap-4 sm:gap-8 mb-12 sm:mb-24 ${
                        index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                >
                    {/* Spacer for desktop alignment */}
                    <div className="hidden md:block w-1/2" />

                    {/* Node on Line */}
                    <div className="absolute left-3 sm:left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-4 border-purple-500 z-10 shadow-[0_0_10px_purple]">
                         <div className="absolute inset-0 bg-white animate-ping rounded-full opacity-20" />
                    </div>

                    {/* Content Card with 3D Tilt Effect */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                        className="flex-1 pl-10 sm:pl-12 md:pl-0 md:w-1/2 perspective-1000"
                    >
                       <div className={`p-4 sm:p-8 bg-card/40 backdrop-blur-md border border-muted/20 rounded-2xl hover:border-purple-500/50 transition-all duration-500 hover:bg-card/80 group hover:translate-x-2 ${
                           index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                       }`}>
                           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                               <div className="flex items-center gap-3 sm:gap-4">
                                   <div className="w-10 h-10 sm:w-14 sm:h-14 relative rounded-lg sm:rounded-xl overflow-hidden bg-foreground/5 p-1.5 sm:p-2 ring-1 ring-foreground/10 group-hover:ring-purple-500 transition-all">
                                       <Image 
                                        src={item.logo} 
                                        alt={item.org} 
                                        fill 
                                        className="object-contain"
                                       />
                                   </div>
                                   <div>
                                       <h3 className="text-base sm:text-2xl font-bold text-foreground group-hover:text-purple-400 transition-colors leading-tight">{item.role}</h3>
                                       <p className="text-muted-foreground font-mono text-xs sm:text-sm">{item.org}</p>
                                   </div>
                               </div>
                               <span className="w-fit px-3 py-1 bg-foreground/5 rounded-full text-[10px] sm:text-xs font-mono text-purple-300 border border-purple-500/20 whitespace-nowrap">
                                   {item.period}
                               </span>
                           </div>
                           <p className="text-xs sm:text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors break-words">{item.desc}</p>
                       </div>
                    </motion.div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
