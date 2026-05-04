"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ProjectsTeaser() {
  return (
    <section
      id="projects"
      className="relative z-20 scroll-mt-20 border-y border-zinc-200/90 bg-zinc-100 px-4 py-16 text-zinc-900 md:px-10 md:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-10 lg:gap-12">
        <div className="min-w-0">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.4em] text-violet-600">
            Projects
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight tracking-tight text-zinc-900 md:text-4xl">
            Work that&apos;s{" "}
            <span className="holo-text">out in the wild</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            Real-world projects built for performance, scalability, and business
            impact.
          </p>
        </div>

        <Link
          href="/projects"
          className="focus-orbit group inline-flex h-fit shrink-0 items-center gap-3 self-start border-2 border-cyan-600 bg-transparent px-8 py-4 font-mono text-xs font-bold tracking-wide text-cyan-700 transition hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(8,145,178,0.18)] md:justify-self-end md:self-start"
        >
          Explore My Work
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
