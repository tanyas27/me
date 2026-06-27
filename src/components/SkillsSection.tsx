"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Terminal, Compass, LayoutGrid } from "lucide-react";
import { portfolioData } from "../data/portfolio";

export default function SkillsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Grouped skills
  const skillsCategories = portfolioData.skills;

  // Flattened list of categories for filter tabs
  const categories = useMemo(() => {
    return skillsCategories.map((c) => c.category);
  }, [skillsCategories]);

  // Trigger scanning effect when query or category changes
  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => setIsScanning(false), 600);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  // Handle category selection toggle
  const toggleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  // Filter skills based on search query
  const filteredData = useMemo(() => {
    return skillsCategories.map((cat, catIdx) => {
      const filteredSkills = cat.skills.map((skill, skillIdx) => {
        const matchesSearch = skill.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || cat.category === selectedCategory;
        const indexCode = `${skillIdx + 1 < 10 ? "0" : ""}${skillIdx + 1}`;

        return {
          name: skill,
          code: indexCode,
          matchesSearch,
          matchesCategory,
          isActive: matchesSearch && matchesCategory,
        };
      });

      return {
        category: cat.category,
        trackCode: `TRK-0${catIdx + 1}`,
        skills: filteredSkills,
        hasActiveMatches: filteredSkills.some((s) => s.isActive),
      };
    });
  }, [skillsCategories, searchQuery, selectedCategory]);

  // Statistics for HUD
  const totalSkillsCount = useMemo(() => {
    return skillsCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, [skillsCategories]);

  const activeSkillsCount = useMemo(() => {
    return filteredData.reduce(
      (acc, cat) => acc + cat.skills.filter((s) => s.isActive).length,
      0
    );
  }, [filteredData]);

  const matchRate = useMemo(() => {
    if (totalSkillsCount === 0) return 0;
    return Math.round((activeSkillsCount / totalSkillsCount) * 100);
  }, [activeSkillsCount, totalSkillsCount]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto font-mono relative selection:bg-accent-custom selection:text-white">
      {/* Decorative Blueprint Corner Crosshairs */}
      <div className="absolute -top-3 -left-3 text-accent-custom/40 select-none">+</div>
      <div className="absolute -top-3 -right-3 text-accent-custom/40 select-none">+</div>
      <div className="absolute -bottom-3 -left-3 text-accent-custom/40 select-none">+</div>
      <div className="absolute -bottom-3 -right-3 text-accent-custom/40 select-none">+</div>

      {/* Grid Blueprint Styling Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(167,123,74,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(167,123,74,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none rounded-xl border border-border-custom" />

      {/* Main Console Container */}
      <div className="border border-border-custom bg-card-custom/60 dark:bg-card-custom/30 backdrop-blur-md rounded-xl p-6 md:p-8 relative overflow-hidden space-y-6">
        
        {/* Radar Diagnostic Sweep Overlay */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-custom/40 to-transparent shadow-[0_0_8px_1px_rgba(213,167,110,0.3)] pointer-events-none z-10"
            />
          )}
        </AnimatePresence>

        {/* Technical HUD & Input Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 border-b border-border-custom pb-6 items-center">
          {/* System Label */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="p-2 rounded bg-accent-custom/5 border border-accent-custom/20 text-accent-custom">
              <Terminal size={16} className="animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground tracking-wider uppercase">
                CAPABILITY_MATRIX // v5.1
              </div>
              <div className="text-[10px] text-muted-text uppercase">
                Status: <span className={isScanning ? "text-amber-500 font-bold" : "text-emerald-500 font-bold"}>{isScanning ? "Scanning Matrix..." : "Stable Locked"}</span>
              </div>
            </div>
          </div>

          {/* Search bar console style */}
          <div className="relative w-full lg:w-72">
            <Search
              size={13}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-text"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH PROTOCOL..."
              className="w-full bg-zinc-100/50 dark:bg-zinc-900/30 border border-border-custom rounded-md py-2 pl-9 pr-8 text-xs text-foreground placeholder:text-muted-text/50 uppercase tracking-wider focus:outline-none focus:border-accent-custom transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-foreground cursor-pointer"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Diagnostic Stats Readout */}
          <div className="flex items-center gap-6 text-[10px] text-muted-text w-full lg:w-auto border-t lg:border-t-0 border-border-custom pt-4 lg:pt-0 justify-between lg:justify-end">
            <div>
              TOTAL_NODES: <span className="font-bold text-foreground">{totalSkillsCount}</span>
            </div>
            <div>
              MATCHES: <span className="font-bold text-accent-custom">{activeSkillsCount}</span>
            </div>
            <div>
              DENSITY: <span className="font-bold text-foreground">{matchRate}%</span>
            </div>
          </div>
        </div>

        {/* Track Filter Switches */}
        <div className="flex items-center gap-3 flex-wrap text-[10px] border-b border-border-custom pb-6">
          <span className="text-muted-text font-bold uppercase tracking-wider flex items-center gap-1">
            <Compass size={12} /> Filter Channel:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-2.5 py-1 rounded transition-all cursor-pointer border text-[9px] uppercase tracking-wider ${
                    isActive
                      ? "bg-accent-custom text-white border-accent-custom shadow-[0_0_6px_rgba(213,167,110,0.15)] font-bold"
                      : "bg-transparent text-muted-text border-border-custom hover:text-foreground hover:border-accent-custom/40"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
            {(searchQuery || selectedCategory) && (
              <button
                onClick={resetFilters}
                className="text-[9px] px-2.5 py-1 rounded border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 cursor-pointer uppercase tracking-wider font-bold"
              >
                Reset Diagnostic
              </button>
            )}
          </div>
        </div>

        {/* High-Density Matrix / Blueprint Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-2">
          <AnimatePresence mode="popLayout">
            {filteredData.map((category) => {
              if (!category.hasActiveMatches) return null;

              return (
                <motion.div
                  key={category.category}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {/* Category Header */}
                  <div className="flex justify-between items-center text-[10px] border-b border-border-custom pb-1.5 text-muted-text">
                    <span className="font-bold text-foreground tracking-wider flex items-center gap-1.5">
                      <LayoutGrid size={11} className="text-accent-custom" />
                      {category.category.toUpperCase()}
                    </span>
                  </div>

                  {/* High-density inline list of tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`text-[10px] md:text-[11px] font-sans px-2.5 py-1 rounded border transition-all flex items-center gap-1.5 tracking-wide ${
                          skill.isActive
                            ? "bg-accent-light/60 dark:bg-accent-light/10 text-accent-dark dark:text-accent-custom border-accent-custom/40 font-semibold"
                            : "bg-transparent border-zinc-200/40 dark:border-zinc-800/40 text-muted-text/30"
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${
                            skill.isActive
                              ? "bg-accent-custom shadow-[0_0_4px_rgba(213,167,110,0.8)] animate-pulse"
                              : "bg-zinc-300/40 dark:bg-zinc-800/40"
                          }`}
                        />
                        <span>{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {activeSkillsCount === 0 && (
          <div className="py-16 text-center border border-dashed border-border-custom rounded-lg bg-zinc-50/20 dark:bg-zinc-950/10">
            <p className="text-xs uppercase text-muted-text tracking-widest">
              Zero active nodes found matching the query.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 text-xs text-accent-custom hover:underline cursor-pointer font-bold uppercase tracking-wider"
            >
              INITIALIZE RESET
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
