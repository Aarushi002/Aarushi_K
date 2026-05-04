"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { scrollToSection } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ACTIONS = [
  { id: "home", label: "Go to Home", hint: "Hero" },
  { id: "about", label: "Go to About", hint: "Intro" },
  { id: "skills", label: "Go to Skills", hint: "Stack" },
  { id: "projects", label: "Go to Projects", hint: "Work" },
  { id: "contact", label: "Go to Contact", hint: "Hire" },
] as const;

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQ("");
    onClose();
  }, [onClose]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ACTIONS;
    return ACTIONS.filter(
      (a) =>
        a.label.toLowerCase().includes(s) ||
        a.hint.toLowerCase().includes(s) ||
        a.id.includes(s),
    );
  }, [q]);

  const run = useCallback(
    (id: string) => {
      if (id === "projects") {
        if (pathname === "/projects") scrollToSection("projects");
        else router.push("/projects");
      } else if (pathname === "/") {
        scrollToSection(id);
      } else if (id === "home") {
        router.push("/#home");
      } else {
        router.push(`/#${id}`);
      }
      handleClose();
    },
    [handleClose, pathname, router],
  );

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-start justify-center bg-black/85 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.05 : 0.15 }}
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: reduced ? 0.05 : 0.2 }}
            className="glass-panel glow-ring w-full max-w-lg overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_12px_rgba(124,58,237,0.8)]" aria-hidden />
              <Search className="h-4 w-4 text-muted" aria-hidden />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Jump to…"
                className="focus-orbit w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
                aria-label="Search commands"
                aria-controls="command-palette-menu"
              />
              <kbd className="hidden border border-white/10 bg-base px-1.5 py-0.5 font-mono text-[10px] text-muted sm:inline">
                esc
              </kbd>
            </div>
            <ul id="command-palette-menu" className="max-h-[min(50vh,360px)] overflow-auto">
              {filtered.map((a) => (
                <li key={a.id}>
                  <button
                    type="button"
                    className="focus-orbit flex w-full items-center justify-between gap-3 border-b border-white/5 px-4 py-3 text-left text-sm text-muted transition hover:bg-white/[0.04] hover:text-foreground"
                    onClick={() => run(a.id)}
                  >
                    <span>
                      <span className="font-semibold text-foreground">{a.label}</span>
                      <span className="mt-0.5 block font-mono text-[11px] text-muted">
                        {a.hint}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-accent-cyan" aria-hidden />
                  </button>
                </li>
              ))}
              {filtered.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-muted">No matches.</li>
              ) : null}
            </ul>
            <div className="border-t border-white/10 px-4 py-2 font-mono text-[10px] text-muted">
              Ctrl+K
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
