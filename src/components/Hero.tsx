"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { ArrowDownRight, Laptop } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { MagneticButton } from "@/components/MagneticButton";
import { hireMeConfettiClick, hireMeConfettiHover } from "@/lib/hireMeConfetti";
import { scrollToSection } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSound } from "@/context/SoundContext";

const HeroBackdrop = dynamic(
  () =>
    import("@/components/canvas/HeroBackdrop").then((m) => ({
      default: m.HeroBackdrop,
    })),
  { ssr: false },
);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { playTick } = useSound();

  useLayoutEffect(() => {
    if (!root.current) return;
    const q = gsap.utils.selector(root);

    const resetVisible = () => {
      gsap.set(
        [
          q(".hero-eyebrow"),
          q(".hero-title span"),
          q(".hero-sub"),
          q(".hero-tag"),
          q(".hero-cta"),
          q(".hero-scroll"),
        ],
        { opacity: 1, y: 0, clearProps: "opacity,transform" },
      );
    };

    if (reduced) {
      resetVisible();
      return;
    }

    resetVisible();
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(q(".hero-eyebrow"), { y: 24, opacity: 0, duration: 0.7 }, 0);
    tl.from(
      q(".hero-title span"),
      { y: 55, opacity: 0, stagger: 0.06, duration: 0.9, immediateRender: false },
      0.12,
    );
    tl.from(q(".hero-sub"), { y: 28, opacity: 0, duration: 0.75 }, 0.35);
    tl.from(q(".hero-tag"), { y: 20, opacity: 0, duration: 0.65 }, 0.45);
    tl.from(q(".hero-cta"), { y: 22, opacity: 0, stagger: 0.1, duration: 0.6 }, 0.55);
    tl.from(q(".hero-scroll"), { opacity: 0, y: 10, duration: 0.6 }, 0.75);
    return () => {
      tl.kill();
      resetVisible();
    };
  }, [reduced]);

  return (
    <section
      ref={root}
      id="home"
      className="relative z-10 flex min-h-0 flex-1 scroll-mt-20 flex-col justify-center px-4 pb-14 pt-10 sm:px-6 md:px-10 md:pb-22 md:pt-12"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -top-24 z-0 overflow-hidden md:-top-32"
        aria-hidden
      >
        <HeroBackdrop />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-base from-35% via-base/40 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center">
      <div className="pointer-events-none absolute left-0 top-1/3 hidden h-px w-24 bg-gradient-to-r from-accent to-accent-cyan sm:block md:w-40" />

      <div className="mx-auto w-full max-w-5xl min-w-0 -translate-y-4 flex flex-col gap-6 sm:-translate-y-6 sm:gap-7 md:-translate-x-6 md:-translate-y-10 md:gap-8 lg:-translate-x-12 lg:-translate-y-14">
        <p className="hero-eyebrow flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] font-semibold uppercase leading-snug text-muted sm:text-xs sm:gap-x-3 sm:tracking-[0.26em] md:tracking-[0.34em] lg:tracking-[0.4em]">
          <Laptop
            className="h-3.5 w-3.5 shrink-0 text-accent-cyan sm:h-4 sm:w-4"
            strokeWidth={2.1}
            aria-hidden
          />
          <span className="w-full min-w-0 max-w-full sm:w-auto">
            Sole Proprietor · Full-Stack Developer · Freelancer
          </span>
        </p>

        <h1 className="hero-title max-w-4xl text-[2.2rem] font-bold leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          <span className="inline-block">Hi,</span>{" "}
          <span className="inline-block">I&apos;m</span>{" "}
          <span className="inline-block holo-text">Aarushi Krishna</span>
        </h1>

        <p className="hero-sub max-w-2xl text-lg font-medium leading-snug text-foreground/90 sm:text-xl md:text-2xl md:leading-relaxed">
          Crafting clean, efficient, and impactful digital solutions.
        </p>

        <p className="hero-tag max-w-xl border-l-4 border-accent pl-4 font-mono text-sm font-medium text-muted sm:pl-5 md:text-base">
          Code. Debug. Repeat. Occasionally sleep.
        </p>

        <div className="hero-cta flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <MagneticButton
            type="button"
            strength={0.22}
            onClick={() => {
              playTick();
              window.location.assign("/projects");
            }}
            className="focus-orbit inline-flex w-full items-center justify-center bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_32px_rgba(124,58,237,0.45)] transition hover:bg-lavender hover:shadow-[0_0_36px_rgba(34,211,238,0.25)] sm:w-auto sm:px-10 sm:py-4 sm:text-sm sm:tracking-widest"
          >
            Explore work
          </MagneticButton>
          <MagneticButton
            type="button"
            strength={0.18}
            onMouseEnter={hireMeConfettiHover}
            onClick={(e) => {
              hireMeConfettiClick(e);
              playTick();
              scrollToSection("contact");
            }}
            className="focus-orbit inline-flex w-full items-center justify-center border-2 border-accent-cyan bg-transparent px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-cyan transition hover:bg-accent-cyan/10 hover:shadow-[0_0_24px_rgba(34,211,238,0.2)] sm:w-auto sm:px-10 sm:py-4 sm:text-sm sm:tracking-widest"
          >
            Hire me
          </MagneticButton>
        </div>
      </div>

      <button
        type="button"
        className="hero-scroll focus-orbit group absolute bottom-4 left-4 text-muted sm:bottom-5 sm:left-6 md:bottom-6 md:left-10"
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to about section"
      >
        <span className="flex h-12 w-12 items-center justify-center border border-white/10 transition group-hover:border-accent-cyan group-hover:text-accent-cyan">
          <ArrowDownRight className="h-5 w-5" aria-hidden />
        </span>
      </button>
      </div>
    </section>
  );
}
