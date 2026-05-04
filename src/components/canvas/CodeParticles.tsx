"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const SNIPPETS = [
  "const orbit = () => {}",
  "<Scene />",
  "db.users.find()",
  "gsap.to('.hero')",
  "use client",
  "await fetch('/api')",
  "tailwind.config",
  "mongoose.model",
];

type Props = {
  count?: number;
  reducedMotion: boolean;
};

export function CodeParticles({ count = 48, reducedMotion }: Props) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geo = useMemo(() => new THREE.BoxGeometry(2.2, 0.22, 0.06), []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#111827",
        emissive: "#7c3aed",
        emissiveIntensity: 0.28,
        metalness: 0.4,
        roughness: 0.45,
        transparent: true,
        opacity: 0.85,
      }),
    [],
  );

  const { positions, phases } = useMemo(() => {
    const hash01 = (n: number) => {
      const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453123;
      return x - Math.floor(x);
    };
    const positions: [number, number, number][] = [];
    const phases: number[] = [];
    for (let i = 0; i < count; i++) {
      const theta = hash01(i * 3) * Math.PI * 2;
      const phi = Math.acos(2 * hash01(i * 3 + 1) - 1);
      const r = 2.2 + hash01(i * 3 + 2) * 4.5;
      positions.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi) * 0.7,
        r * Math.sin(phi) * Math.sin(theta),
      ]);
      phases.push(hash01(i + 99) * Math.PI * 2);
    }
    return { positions, phases };
  }, [count]);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    for (let i = 0; i < count; i++) {
      dummy.position.set(0, 0, 0);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(0.05);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [count, dummy]);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    const speed = reducedMotion ? 0 : 1;

    for (let i = 0; i < count; i++) {
      const [x, y, z] = positions[i];
      const wobble = Math.sin(t * 0.35 * speed + phases[i]) * 0.06 * speed;
      dummy.position.set(x + wobble, y + wobble * 0.5, z);
      dummy.rotation.set(
        t * 0.08 * speed + phases[i],
        t * 0.05 * speed,
        0.1 * Math.sin(t + i),
      );
      const s = 0.04 + (i % 5) * 0.008;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={ref} args={[geo, mat, count]} />;
}

export function FloatingCodeLabels({
  mouseRef,
  reducedMotion,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g || reducedMotion) return;
    const mx = mouseRef.current.x * 0.2;
    const my = mouseRef.current.y * 0.15;
    g.rotation.y = state.clock.elapsedTime * 0.03 + mx;
    g.rotation.x = my * 0.1;
  });

  return (
    <group ref={group}>
      {SNIPPETS.map((text, i) => {
        const angle = (i / SNIPPETS.length) * Math.PI * 2;
        const r = 2.8;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        const y = 0.35 + (i % 3) * 0.25;
        return (
          <mesh
            key={text}
            position={[x, y, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            <planeGeometry args={[1.4, 0.2]} />
            <meshBasicMaterial
              color="#22d3ee"
              transparent
              opacity={0.11}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}
