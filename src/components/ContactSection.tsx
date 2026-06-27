"use client";

import { motion } from "framer-motion";
import { Mail, BookOpen } from "lucide-react";

const GithubIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactSection() {

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/tanyas27",
      icon: <LinkedinIcon size={20} />,
      username: "tanya-singh",
      color: "hover:text-blue-500 hover:border-blue-500/30",
    },
    {
      name: "GitHub",
      href: "https://github.com/tanyas27",
      icon: <GithubIcon size={20} />,
      username: "tanyas27",
      color: "hover:text-zinc-950 dark:hover:text-white hover:border-zinc-500/30",
    },
    {
      name: "Medium",
      href: "https://tanyas27.medium.com/",
      icon: <BookOpen size={20} />,
      username: "@tanyas27",
      color: "hover:text-emerald-500 hover:border-emerald-500/30",
    },
    {
      name: "Email",
      href: "mailto:tanyacs27@gmail.com",
      icon: <Mail size={20} />,
      username: "tanyacs27@gmail.com",
      color: "hover:text-accent-custom hover:border-accent-custom/30",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* CONTACT DETAILS & SOCIALS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col space-y-10"
      >
        <div className="space-y-6">
          <p className="text-base text-muted-text leading-relaxed font-sans">
            Let&apos;s build something extraordinary together. Whether you want to discuss a headless React architecture, accessibility audits, or just say hello—drop a message.
          </p>

          {/* Availability Status */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border-custom bg-card-custom/50 text-xs font-mono">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-muted-text">
              Status: <span className="text-foreground font-semibold">Available for new opportunities</span>
            </span>
          </div>
        </div>

        {/* Social Card Grid */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-semibold tracking-wider text-muted-text uppercase">
            Directory & Channels
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-4 rounded-xl border border-border-custom bg-card-custom/50 hover:bg-card-custom transition-all duration-300 group ${link.color} shadow-xs hover:shadow-md hover:scale-[1.02]`}
              >
                <div className="p-2.5 rounded-lg border border-border-custom bg-background text-muted-text group-hover:text-inherit transition-colors">
                  {link.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-mono text-muted-text group-hover:text-foreground transition-colors">
                    {link.name}
                  </span>
                  <span className="text-sm font-sans font-medium text-foreground truncate">
                    {link.username}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
