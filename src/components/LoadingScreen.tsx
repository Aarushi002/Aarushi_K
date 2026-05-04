"use client";

import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-base"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-live="polite"
          aria-busy="true"
          role="status"
        >
          <div className="flex items-center gap-1" aria-hidden>
            <span className="h-2 w-8 bg-accent shadow-[0_0_20px_rgba(124,58,237,0.6)]" />
            <span className="h-2 w-4 bg-accent-cyan shadow-[0_0_16px_rgba(34,211,238,0.45)]" />
            <span className="h-2 w-2 bg-lavender/80" />
          </div>
          <div className="font-mono text-xs font-semibold uppercase tracking-[0.5em] text-muted">
            Loading
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
