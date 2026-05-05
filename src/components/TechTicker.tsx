"use client";

import { techTickerLabels } from "@/data/techTicker";

export function TechTicker() {
  const strip = [...techTickerLabels, ...techTickerLabels];

  return (
    <section
      className="relative z-[9] mt-auto shrink-0 -mt-2 border-y border-white/[0.07] bg-raised/95 py-3.5 backdrop-blur-sm md:-mt-3 md:py-4"
      aria-label="Technologies: HTML through Angular"
    >
      <div className="overflow-hidden" aria-hidden>
        <div className="tech-ticker-track tech-ticker-track--ltr font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-muted md:text-xs md:tracking-[0.32em]">
          {strip.map((label, i) => (
            <span key={`${label}-${i}`} className="flex shrink-0 items-center gap-2">
              <span className="text-foreground/85">{label}</span>
              <span className="text-accent/90" aria-hidden>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
