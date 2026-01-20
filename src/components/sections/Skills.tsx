"use client";

import DecryptedText from "@/components/ui/DecryptedText";
import SkillSphere from "@/components/canvas/SkillSphere";


const SKILLS_LIST = [
  "HTML", "JavaScript", "React", "Redux", "TypeScript", "Next.js", 
  "Tailwind CSS", "Bootstrap", "Node.js", "Express.js", "MongoDB", 
  "Git", "Postman", "Axios"
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen flex flex-col items-center justify-center bg-transparent text-foreground py-8 md:py-20 overflow-hidden relative">
      <div className="container mx-auto px-4 flex flex-col items-center flex-grow justify-center">
        <div className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-10 text-center text-foreground relative z-30">
             <DecryptedText 
                text="TECH ARSENAL" 
                className="font-black"
                delay={0.10} 
             />
        </div>
        <div className="w-full h-[350px] sm:h-[450px] md:h-[500px] relative z-10">
            <SkillSphere />
        </div>
        <p className="text-[10px] sm:text-sm md:text-base text-black dark:text-zinc-400 mt-2 sm:mt-4 text-center font-medium relative z-20">Drag to rotate • Hover to explore</p>
      </div>

      {/* Skills Footer Marquee */}
      <div className="w-full relative z-30 mt-4 md:mt-10 border-t border-white/10 bg-black/20 backdrop-blur-sm py-3 md:py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
            {[...SKILLS_LIST, ...SKILLS_LIST].map((skill, i) => (
                <span key={i} className="text-xs sm:text-xl md:text-3xl font-bold text-white/50 mx-3 md:mx-8 uppercase tracking-widest hover:text-white transition-colors cursor-default">
                    {skill}
                </span>
            ))}
            {[...SKILLS_LIST, ...SKILLS_LIST].map((skill, i) => (
                <span key={`dup-${i}`} className="text-xs sm:text-xl md:text-3xl font-bold text-white/50 mx-3 md:mx-8 uppercase tracking-widest hover:text-white transition-colors cursor-default">
                    {skill}
                </span>
            ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
