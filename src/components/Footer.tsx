"use client";

const LINKS = [
  {
    href: "https://www.linkedin.com/in/aarushi-krishna/",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/Aarushi002",
    label: "GitHub",
  },
  {
    href: "https://x.com/comatoseaarushi",
    label: "X",
  },
  {
    href: "https://www.redblacknode.com/",
    label: "RedBlackNode",
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-base px-4 py-5 sm:px-6 md:px-10 md:py-6">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-3 text-center sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4 sm:text-left">
        <p className="justify-self-center bg-gradient-to-r from-lavender via-foreground to-accent-cyan bg-clip-text text-base font-semibold text-transparent sm:justify-self-start md:text-lg">
          Made by Aarushi Krishna
        </p>
        <nav
          aria-label="Social and studio links"
          className="flex min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-1.5 justify-self-center text-xs text-muted md:text-[13px]"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-orbit shrink-0 underline-offset-2 transition hover:text-accent-cyan hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="justify-self-center font-mono text-[10px] uppercase tracking-wider text-muted sm:justify-self-end md:text-[11px]">
          © {year}
        </p>
      </div>
    </footer>
  );
}
