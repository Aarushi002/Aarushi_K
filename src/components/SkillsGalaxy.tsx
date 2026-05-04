"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { skillGroups, type SkillGroupId } from "@/data/skills";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSound } from "@/context/SoundContext";

const TABS: { id: SkillGroupId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "tech-stack", label: "Stack" },
  { id: "languages", label: "Lang" },
  { id: "tools", label: "Tools" },
  { id: "concepts", label: "Concepts" },
  { id: "styling", label: "UI" },
  { id: "exploring", label: "Next" },
];

export function SkillsGalaxy() {
  const [filter, setFilter] = useState<SkillGroupId | "all">("all");
  const reduced = useReducedMotion();
  const { playTick } = useSound();

  const visible = useMemo(() => {
    if (filter === "all") {
      const seen = new Set<string>();
      return skillGroups.flatMap((g) => g.skills).filter((s) => {
        if (seen.has(s.name)) return false;
        seen.add(s.name);
        return true;
      });
    }
    return skillGroups.find((g) => g.id === filter)?.skills ?? [];
  }, [filter]);

  return (
    <section
      id="skills"
      className="section-band-cool relative z-10 scroll-mt-20 px-4 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Skills"
          title={
            <>
              Tools I <span className="holo-text">actually use</span>
            </>
          }
          description="Dense grid — hover a chip for the one-line blurb (browser tooltip)."
        />

        <div
          className="mt-8 flex flex-wrap gap-1.5 md:mt-10"
          role="tablist"
          aria-label="Skill filters"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={filter === t.id}
              onClick={() => {
                playTick();
                setFilter(t.id);
              }}
              className={cn(
                "focus-orbit rounded-md px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider transition md:text-[11px]",
                filter === t.id
                  ? "bg-accent text-white shadow-[0_0_14px_rgba(124,58,237,0.35)]"
                  : "border border-white/10 bg-base/80 text-muted hover:border-accent-cyan/35 hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <motion.div layout className="relative mt-6 md:mt-8" aria-live="polite">
          <motion.ul
            layout
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((skill, i) => (
                <motion.li
                  key={skill.name}
                  layout
                  initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: reduced ? 0 : 0.18,
                    delay: reduced ? 0 : Math.min(i * 0.012, 0.15),
                  }}
                >
                  <button
                    type="button"
                    title={skill.description}
                    aria-label={`${skill.name}: ${skill.description}`}
                    className={cn(
                      "group flex w-full items-center gap-2 rounded-lg border border-white/[0.08] bg-base/60 px-2.5 py-2 text-left transition",
                      "hover:border-accent/40 hover:bg-surface/90 hover:shadow-[0_0_0_1px_rgba(124,58,237,0.15)]",
                      "focus-orbit active:scale-[0.98]",
                    )}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-raised ring-1 ring-white/[0.06] transition group-hover:ring-accent/30">
                      <skill.icon
                        className="h-3.5 w-3.5 text-lavender group-hover:text-accent-cyan"
                        aria-hidden
                      />
                    </span>
                    <span className="min-w-0 truncate text-[11px] font-semibold leading-tight text-foreground md:text-xs">
                      {skill.name}
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
