"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Detect system theme or stored theme
    const theme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (theme === "dark" || (!theme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy logic for active bottom tab
      const sections = ["home", "experience", "skills", "projects", "blogs", "contact"];
      const scrollPos = window.scrollY + 250; // Offset to trigger slightly early

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const desktopNavItems = [
    { label: "Home", href: "#home" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Blogs", href: "#blogs" },
    { label: "GitHub", href: "#github" },
    { label: "Contact", href: "#contact" },
  ];

  const mobileNavItems = [
    { label: "HOME", href: "#home", targetId: "home" },
    { label: "EXP", href: "#experience", targetId: "experience" },
    { label: "SKILLS", href: "#skills", targetId: "skills" },
    { label: "WORKS", href: "#projects", targetId: "projects" },
    { label: "BLOGS", href: "#blogs", targetId: "blogs" },
    { label: "CONTACT", href: "#contact", targetId: "contact" },
  ];

  return (
    <>
      {/* Top Header (Desktop & Mobile - No navigation links on mobile here) */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "py-4 border-b border-border-custom glassmorphism" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="text-xl tracking-wider uppercase font-mono font-bold text-accent-custom transition-colors shrink-0">
            TANYA.S
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {desktopNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium tracking-wide font-sans text-muted-text hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-border-custom hover:bg-border-custom text-foreground transition-all duration-200 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </nav>

          {/* Mobile Theme Switcher */}
          <div className="flex items-center md:hidden shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-border-custom text-foreground glassmorphism"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Floating Bottom Nav Capsule for Mobile View (Identical to reference screenshot style) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[92%] max-w-sm">
        <nav className="border border-border-custom glassmorphism rounded-full px-1.5 py-1.5 shadow-2xl flex justify-between items-center bg-[#FAF7F2]/90 dark:bg-[#121311]/90">
          {mobileNavItems.map((item) => {
            const isActive = activeSection === item.targetId;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveSection(item.targetId)}
                className={`px-3 py-2 rounded-full text-[10px] font-mono font-bold tracking-wider transition-all duration-300 whitespace-nowrap active:scale-95 ${
                  isActive
                    ? "bg-[#1C1C19] dark:bg-[#ECE7DC] text-[#FAF7F2] dark:text-[#121311] shadow-md"
                    : "text-muted-text hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}
