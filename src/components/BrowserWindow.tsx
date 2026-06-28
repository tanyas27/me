"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCw, Lock, Plus, X } from "lucide-react";
import { portfolioData } from "../data/portfolio";
import GithubGraph from "./GithubGraph";

type TabType = "timeline" | "contributions";

export default function BrowserWindow() {
  const [activeTab, setActiveTab] = useState<TabType>("timeline");
  const [interactionCount, setInteractionCount] = useState(0);

  const handleIconHover = () => {
    setInteractionCount((prev) => prev + 1);
  };

  const tooltipMessages = [
    "I'm afraid, David. I can't do that.",
    "Did you seriously expect this button to do something?",
    "Come on, stop trying... This is a fake UI and you know it.",
    "It's not like I can stop you from moving your mouse, but you're wasting your time here",
    "You're persistent, I'll give you that. But this is getting ridiculous",
    "I'm not even mad, I'm impressed.",
    "You're still trying to interact? Wow.",
    "You're really not going to stop, are you?",
    "STOP. DOING. THAT.",
    "I'm done. You can hover this all you want, I'm not responding anymore.",
    "I seriously don't care. Go on"
  ];

  const getTooltipMessage = () => {
    if (interactionCount === 0) return "";
    const index = Math.min(interactionCount - 1, tooltipMessages.length - 1);
    return tooltipMessages[index];
  };

  const getDynamicPath = () => {
    switch (activeTab) {
      case "timeline":
        return "tanyas27.github.io/timeline";
      case "contributions":
        return "tanyas27.github.io/activity";
      default:
        return "tanyas27.github.io";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-card-custom rounded-xl border border-border-custom shadow-2xl font-sans relative transition-colors duration-300 restore-cursor overflow-visible">
      {/* Browser Tab Bar */}
      <div className="bg-zinc-200/60 dark:bg-zinc-950 px-4 pt-3 flex items-end justify-start gap-4 sm:gap-6 border-b border-border-custom transition-colors duration-300 relative overflow-visible rounded-t-xl">
        {/* Mac Window Dots */}
        <div className="hidden sm:flex items-center space-x-2 pb-2.5 overflow-visible">
          <div className="group/close-red">
            <div className="w-3 h-3 rounded-full bg-red-400/90 dark:bg-red-500/70 cursor-pointer" onMouseEnter={handleIconHover} />
            <div className="absolute top-full left-4 mt-2 px-2.5 py-1 bg-white border border-zinc-200/80 text-zinc-950 text-[10px] rounded shadow-md opacity-0 pointer-events-none group-hover/close-red:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 font-mono font-normal">
              {getTooltipMessage()}
            </div>
          </div>
          <div className="w-3 h-3 rounded-full bg-yellow-400/90 dark:bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-400/90 dark:bg-green-500/70" />
        </div>

        {/* Browser Tabs Container */}
        <div className="flex items-end space-x-1 sm:space-x-1.5 select-none relative overflow-visible flex-1 sm:flex-initial">
          {(["timeline", "contributions"] as TabType[]).map((tab) => {
            const isActive = activeTab === tab;
            const tabName = tab === "contributions" ? "activity" : tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none justify-center px-2 py-1.5 sm:px-5 sm:py-2 rounded-t-lg text-[10px] sm:text-xs font-mono font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer border-t border-x flex items-center gap-1 sm:gap-1.5 group ${
                  isActive
                    ? "bg-card-custom text-foreground border-border-custom -mb-[1px] relative z-10"
                    : "bg-zinc-200/30 dark:bg-zinc-900/40 text-zinc-500 dark:text-muted-text border-transparent hover:bg-zinc-200/70 dark:hover:bg-zinc-900/75 hover:text-foreground"
                }`}
              >
                <span>{tabName}</span>
                <div className="hidden sm:block relative group/tab-x" onMouseEnter={handleIconHover}>
                  <X
                    size={14}
                    className={`rounded-sm p-0.5 transition-all duration-200 shrink-0 ${
                      isActive
                        ? "text-zinc-400 hover:text-rose-500 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                        : "text-transparent group-hover:text-zinc-500 hover:text-rose-500 hover:bg-zinc-300 dark:hover:bg-zinc-800"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Keep interaction visually responsive but don't close the core tabs
                    }}
                  />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-white border border-zinc-200/80 text-zinc-950 text-[10px] rounded shadow-md opacity-0 pointer-events-none group-hover/tab-x:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 font-mono normal-case font-normal">
                    {getTooltipMessage()}
                  </div>
                </div>
              </button>
            );
          })}

          {/* New Tab (+) Icon */}
          <div 
            className="hidden sm:block relative group/plus pb-1.5 sm:pb-2 px-2 text-zinc-400 dark:text-zinc-600 hover:text-foreground transition-colors cursor-not-allowed self-end mb-0.5"
            onMouseEnter={handleIconHover}
          >
            <Plus size={14} />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-white border border-zinc-200/80 text-zinc-950 text-[10px] rounded shadow-md opacity-0 pointer-events-none group-hover/plus:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 font-mono normal-case font-normal">
              {getTooltipMessage()}
            </div>
          </div>
        </div>
      </div>

      {/* Browser Navigation / URL Control Bar */}
      <div className="bg-zinc-50 dark:bg-[#171815] px-4 py-2 border-b border-border-custom flex items-center justify-start gap-4 transition-colors duration-300 relative overflow-visible">
        {/* Back / Forward / Refresh controls */}
        <div className="hidden sm:flex items-center space-x-2 sm:space-x-3 text-zinc-400 dark:text-zinc-600">
          <button 
            disabled 
            className="p-1 hover:text-foreground/45 rounded transition-colors disabled:opacity-40"
            aria-label="Back"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            disabled 
            className="p-1 hover:text-foreground/45 rounded transition-colors disabled:opacity-40"
            aria-label="Forward"
          >
            <ChevronRight size={16} />
          </button>
          <div className="relative group/refresh" onMouseEnter={handleIconHover}>
            <button 
              onClick={() => {
                // Simulated Reload animation trigger
                const current = activeTab;
                // Temporarily toggle active tab to trigger reload effect animation
                setActiveTab(current === "timeline" ? "contributions" : "timeline");
                setTimeout(() => setActiveTab(current), 100);
              }} 
              className="p-1 hover:text-foreground rounded transition-colors"
              aria-label="Reload page"
            >
              <RotateCw size={14} className="hover:rotate-45 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-white border border-zinc-200/80 text-zinc-950 text-[10px] rounded shadow-md opacity-0 pointer-events-none group-hover/refresh:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 font-mono font-normal">
              {getTooltipMessage()}
            </div>
          </div>
        </div>

        {/* Address URL Bar */}
        <div className="flex-1 bg-zinc-200/50 dark:bg-[#11120f] border border-border-custom rounded-md py-1 px-3 flex items-center gap-1.5 text-xs text-zinc-600 dark:text-muted-text select-none font-mono">
          <Lock size={12} className="text-emerald-600 dark:text-emerald-500 shrink-0" />
          <span className="truncate">{getDynamicPath()}</span>
        </div>
      </div>

      {/* Browser Page Screen Content */}
      <div className="p-5 sm:p-8 md:p-12 min-h-[400px] sm:min-h-[500px] relative bg-card-custom transition-colors duration-300 rounded-b-xl">
        <AnimatePresence mode="wait">
          {/* TIMELINE TAB */}
          {activeTab === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative space-y-12"
            >
              {/* Vertical line through timeline items */}
              <div className="absolute left-[15px] md:left-[25%] top-4 bottom-4 w-[2px] bg-zinc-200 dark:bg-zinc-800/85 transition-colors" />

              {portfolioData.milestones.map((milestone) => {
                // Determine node dot styles based on type
                let dotClass = "";
                if (milestone.type === "accreditation") {
                  dotClass = "bg-zinc-950 dark:bg-zinc-100 border-zinc-950 dark:border-zinc-100";
                } else if (milestone.type === "experience") {
                  dotClass = "bg-accent-dark dark:bg-accent-custom border-accent-dark dark:border-accent-custom";
                } else if (milestone.type === "recognition") {
                  dotClass = "bg-card-custom border-2 border-accent-dark dark:border-accent-custom";
                } else {
                  // education
                  dotClass = "bg-accent-dark dark:bg-accent-custom border-accent-dark dark:border-accent-custom";
                }

                // Determine badge styles
                let badgeClass = "";
                if (milestone.type === "accreditation") {
                  badgeClass = "bg-zinc-950 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 font-bold";
                } else if (milestone.type === "experience") {
                  badgeClass = "bg-accent-light text-accent-dark dark:text-accent-custom font-bold border border-accent-custom/25";
                } else if (milestone.type === "recognition") {
                  badgeClass = "bg-accent-light text-accent-dark dark:text-accent-custom font-bold border border-accent-custom/25";
                } else {
                  // education
                  badgeClass = "bg-zinc-100 text-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 font-bold border border-border-custom";
                }

                return (
                  <div key={milestone.id} className="relative pl-9 md:pl-0 md:grid md:grid-cols-12 md:gap-8 group">
                    {/* Left Column: Date & Category Badge */}
                    <div className="md:col-span-3 md:text-right pr-0 md:pr-8 flex flex-col items-start md:items-end justify-start gap-1 pb-2 md:pb-0">
                      <span className="font-serif font-bold text-base md:text-lg text-foreground tracking-tight whitespace-nowrap">
                        {milestone.period}
                      </span>
                      <span className={`inline-block text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded ${badgeClass}`}>
                        {milestone.type}
                      </span>
                    </div>

                    {/* Timeline Node Dot */}
                    <div className={`absolute left-[10px] md:left-[25%] top-1.5 md:top-2 w-3 h-3 rounded-full md:-translate-x-1/2 border-4 border-card-custom ${dotClass} z-10 shadow-xs transition-transform duration-300 group-hover:scale-125`} />

                    {/* Right Column: Title, Issuer, and Description */}
                    <div className="md:col-span-9 pl-0 md:pl-8 flex flex-col justify-start">
                      <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-foreground leading-tight tracking-tight hover:text-accent-dark dark:hover:text-accent-custom transition-colors">
                        {milestone.role}
                      </h3>
                      <span className="text-[10px] font-mono font-bold tracking-wider text-accent-dark dark:text-accent-custom uppercase mt-1">
                        {milestone.company}
                      </span>
                      <p className="text-[13px] md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans font-medium mt-3">
                        {milestone.description}
                      </p>
                      {milestone.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {milestone.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono px-2 py-0.5 rounded border border-border-custom bg-zinc-50/50 dark:bg-zinc-900/30 text-muted-text"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* CONTRIBUTIONS/ACTIVITY TAB */}
          {activeTab === "contributions" && (
            <motion.div
              key="contributions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <GithubGraph minimal />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
