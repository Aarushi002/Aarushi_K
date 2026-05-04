"use client";

import { Billboard } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { earthTechLogos } from "./earthLogos";

const PLANE = 0.16;
const MIN_ORBIT_RADIUS = 1.045;
const ORBIT_SEED = 19_487;

function createRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

type OrbitSpec = {
  radius: number;
  speed: number;
  phase: number;
  quatOrbit: THREE.Quaternion;
  precession: number;
  bobAmp: number;
  bobFreq: number;
};

type Props = {
  reducedMotion: boolean;
};

export function EarthTechLogos({ reducedMotion }: Props) {
  const [textures, setTextures] = useState<(THREE.Texture | null)[] | null>(
    null,
  );
  const loadedRef = useRef<THREE.Texture[]>([]);
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  const tmpCircle = useRef(new THREE.Vector3());
  const tmpPos = useRef(new THREE.Vector3());
  const tmpPrecess = useRef(new THREE.Quaternion());
  const tmpEuler = useRef(new THREE.Euler());

  const loader = useMemo(() => {
    const l = new THREE.TextureLoader();
    l.setCrossOrigin("anonymous");
    return l;
  }, []);

  const orbitSpecs = useMemo<OrbitSpec[]>(() => {
    const rand = createRng(ORBIT_SEED);
    return earthTechLogos.map(() => {
      const radius = 1.038 + rand() * 0.005;
      const speed = (0.22 + rand() * 0.52) * (rand() > 0.5 ? 1 : -1);
      const phase = rand() * Math.PI * 2;
      tmpEuler.current.set(
        (rand() - 0.5) * Math.PI * 0.62,
        rand() * Math.PI * 2,
        (rand() - 0.5) * Math.PI * 0.62,
      );
      const quatOrbit = new THREE.Quaternion().setFromEuler(
        tmpEuler.current,
      );
      const precession = (rand() - 0.5) * 0.26;
      const bobAmp = 0.001 + rand() * 0.006;
      const bobFreq = 0.55 + rand() * 1.05;
      return {
        radius,
        speed,
        phase,
        quatOrbit: quatOrbit.clone(),
        precession,
        bobAmp,
        bobFreq,
      };
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadedRef.current.forEach((t) => t.dispose());
    loadedRef.current = [];

    async function loadAll() {
      const out: (THREE.Texture | null)[] = [];
      for (const tech of earthTechLogos) {
        if (cancelled) return;
        try {
          const tex = await loader.loadAsync(tech.url);
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = 8;
          tex.premultiplyAlpha = false;
          tex.needsUpdate = true;
          loadedRef.current.push(tex);
          out.push(tex);
        } catch {
          if (process.env.NODE_ENV === "development") {
            console.warn(`EarthTechLogos: missing ${tech.id}`);
          }
          out.push(null);
        }
      }
      if (!cancelled) setTextures(out);
    }

    void loadAll();

    return () => {
      cancelled = true;
      loadedRef.current.forEach((t) => t.dispose());
      loadedRef.current = [];
    };
  }, [loader]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const rm = reducedMotion ? 0.28 : 1;

    for (let i = 0; i < orbitSpecs.length; i++) {
      const g = groupRefs.current[i];
      if (!g) continue;

      const spec = orbitSpecs[i]!;
      const theta = spec.phase + t * spec.speed * rm;
      const r = spec.radius;

      tmpCircle.current.set(r * Math.cos(theta), r * Math.sin(theta), 0);
      tmpCircle.current.applyQuaternion(spec.quatOrbit);

      tmpPrecess.current.setFromAxisAngle(
        THREE.Object3D.DEFAULT_UP,
        t * spec.precession * rm,
      );
      tmpPos.current.copy(tmpCircle.current).applyQuaternion(tmpPrecess.current);

      const bob =
        Math.sin(t * spec.bobFreq * rm + spec.phase * 1.7) * spec.bobAmp * rm;
      tmpPos.current.y += bob;

      const len = tmpPos.current.length();
      if (len < MIN_ORBIT_RADIUS) {
        tmpPos.current.multiplyScalar(MIN_ORBIT_RADIUS / len);
      }

      g.position.copy(tmpPos.current);
    }
  });

  if (!textures) return null;

  return (
    <group>
      {textures.map((tex, i) => {
        if (!tex) return null;
        return (
          <group
            key={earthTechLogos[i]!.id}
            ref={(el) => {
              groupRefs.current[i] = el;
            }}
          >
            <Billboard follow>
              <mesh renderOrder={10}>
                <planeGeometry args={[PLANE, PLANE]} />
                <meshBasicMaterial
                  map={tex}
                  transparent
                  toneMapped={false}
                  depthWrite={false}
                  alphaTest={0.012}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </Billboard>
          </group>
        );
      })}
    </group>
  );
}
