"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { Github, Code, ExternalLink, Activity as ActivityIcon } from "lucide-react";

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

export default function Activity() {
  const containerRef = useRef(null);
  const [lcData, setLcData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    fetch("https://leetcode-stats-api.herokuapp.com/Mohammed-Junaid")
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") setLcData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const leetcodeStats = lcData ? [
    { label: "Easy", solved: lcData.easySolved, total: lcData.totalEasy, color: "bg-emerald-500" },
    { label: "Medium", solved: lcData.mediumSolved, total: lcData.totalMedium, color: "bg-orange-500" },
    { label: "Hard", solved: lcData.hardSolved, total: lcData.totalHard, color: "bg-rose-500" },
  ] : [];

  return (
    <section id="activity" ref={containerRef} className="py-24 bg-transparent relative border-t border-white/5">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Clean Section Header */}
        <motion.div style={{ opacity }} className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <ActivityIcon className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-mono text-purple-500 tracking-widest uppercase font-bold">Activity Dashboard</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            CODING & <span className="text-zinc-500">CONTRIBUTIONS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* GitHub Contributions Card */}
          <div className="lg:col-span-2 p-8 bg-zinc-900/30 border border-white/5 rounded-3xl backdrop-blur-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">Code Rhythm</h3>
                  <p className="text-[10px] font-mono text-zinc-500">GITHUB_ENGINE_V2.4</p>
                </div>
              </div>
              <a 
                href="https://github.com/Junaid-vp" 
                target="_blank" 
                className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4 text-white/40" />
              </a>
            </div>

            {/* Responsive Calendar Wrapper: No Overflow Scroll */}
            <div className="relative flex justify-center items-center py-4">
              <div className="w-full scale-[0.6] sm:scale-[0.85] md:scale-100 origin-center">
                <GitHubCalendar 
                  username="Junaid-vp"
                  blockSize={11}
                  blockMargin={4}
                  fontSize={12}
                  theme={{
                    light: ['#18181b', '#3b0764', '#581c87', '#7e22ce', '#a855f7'],
                    dark: ['#18181b', '#3b0764', '#581c87', '#7e22ce', '#a855f7'],
                  }}
                  showWeekdayLabels
                />
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              <span>// 365_DAYS_SNAPSHOT</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                Live_Metrics
              </span>
            </div>
          </div>

          {/* LeetCode Stats Card */}
          <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-3xl backdrop-blur-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <Code className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold text-white">Problem Solving</h3>
              </div>

              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold text-white">Total Solved</span>
                    <span className="text-3xl font-black text-white">{lcData?.totalSolved}</span>
                  </div>

                  <div className="space-y-6">
                    {leetcodeStats.map((stat, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-xs text-zinc-400 font-mono">
                          <span>{stat.label}</span>
                          <span>{stat.solved} / {stat.total}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(stat.solved / stat.total) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${stat.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
                <span>Acceptance Rate</span>
                <span className="text-white font-bold">{lcData?.acceptanceRate}%</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500 mt-2">
                <span>Global Rank</span>
                <span className="text-white font-bold">#{lcData?.ranking.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
