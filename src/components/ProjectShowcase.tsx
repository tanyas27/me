"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code } from "lucide-react";
import { portfolioData } from "../data/portfolio";

export default function ProjectShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {portfolioData.projects.map((project, idx) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
          className="group relative flex flex-col justify-between p-8 rounded-xl bg-card-custom border border-border-custom hover:border-accent-custom/50 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden"
        >
          {/* Subtle Background Glow on Hover */}
          <div className="absolute inset-0 bg-radial-gradient from-accent-custom/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div>
            {/* Header: Title and Link Icon */}
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-xl font-serif text-foreground tracking-tight group-hover:text-accent-custom transition-colors duration-300">
                {project.title}
              </h3>
              <a
                href={project.link}
                className="p-2 rounded-full border border-border-custom bg-zinc-50 dark:bg-zinc-900 group-hover:bg-accent-custom group-hover:text-white transition-all duration-300"
                aria-label={`View details for ${project.title}`}
              >
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Description */}
            <p className="mt-4 text-xs text-muted-text leading-relaxed font-sans">
              {project.description}
            </p>

            {/* Highlights bullet list */}
            {project.highlights && (
              <ul className="mt-4 space-y-2">
                {project.highlights.map((bullet, idx) => (
                  <li key={idx} className="text-[11px] text-zinc-700 dark:text-zinc-300 flex items-start gap-2 leading-relaxed">
                    <span className="text-accent-custom mt-1 font-mono text-[8px] select-none">&gt;</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Bottom Section */}
          <div className="mt-8 space-y-4">
            {/* Delivery Metric pill */}
            {project.metrics && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono bg-accent-light text-accent-custom border border-accent-custom/10 transition-colors duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-custom animate-pulse" />
                <span>Metric: {project.metrics}</span>
              </div>
            )}

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono font-medium px-2 py-0.5 rounded border border-border-custom bg-zinc-50/50 dark:bg-zinc-900/30 text-muted-text"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
