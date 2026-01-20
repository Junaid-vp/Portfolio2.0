"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { Code, Flame, Award, GitBranch, Github, ExternalLink, Terminal, Activity as ActivityIcon } from "lucide-react";

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
  contributionPoints: number;
  reputation: number;
}

export default function Activity() {
  const containerRef = useRef(null);
  const [lcData, setLcData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'github' | 'leetcode'>('github');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    fetch("https://leetcode-stats-api.herokuapp.com/Mohammed-Junaid")
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setLcData(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = lcData ? [
    { label: "Total Solved", value: lcData.totalSolved, total: lcData.totalQuestions, color: "text-white", barColor: "bg-gradient-to-r from-purple-500 to-cyan-500" },
    { label: "Easy", value: lcData.easySolved, total: lcData.totalEasy, color: "text-emerald-400", barColor: "bg-emerald-500" },
    { label: "Medium", value: lcData.mediumSolved, total: lcData.totalMedium, color: "text-orange-400", barColor: "bg-orange-500" },
    { label: "Hard", value: lcData.hardSolved, total: lcData.totalHard, color: "text-rose-500", barColor: "bg-rose-500" },
  ] : [];

  return (
    <section id="activity" ref={containerRef} className="py-12 md:py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <motion.div 
            style={{ opacity }}
            className="flex flex-col items-center mb-12 text-center"
        >
            <div className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <ActivityIcon className="w-3.5 h-3.5 text-purple-500" />
                <span className="text-[10px] font-mono text-white/60 tracking-[0.2em] uppercase">Engine_Analytics_V2.0</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
                CODING <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">PULSE</span>
            </h2>
        </motion.div>

        {/* Console-style Toggle */}
        <div className="max-w-4xl mx-auto mb-12 flex justify-center">
            <div className="inline-flex p-1 bg-zinc-900/80 rounded-xl border border-white/5 backdrop-blur-md">
                <button 
                    onClick={() => setActiveTab('github')}
                    className={`px-6 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${activeTab === 'github' ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'text-white/40 hover:text-white'}`}
                >
                    <Github className="w-3.5 h-3.5" />
                    GITHUB_COMMITS
                </button>
                <button 
                    onClick={() => setActiveTab('leetcode')}
                    className={`px-6 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${activeTab === 'leetcode' ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'text-white/40 hover:text-white'}`}
                >
                    <Code className="w-3.5 h-3.5" />
                    LEETCODE_LOGS
                </button>
            </div>
        </div>

        <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
                {activeTab === 'github' ? (
                    <motion.div 
                        key="github"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative"
                    >
                        {/* GitHub Terminal Card */}
                        <div className="p-1 bg-zinc-800/20 rounded-[2rem] border border-white/5 shadow-2xl backdrop-blur-xl overflow-hidden group">
                           <div className="bg-zinc-900/60 rounded-[1.8rem] p-6 md:p-10 border border-white/5">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center p-3 relative overflow-hidden">
                                            <Github className="w-full h-full text-white relative z-10" />
                                            <motion.div 
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" 
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                                                GitHub Workspace
                                                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-purple-500 transition-colors cursor-pointer" />
                                            </h3>
                                            <div className="flex items-center gap-3 mt-1 text-[10px] font-mono">
                                                <span className="text-emerald-500">● SYSTEM_ONLINE</span>
                                                <span className="text-white/20">|</span>
                                                <span className="text-white/40">BRANCH: main</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                            <span className="text-[10px] font-mono text-white/30 block mb-1">REPOSITORIES</span>
                                            <span className="text-xl font-black text-white tracking-widest leading-none">124+</span>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                            <span className="text-[10px] font-mono text-white/30 block mb-1">CONTRIBUTIONS</span>
                                            <span className="text-xl font-black text-purple-400 tracking-widest leading-none">ACTIVE</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Heatmap with better background */}
                                <div className="bg-black/40 rounded-2xl p-6 md:p-8 border border-white/5 relative overflow-hidden group/heatmap">
                                     <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                                     <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
                                        <div className="min-w-[800px] flex justify-center pointer-events-none sm:pointer-events-auto">
                                            <GitHubCalendar 
                                                username="Junaid-vp"
                                                blockSize={13}
                                                blockMargin={5}
                                                fontSize={13}
                                                theme={{
                                                    light: ['#18181b', '#3b0764', '#581c87', '#7e22ce', '#a855f7'],
                                                    dark: ['#18181b', '#3b0764', '#581c87', '#7e22ce', '#a855f7'],
                                                }}
                                                loading={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-6 text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                                        <span>[ COMMIT_HISTORY_YEAR_2024_2025 ]</span>
                                        <div className="flex items-center gap-2">
                                            <Terminal className="w-3 h-3" />
                                            <span>X-LOG: STABLE</span>
                                        </div>
                                    </div>
                                </div>
                           </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="leetcode"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {/* LeetCode Main Stats */}
                        <div className="md:col-span-2 p-1 bg-zinc-800/20 rounded-[2rem] border border-white/5 shadow-2xl backdrop-blur-xl overflow-hidden">
                            <div className="bg-zinc-900/60 rounded-[1.8rem] p-8 md:p-10 border border-white/5 h-full">
                                <div className="flex items-center gap-5 mb-12">
                                    <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center p-3">
                                        <Code className="w-full h-full text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">LeetCode Analytics</h3>
                                        <p className="text-[10px] font-mono text-white/30">IDENTITY: Mohammed-Junaid // STATUS: PRO_ACTIVE</p>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {loading ? (
                                        <div className="h-48 flex items-center justify-center">
                                            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    ) : stats.length > 0 ? (
                                        stats.map((stat, idx) => (
                                            <div key={idx} className="space-y-3">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{stat.label}</span>
                                                    <div className="text-right">
                                                        <span className={`text-2xl font-black ${stat.color} tracking-tighter`}>{stat.value}</span>
                                                        <span className="text-[12px] text-white/20 font-medium ml-2 tracking-widest">/ {stat.total}</span>
                                                    </div>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${(stat.value / stat.total) * 100}%` }}
                                                        transition={{ duration: 1.5, ease: "circOut" }}
                                                        className={`h-full ${stat.barColor} shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-white/40 font-mono text-center">FAILED TO LOAD SESSION_DATA</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* LeetCode Side Details */}
                        <div className="flex flex-col gap-6">
                            <div className="p-8 bg-zinc-900/60 border border-white/5 rounded-[2rem] flex-1 flex flex-col justify-between">
                                 <div>
                                    <Award className="w-8 h-8 text-purple-500 mb-4" />
                                    <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-2">Global Ranking</h4>
                                    <span className="text-2xl font-black text-white tracking-widest">#{lcData?.ranking.toLocaleString() ?? "N/A"}</span>
                                 </div>
                                 <div className="pt-6 border-t border-white/5 mt-6">
                                    <div className="flex justify-between mb-4">
                                        <span className="text-[10px] font-mono text-white/30 uppercase">Reputation</span>
                                        <span className="text-sm font-bold text-white tracking-widest">+{lcData?.reputation ?? 0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[10px] font-mono text-white/30 uppercase">Consistency</span>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className={`w-3 h-1 rounded-full ${i < 4 ? 'bg-orange-500' : 'bg-white/10'}`} />
                                            ))}
                                        </div>
                                    </div>
                                 </div>
                            </div>
                            
                            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-mono text-emerald-500 tracking-widest uppercase">SYD_SYNC: COMPLETE</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Console Legend Footnote */}
        <div className="max-w-4xl mx-auto mt-16 pt-12 border-t border-white/5 flex flex-wrap justify-between gap-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
            <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Consistency is logic solidified.</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="text-[10px] font-mono uppercase tracking-widest">System_Uptime: 99.9%</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Compiled_By: Junaid</span>
            </div>
        </div>

      </div>

      {/* Grid Floor Decorative parallax */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute bottom-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none" 
      />
    </section>
  );
}
