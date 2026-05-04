import gsap from "gsap";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function safeGsapTo(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars,
  reduced: boolean,
) {
  if (reduced) {
    gsap.set(targets, { clearProps: "all" });
    return gsap.to(targets, { ...vars, duration: 0.01 });
  }
  return gsap.to(targets, vars);
}

export function safeGsapFromTo(
  targets: gsap.TweenTarget,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  reduced: boolean,
) {
  if (reduced) {
    gsap.set(targets, { ...toVars, duration: undefined, delay: undefined });
    return null;
  }
  return gsap.fromTo(targets, fromVars, toVars);
}
