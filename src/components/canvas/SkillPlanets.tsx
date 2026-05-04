"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  count: number;
  reducedMotion: boolean;
  visible: boolean;
};

export function SkillPlanets({ count, reducedMotion, visible }: Props) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const geo = useMemo(() => new THREE.SphereGeometry(1, 16, 16), []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1e1b4b",
        emissive: "#a78bfa",
        emissiveIntensity: 0.45,
        metalness: 0.25,
        roughness: 0.35,
      }),
    [],
  );

  const layout = useMemo(() => {
    const items: { angle: number; radius: number; height: number }[] = [];
    for (let i = 0; i < count; i++) {
      const layer = Math.floor(i / 8);
      const angle = (i / Math.max(1, count)) * Math.PI * 2 + layer * 0.4;
      const radius = 1.6 + layer * 0.45;
      const height = -1.2 + ((i * 37) % 100) / 100 - layer * 0.15;
      items.push({ angle, radius, height });
    }
    return items;
  }, [count]);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    for (let i = 0; i < count; i++) {
      dummy.position.set(0, 0, 0);
      dummy.scale.setScalar(0.001);
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
    const orbit = visible ? 1 : 0;

    for (let i = 0; i < count; i++) {
      const { angle, radius, height } = layout[i];
      const a = angle + t * 0.12 * speed * orbit;
      const x = Math.cos(a) * radius;
      const z = Math.sin(a) * radius - 2.5;
      dummy.position.set(x, height + Math.sin(t + i) * 0.05 * speed, z);
      const sc = (0.12 + (i % 4) * 0.02) * (0.85 + orbit * 0.15);
      dummy.scale.setScalar(sc * (visible ? 1 : 0.001));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  if (count === 0) return null;

  return <instancedMesh ref={ref} args={[geo, mat, count]} />;
}
