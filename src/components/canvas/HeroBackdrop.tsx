"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { HeroEarthScene } from "./HeroEarthScene";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroBackdrop() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full min-h-0 w-full">
      <Canvas
        className="h-full w-full"
        camera={{ position: [3.8, 1.68, 5.2], fov: 42, near: 0.1, far: 80 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <HeroEarthScene reducedMotion={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
