"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { Code, Flame, Award, GitBranch, Github } from "lucide-react";

const LEETCODE_STATS = [
  { label: "Total Solved", value: "247", total: "3300", color: "text-white" },
  { label: "Easy", value: "142", total: "840", color: "text-emerald-400" },
  { label: "Medium", value: "89", total: "1720", color: "text-orange-400" },
  { label: "Hard", value: "16", total: "740", color: "text-rose-500" },
];

export default function Activity() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="activity" ref={containerRef} className="py-20 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <motion.div 
            style={{ opacity }}
            className="flex flex-col items-center mb-16 text-center"
        >
            <span className="text-purple-500 font-mono text-xs tracking-widest mb-2 uppercase">[ System_Logs_V.4.0 ]</span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
                Coding <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Activity</span>
            </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* GitHub Card - Spans 8 cols */}
            <motion.div 
                style={{ y: y1 }}
                className="lg:col-span-8 p-6 md:p-8 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl relative group overflow-hidden"
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-zinc-800 rounded-lg">
                            <Github className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight">GitHub Pulse</h3>
                            <p className="text-[10px] font-mono text-white/30 truncate">USR: Junaid-vp // SYS: ACTIVE</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-mono text-white/40">
                        <div className="flex items-center gap-1.5">
                            <GitBranch className="w-3 h-3" />
                            <span>124_REPOS</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Flame className="w-3 h-3 text-orange-500" />
                            <span>CONTRIBS_365D</span>
                        </div>
                    </div>
                </div>

                {/* GitHub Heatmap Implementation */}
                <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
                    <div className="min-w-[800px] flex justify-center">
                        <GitHubCalendar 
                            username="Junaid-vp"
                            blockSize={12}
                            blockMargin={4}
                            fontSize={12}
                            theme={{
                                light: ['#18181b', '#3b0764', '#581c87', '#7e22ce', '#a855f7'],
                                dark: ['#18181b', '#3b0764', '#581c87', '#7e22ce', '#a855f7'],
                            }}
                        />
                    </div>
                </div>

                {/* Decorative Tech Overlay */}
                <div className="absolute bottom-4 right-6 text-[8px] font-mono text-white/10 uppercase tracking-[0.5em] pointer-events-none">
                    Protocol_Sync_Stable
                </div>
            </motion.div>

            {/* LeetCode Card - Spans 4 cols */}
            <motion.div 
                style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 80]) }}
                className="lg:col-span-4 space-y-6"
            >
                <div className="p-6 md:p-8 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl relative group overflow-hidden shadow-2xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                            <Code className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight">LeetCode Mastery</h3>
                            <p className="text-[10px] font-mono text-white/30">USR: Mohammed-Junaid</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {LEETCODE_STATS.map((stat, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{stat.label}</span>
                                    <span className={`text-lg font-black ${stat.color}`}>{stat.value}<span className="text-[10px] text-white/20 font-medium ml-1">/ {stat.total}</span></span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${(parseInt(stat.value) / parseInt(stat.total)) * 100}%` }}
                                        transition={{ duration: 1.5, ease: "circOut" }}
                                        className={`h-full ${stat.label === 'Total Solved' ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : 
                                            stat.label === 'Easy' ? 'bg-emerald-500' :
                                            stat.label === 'Medium' ? 'bg-orange-500' : 'bg-rose-500'}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono text-white/30 uppercase">Global Rank</span>
                            <span className="text-sm font-bold text-white tracking-widest">TOP 12.4%</span>
                        </div>
                        <div className="p-2 border border-white/10 rounded-full">
                            <Award className="w-4 h-4 text-purple-400" />
                        </div>
                    </div>
                </div>

                {/* Tech Status Card */}
                <div className="p-4 bg-zinc-950/50 border border-white/5 rounded-2xl flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="text-[10px] font-mono text-emerald-500 tracking-widest uppercase">Streaming Real-time Analytics</span>
                </div>
            </motion.div>

        </div>

        {/* Global Stats Footer */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Consistency', 'Problem_Solving', 'Architecture', 'UI_Precision'].map((text, i) => (
                <div key={i} className="py-3 px-4 bg-white/5 border border-white/5 rounded-xl text-center">
                    <span className="text-[8px] md:text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">{text}</span>
                </div>
            ))}
        </div>

      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
