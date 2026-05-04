"use client";

import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSound } from "@/context/SoundContext";

export function SoundToggle({ className }: { className?: string }) {
  const { enabled, setEnabled, playTick } = useSound();

  return (
    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      onMouseEnter={() => playTick()}
      className={cn(
        "focus-orbit border border-white/10 bg-surface p-2 text-muted transition hover:border-accent-cyan hover:text-accent-cyan",
        className,
      )}
      aria-pressed={enabled}
      aria-label={enabled ? "Disable hover sounds" : "Enable hover sounds"}
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
