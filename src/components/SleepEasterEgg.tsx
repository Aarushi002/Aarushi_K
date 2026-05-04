"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SleepEasterEgg({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-black/90 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sleep-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: reduced ? 1 : 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 6 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="glass-panel glow-ring max-w-md p-8 text-center"
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center bg-accent text-white shadow-[0_0_28px_rgba(124,58,237,0.55)]">
              <Sparkles className="h-7 w-7" aria-hidden />
            </div>
            <h2
              id="sleep-title"
              className="text-lg font-bold tracking-tight text-foreground"
            >
              Dream mode
            </h2>
            <p className="mt-3 text-sm text-muted">
              Aarushi is debugging dreams right now.
            </p>
            <button
              type="button"
              className="focus-orbit mt-8 w-full border-2 border-accent-cyan bg-transparent py-3 text-sm font-bold uppercase tracking-widest text-accent-cyan hover:bg-accent-cyan/10"
              onClick={onClose}
            >
              Back
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
