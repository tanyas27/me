"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Terminal, Cpu, Check, HelpCircle } from "lucide-react";
import { portfolioData } from "../data/portfolio";

type TabType = "experience" | "education";

export default function TerminalWindow() {
  const [activeTab, setActiveTab] = useState<TabType>("experience");
  const [isPlaying, setIsPlaying] = useState(false);
  const [simLines, setSimLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const simulationScript = [
    "npx @antigravity/ai-engineer --run-audit",
    "[INFO] Booting Antigravity AI Agent v3.5...",
    "[INFO] Analyzing target workspace: Tanya Singh...",
    "[SUCCESS] Found 8+ years of enterprise full-stack archives.",
    "[COMPILE] Mapping architecture: MACH headless e-commerce storefront detected.",
    "[A11Y] Auditing Atlassian Jira components: 2,000+ nodes remediated (70% reduction in violations).",
    "[PERF] Webpack bundle optimizations verified: LCP improved by 45% (TCS platform).",
    "[AI-SPEED] Delivery velocity benchmark: 4x output gains verified via custom agents.",
    "[SUCCESS] Security check complete: WCAG 2.1 AA compliant.",
    "[FINISH] Audit finished. Developer fit: 10/10 Principal Lead Frontend Architect.",
  ];

  useEffect(() => {
    if (!isPlaying) return;

    if (currentLineIndex < simulationScript.length) {
      const timer = setTimeout(() => {
        setSimLines((prev) => [...prev, simulationScript[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, currentLineIndex === 0 ? 1000 : 600); // Wait longer for the first run command
      return () => clearTimeout(timer);
    } else {
      const resetTimer = setTimeout(() => {
        setIsPlaying(false);
        setSimLines([]);
        setCurrentLineIndex(0);
      }, 5000); // Keep result for 5s, then close
      return () => clearTimeout(resetTimer);
    }
  }, [isPlaying, currentLineIndex]);

  const handlePlayClick = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setSimLines([]);
      setCurrentLineIndex(0);
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-card-custom rounded-xl border border-border-custom shadow-2xl overflow-hidden font-sans relative">
      {/* Top Window Bar */}
      <div className="bg-zinc-100 dark:bg-[#1A1B18] px-6 py-5 flex items-center justify-between border-b border-border-custom transition-colors duration-300">
        {/* mac dots */}
        <div className="flex items-center space-x-2">
          <div className="w-3.5 h-3.5 rounded-full bg-red-400/90 dark:bg-red-500/70" />
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-400/90 dark:bg-yellow-500/70" />
          <div className="w-3.5 h-3.5 rounded-full bg-green-400/90 dark:bg-green-500/70" />
          <span className="ml-4 text-xs font-mono text-muted-text font-semibold select-none">
            zsh in tanya-portfolio
          </span>
        </div>

        {/* Tab Headers */}
        <div className="flex bg-zinc-200/80 dark:bg-zinc-800/30 rounded-lg p-0.5 border border-zinc-300/50 dark:border-zinc-700/20">
          {(["experience", "education"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-md text-xs font-mono font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "bg-white dark:bg-zinc-800 text-foreground shadow-md"
                  : "text-zinc-600 dark:text-muted-text hover:text-zinc-950 dark:hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Window Content Screen */}
      <div className="p-8 md:p-12 min-h-[500px] relative bg-card-custom transition-colors duration-300">
        <AnimatePresence mode="wait">
          {/* EXPERIENCE TAB */}
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              {portfolioData.experience.map((job) => (
                <div key={job.id} className="group relative border-l-2 border-zinc-300 dark:border-zinc-800 pl-8 ml-4 transition-colors duration-300">
                  {/* Timeline dot */}
                  <div className="absolute -left-[7px] top-2.5 w-3.5 h-3.5 rounded-full bg-zinc-400 dark:bg-zinc-700 group-hover:bg-accent-dark dark:group-hover:bg-accent-custom transition-all duration-300 border-4 border-card-custom" />
                  
                  {/* Header containing title, company, dates */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground tracking-tight">
                        {job.role}
                      </h3>
                      <p className="text-sm md:text-base font-semibold text-accent-dark dark:text-accent-custom font-mono mt-1">
                        {job.company}
                      </p>
                    </div>
                    <div className="text-left md:text-right">
                      <span className="inline-block text-xs md:text-sm font-mono font-bold text-foreground">
                        {job.period}
                      </span>
                      <span className="block text-xs font-mono text-muted-text italic mt-0.5">
                        {job.duration}
                      </span>
                    </div>
                  </div>

                  {/* Role Brief Description */}
                  <p className="mt-4 text-[13px] md:text-[14px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans font-medium">
                    {job.description}
                  </p>

                  {/* Skills tags list */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono font-medium px-2.5 py-1 rounded bg-zinc-50 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-border-custom hover:text-accent-dark hover:border-accent-dark dark:hover:text-accent-custom dark:hover:border-accent-custom transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Achievements bullet list */}
                  <ul className="mt-6 space-y-4">
                    {job.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-[13px] md:text-[14px] text-zinc-800 dark:text-zinc-200 flex items-start gap-3 leading-relaxed">
                        <span className="text-accent-dark dark:text-accent-custom mt-1.5 font-mono text-[10px] select-none">&gt;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}

          {/* EDUCATION TAB */}
          {activeTab === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="group relative border-l-2 border-zinc-300 dark:border-zinc-800 pl-8 ml-4 transition-colors duration-300">
                  {/* Timeline dot */}
                  <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-400 dark:bg-zinc-700 group-hover:bg-accent-dark dark:group-hover:bg-accent-custom transition-all duration-300 border-4 border-card-custom" />
                  
                  <span className="text-xs md:text-sm font-mono font-bold text-accent-dark dark:text-accent-custom">
                    {edu.period}
                  </span>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-foreground tracking-tight mt-1">
                    {edu.degree}
                  </h3>
                  <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-serif italic mt-1.5">
                    {edu.institution}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Shell Console Play Overlay */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/98 text-zinc-300 p-8 md:p-12 font-mono text-xs flex flex-col justify-between z-30"
            >
              <div className="space-y-2 overflow-y-auto max-h-[380px] scrollbar-thin">
                {simLines.map((line, idx) => {
                  let colorClass = "text-zinc-300";
                  if (line.startsWith("[SUCCESS]")) colorClass = "text-emerald-400 font-semibold";
                  if (line.startsWith("[INFO]")) colorClass = "text-sky-400";
                  if (line.startsWith("[COMPILE]")) colorClass = "text-purple-400";
                  if (line.startsWith("[A11Y]")) colorClass = "text-amber-400";
                  if (line.startsWith("[PERF]")) colorClass = "text-pink-400";
                  if (line.startsWith("[AI-SPEED]")) colorClass = "text-orange-400";
                  if (line.startsWith("[FINISH]")) colorClass = "text-emerald-400 border border-emerald-400/20 px-2 py-1 rounded inline-block bg-emerald-950/20 mt-2";
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`${colorClass} leading-relaxed text-[11px] md:text-xs`}
                    >
                      {line.startsWith("npx") ? (
                        <span className="text-zinc-100 flex items-center gap-1.5">
                          <span className="text-accent-custom">tanya@macbook:~$</span> {line}
                        </span>
                      ) : (
                        line
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-zinc-800 text-[10px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <Terminal size={12} />
                  ANTIGRAVITY COMPILE SIMULATOR
                </span>
                <span>Press Play to cancel audit</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play Action Float Trigger (Bottom Right) */}
        <div className="absolute bottom-8 right-8 z-40">
          <button
            onClick={handlePlayClick}
            className={`p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer ${
              isPlaying
                ? "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20"
                : "bg-accent-custom text-white hover:bg-accent-dark shadow-accent-custom/20"
            }`}
            title="Compile profile analysis"
            aria-label="Play profile compilation"
          >
            {isPlaying ? <Cpu className="animate-spin" size={18} /> : <Play size={18} fill="currentColor" />}
          </button>
        </div>
      </div>
    </div>
  );
}
