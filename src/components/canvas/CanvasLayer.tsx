"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { SceneContent } from "./Scene";
import { flattenSkills } from "@/data/skills";

function computeSkillPlanetCount() {
  const skills = flattenSkills("all");
  const unique = new Map<string, boolean>();
  skills.forEach((s) => unique.set(s.name, true));
  return Math.min(32, unique.size + 8);
}

export function CanvasLayer({ onReady }: { onReady?: () => void }) {
  const planets = useMemo(() => computeSkillPlanetCount(), []);

  return (
    <Canvas
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full"
      dpr={[1, 2]}
      gl={{
        alpha: false,
        antialias: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0.35, 5.2], fov: 42, near: 0.1, far: 80 }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        onReady?.();
      }}
    >
      <Suspense fallback={null}>
        <SceneContent skillPlanetCount={planets} />
      </Suspense>
    </Canvas>
  );
}
