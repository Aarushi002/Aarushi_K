"use client";

import { useState } from "react";
import Link from "next/link";
import { CommandPalette } from "@/components/CommandPalette";
import {
  CustomCursor,
  CustomCursorBodyClass,
} from "@/components/CustomCursor";
import { ContactTransmission } from "@/components/ContactTransmission";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { SleepEasterEgg } from "@/components/SleepEasterEgg";
import { ScrollProgressProvider } from "@/context/ScrollProgressContext";
import { SoundProvider } from "@/context/SoundContext";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

export default function ProjectsPage() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sleepOpen, setSleepOpen] = useState(false);

  useKeyboardShortcuts({
    onCommandPalette: () => setPaletteOpen(true),
    onSleepSequence: () => setSleepOpen(true),
  });

  return (
    <SoundProvider>
      <ScrollProgressProvider>
        <CustomCursorBodyClass active />
        <CustomCursor />
        <Navbar />
        <main className="relative z-10">
          <div className="border-b border-white/10 px-4 py-6 md:px-10">
            <Link
              href="/"
              className="focus-orbit font-mono text-xs font-semibold uppercase tracking-widest text-muted transition hover:text-accent-cyan"
            >
              ← Back to home
            </Link>
          </div>
          <ProjectsShowcase />
          <ContactTransmission />
        </main>
        <Footer />
        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
        />
        <SleepEasterEgg open={sleepOpen} onClose={() => setSleepOpen(false)} />
      </ScrollProgressProvider>
    </SoundProvider>
  );
}
