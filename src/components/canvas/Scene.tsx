"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { useScrollProgress } from "@/context/ScrollProgressContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CodeParticles, FloatingCodeLabels } from "./CodeParticles";
import { FloatingLaptop } from "./FloatingLaptop";
import { SkillPlanets } from "./SkillPlanets";

export function SceneContent({ skillPlanetCount }: { skillPlanetCount: number }) {
  const { progress, mouseRef } = useScrollProgress();
  const reduced = useReducedMotion();
  const { camera } = useThree();

  const camTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const p = progress;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const rm = reduced ? 0 : 1;

    const z = THREE.MathUtils.lerp(5.2, -2.8, p);
    const y = THREE.MathUtils.lerp(0.35, -0.15, p) + my * 0.25 * rm;
    const x = mx * 0.55 * rm * (1 - p * 0.4);

    camera.position.lerp(camTarget.set(x, y, z), reduced ? 1 : 0.08);
    camera.lookAt(0, -0.1 + p * 0.2, -1.2 - p * 2);
  });

  const skillsPhase = progress > 0.28 && progress < 0.62;

  return (
    <>
      <color attach="background" args={["#06070a"]} />
      <fog attach="fog" args={["#06070a", 8, 22]} />
      <ambientLight intensity={0.2} color="#e5e7eb" />
      <directionalLight position={[5, 4, 3]} intensity={0.65} color="#e5e7eb" />
      <pointLight position={[-4, 2, 2]} intensity={1.15} color="#7c3aed" />
      <pointLight position={[3, -2, -2]} intensity={0.75} color="#22d3ee" />
      <Stars
        radius={80}
        depth={40}
        count={reduced ? 600 : 1800}
        factor={2.5}
        saturation={0.15}
        fade
        speed={reduced ? 0 : 0.28}
      />
      <FloatingLaptop mouseRef={mouseRef} reducedMotion={reduced} />
      <CodeParticles count={reduced ? 16 : 36} reducedMotion={reduced} />
      <FloatingCodeLabels mouseRef={mouseRef} reducedMotion={reduced} />
      <SkillPlanets
        count={skillPlanetCount}
        reducedMotion={reduced}
        visible={skillsPhase}
      />
      <Environment preset="city" environmentIntensity={0.26} />
    </>
  );
}
