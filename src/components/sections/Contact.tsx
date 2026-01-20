"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Instagram, Code, ExternalLink } from "lucide-react";

const SOCIALS = [
  { name: "LinkedIn", icon: Linkedin, link: "https://www.linkedin.com/in/mohammed-junaid-vp/", color: "hover:text-blue-500" },
  { name: "GitHub", icon: Github, link: "https://github.com/Junaid-vp", color: "hover:text-white" },
  { name: "Instagram", icon: Instagram, link: "https://www.instagram.com/juxa1d?igsh=ZDZyanJwaHY0OTNn&utm_source=qr", color: "hover:text-pink-500" },
  { name: "WhatsApp", icon: Phone, link: "https://api.whatsapp.com/send/?phone=7736355958&text&type=phone_number&app_absent=0", color: "hover:text-green-500" },
  { name: "LeetCode", icon: Code, link: "https://leetcode.com/u/Mohammed-Junaid/", color: "hover:text-orange-500" },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-transparent text-foreground py-12 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(112,0,223,0.1)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16">
            
            {/* Info Side */}
            <div className="md:w-1/2 space-y-6 md:space-y-12">
                <motion.h2 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-2xl sm:text-4xl font-black uppercase"
                >
                    Let's <br /> <span className="text-purple-500">Connect</span>.
                </motion.h2>
                
                <p className="text-sm sm:text-xl text-muted-foreground">
                    I'm currently available for freelance projects and full-time opportunities.  
                    If you have a project that needs some creative touch, let's talk.
                </p>

                <div className="space-y-4 sm:space-y-6">
                    <a href="mailto:mohammed.junaid.software@gmail.com" className="flex items-center gap-3 md:gap-4 text-xs sm:text-lg md:text-xl hover:text-purple-400 transition-colors group break-all sm:break-normal">
                        <div className="p-2.5 sm:p-4 rounded-full bg-card border border-muted shrink-0">
                            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        mohammed.junaid.software@gmail.com
                    </a>
                    <div className="flex items-center gap-3 md:gap-4 text-sm sm:text-xl text-muted-foreground">
                        <div className="p-2.5 sm:p-4 rounded-full bg-card border border-muted shrink-0">
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        +91 7736355958
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 text-sm sm:text-xl text-muted-foreground">
                        <div className="p-2.5 sm:p-4 rounded-full bg-card border border-muted shrink-0">
                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        Malappuram, Kerala, India
                    </div>
                </div>

                <div className="pt-4 sm:pt-8">
                    <h3 className="text-[10px] sm:text-sm font-bold text-muted-foreground tracking-widest mb-4 sm:mb-6">FOLLOW ME</h3>
                    <div className="flex gap-3 sm:gap-6 flex-wrap">
                        {SOCIALS.map((social) => (
                            <a 
                                key={social.name} 
                                href={social.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`p-2.5 sm:p-3 bg-card rounded-full transition-all duration-300 hover:scale-110 ${social.color}`}
                            >
                                <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="md:w-1/2"
            >
                <div className="bg-card/50 p-4 sm:p-6 rounded-2xl border border-muted backdrop-blur-sm shadow-xl w-full h-fit border-white/10">
                    <form 
                        action="https://formspree.io/f/xaqyyrkd" 
                        method="POST"
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-[10px] sm:text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Name</label>
                            <input 
                                type="text" 
                                name="name"
                                required
                                className="w-full bg-background/50 border border-muted rounded-md p-2 sm:p-2.5 text-xs sm:text-sm focus:border-purple-500 focus:outline-none transition-colors" 
                                placeholder="Your Name" 
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] sm:text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                required
                                className="w-full bg-background/50 border border-muted rounded-md p-2 sm:p-2.5 text-xs sm:text-sm focus:border-purple-500 focus:outline-none transition-colors" 
                                placeholder="your@email.com" 
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] sm:text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Message</label>
                            <textarea 
                                name="message"
                                required
                                rows={4} 
                                className="w-full bg-background/50 border border-muted rounded-md p-2 sm:p-2.5 text-xs sm:text-sm focus:border-purple-500 focus:outline-none transition-colors resize-none" 
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>
                        <button 
                            type="submit"
                            className="w-full py-2.5 sm:py-3 bg-foreground text-background font-bold rounded-md hover:bg-purple-500 hover:text-white transition-all duration-300 text-[10px] sm:text-xs tracking-widest uppercase mt-2"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
}
