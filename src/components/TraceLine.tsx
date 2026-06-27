"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

type PoseType = "swing" | "walk1" | "walk2" | "sit";

// Large, highly colorful chibi adventurer pixel character
function PixelCharacter({ pose }: { pose: PoseType }) {
  // Vibrant, distinct colors for clear body and clothing definition
  const capColor = "fill-red-500";        // Red Cap
  const hairColor = "fill-[#6B4226]";      // Brown Hair
  const skinColor = "fill-[#FDBA74]";      // Peach Skin
  const eyeColor = "fill-zinc-950";        // Black Eye
  const cheekColor = "fill-pink-400";      // Pink Rosy Cheeks
  const shirtColor = "fill-amber-400";     // Yellow Shirt
  const shirtDarkColor = "fill-amber-600"; // Dark Yellow Shirt (back arm depth)
  const overallColor = "fill-blue-600";    // Blue Overalls
  const overallDarkColor = "fill-blue-800"; // Darker Blue Overalls (back leg depth)
  const buttonColor = "fill-amber-300";    // Yellow overall buttons
  const shoeColor = "fill-[#4A2E1B]";      // Brown Shoes
  const shoeDarkColor = "fill-[#301C10]";  // Darker Brown Shoes (back shoe depth)

  // Swing Pose (Holding onto the pole on the left, body facing right)
  const swingPixels = [
    // Cap
    { x: 5, y: 1, w: 7, h: 2, f: capColor },
    { x: 4, y: 2, w: 9, h: 1, f: capColor },
    // Head / Face
    { x: 4, y: 3, w: 2, h: 3, f: hairColor }, // Hair back
    { x: 6, y: 3, w: 5, h: 3, f: skinColor }, // Face
    { x: 9, y: 3, w: 1, h: 2, f: eyeColor },  // Large cute eye
    { x: 8, y: 5, w: 1, h: 1, f: cheekColor }, // Pink cheek
    { x: 11, y: 4, w: 1, h: 1, f: skinColor }, // Nose
    { x: 5, y: 5, w: 1, h: 1, f: hairColor }, // Sideburns
    // Torso (Shirt & Overalls)
    { x: 5, y: 6, w: 5, h: 1, f: shirtColor }, // Yellow Shirt collar
    { x: 5, y: 7, w: 5, h: 4, f: overallColor }, // Blue Overalls
    { x: 6, y: 8, w: 1, h: 1, f: buttonColor }, // Overall button
    // Left Arm holding pole (extends left to x=0)
    { x: 0, y: 5, w: 5, h: 1, f: shirtColor },
    { x: 0, y: 3, w: 1, h: 2, f: overallColor }, // Hand at x=0
    // Right Arm dangling
    { x: 9, y: 7, w: 2, h: 3, f: shirtColor },
    // Legs bent backward swinging
    { x: 3, y: 11, w: 2, h: 2, f: overallColor },
    { x: 5, y: 11, w: 2, h: 2, f: overallColor },
    { x: 2, y: 12, w: 2, h: 1, f: shoeColor },
    { x: 4, y: 13, w: 2, h: 1, f: shoeColor },
  ];

  // Walk Stride 1 (Left leg back/dark, right leg front/light; left arm back/dark, right arm front/light)
  const walk1Pixels = [
    // Cap
    { x: 5, y: 1, w: 7, h: 2, f: capColor },
    { x: 4, y: 2, w: 9, h: 1, f: capColor },
    // Head / Face
    { x: 4, y: 3, w: 2, h: 3, f: hairColor },
    { x: 6, y: 3, w: 5, h: 3, f: skinColor },
    { x: 8, y: 3, w: 1, h: 2, f: eyeColor },
    { x: 7, y: 5, w: 1, h: 1, f: cheekColor },
    { x: 10, y: 4, w: 1, h: 1, f: skinColor },
    { x: 5, y: 5, w: 1, h: 1, f: hairColor },
    // Torso
    { x: 5, y: 6, w: 5, h: 1, f: shirtColor },
    { x: 5, y: 7, w: 5, h: 4, f: overallColor },
    { x: 6, y: 8, w: 1, h: 1, f: buttonColor },
    // Left Arm swinging back (back arm)
    { x: 3, y: 7, w: 2, h: 3, f: shirtDarkColor },
    // Right Arm swinging forward (front arm)
    { x: 9, y: 7, w: 2, h: 2, f: shirtColor },
    
    // Legs: Striding (Left leg back, right leg front)
    { x: 3, y: 11, w: 2, h: 2, f: overallDarkColor },  // Back leg
    { x: 7, y: 11, w: 2, h: 2, f: overallColor },      // Front leg
    { x: 2, y: 13, w: 2, h: 1, f: shoeDarkColor },      // Back shoe
    { x: 8, y: 13, w: 2, h: 1, f: shoeColor },          // Front shoe
  ];

  // Walk Stride 2 (Left leg front/light, right leg back/dark & lifted; left arm front/light, right arm back/dark)
  const walk2Pixels = [
    // Cap
    { x: 5, y: 1, w: 7, h: 2, f: capColor },
    { x: 4, y: 2, w: 9, h: 1, f: capColor },
    // Head / Face
    { x: 4, y: 3, w: 2, h: 3, f: hairColor },
    { x: 6, y: 3, w: 5, h: 3, f: skinColor },
    { x: 8, y: 3, w: 1, h: 2, f: eyeColor },
    { x: 7, y: 5, w: 1, h: 1, f: cheekColor },
    { x: 10, y: 4, w: 1, h: 1, f: skinColor },
    { x: 5, y: 5, w: 1, h: 1, f: hairColor },
    // Torso
    { x: 5, y: 6, w: 5, h: 1, f: shirtColor },
    { x: 5, y: 7, w: 5, h: 4, f: overallColor },
    { x: 6, y: 8, w: 1, h: 1, f: buttonColor },
    // Left Arm swinging forward (front arm)
    { x: 9, y: 7, w: 2, h: 3, f: shirtColor },
    // Right Arm swinging back (back arm)
    { x: 3, y: 7, w: 2, h: 2, f: shirtDarkColor },
    
    // Legs: Alternating & Lifted (Left leg front, right leg back and lifted)
    { x: 5, y: 11, w: 2, h: 2, f: overallColor },      // Front leg (supporting)
    { x: 8, y: 10, w: 2, h: 2, f: overallDarkColor },  // Back leg (lifted)
    { x: 4, y: 13, w: 2, h: 1, f: shoeColor },          // Front shoe
    { x: 8, y: 12, w: 2, h: 1, f: shoeDarkColor },      // Back shoe (lifted)
  ];

  const sitPixels = [
    // Cap (facing forward)
    { x: 4, y: 2, w: 8, h: 2, f: capColor },
    { x: 3, y: 3, w: 10, h: 1, f: capColor },
    // Head / Face
    { x: 3, y: 4, w: 1, h: 3, f: hairColor },
    { x: 12, y: 4, w: 1, h: 3, f: hairColor },
    { x: 4, y: 4, w: 8, h: 3, f: skinColor },
    { x: 5, y: 4, w: 1, h: 2, f: eyeColor },    // Left Eye
    { x: 10, y: 4, w: 1, h: 2, f: eyeColor },   // Right Eye
    { x: 4, y: 5, w: 1, h: 1, f: cheekColor },  // Left pink cheek
    { x: 11, y: 5, w: 1, h: 1, f: cheekColor }, // Right pink cheek
    { x: 7, y: 6, w: 2, h: 1, f: eyeColor },    // Smiling mouth
    // Torso
    { x: 4, y: 7, w: 8, h: 1, f: shirtColor },  // Yellow Shirt
    { x: 4, y: 8, w: 8, h: 3, f: overallColor }, // Blue overalls
    { x: 5, y: 8, w: 1, h: 1, f: buttonColor },
    { x: 10, y: 8, w: 1, h: 1, f: buttonColor },
    // Left Arm resting
    { x: 2, y: 8, w: 2, h: 2, f: shirtColor },
    // Right Arm resting
    { x: 12, y: 8, w: 2, h: 2, f: shirtColor },
    // Legs sitting forward
    { x: 3, y: 11, w: 10, h: 2, f: overallColor },
    { x: 2, y: 13, w: 3, h: 1, f: shoeColor },
    { x: 11, y: 13, w: 3, h: 1, f: shoeColor },
  ];

  const getPixels = () => {
    switch (pose) {
      case "walk1": return walk1Pixels;
      case "walk2": return walk2Pixels;
      case "sit": return sitPixels;
      default: return swingPixels;
    }
  };

  return (
    <svg
      width="72"
      height="96"
      viewBox="0 0 16 16"
      className="drop-shadow-xl transition-all duration-300"
    >
      {getPixels().map((pixel, i) => (
        <rect
          key={i}
          x={pixel.x}
          y={pixel.y}
          width={pixel.w}
          height={pixel.h}
          className={`${pixel.f} transition-colors duration-300`}
        />
      ))}
    </svg>
  );
}

export default function TraceLine() {
  const { scrollYProgress } = useScroll();
  const [pose, setPose] = useState<PoseType>("swing");
  const [isFlipped, setIsFlipped] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Smooth scroll progress
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Slide down the pole (0% to 100% of height) from 0 to 97% scroll progress
  const topPos = useTransform(scrollYProgress, [0, 0.97, 1.0], ["0%", "100%", "100%"]);
  
  // Total Horizontal position (X) combining:
  // 1. 3D orbit around the pole when sliding down (Math.sin(theta) * 28px)
  // 2. Walking horizontal translation (0px to 72vw) from 97% to 100% scroll progress
  const xPos = useTransform(scrollYProgress, (p) => {
    if (p < 0.97) {
      const theta = p * 75; // frequency of circular rotation
      return `${Math.sin(theta) * 24}px`; // orbit radius 24px
    } else {
      const walkProgress = (p - 0.97) / 0.03; // normalizes progress between 0 and 1
      return `calc(${walkProgress * 72}vw)`;
    }
  });

  // Dynamic Z-Index to place character in front of or behind the pole line
  // Pole has z-index of 20 (defined below). When Cosine is positive, character goes in front (z-30). When negative, goes behind (z-10).
  const zIndex = useTransform(scrollYProgress, (p) => {
    if (p >= 0.97) return 30; // always in front of everything while walking/sitting
    const theta = p * 75;
    return Math.cos(theta) >= 0 ? 30 : 10;
  });

  // Dynamic Scale representing 3D perspective depth during orbit (kept constant 1 to prevent shrinking as requested)
  const charScale = useTransform(scrollYProgress, (p) => {
    return 1;
  });

  // Dynamic rotation: swings on the pole while sliding
  const rotatePos = useTransform(scrollYProgress, (p) => {
    if (p >= 0.97) return 0;
    const theta = p * 75;
    // Rotate character slightly in the direction of the horizontal swing
    return Math.cos(theta) * 12;
  });

  // Bobbing animation for walking strides (bob up/down by 8px)
  const bobY = useTransform(scrollYProgress, (p) => {
    if (p >= 0.97 && p < 0.99) {
      return Math.abs(Math.sin(p * 180)) * -8;
    }
    return 0;
  });

  // Vertical offset: center-aligned during slide, feet-aligned (87.5%) when walking/sitting on the footer floor
  const yOffset = useTransform(scrollYProgress, (p) => {
    if (p < 0.97) return "-50%";
    if (p < 0.98) {
      const t = (p - 0.97) / 0.01;
      return `${-50 - t * 37.5}%`;
    }
    return "-87.5%";
  });

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.97) {
        setPose("swing");
        const theta = latest * 75;
        setIsFlipped(Math.sin(theta) < 0);
      } else if (latest >= 0.99) {
        setPose("sit");
        setIsFlipped(false);
      } else {
        const walkCycle = Math.floor(latest * 180) % 2;
        setPose(walkCycle === 0 ? "walk1" : "walk2");
        setIsFlipped(false);
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  if (!mounted) return null;

  return (
    /* Stretches down to exactly above the footer (approx 115px tall) */
    <div className="absolute left-6 md:left-12 lg:left-24 top-[220px] bottom-[115px] w-8 pointer-events-none z-20 hidden md:block">
      {/* Background slide pole (Z-INDEX: 20) */}
      <div className="absolute top-0 bottom-0 left-[15px] w-[2px] bg-zinc-200 dark:bg-zinc-800/80 transition-colors duration-300 z-20" />

      {/* Scrolling active progress on the pole (Z-INDEX: 20) */}
      <motion.div
        className="absolute top-0 left-[15px] w-[2px] bg-accent-custom origin-top z-20"
        style={{ scaleY, height: "100%" }}
      />

      {/* swinging/walking character container (Dynamic Z-Index) */}
      <motion.div
        className="absolute w-[72px] h-[96px] select-none"
        style={{
          top: topPos,
          x: xPos,
          zIndex: zIndex,
          scale: charScale,
          scaleX: isFlipped ? -1 : 1,
          rotate: rotatePos,
          y: yOffset,
          left: isFlipped ? "-34px" : "-10px", 
        }}
      >
        {/* Bobbing sub-container for walking stride realism */}
        <motion.div style={{ y: bobY }}>
          <PixelCharacter pose={pose} />
        </motion.div>
      </motion.div>
    </div>
  );
}
