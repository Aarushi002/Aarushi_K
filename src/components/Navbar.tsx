"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Laptop, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { hireMeConfettiClick, hireMeConfettiHover } from "@/lib/hireMeConfetti";
import { scrollToSection } from "@/lib/utils";
import { useSound } from "@/context/SoundContext";
import { SoundToggle } from "@/components/SoundToggle";

const LINKS = [
  { id: "about", label: "About", href: "/#about" },
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "contact", label: "Hire Me", href: "/#contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { playTick } = useSound();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link
          href="/#home"
          onClick={(e) => {
            playTick();
            if (pathname === "/") {
              e.preventDefault();
              window.history.replaceState(null, "", "/#home");
              scrollToSection("home");
            }
          }}
          className="focus-orbit group flex items-center gap-2 text-left sm:gap-2.5"
          aria-label="Welcome to My Portfolio — home"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/55 bg-accent/10 text-accent shadow-[0_0_18px_rgba(124,58,237,0.35)] transition group-hover:border-accent-cyan group-hover:bg-accent-cyan/10 group-hover:text-accent-cyan group-hover:shadow-[0_0_24px_rgba(34,211,238,0.28)] sm:h-10 sm:w-10"
            aria-hidden
          >
            <Laptop
              className="h-[17px] w-[17px] sm:h-[19px] sm:w-[19px]"
              strokeWidth={2.1}
            />
          </span>
          <span className="hidden min-w-0 leading-none sm:inline">
            <span className="text-[11px] font-bold leading-snug tracking-tight text-foreground md:text-xs lg:text-sm">
              Welcome to My Portfolio
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0 md:flex" aria-label="Primary">
          {LINKS.map((l) => {
            const href =
              l.id === "projects" && pathname === "/projects"
                ? "#projects"
                : l.href;
            const base =
              "focus-orbit border-b-2 border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-wider transition hover:border-accent-cyan hover:text-foreground";

            if (l.id === "contact") {
              return (
                <Link
                  key={l.id}
                  href={href}
                  onMouseEnter={hireMeConfettiHover}
                  onClick={(e) => {
                    hireMeConfettiClick(e);
                    playTick();
                  }}
                  className={base}
                >
                  {l.label}
                </Link>
              );
            }

            return (
              <Link
                key={l.id}
                href={href}
                onClick={() => playTick()}
                className={base}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <SoundToggle />
          <button
            type="button"
            className="focus-orbit flex h-10 w-10 items-center justify-center border border-white/10 bg-surface md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col border-t border-white/10 bg-base md:hidden"
          >
            {LINKS.map((l) => {
              const href =
                l.id === "projects" && pathname === "/projects"
                  ? "#projects"
                  : l.href;
              const base =
                "focus-orbit border-b border-white/5 px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide text-muted hover:bg-surface hover:text-accent-cyan";

              if (l.id === "contact") {
                return (
                  <Link
                    key={l.id}
                    href={href}
                    className={base}
                    onMouseEnter={hireMeConfettiHover}
                    onClick={(e) => {
                      hireMeConfettiClick(e);
                      playTick();
                      setOpen(false);
                    }}
                  >
                    {l.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={l.id}
                  href={href}
                  className={base}
                  onClick={() => {
                    playTick();
                    setOpen(false);
                  }}
                >
                  {l.label}
                </Link>
              );
            })}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
