"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function StatsBar() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const stats = [
    { number: "8+", label: "Years Experience", desc: "Architecting React ecosystems & enterprise platforms", position: "left-[10%] sm:left-[15%]" },
    { number: "170+", label: "Countries Served", desc: "Edge storefront delivery at global scale", position: "left-[35%] sm:left-[38%]" },
    { number: "78+", label: "Technical Skills", desc: "Full-stack depth across modern web architectures", position: "left-[60%] sm:left-[61%]" },
    { number: "CCAF", label: "Anthropic Certified", desc: "Certified for agentic workflows & MCP server designs", position: "left-[85%] sm:left-[84%]" }
  ];

  return (
    <div className="w-full py-2 select-none relative mt-2">
      {/* Interactive Blueprint Rail Line */}
      <div className="relative w-full h-[1px] bg-border-custom/50 mt-10 mb-6">
        {/* Sliding active gold coordinate marker */}
        <motion.div
          className="absolute -top-[5px] w-2.5 h-2.5 rounded-full bg-accent-custom shadow-xs"
          animate={{ 
            left: stats[activeIdx].position.includes("sm:") 
              ? stats[activeIdx].position.split(" ")[0].replace("left-[", "").replace("]", "") 
              : stats[activeIdx].position.replace("left-[", "").replace("]", "") 
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />

        {/* Plotting points along the rail */}
        {stats.map((stat, idx) => {
          const isActive = activeIdx === idx;

          return (
            <div
              key={idx}
              className={`absolute -translate-x-1/2 -top-8 flex flex-col items-center cursor-pointer group ${stat.position}`}
              onMouseEnter={() => setActiveIdx(idx)}
            >
              {/* Stat Number */}
              <span className={`font-serif font-bold text-lg md:text-xl transition-colors duration-300 ${
                isActive ? "text-accent-custom scale-105" : "text-foreground/75 group-hover:text-foreground"
              }`}>
                {stat.number}
              </span>

              {/* Blueprint vertical tick mark */}
              <div className={`w-[1px] h-3 bg-border-custom my-1 group-hover:bg-accent-custom transition-colors ${
                isActive ? "h-4 bg-accent-custom" : ""
              }`} />

              {/* Stat Label */}
              <span className={`text-[9px] font-mono tracking-widest uppercase whitespace-nowrap mt-1 transition-colors ${
                isActive ? "text-foreground font-semibold" : "text-muted-text"
              }`}>
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Shared Coordinate Details Panel */}
      <div className="w-full h-10 flex items-center justify-center text-center mt-6">
        <motion.p
          key={activeIdx}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="text-xs md:text-sm text-muted-text font-serif italic max-w-lg"
        >
          {stats[activeIdx].desc}
        </motion.p>
      </div>
    </div>
  );
}
