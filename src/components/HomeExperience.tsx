"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { scrollToSection } from "@/lib/utils";
import { ScrollProgressProvider } from "@/context/ScrollProgressContext";
import { SoundProvider } from "@/context/SoundContext";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { About } from "@/components/About";
import { CommandPalette } from "@/components/CommandPalette";
import {
  CustomCursor,
  CustomCursorBodyClass,
} from "@/components/CustomCursor";
import { ContactTransmission } from "@/components/ContactTransmission";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { ProjectsTeaser } from "@/components/ProjectsTeaser";
import { RedBlackNodeBand } from "@/components/RedBlackNodeBand";
import { SkillsGalaxy } from "@/components/SkillsGalaxy";
import { SleepEasterEgg } from "@/components/SleepEasterEgg";
import { TechTicker } from "@/components/TechTicker";

const CanvasLayer = dynamic(
  () =>
    import("@/components/canvas/CanvasLayer").then((m) => ({
      default: m.CanvasLayer,
    })),
  { ssr: false },
);

function Shell() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sleepOpen, setSleepOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;
    const nav = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type !== "reload") return;
    window.history.replaceState(null, "", "/");
    requestAnimationFrame(() => scrollToSection("home"));
  }, [pathname]);

  useKeyboardShortcuts({
    onCommandPalette: () => setPaletteOpen(true),
    onSleepSequence: () => setSleepOpen(true),
  });

  const onCanvasReady = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <LoadingScreen visible={loading} />
      <CanvasLayer onReady={onCanvasReady} />
      <CustomCursorBodyClass active={!loading} />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TechTicker />
        <About />
        <SkillsGalaxy />
        <ProjectsTeaser />
        <RedBlackNodeBand />
        <ContactTransmission />
        <Footer />
      </main>
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
      <SleepEasterEgg open={sleepOpen} onClose={() => setSleepOpen(false)} />
    </>
  );
}

export function HomeExperience() {
  return (
    <SoundProvider>
      <ScrollProgressProvider>
        <Shell />
      </ScrollProgressProvider>
    </SoundProvider>
  );
}
