"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TextReveal from "@/components/ui/TextReveal";

const IMAGES = [
  "https://media.licdn.com/dms/image/v2/D5622AQF4xCW0HMsPIA/feedshare-shrink_800/B56Zs0yjOAG4Ag-/0/1766117233328?e=1770249600&v=beta&t=-mj1GiDyt5hDtxUS_P6LrfOYSj_AkvOw2VzQPR84P0A",
  "https://media.licdn.com/dms/image/v2/D5622AQE3t53QYPodww/feedshare-shrink_800/B56ZsRJla7G4Ag-/0/1765519287761?e=1770249600&v=beta&t=U_oduD_iOyx96PGjXaqeIs5UMLksJyH8oH4HIdx-Npc",
  "https://media.licdn.com/dms/image/v2/D5622AQGeiyMkXY2tyA/feedshare-shrink_800/B56ZrtfQuYLoAg-/0/1764920990272?e=1770249600&v=beta&t=SyKfJou03kxV2vvH5Ao01XI-HQp88dKeiU1skHdMOzc",
  "https://media.licdn.com/dms/image/v2/D4E22AQGtDQC58xyQbg/feedshare-shrink_800/B4EZp3TftRKkAg-/0/1762938200214?e=1770249600&v=beta&t=GBWM5n9EcwWpoyfAZScOrDclIex8XKzxLWo605-iyuk",
  "https://media.licdn.com/dms/image/v2/D4E22AQHAX1M9JKXOAA/feedshare-shrink_800/B4EZmTtJydIIAg-/0/1759119718202?e=1770249600&v=beta&t=Vx1Xa0c41n2c52TNcmpJqmLT-Cachh2EN0Z9QxLDCF8",
  "https://media.licdn.com/dms/image/v2/D4E22AQEALyOvYpUo7w/feedshare-shrink_800/B4EZloMQmhHgAg-/0/1758389673959?e=1770249600&v=beta&t=Jdiz1v4Dy9bhAotdCGNnV3Fuw-AyetufcNS83C8Ie64"
];

export default function About() {
  return (
    <section id="about" className="min-h-screen bg-transparent text-foreground py-12 md:py-20">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            {/* Text Content */}
            <div className="md:w-1/2 space-y-6 md:space-y-8">
                <div className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight">
                    <TextReveal className="block" delay={0.1}>CODE.</TextReveal>
                    <TextReveal className="block" delay={0.3}>CREATE.</TextReveal>
                    <TextReveal className="block text-purple-500" delay={0.5}>EVOLVE.</TextReveal>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground"
                >
                    <p>
                        I'm <span className="text-foreground font-bold">Junaid</span>, a passionate Software Engineer based in Kerala, India. 
                        My journey started in Bio Science, but my curiosity for technology led me to the world of web development.
                    </p>
                    <p>
                        I specialize in the <span className="text-foreground">MERN Stack</span> (MongoDB, Express, React, Node.js) and ecosystem tools like Next.js, Redux, and Tailwind CSS.
                        My goal is to build scalable, user-friendly applications that solve real-world problems.
                    </p>
                    
                    <div className="p-4 md:p-6 bg-card/50 border border-muted rounded-2xl">
                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">MY PHILOSOPHY</h3>
                        <p className="italic text-sm md:text-base">
                            "I enjoy learning new technologies, improving my problem-solving skills, and writing clean, maintainable code."
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Walking/Working Grid */}
            <div className="md:w-1/2 grid grid-cols-2 gap-3 md:gap-4">
                {IMAGES.map((src, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className={`relative rounded-xl md:rounded-2xl overflow-hidden ${idx % 2 === 0 ? "md:translate-y-8" : "md:-translate-y-8"}`}
                    >
                        <Image 
                            src={src} 
                            alt={`Junaid photo ${idx + 1}`}
                            width={400} 
                            height={600} 
                            className="object-cover w-full h-[180px] md:h-[300px] hover:scale-110 transition-transform duration-500"
                        />
                    </motion.div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}
