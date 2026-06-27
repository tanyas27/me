"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GitPullRequest, Award, Zap, Calendar } from "lucide-react";

// Simple seedable random number generator (Linear Congruential Generator)
function seedRandom(seed: number) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

interface GithubGraphProps {
  minimal?: boolean;
}

export default function GithubGraph({ minimal = false }: GithubGraphProps) {
  const [hoveredCell, setHoveredCell] = useState<{
    count: number;
    date: string;
  } | null>(null);

  // Generate 53 weeks (371 days) of contribution data ending on June 26, 2026
  const { weeks, monthLabels } = useMemo(() => {
    const random = seedRandom(12345); // Static seed to align SSR and client-side hydration
    const endDate = new Date(2026, 5, 26); // June 26, 2026
    const totalDays = 53 * 7;
    const dayList = [];

    for (let i = totalDays - 1; i >= 0; i--) {
      const currentDate = new Date(endDate);
      currentDate.setDate(endDate.getDate() - i);
      
      const dayOfWeek = currentDate.getDay(); // 0 (Sun) to 6 (Sat)
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let count = 0;
      if (!isWeekend) {
        const rand = random();
        if (rand > 0.85) count = Math.floor(random() * 8) + 6;
        else if (rand > 0.3) count = Math.floor(random() * 5) + 1;
      } else {
        if (random() > 0.7) count = Math.floor(random() * 3) + 1;
      }

      let level = 0;
      if (count > 0 && count <= 2) level = 1;
      else if (count > 2 && count <= 4) level = 2;
      else if (count > 4 && count <= 7) level = 3;
      else if (count > 7) level = 4;

      dayList.push({
        date: currentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        rawDate: currentDate,
        count,
        level,
        dayOfWeek,
      });
    }

    // Split into weeks of 7 days
    const weeksGrid: typeof dayList[] = [];
    for (let i = 0; i < dayList.length; i += 7) {
      weeksGrid.push(dayList.slice(i, i + 7));
    }

    // Programmatically locate column indices where months transition
    const labels: { index: number; text: string }[] = [];
    let lastMonth = -1;
    weeksGrid.forEach((week, index) => {
      const firstDay = week[0].rawDate;
      const monthNum = firstDay.getMonth();
      if (monthNum !== lastMonth) {
        labels.push({
          index,
          text: firstDay.toLocaleDateString("en-US", { month: "short" }),
        });
        lastMonth = monthNum;
      }
    });

    return { weeks: weeksGrid, monthLabels: labels };
  }, []);

  return (
    <div className={minimal ? "w-full font-sans" : "w-full max-w-4xl mx-auto p-6 md:p-8 rounded-xl bg-card-custom border border-border-custom shadow-md font-sans"}>
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="text-zinc-400 dark:text-zinc-500 font-mono text-[13px] tracking-wide select-none block mb-1">
            ~ contributions graph
          </span>
          <h3 className="text-lg font-serif text-foreground tracking-tight flex items-center gap-2">
            <GitPullRequest className="text-emerald-600 dark:text-emerald-400" size={20} />
            Open Source & Git Activity
          </h3>
          <p className="text-xs text-muted-text mt-1">
            Simulated workspace commit logs analyzing local and remote repositories.
            <span className="block md:hidden text-[10px] text-accent-custom mt-1 font-semibold animate-pulse">
              Swipe left to view full graph &rarr;
            </span>
          </p>
        </div>

        {/* Green Legend */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-text select-none">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded bg-[#EBEDF0] dark:bg-[#161B22]" />
          <div className="w-2.5 h-2.5 rounded bg-[#C6E48B] dark:bg-[#0E4429]" />
          <div className="w-2.5 h-2.5 rounded bg-[#7BC96F] dark:bg-[#006D32]" />
          <div className="w-2.5 h-2.5 rounded bg-[#239A3B] dark:bg-[#26A641]" />
          <div className="w-2.5 h-2.5 rounded bg-[#196127] dark:bg-[#39D353]" />
          <span>More</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
        {/* Left Side: Stats columns (Restored) */}
        <div className="lg:col-span-1 grid grid-cols-3 lg:grid-cols-1 gap-4">
          <div className="border border-border-custom rounded-lg p-3 bg-zinc-50/50 dark:bg-zinc-900/10 flex flex-col justify-between">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-text flex items-center gap-1">
              <Calendar size={12} className="text-emerald-600 dark:text-emerald-400" />
              Contributions
            </span>
            <span className="text-xl font-serif font-bold text-foreground mt-1">
              1,842
            </span>
            <span className="text-[9px] text-zinc-400 dark:text-zinc-500 block mt-0.5">
              In past 12 months
            </span>
          </div>

          <div className="border border-border-custom rounded-lg p-3 bg-zinc-50/50 dark:bg-zinc-900/10 flex flex-col justify-between">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-text flex items-center gap-1">
              <Zap size={12} className="text-amber-500" />
              Active Streak
            </span>
            <span className="text-xl font-serif font-bold text-foreground mt-1">
              18 Days
            </span>
            <span className="text-[9px] text-zinc-400 dark:text-zinc-500 block mt-0.5">
              Ends Jun 26, 2026
            </span>
          </div>

          <div className="border border-border-custom rounded-lg p-3 bg-zinc-50/50 dark:bg-zinc-900/10 flex flex-col justify-between">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-muted-text flex items-center gap-1">
              <Award size={12} className="text-emerald-500" />
              Peak Velocity
            </span>
            <span className="text-xl font-serif font-bold text-foreground mt-1">
              14 Commits
            </span>
            <span className="text-[9px] text-zinc-400 dark:text-zinc-500 block mt-0.5">
              Single-day max
            </span>
          </div>
        </div>

        {/* Right Side: Grid chart (Large Green Squares) */}
        <div className="lg:col-span-3 overflow-x-auto py-2 relative scrollbar-thin">
          {/* Increased square width metrics: colSpacing is 15px (12.5px cell + 2.5px gap) */}
          <div className="min-w-[830px] flex flex-col">
            
            {/* Month names aligned to starting week columns */}
            <div className="h-6 relative text-[11px] text-zinc-400 dark:text-zinc-500 font-mono select-none">
              {monthLabels.map((label, idx) => (
                <div
                  key={idx}
                  className="absolute"
                  style={{ left: `${label.index * 15 + 28}px` }}
                >
                  {label.text}
                </div>
              ))}
            </div>

            <div className="flex gap-2.5">
              {/* Day indicator labels */}
              <div className="flex flex-col justify-between font-mono text-[9px] text-zinc-400 dark:text-zinc-500 py-1.5 w-6 select-none h-[103px]">
                <span className="h-3.5 leading-none"></span>
                <span className="h-3.5 leading-none">Mon</span>
                <span className="h-3.5 leading-none"></span>
                <span className="h-3.5 leading-none">Wed</span>
                <span className="h-3.5 leading-none"></span>
                <span className="h-3.5 leading-none">Fri</span>
                <span className="h-3.5 leading-none"></span>
              </div>

              {/* GitHub green grid cells (12.5px squares) */}
              <div className="flex gap-[2.5px]">
                {weeks.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[2.5px]">
                    {week.map((day, dayIdx) => {
                      let bgClass = "bg-[#EBEDF0] dark:bg-[#161B22]";
                      if (day.level === 1) bgClass = "bg-[#C6E48B] dark:bg-[#0E4429]";
                      if (day.level === 2) bgClass = "bg-[#7BC96F] dark:bg-[#006D32]";
                      if (day.level === 3) bgClass = "bg-[#239A3B] dark:bg-[#26A641]";
                      if (day.level === 4) bgClass = "bg-[#196127] dark:bg-[#39D353]";

                      return (
                        <motion.div
                          key={dayIdx}
                          className={`w-[12.5px] h-[12.5px] rounded-[2.5px] cursor-pointer transition-all ${bgClass}`}
                          whileHover={{ scale: 1.3, zIndex: 10 }}
                          onMouseEnter={() =>
                            setHoveredCell({
                              count: day.count,
                              date: day.date,
                            })
                          }
                          onMouseLeave={() => setHoveredCell(null)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hover Commits Tooltip */}
          {hoveredCell && (
            <div className="absolute top-[-36px] left-[50%] transform -translate-x-[50%] bg-zinc-950 text-white font-mono text-[10px] px-3 py-1.5 rounded border border-zinc-800 pointer-events-none shadow-xl flex flex-col items-center gap-0.5 z-20">
              <span className="font-semibold text-emerald-400">
                {hoveredCell.count} {hoveredCell.count === 1 ? "commit" : "commits"}
              </span>
              <span className="text-[9px] text-zinc-400">{hoveredCell.date}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Right Monospace Green link */}
      <div className="flex justify-end mt-4">
        <a
          href="https://github.com/tanyas27"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200"
        >
          github.com/tanyas27 &rarr;
        </a>
      </div>
    </div>
  );
}
