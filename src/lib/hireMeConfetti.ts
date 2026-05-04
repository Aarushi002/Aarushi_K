import confetti from "canvas-confetti";
import type { MouseEvent } from "react";

const colors = ["#7c3aed", "#22d3ee", "#a78bfa", "#38bdf8", "#e5e7eb"];

function origin(e: { clientX: number; clientY: number }) {
  return {
    x: e.clientX / window.innerWidth,
    y: e.clientY / window.innerHeight,
  };
}

function allowMotion() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let lastHover = 0;
const hoverCooldownMs = 800;

export function hireMeConfettiHover(e: MouseEvent) {
  if (!allowMotion()) return;
  const now = Date.now();
  if (now - lastHover < hoverCooldownMs) return;
  lastHover = now;
  void confetti({
    particleCount: 28,
    spread: 56,
    startVelocity: 18,
    ticks: 130,
    gravity: 1,
    scalar: 0.85,
    origin: origin(e.nativeEvent),
    colors,
  });
}

export function hireMeConfettiClick(e: MouseEvent) {
  if (!allowMotion()) return;
  const o = origin(e.nativeEvent);
  void confetti({
    particleCount: 58,
    spread: 70,
    startVelocity: 28,
    ticks: 220,
    gravity: 0.95,
    scalar: 1,
    origin: o,
    colors,
  });
  window.setTimeout(() => {
    void confetti({
      particleCount: 42,
      spread: 105,
      startVelocity: 24,
      ticks: 170,
      gravity: 1,
      scalar: 0.92,
      origin: { x: o.x, y: Math.min(0.94, o.y + 0.035) },
      colors,
    });
  }, 130);
}
