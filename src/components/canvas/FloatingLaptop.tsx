"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
};

export function FloatingLaptop({ mouseRef, reducedMotion }: Props) {
  const group = useRef<THREE.Group>(null);
  const baseY = useMemo(() => 0, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    if (reducedMotion) {
      g.rotation.x = 0.12;
      g.rotation.y = -0.35;
      g.position.y = baseY;
      return;
    }

    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.12 + my * 0.15, 0.06);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.35 + mx * 0.35, 0.06);
    g.position.y = baseY + Math.sin(t * 0.6) * 0.08;
  });

  return (
    <group ref={group} position={[0, -0.15, 0]} scale={1.15}>
      <mesh castShadow receiveShadow position={[0, -0.05, 0]}>
        <boxGeometry args={[1.45, 0.08, 0.95]} />
        <meshStandardMaterial
          color="#1a1a22"
          metalness={0.85}
          roughness={0.35}
        />
      </mesh>
      <group rotation={[-0.18, 0, 0]} position={[0, 0.06, -0.48]}>
        <mesh castShadow>
          <boxGeometry args={[1.38, 0.06, 0.88]} />
          <meshStandardMaterial
            color="#14141c"
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0, 0.04, 0.02]}>
          <boxGeometry args={[1.22, 0.01, 0.72]} />
          <meshStandardMaterial
            color="#0d1117"
            emissive="#7c3aed"
            emissiveIntensity={0.55}
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
        <mesh position={[0, 0.042, 0.02]}>
          <planeGeometry args={[1.1, 0.58]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
      <mesh position={[0.52, -0.02, 0.32]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.045, 24]} />
        <meshStandardMaterial
          color="#2a2a36"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}
