"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { 
  Github, 
  Code, 
  Terminal, 
  Cpu, 
  Activity as ActivityIcon, 
  ExternalLink, 
  Zap, 
  Database, 
  Layers 
} from "lucide-react";

interface LeetCodeData {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  acceptanceRate: number;
}

const StatNode = ({ label, value, sub, color }: { label: string, value: string | number, sub?: string, color: string }) => (
  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-md relative group">
    <div className={`absolute top-0 left-0 w-1 h-full ${color} rounded-l-full opacity-50 group-hover:opacity-100 transition-opacity`} />
    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] block mb-1">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-black text-white tracking-widest leading-none">{value}</span>
      {sub && <span className="text-[10px] font-mono text-white/20 uppercase">{sub}</span>}
    </div>
  </div>
);

const CircularProgress = ({ size = 120, strokeWidth = 8, percentage = 0, color = "#9333ea" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "circOut" }}
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-black text-white">{Math.round(percentage)}%</span>
        <span className="text-[8px] font-mono text-white/40 uppercase">ACC_RATE</span>
      </div>
    </div>
  );
};

export default function Activity() {
  const containerRef = useRef(null);
  const [lcData, setLcData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'visual' | 'terminal'>('visual');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  useEffect(() => {
    fetch("https://leetcode-stats-api.herokuapp.com/Mohammed-Junaid")
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") setLcData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="activity" ref={containerRef} className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header: More "Massive" typography */}
        <motion.div style={{ opacity, scale }} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 mb-4 backdrop-blur-md">
            <Zap className="w-3 h-3 text-purple-500 fill-purple-500" />
            <span className="text-[10px] font-mono text-purple-400 tracking-[0.3em] font-bold uppercase">System_State: Overdriven</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tightest uppercase italic">
            ENGINE <span className="text-transparent bg-clip-text bg-gradient-to-t from-zinc-600 to-white">MASTERY</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Dashboard Frame */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Left Column: LeetCode HUD */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <div className="p-8 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] backdrop-blur-2xl relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                  <Code className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-white uppercase tracking-tight">LeetCode Sync</h3>
                   <p className="text-[10px] font-mono text-white/30 uppercase">Node: ASIA_001</p>
                </div>
              </div>

              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <ActivityIcon className="w-8 h-8 text-white/10 animate-pulse" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-center py-6">
                    <CircularProgress percentage={lcData?.acceptanceRate ?? 0} color="#f97316" size={140} strokeWidth={10} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <StatNode label="EASY" value={lcData?.easySolved ?? 0} sub={`/ ${lcData?.totalEasy}`} color="bg-emerald-500" />
                    <StatNode label="MEDIUM" value={lcData?.mediumSolved ?? 0} sub={`/ ${lcData?.totalMedium}`} color="bg-orange-500" />
                    <StatNode label="HARD" value={lcData?.hardSolved ?? 0} sub={`/ ${lcData?.totalHard}`} color="bg-rose-500" />
                    <StatNode label="RANK" value={`#${(lcData?.ranking ?? 0 / 1000).toFixed(1)}k`} color="bg-purple-500" />
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-40">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                   <span className="text-[10px] font-mono uppercase">DATA_STREAM: SECURE</span>
                </div>
                <Terminal className="w-4 h-4" />
              </div>
            </div>

            {/* Micro Hardware Stats */}
            <div className="grid grid-cols-2 gap-6">
               <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col items-center justify-center hover:bg-purple-500/5 transition-colors">
                  <Cpu className="w-5 h-5 text-purple-500 mb-2" />
                  <span className="text-[8px] font-mono text-white/30 uppercase block">Processing</span>
                  <span className="text-sm font-bold text-white">4.2 GHz</span>
               </div>
               <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col items-center justify-center hover:bg-cyan-500/5 transition-colors">
                  <Layers className="w-5 h-5 text-cyan-500 mb-2" />
                  <span className="text-[8px] font-mono text-white/30 uppercase block">Efficiency</span>
                  <span className="text-sm font-bold text-white">99.4%</span>
               </div>
            </div>
          </motion.div>

          {/* Right Column: GitHub Mission Control */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-8 p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem] shadow-3xl"
          >
            <div className="h-full bg-zinc-900/90 rounded-[2.9rem] p-8 md:p-12 relative overflow-hidden flex flex-col">
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(168,85,247,0.02)_50%,transparent_100%)] bg-[size:100%_4px] pointer-events-none" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-purple-500/50 blur-sm" />
                    <Github className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Contribution_Link</h3>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] font-mono bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded border border-purple-500/30 font-bold uppercase tracking-widest">Master_Branch</span>
                      <span className="text-[10px] font-mono bg-white/5 text-white/40 px-2 py-0.5 rounded border border-white/10 font-bold uppercase tracking-widest">Auto_Sync: ON</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-white/30 uppercase block">Consistency Rating</span>
                    <span className="text-xl font-bold text-white uppercase tracking-widest">LEGENDARY</span>
                  </div>
                  <div className="w-[2px] h-10 bg-white/10" />
                  <div className="flex flex-col justify-center">
                    <div className="flex gap-1.5">
                      {[1, 2, 3].map(i => <div key={i} className="w-3 h-3 rounded-sm bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />)}
                      {[1, 2].map(i => <div key={i} className="w-3 h-3 rounded-sm bg-white/10" />)}
                    </div>
                  </div>
                </div>
              </div>

              {/* GitHub Visualization: Frame it like a screen */}
              <div className="flex-1 bg-black/40 rounded-[2rem] p-8 border border-white/5 relative group/screen shadow-inner">
                 <div className="absolute top-4 left-6 flex gap-1.5 opacity-30">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                 </div>
                 
                 <div className="w-full overflow-x-auto py-6 scrollbar-hide grayscale-[0.5] hover:grayscale-0 transition-all duration-700">
                    <div className="min-w-[800px] flex justify-center">
                      <GitHubCalendar 
                        username="Junaid-vp"
                        blockSize={13}
                        blockMargin={6}
                        fontSize={13}
                        theme={{
                          light: ['#111827', '#2e1065', '#4c1d95', '#7e22ce', '#a855f7'],
                          dark: ['#111827', '#2e1065', '#4c1d95', '#7e22ce', '#a855f7'],
                        }}
                      />
                    </div>
                 </div>

                 {/* Simulated Console Logs at bottom */}
                 <div className="mt-8 font-mono text-[9px] text-purple-400/40 line-clamp-2 md:line-clamp-3">
                    {`> INITIALIZING DATA_SYNC... [DONE]\n> FETCHING REPOSITORY_METRICS... [SUCCESS]\n> ANALYZING COMMIT_DENSITY... [OPTIMAL]\n> SESSION AUTHORIZED FOR: MOHAMMED_JUNAID`}
                 </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 justify-between items-center relative z-10">
                 <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/30 uppercase mb-1">Total_Repos</span>
                        <span className="text-xl font-black text-white">124_LOCKED</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/30 uppercase mb-1">Global_Ranking</span>
                        <span className="text-xl font-black text-white">PLATINUM_IV</span>
                    </div>
                 </div>
                 
                 <a 
                  href="https://github.com/Junaid-vp" target="_blank"
                  className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-purple-500 hover:text-white transition-all transform active:scale-95 shadow-xl"
                 >
                    Access_Repository
                 </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Icons for Depth */}
        <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-40 right-10 opacity-10 pointer-events-none hidden xl:block"
        >
            <Database className="w-24 h-24 text-white" />
        </motion.div>
        <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-40 left-10 opacity-10 pointer-events-none hidden xl:block"
        >
            <ActivityIcon className="w-32 h-32 text-purple-500" />
        </motion.div>

      </div>
    </section>
  );
}
