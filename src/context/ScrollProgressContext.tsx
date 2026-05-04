"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type ScrollProgressContextValue = {
  progress: number;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
};

const ScrollProgressContext = createContext<ScrollProgressContextValue | null>(
  null,
);

export function ScrollProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current = { x, y };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (reduced) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        setProgress(Math.min(1, Math.max(0, p)));
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const trigger = document.body ?? document.documentElement;
    const st = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.65,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => st.kill();
  }, [reduced]);

  const value = useMemo(
    () => ({ progress, mouseRef }),
    [progress],
  );

  return (
    <ScrollProgressContext.Provider value={value}>
      {children}
    </ScrollProgressContext.Provider>
  );
}

export function useScrollProgress() {
  const ctx = useContext(ScrollProgressContext);
  if (!ctx) {
    throw new Error("useScrollProgress must be used within ScrollProgressProvider");
  }
  return ctx;
}
