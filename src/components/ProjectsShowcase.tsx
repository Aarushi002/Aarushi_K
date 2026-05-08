"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ExternalLink, Search } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSound } from "@/context/SoundContext";

function projectMatchesQuery(p: Project, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

function categorySectionId(c: ProjectCategory) {
  return `projects-${c.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase()}`;
}

/** Display titles for grouped stacks (filters still use `ProjectCategory`). */
const CATEGORY_SECTION_TITLES: Record<ProjectCategory, string> = {
  "MERN Stack": "MERN & full-stack builds",
  Shopify: "Shopify storefronts",
  "WordPress & WooCommerce": "WordPress & WooCommerce sites",
};

export function ProjectsShowcase() {
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Project | null>(null);
  const reduced = useReducedMotion();
  const { playTick } = useSound();

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const catOk = category === "all" || p.category === category;
      return catOk && projectMatchesQuery(p, query);
    });
  }, [category, query]);

  return (
    <section
      id="projects"
      className="relative z-10 scroll-mt-20 border-t border-zinc-300/80 bg-zinc-100 px-4 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          kicker="Projects"
          title={
            <span className="text-zinc-900">
              Work that&apos;s out in the wild
            </span>
          }
        />

        <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:justify-between">
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Project categories"
          >
            <button
              type="button"
              role="tab"
              aria-selected={category === "all"}
              onClick={() => {
                playTick();
                setCategory("all");
              }}
              className={cn(
                "focus-orbit px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition",
                category === "all"
                  ? "bg-accent-cyan text-base shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                  : "border border-white/10 text-muted hover:text-accent-cyan",
              )}
            >
              All
            </button>
            {projectCategories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={category === c}
                onClick={() => {
                  playTick();
                  setCategory(c);
                }}
                className={cn(
                  "focus-orbit px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition",
                  category === c
                    ? "bg-accent text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                    : "border border-white/10 text-muted hover:text-lavender",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="glass-panel flex min-h-[48px] w-full items-center gap-3 px-4 sm:max-w-md lg:max-w-sm">
            <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by name, tag…"
              className="focus-orbit w-full bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted"
              aria-label="Search projects"
            />
          </label>
        </div>

        {category === "all" ? (
          <div className="mt-14 space-y-14 md:space-y-20">
            {projectCategories.map((cat) => {
              const isShopifySection = cat === "Shopify";
              const isMernSection = cat === "MERN Stack";
              const isWordpressSection = cat === "WordPress & WooCommerce";
              const list = projects.filter(
                (p) => p.category === cat && projectMatchesQuery(p, query),
              );
              if (list.length === 0) return null;
              const sid = categorySectionId(cat);
              return (
                <section
                  key={cat}
                  id={sid}
                  className={cn(
                    "scroll-mt-24 overflow-hidden",
                    (isMernSection || isWordpressSection) &&
                      "rounded-2xl border border-white/10 bg-base p-6 md:p-8",
                    isShopifySection &&
                      "rounded-2xl border border-zinc-300/80 bg-zinc-100 p-6 md:p-8",
                  )}
                  aria-labelledby={`heading-${sid}`}
                >
                  <div
                    className={cn(
                      "border-b border-white/10 pb-3",
                      isShopifySection && "border-zinc-300/90",
                    )}
                  >
                    <h3
                      id={`heading-${sid}`}
                      className={cn(
                        "text-xl font-bold tracking-tight text-foreground md:text-2xl",
                        isShopifySection && "text-zinc-900",
                      )}
                    >
                      {CATEGORY_SECTION_TITLES[cat]}
                    </h3>
                  </div>
                  <ul className="mt-6 grid gap-4 md:grid-cols-2">
                    {list.map((p, i) => (
                      <li key={p.id}>
                        <ProjectCard
                          project={p}
                          index={i}
                          reduced={reduced}
                          onOpen={() => setActive(p)}
                          onHoverSound={playTick}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        ) : (
          <div
            className={cn(
              (category === "MERN Stack" || category === "WordPress & WooCommerce") &&
                "rounded-2xl border border-white/10 bg-base p-6 md:p-8",
              category === "Shopify" && "rounded-2xl border border-zinc-300/80 bg-zinc-100 p-6 md:p-8",
            )}
          >
            <ul
              className={cn(
                "mt-10 grid gap-4 md:mt-14 md:grid-cols-2",
                (category === "MERN Stack" ||
                  category === "WordPress & WooCommerce" ||
                  category === "Shopify") &&
                  "mt-0",
              )}
            >
              {filtered.map((p, i) => (
                <li key={p.id}>
                  <ProjectCard
                    project={p}
                    index={i}
                    reduced={reduced}
                    onOpen={() => setActive(p)}
                    onHoverSound={playTick}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted">
            Nothing matches — try a different keyword or category.
          </p>
        ) : null}
      </div>

      <ProjectModal
        project={active}
        onClose={() => setActive(null)}
        reduced={reduced}
      />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  reduced,
  onOpen,
  onHoverSound,
}: {
  project: Project;
  index: number;
  reduced: boolean;
  onOpen: () => void;
  onHoverSound: () => void;
}) {
  const isShopify = project.category === "Shopify";
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const transform = useMotionTemplate`perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(py * -8);
    ry.set(px * 10);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        delay: reduced ? 0 : index * 0.04,
        duration: reduced ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transform, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onHoverSound}
      className={cn(
        "surface-card relative h-full border border-white/10 p-6 transition-colors hover:border-accent-cyan/50",
        isShopify &&
          "!border-zinc-300/90 !bg-zinc-100 text-zinc-900 hover:!border-cyan-700/45",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={cn(
              "font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted",
              isShopify && "text-zinc-600",
            )}
          >
            {project.category}
          </p>
          <h3
            className={cn(
              "mt-2 text-lg font-bold text-foreground md:text-xl",
              isShopify && "text-zinc-900",
            )}
          >
            {project.title}
          </h3>
        </div>
        <span className="shrink-0 bg-gradient-to-r from-accent to-accent-cyan px-2 py-1 font-mono text-[10px] font-bold uppercase text-white">
          Live
        </span>
      </div>
      <p
        className={cn(
          "mt-4 text-sm leading-relaxed text-muted",
          isShopify && "text-zinc-700",
        )}
      >
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className={cn(
              "border border-white/10 bg-base px-2 py-1 font-mono text-[10px] text-sky",
              isShopify && "border-zinc-300 bg-white text-cyan-700",
            )}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onOpen}
          className="focus-orbit border-2 border-lavender bg-transparent px-4 py-2 text-xs font-bold uppercase tracking-wider text-lavender hover:bg-lavender/10"
        >
          Details
        </button>
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer noopener"
          className="focus-orbit inline-flex items-center gap-2 bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:bg-accent-cyan hover:text-base"
        >
          View
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </motion.div>
  );
}

function ProjectModal({
  project,
  onClose,
  reduced,
}: {
  project: Project | null;
  onClose: () => void;
  reduced: boolean;
}) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 px-4 py-10 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: reduced ? 1 : 0.96, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="glass-panel glow-ring max-h-[90vh] w-full max-w-lg overflow-y-auto p-6 md:p-8"
          >
            <div className="mb-4 h-1 w-16 bg-gradient-to-r from-accent to-accent-cyan" aria-hidden />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">
              {project.category}
            </p>
            <h2
              id="project-modal-title"
              className="mt-2 text-2xl font-bold text-foreground"
            >
              {project.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="border border-white/10 px-2 py-1 font-mono text-[11px] text-accent-cyan"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="focus-orbit border border-white/20 px-4 py-2 text-sm font-semibold text-foreground hover:border-accent-cyan"
                onClick={onClose}
              >
                Close
              </button>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-orbit inline-flex items-center gap-2 bg-accent px-5 py-2 text-sm font-bold text-white hover:bg-accent-cyan hover:text-base"
              >
                View Project
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
