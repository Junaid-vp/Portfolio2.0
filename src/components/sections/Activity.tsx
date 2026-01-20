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
          <div className="lg:col-span-2 p-8 bg-zinc-900/30 border border-white/5 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <Github className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold text-white">GitHub Calendar</h3>
              </div>
              <a 
                href="https://github.com/Junaid-vp" 
                target="_blank" 
                className="text-xs font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
              >
                View Profile <ExternalLink className="w-3 h-3" />
              </a>
            </div>

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
            
            <p className="mt-6 text-sm text-zinc-500 font-mono italic">
              // Consistent daily contributions across open-source and personal repositories.
            </p>
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
