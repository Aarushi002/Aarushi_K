"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "my-portfolio-sound";

type SoundContextValue = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  playTick: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

/** One shared context; browsers require resume() after a user gesture. */
let sharedCtx: AudioContext | null = null;

async function ensureAudioContext(): Promise<AudioContext | null> {
  if (typeof window === "undefined") return null;
  try {
    if (!sharedCtx || sharedCtx.state === "closed") {
      sharedCtx = new AudioContext();
    }
    if (sharedCtx.state === "suspended") {
      await sharedCtx.resume();
    }
    return sharedCtx;
  } catch {
    return null;
  }
}

function playBeepWithContext(ctx: AudioContext) {
  try {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 920;
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.1, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.085);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(t);
    o.stop(t + 0.09);
  } catch {
    /* ignore */
  }
}

function playBeepImmediate() {
  if (typeof window === "undefined") return;
  if (!sharedCtx || sharedCtx.state === "closed") {
    try {
      sharedCtx = new AudioContext();
    } catch {
      return;
    }
  }
  const ctx = sharedCtx;
  if (!ctx) return;
  if (ctx.state === "suspended") {
    void ctx.resume().then(() => playBeepWithContext(ctx)).catch(() => {});
    return;
  }
  playBeepWithContext(ctx);
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  /** Default on; only opt-out when user has saved "0". */
  const [enabled, setEnabledState] = useState(true);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate preference once
      setEnabledState(v !== "0");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    // Some browsers keep AudioContext suspended until a trusted gesture.
    // Prime/unlock once on first interaction.
    const unlock = () => {
      void ensureAudioContext();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v);
    try {
      localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
    } catch {
      /* ignore */
    }
    if (v) void ensureAudioContext();
  }, []);

  const playTick = useCallback(() => {
    if (!enabled) return;
    playBeepImmediate();
  }, [enabled]);

  const value = useMemo(
    () => ({ enabled, setEnabled, playTick }),
    [enabled, setEnabled, playTick],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}
