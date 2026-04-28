"use client";

import DecryptedText from "@/components/ui/DecryptedText";
import SkillSphere from "@/components/canvas/SkillSphere";
import LogoLoop from "@/components/ui/LogoLoop";

const SKILLS_DATA = [
  { src: "https://cdn.simpleicons.org/html5/E34F26", title: "HTML5" },
  { src: "https://cdn.simpleicons.org/javascript/F7DF1E", title: "JavaScript" },
  { src: "https://cdn.simpleicons.org/react/61DAFB", title: "React" },
  { src: "https://cdn.simpleicons.org/nextdotjs/white", title: "Next.js" },
  { src: "https://cdn.simpleicons.org/typescript/3178C6", title: "TypeScript" },
  { src: "https://cdn.simpleicons.org/tailwindcss/06B6D4", title: "Tailwind CSS" },
  { src: "https://cdn.simpleicons.org/redux/764ABC", title: "Redux" },
  { src: "https://cdn.simpleicons.org/nodedotjs/339933", title: "Node.js" },
  { src: "https://cdn.simpleicons.org/express/white", title: "Express.js" },
  { src: "https://cdn.simpleicons.org/mongodb/47A248", title: "MongoDB" },
  { src: "https://cdn.simpleicons.org/postgresql/4169E1", title: "PostgreSQL" },
  { src: "https://cdn.simpleicons.org/prisma/white", title: "Prisma" },
  { src: "https://cdn.simpleicons.org/redis/DC382D", title: "Redis" },
  { src: "https://cdn.simpleicons.org/rabbitmq/FF6600", title: "RabbitMQ" },
  { src: "https://cdn.simpleicons.org/socketdotio/white", title: "Socket.io" },
  { src: "https://cdn.simpleicons.org/webrtc/333333", title: "WebRTC" },
  { src: "https://cdn.simpleicons.org/docker/2496ED", title: "Docker" },
  { src: "https://cdn.worldvectorlogo.com/logos/aws-2.svg", title: "AWS" },
  { src: "https://cdn.simpleicons.org/nginx/009639", title: "Nginx" },
  { src: "https://cdn.simpleicons.org/githubactions/2088FF", title: "GitHub Actions" },
  { src: "https://cdn.simpleicons.org/stripe/635BFF", title: "Stripe" },
  { src: "https://cdn.simpleicons.org/git/F05032", title: "Git" },
  { src: "https://cdn.simpleicons.org/postman/FF6C37", title: "Postman" },
  { src: "https://cdn.simpleicons.org/mongoose/880000", title: "Mongoose" },
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen flex flex-col items-center justify-center bg-transparent text-foreground py-8 md:py-20 overflow-hidden relative">
      <div className="container mx-auto px-4 flex flex-col items-center flex-grow justify-center mt-12 md:mt-20">
        <div className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-10 text-center text-foreground relative z-30">
             <DecryptedText 
                text="TECH ARSENAL" 
                className="font-black"
                delay={0.10} 
             />
        </div>
        <SkillSphere />
        <p className="text-[10px] sm:text-sm md:text-base text-zinc-400 mt-0 sm:mt-4 text-center font-medium relative z-20">Drag to rotate • Hover to explore</p>
      </div>

      {/* Optimized Logo Loop */}
      <div className="w-full relative z-30 mt-8 md:mt-16">
        <LogoLoop 
            logos={SKILLS_DATA}
            speed={50}
            logoHeight={40}
            gap={100}
        />
      </div>
    </section>
  );
}
