"use client";

import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  strength: number;
}
interface TrailParticle {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  age: number;
  maxAge: number;
  color: string;
}

const MOON_TEXTURE_PATH = "/textures/moon.jpg";

function configureMoonTexture(texture: THREE.Texture) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

// Build a height map from luminance so crater rims catch light and bowls fall into shadow
function createLuminanceBumpMap(source: THREE.Texture) {
  const image = source.image as HTMLImageElement | HTMLCanvasElement;
  const width = image.width;
  const height = image.height;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.drawImage(image, 0, 0, width, height);
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const lum =
      data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
    data[i] = lum;
    data[i + 1] = lum;
    data[i + 2] = lum;
    data[i + 3] = 255;
  }

  ctx.putImageData(imgData, 0, 0);

  const bump = new THREE.CanvasTexture(canvas);
  bump.wrapS = THREE.RepeatWrapping;
  bump.wrapT = THREE.ClampToEdgeWrapping;
  return bump;
}

function AstroMechanics({ isActive, isDarkMode }: { isActive: boolean; isDarkMode: boolean }) {
  const moonRef = useRef<THREE.Mesh>(null);
  const moonGroupRef = useRef<THREE.Group>(null);
  const trailPointsRef = useRef<THREE.Points>(null);

  // Mouse magic trail tracking
  const trailRef = useRef<TrailParticle[]>([]);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const repulsion = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Track previous coordinates to compute mouse travel speed
  const lastMousePos = useRef(new THREE.Vector3(0, 0, 0));

  const moonColorMap = useLoader(THREE.TextureLoader, MOON_TEXTURE_PATH);
  const moonBumpMap = useMemo(() => {
    configureMoonTexture(moonColorMap);
    return createLuminanceBumpMap(moonColorMap);
  }, [moonColorMap]);

  useEffect(() => {
    return () => {
      moonBumpMap?.dispose();
    };
  }, [moonBumpMap]);

  useFrame((state) => {
    if (!isActive) return;

    const time = state.clock.getElapsedTime();

    // 1. Slowly rotate the moon sphere
    if (moonRef.current) {
      moonRef.current.rotation.y = time * 0.055;
    }

    // 2. Calculate interactive asteroid-moon repulsion (Moon moves away when cursor approaches)
    const mouse3D = new THREE.Vector3(mouse.current.x * 3.5, mouse.current.y * 3.5, 0);
    const moonPos = moonGroupRef.current ? moonGroupRef.current.position : new THREE.Vector3(0, 0, 0);
    const dist = mouse3D.distanceTo(moonPos);

    let targetRepulsion = new THREE.Vector3(0, 0, 0);
    const influenceRadius = 2.8;
    const maxRepulsionDistance = 2.0;

    if (dist < influenceRadius) {
      const dir = new THREE.Vector3().copy(moonPos).sub(mouse3D);
      if (dir.lengthSq() > 0.0001) {
        dir.normalize();
        // Exponential falloff for snappy magnetic repulsion
        const force = Math.pow(1.0 - dist / influenceRadius, 1.5);
        targetRepulsion.copy(dir).multiplyScalar(force * maxRepulsionDistance);
      }
    }
    // Interpolate to get smooth dodges
    repulsion.current.lerp(targetRepulsion, 0.1);

    // 3. Smooth mouse parallax rotation/drift to the moon group, combined with repulsion offsets
    if (moonGroupRef.current) {
      const targetGroupX = THREE.MathUtils.clamp(mouse.current.x * 0.45 + repulsion.current.x, -2.2, 2.2);
      const targetGroupY = THREE.MathUtils.clamp(mouse.current.y * 0.35 + repulsion.current.y, -1.6, 1.6);
      
      moonGroupRef.current.position.x += (targetGroupX - moonGroupRef.current.position.x) * 0.1;
      moonGroupRef.current.position.y += (targetGroupY - moonGroupRef.current.position.y) * 0.1;
      
      // Gentle tilt based on mouse position
      moonGroupRef.current.rotation.y = time * 0.01 + mouse.current.x * 0.25;
      moonGroupRef.current.rotation.x = mouse.current.y * 0.15;
    }

    // 3. Camera Parallax Effect (gently glide based on mouse)
    const targetCamX = mouse.current.x * 0.6;
    const targetCamY = mouse.current.y * 0.4;
    state.camera.position.x += (targetCamX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetCamY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);

    // 4. Track mouse speed and spawn magic trail particles
    const distMoved = mouse3D.distanceTo(lastMousePos.current);
    lastMousePos.current.copy(mouse3D);

    if (distMoved > 0.03 && trailRef.current.length < 180) {
      const spawnCount = Math.min(6, Math.floor(distMoved * 65));
      for (let i = 0; i < spawnCount; i++) {
        trailRef.current.push({
          pos: mouse3D.clone().add(new THREE.Vector3(
            (Math.random() - 0.5) * 0.15,
            (Math.random() - 0.5) * 0.15,
            (Math.random() - 0.5) * 0.15
          )),
          vel: new THREE.Vector3(
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.03
          ),
          age: 0,
          maxAge: 25 + Math.random() * 20,
          color: isDarkMode ? "#FFE082" : "#A77B4A",
        });
      }
    }

    // Update trail particles lifecycle
    trailRef.current.forEach((tp) => {
      tp.pos.add(tp.vel);
      tp.age += 1;
    });
    trailRef.current = trailRef.current.filter((tp) => tp.age < tp.maxAge);

    // Render trail geometry (positions & colors)
    const trailPositions = new Float32Array(trailRef.current.length * 3);
    const trailColors = new Float32Array(trailRef.current.length * 3);

    trailRef.current.forEach((tp, idx) => {
      trailPositions[idx * 3] = tp.pos.x;
      trailPositions[idx * 3 + 1] = tp.pos.y;
      trailPositions[idx * 3 + 2] = tp.pos.z;

      const ratio = tp.age / tp.maxAge;
      const fade = 1.0 - ratio;

      // Golden sparks in dark mode, deeper bronze sparks in light mode
      const r = isDarkMode ? 1.0 : 0.65;
      const g = isDarkMode ? 0.88 : 0.49;
      const b = isDarkMode ? 0.51 : 0.29;

      trailColors[idx * 3] = r * fade;
      trailColors[idx * 3 + 1] = g * fade;
      trailColors[idx * 3 + 2] = b * fade;
    });

    if (trailPointsRef.current) {
      trailPointsRef.current.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(trailPositions, 3)
      );
      trailPointsRef.current.geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(trailColors, 3)
      );
      trailPointsRef.current.geometry.attributes.position.needsUpdate = true;
      trailPointsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 3D Moon Group with Lights */}
      <group ref={moonGroupRef}>
        {/* Upper-left directional light — matches reference terminator */}
        <directionalLight
          position={[-8, 5, 6]}
          intensity={isDarkMode ? 4.8 : 5.2}
          color="#FFFFFF"
        />

        {/* 3D Moon mesh */}
        <mesh ref={moonRef}>
          <sphereGeometry args={[1.8, 96, 96]} />
          <meshStandardMaterial
            map={moonColorMap}
            bumpMap={moonBumpMap ?? undefined}
            bumpScale={0.55}
            roughness={1}
            metalness={0}
            color="#FFFFFF"
          />
        </mesh>

        {/* Subtle rim catch-light — no colored atmosphere tint */}
        <mesh>
          <sphereGeometry args={[1.805, 64, 64]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent={true}
            opacity={isDarkMode ? 0.04 : 0.06}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>
      </group>

      {/* Interactive mouse trail */}
      <points ref={trailPointsRef}>
        <bufferGeometry />
        <pointsMaterial
          vertexColors={true}
          size={0.06}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function CelestialSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    if (!container) return;

    // Reactively observe class toggle changes on html node to capture theme transitions
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // contentVisibility performance observer
    const isCVSupported = "contentVisibility" in document.documentElement.style;

    if (isCVSupported) {
      const handleStateChange = (event: any) => {
        setIsActive(!event.skipped);
      };
      container.addEventListener("contentvisibilityautostatechange", handleStateChange);
      return () => {
        container.removeEventListener("contentvisibilityautostatechange", handleStateChange);
        observer.disconnect();
      };
    } else {
      const nObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsActive(entry.isIntersecting);
          });
        },
        { rootMargin: "200px" }
      );
      nObserver.observe(container);
      return () => {
        nObserver.disconnect();
        observer.disconnect();
      };
    }
  }, []);

  if (!mounted) {
    return (
      <div 
        ref={containerRef}
        className="w-full h-full min-h-[500px] flex items-center justify-center bg-transparent"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="heavy-section relative w-full h-full min-h-[500px] flex items-center justify-center overflow-visible"
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: "auto none auto 500px",
      }}
    >
      {/* Three.js Canvas Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.06} />
          <Suspense fallback={null}>
            <AstroMechanics isActive={isActive} isDarkMode={isDarkMode} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
