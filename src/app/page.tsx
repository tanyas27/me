"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TraceLine from "../components/TraceLine";
import BrowserWindow from "../components/BrowserWindow";
import SkillsSection from "../components/SkillsSection";
import ProjectShowcase from "../components/ProjectShowcase";
import BlogFeed from "../components/BlogFeed";
import ContactSection from "../components/ContactSection";
import StatsBar from "../components/StatsBar";
import OrganizationalImpact from "../components/OrganizationalImpact";
import { Download, FileText, ArrowRight, ExternalLink } from "lucide-react";

// Dynamically load CustomCursor to avoid SSR issues
const CustomCursor = dynamic(() => import("../components/CustomCursor"), {
  ssr: false,
});

// Dynamically load CelestialSphere to avoid SSR issues with canvas and three.js
const CelestialSphere = dynamic(() => import("../components/CelestialSphere"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center text-xs font-mono text-muted-text">
      Initializing 3D space...
    </div>
  ),
});

export default function Home() {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    // Dynamic greeting based on Indian Standard Time/Local Time
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good morning");
    else if (hours < 17) setGreeting("Good afternoon");
    else if (hours < 22) setGreeting("Good evening");
    else setGreeting("Good night");
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Custom Theme-Aware Cursor & Global Canvas Sparkles */}
      <CustomCursor />

      {/* Floating Header */}
      <Header />

      {/* Global Scroll Tracer Line */}
      <TraceLine />

      {/* Main Page Content Wrapper */}
      <main className="relative pl-6 md:pl-24 lg:pl-36 pr-6 md:pr-12 lg:pr-24 overflow-hidden">
        
        {/* HERO SECTION */}
        <section
          id="home"
          className="min-h-screen pt-32 pb-20 flex flex-col justify-center relative overflow-visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto w-full">
            {/* Left Column: Bio Typography */}
            <div className="lg:col-span-7 z-10 flex flex-col space-y-6 md:space-y-8 select-none">
              
              {/* Dynamic CV link button with trace loops */}
              <div className="relative inline-flex self-start group">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-accent-custom text-background border border-accent-custom hover:bg-background hover:text-accent-custom transition-all duration-300 text-xs font-mono tracking-wide"
                >
                  <Download size={14} />
                  <span>Download CV</span>
                  <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                {/* Decorative architectural circle connectors */}
                <div className="absolute top-1/2 left-[-16px] w-2 h-2 rounded-full bg-accent-custom -translate-y-1/2 hidden md:block" />
              </div>

              {/* Header Text */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight select-text">
                <span className="editorial-title block text-muted-text">
                  {greeting},
                </span>
                <span className="font-sans font-bold text-foreground">
                  My name is Tanya Singh.
                </span>
              </h1>

              {/* Sub-text summary description */}
              <p className="text-base md:text-lg leading-relaxed text-muted-text max-w-xl font-sans select-text">
                I am a <strong className="text-foreground font-semibold">Lead Software Engineer</strong> and{" "}
                <strong className="text-foreground font-semibold">Frontend Architect</strong> based in India. 
                I specialize in engineering high-fidelity, accessible (WCAG 2.1 AA) React systems and 
                orchestrating AI-augmented monorepos at scale.
              </p>

              {/* Stats Bar */}
              <StatsBar />


            </div>

            {/* Right Column: 3D interactive scene sphere */}
            <div className="lg:col-span-5 w-full h-[320px] md:h-[450px] lg:h-[550px] relative">
              <CelestialSphere />
            </div>
          </div>
        </section>

        {/* SECTION 1: EXPERIENCE & EDUCATION */}
        <section
          id="experience"
          className="heavy-section py-24 border-t border-border-custom relative overflow-visible"
          style={{ contentVisibility: "auto", containIntrinsicSize: "auto none auto 800px" }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Editorial Section Header */}
            <div className="mb-16">
              <span className="font-mono text-xs font-semibold text-accent-custom tracking-widest uppercase">
                01. Chronicles
              </span>
              <h2 className="editorial-title text-3xl md:text-4xl text-foreground mt-2">
                Professional Milestones
              </h2>
            </div>

            {/* Browser Tab Container */}
            <BrowserWindow />

            {/* Organizational Impact hover cards */}
            <OrganizationalImpact />
          </div>
        </section>

        {/* SECTION 2: SKILLS & CAPABILITIES */}
        <section
          id="skills"
          className="heavy-section py-24 border-t border-border-custom relative overflow-visible"
          style={{ contentVisibility: "auto", containIntrinsicSize: "auto none auto 600px" }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Editorial Section Header */}
            <div className="mb-16">
              <span className="font-mono text-xs font-semibold text-accent-custom tracking-widest uppercase">
                02. Capabilities
              </span>
              <h2 className="editorial-title text-3xl md:text-4xl text-foreground mt-2">
                Skills & Expertise
              </h2>
            </div>

            {/* Skills grid with search and category tags */}
            <SkillsSection />
          </div>
        </section>

        {/* SECTION 3: PROJECTS GALLERY */}
        <section
          id="projects"
          className="heavy-section py-24 border-t border-border-custom relative overflow-visible"
          style={{ contentVisibility: "auto", containIntrinsicSize: "auto none auto 800px" }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Editorial Section Header */}
            <div className="mb-16">
              <span className="font-mono text-xs font-semibold text-accent-custom tracking-widest uppercase">
                03. Selected Works
              </span>
              <h2 className="editorial-title text-3xl md:text-4xl text-foreground mt-2">
                Case Studies & Storefronts
              </h2>
            </div>

            {/* Project grid */}
            <ProjectShowcase />
          </div>
        </section>

        {/* SECTION 4: MEDIUM BLOGS */}
        <section
          id="blogs"
          className="heavy-section py-24 border-t border-border-custom relative overflow-visible"
          style={{ contentVisibility: "auto", containIntrinsicSize: "auto none auto 600px" }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Editorial Section Header */}
            <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <span className="font-mono text-xs font-semibold text-accent-custom tracking-widest uppercase">
                  04. Written Thoughts
                </span>
                <h2 className="editorial-title text-3xl md:text-4xl text-foreground mt-2">
                  Medium Blog
                </h2>
              </div>
              
              {/* Medium External Button */}
              <a
                href="https://tanyas27.medium.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border-custom bg-card-custom text-foreground hover:bg-border-custom hover:border-accent-custom/40 transition-all duration-300 text-xs font-medium tracking-wide w-fit self-start sm:self-auto shadow-xs hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="text-foreground"
                >
                  <path d="M12 12c0 3.31-2.69 6-6 6S0 15.31 0 12s2.69-6 6-6 6 2.69 6 6zm7.5 0c0 3.04-1.34 5.5-3 5.5s-3-2.46-3-5.5 1.34-5.5 3-5.5 3 2.46 3 5.5zm4.5 0c0 2.76-.45 5-1 5s-1-2.24-1-5 .45-5 1-5 1 2.24 1 5z" />
                </svg>
                <span>Medium</span>
                <ExternalLink size={13} className="text-muted-text" />
              </a>
            </div>

            {/* Blogs list */}
            <BlogFeed />
          </div>
        </section>

        {/* SECTION 5: CONTACT */}
        <section
          id="contact"
          className="heavy-section py-24 border-t border-border-custom relative overflow-visible"
          style={{ contentVisibility: "auto", containIntrinsicSize: "auto none auto 600px" }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Editorial Section Header */}
            <div className="mb-16">
              <span className="font-mono text-xs font-semibold text-accent-custom tracking-widest uppercase">
                05. Connection Channels
              </span>
              <h2 className="editorial-title text-3xl md:text-4xl text-foreground mt-2">
                Get In Touch
              </h2>
            </div>

            <ContactSection />
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
