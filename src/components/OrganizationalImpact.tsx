"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImpactItem {
  metric: string;
  label: string;
  story: string;
  geometry: React.ReactNode;
}

export default function OrganizationalImpact() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const items: ImpactItem[] = [
    {
      metric: "200+",
      label: "SME Technical Appraisals",
      story: "Formally assessed and graded engineering candidates for EPAM's global ASMT panels, defining standard benchmarks for Lead & Principal UI roles.",
      geometry: (
        <svg className="w-full h-full text-accent-custom/10 dark:text-accent-custom/5 stroke-current fill-none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" strokeWidth="1" />
          <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
      )
    },
    {
      metric: "50+",
      label: "Engineers Mentored",
      story: "Guided and coached senior/lead engineers through EPAM's global promotion assessment committee and technical mentorship loops.",
      geometry: (
        <svg className="w-full h-full text-accent-custom/10 dark:text-accent-custom/5 stroke-current fill-none" viewBox="0 0 100 100">
          <polygon points="50,15 90,85 10,85" strokeWidth="1" />
          <circle cx="50" cy="55" r="15" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>
      )
    },
    {
      metric: "75%",
      label: "Promotion Rate",
      story: "Guided direct mentees to technical promotions within 18 months, maintaining an overall 95% team retention rate.",
      geometry: (
        <svg className="w-full h-full text-accent-custom/10 dark:text-accent-custom/5 stroke-current fill-none" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" strokeWidth="1" />
          <circle cx="50" cy="50" r="25" strokeWidth="0.5" />
          <line x1="20" y1="20" x2="80" y2="80" strokeWidth="0.5" />
        </svg>
      )
    },
    {
      metric: "Multiple",
      label: "Recognitions & Awards",
      story: "Awarded as AI Champion, JavaScript Top Contributor, and Innovation Enabler, alongside accolades for leading multiple enterprise delivery streams.",
      geometry: (
        <svg className="w-full h-full text-accent-custom/10 dark:text-accent-custom/5 stroke-current fill-none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="35" strokeWidth="1" />
          <circle cx="50" cy="50" r="20" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="5" strokeWidth="1" className="fill-accent-custom/20" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-20 relative select-none">
      {/* Top divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-border-custom via-border-custom/45 to-transparent mb-12" />

      {/* Header */}
      <div className="mb-14">
        <span className="font-mono text-[10px] tracking-widest text-accent-custom uppercase font-semibold">
          Scale & Leadership
        </span>
        <h3 className="editorial-title text-3xl md:text-4xl text-foreground font-serif mt-2 tracking-tight">
          Organizational Impact
        </h3>
      </div>

      {/* Editorial Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

        {/* Left column: List of metrics */}
        <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-border-custom/50 border-t border-b border-border-custom/50">
          {items.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveIndex(idx)}
                className="py-6 cursor-pointer group transition-colors duration-300 relative overflow-hidden"
              >
                {/* Active slider background indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent-custom"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <div className="pl-6 flex items-baseline justify-between pr-4">
                  <div className="flex flex-col">
                    <span className={`font-serif font-bold text-3xl md:text-4xl transition-colors duration-300 ${isActive ? "text-accent-custom" : "text-foreground/80 group-hover:text-foreground"
                      }`}>
                      {item.metric}
                    </span>
                    <span className="text-[11px] font-mono tracking-wider text-muted-text uppercase mt-1">
                      {item.label}
                    </span>
                  </div>

                  {/* Subtle right chevron indicator */}
                  <span className={`text-xs font-mono transition-transform duration-300 ${isActive ? "text-accent-custom translate-x-1" : "text-transparent"
                    }`}>
                    &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column: Impact Canvas Display */}
        <div className="lg:col-span-7 relative flex items-center">
          <div className="w-full min-h-[300px] p-8 md:p-12 rounded-2xl bg-card-custom border border-border-custom relative overflow-hidden flex flex-col justify-between shadow-xs">

            {/* Generative geometric background pattern */}
            <div className="absolute right-4 bottom-4 w-44 h-44 pointer-events-none opacity-80 transition-all duration-700">
              {items[activeIndex].geometry}
            </div>

            {/* Top accent line */}
            <div className="w-8 h-[2px] bg-accent-custom mb-8" />

            {/* Dynamic text rendering */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex-1 flex flex-col justify-center max-w-xl relative z-10"
              >
                <span className="font-mono text-[9px] tracking-widest text-accent-custom uppercase font-bold mb-3 block">
                  {items[activeIndex].label}
                </span>
                <p className="font-serif italic text-lg md:text-2xl text-foreground leading-relaxed font-light">
                  &ldquo;{items[activeIndex].story}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Bottom metadata */}
            <div className="mt-12 pt-6 border-t border-border-custom/50 flex justify-between items-center text-[10px] font-mono text-muted-text">
              <span>0{activeIndex + 1} / 0{items.length}</span>
              <span className="uppercase tracking-widest text-accent-custom">Tanya Singh &bull; Impact Profile</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
