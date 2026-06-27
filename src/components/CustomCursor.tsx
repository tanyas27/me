"use client";

import React, { useEffect, useRef, useState } from "react";

// Particle class to manage each individual global sparkle
class SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxLife: number;
  life: number;
  color: string;

  constructor(x: number, y: number, isDark: boolean) {
    this.x = x;
    this.y = y;

    // Disperse velocity in all directions
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.4 + Math.random() * 1.5;
    this.vx = Math.cos(angle) * speed;

    // Upward drift (exhaust flame effect)
    this.vy = Math.sin(angle) * speed - 0.2;

    this.size = 2.0 + Math.random() * 3.0;
    this.maxLife = 20 + Math.floor(Math.random() * 15);
    this.life = this.maxLife;

    // Gold/amber gradients
    const darkColors = ["#FFE082", "#FFA726", "#FFF1E0", "#FFD54F"];
    const lightColors = ["#7A5930", "#A77B4A", "#D4A373", "#8F5D2E"];
    const palette = isDark ? darkColors : lightColors;
    this.color = palette[Math.floor(Math.random() * palette.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const ratio = this.life / this.maxLife;
    const size = this.size * ratio;

    ctx.save();
    ctx.globalAlpha = ratio;
    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;

    ctx.shadowBlur = 4;
    ctx.shadowColor = this.color;

    ctx.fill();
    ctx.restore();
  }
}

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mouse coords
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Spring ring coords
  const ringRef = useRef({ x: 0, y: 0 });

  // Rotation angles (target and current)
  const angleRef = useRef(0);
  const currentAngleRef = useRef(0);

  // Refs to cursor DOM nodes
  const dotDomRef = useRef<HTMLDivElement>(null);
  const ringDomRef = useRef<HTMLDivElement>(null);

  // Canvas trail refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<SparkleParticle[]>([]);
  const flameTickRef = useRef(0);

  useEffect(() => {
    // 1. Desktop Check: Skip mobile devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (isTouchDevice || !hasFinePointer) {
      return;
    }

    setMounted(true);
    setIsVisible(true);

    // Hide default cursor
    document.documentElement.classList.add("custom-cursor-active");

    // 2. Theme Mutation Observer
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const themeObserver = new MutationObserver(checkTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    // 3. Canvas Resizing
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 4. Mouse Coordinates Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const mx = e.clientX;
      const my = e.clientY;

      const dx = mx - mouseRef.current.x;
      const dy = my - mouseRef.current.y;

      mouseRef.current.x = mx;
      mouseRef.current.y = my;
      setIsVisible(true);

      const dist = Math.hypot(dx, dy);

      // Rotate rocket face-forward in the direction of movement
      if (dist > 1.5) {
        const angleRad = Math.atan2(dy, dx);
        angleRef.current = angleRad * (180 / Math.PI);
      }
    };

    // Spawn click bursts
    const handleMouseDown = (e: MouseEvent) => {
      // Particle spawning disabled
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // 5. Hover Detection (Expand ring over links/buttons)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest('[role="button"]') !== null ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("input") !== null;

      setIsHovered(!!isInteractive);
    };
    document.addEventListener("mouseover", handleMouseOver);

    // 6. Spring Follower Animation Loop
    let animationFrameId: number;

    const updateLoop = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Interpolate ring position towards mouse with spring stiffness (0.15)
      ringRef.current.x += (mx - ringRef.current.x) * 0.15;
      ringRef.current.y += (my - ringRef.current.y) * 0.15;

      // Interpolate rotation angle smoothly (with 360 wrapping)
      let diff = angleRef.current - currentAngleRef.current;
      while (diff < -180) diff += 360;
      while (diff > 180) diff -= 360;
      currentAngleRef.current += diff * 0.15;

      // Update Cursor DOM positions & rotation
      if (dotDomRef.current) {
        dotDomRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) rotate(${currentAngleRef.current}deg)`;
      }
      if (ringDomRef.current) {
        ringDomRef.current.style.transform = `translate3d(${ringRef.current.x}px, ${ringRef.current.y}px, 0)`;
      }

      // Continuous flame emission (disabled to remove sparkles)

      // Update Canvas Particles
      const canvas = canvasRef.current;
      if (canvas && particlesRef.current.length > 0) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Update and draw sparkles
          particlesRef.current.forEach((p) => {
            p.update();
            p.draw(ctx);
          });

          // Prune dead particles
          particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

          // Clear one final time if list became empty
          if (particlesRef.current.length === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };
    animationFrameId = requestAnimationFrame(updateLoop);

    // Cleanup
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      themeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <>
      {/* Global canvas overlays for trailing sparkles */}
      <canvas
        ref={canvasRef}
        id="custom-cursor-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none z-[99999]"
      />

      {/* Rotating SVG burning-asteroid cursor (Long-Tailed Molten Fireball) */}
      <div
        ref={dotDomRef}
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-16 h-[48px] -ml-8 -mt-[24px] pointer-events-none z-[99999] transition-transform duration-75 ease-out"
        style={{
          transform: "translate3d(-100px, -100px, 0) rotate(0deg)",
        }}
      >
        <svg
          width="64"
          height="48"
          viewBox="-20 -15 40 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: "drop-shadow(0 0 5px #FF3D00) drop-shadow(0 0 11px #FFA726)",
          }}
        >
          <defs>
            <filter id="meteor-fire-warp" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.08 0.15"
                numOctaves="4"
                seed="2"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3.5"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            {/* Realistic fire gradients */}
            <linearGradient id="flameGradientOuter" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FF2D00" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#FF6B1A" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#FFA500" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="flameGradientMid" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FF5500" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#FF8C00" stopOpacity="1" />
              <stop offset="65%" stopColor="#FFB84D" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFEB3B" stopOpacity="0.5" />
            </linearGradient>

            <linearGradient id="flameGradientCore" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FF7722" stopOpacity="1" />
              <stop offset="30%" stopColor="#FFA500" stopOpacity="1" />
              <stop offset="60%" stopColor="#FFD700" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFFF99" stopOpacity="0.6" />
            </linearGradient>

            {/* Radial glow effect for fire */}
            <radialGradient id="fireGlow" cx="50%" cy="70%">
              <stop offset="0%" stopColor="#FFFF99" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g className="meteor-flames" filter="url(#meteor-fire-warp)">
            {/* Background glow aura */}
            <ellipse cx="0" cy="2" rx="16" ry="12" fill="url(#fireGlow)" opacity="0.8" />

            {/* Outer fire shell - deep red/orange base */}
            <path
              className="meteor-flame-outer"
              d="M 11 -7 C 14.5 -4.5, 16 -2, 15.5 1 C 15 3, 13 5, 11 6.5 C 8 8.5, 3 10, -2 10.5 C -8 11, -14 10, -17 7.5 C -19 5, -20 2, -21 0 C -20.5 -2.5, -18 -4, -15 -5 C -12 -6.5, -8 -9, -2 -10 C 2 -11, 7 -10, 11 -7 Z"
              fill="url(#flameGradientOuter)"
              opacity="0.85"
            />

            {/* Outer flame wisps */}
            <path
              className="meteor-flame-outer"
              d="M 14 -4 Q 16 -1, 14 3 Q 12 5, 8 6"
              fill="none"
              stroke="url(#flameGradientOuter)"
              strokeWidth="1.2"
              opacity="0.5"
            />

            <path
              className="meteor-flame-mid"
              d="M -15 -3 Q -18 0, -16 4 Q -13 6, -8 6.5"
              fill="none"
              stroke="url(#flameGradientMid)"
              strokeWidth="1"
              opacity="0.6"
            />
          </g>

          {/* Meteorite Rock Core - Grey/Dark Grey with realistic craters */}
          <defs>
            <radialGradient id="meteorGradient" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#D3D3D3" />
              <stop offset="50%" stopColor="#808080" />
              <stop offset="100%" stopColor="#4A4A4A" />
            </radialGradient>
            <filter id="meteorTexture">
              <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="5" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" />
            </filter>
          </defs>

          {/* Main grey meteorite sphere with crater detail */}
          <path
            d="M 4 -6.5 C 6 -6.5, 8.5 -5.5, 9.8 -3.5 C 11.1 -1.5, 10.8 1.5, 9.5 3.8 C 8.2 6.1, 5.8 6.8, 3.5 6.3 C 1.2 5.8, -1.5 4.5, -2.2 2.2 C -2.9 -0.1, -1.8 -3.5, -0.2 -4.8 C 1.4 -6.1, 2 -6.5, 4 -6.5 Z"
            fill="url(#meteorGradient)"
            opacity="0.95"
            filter="url(#meteorTexture)"
          />

          {/* Impact craters with grey tones */}
          <g opacity="0.8">
            <circle cx="1.5" cy="-2.2" r="1.5" fill="#696969" />
            <circle cx="1.5" cy="-2.2" r="1.3" fill="none" stroke="#505050" strokeWidth="0.3" />
            <circle cx="1.5" cy="-2.2" r="0.8" fill="#404040" opacity="0.9" />
            <circle cx="1.5" cy="-2.2" r="0.4" fill="#A9A9A9" opacity="0.6" />
          </g>

          <g opacity="0.75">
            <circle cx="6.5" cy="2.2" r="1.8" fill="#778899" />
            <circle cx="6.5" cy="2.2" r="1.6" fill="none" stroke="#606060" strokeWidth="0.3" />
            <circle cx="6.5" cy="2.2" r="1.0" fill="#505050" opacity="0.85" />
            <circle cx="6.5" cy="2.2" r="0.5" fill="#909090" opacity="0.7" />
          </g>

          <g opacity="0.7">
            <circle cx="2.0" cy="2.8" r="1.0" fill="#666666" />
            <circle cx="2.0" cy="2.8" r="0.8" fill="none" stroke="#555555" strokeWidth="0.2" />
            <circle cx="2.0" cy="2.8" r="0.5" fill="#383838" opacity="0.8" />
            <circle cx="2.0" cy="2.8" r="0.2" fill="#A0A0A0" opacity="0.5" />
          </g>

          {/* Additional small craters with grey detail */}
          <circle cx="4.5" cy="-4.0" r="0.6" fill="#707070" opacity="0.8" />
          <circle cx="4.5" cy="-4.0" r="0.3" fill="#909090" opacity="0.6" />

          <circle cx="0.2" cy="0.5" r="0.4" fill="#686868" opacity="0.7" />
          <circle cx="0.2" cy="0.5" r="0.2" fill="#989898" opacity="0.5" />

          <circle cx="7.0" cy="-1.5" r="0.5" fill="#757575" opacity="0.75" />
          <circle cx="7.0" cy="-1.5" r="0.25" fill="#A8A8A8" opacity="0.55" />

          {/* Meteorite surface highlights and shadows */}
          <ellipse cx="3.5" cy="-5.0" rx="2.0" ry="1.5" fill="#E0E0E0" opacity="0.2" />
          <path
            d="M 8 -2 Q 7 0, 6 2"
            stroke="#5A5A5A"
            strokeWidth="0.4"
            fill="none"
            opacity="0.6"
          />

          {/* Inner fire glow on meteorite circumference edges */}
          <g className="meteor-flames" filter="url(#meteor-fire-warp)">
            {/* Small flame glow on left edge */}
            <circle cx="-8" cy="0" r="1.2" fill="url(#flameGradientMid)" opacity="0.25" />
            <circle cx="-8" cy="0" r="0.6" fill="url(#flameGradientCore)" opacity="0.4" />

            {/* Small flame glow on bottom-left */}
            <circle cx="-4" cy="5" r="1" fill="url(#flameGradientMid)" opacity="0.2" />
            <circle cx="-4" cy="5" r="0.5" fill="url(#flameGradientCore)" opacity="0.35" />

            {/* Small flame glow on bottom edge */}
            <circle cx="1" cy="6" r="0.9" fill="url(#flameGradientMid)" opacity="0.2" />
            <circle cx="1" cy="6" r="0.45" fill="url(#flameGradientCore)" opacity="0.3" />
          </g>
        </svg>
      </div>
    </>
  );
}
