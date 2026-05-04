"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { subscribeMq } from "@/lib/subscribeMq";

const TRAIL_LEN = 14;

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: 0.2 });
  const trailRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq) return;
    const update = () => setEnabled(mq.matches && !reduced);
    update();
    return subscribeMq(mq, update);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      trailRef.current.unshift({ x: e.clientX, y: e.clientY });
      trailRef.current = trailRef.current.slice(0, TRAIL_LEN);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {Array.from({ length: TRAIL_LEN - 2 }).map((_, i) => (
        <TrailParticle key={i} index={i + 2} trailRef={trailRef} />
      ))}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90]"
        style={{ x: sx, y: sy }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div className="h-4 w-4 border-2 border-accent-cyan bg-accent shadow-[0_0_18px_rgba(124,58,237,0.55)]" />
        </div>
      </motion.div>
    </>
  );
}

function TrailParticle({
  index,
  trailRef,
}: {
  index: number;
  trailRef: React.MutableRefObject<{ x: number; y: number }[]>;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300 - index * 12, damping: 26 });
  const sy = useSpring(y, { stiffness: 300 - index * 12, damping: 26 });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const pt = trailRef.current[index];
      if (pt) {
        x.set(pt.x);
        y.set(pt.y);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, trailRef, x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[88]"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <div
        className="bg-accent-cyan/50"
        style={{
          width: Math.max(2, 6 - index * 0.3),
          height: Math.max(2, 6 - index * 0.3),
          opacity: Math.max(0.05, 0.4 - index * 0.03),
        }}
      />
    </motion.div>
  );
}

export function CustomCursorBodyClass({ active }: { active: boolean }) {
  useEffect(() => {
    if (active) document.body.classList.add("custom-cursor-on");
    else document.body.classList.remove("custom-cursor-on");
    return () => document.body.classList.remove("custom-cursor-on");
  }, [active]);
  return null;
}
