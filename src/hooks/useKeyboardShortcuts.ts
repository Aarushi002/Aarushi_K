"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { scrollToSection } from "@/lib/utils";

type Options = {
  onCommandPalette?: () => void;
  onSleepSequence?: () => void;
};

export function useKeyboardShortcuts({
  onCommandPalette,
  onSleepSequence,
}: Options) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let buffer = "";
    let bufferTimer: ReturnType<typeof setTimeout> | null = null;

    const flushBufferSoon = () => {
      if (bufferTimer) clearTimeout(bufferTimer);
      bufferTimer = setTimeout(() => {
        buffer = "";
      }, 800);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const editable =
        target?.isContentEditable ||
        tag === "input" ||
        tag === "textarea" ||
        tag === "select";

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onCommandPalette?.();
        return;
      }

      if (editable) return;

      if (e.key === "h" || e.key === "H") {
        if (pathname === "/") scrollToSection("contact");
        else router.push("/#contact");
        return;
      }
      if (e.key === "p" || e.key === "P") {
        if (pathname === "/projects") scrollToSection("projects");
        else router.push("/projects");
        return;
      }

      if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
        buffer = (buffer + e.key.toLowerCase()).slice(-8);
        flushBufferSoon();
        if (buffer.endsWith("sleep")) {
          onSleepSequence?.();
          buffer = "";
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (bufferTimer) clearTimeout(bufferTimer);
    };
  }, [onCommandPalette, onSleepSequence, pathname, router]);
}
