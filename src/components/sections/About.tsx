"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TextReveal from "@/components/ui/TextReveal";
import TechCard from "@/components/ui/TechCard";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const IMAGES = [
  "https://media.licdn.com/dms/image/v2/D4E22AQEALyOvYpUo7w/feedshare-shrink_1280/B4EZloMQmhHgAs-/0/1758389674825?e=1772668800&v=beta&t=jn2j26i8S6v9UR_lnERS3G-qMOlDZRECm359QCcrHbU",
  "https://media.licdn.com/dms/image/v2/D4E22AQHAX1M9JKXOAA/feedshare-shrink_1280/B4EZmTtJydIIAs-/0/1759119717782?e=1772668800&v=beta&t=pA9K3ZlSYieFSVD2-_9cL3fAxW_ov0xZ7z4isoZcCXc",
  "https://media.licdn.com/dms/image/v2/D4E22AQFVbUuDO9qxfQ/feedshare-shrink_800/B4EZpfAEcEJgAk-/0/1762530453578?e=1772668800&v=beta&t=QwRSw4YtMakiJSGvSv1VjBxWekdaZS0Arw1pcvmn_-o",
  "https://media.licdn.com/dms/image/v2/D4E22AQGtDQC58xyQbg/feedshare-shrink_1280/B4EZp3TftRKkAs-/0/1762938201128?e=1772668800&v=beta&t=_e-OUiF9RJSk4gjLTSP1xLEItshLXu60Vd1teGakvjM",
  "https://media.licdn.com/dms/image/v2/D5622AQGeiyMkXY2tyA/feedshare-shrink_1280/B56ZrtfQuYLoAs-/0/1764920991471?e=1772668800&v=beta&t=gMeLdTkKWzZ9uKNBKD2WOn8Q_IwwbWUtxBjnenR-5yc",
  "https://media.licdn.com/dms/image/v2/D5622AQF4xCW0HMsPIA/feedshare-shrink_800/B56Zs0yjOAG4Ag-/0/1766117233328?e=1772668800&v=beta&t=JQDYEc79FKFfgc3J1aW-_NCZGNNXz-lNwuPvy6op25w"
];

const LABELS = ["IMG_01", "IMG_02", "IMG_03", "IMG_04", "IMG_05", "IMG_06"];

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="about" ref={containerRef} className="min-h-screen bg-transparent text-foreground py-12 md:py-20">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            {/* Text Content */}
            <motion.div style={{ y: y1 }} className="md:w-1/2 space-y-6 md:space-y-8">
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
            </motion.div>

            {/* Walking/Working Grid */}
            <motion.div style={{ y: y2 }} className="md:w-1/2 grid grid-cols-2 gap-3 md:gap-4 lg:gap-8">
                {IMAGES.map((src, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className={`relative ${idx % 2 === 0 ? "md:translate-y-8" : "md:-translate-y-8"}`}
                    >
                        <TechCard 
                            label={LABELS[idx]}
                        >
                            <Image 
                                src={src} 
                                alt={`Junaid photo ${idx + 1}`}
                                width={400} 
                                height={600} 
                                className="object-cover w-full h-[180px] md:h-[300px]"
                            />
                        </TechCard>
                    </motion.div>
                ))}
            </motion.div>
        </div>

      </div>
    </section>
  );
}
