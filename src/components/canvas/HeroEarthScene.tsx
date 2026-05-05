"use client";

import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { EarthTechLogos } from "./EarthTechLogos";

type Props = {
  reducedMotion: boolean;
};

const ORBIT_SPEED = 0.35;
const EARTH_SPEED = 0.12;

export function HeroEarthScene({ reducedMotion }: Props) {
  const earthRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const satellitesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const satCount = reducedMotion ? 4 : 14;
  const orbitRadius = 2.35;

  const geo = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const satMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#22d3ee",
        emissive: "#7c3aed",
        emissiveIntensity: 0.55,
        metalness: 0.8,
        roughness: 0.25,
      }),
    [],
  );

  const satAngles = useMemo(
    () =>
      Array.from({ length: satCount }, (_, i) => (i / satCount) * Math.PI * 2),
    [satCount],
  );

  useLayoutEffect(() => {
    const mesh = satellitesRef.current;
    if (!mesh) return;
    for (let i = 0; i < satCount; i++) {
      dummy.position.set(orbitRadius, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [satCount, dummy, orbitRadius]);

  useFrame((state, dt) => {
    const rm = reducedMotion ? 0 : 1;
    const t = state.clock.elapsedTime;

    if (earthRef.current) {
      earthRef.current.rotation.y += dt * EARTH_SPEED * rm;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += dt * ORBIT_SPEED * 0.08 * rm;
      ringsRef.current.rotation.x += dt * ORBIT_SPEED * 0.04 * rm;
    }

    const mesh = satellitesRef.current;
    if (!mesh) return;
    for (let i = 0; i < satCount; i++) {
      const base = satAngles[i];
      const a = base + t * (0.45 + (i % 3) * 0.08) * rm;
      const tilt = (i % 5) * 0.35;
      const x = Math.cos(a) * orbitRadius;
      const z = Math.sin(a) * orbitRadius;
      const y = Math.sin(a * 2 + tilt) * 0.35;
      dummy.position.set(x, y, z);
      dummy.rotation.set(t * 0.5 + i, t * 0.3, 0);
      dummy.scale.setScalar(0.06 + (i % 4) * 0.015);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <group position={[1.75, 0.52, 0.2]} scale={1.36}>
        <Float
          speed={reducedMotion ? 0 : 1.2}
          rotationIntensity={0.25}
          floatIntensity={0.35}
        >
          <group ref={earthRef}>
            <mesh castShadow>
              <sphereGeometry args={[1, 48, 48]} />
              <meshStandardMaterial
                color="#102a45"
                metalness={0.42}
                roughness={0.55}
                emissive="#163a5c"
                emissiveIntensity={0.38}
              />
            </mesh>
            <LandPatches reducedMotion={reducedMotion} />
            <mesh>
              <sphereGeometry args={[1.008, 32, 32]} />
              <meshBasicMaterial
                color="#22d3ee"
                wireframe
                transparent
                opacity={0.16}
              />
            </mesh>
            <mesh scale={1.06}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshBasicMaterial
                color="#38bdf8"
                transparent
                opacity={0.12}
                side={THREE.BackSide}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>

          <group ref={ringsRef}>
            <mesh rotation={[Math.PI / 2.4, 0.5, 0.2]}>
              <torusGeometry args={[1.28, 0.006, 8, 96]} />
              <meshBasicMaterial
                color="#7c3aed"
                transparent
                opacity={0.55}
              />
            </mesh>
            <mesh rotation={[Math.PI / 3.2, -0.4, -0.3]}>
              <torusGeometry args={[1.38, 0.005, 8, 96]} />
              <meshBasicMaterial
                color="#22d3ee"
                transparent
                opacity={0.45}
              />
            </mesh>
          </group>

          <Suspense fallback={null}>
            <EarthTechLogos reducedMotion={reducedMotion} />
          </Suspense>
        </Float>

        <instancedMesh
          ref={satellitesRef}
          args={[geo, satMat, satCount]}
          frustumCulled={false}
        />
      </group>

      <group position={[2.35, 0.28, -0.5]}>
        <Sparkles
          count={reducedMotion ? 28 : 72}
          scale={[5.0, 4.45, 4.0]}
          size={0.55}
          speed={reducedMotion ? 0 : 0.18}
          color="#a78bfa"
          opacity={0.11}
        />
      </group>

      <ambientLight intensity={0.48} />
      <directionalLight position={[6, 5.2, 3.2]} intensity={1.15} color="#f1f5f9" />
      <pointLight position={[-2, 3, 4]} intensity={1.45} color="#7c3aed" />
      <pointLight position={[4, -1, 2.5]} intensity={0.95} color="#22d3ee" />

      <TechGrid reducedMotion={reducedMotion} />
    </>
  );
}

function LandPatches({ reducedMotion }: { reducedMotion: boolean }) {
  const patches = useMemo(() => {
    const R = 1.02;
    const raw = [
      { phi: 0.85, theta: 0.9, s: 0.2, c: "#14532d" },
      { phi: 1.9, theta: -0.5, s: 0.16, c: "#166534" },
      { phi: 2.4, theta: 2.2, s: 0.14, c: "#15803d" },
      { phi: 0.4, theta: -2.1, s: 0.11, c: "#14532d" },
    ];
    return raw.map((p) => {
      const x = R * Math.sin(p.phi) * Math.cos(p.theta);
      const y = R * Math.cos(p.phi);
      const z = R * Math.sin(p.phi) * Math.sin(p.theta);
      return { x, y, z, s: p.s, c: p.c };
    });
  }, []);

  return (
    <group>
      {patches.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]} scale={p.s}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshStandardMaterial
            color={p.c}
            roughness={0.85}
            metalness={0.05}
            emissive={p.c}
            emissiveIntensity={reducedMotion ? 0 : 0.14}
          />
        </mesh>
      ))}
    </group>
  );
}

function TechGrid({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <group rotation={[-Math.PI / 2.5, 0, 0.35]} position={[0, -1.58, -1]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14, 24, 24]} />
        <meshStandardMaterial
          color="#06070a"
          wireframe
          transparent
          opacity={0.12}
          emissive="#7c3aed"
          emissiveIntensity={reducedMotion ? 0 : 0.08}
        />
      </mesh>
    </group>
  );
}
