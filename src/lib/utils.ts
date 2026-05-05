import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(id: string) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduced ? "auto" : "smooth";

  if (id === "home") {
    // Pin the document to the top. scrollIntoView({ block: "start" }) on #home
    // was racing hash navigation and left scrollY > 0, so the light About band
    // (bg-zinc-100) appeared under the hero/ticker as a “white strip”.
    window.scrollTo({ top: 0, left: 0, behavior });
    return;
  }

  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior, block: "start" });
}
